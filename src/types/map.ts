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

/**
 * The application scope (2026-09-25 pivot): the Middle East & North Africa.
 * ISO 3166-1 alpha-3 codes of every state treated as in-scope, used to decide
 * which territories of the Natural Earth boundary asset are the map's subject.
 *
 * **Re-exported, not re-declared.** The canonical list is
 * `MIDDLE_EAST_COUNTRY_ISO3` in `src/data/subregions.ts`, derived from the
 * subregion country lists. Two divergent copies of this list already existed
 * once during the pivot (17 states here vs 21 in the data layer, with the four
 * Maghreb states missing here) — which is exactly how a country gets dropped
 * from one surface while surviving in another. Do not re-introduce a literal.
 */
export { MIDDLE_EAST_COUNTRY_ISO3 as MIDDLE_EAST_ISO3 } from '../data/subregions';

/**
 * Natural Earth encodes an artificial "Seven seas (open ocean)" polygon; it is
 * excluded everywhere: the open ocean is not a sovereign territory. Antarctica
 * is likewise out of scope for the ME-only application.
 */
export const EXCLUDED_CONTINENTS = ['Antarctica', 'Seven seas (open ocean)'];
