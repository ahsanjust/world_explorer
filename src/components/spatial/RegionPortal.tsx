import React from 'react';
import { Compass, ArrowRight, MapPin, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { Region } from '../../types/spatial';
import { getSubregionsByRegion, getCountriesByRegion } from '../../data';

interface RegionPortalProps {
  region: Region;
  onSelectSubregion: (subregionId: string) => void;
  onSelectCountry: (countryId: string) => void;
}

export const RegionPortal: React.FC<RegionPortalProps> = ({
  region,
  onSelectSubregion,
  onSelectCountry,
}) => {
  const subregions = getSubregionsByRegion(region.id);
  const countries = getCountriesByRegion(region.id);

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Continental Hero Banner */}
      <section
        style={{
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: `radial-gradient(ellipse at 50% 0%, ${region.color}18 0%, rgba(7, 9, 14, 0) 70%)`,
        }}
      >
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
            <span className="badge" style={{ background: `${region.color}20`, color: region.color, border: `1px solid ${region.color}50` }}>
              Sovereign Sphere: Greater Middle East
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              {region.hemisphere} Hemisphere
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: '0.75rem',
            }}
          >
            {region.name}
          </h1>

          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            {region.overview}
          </p>

          {/* Regional Macro Indicators */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Total Population</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                {region.totalPopulation != null
                  ? `${(region.totalPopulation / 1000000).toFixed(0)} Million`
                  : '—'}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Combined GDP</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '2px' }}>
                ${region.totalGdpTrillionUsd} Trillion
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Subregional Zones</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '2px' }}>
                {subregions.length} Defined Zones
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Flagship Cohort</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '2px' }}>
                {countries.length} Loaded Profiles
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subregions Grid */}
      <section style={{ padding: '2.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <Compass size={20} color="var(--accent-gold)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800 }}>
              Subregional Portals in {region.name}
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', marginBottom: '1.5rem' }}>
            Select a subregion to narrow into localized geopolitical zones and country matrices.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {subregions.map((sub) => (
              <div
                key={sub.id}
                onClick={() => onSelectSubregion(sub.id)}
                className="interactive-card"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: '2px solid var(--accent-cyan)',
                }}
              >
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: 'var(--text-md)', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {sub.name}
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '1rem' }}>
                    {sub.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem', color: 'var(--accent-cyan)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>
                  <span>Explore Subregion</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Sovereign Nations Grid */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: '0.5rem' }}>
            All 26 Sovereign Nations in {region.name}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', marginBottom: '1.5rem' }}>
            Deep socio-economic briefings, verified demographics, and live daily central bank currency rates.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {countries.map((country) => (
              <div
                key={country.id}
                onClick={() => onSelectCountry(country.id)}
                className="glass-panel"
                style={{
                  padding: '1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all var(--transition-normal)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '2rem' }}>{country.flagEmoji}</span>
                      <div>
                        <h4 style={{ fontWeight: 700, fontSize: 'var(--text-md)', color: 'var(--text-primary)' }}>
                          {country.name}
                        </h4>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                          Capital: <strong style={{ color: 'var(--text-primary)' }}>{country.capital}</strong>
                        </div>
                      </div>
                    </div>
                    <span className="badge badge-muted">{country.iso3}</span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.5rem',
                      padding: '0.65rem',
                      background: 'var(--bg-surface-elevated)',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '1rem',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    <div>
                      <div style={{ color: 'var(--text-tertiary)', fontSize: '10px' }}>GDP PER CAPITA</div>
                      <div style={{ fontWeight: 700, color: 'var(--accent-gold-light)', marginTop: '1px' }}>
                        ${country.gdpPerCapitaPppUsd.toLocaleString()} PPP
                      </div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-tertiary)', fontSize: '10px' }}>SAFETY INDEX</div>
                      <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', marginTop: '1px' }}>
                        {country.safetyIndex}/100
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem', color: 'var(--accent-gold)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>
                  <span>Open Full Dossier</span>
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
