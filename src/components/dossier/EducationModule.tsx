import React from 'react';
import { GraduationCap, Award, BookOpen, Building2 } from 'lucide-react';
import { CountryProfile } from '../../types/country';

interface EducationModuleProps {
  country: CountryProfile;
}

export const EducationModule: React.FC<EducationModuleProps> = ({ country }) => {
  const edu = country.education;

  return (
    <section id="education" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <GraduationCap size={22} color="var(--accent-cyan)" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
            Higher Education &amp; Research Footprint
          </h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '1.75rem', maxWidth: '780px' }}>
          Flagship national research universities, global institutional rankings, academic specializations, and adult literacy.
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

        {/* Top Universities Grid */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Notable Global Research Universities
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {edu.topUniversities.map((uni, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>
                      {uni.name}
                    </div>
                    <span
                      className="badge badge-gold"
                      style={{ flexShrink: 0, fontSize: '11px', fontWeight: 700 }}
                    >
                      QS #{uni.globalRankQs}
                    </span>
                  </div>

                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-cyan)', marginTop: '0.35rem' }}>
                    📍 {uni.city}
                  </div>

                  <div style={{ marginTop: '0.85rem' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                      Key Disciplines &amp; Research:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {uni.notableFields.map((field, fIdx) => (
                        <span
                          key={fIdx}
                          style={{
                            fontSize: '11px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '2px 8px',
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
