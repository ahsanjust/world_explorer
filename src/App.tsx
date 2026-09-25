import React, { useState, useEffect, useCallback } from 'react';
import { TopNav } from './components/navigation/TopNav';
import { CommandPalette } from './components/navigation/CommandPalette';
import { WorldPortal } from './components/spatial/WorldPortal';
import { RegionPortal } from './components/spatial/RegionPortal';
import { SubregionPortal } from './components/spatial/SubregionPortal';
import { CountryProfileView } from './components/dossier/CountryProfileView';
import { ComparisonDock } from './components/comparison/ComparisonDock';
import { ComparisonModal } from './components/comparison/ComparisonModal';
import { ThematicModal } from './components/thematic/ThematicModal';
import { MultiFilterExplorer } from './components/filters/MultiFilterExplorer';

import {
  getRegionById,
  getSubregionById,
  getCountryById,
  getCountrySummaryById,
} from './data';
import { RegionId } from './types/spatial';

const PINNED_STORAGE_KEY = 'world_explorer_pinned_v1';

export const App: React.FC = () => {
  // Navigation State
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId | undefined>(undefined);
  const [selectedSubregionId, setSelectedSubregionId] = useState<string | undefined>(undefined);
  const [selectedCountryId, setSelectedCountryId] = useState<string | undefined>(undefined);

  // Modals & Panels State
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isThematicOpen, setIsThematicOpen] = useState<boolean>(false);
  const [thematicPortalId, setThematicPortalId] = useState<string | undefined>(undefined);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  // Comparison Dock Pinned Countries State
  const [pinnedIds, setPinnedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(PINNED_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync pinned IDs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify(pinnedIds));
    } catch {
      // ignore
    }
  }, [pinnedIds]);

  // URL Hash Synchronizer (GitHub Pages Static Routing)
  const parseHash = useCallback(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) {
      setSelectedRegionId(undefined);
      setSelectedSubregionId(undefined);
      setSelectedCountryId(undefined);
      return;
    }

    const segments = hash.split('/');
    if (segments[0] === 'explore') {
      const regId = segments[1] as RegionId;
      const subId = segments[2];
      const countryId = segments[3];

      setSelectedRegionId(regId || undefined);
      setSelectedSubregionId(subId || undefined);
      setSelectedCountryId(countryId || undefined);
    } else if (segments[0] === 'country' && segments[1]) {
      const targetCountry = getCountryById(segments[1]);
      if (targetCountry) {
        setSelectedRegionId(targetCountry.regionId);
        setSelectedSubregionId(targetCountry.subregionId);
        setSelectedCountryId(targetCountry.id);
      }
    }
  }, []);

  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, [parseHash]);

  // Navigation Trigger Functions
  const navigateWorld = () => {
    window.location.hash = '#/';
    setSelectedRegionId(undefined);
    setSelectedSubregionId(undefined);
    setSelectedCountryId(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateRegion = (regId: string) => {
    window.location.hash = `#/explore/${regId}`;
    setSelectedRegionId(regId as RegionId);
    setSelectedSubregionId(undefined);
    setSelectedCountryId(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateSubregion = (subId: string) => {
    const sub = getSubregionById(subId);
    if (!sub) return;
    window.location.hash = `#/explore/${sub.regionId}/${sub.id}`;
    setSelectedRegionId(sub.regionId);
    setSelectedSubregionId(sub.id);
    setSelectedCountryId(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateCountry = (countryId: string) => {
    const country = getCountryById(countryId);
    if (!country) return;
    window.location.hash = `#/explore/${country.regionId}/${country.subregionId}/${country.id}`;
    setSelectedRegionId(country.regionId);
    setSelectedSubregionId(country.subregionId);
    setSelectedCountryId(country.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Pin Toggle Handler
  const togglePin = (countryId: string) => {
    setPinnedIds((prev) => {
      if (prev.includes(countryId)) {
        return prev.filter((id) => id !== countryId);
      }
      if (prev.length >= 4) {
        alert('You can pin up to 4 countries simultaneously in the Comparison Lab.');
        return prev;
      }
      return [...prev, countryId];
    });
  };

  const removePin = (countryId: string) => {
    setPinnedIds((prev) => prev.filter((id) => id !== countryId));
  };

  const clearAllPins = () => {
    setPinnedIds([]);
  };

  // Resolve current active entities
  const currentRegion = selectedRegionId ? getRegionById(selectedRegionId) : undefined;
  const currentSubregion = selectedSubregionId ? getSubregionById(selectedSubregionId) : undefined;
  const currentCountry = selectedCountryId ? getCountryById(selectedCountryId) : undefined;

  return (
    <div className="app-viewport">
      {/* 1. Global Navigation Bar */}
      <TopNav
        region={currentRegion}
        subregion={currentSubregion}
        country={currentCountry}
        pinnedCount={pinnedIds.length}
        onNavigateWorld={navigateWorld}
        onNavigateRegion={navigateRegion}
        onNavigateSubregion={navigateSubregion}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFilter={() => setIsFilterOpen(true)}
        onOpenThematic={() => {
          setThematicPortalId(undefined);
          setIsThematicOpen(true);
        }}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* 2. Main Viewport Router */}
      <main style={{ flex: 1 }}>
        {currentCountry ? (
          <CountryProfileView
            country={currentCountry}
            isPinned={pinnedIds.includes(currentCountry.id)}
            onTogglePin={() => togglePin(currentCountry.id)}
            onSelectCountry={navigateCountry}
          />
        ) : currentSubregion && currentRegion ? (
          <SubregionPortal
            region={currentRegion}
            subregion={currentSubregion}
            onSelectCountry={navigateCountry}
          />
        ) : currentRegion ? (
          <RegionPortal
            region={currentRegion}
            onSelectSubregion={navigateSubregion}
            onSelectCountry={navigateCountry}
          />
        ) : (
          <WorldPortal
            onSelectRegion={navigateRegion}
            onSelectSubregion={navigateSubregion}
            onSelectCountry={navigateCountry}
            onOpenFilter={() => setIsFilterOpen(true)}
            onOpenThematic={(portalId) => {
              setThematicPortalId(portalId);
              setIsThematicOpen(true);
            }}
          />
        )}
      </main>

      {/* 3. Persistent Comparison Dock */}
      <ComparisonDock
        pinnedIds={pinnedIds}
        onRemovePin={removePin}
        onClearAll={clearAllPins}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* 4. Universal Command Search Modal (Cmd+K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCountry={navigateCountry}
      />

      {/* 5. Thematic Portals Modal */}
      <ThematicModal
        isOpen={isThematicOpen}
        onClose={() => setIsThematicOpen(false)}
        initialPortalId={thematicPortalId}
        onSelectCountry={navigateCountry}
      />

      {/* 6. Comparison Lab Modal */}
      <ComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        pinnedIds={pinnedIds}
        onSelectCountry={navigateCountry}
      />

      {/* 7. Multi-Criteria Exploration Engine Modal */}
      <MultiFilterExplorer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onSelectCountry={navigateCountry}
        pinnedIds={pinnedIds}
        onTogglePin={togglePin}
      />
    </div>
  );
};

export default App;
