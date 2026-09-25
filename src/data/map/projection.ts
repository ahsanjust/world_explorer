import {
  MapCountryFeature,
  MapGeometry,
  RenderableCountry,
} from '../../types/map';

/* =============================================================================
   PLATE CARRÉE (EQUIRECTANGULAR) PROJECTION — MIDDLE EAST FRAMING
   =============================================================================
   The obvious choice here *is* the simple one. An equirectangular projection is
   an exact affine transform, so:
     - pan/zoom is a pure viewBox change (no per-frame reprojection cost),
     - path data is computed exactly once and never rebuilt,
     - and no projection library is needed.

   Scope (2026-09-25 pivot): the plane now frames ONLY the Middle East & West
   Asia. The bounds below are the measured Natural Earth 50m extent of the
   in-scope states (lng 24.7–63.3, lat 12.3–42.1) padded with a viewing margin.
   At the scale this map is used (regional descent, not surveying) the
   projection tradeoff buys a great deal of reliability and performance.
   ============================================================================= */

/** Highest latitude rendered (covers Anatolia's northern coast). */
export const MAP_MAX_LAT = 46;
/** Lowest latitude rendered (clears Yemen's southern coast). */
export const MAP_MIN_LAT = 6;
export const MAP_MIN_LON = 18;
export const MAP_MAX_LON = 70;

/** Total size of the map plane in map units (1 unit = 1 degree). */
export const MAP_WIDTH = MAP_MAX_LON - MAP_MIN_LON; // 52 (ME plate)
export const MAP_HEIGHT = MAP_MAX_LAT - MAP_MIN_LAT; // 40 (ME plate)

/** Aspect ratio of the Middle East plate. */
export const MAP_ASPECT = MAP_WIDTH / MAP_HEIGHT; // 1.3

/** Projects `[lon, lat]` into map units where (0,0) is the north-west corner. */
export function project(lon: number, lat: number): [number, number] {
  return [lon - MAP_MIN_LON, MAP_MAX_LAT - lat];
}

/** Inverse of {@link project}: map units back to `[lon, lat]`. */
export function unproject(x: number, y: number): [number, number] {
  return [x + MAP_MIN_LON, MAP_MAX_LAT - y];
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Serialises a GeoJSON polygon/multipolygon into a single SVG path string. */
export function geometryToPath(geometry: MapGeometry): string {
  const polygons =
    geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;

  let d = '';
  for (const rings of polygons) {
    for (const ring of rings) {
      for (let i = 0; i < ring.length; i++) {
        const [lon, lat] = ring[i];
        const [x, y] = project(lon, lat);
        d += `${i === 0 ? 'M' : 'L'}${round1(x)} ${round1(y)}`;
      }
      d += 'Z';
    }
  }
  return d;
}

/** Bounding-box area in map units². Used only to order drawing, never displayed. */
function geometryExtent(geometry: MapGeometry): number {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  const visit = (ring: number[][]) => {
    for (const [lon, lat] of ring) {
      const [x, y] = project(lon, lat);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  };

  if (geometry.type === 'Polygon') {
    geometry.coordinates.forEach(visit);
  } else {
    geometry.coordinates.forEach((rings) => rings.forEach(visit));
  }

  if (!Number.isFinite(minX)) return 0;
  return (maxX - minX) * (maxY - minY);
}

/**
 * Converts raw features into render-ready countries.
 *
 * Sorted largest-first so that small states (Singapore, Bahrain, Qatar) paint on
 * top of their larger neighbours and stay hoverable/clickable.
 */
export function computeRenderableCountries(
  features: MapCountryFeature[]
): RenderableCountry[] {
  return features
    .map((feature) => ({
      iso3: feature.properties.iso3,
      name: feature.properties.name,
      continent: feature.properties.continent,
      subregion: feature.properties.subregion,
      path: geometryToPath(feature.geometry),
      area: geometryExtent(feature.geometry),
    }))
    .sort((a, b) => b.area - a.area);
}
