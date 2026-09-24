import React, { useState, useMemo } from 'react';
import { Filter, X, RotateCcw, ArrowRight, Scale } from 'lucide-react';
import { ALL_COUNTRY_PROFILES } from '../../data';
import { RegionId } from '../../types/spatial';

interface MultiFilterExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (countryId: string) => void;
  pinnedIds?: string[];
  onTogglePin?: (countryId: string) => void;
}

type SafetyFilterOption = 'all' | 'high' | 'moderate';
type GdpFilterOption = 'all' | 'high' | 'mid' | 'emerging';
type CostFilterOption = 'all' | 'affordable' | 'balanced' | 'premium';
type PopulationFilterOption = 'all' | 'compact' | 'medium' | 'giant';
type UniversityFilterOption = 'all' | 'top50' | 'top200';

export const MultiFilterExplorer: React.FC<MultiFilterExplorerProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
  pinnedIds = [],
  onTogglePin,
}) => {
  // Filter States
  const [selectedRegion, setSelectedRegion] = useState<RegionId | 'all'>('all');
  const [selectedSafety, setSelectedSafety] = useState<SafetyFilterOption>('all');
  const [selectedGdp, setSelectedGdp] = useState<GdpFilterOption>('all');
  const [selectedCost, setSelectedCost] = useState<CostFilterOption>('all');
  const [selectedPopulation, setSelectedPopulation] = useState<PopulationFilterOption>('all');
  const [selectedUniversity, setSelectedUniversity] = useState<UniversityFilterOption>('all');

  // Reset all filters
  const resetFilters = () => {
    setSelectedRegion('all');
    setSelectedSafety('all');
    setSelectedGdp('all');
    setSelectedCost('all');
    setSelectedPopulation('all');
    setSelectedUniversity('all');
  };

  // Quick preset handlers
  const applyPreset = (presetName: string) => {
    resetFilters();
    switch (presetName) {
      case 'safe-wealth':
        setSelectedSafety('high');
        setSelectedGdp('high');
        break;
      case 'middle-east-wealth':
        setSelectedRegion('asia');
        setSelectedGdp('high');
        break;
      case 'affordable-living':
        setSelectedCost('affordable');
        break;
      case 'top-academies':
        setSelectedUniversity('top50');
        break;
      case 'pop-giants':
        setSelectedPopulation('giant');
        break;
    }
  };

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedRegion !== 'all') count++;
    if (selectedSafety !== 'all') count++;
    if (selectedGdp !== 'all') count++;
    if (selectedCost !== 'all') count++;
    if (selectedPopulation !== 'all') count++;
    if (selectedUniversity !== 'all') count++;
    return count;
  }, [selectedRegion, selectedSafety, selectedGdp, selectedCost, selectedPopulation, selectedUniversity]);

  // Evaluated matching countries
  const matchingCountries = useMemo(() => {
    return ALL_COUNTRY_PROFILES.filter((country) => {
      // 1. Region
      if (selectedRegion !== 'all' && country.regionId !== selectedRegion) {
        return false;
      }

      // 2. Safety (Numbeo index >= 60 = High, 40-59 = Moderate, < 40 = Lower)
      if (selectedSafety === 'high' && country.safetyAndGovernance.safetyIndexNumbeo < 60) {
        return false;
      }
      if (selectedSafety === 'moderate') {
        const score = country.safetyAndGovernance.safetyIndexNumbeo;
        if (score < 40 || score >= 60) return false;
      }

      // 3. GDP per Capita PPP
      // high: > 60k, mid: 25k - 60k, emerging: < 25k
      const gdpPerCap = country.economy.gdpPerCapitaPppUsd;
      if (selectedGdp === 'high' && gdpPerCap < 60000) return false;
      if (selectedGdp === 'mid' && (gdpPerCap < 25000 || gdpPerCap >= 60000)) return false;
      if (selectedGdp === 'emerging' && gdpPerCap >= 25000) return false;

      // 4. Cost of Living (vs NYC = 100)
      // affordable: < 50, balanced: 50 - 80, premium: > 80
      const col = country.costOfLiving.indexRelativeToNyc;
      if (selectedCost === 'affordable' && col >= 50) return false;
      if (selectedCost === 'balanced' && (col < 50 || col > 80)) return false;
      if (selectedCost === 'premium' && col <= 80) return false;

      // 5. Population
      // giant: > 50M, medium: 10M - 50M, compact: < 10M
      const pop = country.demographics.population;
      if (selectedPopulation === 'giant' && pop < 50000000) return false;
      if (selectedPopulation === 'medium' && (pop < 10000000 || pop >= 50000000)) return false;
      if (selectedPopulation === 'compact' && pop >= 10000000) return false;

      // 6. University
      if (selectedUniversity === 'top50') {
        const hasTop50 = country.education.topUniversities.some((u) => u.globalRankQs <= 50);
        if (!hasTop50) return false;
      }
      if (selectedUniversity === 'top200') {
        const hasTop200 = country.education.topUniversities.some((u) => u.globalRankQs <= 200);
        if (!hasTop200) return false;
      }

      return true;
    });
  }, [selectedRegion, selectedSafety, selectedGdp, selectedCost, selectedPopulation, selectedUniversity]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Multi-Criteria Country Discovery Engine"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(5, 7, 10, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '1.25rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '1050px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg), 0 0 50px rgba(0,0,0,0.85)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(229, 181, 88, 0.15)',
                border: '1px solid var(--accent-gold-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)',
              }}
            >
              <Filter size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 800 }}>
                  Multi-Criteria Exploration Engine
                </h3>
                {activeFilterCount > 0 && (
                  <span
                    style={{
                      background: 'var(--accent-gold)',
                      color: '#07090E',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: '999px',
                    }}
                  >
                    {activeFilterCount} Active
                  </span>
                )}
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                Filter across verified macroeconomics, safety indices, cost of living, and academic rankings.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="btn-secondary"
                style={{ fontSize: 'var(--text-xs)', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            padding: '1rem 1.75rem',
            background: 'rgba(7, 9, 14, 0.6)',
            borderBottom: '1px solid var(--border-subtle)',
            overflowY: 'auto',
            maxHeight: '230px',
          }}
        >
          {/* Quick Presets Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Quick Lenses:</span>
            <button
              onClick={() => applyPreset('safe-wealth')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              🛡️ Safe High-Income Havens
            </button>
            <button
              onClick={() => applyPreset('middle-east-wealth')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              💰 Middle East Sovereign Wealth
            </button>
            <button
              onClick={() => applyPreset('affordable-living')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              🏷️ Affordable Cost of Living
            </button>
            <button
              onClick={() => applyPreset('top-academies')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              🎓 Top 50 QS Universities
            </button>
            <button
              onClick={() => applyPreset('pop-giants')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              🌍 50M+ Continental Giants
            </button>
          </div>

          {/* Primary Selectors Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '0.85rem',
            }}
          >
            {/* 1. Region */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px', fontWeight: 600 }}>
                Continental Sphere
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as RegionId | 'all')}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  borderRadius: '6px',
                  padding: '5px 8px',
                  fontSize: 'var(--text-xs)',
                  outline: 'none',
                }}
              >
                <option value="all">All Continents</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="americas">Americas</option>
                <option value="africa">Africa</option>
                <option value="oceania">Oceania</option>
              </select>
            </div>

            {/* 2. Safety Index */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px', fontWeight: 600 }}>
                Safety &amp; Peace Index
              </label>
              <select
                value={selectedSafety}
                onChange={(e) => setSelectedSafety(e.target.value as SafetyFilterOption)}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  borderRadius: '6px',
                  padding: '5px 8px',
                  fontSize: 'var(--text-xs)',
                  outline: 'none',
                }}
              >
                <option value="all">All Safety Tiers</option>
                <option value="high">High Safety (Score ≥ 60)</option>
                <option value="moderate">Moderate (Score 40–59)</option>
              </select>
            </div>

            {/* 3. GDP per Capita PPP */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px', fontWeight: 600 }}>
                GDP per Capita (PPP)
              </label>
              <select
                value={selectedGdp}
                onChange={(e) => setSelectedGdp(e.target.value as GdpFilterOption)}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  borderRadius: '6px',
                  padding: '5px 8px',
                  fontSize: 'var(--text-xs)',
                  outline: 'none',
                }}
              >
                <option value="all">All Income Levels</option>
                <option value="high">High Income (&gt; $60,000)</option>
                <option value="mid">Middle Income ($25k–$60k)</option>
                <option value="emerging">Emerging (&lt; $25,000)</option>
              </select>
            </div>

            {/* 4. Cost of Living */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px', fontWeight: 600 }}>
                Cost of Living (NYC=100)
              </label>
              <select
                value={selectedCost}
                onChange={(e) => setSelectedCost(e.target.value as CostFilterOption)}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  borderRadius: '6px',
                  padding: '5px 8px',
                  fontSize: 'var(--text-xs)',
                  outline: 'none',
                }}
              >
                <option value="all">All Living Costs</option>
                <option value="affordable">Affordable (Index &lt; 50)</option>
                <option value="balanced">Balanced (Index 50–80)</option>
                <option value="premium">Premium (Index &gt; 80)</option>
              </select>
            </div>

            {/* 5. Population */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px', fontWeight: 600 }}>
                Population Scale
              </label>
              <select
                value={selectedPopulation}
                onChange={(e) => setSelectedPopulation(e.target.value as PopulationFilterOption)}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  borderRadius: '6px',
                  padding: '5px 8px',
                  fontSize: 'var(--text-xs)',
                  outline: 'none',
                }}
              >
                <option value="all">All Populations</option>
                <option value="giant">Demographic Giants (&gt; 50M)</option>
                <option value="medium">Mid-Sized (10M–50M)</option>
                <option value="compact">Compact (&lt; 10M)</option>
              </select>
            </div>

            {/* 6. Education */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px', fontWeight: 600 }}>
                Higher Education
              </label>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value as UniversityFilterOption)}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  borderRadius: '6px',
                  padding: '5px 8px',
                  fontSize: 'var(--text-xs)',
                  outline: 'none',
                }}
              >
                <option value="all">All Universities</option>
                <option value="top50">Hosts Top 50 QS Global Uni</option>
                <option value="top200">Hosts Top 200 QS Global Uni</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.75rem' }}>
          {/* Result Count Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              Showing <strong style={{ color: 'var(--accent-gold)' }}>{matchingCountries.length}</strong> of{' '}
              {ALL_COUNTRY_PROFILES.length} sovereign nations matching selected filters
            </div>
          </div>

          {matchingCountries.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                color: 'var(--text-tertiary)',
              }}
            >
              <Filter size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
              <h4 style={{ fontSize: 'var(--text-md)', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                No Nations Match These Combined Criteria
              </h4>
              <p style={{ fontSize: 'var(--text-xs)', maxWidth: '400px', margin: '0 auto 1rem' }}>
                Try relaxing one or more filter conditions such as GDP per capita, population, or cost of living.
              </p>
              <button onClick={resetFilters} className="btn-secondary" style={{ fontSize: 'var(--text-xs)' }}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem',
              }}
            >
              {matchingCountries.map((country) => {
                const isPinned = pinnedIds.includes(country.id);
                return (
                  <div
                    key={country.id}
                    className="glass-panel"
                    style={{
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: 'var(--radius-md)',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <div>
                      {/* Flag and Name */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.5rem' }}>{country.flag.emoji}</span>
                          <div>
                            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 800 }}>
                              {country.name}
                            </h4>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                              Capital: {country.capital.name}
                            </div>
                          </div>
                        </div>
                        <span className="badge badge-muted" style={{ textTransform: 'capitalize', fontSize: '10px' }}>
                          {country.regionId}
                        </span>
                      </div>

                      {/* Key Indicators Grid */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '0.5rem',
                          background: 'rgba(255, 255, 255, 0.02)',
                          padding: '0.6rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '11px',
                          marginBottom: '1rem',
                        }}
                      >
                        <div>
                          <div style={{ color: 'var(--text-tertiary)' }}>GDP per Cap:</div>
                          <div style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                            ${country.economy.gdpPerCapitaPppUsd.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-tertiary)' }}>Safety Index:</div>
                          <div style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>
                            {country.safetyAndGovernance.safetyIndexNumbeo}/100
                          </div>
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-tertiary)' }}>Cost Index:</div>
                          <div style={{ fontWeight: 600 }}>{country.costOfLiving.indexRelativeToNyc} (NYC=100)</div>
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-tertiary)' }}>Population:</div>
                          <div style={{ fontWeight: 600 }}>{(country.demographics.population / 1000000).toFixed(1)}M</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectCountry(country.id);
                        }}
                        className="btn-primary"
                        style={{
                          flex: 1,
                          padding: '0.4rem 0.75rem',
                          fontSize: 'var(--text-xs)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.35rem',
                        }}
                      >
                        <span>Open Dossier</span>
                        <ArrowRight size={12} />
                      </button>

                      {onTogglePin && (
                        <button
                          onClick={() => onTogglePin(country.id)}
                          style={{
                            background: isPinned ? 'rgba(229, 181, 88, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                            border: `1px solid ${isPinned ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                            color: isPinned ? 'var(--accent-gold)' : 'var(--text-secondary)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.4rem 0.6rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          title={isPinned ? 'Remove from comparison' : 'Pin to compare'}
                        >
                          <Scale size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
