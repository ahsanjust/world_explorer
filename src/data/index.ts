import { CountryProfile, CountrySummary, Landmark } from '../types/country';
import { Region, Subregion, RegionId } from '../types/spatial';
import { REGIONS } from './regions';
import {
  SUBREGIONS,
  MIDDLE_EAST_COUNTRY_ISO3,
  findCountriesWithoutDossiers,
  isMiddleEastCountry,
} from './subregions';
import { THEMATIC_PORTALS, ThematicPortal } from './thematic';
import { computeDatasetStats, validateDataset } from './dataset';
export * from './universities';

// Import full country profiles
// Scope: All 26 sovereign nations of the Greater Middle East.
import { QATAR } from './countries/qatar';
import { UAE } from './countries/united-arab-emirates';
import { EGYPT } from './countries/egypt';
import { SAUDI_ARABIA } from './countries/saudi-arabia';
import { TURKEY } from './countries/turkey';
import { MOROCCO } from './countries/morocco';
import { OMAN } from './countries/oman';
import { JORDAN } from './countries/jordan';
import { KUWAIT } from './countries/kuwait';
import { BAHRAIN } from './countries/bahrain';
// Every other sovereign member owns its dossier module too, so no country's
// figures live in a shared list.
import { ALGERIA } from './countries/algeria';
import { TUNISIA } from './countries/tunisia';
import { LEBANON } from './countries/lebanon';
import { IRAQ } from './countries/iraq';
import { IRAN } from './countries/iran';
import { CYPRUS } from './countries/cyprus';
import { AZERBAIJAN } from './countries/azerbaijan';
import { GEORGIA } from './countries/georgia';
import { YEMEN } from './countries/yemen';
import { ISRAEL } from './countries/israel';
import { PALESTINE } from './countries/palestine';
import { SYRIA } from './countries/syria';
import { LIBYA } from './countries/libya';
import { SUDAN } from './countries/sudan';
import { ARMENIA } from './countries/armenia';
import { AFGHANISTAN } from './countries/afghanistan';
import { withDerivedPeers } from './peers';
import { getLandmarksByCountryIso3 } from './landmarks';

/* --- landmark gallery ----------------------------------------------------- */

/**
 * How many landmark cards one dossier shows. Dossiers carry 1-4 hand-authored
 * entries; the generated dataset holds up to 15 per country, and rendering all
 * of them would add several screens of scrolling to an already long page.
 */
const LANDMARK_GALLERY_LIMIT = 9;

/**
 * Tops each dossier's landmark gallery up from the generated Wikidata dataset.
 *
 * Hand-authored entries come first because their descriptions were written for
 * the page; the generated records then fill the remainder in their own order of
 * recognition. Records already present by name are skipped, so a country whose
 * author listed a site is never shown it twice.
 */
function withGeneratedLandmarks(profiles: CountryProfile[]): CountryProfile[] {
  return profiles.map((country) => {
    const curated = country.cultureAndLifestyle.topLandmarks;
    if (curated.length >= LANDMARK_GALLERY_LIMIT) return country;

    const seen = new Set(curated.map((landmark) => landmark.name.trim().toLowerCase()));
    const generated: Landmark[] = [];

    for (const landmark of getLandmarksByCountryIso3(country.iso3)) {
      const key = landmark.name.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      generated.push(landmark);
      if (curated.length + generated.length >= LANDMARK_GALLERY_LIMIT) break;
    }

    if (generated.length === 0) return country;

    return {
      ...country,
      cultureAndLifestyle: {
        ...country.cultureAndLifestyle,
        topLandmarks: [...curated, ...generated],
      },
    };
  });
}

export const ALL_COUNTRY_PROFILES: CountryProfile[] = withGeneratedLandmarks(withDerivedPeers([
  // Detailed Flagship Profiles
  QATAR,
  UAE,
  EGYPT,
  SAUDI_ARABIA,
  TURKEY,
  MOROCCO,
  OMAN,
  JORDAN,
  KUWAIT,
  BAHRAIN,
  // Comprehensive Sovereign Member Profiles
  ALGERIA,
  TUNISIA,
  LEBANON,
  IRAQ,
  IRAN,
  CYPRUS,
  AZERBAIJAN,
  GEORGIA,
  YEMEN,
  ISRAEL,
  PALESTINE,
  SYRIA,
  LIBYA,
  SUDAN,
  ARMENIA,
  AFGHANISTAN,
]));

// Lightweight summary index for fast rendering of globe, maps, and search
export const COUNTRY_INDEX: CountrySummary[] = ALL_COUNTRY_PROFILES.map((c) => ({
  id: c.id,
  iso2: c.iso2,
  iso3: c.iso3,
  name: c.name,
  regionId: c.regionId,
  subregionId: c.subregionId,
  capital: c.capital.name,
  flagEmoji: c.flag.emoji,
  population: c.demographics.population,
  gdpPerCapitaPppUsd: c.economy.gdpPerCapitaPppUsd,
  safetyIndex: c.safetyAndGovernance.safetyIndexNumbeo,
  costOfLivingIndex: c.costOfLiving.indexRelativeToNyc,
  climateSummary: c.climate.koppenTitle,
  coordinates: c.geography.coordinates,
}));

