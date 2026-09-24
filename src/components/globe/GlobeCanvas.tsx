import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ALL_COUNTRY_PROFILES } from '../../data';
import { RegionId } from '../../types/spatial';

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

// Pre-projected continent landmass polygon points (simplified lat/lng clusters for high performance)
const CONTINENT_POLYGONS: { name: string; regionId: RegionId; coords: [number, number][] }[] = [
  // Africa
  {
    name: 'Africa',
    regionId: 'africa',
    coords: [
      [37, 10], [30, 32], [15, 43], [12, 51], [0, 42], [-10, 40], [-25, 33], [-34, 18], [-34, 25],
      [-22, 14], [-5, 12], [4, 9], [5, 1], [4, -7], [12, -16], [21, -17], [32, -9], [36, 1], [37, 10]
    ]
  },
  // Europe
  {
    name: 'Europe',
    regionId: 'europe',
    coords: [
      [36, -5], [43, -9], [48, -4], [54, 4], [58, 8], [62, 5], [71, 28], [68, 44], [60, 50],
      [55, 38], [47, 40], [42, 28], [36, 23], [36, 15], [38, 0], [36, -5]
    ]
  },
  // Asia
  {
    name: 'Asia',
    regionId: 'asia',
    coords: [
      [75, 100], [70, 140], [65, 170], [60, 160], [53, 140], [45, 145], [38, 128], [30, 122],
      [22, 114], [10, 104], [1, 104], [8, 77], [22, 69], [25, 55], [15, 45], [30, 35], [38, 45],
      [42, 50], [55, 60], [65, 75], [75, 100]
    ]
  },
  // North America
  {
    name: 'North America',
    regionId: 'americas',
    coords: [
      [70, -160], [72, -130], [60, -85], [55, -60], [45, -65], [30, -80], [25, -80], [20, -87],
      [15, -92], [22, -105], [32, -117], [48, -124], [58, -135], [60, -150], [70, -160]
    ]
  },
  // South America
  {
    name: 'South America',
    regionId: 'americas',
    coords: [
      [12, -72], [10, -62], [5, -52], [-5, -35], [-15, -39], [-23, -42], [-35, -53], [-55, -66],
      [-50, -74], [-40, -73], [-20, -70], [-5, -80], [2, -78], [12, -72]
    ]
  },
  // Australia / Oceania
  {
    name: 'Oceania',
    regionId: 'oceania',
    coords: [
      [-12, 132], [-14, 144], [-24, 153], [-37, 150], [-38, 140], [-35, 115], [-22, 114], [-15, 124], [-12, 132]
    ]
  }
];

export const GlobeCanvas: React.FC<GlobeCanvasProps> = ({
  onSelectCountry,
  onSelectRegion,
  initialLat = 20,
  initialLng = 45,
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
  const velocityRef = useRef<{ vx: number; vy: number }>({ vx: 0.04, vy: 0 });
  const animFrameIdRef = useRef<number | null>(null);

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

      // 4. Continent Landmass Polygons
      CONTINENT_POLYGONS.forEach((cont) => {
        ctx.beginPath();
        let firstPt = true;
        let visibleCount = 0;

        cont.coords.forEach(([lat, lng]) => {
          const pt = project(lat, lng, radius, cx, cy, localRotX, -localRotY);
          if (pt.isVisible) {
            visibleCount++;
            if (firstPt) {
              ctx.moveTo(pt.x, pt.y);
              firstPt = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          }
        });

        if (visibleCount > 2) {
          ctx.closePath();
          ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });

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
  }, [isDragging, pins, project, hoveredPin, rotX, rotY]);

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

      {/* Quick Region Alignment Pills */}
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
          onClick={() => rotateTo(25, 45)}
          className="btn-secondary"
          style={{ fontSize: '11px', padding: '0.3rem 0.75rem' }}
        >
          <span>Middle East</span>
        </button>
        <button
          onClick={() => rotateTo(35, 120)}
          className="btn-secondary"
          style={{ fontSize: '11px', padding: '0.3rem 0.75rem' }}
        >
          <span>East Asia</span>
        </button>
        <button
          onClick={() => rotateTo(48, 15)}
          className="btn-secondary"
          style={{ fontSize: '11px', padding: '0.3rem 0.75rem' }}
        >
          <span>Europe</span>
        </button>
        <button
          onClick={() => rotateTo(38, -95)}
          className="btn-secondary"
          style={{ fontSize: '11px', padding: '0.3rem 0.75rem' }}
        >
          <span>Americas</span>
        </button>
        <button
          onClick={() => rotateTo(-2, 25)}
          className="btn-secondary"
          style={{ fontSize: '11px', padding: '0.3rem 0.75rem' }}
        >
          <span>Africa</span>
        </button>
        <button
          onClick={() => rotateTo(-25, 135)}
          className="btn-secondary"
          style={{ fontSize: '11px', padding: '0.3rem 0.75rem' }}
        >
          <span>Oceania</span>
        </button>
      </div>

      <div style={{ marginTop: '0.4rem', fontSize: '11px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
        Drag to rotate globe • Click pins to open country dossier
      </div>
    </div>
  );
};
