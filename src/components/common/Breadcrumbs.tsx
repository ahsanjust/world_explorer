import React from 'react';
import { ChevronRight, Globe, Compass } from 'lucide-react';
import { Region, Subregion } from '../../types/spatial';
import { CountryProfile } from '../../types/country';

interface BreadcrumbsProps {
  region?: Region;
  subregion?: Subregion;
  country?: CountryProfile;
  onNavigateWorld: () => void;
  onNavigateRegion: (regionId: string) => void;
  onNavigateSubregion: (subregionId: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  region,
  subregion,
  country,
  onNavigateWorld,
  onNavigateRegion,
  onNavigateSubregion,
}) => {
  return (
    <nav
      aria-label="Spatial Hierarchy Breadcrumbs"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.4rem',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)',
      }}
    >
      <button
        onClick={onNavigateWorld}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: 'none',
          border: 'none',
          color: !region ? 'var(--accent-gold)' : 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '0.25rem 0.5rem',
          borderRadius: 'var(--radius-sm)',
          transition: 'all var(--transition-fast)',
          fontWeight: !region ? 700 : 500,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = !region ? 'var(--accent-gold)' : 'var(--text-secondary)')}
      >
        <Globe size={15} color="var(--accent-gold)" />
        <span>World</span>
      </button>

      {region && (
        <>
          <ChevronRight size={13} color="var(--text-tertiary)" />
          <button
            onClick={() => onNavigateRegion(region.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'none',
              border: 'none',
              color: !subregion ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              transition: 'all var(--transition-fast)',
              fontWeight: !subregion ? 700 : 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = !subregion ? 'var(--accent-cyan)' : 'var(--text-secondary)')}
          >
            <span>{region.name}</span>
          </button>
        </>
      )}

      {subregion && (
        <>
          <ChevronRight size={13} color="var(--text-tertiary)" />
          <button
            onClick={() => onNavigateSubregion(subregion.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'none',
              border: 'none',
              color: !country ? 'var(--accent-emerald)' : 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              transition: 'all var(--transition-fast)',
              fontWeight: !country ? 700 : 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = !country ? 'var(--accent-emerald)' : 'var(--text-secondary)')}
          >
            <span>{subregion.name}</span>
          </button>
        </>
      )}

      {country && (
        <>
          <ChevronRight size={13} color="var(--text-tertiary)" />
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--accent-gold-light)',
              fontWeight: 700,
              padding: '0.25rem 0.5rem',
              background: 'rgba(229, 181, 88, 0.1)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(229, 181, 88, 0.25)',
            }}
          >
            <span>{country.flag.emoji}</span>
            <span>{country.name}</span>
          </span>
        </>
      )}
    </nav>
  );
};
