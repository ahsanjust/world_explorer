import React from 'react';
import { Compass, ArrowRight, MapPin, TrendingUp, Users, ShieldCheck, DollarSign } from 'lucide-react';
import { Subregion, Region } from '../../types/spatial';
import { getCountriesBySubregion } from '../../data';

interface SubregionPortalProps {
  region: Region;
  subregion: Subregion;
  onSelectCountry: (countryId: string) => void;
}

export const SubregionPortal: React.FC<SubregionPortalProps> = ({
  region,
  subregion,
  onSelectCountry,
}) => {
  const countries = getCountriesBySubregion(subregion.id);

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Subregion Focal Header */}
      <section
        style={{
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(56, 189, 248, 0.12) 0%, rgba(7, 9, 14, 0) 70%)',
        }}
      >
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-gold">{region.name}</span>
            <span className="badge badge-cyan">Subregional Zone</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: '0.75rem',
            }}
          >
            {subregion.name}
          </h1>

          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            {subregion.description}
          </p>

          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={13} color="var(--accent-cyan)" />
            <span>
              Geographic Center: {subregion.centerCoordinates[0]}°N, {subregion.centerCoordinates[1]}°E
            </span>
          </div>
        </div>
      </section>

      {/* Sovereign Nations in Subregion */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800 }}>
                Sovereign States in {subregion.name}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', marginTop: '2px' }}>
                Select any nation to access its complete 8-lens intelligence briefing.
              </p>
            </div>
            <span className="badge badge-muted">{countries.length} Nations Loaded</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {countries.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCountry(c.id)}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all var(--transition-normal)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <span style={{ fontSize: '2.25rem' }}>{c.flagEmoji}</span>
                      <div>
                        <h4 style={{ fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--text-primary)' }}>
                          {c.name}
                        </h4>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <MapPin size={11} color="var(--accent-gold)" />
                          <span>Capital: <strong>{c.capital}</strong></span>
                        </div>
                      </div>
                    </div>
                    <span className="badge badge-gold" style={{ fontSize: '11px' }}>
                      {c.iso3}
                    </span>
                  </div>

                  {/* 3 Metrics Strip */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '0.5rem',
                      padding: '0.75rem',
                      background: 'var(--bg-surface-elevated)',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '1rem',
                      fontSize: 'var(--text-xs)',
                      textAlign: 'center',
                    }}
                  >
                    <div>
                      <div style={{ color: 'var(--text-tertiary)', fontSize: '10px' }}>POPULATION</div>
                      <div style={{ fontWeight: 700, marginTop: '2px' }}>
                        {(c.population / 1000000).toFixed(1)}M
                      </div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-tertiary)', fontSize: '10px' }}>GDP/CAP (PPP)</div>
                      <div style={{ fontWeight: 700, color: 'var(--accent-gold-light)', marginTop: '2px' }}>
                        ${(c.gdpPerCapitaPppUsd / 1000).toFixed(1)}k
                      </div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-tertiary)', fontSize: '10px' }}>SAFETY</div>
                      <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', marginTop: '2px' }}>
                        {c.safetyIndex}/100
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem', color: 'var(--accent-gold)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>
                  <span>Open Full Briefing</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