export function getAllRegions(): Region[] {
  return REGIONS;
}

export function getRegionById(id: RegionId): Region | undefined {
  return REGIONS.find((r) => r.id === id);
}

export function getAllSubregions(): Subregion[] {
  return SUBREGIONS;
}

export function getSubregionById(id: string): Subregion | undefined {
  return SUBREGIONS.find((s) => s.id === id);
}

export function getSubregionsByRegion(regionId: RegionId): Subregion[] {
  return SUBREGIONS.filter((s) => s.regionId === regionId);
}

export function getAllCountrySummaries(): CountrySummary[] {
  return COUNTRY_INDEX;
}

export function getCountryById(idOrIso: string): CountryProfile | undefined {
  const query = idOrIso.toLowerCase();
  return ALL_COUNTRY_PROFILES.find(
    (c) => c.id.toLowerCase() === query || c.iso2.toLowerCase() === query || c.iso3.toLowerCase() === query
  );
}

export function getCountrySummaryById(idOrIso: string): CountrySummary | undefined {
  const query = idOrIso.toLowerCase();
  return COUNTRY_INDEX.find(
    (c) => c.id.toLowerCase() === query || c.iso2.toLowerCase() === query || c.iso3.toLowerCase() === query
  );
}

export function getCountriesByRegion(regionId: RegionId): CountrySummary[] {
  return COUNTRY_INDEX.filter((c) => c.regionId === regionId);
}

export function getCountriesBySubregion(subregionId: string): CountrySummary[] {
  return COUNTRY_INDEX.filter((c) => c.subregionId === subregionId);
}

export function searchCountries(query: string): CountrySummary[] {
  const q = query.trim().toLowerCase();
  if (!q) return COUNTRY_INDEX;
  return COUNTRY_INDEX.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.capital.toLowerCase().includes(q) ||
      c.iso2.toLowerCase() === q ||
      c.iso3.toLowerCase() === q
  );
}

export function getThematicPortals(): ThematicPortal[] {
  return THEMATIC_PORTALS;
}

export function getThematicPortalById(id: string): ThematicPortal | undefined {
  return THEMATIC_PORTALS.find((p) => p.id === id);
}

/* =============================================================================
   DATASET STATISTICS & INTEGRITY
   ============================================================================= */

export { computeDatasetStats, validateDataset } from './dataset';
export type {
  DatasetIssue,
  DatasetReport,
  DatasetStats,
  IssueSeverity,
} from './dataset';

/**
 * Canonical dataset size, derived from the data itself.
 *
 * UI code MUST read counts from here rather than hardcoding literals, ensuring
 * UI components always reflect the latest compiled profiles dynamically.
 */
export const DATASET_STATS = computeDatasetStats(
  ALL_COUNTRY_PROFILES,
  REGIONS,
  SUBREGIONS
);

/* =============================================================================
   MIDDLE EAST SCOPE & COVERAGE
   ============================================================================= */

/**
 * The 21 in-scope states and the scope predicate, re-exported from the single
 * canonical definition in `src/data/subregions.ts`.
 *
 * Consumers should import these from `../data`; the map reaches them through
 * `src/types/map.ts`, which re-exports rather than re-declares.
 */
export { MIDDLE_EAST_COUNTRY_ISO3, isMiddleEastCountry, findCountriesWithoutDossiers };

/**
 * In-scope Middle East states with no authored dossier yet.
 * Derived dynamically from the canonical country list against compiled profiles.
 */
export const PENDING_DOSSIERS: string[] = findCountriesWithoutDossiers(
  ALL_COUNTRY_PROFILES.map((c) => c.iso3)
);

/**
 * Honest "what does this app actually cover" summary for UI copy.
 *
 * Use `compiled / inScope` in coverage notices instead of a bare count, so a
 * reader can tell the difference between "3 countries" and "3 of 21 countries".
 */
export const COVERAGE = {
  /** Dossiers shipped. */
  compiled: ALL_COUNTRY_PROFILES.length,
  /** Sovereign states in scope. */
  inScope: MIDDLE_EAST_COUNTRY_ISO3.length,
  /** In-scope states still awaiting an authored dossier. */
  pending: PENDING_DOSSIERS,
} as const;

/* Development-only integrity check. `import.meta.env.DEV` is statically replaced at
 * build time, so this whole block is dead-code-eliminated from the GitHub Pages
 * bundle and costs production nothing. */
if (import.meta.env.DEV) {
  const report = validateDataset(ALL_COUNTRY_PROFILES, REGIONS, SUBREGIONS);
  const label = '[world-explorer] Dataset integrity';

  if (report.isHealthy && report.warningCount === 0) {
    console.info(
      `${label}: OK — ${report.stats.countryCount} countries, ` +
        `${report.stats.subregionCount} subregions, ${report.stats.regionCount} regions.`
    );
  } else {
    const preview = report.issues.slice(0, 25);
    console.warn(
      `${label}: ${report.errorCount} error(s), ${report.warningCount} warning(s) ` +
        `across ${report.stats.countryCount} countries.`,
      preview
    );
    if (report.issues.length > preview.length) {
      console.warn(
        `${label}: …${report.issues.length - preview.length} further issue(s) omitted.`
      );
    }
  }
}
