import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, MapPin, TrendingUp, ShieldCheck, ArrowRight, Compass } from 'lucide-react';
import { ALL_COUNTRY_PROFILES } from '../../data';
import { RegionId } from '../../types/spatial';

interface WorldMap2DProps {
  onSelectCountry: (countryId: string) => void;
  onSelectRegion?: (regionId: RegionId) => void;
  selectedRegionId?: RegionId;
}

interface CountryNode {
  id: string;
  name: string;
  officialName: string;
  capital: string;
  flag: string;
  regionId: RegionId;
  subregionId: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
  gdpPerCapitaPppUsd: number;
  population: number;
  safetyScore: number;
}

// Convert Lat/Lng to Equirectangular SVG coordinates (1000 x 500)
function projectCoordinates(lat: number, lng: number): [number, number] {
  // Equirectangular projection
  // X: -180..180 -> 0..1000
  // Y: 90..-90 -> 0..500
  const x = ((lng + 180) / 360) * 1000;
  // Use a slight Miller-like scaling to avoid excessive polar distortion
  const clampedLat = Math.max(-80, Math.min(84, lat));
  const y = ((90 - clampedLat) / 180) * 500;
  return [x, y];
}

// Simplified continent landmass SVG paths for clean, high-performance vector rendering
const CONTINENT_PATHS = [
  // North America
  'M 120 70 L 150 60 L 220 50 L 290 65 L 320 100 L 295 130 L 270 145 L 260 170 L 245 200 L 230 220 L 210 240 L 205 230 L 195 210 L 180 185 L 150 170 L 130 140 L 115 105 Z M 275 35 L 325 30 L 350 45 L 335 70 L 295 65 Z',
  // South America
  'M 245 245 L 270 240 L 305 255 L 330 270 L 340 310 L 325 350 L 300 410 L 285 450 L 270 470 L 265 440 L 260 380 L 240 320 L 235 270 Z',
  // Europe
  'M 470 100 L 515 90 L 545 105 L 535 135 L 515 155 L 490 160 L 460 150 L 465 125 Z M 440 90 L 470 80 L 465 110 L 440 100 Z M 485 55 L 520 50 L 545 70 L 510 85 Z',
  // Africa
  'M 460 175 L 515 170 L 560 185 L 595 245 L 560 300 L 540 365 L 520 415 L 490 410 L 470 330 L 440 270 L 445 220 Z M 575 330 L 590 330 L 585 370 L 570 365 Z',
  // Asia
  'M 545 105 L 610 80 L 710 65 L 810 75 L 870 105 L 850 160 L 800 190 L 760 215 L 725 240 L 675 250 L 630 230 L 585 240 L 570 210 L 565 155 Z M 670 255 L 710 245 L 715 285 L 675 295 Z M 750 250 L 780 260 L 775 310 L 740 295 Z M 820 150 L 845 160 L 840 210 L 815 195 Z',
  // Australia & Oceania
  'M 770 340 L 850 335 L 890 375 L 865 425 L 800 425 L 765 380 Z M 895 410 L 920 425 L 905 450 L 885 435 Z M 730 315 L 785 315 L 770 335 Z',
];

const REGION_ACCENT_COLORS: Record<RegionId, string> = {
  asia: '#E5B558',      // Gold
  europe: '#38BDF8',    // Cyan
  americas: '#34D399',  // Emerald
  africa: '#FB7185',    // Rose
  oceania: '#A78BFA',   // Violet
  // `RegionId` carries a reserved 'polar' member that no Region declares yet.
  // Record<RegionId, ...> therefore has to cover it; see AGENTS.md.
  polar: '#7DD3FC',
};

const REGION_BOUNDS: Record<RegionId, { x: number; y: number; zoom: number }> = {
  asia: { x: -350, y: -50, zoom: 1.6 },
  europe: { x: -180, y: -20, zoom: 2.1 },
  americas: { x: 50, y: -80, zoom: 1.4 },
  africa: { x: -200, y: -120, zoom: 1.6 },
  oceania: { x: -500, y: -220, zoom: 1.8 },
  // Reserved union member — unreachable until a Region declares it.
  polar: { x: 0, y: 0, zoom: 1 },
};

