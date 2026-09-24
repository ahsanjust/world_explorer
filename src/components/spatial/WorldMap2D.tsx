import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, ArrowRight } from 'lucide-react';
import { COUNTRY_INDEX, getRegionById } from '../../data';
import { RegionId } from '../../types/spatial';
import { loadWorldGeo } from '../../data/map/worldGeo';
import {
  computeRenderableCountries,
  project,
  MAP_WIDTH,
  MAP_HEIGHT,
  MAP_ASPECT,
} from '../../data/map/projection';
import {
  CONTINENTS_BY_REGION,
  EXCLUDED_CONTINENTS,
  RenderableCountry,
  WorldGeoStatus,
} from '../../types/map';

/* =============================================================================
   2D VECTOR WORLD MAP — REAL BOUNDARIES
   =============================================================================
   Geometry comes from Natural Earth ne_50m_admin_0_countries (public domain),
   vendored and simplified at build-prep time into:
     public/maps/world-countries-50m.geojson   (~105 KB gzipped, 242 territories)

   This replaced a set of six hand-authored continent silhouettes. Those had
   invented coastlines and represented countries as a single pin each, so there
   was no way to hover or select a country *shape* — only 15 dots. Real geometry
   makes per-country hover and selection possible, which is what the map is for.

   Asset is loaded lazily by `loadWorldGeo()`, so it never enters the initial
   bundle. Data/projection plumbing lives in the Agent 3 data layer; this
   component only renders.
   ============================================================================= */

interface WorldMap2DProps {
  onSelectCountry: (countryId: string) => void;
  onSelectRegion?: (regionId: RegionId) => void;
  selectedRegionId?: RegionId;
}

/** Continent label → the app's RegionId, for territories with no dossier. */
const REGION_FOR_CONTINENT: Record<string, RegionId> = {
  Africa: 'africa',
  Asia: 'asia',
  Europe: 'europe',
  'North America': 'americas',
  'South America': 'americas',
  Oceania: 'oceania',
};

const REGION_ACCENT_COLORS: Record<RegionId, string> = {
  asia: '#E5B558', // Gold
  europe: '#38BDF8', // Cyan
  americas: '#34D399', // Emerald
  africa: '#FB7185', // Rose
  oceania: '#A78BFA', // Violet
  // `RegionId` carries a reserved 'polar' member that no Region declares yet.
  // Record<RegionId, ...> therefore has to cover it; see WORK_QUEUE TASK-007.
  polar: '#7DD3FC',
};

