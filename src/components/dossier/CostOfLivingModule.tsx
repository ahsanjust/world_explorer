import React from 'react';
import { Layers, Coffee, Utensils, Home, Bus, Info } from 'lucide-react';
import { CountryProfile } from '../../types/country';
import { BenchmarkGauge } from '../common/BenchmarkGauge';
import { GLOBAL_BENCHMARK, REGIONAL_BENCHMARKS } from '../../data/benchmarks';

interface CostOfLivingModuleProps {
  country: CountryProfile;
}

export const CostOfLivingModule: React.FC<CostOfLivingModuleProps> = ({ country }) => {
  const col = country.costOfLiving;
  const regionalBenchmark = REGIONAL_BENCHMARKS[country.regionId];

  return (
    <section id="cost-of-living" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <Layers size={22} color="var(--accent-gold)" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
            Cost of Living &amp; Purchasing Power
          </h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '1.75rem', maxWidth: '780px' }}>
          Consumer basket affordability relative to New York City (Baseline NYC = 100), housing rents, and local purchasing power parity.
        </p>

        {/* Primary Benchmark: Cost of Living Index */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span className="badge badge-gold">Relative Price Index</span>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginTop: '0.25rem' }}>
                Overall Cost of Living Index (NYC = 100)
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                {col.indexRelativeToNyc.toFixed(1)}{' '}
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {col.indexRelativeToNyc < 100 ? `${(100 - col.indexRelativeToNyc).toFixed(1)}% cheaper than NYC` : `${(col.indexRelativeToNyc - 100).toFixed(1)}% pricier than NYC`}
                </span>
              </div>
            </div>
          </div>

          <BenchmarkGauge
            label="Cost of Living Index"
            countryValue={col.indexRelativeToNyc}
            regionalValue={regionalBenchmark.costOfLivingIndex}
            globalValue={GLOBAL_BENCHMARK.costOfLivingIndex}
            unitSuffix=" pts"
            higherIsBetter={false}
          />
        </div>

        {/* 4 Sub-Indices Breakdown */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Rent Index</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>
              {col.rentIndex.toFixed(1)}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Relative to NYC Housing</div>
          </div>

          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Groceries Index</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>
              {col.groceriesIndex.toFixed(1)}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Supermarket Basket</div>
          </div>

          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Restaurant Index</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>
              {col.restaurantPriceIndex.toFixed(1)}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Dining Out &amp; Cafes</div>
          </div>

          <div className="interactive-card">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Local Purchasing Power</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: col.localPurchasingPowerIndex >= 100 ? 'var(--accent-emerald)' : 'var(--text-primary)', marginTop: '0.25rem' }}>
              {col.localPurchasingPowerIndex.toFixed(1)}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Net Domestic Salary Parity</div>
          </div>
        </div>

        {/* Sample Consumer Basket Real-World Prices */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Everyday Consumer Price Benchmark (Sample Items in USD)
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <Utensils size={18} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Casual Inexpensive Meal</div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-md)', color: 'var(--accent-gold-light)' }}>
                  ${col.samplePricesUsd.inexpensiveMeal.toFixed(2)} USD
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <Home size={18} color="var(--accent-cyan)" />
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>1-Bed Apartment (City Center)</div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-md)', color: 'var(--accent-cyan-light)' }}>
                  ${col.samplePricesUsd.monthlyOneBedroomCityCenterRent.toLocaleString()} USD / mo
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <Bus size={18} color="var(--accent-emerald)" />
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Monthly Public Transit Pass</div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-md)', color: 'var(--accent-emerald-light)' }}>
                  ${col.samplePricesUsd.monthlyPassTransit.toFixed(2)} USD
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <Coffee size={18} color="var(--accent-amber)" />
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Cappuccino (Regular)</div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-md)', color: 'var(--text-primary)' }}>
                  ${col.samplePricesUsd.coffeeCappuccino.toFixed(2)} USD
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '11px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Info size={12} />
            <span>Methodology: Normalized price basket based on global consumer surveys calibrated against NYC = 100 baseline.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
