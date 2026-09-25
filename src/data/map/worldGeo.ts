import { WorldGeoCollection } from '../../types/map';

/* =============================================================================
   WORLD BOUNDARY ASSET — SOURCES & PROVENANCE
   =============================================================================
   Asset:   public/maps/world-countries-50m.geojson
   Source:  Natural Earth — ne_50m_admin_0_countries
            https://www.naturalearthdata.com/
   License: Public domain. Natural Earth requires no attribution and imposes no
            redistribution restrictions, which is why it was chosen over
            OpenStreetMap-derived extracts (ODbL, share-alike) for a project that
            ships as a static public artifact.

   Transformation applied (documented in the asset's own `metadata` block):
     1. Douglas-Peucker simplification with a span-adaptive tolerance, so a
        small state keeps its silhouette while a continent loses redundant
        points.
     2. Coordinates rounded to 1 decimal (~11 km), well below the pixel size of
        the minimum zoom level.
     3. Interior rings under 0.01 deg² discarded, unless they are a feature's
        largest ring (this is what preserves Singapore, Bahrain, etc.).
     4. Non-boundary attributes stripped; only the join/label fields survive.

   Result: 428 KB raw / ~105 KB gzipped for 242 territories, versus 3.1 MB raw
   for the unmodified 50m dataset.

   The 50m scale was chosen over 110m deliberately: at 110m, Natural Earth omits
   Bahrain and other small states that are first-class members of this app's dataset.
   ============================================================================= */

export const WORLD_GEO_URL = 'maps/world-countries-50m.geojson';

/** Resolves the asset URL against the Vite base so the path stays correct when
 *  deployed under https://USERNAME.github.io/REPOSITORY/ (base is './'). */
function resolveAssetUrl(relativePath: string): string {
  const base = import.meta.env.BASE_URL || './';
  return `${base.replace(/\/+$/, '')}/${relativePath.replace(/^\/+/, '')}`;
}

/** Module-level cache so the asset is fetched at most once per page load, no
 *  matter how many components mount. */
let loadPromise: Promise<WorldGeoCollection> | null = null;

function isUsableCollection(value: unknown): value is WorldGeoCollection {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<WorldGeoCollection>;
  return candidate.type === 'FeatureCollection' && Array.isArray(candidate.features);
}

/**
 * Fetches and validates the world boundary asset.
 *
 * The result is memoised, so concurrent callers share one request. A rejected
 * promise is cleared from the cache so a later mount can retry (e.g. after the
 * user regains connectivity) instead of being stuck in a failed state forever.
 */
export function loadWorldGeo(): Promise<WorldGeoCollection> {
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const url = resolveAssetUrl(WORLD_GEO_URL);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Boundary data unavailable (HTTP ${response.status}). Expected ${url}.`
      );
    }

    const json: unknown = await response.json();
    if (!isUsableCollection(json)) {
      throw new Error(`Boundary data at ${url} is not a valid FeatureCollection.`);
    }

    return json;
  })().catch((error: unknown) => {
    loadPromise = null; // allow a retry on the next mount
    throw error;
  });

  return loadPromise;
}