export const WorldMap2D: React.FC<WorldMap2DProps> = ({
  onSelectCountry,
  onSelectRegion,
  selectedRegionId,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Pan and Zoom State
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Hovered Country Node for rich telemetry card
  const [hoveredNode, setHoveredNode] = useState<CountryNode | null>(null);
  const [activeFilterRegion, setActiveFilterRegion] = useState<RegionId | 'all'>('all');

  // Convert country profiles to projected coordinate nodes
  const nodes: CountryNode[] = ALL_COUNTRY_PROFILES.map((c) => {
    const [x, y] = projectCoordinates(c.geography.coordinates[0], c.geography.coordinates[1]);
    return {
      id: c.id,
      name: c.name,
      officialName: c.officialName,
      capital: c.capital.name,
      flag: c.flag.emoji,
      regionId: c.regionId,
      subregionId: c.subregionId,
      lat: c.geography.coordinates[0],
      lng: c.geography.coordinates[1],
      x,
      y,
      gdpPerCapitaPppUsd: c.economy.gdpPerCapitaPppUsd,
      population: c.demographics.population,
      safetyScore: c.safetyAndGovernance.safetyIndexNumbeo,
    };
  });

  // Handle external region selection sync
  useEffect(() => {
    if (selectedRegionId) {
      setActiveFilterRegion(selectedRegionId);
      const target = REGION_BOUNDS[selectedRegionId];
      if (target) {
        setPan({ x: target.x, y: target.y });
        setZoom(target.zoom);
      }
    }
  }, [selectedRegionId]);

  // Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.35, 3.2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.35, 0.9));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setActiveFilterRegion('all');
  };

  // Region filter switch
  const handleFilterRegion = (regId: RegionId | 'all') => {
    setActiveFilterRegion(regId);
    if (regId === 'all') {
      handleReset();
    } else {
      const target = REGION_BOUNDS[regId];
      if (target) {
        setPan({ x: target.x, y: target.y });
        setZoom(target.zoom);
      }
      if (onSelectRegion) {
        onSelectRegion(regId);
      }
    }
  };

  // Mouse drag pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Primary button only
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y,
    });
  }, [isPanning, startPan]);

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

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setZoom((prev) => Math.max(0.85, Math.min(3.2, prev + delta)));
  };

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
          }}
        >
          <button
            onClick={() => handleFilterRegion('all')}
            style={{
              background: activeFilterRegion === 'all' ? 'var(--accent-gold)' : 'transparent',
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
            All Spheres ({nodes.length})
          </button>
          {(['asia', 'europe', 'americas', 'africa', 'oceania'] as RegionId[]).map((rId) => {
            const count = nodes.filter((n) => n.regionId === rId).length;
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
          })}
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
            <ZoomIn size={15} />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
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
            <ZoomOut size={15} />
          </button>
          <div style={{ width: '1px', height: '14px', background: 'var(--border-subtle)' }} />
          <button
            onClick={handleReset}
            title="Reset Map View"
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
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid slice"
          style={{
            width: '100%',
            height: '100%',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '50% 50%',
            transition: isPanning ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <defs>
            {/* Graticule pattern */}
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
          <rect width="1000" height="500" fill="url(#oceanGradient)" />

          {/* Graticules / Reference Latitude & Longitude Lines */}
          <g stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.75" strokeDasharray="3,3">
            {/* Latitude parallels */}
            <line x1="0" y1="83" x2="1000" y2="83" />   {/* 60° N */}
            <line x1="0" y1="166" x2="1000" y2="166" /> {/* 30° N */}
            <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(229, 181, 88, 0.15)" strokeWidth="1" strokeDasharray="none" /> {/* Equator */}
            <line x1="0" y1="333" x2="1000" y2="333" /> {/* 30° S */}
            <line x1="0" y1="416" x2="1000" y2="416" /> {/* 60° S */}

            {/* Longitude meridians */}
            <line x1="250" y1="0" x2="250" y2="500" /> {/* 90° W */}
            <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" strokeDasharray="none" /> {/* Prime Meridian */}
            <line x1="750" y1="0" x2="750" y2="500" /> {/* 90° E */}
          </g>

          {/* Continental Silhouettes */}
          <g fill="rgba(25, 34, 52, 0.65)" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1.2">
            {CONTINENT_PATHS.map((pathStr, idx) => (
              <path key={idx} d={pathStr} />
            ))}
          </g>

          {/* Country Nodes / Sovereignty Points */}
          <g>
            {nodes.map((node) => {
              const isRegionMatch = activeFilterRegion === 'all' || node.regionId === activeFilterRegion;
              const isHovered = hoveredNode?.id === node.id;
              const color = REGION_ACCENT_COLORS[node.regionId] || '#E5B558';

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  style={{
                    cursor: 'pointer',
                    opacity: isRegionMatch ? 1 : 0.25,
                    transition: 'opacity 0.2s ease',
                  }}
                  onClick={() => onSelectCountry(node.id)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Outer pulsating radar ring */}
                  <circle
                    r={isHovered ? 14 : 9}
                    fill="none"
                    stroke={color}
                    strokeWidth={isHovered ? 2 : 1}
                    strokeOpacity={isHovered ? 0.8 : 0.35}
                    style={{
                      transition: 'all 0.2s ease',
                    }}
                  />

                  {/* Core Pin */}
                  <circle
                    r={isHovered ? 5.5 : 4}
                    fill={color}
                    filter="url(#nodeGlow)"
                    style={{
                      transition: 'r 0.2s ease',
                    }}
                  />

                  {/* Label Text for Active / Zoomed View */}
                  {(zoom >= 1.2 || isHovered || activeFilterRegion === node.regionId) && (
                    <text
                      x={8}
                      y={-6}
                      fill={isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)'}
                      fontSize="9px"
                      fontFamily="var(--font-display)"
                      fontWeight={isHovered ? 700 : 500}
                      style={{
                        pointerEvents: 'none',
                        textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                      }}
                    >
                      {node.flag} {node.name}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Floating Telemetry HUD Card for Hovered Country */}
      {hoveredNode && (
        <div
          style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '1.25rem',
            zIndex: 20,
            background: 'rgba(7, 9, 14, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: `1px solid ${REGION_ACCENT_COLORS[hoveredNode.regionId]}`,
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            minWidth: '280px',
            maxWidth: '340px',
            boxShadow: 'var(--shadow-lg), 0 0 20px rgba(0,0,0,0.8)',
            animation: 'fadeIn 0.15s ease',
            pointerEvents: 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{hoveredNode.flag}</span>
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 800 }}>
                  {hoveredNode.name}
                </h4>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Capital: {hoveredNode.capital}
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '2px 7px',
                borderRadius: '999px',
                background: `${REGION_ACCENT_COLORS[hoveredNode.regionId]}20`,
                color: REGION_ACCENT_COLORS[hoveredNode.regionId],
                border: `1px solid ${REGION_ACCENT_COLORS[hoveredNode.regionId]}50`,
              }}
            >
              {hoveredNode.regionId}
            </span>
          </div>

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
                ${hoveredNode.gdpPerCapitaPppUsd.toLocaleString()}
              </strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-tertiary)' }}>Safety Index:</span>{' '}
              <strong style={{ color: 'var(--accent-emerald)' }}>
                {hoveredNode.safetyScore}/100
              </strong>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>Population:</span>{' '}
              <strong>{(hoveredNode.population / 1000000).toFixed(1)}M</strong>
            </div>
          </div>

          <button
            onClick={() => onSelectCountry(hoveredNode.id)}
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
        Click pin to explore • Drag to pan • Scroll to zoom
      </div>
    </div>
  );
};
