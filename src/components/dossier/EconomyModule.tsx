import React from 'react';
import {TrendingUp, Coins} from 'lucide-react';
import { CountryProfile } from '../../types/country';
import { BenchmarkGauge } from '../common/BenchmarkGauge';
import { GLOBAL_BENCHMARK, REGIONAL_BENCHMARKS } from '../../data/benchmarks';

interface EconomyModuleProps {
  country: CountryProfile;
}

export const EconomyModule: React.FC<EconomyModuleProps> = ({ country }) => {
  const regionalBenchmark = REGIONAL_BENCHMARKS[country.regionId];

  return (
    <section id="economy" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Section Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <TrendingUp size={22} color="var(--accent-gold)" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
            Macroeconomics &amp; Wealth
          </h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '1.75rem', maxWidth: '780px' }}>
          Macroeconomic structure, purchasing power parity, sovereign asset stewardship, and international bilateral trade corridors.
        </p>

        {/* Primary Benchmark Gauge: GDP per Capita PPP */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span className="badge badge-gold">Key Metric</span>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginTop: '0.25rem' }}>
                GDP per Capita (Purchasing Power Parity)
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                ${country.economy.gdpPerCapitaPppUsd.toLocaleString()}{' '}
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontWeight: 500 }}>USD PPP</span>
              </div>
            </div>
          </div>

          <BenchmarkGauge
            label="GDP per Capita (PPP)"
            countryValue={country.economy.gdpPerCapitaPppUsd}
            regionalValue={regionalBenchmark.gdpPerCapitaPppUsd}
            globalValue={GLOBAL_BENCHMARK.gdpPerCapitaPppUsd}
            unitPrefix="$"
          />
        </div>

        {/* Sovereign Wealth Fund Spotlight (if present) */}
        {country.economy.sovereignWealthFundBillionsUsd && (
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(229, 181, 88, 0.12) 0%, rgba(21, 27, 42, 0.6) 100%)',
              border: '1px solid rgba(229, 181, 88, 0.35)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#07090E',
                  boxShadow: '0 0 15px rgba(229, 181, 88, 0.4)',
                }}
              >
                <Coins size={22} />
              </div>
              <div>
                <span className="badge badge-gold" style={{ fontSize: '10px' }}>
                  State Reserves &amp; Future Generations
                </span>
                <div style={{ fontSize: 'var(--text-md)', fontWeight: 700, marginTop: '2px' }}>
                  Sovereign Wealth Assets: ~${country.economy.sovereignWealthFundBillionsUsd.toLocaleString()} Billion USD
                </div>
              </div>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', maxWidth: '380px' }}>
              Strategic sovereign capital invested in global equities, green infrastructure, and domestic economic diversification.
            </div>
          </div>
        )}

        {/* 6 Key Macro Indicators Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '1.75rem',
          }}
        >
          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>GDP Nominal</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem' }}>
              ${country.economy.gdpNominalUsdBillions.toLocaleString()} B
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              PPP Total: ${country.economy.gdpPppUsdBillions.toLocaleString()} B
            </div>
          </div>

          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Real GDP Growth</span>
            <div
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                marginTop: '0.25rem',
                color: country.economy.realGdpGrowthPercent >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)',
              }}
            >
              {country.economy.realGdpGrowthPercent >= 0 ? '+' : ''}
              {country.economy.realGdpGrowthPercent}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Annual Real Rate</div>
          </div>

          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Inflation Rate</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem' }}>
              {country.economy.inflationRatePercent}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Consumer Price Index</div>
          </div>

          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Unemployment</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem' }}>
              {country.economy.unemploymentRatePercent}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Labor Force Share</div>
          </div>

          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Public Debt</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem' }}>
              {country.economy.publicDebtPercentOfGdp}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Percentage of GDP</div>
          </div>

          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Gini Coefficient</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem' }}>
              {country.economy.giniCoefficient}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Income Equality (0-100)</div>
          </div>
        </div>

        {/* Industries and Trade Partners Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Main Industries */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Core Industrial Pillars
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {country.economy.mainIndustries.map((ind, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: 'var(--text-sm)',
                    padding: '0.45rem 0.75rem',
                    background: 'var(--bg-surface-elevated)',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '3px solid var(--accent-gold)',
                  }}
                >
                  <span style={{ color: 'var(--text-primary)' }}>{ind}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trade Partners */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Top Bilateral Export Partners
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {country.economy.trade.topExportPartners.map((partner, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600 }}>{partner.country}</span>
                    <span style={{ color: 'var(--accent-gold-light)', fontWeight: 700 }}>{partner.sharePercent}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${Math.min(100, partner.sharePercent * 3)}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-cyan) 0%, var(--accent-gold) 100%)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                Primary Export Goods: {country.economy.trade.topExports.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
