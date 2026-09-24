import React from 'react';
import { ShieldCheck, ShieldAlert, Award, FileCheck, Scale } from 'lucide-react';
import { CountryProfile } from '../../types/country';
import { BenchmarkGauge } from '../common/BenchmarkGauge';
import { GLOBAL_BENCHMARK, REGIONAL_BENCHMARKS } from '../../data/benchmarks';

interface SafetyModuleProps {
  country: CountryProfile;
}

export const SafetyModule: React.FC<SafetyModuleProps> = ({ country }) => {
  const safety = country.safetyAndGovernance;
  const regionalBenchmark = REGIONAL_BENCHMARKS[country.regionId];

  return (
    <section id="safety" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <ShieldCheck size={22} color="var(--accent-emerald)" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
            Safety, Peace &amp; Governance
          </h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '1.75rem', maxWidth: '780px' }}>
          Institutional peace measurements, intentional violent crime statistics, judicial stability, and press freedom indices.
        </p>

        {/* Primary Benchmark: Safety Index */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span className="badge badge-emerald">Civilian Security Index</span>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginTop: '0.25rem' }}>
                Safety &amp; Personal Security Index
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                {safety.safetyIndexNumbeo.toFixed(1)}{' '}
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontWeight: 500 }}>/ 100</span>
              </div>
            </div>
          </div>

          <BenchmarkGauge
            label="Safety Index"
            countryValue={safety.safetyIndexNumbeo}
            regionalValue={regionalBenchmark.safetyIndex}
            globalValue={GLOBAL_BENCHMARK.safetyIndex}
            unitSuffix=" pts"
            higherIsBetter={true}
          />
        </div>

        {/* 4 Governance & Security Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {/* Global Peace Index */}
          <div className="interactive-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Global Peace Index</span>
              <Award size={16} color="var(--accent-emerald)" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>
              Rank #{safety.globalPeaceIndexRank}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              GPI Score: {safety.globalPeaceIndexScore.toFixed(3)} (1.0 = Most Peaceful)
            </div>
          </div>

          {/* Homicide Rate */}
          <div className="interactive-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Homicide Rate</span>
              <Scale size={16} color="var(--accent-cyan)" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
              {safety.homicideRatePer100k}{' '}
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>per 100k</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              Global Average: {GLOBAL_BENCHMARK.homicideRatePer100k} • UNODC Statistics
            </div>
          </div>

          {/* Political Stability */}
          <div className="interactive-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Political Stability</span>
              <FileCheck size={16} color="var(--accent-gold)" />
            </div>
            <div
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                marginTop: '0.25rem',
                color: safety.politicalStabilityScore >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)',
              }}
            >
              {safety.politicalStabilityScore >= 0 ? '+' : ''}
              {safety.politicalStabilityScore.toFixed(2)}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              World Bank Worldwide Governance (-2.5 to +2.5)
            </div>
          </div>

          {/* Press Freedom */}
          <div className="interactive-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Press Freedom</span>
              <Award size={16} color="var(--accent-amber)" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
              Rank #{safety.pressFreedomIndexRank}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              Reporters Without Borders Index (out of 180)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
