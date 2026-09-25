import React, { useEffect, useState } from 'react';
import { CountryProfile } from '../../types/country';
import { DossierHero } from './DossierHero';
import { StickyNavRail } from './StickyNavRail';
import { SECTIONS } from './sections';
import { EconomyModule } from './EconomyModule';
import { CurrencyModule } from './CurrencyModule';
import { DemographicsModule } from './DemographicsModule';
import { CostOfLivingModule } from './CostOfLivingModule';
import { SafetyModule } from './SafetyModule';
import { ClimateModule } from './ClimateModule';
import { EducationModule } from './EducationModule';
import { CultureHeritageModule } from './CultureHeritageModule';
import { PeerNavigator } from './PeerNavigator';

interface CountryProfileViewProps {
  country: CountryProfile;
  isPinned: boolean;
  onTogglePin: () => void;
  onSelectCountry: (countryId: string) => void;
}

export const CountryProfileView: React.FC<CountryProfileViewProps> = ({
  country,
  isPinned,
  onTogglePin,
  onSelectCountry,
}) => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  /* Scroll-spy: keep the rail in sync while the user scrolls, not just on click.
     The IntersectionObserver is only the *change trigger*; activation is decided
     by geometry — the last section whose top has passed a reading line 35% down
     the viewport — which stays correct for sections of very different heights and
     never flickers between two short sections. rAF-throttled so scroll bursts
     cost at most one pass per frame. */
  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return; // modules not mounted (defensive)

    let frame = 0;
    const sync = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= readingLine) current = id;
      }
      setActiveSection((prev) => (prev === current ? prev : current));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(sync);
    };

    const observer = new IntersectionObserver(schedule, {
      rootMargin: '0px 0px -55% 0px', // fire when a section crosses the upper band
      threshold: [0, 1],
    });
    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [country.id]);

  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Honour reduced motion: JS-driven smooth scrolling ignores the CSS
      // `scroll-behavior` override that the global reduced-motion block sets.
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      {/* 1. Flagship Dossier Hero */}
      <DossierHero country={country} isPinned={isPinned} onTogglePin={onTogglePin} />

      {/* 2. Sticky Anchor Navigation Rail */}
      <StickyNavRail activeSection={activeSection} onSelectSection={handleSelectSection} />

      {/* 3. Overview Narrative Section */}
      <section id="overview" style={{ paddingTop: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--accent-gold)' }}>
              Sovereign Overview &amp; Geopolitical Profile
            </h3>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)', lineHeight: 1.7, opacity: 0.95 }}>
              {country.overview}
            </p>

            {/* Geographical Extremes Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginTop: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: 'var(--text-xs)',
              }}
            >
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>HIGHEST ELEVATION</span>
                <div style={{ fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                  {country.geography.highestPoint.name} ({country.geography.highestPoint.elevationMeters}m)
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>LOWEST ELEVATION</span>
                <div style={{ fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                  {country.geography.lowestPoint.name} ({country.geography.lowestPoint.elevationMeters}m)
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>COASTLINE EXTENT</span>
                <div style={{ fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                  {country.geography.coastlineKm.toLocaleString()} km
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>TERRITORIAL BORDERS</span>
                <div style={{ fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                  {country.geography.borders.length > 0
                    ? `${country.geography.borders.length} neighboring state(s)`
                    : 'Island / Maritime Boundary'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Macroeconomics Module */}
      <EconomyModule country={country} />

      {/* 5. Live Currency & Exchange Module */}
      <CurrencyModule country={country} />

      {/* 6. Demographics Module */}
      <DemographicsModule country={country} />

      {/* 7. Cost of Living Module */}
      <CostOfLivingModule country={country} />

      {/* 8. Safety & Governance Module */}
      <SafetyModule country={country} />

      {/* 9. Climate & Climatology Module */}
      <ClimateModule country={country} />

      {/* 10. Higher Education & Research Module */}
      <EducationModule country={country} />

      {/* 11. Culture, Heritage & Luxury Module */}
      <CultureHeritageModule country={country} />

      {/* 12. Peer Lateral Navigator */}
      <PeerNavigator country={country} onSelectCountry={onSelectCountry} />

      {/* 13. Data Provenance & Citations Footer */}
      <footer style={{ padding: '2.5rem 0', background: 'rgba(5, 7, 10, 0.85)', borderTop: '1px solid var(--border-subtle)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
        <div className="container">
          <div style={{ fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            Authoritative Data Provenance &amp; Verification
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
            {country.metadata.citations.map((cite, idx) => (
              <span key={idx}>
                <strong>{cite.domain}:</strong> {cite.sourceName}
              </span>
            ))}
          </div>
          <div style={{ marginTop: '0.75rem', color: 'var(--text-tertiary)' }}>
            Record verified on {country.metadata.lastVerifiedDate} • Daily Central Bank Currency Rate cached client-side in browser.
          </div>
        </div>
      </footer>
    </div>
  );
};
