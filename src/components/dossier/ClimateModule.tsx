import React, { useState } from 'react';
import { Sun, CloudRain, Thermometer, Wind } from 'lucide-react';
import { CountryProfile, ClimographPoint } from '../../types/country';

interface ClimateModuleProps {
  country: CountryProfile;
}

export const ClimateModule: React.FC<ClimateModuleProps> = ({ country }) => {
  const climate = country.climate;
  const [hoveredMonth, setHoveredMonth] = useState<ClimographPoint | null>(null);

  // SVG dimensions for climograph
  const width = 760;
  const height = 260;
  const padding = { top: 30, right: 45, bottom: 40, left: 45 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  // Temperature and rain range calculation
  const temps = climate.monthlyClimograph.map((d) => d.tempCelsius);
  const rains = climate.monthlyClimograph.map((d) => d.precipitationMm);

  const minTemp = Math.floor(Math.min(...temps, 0) - 4);
  const maxTemp = Math.ceil(Math.max(...temps, 30) + 4);
  const tempRange = maxTemp - minTemp || 1;

  const maxRain = Math.max(...rains, 50) * 1.25;

  // Coordinate scales
  const getX = (index: number) => padding.left + (index + 0.5) * (graphWidth / 12);
  const getYTemp = (temp: number) => padding.top + graphHeight - ((temp - minTemp) / tempRange) * graphHeight;
  const getYRain = (rain: number) => padding.top + graphHeight - (rain / maxRain) * graphHeight;

  // Build temperature line SVG path
  const tempPath = climate.monthlyClimograph.reduce((acc, point, i) => {
    const x = getX(i);
    const y = getYTemp(point.tempCelsius);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  return (
    <section id="climate" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <Sun size={22} color="var(--accent-amber)" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800 }}>
            Climate &amp; Climatological Normals
          </h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '1.75rem', maxWidth: '780px' }}>
          Köppen-Geiger classification, annual precipitation patterns, seasonal thermal normals, and 12-month climograph.
        </p>

        {/* Climate Summary Header Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(21, 27, 42, 0.7) 100%)',
            border: '1px solid rgba(251, 191, 36, 0.25)',
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
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-gold" style={{ fontSize: '11px' }}>
                Classification: {climate.koppenCode}
              </span>
              <span style={{ fontWeight: 700, fontSize: 'var(--text-md)', color: 'var(--text-primary)' }}>
                {climate.koppenTitle}
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: '0.4rem', maxWidth: '640px' }}>
              {climate.summary}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Mean Annual Temp</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                {climate.averageAnnualTempCelsius}°C
              </div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Annual Rainfall</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                {climate.averageAnnualRainfallMm} mm
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Responsive SVG Climograph */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700 }}>
              12-Month Climograph (Temperature &amp; Precipitation)
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: 'var(--text-xs)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-gold)' }}>
                <span style={{ width: '12px', height: '3px', background: 'var(--accent-gold)', borderRadius: '2px' }} />
                <span>Mean Temp (°C)</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-cyan)' }}>
                <span style={{ width: '10px', height: '10px', background: 'rgba(56, 189, 248, 0.45)', borderRadius: '2px' }} />
                <span>Rainfall (mm)</span>
              </span>
            </div>
          </div>

          {/* SVG Container */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <svg
              viewBox={`0 0 ${width} ${height}`}
              style={{ width: '100%', minWidth: '600px', height: 'auto', display: 'block' }}
            >
              {/* Horizontal Gridlines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                const y = padding.top + pct * graphHeight;
                const tempVal = Math.round(maxTemp - pct * tempRange);
                return (
                  <g key={idx}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={width - padding.right}
                      y2={y}
                      stroke="rgba(255, 255, 255, 0.06)"
                      strokeDasharray="4 4"
                    />
                    <text x={padding.left - 8} y={y + 4} fill="var(--text-tertiary)" fontSize="10" textAnchor="end">
                      {tempVal}°C
                    </text>
                  </g>
                );
              })}

              {/* Precipitation Bars */}
              {climate.monthlyClimograph.map((point, i) => {
                const x = getX(i) - 14;
                const y = getYRain(point.precipitationMm);
                const barHeight = padding.top + graphHeight - y;
                const isHovered = hoveredMonth?.month === point.month;

                return (
                  <g
                    key={point.month}
                    onMouseEnter={() => setHoveredMonth(point)}
                    onMouseLeave={() => setHoveredMonth(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <rect
                      x={x}
                      y={y}
                      width={28}
                      height={Math.max(2, barHeight)}
                      fill={isHovered ? 'rgba(56, 189, 248, 0.85)' : 'rgba(56, 189, 248, 0.35)'}
                      rx={3}
                      stroke={isHovered ? 'var(--accent-cyan)' : 'transparent'}
                      strokeWidth={1.5}
                      style={{ transition: 'fill 0.2s ease' }}
                    />
                    {/* Month Label */}
                    <text
                      x={getX(i)}
                      y={height - 12}
                      fill={isHovered ? 'var(--accent-gold)' : 'var(--text-secondary)'}
                      fontSize="11"
                      fontWeight={isHovered ? '700' : '500'}
                      textAnchor="middle"
                    >
                      {point.month}
                    </text>
                  </g>
                );
              })}

              {/* Temperature Line Spline */}
              <path d={tempPath} fill="none" stroke="var(--accent-gold)" strokeWidth={3} strokeLinecap="round" />

              {/* Temperature Points */}
              {climate.monthlyClimograph.map((point, i) => {
                const x = getX(i);
                const y = getYTemp(point.tempCelsius);
                const isHovered = hoveredMonth?.month === point.month;

                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={isHovered ? 6 : 3.5}
                    fill={isHovered ? '#FFFFFF' : 'var(--accent-gold)'}
                    stroke="var(--bg-deep)"
                    strokeWidth={2}
                    onMouseEnter={() => setHoveredMonth(point)}
                    onMouseLeave={() => setHoveredMonth(null)}
                    style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Interactive Month Hover Details Bar */}
          <div
            style={{
              marginTop: '1rem',
              padding: '0.65rem 1rem',
              background: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 'var(--text-xs)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {hoveredMonth ? (
              <>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  Selected Month: <strong style={{ color: 'var(--accent-gold)' }}>{hoveredMonth.month}</strong>
                </span>
                <span style={{ color: 'var(--accent-gold-light)', fontWeight: 600 }}>
                  Mean Temperature: {hoveredMonth.tempCelsius}°C
                </span>
                <span style={{ color: 'var(--accent-cyan-light)', fontWeight: 600 }}>
                  Precipitation: {hoveredMonth.precipitationMm} mm
                </span>
              </>
            ) : (
              <span style={{ color: 'var(--text-tertiary)' }}>
                Hover over any month bar above to inspect seasonal thermal and rainfall normals.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
