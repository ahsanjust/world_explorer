import React, { useEffect, useRef } from 'react';
import { SECTIONS } from './sections';

interface StickyNavRailProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const StickyNavRail: React.FC<StickyNavRailProps> = ({ activeSection, onSelectSection }) => {
  const progressRef = useRef<HTMLDivElement | null>(null);

  /* Reading-progress line. rAF-throttled and written straight to the element as
     a CSS custom property — a React state update here would re-render the whole
     dossier tree on every scroll frame. */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = progressRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      // No scrollable overflow (short page): everything is already in view.
      const ratio = scrollable <= 0 ? 1 : Math.min(1, Math.max(0, doc.scrollTop / scrollable));
      el.style.setProperty('--progress', `${(ratio * 100).toFixed(2)}%`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update(); // paint correct value on mount (mid-page re-entry, hash routes)
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 'var(--header-height)',
        zIndex: 40,
        background: 'rgba(10, 14, 22, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        /* The nav itself never scrolls: the progress line is absolutely pinned to
           it, and only the button strip below scrolls horizontally (it would
           otherwise drag the line out of view on narrow screens). */
      }}
    >
      <div ref={progressRef} className="rail-progress" aria-hidden="true" />
      <div
        className="container"
        style={{
          display: 'flex',
          gap: '0.25rem',
          paddingTop: '0.35rem',
          paddingBottom: '0.35rem',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              aria-current={isActive ? 'location' : undefined}
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
