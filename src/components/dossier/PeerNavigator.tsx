import React from 'react';
import { Compass, ArrowRight, TrendingUp, Sun, MapPin } from 'lucide-react';
import { CountryProfile } from '../../types/country';
import { getCountrySummaryById } from '../../data';

interface PeerNavigatorProps {
  country: CountryProfile;
  onSelectCountry: (countryId: string) => void;
}

export const PeerNavigator: React.FC<PeerNavigatorProps> = ({ country, onSelectCountry }) => {
  const { economicTwins, climaticTwins, regionalNeighbors } = country.analyticalPeers;

  return (
    <section style={{ paddingTop: '2.5rem', paddingBottom: '3.5rem', background: 'rgba(5, 7, 10, 0.5)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <Compass size={22} color="var(--accent-gold)" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
            Lateral Exploration: Analytical Peers
          </h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '1.75rem', maxWidth: '780px' }}>
          Leapfrog beyond geography: Discover countries that share macroeconomic structures, climatological profiles, or direct territorial borders.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Economic Peers */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <TrendingUp size={16} color="var(--accent-gold)" />
              <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Macroeconomic Twins
              </h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {economicTwins.map((id) => {
                const peer = getCountrySummaryById(id);
                if (!peer) return null;
                return (
                  <div
                    key={id}
                    onClick={() => onSelectCountry(peer.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      background: 'var(--bg-surface-elevated)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      border: '1px solid var(--border-subtle)',
                      transition: 'all var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-gold)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>{peer.flagEmoji}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{peer.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          ${peer.gdpPerCapitaPppUsd.toLocaleString()} PPP
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={14} color="var(--accent-gold)" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Climatic Peers */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <Sun size={16} color="var(--accent-amber)" />
              <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Climatological Siblings
              </h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {climaticTwins.map((id) => {
                const peer = getCountrySummaryById(id);
                if (!peer) return null;
                return (
                  <div
                    key={id}
                    onClick={() => onSelectCountry(peer.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      background: 'var(--bg-surface-elevated)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      border: '1px solid var(--border-subtle)',
                      transition: 'all var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-amber)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>{peer.flagEmoji}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{peer.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{peer.climateSummary}</div>
                      </div>
                    </div>
                    <ArrowRight size={14} color="var(--accent-amber)" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Regional Neighbors */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <MapPin size={16} color="var(--accent-cyan)" />
              <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Regional Neighbors
              </h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {regionalNeighbors.map((id) => {
                const peer = getCountrySummaryById(id);
                if (!peer) return null;
                return (
                  <div
                    key={id}
                    onClick={() => onSelectCountry(peer.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      background: 'var(--bg-surface-elevated)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      border: '1px solid var(--border-subtle)',
                      transition: 'all var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>{peer.flagEmoji}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{peer.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Capital: {peer.capital}</div>
                      </div>
                    </div>
                    <ArrowRight size={14} color="var(--accent-cyan)" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
