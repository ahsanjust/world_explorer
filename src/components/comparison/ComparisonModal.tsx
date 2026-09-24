import React from 'react';
import { Scale, X, ArrowRight, Check, TrendingUp } from 'lucide-react';
import { getCountryById } from '../../data';
import { CountryProfile } from '../../types/country';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pinnedIds: string[];
  onSelectCountry: (countryId: string) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  pinnedIds,
  onSelectCountry,
}) => {
  if (!isOpen) return null;

  const countries: CountryProfile[] = pinnedIds
    .map((id) => getCountryById(id))
    .filter((c): c is CountryProfile => c !== undefined);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 10, 0.88)',
        backdropFilter: 'blur(16px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1020px',
          maxHeight: '90vh',
          background: 'var(--bg-glass-elevated)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg), 0 0 50px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Scale size={22} color="var(--accent-gold)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800 }}>
              Bilateral Comparative Intelligence Lab
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-tertiary)',
              cursor: 'pointer',
              padding: '0.25rem',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: Comparison Matrix */}
        <div style={{ padding: '1.75rem', overflowY: 'auto' }}>
          {countries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
              No countries pinned yet. Pin at least two countries from the world map or dossiers to compare them.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-medium)' }}>
                    <th style={{ padding: '1rem', width: '220px', color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', textTransform: 'uppercase' }}>
                      Comparative Metric
                    </th>
                    {countries.map((c) => (
                      <th key={c.id} style={{ padding: '1rem', minWidth: '180px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.75rem' }}>{c.flag.emoji}</span>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 'var(--text-md)', color: 'var(--text-primary)' }}>
                              {c.name}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                              Capital: {c.capital.name}
                            </div>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody style={{ fontSize: 'var(--text-sm)' }}>
                  {/* GDP per Capita PPP */}
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      GDP per Capita (PPP)
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} style={{ padding: '1rem', fontWeight: 700, color: 'var(--accent-gold-light)', fontSize: 'var(--text-md)' }}>
                        ${c.economy.gdpPerCapitaPppUsd.toLocaleString()}{' '}
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>USD</span>
                      </td>
                    ))}
                  </tr>

                  {/* Nominal GDP */}
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Total Nominal GDP
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} style={{ padding: '1rem', fontWeight: 600 }}>
                        ${c.economy.gdpNominalUsdBillions.toLocaleString()} Billion
                      </td>
                    ))}
                  </tr>

                  {/* Sovereign Wealth Fund */}
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Sovereign Wealth Assets
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} style={{ padding: '1rem' }}>
                        {c.economy.sovereignWealthFundBillionsUsd ? (
                          <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>
                            ~${c.economy.sovereignWealthFundBillionsUsd.toLocaleString()} B
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-tertiary)' }}>N/A</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Population */}
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Total Population
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} style={{ padding: '1rem', fontWeight: 600 }}>
                        {(c.demographics.population / 1000000).toFixed(2)} Million
                      </td>
                    ))}
                  </tr>

                  {/* Median Age */}
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Median Age
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} style={{ padding: '1rem' }}>
                        {c.demographics.medianAge} years
                      </td>
                    ))}
                  </tr>

                  {/* Life Expectancy */}
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Life Expectancy
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} style={{ padding: '1rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                        {c.demographics.lifeExpectancyYears} years
                      </td>
                    ))}
                  </tr>

                  {/* Safety & Peace */}
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Global Peace Index
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} style={{ padding: '1rem' }}>
                        <span style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>
                          Rank #{c.safetyAndGovernance.globalPeaceIndexRank}
                        </span>{' '}
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          (Score: {c.safetyAndGovernance.globalPeaceIndexScore})
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Cost of Living */}
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Cost of Living (NYC = 100)
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} style={{ padding: '1rem', fontWeight: 600 }}>
                        {c.costOfLiving.indexRelativeToNyc.toFixed(1)} pts
                      </td>
                    ))}
                  </tr>

                  {/* Currency & Peg */}
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Currency &amp; Monetary Status
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} style={{ padding: '1rem' }}>
                        <strong>{c.currency.code}</strong> ({c.currency.symbol})
                        {c.currency.isPegged ? (
                          <div style={{ fontSize: '11px', color: 'var(--accent-emerald)' }}>
                            Fixed Peg: 1 USD = {c.currency.peggedRate} {c.currency.code}
                          </div>
                        ) : (
                          <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Floating Rate</div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Actions Row */}
                  <tr>
                    <td style={{ padding: '1rem' }} />
                    {countries.map((c) => (
                      <td key={c.id} style={{ padding: '1rem' }}>
                        <button
                          onClick={() => {
                            onSelectCountry(c.id);
                            onClose();
                          }}
                          className="btn-primary"
                          style={{ fontSize: 'var(--text-xs)', padding: '0.45rem 1rem' }}
                        >
                          <span>Open Dossier</span>
                          <ArrowRight size={13} />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
