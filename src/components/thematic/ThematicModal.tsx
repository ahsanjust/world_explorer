import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, Coins, ShieldCheck, Mountain, Globe2, Landmark } from 'lucide-react';
import { getThematicPortals, getCountrySummaryById } from '../../data';

interface ThematicModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPortalId?: string;
  onSelectCountry: (countryId: string) => void;
}

export const ThematicModal: React.FC<ThematicModalProps> = ({
  isOpen,
  onClose,
  initialPortalId,
  onSelectCountry,
}) => {
  const portals = getThematicPortals();
  const [selectedPortalId, setSelectedPortalId] = useState<string>(initialPortalId || portals[0].id);

  if (!isOpen) return null;

  const currentPortal = portals.find((p) => p.id === selectedPortalId) || portals[0];

  const renderIcon = (name: string, color: string) => {
    switch (name) {
      case 'Coins':
        return <Coins size={20} color={color} />;
      case 'ShieldCheck':
        return <ShieldCheck size={20} color={color} />;
      case 'Mountain':
        return <Mountain size={20} color={color} />;
      case 'Globe2':
        return <Globe2 size={20} color={color} />;
      case 'Landmark':
        return <Landmark size={20} color={color} />;
      default:
        return <Sparkles size={20} color={color} />;
    }
  };

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
          maxWidth: '920px',
          maxHeight: '85vh',
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
            <Sparkles size={20} color="var(--accent-gold)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800 }}>
              Curated Thematic Discovery Portals
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

        {/* Portals Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '1rem 1.75rem',
            borderBottom: '1px solid var(--border-subtle)',
            overflowX: 'auto',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          {portals.map((p) => {
            const isSelected = p.id === currentPortal.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPortalId(p.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? `1px solid ${p.accentColor}` : '1px solid var(--border-subtle)',
                  background: isSelected ? `${p.accentColor}20` : 'transparent',
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: 'var(--text-xs)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {renderIcon(p.iconName, isSelected ? p.accentColor : 'var(--text-tertiary)')}
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Portal View */}
        <div style={{ padding: '1.75rem', overflowY: 'auto' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge" style={{ background: `${currentPortal.accentColor}25`, color: currentPortal.accentColor, border: `1px solid ${currentPortal.accentColor}50` }}>
                Thematic Lens
              </span>
              <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {currentPortal.title}
              </h4>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.5, maxWidth: '720px' }}>
              {currentPortal.description}
            </p>
          </div>

          {/* Countries in this Portal Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {currentPortal.countryIds.map((cid) => {
              const country = getCountrySummaryById(cid);
              if (!country) return null;
              return (
                <div
                  key={cid}
                  onClick={() => {
                    onSelectCountry(cid);
                    onClose();
                  }}
                  className="interactive-card"
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderLeft: `3px solid ${currentPortal.accentColor}`,
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
                      <span style={{ fontSize: '1.75rem' }}>{country.flagEmoji}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>
                          {country.name}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                          Capital: {country.capital}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                      GDP per Capita (PPP):{' '}
                      <strong style={{ color: 'var(--accent-gold-light)' }}>
                        ${country.gdpPerCapitaPppUsd.toLocaleString()}
                      </strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem', color: currentPortal.accentColor, fontSize: 'var(--text-xs)', fontWeight: 700 }}>
                    <span>Explore Dossier</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
