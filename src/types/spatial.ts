// Spatial hierarchy types
export type RegionId = 'africa' | 'americas' | 'asia' | 'europe' | 'oceania' | 'polar';

export interface Region {
  id: RegionId;
  name: string;
  code: string;
  hemisphere: 'Northern' | 'Southern' | 'Both';
  countryCount: number;
  totalPopulation: number;
  totalGdpTrillionUsd: number;
  overview: string;
  /**
   * The forward-looking **coverage plan** for this region: every subregion that
   * belongs to it, including ones with no `Subregion` record authored yet.
   *
   * ⚠️ Do NOT derive display counts from this array. Use
   * `getSubregionsByRegion(id).length` for "how many subregions are reachable",
   * because this list intentionally runs ahead of the authored data
   * (see WORK_QUEUE TASK-015). `WorldPortal` showed inflated counts for all five
   * regions because it read `.length` from here.
   */
  subregions: string[];
  focalCoordinates: [number, number]; // [lat, lng]
  focalZoom: number;
  color: string;
}

export interface Subregion {
  id: string; // e.g. 'middle-east', 'western-europe', 'east-asia'
  regionId: RegionId;
  name: string;
  description: string;
  countries: string[]; // ISO3 codes
  centerCoordinates: [number, number]; // [lat, lng]
  bounds: [[number, number], [number, number]];
}

export type ViewMode = 'spatial' | 'matrix' | 'compare';

export interface SpatialNavigationState {
  viewMode: ViewMode;
  selectedRegionId?: RegionId;
  selectedSubregionId?: string;
  selectedCountryId?: string; // id or ISO3
}
