import React, { useState } from 'react';
import { Globe, Map as MapIcon, ArrowRight, Sparkles, Compass, Filter } from 'lucide-react';
import { GlobeCanvas } from '../globe/GlobeCanvas';
import { WorldMap2D } from './WorldMap2D';
import { getAllRegions, getAllSubregions, getCountriesBySubregion, getThematicPortals } from '../../data';
import { RegionId } from '../../types/spatial';

interface WorldPortalProps {
  onSelectRegion: (regionId: RegionId) => void;
  onSelectSubregion?: (subregionId: string) => void;
  onSelectCountry: (countryId: string) => void;
  onOpenThematic: (portalId?: string) => void;
  onOpenFilter?: () => void;
}

export const WorldPortal: React.FC<WorldPortalProps> = ({
  onSelectRegion,
  onSelectSubregion,
  onSelectCountry,
  onOpenThematic,
  onOpenFilter,
}) => {
  const regions = getAllRegions();
  const subregions = getAllSubregions();
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
            Explore the Middle East Through Context &amp; Intelligence
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
            A high-resolution regional instrument connecting geographic spatial descent with verified economics, daily central bank exchange rates, demographics, and comparative benchmarks across the Middle East & West Asia.
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

      {/* 5 Geo-Strategic Subregions Grid */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Compass size={22} color="var(--accent-gold)" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
                The 5 Geo-Strategic Subregions
              </h3>
            </div>
            <span className="badge badge-gold">26 Sovereign Nations</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '1.75rem' }}>
            Select any subregional zone to descend into its territory, or jump directly into any member sovereign state's briefing.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {subregions.map((sub) => {
              const subCountries = getCountriesBySubregion(sub.id);
              return (
                <div
                  key={sub.id}
                  className="glass-panel"
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderTop: '3px solid var(--accent-gold)',
                    transition: 'all var(--transition-normal)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.5rem' }}>
                      <h4
                        onClick={() => (onSelectSubregion ? onSelectSubregion(sub.id) : onSelectRegion('middle-east'))}
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.35rem',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                        }}
                      >
                        {sub.name}
                      </h4>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: 'var(--accent-cyan)',
                          background: 'rgba(56, 189, 248, 0.08)',
                          padding: '3px 8px',
                          borderRadius: '999px',
                          border: '1px solid rgba(56, 189, 248, 0.2)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {subCountries.length} States
                      </span>
                    </div>

                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {sub.description}
                    </p>

                    {/* Member States Flag Pills */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Member States:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {subCountries.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => onSelectCountry(c.id)}
                            style={{
                              background: 'var(--bg-surface-elevated)',
                              border: '1px solid var(--border-subtle)',
                              borderRadius: 'var(--radius-full)',
                              padding: '0.2rem 0.6rem',
                              fontSize: '12px',
                              color: 'var(--text-primary)',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'var(--accent-gold)';
                              e.currentTarget.style.background = 'rgba(229, 181, 88, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'var(--border-subtle)';
                              e.currentTarget.style.background = 'var(--bg-surface-elevated)';
                            }}
                            title={`Open ${c.name} Dossier`}
                          >
                            <span>{c.flagEmoji}</span>
                            <span>{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => (onSelectSubregion ? onSelectSubregion(sub.id) : onSelectRegion('middle-east'))}
                      className="btn-secondary"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        fontSize: 'var(--text-xs)',
                        padding: '0.6rem 1rem',
                      }}
                    >
                      <span>Descend into {sub.name}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
