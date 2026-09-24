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
