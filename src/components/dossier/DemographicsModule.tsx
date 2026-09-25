import React from 'react';
import {Users} from 'lucide-react';
import { CountryProfile } from '../../types/country';
import { BenchmarkGauge } from '../common/BenchmarkGauge';
import { GLOBAL_BENCHMARK, REGIONAL_BENCHMARKS } from '../../data/benchmarks';

interface DemographicsModuleProps {
  country: CountryProfile;
}

export const DemographicsModule: React.FC<DemographicsModuleProps> = ({ country }) => {
  const regionalBenchmark = REGIONAL_BENCHMARKS[country.regionId];
  const demo = country.demographics;

  return (
    <section id="demographics" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <Users size={22} color="var(--accent-cyan)" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
            Demographics &amp; Population
          </h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '1.75rem', maxWidth: '780px' }}>
          Population density, age distribution pyramids, urbanization rates, life expectancy, and linguistic composition.
        </p>

        {/* Primary Benchmark: Population Density */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span className="badge badge-cyan">Density Indicator</span>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginTop: '0.25rem' }}>
                Population Density
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                {demo.densityPerKm2.toLocaleString()}{' '}
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontWeight: 500 }}>people / km²</span>
              </div>
            </div>
          </div>

          <BenchmarkGauge
            label="Population Density"
            countryValue={demo.densityPerKm2}
            regionalValue={regionalBenchmark.populationDensityKm2}
            globalValue={GLOBAL_BENCHMARK.populationDensityKm2}
            unitSuffix=" / km²"
            higherIsBetter={false}
          />
        </div>

        {/* 4 Demographics Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Total Population</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
              {demo.population >= 1000000
                ? `${(demo.population / 1000000).toFixed(2)} Million`
                : demo.population.toLocaleString()}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Census Year {demo.populationYear}</div>
          </div>

          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Median Age</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '0.25rem' }}>
              {demo.medianAge} <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>years</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              Global Median: {GLOBAL_BENCHMARK.medianAge} yrs
            </div>
          </div>

          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Life Expectancy</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>
              {demo.lifeExpectancyYears} <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>years</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              UN Population Division 2024
            </div>
          </div>

          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Urbanization Rate</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '0.25rem' }}>
              {demo.urbanizationRate}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Residing in Urban Areas</div>
          </div>
        </div>

        {/* Age Structure Pyramid & Languages Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Age Distribution Horizontal Pyramid */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Age Demographic Structure
            </h4>

            {/* Composite Stacked Bar */}
            <div style={{ height: '18px', display: 'flex', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: `${demo.ageDistribution.under15Percent}%`,
                  background: 'var(--accent-cyan)',
                  transition: 'width 0.4s ease',
                }}
                title={`Under 15: ${demo.ageDistribution.under15Percent}%`}
              />
              <div
                style={{
                  width: `${demo.ageDistribution.fifteenTo64Percent}%`,
                  background: 'var(--accent-gold)',
                  transition: 'width 0.4s ease',
                }}
                title={`15 to 64: ${demo.ageDistribution.fifteenTo64Percent}%`}
              />
              <div
                style={{
                  width: `${demo.ageDistribution.sixtyFivePlusPercent}%`,
                  background: 'var(--accent-rose)',
                  transition: 'width 0.4s ease',
                }}
                title={`65 and older: ${demo.ageDistribution.sixtyFivePlusPercent}%`}
              />
            </div>

            {/* Legends */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-cyan)' }} />
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Youth (Under 15 years)</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{demo.ageDistribution.under15Percent}%</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-gold)' }} />
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Working Age (15 to 64 years)</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{demo.ageDistribution.fifteenTo64Percent}%</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--accent-rose)' }} />
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Seniors (65+ years)</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{demo.ageDistribution.sixtyFivePlusPercent}%</span>
              </div>
            </div>
          </div>

          {/* Languages Spoken */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Languages &amp; Linguistic Heritage
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {demo.languages.map((lang, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    background: 'var(--bg-surface-elevated)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{lang.name}</span>
                    {lang.isOfficial && <span className="badge badge-gold" style={{ fontSize: '10px' }}>Official</span>}
                  </div>
                  {lang.percentSpoken !== undefined && (
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      ~{lang.percentSpoken}% of population
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem', fontSize: '11px', color: 'var(--text-tertiary)' }}>
              Total Fertility Rate: <strong>{demo.fertilityRate}</strong> births per woman
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
