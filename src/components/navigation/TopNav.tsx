import React from 'react';
import { Compass, Search, Sparkles, Scale, Filter } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { Region, Subregion } from '../../types/spatial';
import { CountryProfile } from '../../types/country';

interface TopNavProps {
  region?: Region;
  subregion?: Subregion;
  country?: CountryProfile;
  pinnedCount: number;
  onNavigateWorld: () => void;
  onNavigateRegion: (regionId: string) => void;
  onNavigateSubregion: (subregionId: string) => void;
  onOpenSearch: () => void;
  onOpenThematic: () => void;
  onOpenCompare: () => void;
  onOpenFilter?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  region,
  subregion,
  country,
  pinnedCount,
  onNavigateWorld,
  onNavigateRegion,
  onNavigateSubregion,
  onOpenSearch,
  onOpenThematic,
  onOpenCompare,
  onOpenFilter,
}) => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: 'var(--header-height)',
        background: 'rgba(7, 9, 14, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* Left: Brand Identity & Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', overflow: 'hidden' }}>
          <div
            onClick={onNavigateWorld}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              cursor: 'pointer',
              userSelect: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(229, 181, 88, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%)',
                border: '1px solid var(--accent-gold-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(229, 181, 88, 0.2)',
              }}
            >
              <Compass size={20} color="var(--accent-gold)" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.125rem',
                  letterSpacing: '0.04em',
                  background: 'linear-gradient(135deg, #FFFFFF 30%, var(--accent-gold) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                WORLD EXPLORER
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Planetary Observatory
              </div>
            </div>
          </div>

          {/* Breadcrumb Path */}
          <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '1.25rem', overflowX: 'auto' }}>
            <Breadcrumbs
              region={region}
              subregion={subregion}
              country={country}
              onNavigateWorld={onNavigateWorld}
              onNavigateRegion={onNavigateRegion}
              onNavigateSubregion={onNavigateSubregion}
            />
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
          {/* Universal Search Button */}
          <button
            onClick={onOpenSearch}
            className="btn-secondary"
            style={{
              padding: '0.45rem 0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            title="Search Countries (Cmd+K)"
          >
            <Search size={14} color="var(--accent-gold)" />
            <span style={{ fontSize: 'var(--text-xs)' }}>Search</span>
            <kbd
              style={{
                fontSize: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '1px 5px',
                borderRadius: '3px',
                color: 'var(--text-secondary)',
              }}
            >
              ⌘K
            </kbd>
          </button>

          {/* Multi-Criteria Filters */}
          {onOpenFilter && (
            <button
              onClick={onOpenFilter}
              className="btn-secondary"
              style={{
                padding: '0.45rem 0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
              title="Multi-Criteria Country Discovery"
            >
              <Filter size={14} color="var(--accent-emerald)" />
              <span style={{ fontSize: 'var(--text-xs)' }}>Filters</span>
            </button>
          )}

          {/* Thematic Discovery Lenses */}
          <button
            onClick={onOpenThematic}
            className="btn-secondary"
            style={{
              padding: '0.45rem 0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Sparkles size={14} color="var(--accent-cyan)" />
            <span style={{ fontSize: 'var(--text-xs)' }}>Thematic Lenses</span>
          </button>

          {/* Comparison Dock Trigger */}
          <button
            onClick={onOpenCompare}
            className="btn-secondary"
            style={{
              padding: '0.45rem 0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              borderColor: pinnedCount > 0 ? 'var(--accent-gold)' : 'var(--border-medium)',
            }}
          >
            <Scale size={14} color={pinnedCount > 0 ? 'var(--accent-gold)' : 'var(--text-secondary)'} />
            <span style={{ fontSize: 'var(--text-xs)' }}>Compare</span>
            {pinnedCount > 0 && (
              <span
                style={{
                  background: 'var(--accent-gold)',
                  color: '#07090E',
                  fontWeight: 700,
                  fontSize: '10px',
                  padding: '1px 6px',
                  borderRadius: '999px',
                }}
              >
                {pinnedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
