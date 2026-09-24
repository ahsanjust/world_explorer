import React from 'react';

interface BenchmarkGaugeProps {
  label: string;
  countryValue: number;
  regionalValue: number;
  globalValue: number;
  unitPrefix?: string;
  unitSuffix?: string;
  formatFn?: (val: number) => string;
  higherIsBetter?: boolean;
}

export const BenchmarkGauge: React.FC<BenchmarkGaugeProps> = ({
  label,
  countryValue,
  regionalValue,
  globalValue,
  unitPrefix = '',
  unitSuffix = '',
  formatFn,
  higherIsBetter = true,
}) => {
  const format = (v: number) => {
    if (formatFn) return formatFn(v);
    if (v >= 1000) return `${unitPrefix}${v.toLocaleString()}${unitSuffix}`;
    return `${unitPrefix}${v}${unitSuffix}`;
  };

  // Determine scale range
  const values = [countryValue, regionalValue, globalValue].filter((v) => !isNaN(v) && v > 0);
  const minVal = Math.min(...values) * 0.8;
  const maxVal = Math.max(...values) * 1.15;
  const range = maxVal - minVal || 1;

  const getPercent = (val: number) => {
    const p = ((val - minVal) / range) * 100;
    return Math.max(5, Math.min(95, p));
  };

  const countryPos = getPercent(countryValue);
  const regionalPos = getPercent(regionalValue);
  const globalPos = getPercent(globalValue);

  // Delta calculation relative to regional average
  const deltaRegional = regionalValue > 0 ? ((countryValue - regionalValue) / regionalValue) * 100 : 0;
  const isPositiveDelta = higherIsBetter ? deltaRegional >= 0 : deltaRegional <= 0;

  return (
    <div style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {label} (Benchmark Spectrum)
        </span>
        <span
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: isPositiveDelta ? 'var(--accent-emerald)' : 'var(--accent-rose)',
          }}
        >
          {deltaRegional >= 0 ? '+' : ''}
          {deltaRegional.toFixed(1)}% vs Regional Avg
        </span>
      </div>

      {/* Spectrum Bar */}
      <div
        style={{
          position: 'relative',
          height: '6px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '999px',
          margin: '1.25rem 0 1.5rem',
        }}
      >
        {/* Fill line from min to country */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            width: `${countryPos}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--border-medium) 0%, var(--accent-gold) 100%)',
            borderRadius: '999px',
          }}
        />

        {/* Global Median Marker */}
        <div
          style={{
            position: 'absolute',
            left: `${globalPos}%`,
            top: '-4px',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          title={`Global Median: ${format(globalValue)}`}
        >
          <div style={{ width: '2px', height: '14px', background: 'var(--text-tertiary)', borderRadius: '1px' }} />
          <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '4px', whiteSpace: 'nowrap' }}>
            Global {format(globalValue)}
          </span>
        </div>

        {/* Regional Avg Marker */}
        <div
          style={{
            position: 'absolute',
            left: `${regionalPos}%`,
            top: '-4px',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          title={`Regional Avg: ${format(regionalValue)}`}
        >
          <div style={{ width: '2px', height: '14px', background: 'var(--accent-cyan)', borderRadius: '1px' }} />
          <span style={{ fontSize: '10px', color: 'var(--accent-cyan)', marginTop: '4px', whiteSpace: 'nowrap' }}>
            Region {format(regionalValue)}
          </span>
        </div>

        {/* Country Marker */}
        <div
          style={{
            position: 'absolute',
            left: `${countryPos}%`,
            top: '-7px',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 2,
          }}
          title={`National Value: ${format(countryValue)}`}
        >
          <div
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'var(--accent-gold)',
              boxShadow: '0 0 12px var(--accent-gold)',
              border: '3px solid var(--bg-deep)',
            }}
          />
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--accent-gold-light)',
              marginTop: '4px',
              whiteSpace: 'nowrap',
              background: 'rgba(7, 9, 14, 0.85)',
              padding: '1px 6px',
              borderRadius: '4px',
              border: '1px solid var(--accent-gold-dark)',
            }}
          >
            {format(countryValue)}
          </span>
        </div>
      </div>
    </div>
  );
};
