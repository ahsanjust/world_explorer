import { CountryProfile, CountrySummary } from '../types/country';
import { Region, Subregion, RegionId } from '../types/spatial';
import { REGIONS } from './regions';
import { SUBREGIONS } from './subregions';
import { THEMATIC_PORTALS, ThematicPortal } from './thematic';
import { computeDatasetStats, validateDataset } from './dataset';
export * from './universities';

// Import full country profiles
import { QATAR } from './countries/qatar';
import { JAPAN } from './countries/japan';
import { SWITZERLAND } from './countries/switzerland';
import { SINGAPORE } from './countries/singapore';
import { UAE } from './countries/united-arab-emirates';
import { NORWAY } from './countries/norway';
import { UNITED_STATES } from './countries/united-states';
import { GERMANY } from './countries/germany';
import { UNITED_KINGDOM } from './countries/united-kingdom';
import { BRAZIL } from './countries/brazil';
import { KENYA } from './countries/kenya';
import { EGYPT } from './countries/egypt';
import { SOUTH_AFRICA } from './countries/south-africa';
import { AUSTRALIA } from './countries/australia';
import { CANADA } from './countries/canada';

export const ALL_COUNTRY_PROFILES: CountryProfile[] = [
  QATAR,
  JAPAN,
  SWITZERLAND,
  SINGAPORE,
  UAE,
  NORWAY,
  UNITED_STATES,
  CANADA,
  GERMANY,
  UNITED_KINGDOM,
  BRAZIL,
  KENYA,
  EGYPT,
  SOUTH_AFRICA,
  AUSTRALIA,
];

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
 * UI code MUST read counts from here rather than hardcoding literals. Two components
 * currently hardcode them and one is already wrong (`CommandPalette.tsx` claims 12
 * nations; the dataset holds 15) — see WORK_QUEUE TASK-005 / TASK-006.
 */
export const DATASET_STATS = computeDatasetStats(
  ALL_COUNTRY_PROFILES,
  REGIONS,
  SUBREGIONS
);

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
