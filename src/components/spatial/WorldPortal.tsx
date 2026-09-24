import React, { useState } from 'react';
import { Globe, Map as MapIcon, ArrowRight, Sparkles, Compass, Filter } from 'lucide-react';
import { GlobeCanvas } from '../globe/GlobeCanvas';
import { WorldMap2D } from './WorldMap2D';
import { getAllRegions, getThematicPortals } from '../../data';
import { RegionId } from '../../types/spatial';

interface WorldPortalProps {
  onSelectRegion: (regionId: RegionId) => void;
  onSelectCountry: (countryId: string) => void;
  onOpenThematic: (portalId?: string) => void;
  onOpenFilter?: () => void;
}

export const WorldPortal: React.FC<WorldPortalProps> = ({
  onSelectRegion,
  onSelectCountry,
  onOpenThematic,
  onOpenFilter,
}) => {
  const regions = getAllRegions();
  const thematicPortals = getThematicPortals();
  const [mapMode, setMapMode] = useState<'2d' | '3d'>('2d');

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Hero Section: Atmospheric Cartography & Planetary Command */}
      <section
        style={{
          position: 'relative',
          paddingTop: '2.5rem',
          paddingBottom: '3rem',
          background: 'radial-gradient(circle at 50% 20%, rgba(56, 189, 248, 0.08) 0%, rgba(7, 9, 14, 0) 70%)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          {/* Tagline */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-gold">Planetary Observatory</span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              Interactive Sovereign Cartography
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              maxWidth: '860px',
              margin: '0 auto 1rem',
              background: 'linear-gradient(135deg, #FFFFFF 20%, var(--accent-gold) 60%, var(--accent-cyan) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Explore the World Through Context &amp; Intelligence
          </h1>

          <p
            style={{
              fontSize: 'var(--text-md)',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0 auto 1.75rem',
              lineHeight: 1.6,
            }}
          >
            A high-resolution planetary instrument connecting geographic spatial descent with verified economics, daily central bank exchange rates, demographics, and comparative benchmarks.
          </p>

          {/* Cartographic View Mode & Action Selector */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {/* 2D / 3D Switch Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(14, 18, 28, 0.85)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-full)',
                padding: '3px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <button
                onClick={() => setMapMode('2d')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: mapMode === '2d' ? 'var(--accent-gold)' : 'transparent',
                  color: mapMode === '2d' ? '#07090E' : 'var(--text-secondary)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <MapIcon size={14} />
                <span>2D Vector Map</span>
              </button>
              <button
                onClick={() => setMapMode('3d')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: mapMode === '3d' ? 'var(--accent-cyan)' : 'transparent',
                  color: mapMode === '3d' ? '#07090E' : 'var(--text-secondary)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <Globe size={14} />
                <span>3D Celestial Globe</span>
              </button>
            </div>

            {/* Multi-Criteria Filter Quick Launcher */}
            {onOpenFilter && (
              <button
                onClick={onOpenFilter}
                className="btn-secondary"
                style={{
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Filter size={13} color="var(--accent-gold)" />
                <span>Multi-Criteria Discovery</span>
              </button>
            )}
          </div>

          {/* Map/Globe Viewport */}
          <div style={{ margin: '0 auto 1.5rem', maxWidth: mapMode === '2d' ? '1020px' : '720px' }}>
            {mapMode === '2d' ? (
              <WorldMap2D onSelectCountry={onSelectCountry} onSelectRegion={onSelectRegion} />
            ) : (
              <GlobeCanvas onSelectCountry={onSelectCountry} onSelectRegion={onSelectRegion} />
            )}
          </div>
        </div>
      </section>

      {/* Thematic Discovery Portals Quick Strip */}
      <section style={{ padding: '2.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="var(--accent-gold)" />
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Curated Thematic Portals</h3>
            </div>
            <button
              onClick={() => onOpenThematic()}
              className="btn-secondary"
              style={{ fontSize: 'var(--text-xs)', padding: '0.35rem 0.85rem' }}
            >
              <span>View All Thematic Lenses</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
            }}
          >
            {thematicPortals.slice(0, 4).map((portal) => (
              <div
                key={portal.id}
                onClick={() => onOpenThematic(portal.id)}
                className="interactive-card"
                style={{
                  cursor: 'pointer',
                  borderLeft: `3px solid ${portal.accentColor}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                    {portal.title}
                  </span>
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '0.65rem' }}>
                  {portal.tagline}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: portal.accentColor, fontSize: '11px', fontWeight: 600 }}>
                  <span>{portal.countryIds.length} Flagship Nations</span>
                  <ArrowRight size={11} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continental Macro Spheres Grid */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <Compass size={22} color="var(--accent-gold)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
              The 5 Continental Spheres
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '1.75rem' }}>
            Select a macro continental sphere to descend into its subregions, sovereign states, and economic territories.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {regions.map((reg) => (
              <div
                key={reg.id}
                onClick={() => onSelectRegion(reg.id)}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `3px solid ${reg.color}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = reg.color;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {reg.name}
                    </h4>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: reg.color,
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '3px 8px',
                        borderRadius: '999px',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {reg.subregions.length} Subregions
                    </span>
                  </div>

                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {reg.overview}
                  </p>
                </div>

                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      background: 'var(--bg-surface-elevated)',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '1rem',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    <span>
                      Population: <strong style={{ color: 'var(--text-primary)' }}>{(reg.totalPopulation / 1000000000).toFixed(2)}B</strong>
                    </span>
                    <span>
                      GDP: <strong style={{ color: 'var(--accent-gold)' }}>${reg.totalGdpTrillionUsd}T</strong>
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem', color: reg.color, fontSize: 'var(--text-xs)', fontWeight: 700 }}>
                    <span>Descend into {reg.name}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
