import { RegionId } from './spatial';

/**
 * Minimal GeoJSON surface used by the cartographic layer.
 *
 * Intentionally hand-rolled instead of pulling in @types/geojson: the map only
 * consumes a single pre-simplified, known-shape asset (see
 * `src/data/map/worldGeo.ts`), so a full GeoJSON type definition would be an
 * unnecessary dependency.
 */

/** GeoJSON positions are `[longitude, latitude]` (note: the opposite order from
 *  `CountryProfile.geography.coordinates`, which is `[lat, lng]`). */
export type GeoPosition = [number, number];

export interface MapCountryProperties {
  /** ISO 3166-1 alpha-3. Used as the join key against CountrySummary.iso3. */
  iso3: string;
  /** ISO 3166-1 alpha-2, or '' when Natural Earth supplies none. */
  iso2: string;
  /** Natural Earth display name (e.g. "United States of America"). */
  name: string;
  /** Natural Earth continent bucket: Africa | Asia | Europe | North America | South America | Oceania */
  continent: string;
  /** Natural Earth subregion label (e.g. "Western Asia"). */
  subregion: string;
}

export type MapGeometry =
  | { type: 'Polygon'; coordinates: GeoPosition[][] }
  | { type: 'MultiPolygon'; coordinates: GeoPosition[][][] };

export interface MapCountryFeature {
  type: 'Feature';
  properties: MapCountryProperties;
  geometry: MapGeometry;
}

/** Provenance block shipped inside the geojson asset itself. */
export interface WorldGeoMetadata {
  name: string;
  source: string;
  sourceUrl: string;
  license: string;
  /** ISO date the upstream dataset was retrieved. */
  retrieved: string;
  /** Human-readable description of the simplification that was applied. */
  simplification: string;
  featureCount: number;
  /** Upstream territories dropped during simplification, for transparency. */
  excluded: string[];
}

export interface WorldGeoCollection {
  type: 'FeatureCollection';
  metadata: WorldGeoMetadata;
  features: MapCountryFeature[];
}

export type WorldGeoStatus = 'idle' | 'loading' | 'ready' | 'error';

/** A pre-computed, render-ready country: path string plus join metadata. */
export interface RenderableCountry {
  iso3: string;
  name: string;
  continent: string;
  subregion: string;
  /** SVG path data in map units. */
  path: string;
  /** Approximate bounding-box area in map units², used to sort draw order. */
  area: number;
}

/** Maps a continent-level `RegionId` onto the continent labels used by the geojson. */
export const CONTINENTS_BY_REGION: Record<RegionId, string[]> = {
  africa: ['Africa'],
  americas: ['North America', 'South America'],
  asia: ['Asia'],
  europe: ['Europe'],
  oceania: ['Oceania'],
  polar: ['Antarctica'],
};

/**
 * Natural Earth encodes Antarctica and an artificial "Seven seas (open ocean)"
 * polygon. Both are excluded: the app's spatial model has no region for the high
 * southern latitudes and the open-ocean polygon is not a sovereign territory.
 */
export const EXCLUDED_CONTINENTS = ['Antarctica', 'Seven seas (open ocean)'];
