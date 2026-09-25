import React, { useState, useMemo } from 'react';
import {GraduationCap, ExternalLink, Search, Globe} from 'lucide-react';
import { CountryProfile } from '../../types/country';
import {TOP_GLOBAL_UNIVERSITIES} from '../../data/universities';

interface EducationModuleProps {
  country: CountryProfile;
}

type RankFilter = 'all' | 'top50' | 'top100' | 'top200';
type ViewTab = 'country' | 'global';

export const EducationModule: React.FC<EducationModuleProps> = ({ country }) => {
  const edu = country.education;

  // View Mode: Country-specific vs Global Top 25 Observatory
  const [activeTab, setActiveTab] = useState<ViewTab>('country');

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rankFilter, setRankFilter] = useState<RankFilter>('all');
  const [selectedField, setSelectedField] = useState<string>('all');

  // Country universities filtered
  const filteredCountryUnis = useMemo(() => {
    return edu.topUniversities.filter((uni) => {
      // 1. Rank filter — an institution with no licensed rank can never satisfy
      //    a rank tier, so a `null` rank is excluded rather than silently kept.
      if (rankFilter !== 'all') {
        const maxRank = rankFilter === 'top50' ? 50 : rankFilter === 'top100' ? 100 : 200;
        if (uni.globalRankQs === null || uni.globalRankQs > maxRank) return false;
      }

      // 2. Search query (name, city, notable fields)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = uni.name.toLowerCase().includes(q);
        const matchesCity = uni.city.toLowerCase().includes(q);
        const matchesField = uni.notableFields.some((f) => f.toLowerCase().includes(q));
        if (!matchesName && !matchesCity && !matchesField) return false;
      }

      // 3. Selected field
      if (selectedField !== 'all') {
        const hasField = uni.notableFields.some((f) => f.toLowerCase().includes(selectedField.toLowerCase()));
        if (!hasField) return false;
      }

      return true;
    });
  }, [edu.topUniversities, rankFilter, searchQuery, selectedField]);

  // Regional universities filtered
  const filteredGlobalUnis = useMemo(() => {
    return TOP_GLOBAL_UNIVERSITIES.filter((uni) => {
      if (rankFilter !== 'all') {
        const maxRank = rankFilter === 'top50' ? 50 : rankFilter === 'top100' ? 100 : 200;
        if (uni.globalRankQs === null || uni.globalRankQs > maxRank) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = uni.name.toLowerCase().includes(q);
        const matchesCity = uni.city.toLowerCase().includes(q);
        const matchesCountry = uni.countryName.toLowerCase().includes(q);
        const matchesField = uni.notableFields.some((f) => f.toLowerCase().includes(q));
        if (!matchesName && !matchesCity && !matchesCountry && !matchesField) return false;
      }

      if (selectedField !== 'all') {
        const hasField = uni.notableFields.some((f) => f.toLowerCase().includes(selectedField.toLowerCase()));
        if (!hasField) return false;
      }

      return true;
    });
  }, [rankFilter, searchQuery, selectedField]);

  return (
    <section id="education" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <GraduationCap size={22} color="var(--accent-cyan)" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
              Higher Education &amp; Global Research Footprint
            </h2>
          </div>

          {/* Toggle between Country Flagship and Global Top 25 Observatory */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-full)',
              padding: '3px',
            }}
          >
            <button
              onClick={() => setActiveTab('country')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: activeTab === 'country' ? 'var(--accent-cyan)' : 'transparent',
                color: activeTab === 'country' ? '#07090E' : 'var(--text-secondary)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              <span>{country.flag.emoji} {country.name} Flagships ({edu.topUniversities.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('global')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: activeTab === 'global' ? 'var(--accent-gold)' : 'transparent',
                color: activeTab === 'global' ? '#07090E' : 'var(--text-secondary)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Globe size={12} />
              <span>World Top 25+ Observatory ({TOP_GLOBAL_UNIVERSITIES.length})</span>
            </button>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '1.75rem', maxWidth: '780px' }}>
          Explore national research centers and global elite institutions with direct links to official university websites, QS global ranks where a licensed ranking exists, and notable academic fields.
        </p>

        {/* 3 Macro Academic Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.75rem',
          }}
        >
          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Adult Literacy Rate</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>
              {edu.literacyRatePercent}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>UNESCO Institute for Statistics</div>
          </div>

          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Tertiary Enrollment</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '0.25rem' }}>
              {edu.tertiaryEnrollmentRatePercent}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Gross Higher Ed Enrollment Ratio</div>
          </div>

          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Education Expenditure</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '0.25rem' }}>
              {edu.educationExpenditurePercentGdp}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Share of Gross Domestic Product</div>
          </div>
        </div>

        {/* Interactive University Filter & Search Bar */}
        <div
          className="glass-panel"
          style={{
            padding: '1.25rem',
            marginBottom: '1.5rem',
            background: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
            {/* Search Input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '240px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.45rem 0.75rem',
                  width: '100%',
                }}
              >
                <Search size={14} color="var(--text-tertiary)" />
                <input
                  type="text"
                  placeholder="Search university, city, or research field (e.g. AI, Medicine, Law)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--text-xs)',
                    width: '100%',
                  }}
                />
              </div>
            </div>

            {/* Rank Tier Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>QS Rank:</span>
              {(['all', 'top50', 'top100', 'top200'] as RankFilter[]).map((rf) => (
                <button
                  key={rf}
                  onClick={() => setRankFilter(rf)}
                  style={{
                    background: rankFilter === rf ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${rankFilter === rf ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                    color: rankFilter === rf ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '11px',
                    fontWeight: rankFilter === rf ? 700 : 500,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {rf === 'all' ? 'All Ranks' : `Top ${rf.replace('top', '')}`}
                </button>
              ))}
            </div>

            {/* Discipline Dropdown */}
            <div>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '11px',
                  outline: 'none',
                }}
              >
                <option value="all">All Academic Disciplines</option>
                <option value="artificial intelligence">Artificial Intelligence &amp; Computing</option>
                <option value="medicine">Medicine &amp; Health</option>
                <option value="engineering">Engineering &amp; Robotics</option>
                <option value="physics">Physics &amp; Chemistry</option>
                <option value="law">Law &amp; Governance</option>
                <option value="economics">Economics &amp; Business</option>
              </select>
            </div>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Showing{' '}
            <strong style={{ color: activeTab === 'country' ? 'var(--accent-cyan)' : 'var(--accent-gold)' }}>
              {activeTab === 'country' ? filteredCountryUnis.length : filteredGlobalUnis.length}
            </strong>{' '}
            institutions matching filter criteria
          </div>
        </div>

        {/* Universities List / Grid */}
        {activeTab === 'country' ? (
          /* Country National Universities */
          filteredCountryUnis.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-tertiary)' }}>
              No institutions in {country.name} match the current filter. Try resetting rank or search keywords.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {filteredCountryUnis.map((uni, idx) => (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderLeft: '3px solid var(--accent-cyan)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <h4 style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>
                        {uni.name}
                      </h4>
                      {uni.globalRankQs !== null && (
                        <span className="badge badge-gold" style={{ flexShrink: 0, fontSize: '11px', fontWeight: 700 }}>
                          QS #{uni.globalRankQs}
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                      📍 {uni.city}
                    </div>

                    <div>
                      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                        Key Disciplines &amp; Research:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {uni.notableFields.map((field, fIdx) => (
                          <span
                            key={fIdx}
                            style={{
                              fontSize: '11px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              padding: '2px 7px',
                              borderRadius: '4px',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Official Website Link Button */}
                  {uni.websiteUrl && (
                    <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <a
                        href={uni.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--accent-cyan)',
                          textDecoration: 'none',
                          fontWeight: 700,
                          transition: 'color var(--transition-fast)',
                        }}
                      >
                        <span>Official University Website</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        ) : (
          /* Global Top 25+ Observatory */
          filteredGlobalUnis.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-tertiary)' }}>
              No global institutions match the filter. Try relaxing search criteria.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {filteredGlobalUnis.map((uni) => (
                <div
                  key={uni.id}
                  className="glass-panel"
                  style={{
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderLeft: `3px solid ${uni.globalRankQs !== null && uni.globalRankQs <= 50 ? 'var(--accent-gold)' : 'var(--accent-cyan)'}`,
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span style={{ fontSize: '1rem' }}>{uni.flagEmoji}</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{uni.countryName}</span>
                        </div>
                        <h4 style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-primary)', marginTop: '2px' }}>
                          {uni.name}
                        </h4>
                      </div>
                      {uni.globalRankQs !== null ? (
                        <span className="badge badge-gold" style={{ flexShrink: 0, fontSize: '11px', fontWeight: 800 }}>
                          QS #{uni.globalRankQs}
                        </span>
                      ) : (
                        <span className="badge badge-muted" style={{ flexShrink: 0, fontSize: '10px', fontWeight: 600 }}>
                          {uni.type}
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                      📍 {uni.city} • Founded {uni.foundedYear} ({uni.type})
                    </div>

                    <div>
                      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                        Distinguished Research:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {uni.notableFields.map((field, fIdx) => (
                          <span
                            key={fIdx}
                            style={{
                              fontSize: '11px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              padding: '2px 7px',
                              borderRadius: '4px',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Official Website Link Button */}
                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <a
                      href={uni.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--accent-gold)',
                        textDecoration: 'none',
                        fontWeight: 700,
                        transition: 'color var(--transition-fast)',
                      }}
                    >
                      <span>Visit Official Website</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </section>
  );
};