/** Zoom target per region when the caller does not navigate away. */
const REGION_ZOOM: Record<RegionId, number> = {
  asia: 1.9,
  europe: 2.4,
  americas: 1.7,
  africa: 1.9,
  oceania: 2.1,
  polar: 1,
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 8;

/** Base label size in user units, divided by zoom so on-screen size is stable. */
const LABEL_UNIT = 3.4;

const GRATICULE_PARALLELS = [-60, -30, 0, 30, 60].map((lat) => ({
  lat,
  y: project(0, lat)[1],
}));

const GRATICULE_MERIDIANS = Array.from({ length: 11 }, (_, i) => -150 + i * 30).map(
  (lon) => ({ lon, x: project(lon, 0)[0] })
);

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export const WorldMap2D: React.FC<WorldMap2DProps> = ({
  onSelectCountry,
  onSelectRegion,
  selectedRegionId,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* --- Boundary data ------------------------------------------------------- */
  const [status, setStatus] = useState<WorldGeoStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countries, setCountries] = useState<RenderableCountry[]>([]);

  /* --- Pan and Zoom State -------------------------------------------------- */
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  /* --- Interaction State --------------------------------------------------- */
  const [hoveredIso, setHoveredIso] = useState<string | null>(null);
  const [activeFilterRegion, setActiveFilterRegion] = useState<RegionId | 'all'>('all');
  const [notice, setNotice] = useState<string | null>(null);
  /** True once the browser reports a reduced-motion preference. */
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  /** Measured container box, needed to convert px pans into map offsets. */
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  /* --- Load the boundary asset once ---------------------------------------- */
  useEffect(() => {
    let active = true;
    setStatus('loading');

    loadWorldGeo()
      .then((collection) => {
        if (!active) return;
        setCountries(
          computeRenderableCountries(
            collection.features.filter(
              (feature) => !EXCLUDED_CONTINENTS.includes(feature.properties.continent)
            )
          )
        );
        setStatus('ready');
      })
      .catch((error: unknown) => {
        if (!active) return;
        setErrorMessage(
          error instanceof Error ? error.message : 'Unable to load map data.'
        );
        setStatus('error');
      });

    return () => {
      active = false;
    };
  }, []);

  /* --- Respect reduced motion --------------------------------------------- */
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(query.matches);
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  /* --- Track container size (needed for clamping + region framing) --------- */
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const apply = () => {
      const rect = node.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSize({ w: rect.width, h: rect.height });
      }
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* --- Derived data -------------------------------------------------------- */
  const dossierByIso = useMemo(
    () => new Map(COUNTRY_INDEX.map((country) => [country.iso3, country])),
    []
  );

  const hoveredSummary = hoveredIso ? dossierByIso.get(hoveredIso) : undefined;

  /** Display name for whatever is under the cursor, dossier or not. */
  const hoveredName = hoveredSummary
    ? hoveredSummary.name
    : hoveredIso
      ? (countries.find((c) => c.iso3 === hoveredIso)?.name ?? hoveredIso)
      : '';

  const hoveredRegionId: RegionId | undefined = hoveredSummary
    ? hoveredSummary.regionId
    : (() => {
        const continent = countries.find((c) => c.iso3 === hoveredIso)?.continent;
        return continent ? REGION_FOR_CONTINENT[continent] : undefined;
      })();

  /** Territories in the active region lens, or null when no lens is active. */
  const highlightIsos = useMemo<Set<string> | null>(() => {
    if (activeFilterRegion === 'all') return null;
    const continents = CONTINENTS_BY_REGION[activeFilterRegion];
    return new Set(
      countries
        .filter((country) => continents.includes(country.continent))
        .map((country) => country.iso3)
    );
  }, [activeFilterRegion, countries]);

  /* --- Rendered geometry (for pan clamping + region framing) --------------- */
  const rendered = useMemo(() => {
    if (!size.w || !size.h) return { w: 0, h: 0 };
    const fitWidth = size.w / size.h <= MAP_ASPECT;
    return {
      w: fitWidth ? size.w : size.h * MAP_ASPECT,
      h: fitWidth ? size.w / MAP_ASPECT : size.h,
    };
  }, [size]);

  const clampPan = useCallback(
    (next: { x: number; y: number }, atZoom: number) => {
      if (!rendered.w || !rendered.h) return next;
      const maxX = Math.max(0, (rendered.w * atZoom - size.w) / 2);
      const maxY = Math.max(0, (rendered.h * atZoom - size.h) / 2);
      return {
        x: clamp(next.x, -maxX, maxX),
        y: clamp(next.y, -maxY, maxY),
      };
    },
    [rendered, size]
  );

  /* Re-clamp when the zoom level or the container box changes, so the map can
   * never be dragged or zoomed out of reach. */
  useEffect(() => {
    setPan((current) => clampPan(current, zoom));
  }, [zoom, clampPan]);

  /** Frames a region without navigating (used when no navigation callback). */
  const frameRegion = useCallback(
    (regionId: RegionId) => {
      const region = getRegionById(regionId);
      if (!region || !rendered.w || !rendered.h) return;

      const [lat, lng] = region.focalCoordinates;
      const [x, y] = project(lng, lat);
      const nextZoom = clamp(REGION_ZOOM[regionId] ?? 1.8, MIN_ZOOM, MAX_ZOOM);

      setZoom(nextZoom);
      setPan(
        clampPan(
          {
            x: -(x / MAP_WIDTH - 0.5) * rendered.w * nextZoom,
            y: -(y / MAP_HEIGHT - 0.5) * rendered.h * nextZoom,
          },
          nextZoom
        )
      );
    },
    [clampPan, rendered]
  );

  /* --- External region sync ------------------------------------------------ */
  useEffect(() => {
    if (!selectedRegionId) return;
    setActiveFilterRegion(selectedRegionId);
    frameRegion(selectedRegionId);
  }, [selectedRegionId, frameRegion]);

  /* --- Zoom handlers ------------------------------------------------------- */
  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.5, MAX_ZOOM));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.5, MIN_ZOOM));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setActiveFilterRegion('all');
    setNotice(null);
  };

  /* --- Region filter switch ------------------------------------------------ */
  const handleFilterRegion = (regId: RegionId | 'all') => {
    setActiveFilterRegion(regId);
    setNotice(null);

    if (regId === 'all') {
      handleReset();
      return;
    }

    // Prefer navigation when the parent can route us there; the component
    // unmounts on navigation, so framing is only the fallback path.
    if (onSelectRegion) {
      onSelectRegion(regId);
    } else {
      frameRegion(regId);
    }
  };

  /* --- Pointer handlers ---------------------------------------------------- */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Primary button only
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    setNotice(null);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isPanning) return;
      setPan(clampPan({ x: e.clientX - startPan.x, y: e.clientY - startPan.y }, zoom));
    },
    [isPanning, startPan, clampPan, zoom]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  useEffect(() => {
    if (isPanning) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isPanning, handleMouseMove, handleMouseUp]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => clamp(prev * (e.deltaY > 0 ? 1 / 1.15 : 1.15), MIN_ZOOM, MAX_ZOOM));
  };

  /* --- Activation ---------------------------------------------------------- */
  const handleActivate = useCallback(
    (iso3: string, name: string) => {
      const summary = dossierByIso.get(iso3);
      if (summary) {
        onSelectCountry(summary.id);
        return;
      }
      setNotice(
        `${name} has no dossier yet — ${COUNTRY_INDEX.length} countries are currently covered.`
      );
    },
    [dossierByIso, onSelectCountry]
  );

  /* --- Region pill counts ---------------------------------------------------
   * Counted from the DOSSIER set, not from boundary geometry. These pills read as
   * a coverage legend ("which spheres can I explore?"), so they must sum to the
   * "All Spheres" total. Counting territories by continent instead would report
   * ~48 for Asia and conflate "has boundaries" with "has a dossier". */
  const regionPillCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const country of COUNTRY_INDEX) {
      counts[country.regionId] = (counts[country.regionId] ?? 0) + 1;
    }
    return counts;
  }, []);

  const labelsVisible = zoom >= 1.5;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '520px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 50%, #0c121e 0%, #05070a 100%)',
        border: '1px solid var(--border-medium)',
        boxShadow: 'var(--shadow-glass), inset 0 0 80px rgba(0,0,0,0.7)',
        userSelect: 'none',
      }}
      onWheel={handleWheel}
    >
      {/* Top Filter & View Controls Bar */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          right: '1rem',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.65rem',
          pointerEvents: 'none',
        }}
      >
        {/* Region Filter Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(7, 9, 14, 0.85)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            pointerEvents: 'auto',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => handleFilterRegion('all')}
            style={{
              background:
                activeFilterRegion === 'all' ? 'var(--accent-gold)' : 'transparent',
              color: activeFilterRegion === 'all' ? '#07090E' : 'var(--text-secondary)',
              border: 'none',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            All Spheres ({COUNTRY_INDEX.length})
          </button>
          {(['asia', 'europe', 'americas', 'africa', 'oceania'] as RegionId[]).map(
            (rId) => {
              const count = regionPillCounts[rId] ?? 0;
              const isSelected = activeFilterRegion === rId;
              return (
                <button
                  key={rId}
                  onClick={() => handleFilterRegion(rId)}
                  style={{
                    background: isSelected ? REGION_ACCENT_COLORS[rId] : 'transparent',
                    color: isSelected ? '#07090E' : 'var(--text-secondary)',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {rId} ({count})
                </button>
              );
            }
          )}
        </div>

        {/* Zoom & Reset Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(7, 9, 14, 0.85)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            pointerEvents: 'auto',
          }}
        >
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            aria-label="Zoom in"
            disabled={zoom >= MAX_ZOOM}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: zoom >= MAX_ZOOM ? 'not-allowed' : 'pointer',
              opacity: zoom >= MAX_ZOOM ? 0.4 : 1,
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ZoomIn size={15} />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            aria-label="Zoom out"
            disabled={zoom <= MIN_ZOOM}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: zoom <= MIN_ZOOM ? 'not-allowed' : 'pointer',
              opacity: zoom <= MIN_ZOOM ? 0.4 : 1,
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ZoomOut size={15} />
          </button>
          <div
            style={{ width: '1px', height: '14px', background: 'var(--border-subtle)' }}
          />
          <button
            onClick={handleReset}
            title="Reset Map View"
            aria-label="Reset map view"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* SVG Vector Map Viewport */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: '100%',
          height: '100%',
          cursor: isPanning ? 'grabbing' : 'grab',
          position: 'relative',
        }}
      >
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          role="group"
          aria-label="Interactive world map. Drag to pan, scroll to zoom, and select a country to open its dossier."
          style={{
            width: '100%',
            height: '100%',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '50% 50%',
            transition:
              isPanning || reducedMotion
                ? 'none'
                : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <defs>
            <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#080e18" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#040609" stopOpacity="0.95" />
            </linearGradient>

            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ocean Background */}
          <rect
            x={0}
            y={0}
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            fill="url(#oceanGradient)"
          />

          {/* Graticules / Reference Latitude & Longitude Lines */}
          <g
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth={0.75}
            strokeDasharray="3,3"
            vectorEffect="non-scaling-stroke"
          >
            {GRATICULE_PARALLELS.map(({ lat, y }) => (
              <line
                key={`p-${lat}`}
                x1={0}
                y1={y}
                x2={MAP_WIDTH}
                y2={y}
                stroke={
                  lat === 0 ? 'rgba(229, 181, 88, 0.2)' : 'rgba(255, 255, 255, 0.06)'
                }
                strokeDasharray={lat === 0 ? 'none' : '3,3'}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {GRATICULE_MERIDIANS.map(({ lon, x }) => (
              <line
                key={`m-${lon}`}
                x1={x}
                y1={0}
                x2={x}
                y2={MAP_HEIGHT}
                stroke={
                  lon === 0 ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.06)'
                }
                strokeDasharray={lon === 0 ? 'none' : '3,3'}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          {/* Country boundaries */}
          <g>
            {countries.map((country) => {
              const hasDossier = dossierByIso.has(country.iso3);
              const inLens = highlightIsos ? highlightIsos.has(country.iso3) : true;
              const isHovered = hoveredIso === country.iso3;
              const regionId =
                REGION_FOR_CONTINENT[country.continent] ?? ('asia' as RegionId);
              const accent = REGION_ACCENT_COLORS[regionId];

              const fill = !inLens
                ? 'rgba(148, 163, 184, 0.06)'
                : isHovered
                  ? hasDossier
                    ? 'rgba(229, 181, 88, 0.62)'
                    : 'rgba(148, 163, 184, 0.32)'
                  : hasDossier
                    ? 'rgba(56, 189, 248, 0.16)'
                    : 'rgba(148, 163, 184, 0.13)';

              const stroke = !inLens
                ? 'rgba(148, 163, 184, 0.14)'
                : isHovered
                  ? hasDossier
                    ? '#F3D489'
                    : '#CBD5E1'
                  : hasDossier
                    ? 'rgba(56, 189, 248, 0.5)'
                    : 'rgba(148, 163, 184, 0.3)';

              return (
                <path
                  key={country.iso3}
                  d={country.path}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isHovered ? 1.6 : 0.8}
                  vectorEffect="non-scaling-stroke"
                  style={{
                    cursor: hasDossier ? 'pointer' : 'default',
                    transition: reducedMotion ? 'none' : 'fill 140ms ease, stroke 140ms ease',
                    outline: 'none',
                  }}
                  onClick={() => handleActivate(country.iso3, country.name)}
                  onMouseEnter={() => setHoveredIso(country.iso3)}
                  onMouseLeave={() => setHoveredIso(null)}
                  onFocus={() => setHoveredIso(country.iso3)}
                  onBlur={() => setHoveredIso(null)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleActivate(country.iso3, country.name);
                    }
                  }}
                  tabIndex={hasDossier ? 0 : -1}
                  role={hasDossier ? 'button' : undefined}
                  aria-label={
                    hasDossier
                      ? `Open the ${country.name} dossier`
                      : `${country.name}, no dossier available`
                  }
                  focusable={hasDossier ? 'true' : 'false'}
                >
                  {hasDossier && <title>{`${country.name} — open dossier`}</title>}
                </path>
              );
            })}
          </g>

          {/* Labels for the explorable set, only once the view is close enough
              to make them legible rather than overlapping. */}
          {labelsVisible && (
            <g style={{ pointerEvents: 'none' }}>
              {COUNTRY_INDEX.map((country) => {
                if (highlightIsos && !highlightIsos.has(country.iso3)) return null;
                const [lat, lng] = country.coordinates;
                const [x, y] = project(lng, lat);
                return (
                  <text
                    key={country.iso3}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize={LABEL_UNIT / zoom}
                    fontFamily="var(--font-display)"
                    fontWeight={hoveredIso === country.iso3 ? 700 : 500}
                    stroke="rgba(5,7,10,0.9)"
                    strokeWidth={LABEL_UNIT / zoom / 4}
                    paintOrder="stroke"
                    style={{ userSelect: 'none' }}
                  >
                    {country.flagEmoji} {country.name}
                  </text>
                );
              })}
            </g>
          )}

          {/* Hover accent ring around the active country, if it has a dossier */}
          {hoveredSummary &&
            (() => {
              const [lat, lng] = hoveredSummary.coordinates;
              const [x, y] = project(lng, lat);
              return (
                <circle
                  cx={x}
                  cy={y}
                  r={2.4 / zoom}
                  fill="none"
                  stroke={REGION_ACCENT_COLORS[hoveredSummary.regionId]}
                  strokeWidth={1.4}
                  vectorEffect="non-scaling-stroke"
                  filter="url(#nodeGlow)"
                  style={{ pointerEvents: 'none' }}
                />
              );
            })()}
        </svg>

        {/* Loading state */}
        {status === 'loading' && (
          <div
            role="status"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              background: 'rgba(7, 9, 14, 0.7)',
              backdropFilter: 'blur(3px)',
              zIndex: 8,
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '999px',
                border: '2px solid var(--border-medium)',
                borderColor: 'var(--accent-cyan)',
                borderTopColor: 'transparent',
                // `pulseGlow` is the only keyframe the design system defines
                // (src/styles/base.css). Do not reference undefined keyframes —
                // they fail silently and the element just sits still.
                animation: reducedMotion ? 'none' : 'pulseGlow 1.4s ease-in-out infinite',
              }}
            />
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              Loading country boundaries…
            </div>
          </div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div
            role="status"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              padding: '2rem',
              textAlign: 'center',
              background: 'rgba(7, 9, 14, 0.82)',
              zIndex: 8,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-md)',
                fontWeight: 700,
              }}
            >
              Map data unavailable
            </div>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                maxWidth: '32rem',
                lineHeight: 1.55,
              }}
            >
              {errorMessage} The continental spheres below and the 3D globe view still
              work.
            </p>
          </div>
        )}
      </div>

      {/* Floating Telemetry HUD Card for Hovered Country */}
      {hoveredIso && hoveredName && (
        <div
          style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '1.25rem',
            zIndex: 20,
            background: 'rgba(7, 9, 14, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: `1px solid ${
              hoveredRegionId
                ? REGION_ACCENT_COLORS[hoveredRegionId]
                : 'var(--border-medium)'
            }`,
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            minWidth: '280px',
            maxWidth: '340px',
            boxShadow: 'var(--shadow-lg), 0 0 20px rgba(0,0,0,0.8)',
            pointerEvents: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {hoveredSummary && (
                <span style={{ fontSize: '1.5rem' }}>{hoveredSummary.flagEmoji}</span>
              )}
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 800,
                  }}
                >
                  {hoveredName}
                </h4>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  {hoveredSummary
                    ? `Capital: ${hoveredSummary.capital}`
                    : 'No dossier available yet'}
                </div>
              </div>
            </div>
            {hoveredRegionId && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '2px 7px',
                  borderRadius: '999px',
                  background: `${REGION_ACCENT_COLORS[hoveredRegionId]}20`,
                  color: REGION_ACCENT_COLORS[hoveredRegionId],
                  border: `1px solid ${REGION_ACCENT_COLORS[hoveredRegionId]}50`,
                  whiteSpace: 'nowrap',
                }}
              >
                {hoveredRegionId}
              </span>
            )}
          </div>

          {hoveredSummary ? (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  padding: '0.5rem 0',
                  borderTop: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: '0.65rem',
                  fontSize: '11px',
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>GDP per Cap:</span>{' '}
                  <strong style={{ color: 'var(--accent-gold)' }}>
                    ${hoveredSummary.gdpPerCapitaPppUsd.toLocaleString()}
                  </strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>Safety Index:</span>{' '}
                  <strong style={{ color: 'var(--accent-emerald)' }}>
                    {hoveredSummary.safetyIndex}/100
                  </strong>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>Population:</span>{' '}
                  <strong>
                    {(hoveredSummary.population / 1000000).toFixed(1)}M
                  </strong>
                </div>
              </div>

              <button
                onClick={() => onSelectCountry(hoveredSummary.id)}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.4rem',
                  fontSize: 'var(--text-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                }}
              >
                <span>Open Sovereign Dossier</span>
                <ArrowRight size={13} />
              </button>
            </>
          ) : (
            <p
              style={{
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                lineHeight: 1.5,
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '0.5rem',
              }}
            >
              Geography shown from Natural Earth. This territory has no country dossier
              yet — {COUNTRY_INDEX.length} of 195 sovereign states are currently covered.
            </p>
          )}
        </div>
      )}

      {/* Coverage notice for a territory without a dossier */}
      {notice && !hoveredIso && (
        <div
          role="status"
          style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '1.25rem',
            zIndex: 20,
            fontSize: '11px',
            lineHeight: 1.4,
            color: 'var(--text-secondary)',
            background: 'rgba(7, 9, 14, 0.92)',
            border: '1px solid var(--border-medium)',
            borderLeft: '3px solid var(--accent-gold)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.45rem 0.7rem',
            maxWidth: '26rem',
          }}
        >
          {notice}
        </div>
      )}

      {/* Map Hint Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: '0.65rem',
          right: '1rem',
          fontSize: '10px',
          color: 'var(--text-tertiary)',
          pointerEvents: 'none',
          background: 'rgba(5, 7, 10, 0.6)',
          padding: '2px 8px',
          borderRadius: '4px',
        }}
      >
        Click a country to explore • Drag to pan • Scroll to zoom
      </div>
    </div>
  );
};
