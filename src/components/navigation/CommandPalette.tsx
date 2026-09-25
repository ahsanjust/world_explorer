import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, CornerDownLeft } from 'lucide-react';
import { COUNTRY_INDEX, DATASET_STATS, getRegionById } from '../../data';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (countryId: string) => void;
}

/**
 * Visibility gate only — all interactive state lives in `PalettePanel`, which
 * unmounts whenever the palette closes. Every reopen therefore starts with a
 * fresh query and selection *without* a setState-in-effect (the lint-flagged
 * pattern), and it stays correct even when the parent toggles the palette shut
 * itself (the Cmd+K toggle in App.tsx), bypassing the palette's own close paths.
 */
export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelectCountry }) => {
  if (!isOpen) return null;
  return <PalettePanel onClose={onClose} onSelectCountry={onSelectCountry} />;
};

const PalettePanel: React.FC<Omit<CommandPaletteProps, 'isOpen'>> = ({ onClose, onSelectCountry }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Filter countries matching query
  const filtered = query.trim()
    ? COUNTRY_INDEX.filter((c) => {
        const q = query.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.capital.toLowerCase().includes(q) ||
          c.iso2.toLowerCase() === q ||
          c.iso3.toLowerCase() === q ||
          c.climateSummary.toLowerCase().includes(q)
        );
      })
    : COUNTRY_INDEX;

  useEffect(() => {
    // Mount-time focus. Focus is DOM-only (no setState) and the timer is
    // cleaned up if the palette closes before it fires.
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation within the palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filtered.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        onSelectCountry(filtered[selectedIndex].id);
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 10, 0.82)',
        backdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search countries"
        style={{
          width: '100%',
          maxWidth: '640px',
          background: 'var(--bg-glass-elevated)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg), 0 0 35px rgba(229, 181, 88, 0.12)',
          overflow: 'hidden',
          /* Entrance: the shared `fadeIn` keyframe (base.css). Global
             reduced-motion block neutralises it for users who ask for it. */
          animation: 'fadeIn 0.16s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <Search size={20} color="var(--accent-gold)" />
          <input
            ref={inputRef}
            id="country-search-input"
            type="text"
            role="combobox"
            aria-expanded={filtered.length > 0}
            aria-controls="country-search-listbox"
            aria-autocomplete="list"
            aria-activedescendant={
              filtered[selectedIndex] ? `country-option-${filtered[selectedIndex].id}` : undefined
            }
            aria-label="Search countries by name, capital, or code"
            placeholder="Teleport to country, capital, or code... (e.g. Muscat, Oman, OMN)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-md)',
              fontFamily: 'var(--font-sans)',
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search query"
              style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          )}
          <kbd
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '2px 7px',
              borderRadius: '4px',
              fontSize: '11px',
              color: 'var(--text-tertiary)',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          id="country-search-listbox"
          role="listbox"
          aria-label="Matching countries"
          style={{ maxHeight: '360px', overflowY: 'auto', padding: '0.5rem' }}
        >
          {filtered.length === 0 ? (
            <div
              role="status"
              style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-tertiary)' }}
            >
              No countries found matching "{query}"
            </div>
          ) : (
            filtered.map((country, idx) => {
              const isSelected = idx === selectedIndex;
              const region = getRegionById(country.regionId);
              return (
                <div
                  key={country.id}
                  id={`country-option-${country.id}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onSelectCountry(country.id);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'var(--bg-surface-hover)' : 'transparent',
                    border: isSelected ? '1px solid var(--border-medium)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{country.flagEmoji}</span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span
                          style={{
                            fontWeight: 600,
                            color: isSelected ? 'var(--accent-gold)' : 'var(--text-primary)',
                            fontSize: 'var(--text-base)',
                          }}
                        >
                          {country.name}
                        </span>
                        <span className="badge badge-muted" style={{ fontSize: '10px' }}>
                          {country.iso3}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginTop: '2px',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <MapPin size={11} color="var(--accent-cyan)" />
                          {country.capital}
                        </span>
                        <span>•</span>
                        <span>{region?.name}</span>
                        <span>•</span>
                        <span style={{ color: 'var(--accent-gold-light)' }}>
                          ${country.gdpPerCapitaPppUsd.toLocaleString()} PPP
                        </span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: 'var(--accent-gold)',
                        fontSize: 'var(--text-xs)',
                      }}
                    >
                      <span>Jump</span>
                      <CornerDownLeft size={13} />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          style={{
            padding: '0.6rem 1.25rem',
            background: 'rgba(0, 0, 0, 0.3)',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '11px',
            color: 'var(--text-tertiary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Use ↑ ↓ to navigate, Enter to teleport</span>
          <span>{DATASET_STATS.countryCount} Dossiers Published</span>
        </div>
      </div>
    </div>
  );
};
