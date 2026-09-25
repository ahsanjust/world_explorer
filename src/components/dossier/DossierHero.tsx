import React, { useEffect, useState } from 'react';
import {MapPin, Clock, Scale, ShieldCheck, TrendingUp, Sun, Check} from 'lucide-react';
import { CountryProfile } from '../../types/country';
import { getRegionById, getSubregionById } from '../../data';

interface DossierHeroProps {
  country: CountryProfile;
  isPinned: boolean;
  onTogglePin: () => void;
}

export const DossierHero: React.FC<DossierHeroProps> = ({ country, isPinned, onTogglePin }) => {
  const region = getRegionById(country.regionId);
  const subregion = getSubregionById(country.subregionId);

  // Live local time for the country. The profile stores zones as display
  // strings ("Asia/Qatar (UTC+3)"); the IANA id is the part before " (".
  // Intl throws for an unknown zone, so we show nothing instead of ever
  // rendering a wrong clock. Refresh every 30s — minute resolution only.
  const [localTime, setLocalTime] = useState<string | null>(null);
  useEffect(() => {
    const zone = country.geography.timezones[0]?.split(' (')[0]?.trim();
    if (!zone) return;
    const tick = () => {
      try {
        setLocalTime(
          new Date().toLocaleTimeString('en-GB', {
            timeZone: zone,
            hour: '2-digit',
            minute: '2-digit',
          })
        );
      } catch {
        setLocalTime(null);
      }
    };
    tick();
    const timer = window.setInterval(tick, 30_000);
    return () => window.clearInterval(timer);
  }, [country]);

  return (
    <div
      style={{
        position: 'relative',
        padding: '2.5rem 0 2rem',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(229, 181, 88, 0.08) 0%, rgba(7, 9, 14, 0) 70%)',
      }}
    >
      <div className="container">
        {/* Top Badges & Subregion Location */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-gold">{region?.name}</span>
            <span className="badge badge-cyan">{subregion?.name}</span>
            <span className="badge badge-muted">ISO: {country.iso3}</span>
            {country.currency.isPegged && (
              <span className="badge badge-emerald" title="Pegged to US Dollar">
                Pegged Currency ({country.currency.code})
              </span>
            )}
          </div>

          {/* Pin to Compare Button */}
          <button
            onClick={onTogglePin}
            className={isPinned ? 'btn-primary' : 'btn-secondary'}
            style={{
              padding: '0.45rem 1rem',
              fontSize: 'var(--text-xs)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            {isPinned ? <Check size={14} /> : <Scale size={14} />}
            <span>{isPinned ? 'Pinned in Compare Dock' : 'Pin to Compare'}</span>
          </button>
        </div>

        {/* Flag, Sovereign Title & Monogram */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.75rem', flexWrap: 'wrap' }}>
          {/* Flag SVG Card */}
          <div
            style={{
              width: '120px',
              height: '80px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md), 0 0 20px rgba(0, 0, 0, 0.5)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              flexShrink: 0,
              background: '#07090E',
            }}
          >
            <img
              src={country.flag.svgUrl}
              alt={`${country.name} Flag`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Title & Tagline */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  color: 'var(--text-primary)',
                  lineHeight: 1.1,
                }}
              >
                {country.name}
              </h1>
              {country.nativeNames[0] && (
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-xl)',
                    color: 'var(--accent-gold)',
                    opacity: 0.85,
                  }}
                >
                  {country.nativeNames[0].common}
                </span>
              )}
            </div>

            <div
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                marginTop: '0.25rem',
                fontWeight: 500,
              }}
            >
              {country.officialName}
            </div>

            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--text-primary)',
                marginTop: '0.75rem',
                maxWidth: '820px',
                lineHeight: 1.6,
                opacity: 0.9,
              }}
            >
              {country.tagline}
            </p>

            {/* Geographical Quick-Facts Strip */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.25rem',
                marginTop: '1rem',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={13} color="var(--accent-gold)" />
                Capital:{' '}
                <strong style={{ color: 'var(--text-primary)' }}>{country.capital.name}</strong> (
                {country.capital.coordinates[0].toFixed(2)}°
                {country.capital.coordinates[0] >= 0 ? 'N' : 'S'},{' '}
                {country.capital.coordinates[1].toFixed(2)}°{country.capital.coordinates[1] >= 0 ? 'E' : 'W'})
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={13} color="var(--accent-cyan)" />
                {localTime && (
                  <>
                    Local time: <strong style={{ color: 'var(--text-primary)' }}>{localTime}</strong> ·
                  </>
                )}{' '}
                Timezone: <strong style={{ color: 'var(--text-primary)' }}>{country.geography.timezones[0]}</strong>
              </span>

              <span>
                Area: <strong style={{ color: 'var(--text-primary)' }}>{country.geography.landAreaKm2.toLocaleString()} km²</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 4 Macro Anchor Indicators */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginTop: '2rem',
          }}
        >
          {/* Economy Indicator */}
          <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                GDP per Capita (PPP)
              </span>
              <TrendingUp size={16} color="var(--accent-gold)" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '0.25rem' }}>
              ${country.economy.gdpPerCapitaPppUsd.toLocaleString()}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              Nominal: ${country.economy.gdpPerCapitaNominalUsd.toLocaleString()} • IMF WEO 2024
            </div>
          </div>

          {/* Demographics Indicator */}
          <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                Population
              </span>
              <span style={{ fontSize: '12px', color: 'var(--accent-cyan)' }}>Density {country.demographics.densityPerKm2}/km²</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
              {(country.demographics.population / 1000000).toFixed(2)}M
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              Median Age: {country.demographics.medianAge} yrs • Life Exp: {country.demographics.lifeExpectancyYears} yrs
            </div>
          </div>

          {/* Safety & Peace Indicator */}
          <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                Safety &amp; Peace
              </span>
              <ShieldCheck size={16} color="var(--accent-emerald)" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>
              Rank #{country.safetyAndGovernance.globalPeaceIndexRank}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              Safety Index: {country.safetyAndGovernance.safetyIndexNumbeo}/100 • GPI Score {country.safetyAndGovernance.globalPeaceIndexScore}
            </div>
          </div>

          {/* Climate & Biome Indicator */}
          <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                Climate (Köppen)
              </span>
              <Sun size={16} color="var(--accent-amber)" />
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
              {country.climate.koppenCode} — {country.climate.averageAnnualTempCelsius}°C Avg
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              {country.climate.koppenTitle}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
