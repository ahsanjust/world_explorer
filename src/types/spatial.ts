/* =============================================================================
   SPATIAL HIERARCHY — MIDDLE EAST SCOPE
   =============================================================================
   The product explores **only the Middle East** (operator directive, 2026-09-25).
   There is therefore exactly ONE region in the app's dataset, and `RegionId` is
   deliberately a single-member union.

   Why a one-member union instead of a plain string
     Every `Record<RegionId, T>` in the codebase (accent colours, zoom defaults,
     regional benchmarks) is then exhaustive by construction: it is impossible to
     add a region without the compiler demanding its entries, and impossible to
     leave a dead placeholder behind. The previous six-member union carried a
     reserved `'polar'` member that no region declared, which forced three
     unreachable placeholder entries into the map and broke the build once
    .

   Adding a region back
     Widen the union here, add the `Region` to `src/data/regions.ts`, and the
     compiler will point at every place that must be updated. That is the point.
   ============================================================================= */

export type RegionId = 'middle-east';

export interface Region {
  id: RegionId;
  name: string;
  code: string;
  hemisphere: 'Northern' | 'Southern' | 'Both';
  /**
   * Number of sovereign states this region covers, i.e. the length of the union
   * of its subregions' country lists. It is a *coverage* target, not a count of
   * authored dossiers — see `DATASET_STATS.countryCount` for how many profiles
   * actually exist, and `PENDING_DOSSIERS` for the difference.
   */
  countryCount: number;
  /**
   * Aggregate population, or `null` while it is unavailable.
   *
   * Zero-fabrication policy: a true regional aggregate requires sourced figures
   * for all 21 states, and only a handful of dossiers exist yet. Summing the
   * compiled subset and presenting it as the region's population would be a
   * fabricated statistic, so this stays `null` and the UI must render it as
   * unavailable.
   */
  totalPopulation: number | null;
  /** Aggregate nominal GDP in USD trillions, or `null`. Same policy as above. */
  totalGdpTrillionUsd: number | null;
  overview: string;
  /**
   * The region's subregions, in navigation order. Since the re-scope this list
   * and the authored `SUBREGIONS` records are kept in sync — `validateDataset()`
   * reports `unresolved-region-subregion` if they ever drift apart.
   */
  subregions: string[];
  focalCoordinates: [number, number]; // [lat, lng]
  focalZoom: number;
  color: string;
}

export interface Subregion {
  id: string; // e.g. 'arabian-peninsula', 'levant'
  regionId: RegionId;
  name: string;
  description: string;
  countries: string[]; // ISO3 codes
  centerCoordinates: [number, number]; // [lat, lng]
  /**
   * `[[minLat, minLng], [maxLat, maxLng]]`, derived from the member states'
   * geometry in `public/maps/world-countries-50m.geojson` — not estimated.
   */
  bounds: [[number, number], [number, number]];
}

export type ViewMode = 'spatial' | 'matrix' | 'compare';

export interface SpatialNavigationState {
  viewMode: ViewMode;
  selectedRegionId?: RegionId;
  selectedSubregionId?: string;
  selectedCountryId?: string; // id or ISO3
}
