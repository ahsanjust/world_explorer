import React from 'react';
import {Landmark, Utensils, Compass, Sparkles} from 'lucide-react';
import { CountryProfile } from '../../types/country';

interface CultureHeritageModuleProps {
  country: CountryProfile;
}

export const CultureHeritageModule: React.FC<CultureHeritageModuleProps> = ({ country }) => {
  const cult = country.cultureAndLifestyle;

  return (
    <section id="culture" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <Landmark size={22} color="var(--accent-gold)" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
            Culture, Heritage &amp; Landmarks
          </h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '1.75rem', maxWidth: '780px' }}>
          UNESCO World Heritage inscriptions, iconic national monuments, culinary traditions, and luxury lifestyle infrastructure.
        </p>

        {/* Top Landmarks Showcase Cards */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Iconic Landmarks &amp; Monuments
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {cult.topLandmarks.map((lm, idx) => (
              <div
                key={idx}
                className="interactive-card"
                style={{
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Landmark Image */}
                <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={lm.imageUrl}
                    alt={lm.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform var(--transition-slow)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '60%',
                      background: 'linear-gradient(to top, rgba(7, 9, 14, 0.95) 0%, transparent 100%)',
                    }}
                  />
                  <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '0.35rem' }}>
                    <span className="badge badge-muted" style={{ background: 'rgba(7, 9, 14, 0.75)', backdropFilter: 'blur(8px)' }}>
                      {lm.category}
                    </span>
                    {lm.unescoDesignated && (
                      <span className="badge badge-gold" style={{ background: 'rgba(7, 9, 14, 0.75)', backdropFilter: 'blur(8px)' }}>
                        UNESCO Heritage
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h5 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {lm.name}
                    </h5>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-gold-light)', marginTop: '2px' }}>
                      📍 {lm.location}
                    </div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.65rem', lineHeight: 1.5 }}>
                      {lm.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Culinary Traditions & Cultural Etiquette Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Culinary Traditions */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Utensils size={18} color="var(--accent-gold)" />
              <span>National Culinary Traditions</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {cult.culinaryTraditions.map((dish, i) => (
                <div key={i} style={{ borderBottom: i < cult.culinaryTraditions.length - 1 ? '1px solid var(--border-subtle)' : 'none', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                      {dish.name}
                    </span>
                    {dish.nationalStatus && (
                      <span className="badge badge-gold" style={{ fontSize: '10px' }}>National Dish</span>
                    )}
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: 1.4 }}>
                    {dish.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Etiquette */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Compass size={18} color="var(--accent-cyan)" />
              <span>Etiquette &amp; Social Customs</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {cult.culturalNormsAndEtiquette.map((norm, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    padding: '0.65rem 0.85rem',
                    background: 'var(--bg-surface-elevated)',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '3px solid var(--accent-cyan)',
                    lineHeight: 1.4,
                  }}
                >
                  {norm}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Luxury & Prime Hospitality Infrastructure */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(229, 181, 88, 0.08) 0%, rgba(21, 27, 42, 0.7) 100%)',
            border: '1px solid rgba(229, 181, 88, 0.25)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Sparkles size={18} color="var(--accent-gold)" />
            <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-primary)' }}>
              Luxury, Private Aviation &amp; Prime Living
            </h4>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>5-Star Luxury Resorts</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                {cult.luxuryLifestyle.fiveStarHotelsCount}+
              </div>
            </div>

            {cult.luxuryLifestyle.michelinStarredVenuesCount !== undefined && (
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Michelin-Starred Venues</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-rose)' }}>
                  {cult.luxuryLifestyle.michelinStarredVenuesCount}
                </div>
              </div>
            )}

            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Prime Residential Tier</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                {cult.luxuryLifestyle.primeResidentialTier}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Residency / Golden Visa</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: cult.luxuryLifestyle.residencyOrGoldenVisaAvailable ? 'var(--accent-emerald)' : 'var(--text-tertiary)' }}>
                {cult.luxuryLifestyle.residencyOrGoldenVisaAvailable ? 'Available' : 'Restricted'}
              </div>
            </div>
          </div>

          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
            <strong>Tax Framework Summary:</strong> {cult.luxuryLifestyle.taxNotes}
          </div>
        </div>
      </div>
    </section>
  );
};
