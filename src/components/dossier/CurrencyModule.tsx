import React, { useState } from 'react';
import { DollarSign, ArrowRightLeft, ShieldCheck, Info, Coins } from 'lucide-react';
import { CountryProfile } from '../../types/country';
import { useLiveCurrency } from '../../hooks/useLiveCurrency';

interface CurrencyModuleProps {
  country: CountryProfile;
}

export const CurrencyModule: React.FC<CurrencyModuleProps> = ({ country }) => {
  const { dateStr, source, getRateFor, convert } = useLiveCurrency();
  const [inputAmount, setInputAmount] = useState<number>(100);
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');

  const curr = country.currency;
  const rateInfo = getRateFor(curr.code, curr.isPegged, curr.peggedRate);

  // Conversion calculations
  const localPerUsd = rateInfo.rate;
  const usdPerLocal = rateInfo.inverseRate;
  const bdtPerLocal = convert(1, curr.code, 'BDT');
  const bdtPerUsd = convert(1, 'USD', 'BDT');

  // Convert input amount to target currencies
  const amountInUsd = baseCurrency === 'USD' ? inputAmount : convert(inputAmount, baseCurrency, 'USD');
  const amountInLocal = baseCurrency === curr.code ? inputAmount : convert(inputAmount, baseCurrency, curr.code);
  const amountInBdt = baseCurrency === 'BDT' ? inputAmount : convert(inputAmount, baseCurrency, 'BDT');

  // Source attribution label
  const getSourceLabel = () => {
    switch (source) {
      case 'central-bank-live':
        return 'Daily Central Bank Reference Feed (jsDelivr Edge CDN)';
      case 'ecb-fallback':
        return 'European Central Bank (ECB Reference Rates)';
      case 'cached-local':
        return 'Cached Central Bank Feed (Stored in LocalStorage)';
      case 'baseline-seed':
        return 'Offline Baseline Reference Seed';
    }
  };

  return (
    <section id="currency" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Header with Source Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <DollarSign size={22} color="var(--accent-gold)" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
              Currency &amp; Exchange Rates
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(52, 211, 153, 0.12)',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                color: 'var(--accent-emerald)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
              }}
            >
              <span className="pulsing-indicator" />
              <span>Reference Date: {dateStr}</span>
            </span>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '1.75rem', maxWidth: '780px' }}>
          Official sovereign currency profile, central bank benchmark rates, and multi-currency converter between local currency, US Dollars (USD), and Bangladeshi Taka (BDT).
        </p>

        {/* Pegged Currency Special Disclosure (if applicable) */}
        {curr.isPegged && (
          <div
            style={{
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid var(--border-cyan)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <ShieldCheck size={20} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
              <strong>Official Monetary Peg:</strong> The {curr.name} ({curr.code}) is formally pegged to the{' '}
              <strong style={{ color: 'var(--accent-gold)' }}>{curr.peggedToCurrency}</strong> at a fixed statutory rate of{' '}
              <strong style={{ color: 'var(--accent-gold)' }}>
                1 USD = {curr.peggedRate} {curr.code}
              </strong>
              . This exchange rate is maintained by national central bank monetary policy.
            </div>
          </div>
        )}

        {/* Currency Rates & Interactive Converter Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Card 1: Official Rate Summary */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="badge badge-gold">{curr.code}</span>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginTop: '0.35rem' }}>
                  {curr.name} ({curr.symbol})
                </h3>
              </div>
              <div style={{ fontSize: '2rem' }}>{curr.symbol}</div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* USD Benchmark */}
              <div
                style={{
                  background: 'var(--bg-surface-elevated)',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  1 US Dollar (USD) equals
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '2px' }}>
                  {localPerUsd.toFixed(4)} <span style={{ fontSize: 'var(--text-sm)' }}>{curr.code}</span>
                </div>
              </div>

              {/* Local to USD */}
              <div
                style={{
                  background: 'var(--bg-surface-elevated)',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  1 {curr.name} ({curr.code}) equals
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '2px' }}>
                  ${usdPerLocal.toFixed(4)} <span style={{ fontSize: 'var(--text-sm)' }}>USD</span>
                </div>
              </div>

              {/* Bangladeshi Taka (BDT) Benchmark */}
              <div
                style={{
                  background: 'var(--bg-surface-elevated)',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  1 {curr.name} ({curr.code}) equals in Bangladeshi Taka
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '2px' }}>
                  ৳{bdtPerLocal.toFixed(2)} <span style={{ fontSize: 'var(--text-sm)' }}>BDT</span>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                  1 USD ≈ ৳{bdtPerUsd.toFixed(2)} BDT
                </div>
              </div>
            </div>

            {/* Provenance Footer */}
            <div
              style={{
                marginTop: '1.25rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <Info size={13} />
              <span>{getSourceLabel()}</span>
            </div>
          </div>

          {/* Card 2: Interactive Converter Terminal with USD & BDT Support */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowRightLeft size={18} color="var(--accent-gold)" />
              <span>Interactive Multi-Currency Calculator</span>
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Convert seamlessly between US Dollars (USD), Bangladeshi Taka (BDT), and {curr.name} ({curr.code}).
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Input Amount & Base Currency Selector */}
              <div>
                <label style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>
                  Amount to Convert:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="number"
                    min="1"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(Math.max(0, Number(e.target.value)))}
                    style={{
                      flex: 1,
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.65rem 0.85rem',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 600,
                    }}
                  />
                  <select
                    value={baseCurrency}
                    onChange={(e) => setBaseCurrency(e.target.value)}
                    style={{
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--accent-gold-dark)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.65rem 0.85rem',
                      color: 'var(--accent-gold)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="BDT">BDT (৳ Taka)</option>
                    <option value={curr.code}>{curr.code} ({curr.symbol})</option>
                  </select>
                </div>
              </div>

              {/* Quick Amount Chips */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Presets:</span>
                {[10, 50, 100, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setInputAmount(amt)}
                    style={{
                      background: inputAmount === amt ? 'rgba(229, 181, 88, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${inputAmount === amt ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                      color: inputAmount === amt ? 'var(--accent-gold)' : 'var(--text-secondary)',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      fontWeight: inputAmount === amt ? 700 : 500,
                    }}
                  >
                    {amt}
                  </button>
                ))}
              </div>

              {/* Converted Values Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* Converted Value 1 */}
                {baseCurrency !== 'USD' && (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(229, 181, 88, 0.1) 0%, rgba(21, 27, 42, 0.8) 100%)',
                      border: '1px solid var(--accent-gold-dark)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>US Dollar (USD)</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-gold-light)', marginTop: '2px' }}>
                        ${amountInUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                    <span className="badge badge-gold" style={{ fontSize: '10px' }}>USD</span>
                  </div>
                )}

                {/* Converted Value 2 */}
                {baseCurrency !== 'BDT' && (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.1) 0%, rgba(21, 27, 42, 0.8) 100%)',
                      border: '1px solid rgba(52, 211, 153, 0.4)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Bangladeshi Taka (BDT)</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '2px' }}>
                        ৳{amountInBdt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                    <span className="badge badge-emerald" style={{ fontSize: '10px' }}>BDT</span>
                  </div>
                )}

                {/* Converted Value 3: Local Currency */}
                {baseCurrency !== curr.code && (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(21, 27, 42, 0.8) 100%)',
                      border: '1px solid var(--border-cyan)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        {curr.name} ({curr.code})
                      </div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '2px' }}>
                        {curr.symbol} {amountInLocal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>{curr.code}</span>
                      </div>
                    </div>
                    <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)', fontSize: '10px' }}>
                      {curr.code}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
