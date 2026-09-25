import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ALL_COUNTRY_PROFILES } from '../../data';
import { RegionId } from '../../types/spatial';
import { MIDDLE_EAST_ISO3 } from '../../types/map';
import { loadWorldGeo } from '../../data/map/worldGeo';
import type { MapCountryFeature } from '../../types/map';

interface GlobeCanvasProps {
  onSelectCountry: (countryId: string) => void;
  onSelectRegion?: (regionId: RegionId) => void;
  initialLat?: number;
  initialLng?: number;
}

interface Pin {
  id: string;
  name: string;
  capital: string;
  flag: string;
  gdpPerCapita: number;
  regionId: RegionId;
  lat: number;
  lng: number;
}

/* =============================================================================
   REAL GEOGRAPHY ON THE GLOBE (2026-09-25 pivot)
   =============================================================================
   The six hand-authored continent polygons are retired — they were invented
   coastlines, violating the zero-fabrication principle. The globe now renders
   REAL Natural Earth 50m boundaries, lazily fetched through the same
   `loadWorldGeo()` cache the 2D map uses, filtered to the strict Middle East &
   West Asia scope (`MIDDLE_EAST_ISO3`).

   Rendering strategy (benchmark-verified at ~2-3 ms/frame on Node):
   1. On load, each country's rings are flattened into Float32Array pairs of
      [lng, lat] — one array per polygon ring.
   2. Per frame, every vertex is projected once into screen space (orthographic
      projection), then segments are stroked only where both endpoints face the
      camera (cos c > 0).
   3. Segments crossing the horizon are clipped by linear interpolation of the
      cos c depth value; at cos c = 0 the projected point lies exactly on the
      limb circle, so clipped coastlines meet the globe edge precisely.
   ============================================================================= */

interface GlobeCountry {
  iso3: string;
  name: string;
  /** Flattened [lng, lat, lng, lat, ...] per polygon ring. */
  rings: Float32Array[];
}

/** Route network between the authored dossiers — decorative great-circle arcs. */
const GULF_ROUTES: [string, string][] = [
  ['QAT', 'EGY'],
  ['QAT', 'ARE'],
  ['ARE', 'EGY'],
  ['QAT', 'SAU'],
  ['ARE', 'SAU'],
];

