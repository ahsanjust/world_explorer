import React from 'react';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';
import { getCountrySummaryById } from '../../data';

interface ComparisonDockProps {
  pinnedIds: string[];
  onRemovePin: (countryId: string) => void;
  onClearAll: () => void;
  onOpenCompare: () => void;
}

export const ComparisonDock: React.FC<ComparisonDockProps> = ({
  pinnedIds,
  onRemovePin,
  onClearAll,
  onOpenCompare,
}) => {
  if (pinnedIds.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 90,
        maxWidth: '90vw',
        width: 'auto',
      }}
    >
      <div
        className="glass-panel"
        style={{
          background: 'var(--bg-glass-elevated)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--accent-gold-dark)',
          borderRadius: 'var(--radius-full)',
          padding: '0.5rem 0.85rem 0.5rem 1.25rem',
          boxShadow: 'var(--shadow-gold), var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'nowrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <Scale size={16} color="var(--accent-gold)" />
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            Compare ({pinnedIds.length}/4):
          </span>
        </div>

        {/* Pinned Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflowX: 'auto' }}>
          {pinnedIds.map((id) => {
            const country = getCountrySummaryById(id);
            if (!country) return null;
            return (
              <div
                key={id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.25rem 0.6rem',
                  background: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-medium)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{country.flagEmoji}</span>
                <span style={{ fontWeight: 600 }}>{country.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemovePin(id);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-tertiary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1px',
                  }}
                  title="Remove from dock"
                >
                  <X size={12} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            onClick={onOpenCompare}
            className="btn-primary"
            style={{
              padding: '0.4rem 1rem',
              fontSize: 'var(--text-xs)',
              whiteSpace: 'nowrap',
            }}
          >
            <span>Compare Now</span>
            <ArrowRight size={13} />
          </button>

          <button
            onClick={onClearAll}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-tertiary)',
              cursor: 'pointer',
              padding: '0.35rem',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Clear all pinned"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
