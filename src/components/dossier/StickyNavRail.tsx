import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  Shield,
  Sun,
  GraduationCap,
  Landmark,
  FileText,
  Layers,
} from 'lucide-react';

interface StickyNavRailProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'economy', label: 'Economy & Wealth', icon: TrendingUp },
  { id: 'currency', label: 'Live Currency', icon: DollarSign },
  { id: 'demographics', label: 'Demographics', icon: Users },
  { id: 'cost-of-living', label: 'Cost of Living', icon: Layers },
  { id: 'safety', label: 'Safety & Peace', icon: Shield },
  { id: 'climate', label: 'Climate & Biome', icon: Sun },
  { id: 'education', label: 'Universities', icon: GraduationCap },
  { id: 'culture', label: 'Culture & Luxury', icon: Landmark },
];

export const StickyNavRail: React.FC<StickyNavRailProps> = ({ activeSection, onSelectSection }) => {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 'var(--header-height)',
        zIndex: 40,
        background: 'rgba(10, 14, 22, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          gap: '0.25rem',
          paddingTop: '0.35rem',
          paddingBottom: '0.35rem',
        }}
      >
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: isActive ? 'var(--accent-gold)' : 'transparent',
                color: isActive ? '#07090E' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: 'var(--text-xs)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <Icon size={14} color={isActive ? '#07090E' : 'currentColor'} />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