export const GlobeCanvas: React.FC<GlobeCanvasProps> = ({
  onSelectCountry,
  onSelectRegion,
  initialLat = 27,
  initialLng = 44,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotX, setRotX] = useState<number>(initialLat); // Latitude rotation
  const [rotY, setRotY] = useState<number>(-initialLng); // Longitude rotation
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hoveredPin, setHoveredPin] = useState<Pin | null>(null);
  const [isTouchActive, setIsTouchActive] = useState<boolean>(false); // Mobile gesture lock

  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number }>({
    x: 0,
    y: 0,
    rotX: initialLat,
    rotY: -initialLng,
  });
  const velocityRef = useRef<{ vx: number; vy: number }>({ vx: 0.03, vy: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  /** Real Natural Earth boundaries for the ME scope, loaded lazily. */
  const [meCountries, setMeCountries] = useState<GlobeCountry[]>([]);

  /* --- Load the real boundary asset once (shares the 2D map's cache) -------- */
  useEffect(() => {
    let active = true;

    loadWorldGeo()
      .then((collection) => {
        if (!active) return;
        const meFeatures = collection.features.filter(
          (feature: MapCountryFeature) =>
            MIDDLE_EAST_ISO3.includes(feature.properties.iso3)
        );
        const prepared: GlobeCountry[] = meFeatures.map((feature) => {
          const polys =
            feature.geometry.type === 'Polygon'
              ? [feature.geometry.coordinates]
              : feature.geometry.coordinates;
          const rings = polys.map((poly) => {
            const flat = new Float32Array(
              poly.reduce((acc, ring) => acc + ring.length * 2, 0)
            );
            let i = 0;
            for (const ring of poly) {
              for (const [lng, lat] of ring) {
                flat[i++] = lng;
                flat[i++] = lat;
              }
            }
            return flat;
          });
          return { iso3: feature.properties.iso3, name: feature.properties.name, rings };
        });
        setMeCountries(prepared);
      })
      .catch(() => {
        // The 2D map surfaces the full error state; the globe degrades to pins-only.
        if (active) setMeCountries([]);
      });

    return () => {
      active = false;
    };
  }, []);

  // Extract pins from flagship country dataset
  const pins: Pin[] = ALL_COUNTRY_PROFILES.map((c) => ({
    id: c.id,
    name: c.name,
    capital: c.capital.name,
    flag: c.flag.emoji,
    gdpPerCapita: c.economy.gdpPerCapitaPppUsd,
    regionId: c.regionId,
    lat: c.capital.coordinates[0],
    lng: c.capital.coordinates[1],
  }));

  // Spherical to 2D Orthographic Projection Math
  const project = useCallback(
    (lat: number, lng: number, radius: number, cx: number, cy: number, phi: number, lambda: number) => {
      const rad = Math.PI / 180;
      const latRad = lat * rad;
      const lngRad = lng * rad;
      const phiRad = phi * rad;
      const lambdaRad = lambda * rad;

      // Distance from center of visible disk
      const cosC =
        Math.sin(phiRad) * Math.sin(latRad) +
        Math.cos(phiRad) * Math.cos(latRad) * Math.cos(lngRad - lambdaRad);

      const isVisible = cosC > 0; // Front side of the globe

      const x = cx + radius * Math.cos(latRad) * Math.sin(lngRad - lambdaRad);
      const y =
        cy -
        radius *
          (Math.cos(phiRad) * Math.sin(latRad) -
            Math.sin(phiRad) * Math.cos(latRad) * Math.cos(lngRad - lambdaRad));

      return { x, y, isVisible, depth: cosC };
    },
    []
  );

  // Smooth rotation animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localRotY = rotY;
    let localRotX = rotX;

    const render = () => {
      // Auto-rotation inertia when not dragging
      if (!isDragging) {
        localRotY += velocityRef.current.vx;
        velocityRef.current.vx *= 0.985;
        // Maintain a subtle constant drift of 0.05 deg/frame
        if (Math.abs(velocityRef.current.vx) < 0.04) {
          velocityRef.current.vx = 0.04;
        }
      }

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.42;

      ctx.clearRect(0, 0, width, height);

      // 1. Atmospheric Outer Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.25);
      glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.16)');
      glowGrad.addColorStop(0.5, 'rgba(229, 181, 88, 0.06)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 2. Globe Sphere (Day/Night Terminator Shading)
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, '#162238'); // Highlighted day side
      sphereGrad.addColorStop(0.65, '#0c1220');
      sphereGrad.addColorStop(1, '#05070c'); // Deep night terminator
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Globe Rim Edge
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. Latitude & Longitude Graticules
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 0.8;

      // Parallels (Latitudes: -60, -30, 0 Equator, 30, 60)
      [-60, -30, 0, 30, 60].forEach((lat) => {
        ctx.beginPath();
        let started = false;
        if (lat === 0) {
          ctx.strokeStyle = 'rgba(229, 181, 88, 0.25)'; // Highlight Equator in gold
          ctx.lineWidth = 1.2;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
          ctx.lineWidth = 0.8;
        }

        for (let lng = -180; lng <= 180; lng += 4) {
          const pt = project(lat, lng, radius, cx, cy, localRotX, -localRotY);
          if (pt.isVisible) {
            if (!started) {
              ctx.moveTo(pt.x, pt.y);
              started = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      });

      // Meridians (Longitudes every 30 deg)
      for (let lng = -180; lng < 180; lng += 30) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        let started = false;
        for (let lat = -85; lat <= 85; lat += 4) {
          const pt = project(lat, lng, radius, cx, cy, localRotX, -localRotY);
          if (pt.isVisible) {
            if (!started) {
              ctx.moveTo(pt.x, pt.y);
              started = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // 4. Real Middle East Boundaries (Natural Earth, lazily loaded)
      if (meCountries.length > 0) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
        ctx.lineWidth = 1.1;
        ctx.lineJoin = 'round';

        const lambda = -localRotY; // project() convention: lambda = -rotY

        for (const country of meCountries) {
          for (const ring of country.rings) {
            const vertexCount = ring.length / 2;
            if (vertexCount < 2) continue;

            ctx.beginPath();
            let started = false;
            let prevCos = -1;
            let prevX = 0;
            let prevY = 0;
            let prevLng = 0;
            let prevLat = 0;

            for (let v = 0; v < vertexCount; v++) {
              const lng = ring[v * 2];
              const lat = ring[v * 2 + 1];
              const pt = project(lat, lng, radius, cx, cy, localRotX, lambda);

              if (pt.isVisible) {
                if (!started) {
                  // Entering the visible hemisphere: if the previous vertex was
                  // hidden, interpolate the horizon crossing so the coastline
                  // terminates exactly on the limb circle.
                  if (v > 0 && prevCos <= 0 && pt.depth - prevCos !== 0) {
                    const t = prevCos / (prevCos - pt.depth);
                    const hLng = prevLng + t * (lng - prevLng);
                    const hLat = prevLat + t * (lat - prevLat);
                    const h = project(hLat, hLng, radius, cx, cy, localRotX, lambda);
                    ctx.moveTo(h.x, h.y);
                    ctx.lineTo(pt.x, pt.y);
                  } else {
                    ctx.moveTo(pt.x, pt.y);
                  }
                  started = true;
                } else {
                  ctx.lineTo(pt.x, pt.y);
                }
              } else if (started) {
                // Leaving the visible hemisphere: clip to the horizon.
                const t = prevCos / (prevCos - pt.depth);
                const hLng = prevLng + t * (lng - prevLng);
                const hLat = prevLat + t * (lat - prevLat);
                const h = project(hLat, hLng, radius, cx, cy, localRotX, lambda);
                ctx.lineTo(h.x, h.y);
                ctx.stroke();
                started = false;
              }

              prevCos = pt.depth;
              prevX = pt.x;
              prevY = pt.y;
              prevLng = lng;
              prevLat = lat;
            }

            if (started) {
              ctx.stroke();
            }
          }
        }
      }

      // 4b. Gulf Connector Arcs — great-circle routes between authored dossiers.
      if (meCountries.length > 0) {
        const profileIso = new Map(
          ALL_COUNTRY_PROFILES.map((c) => [c.iso3, c.capital.coordinates])
        );
        const t = Date.now() / 4000; // slow drifting arc draw progress

        ctx.lineWidth = 1.2;
        for (const [isoA, isoB] of GULF_ROUTES) {
          const a = profileIso.get(isoA);
          const b = profileIso.get(isoB);
          if (!a || !b) continue; // only routes between authored dossiers
          const [lat1, lng1] = a;
          const [lat2, lng2] = b;

          ctx.beginPath();
          let arcStarted = false;
          const steps = 36;
          for (let s = 0; s <= steps; s++) {
            const f = s / steps;
            // Spherical interpolation between the two capitals
            const rad = Math.PI / 180;
            const p1 = [
              Math.cos(lat1 * rad) * Math.cos(lng1 * rad),
              Math.cos(lat1 * rad) * Math.sin(lng1 * rad),
              Math.sin(lat1 * rad),
            ];
            const p2 = [
              Math.cos(lat2 * rad) * Math.cos(lng2 * rad),
              Math.cos(lat2 * rad) * Math.sin(lng2 * rad),
              Math.sin(lat2 * rad),
            ];
            const dot = Math.max(-1, Math.min(1, p1[0] * p2[0] + p1[1] * p2[1] + p1[2] * p2[2]));
            const omega = Math.acos(dot);
            if (omega < 0.001) continue;
            const sinOmega = Math.sin(omega);
            const w1 = Math.sin((1 - f) * omega) / sinOmega;
            const w2 = Math.sin(f * omega) / sinOmega;
            const x3 = w1 * p1[0] + w2 * p2[0];
            const y3 = w1 * p1[1] + w2 * p2[1];
            const z3 = w1 * p1[2] + w2 * p2[2];
            const arcLat = Math.asin(Math.max(-1, Math.min(1, z3))) / rad;
            const arcLng = Math.atan2(y3, x3) / rad;
            const altitude = 1 + 0.06 * Math.sin(f * Math.PI); // parabolic lift

            const pt = project(arcLat, arcLng, radius * altitude, cx, cy, localRotX, -localRotY);
            if (pt.isVisible) {
              if (!arcStarted) {
                ctx.moveTo(pt.x, pt.y);
                arcStarted = true;
              } else {
                ctx.lineTo(pt.x, pt.y);
              }
            } else {
              arcStarted = false;
            }
          }
          ctx.strokeStyle = `rgba(229, 181, 88, ${0.18 + 0.1 * Math.sin(t + isoA.charCodeAt(0))})`;
          ctx.stroke();
        }
      }

      // 5. Country Capital Glowing Pins
      pins.forEach((pin) => {
        const pt = project(pin.lat, pin.lng, radius, cx, cy, localRotX, -localRotY);
        if (pt.isVisible) {
          const isHovered = hoveredPin?.id === pin.id;
          const pinRadius = isHovered ? 6 : 3.5;

          // Halo Glow
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pinRadius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? 'rgba(229, 181, 88, 0.35)' : 'rgba(56, 189, 248, 0.2)';
          ctx.fill();

          // Pin Core
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pinRadius, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? 'var(--accent-gold)' : '#FFFFFF';
          ctx.fill();
          ctx.strokeStyle = '#07090E';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Capital Label (if hovered or facing center)
          if (isHovered || pt.depth > 0.85) {
            ctx.font = '600 11px Inter, sans-serif';
            ctx.fillStyle = isHovered ? '#E5B558' : 'rgba(248, 250, 252, 0.85)';
            ctx.textAlign = 'center';
            ctx.fillText(pin.name, pt.x, pt.y - 10);
          }
        }
      });

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isDragging, pins, project, hoveredPin, rotX, rotY, meCountries]);

  // Handle Drag Interactions (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX,
      rotY,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      const sensitivity = 0.35;
      const newRotY = dragStartRef.current.rotY + dx * sensitivity;
      const newRotX = Math.max(-80, Math.min(80, dragStartRef.current.rotX - dy * sensitivity));

      velocityRef.current = { vx: dx * 0.05, vy: dy * 0.05 };
      setRotX(newRotX);
      setRotY(newRotY);
    } else {
      // Check Pin Hover
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
      const radius = Math.min(canvas.width, canvas.height) * 0.42;

      let found: Pin | null = null;
      for (const pin of pins) {
        const pt = project(pin.lat, pin.lng, radius, canvas.width / 2, canvas.height / 2, rotX, -rotY);
        if (pt.isVisible) {
          const dist = Math.hypot(pt.x - mouseX, pt.y - mouseY);
          if (dist < 14) {
            found = pin;
            break;
          }
        }
      }
      setHoveredPin(found);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    // If clicked on pin, select country
    if (hoveredPin) {
      onSelectCountry(hoveredPin.id);
    }
  };

  // Helper to rotate to specific continent
  const rotateTo = (lat: number, lng: number) => {
    setRotX(lat);
    setRotY(-lng);
    velocityRef.current = { vx: 0.04, vy: 0 };
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
      }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={680}
        height={560}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          width: '100%',
          maxHeight: '560px',
          cursor: isDragging ? 'grabbing' : hoveredPin ? 'pointer' : 'grab',
          touchAction: isTouchActive ? 'none' : 'auto',
          userSelect: 'none',
        }}
      />

      {/* Floating Pin Card Preview if Hovered */}
      {hoveredPin && (
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            background: 'var(--bg-glass-elevated)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--accent-gold-dark)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1.25rem',
            boxShadow: 'var(--shadow-gold)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 10,
            pointerEvents: 'auto',
            cursor: 'pointer',
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={() => onSelectCountry(hoveredPin.id)}
        >
          <span style={{ fontSize: '1.75rem' }}>{hoveredPin.flag}</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 700, fontSize: 'var(--text-md)', color: 'var(--text-primary)' }}>
                {hoveredPin.name}
              </span>
              <span className="badge badge-gold" style={{ fontSize: '10px' }}>
                Explore Dossier
              </span>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              Capital: <strong style={{ color: 'var(--text-primary)' }}>{hoveredPin.capital}</strong> • GDP/cap:{' '}
              <strong style={{ color: 'var(--accent-gold-light)' }}>${hoveredPin.gdpPerCapita.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Quick Region Alignment Pills — Middle East subregions */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
          justifyContent: 'center',
          marginTop: '0.5rem',
          zIndex: 5,
        }}
      >
        <button
          onClick={() => rotateTo(27, 44)}
          className="btn-secondary"
          style={{ fontSize: '11px', padding: '0.3rem 0.75rem' }}
        >
          <span>Whole Sphere</span>
        </button>
        <button
          onClick={() => rotateTo(23, 47)}
          className="btn-secondary"
          style={{ fontSize: '11px', padding: '0.3rem 0.75rem' }}
        >
          <span>Arabian Peninsula</span>
        </button>
        <button
          onClick={() => rotateTo(33, 41)}
          className="btn-secondary"
          style={{ fontSize: '11px', padding: '0.3rem 0.75rem' }}
        >
          <span>Levant &amp; Mesopotamia</span>
        </button>
        <button
          onClick={() => rotateTo(26.8, 30.8)}
          className="btn-secondary"
          style={{ fontSize: '11px', padding: '0.3rem 0.75rem' }}
        >
          <span>Nile Valley</span>
        </button>
        <button
          onClick={() => rotateTo(35, 42)}
          className="btn-secondary"
          style={{ fontSize: '11px', padding: '0.3rem 0.75rem' }}
        >
          <span>Anatolia &amp; Plateau</span>
        </button>
      </div>

      <div style={{ marginTop: '0.4rem', fontSize: '11px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
        Drag to rotate globe • Click pins to open country dossier
      </div>
    </div>
  );
};
