import { CountryProfile } from '../types/country';
import { Region, Subregion } from '../types/spatial';

/* =============================================================================
   DATASET INTEGRITY & CANONICAL STATISTICS
   =============================================================================
   Two core jobs for dataset verification:

   1. `computeDatasetStats` — the single source of truth for dataset size. UI components
      derive counts dynamically from here rather than hardcoding numbers.

   2. `validateDataset` — enforces the Zero Fabrication policy. It proves that every
      cross-reference resolves and that no profile ships un-sourced or non-finite
      metrics. "Missing" is not "wrong": structural gaps are only meaningful if they
      can be seen, so they are reported rather than hidden.

   Both functions are PURE (data in, report out). They take their inputs as arguments
   rather than importing the dataset, so they can be exercised against test fixtures.
   ============================================================================= */

export type IssueSeverity = 'error' | 'warning';

export interface DatasetIssue {
  severity: IssueSeverity;
  /** Stable machine-readable code, e.g. 'duplicate-iso3'. */
  code: string;
  message: string;
  /** The entity the issue is about, e.g. a country id. */
  subject?: string;
  /** Where to look, e.g. 'japan.economy.gdpPppUsdBillions'. */
  field?: string;
}

export interface DatasetStats {
  /** Number of full country dossiers available. */
  countryCount: number;
  regionCount: number;
  subregionCount: number;
  /** Country count per region id. */
  countriesByRegion: Record<string, number>;
  /** Regions that currently have at least one dossier. */
  regionsWithDossiers: number;
  /** Regions declared in REGIONS that have no dossier yet. */
  regionsWithoutDossiers: string[];
}

export interface DatasetReport {
  stats: DatasetStats;
  issues: DatasetIssue[];
  errorCount: number;
  warningCount: number;
  /** True when no `error`-severity issue was found. Warnings do not fail health. */
  isHealthy: boolean;
}

/* --- Statistics ------------------------------------------------------------ */

export function computeDatasetStats(
  countries: CountryProfile[],
  regions: Region[],
  subregions: Subregion[]
): DatasetStats {
  const countriesByRegion: Record<string, number> = {};
  for (const region of regions) countriesByRegion[region.id] = 0;

  for (const country of countries) {
    countriesByRegion[country.regionId] =
      (countriesByRegion[country.regionId] ?? 0) + 1;
  }

  const regionsWithoutDossiers = regions
    .filter((region) => (countriesByRegion[region.id] ?? 0) === 0)
    .map((region) => region.id);

  return {
    countryCount: countries.length,
    regionCount: regions.length,
    subregionCount: subregions.length,
    countriesByRegion,
    regionsWithDossiers: regions.length - regionsWithoutDossiers.length,
    regionsWithoutDossiers,
  };
}

/* --- Validation ------------------------------------------------------------ */

function collectDuplicate(
  values: string[],
  code: string,
  label: string,
  issues: DatasetIssue[]
): void {
  const seen = new Map<string, number>();
  for (const value of values) {
    const key = value.toLowerCase();
    seen.set(key, (seen.get(key) ?? 0) + 1);
  }
  for (const [key, count] of seen) {
    if (count > 1) {
      issues.push({
        severity: 'error',
        code,
        message: `Duplicate ${label} "${key}" appears ${count} times.`,
        field: label,
      });
    }
  }
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function collectNumericIssues(
  subject: string,
  entries: [string, unknown][],
  issues: DatasetIssue[]
): void {
  for (const [field, value] of entries) {
    if (!isFiniteNumber(value)) {
      issues.push({
        severity: 'error',
        code: 'non-finite-metric',
        message: `Metric "${field}" is not a finite number (got ${JSON.stringify(value)}).`,
        subject,
        field: `${subject}.${field}`,
      });
    }
  }
}

export function validateDataset(
  countries: CountryProfile[],
  regions: Region[],
  subregions: Subregion[]
): DatasetReport {
  const issues: DatasetIssue[] = [];

  const regionIds = new Set(regions.map((region) => region.id));
  const subregionById = new Map(subregions.map((subregion) => [subregion.id, subregion]));
  const registeredIso3 = new Set(countries.map((country) => country.iso3.toUpperCase()));

  /* 1. Uniqueness — a duplicate key silently corrupts every lookup. */
  collectDuplicate(countries.map((c) => c.id), 'duplicate-country-id', 'country id', issues);
  collectDuplicate(countries.map((c) => c.iso2), 'duplicate-iso2', 'ISO2 code', issues);
  collectDuplicate(countries.map((c) => c.iso3), 'duplicate-iso3', 'ISO3 code', issues);

  /* 2. Country → region / subregion reference resolution. */
  for (const country of countries) {
    if (!regionIds.has(country.regionId)) {
      issues.push({
        severity: 'error',
        code: 'unresolved-region',
        message: `regionId "${country.regionId}" does not exist in REGIONS.`,
        subject: country.id,
        field: `${country.id}.regionId`,
      });
    }

    const subregion = subregionById.get(country.subregionId);
    if (!subregion) {
      issues.push({
        severity: 'error',
        code: 'unresolved-subregion',
        message: `subregionId "${country.subregionId}" does not exist in SUBREGIONS.`,
        subject: country.id,
        field: `${country.id}.subregionId`,
      });
    } else if (subregion.regionId !== country.regionId) {
      issues.push({
        severity: 'error',
        code: 'subregion-region-mismatch',
        message: `subregion "${subregion.id}" belongs to region "${subregion.regionId}", but country declares region "${country.regionId}".`,
        subject: country.id,
        field: `${country.id}.regionId`,
      });
    }
  }

  /* 3. Subregion integrity: its own region ref, and its country list. */
  for (const subregion of subregions) {
    if (!regionIds.has(subregion.regionId)) {
      issues.push({
        severity: 'error',
        code: 'unresolved-subregion-region',
        message: `Subregion "${subregion.id}" references unknown region "${subregion.regionId}".`,
        subject: subregion.id,
        field: `subregions.${subregion.id}.regionId`,
      });
    }

    for (const iso3 of subregion.countries) {
      if (!registeredIso3.has(iso3.toUpperCase())) {
        // Expected while coverage is partial: a subregion legitimately lists
        // members we have no dossier for yet. Worth surfacing, not failing.
        issues.push({
          severity: 'warning',
          code: 'subregion-member-without-dossier',
          message: `Lists "${iso3}", which has no country dossier yet.`,
          subject: subregion.id,
          field: `subregions.${subregion.id}.countries`,
        });
      }
    }
  }

  /* 4. Region → subregion list resolution and ownership consistency. */
  for (const region of regions) {
    for (const subregionId of region.subregions) {
      const subregion = subregionById.get(subregionId);
      if (!subregion) {
        issues.push({
          severity: 'error',
          code: 'unresolved-region-subregion',
          message: `Region lists subregion "${subregionId}", which does not exist.`,
          subject: region.id,
          field: `regions.${region.id}.subregions`,
        });
      } else if (subregion.regionId !== region.id) {
        issues.push({
          severity: 'error',
          code: 'region-subregion-ownership-mismatch',
          message: `Region lists subregion "${subregionId}", which declares region "${subregion.regionId}".`,
          subject: region.id,
          field: `regions.${region.id}.subregions`,
        });
      }
    }
  }

  /* 5. Per-profile provenance and metric sanity. */
  for (const country of countries) {
    const citations = country.metadata?.citations ?? [];
    if (citations.length === 0) {
      issues.push({
        severity: 'error',
        code: 'missing-citations',
        message: 'No source citations recorded. Provenance citation required.',
        subject: country.id,
        field: `${country.id}.metadata.citations`,
      });
    } else {
      for (const citation of citations) {
        if (!citation.domain || !citation.sourceName) {
          issues.push({
            severity: 'warning',
            code: 'incomplete-citation',
            message: `Citation "${citation.sourceName || citation.domain || '(blank)'}" is missing a domain or source name.`,
            subject: country.id,
            field: `${country.id}.metadata.citations`,
          });
        }
      }
    }

    if (!country.metadata?.lastVerifiedDate) {
      issues.push({
        severity: 'warning',
        code: 'missing-verified-date',
        message: 'No metadata.lastVerifiedDate recorded.',
        subject: country.id,
        field: `${country.id}.metadata.lastVerifiedDate`,
      });
    }

    collectNumericIssues(
      country.id,
      [
        ['geography.landAreaKm2', country.geography?.landAreaKm2],
        ['geography.coastlineKm', country.geography?.coastlineKm],
        ['demographics.population', country.demographics?.population],
        ['demographics.densityPerKm2', country.demographics?.densityPerKm2],
        ['demographics.medianAge', country.demographics?.medianAge],
        ['demographics.lifeExpectancyYears', country.demographics?.lifeExpectancyYears],
        ['economy.gdpNominalUsdBillions', country.economy?.gdpNominalUsdBillions],
        ['economy.gdpPppUsdBillions', country.economy?.gdpPppUsdBillions],
        ['economy.gdpPerCapitaPppUsd', country.economy?.gdpPerCapitaPppUsd],
        ['currency.fallbackUsdRate', country.currency?.fallbackUsdRate],
        ['costOfLiving.indexRelativeToNyc', country.costOfLiving?.indexRelativeToNyc],
        ['safetyAndGovernance.safetyIndexNumbeo', country.safetyAndGovernance?.safetyIndexNumbeo],
        ['climate.averageAnnualTempCelsius', country.climate?.averageAnnualTempCelsius],
      ],
      issues
    );

    /* Coordinate bounds. Type says [lat, lng] — an inverted pair is a real and
     * easy mistake, so this is worth an explicit guard. */
    const coordinateChecks: [string, unknown][] = [
      ['geography.coordinates', country.geography?.coordinates],
      ['capital.coordinates', country.capital?.coordinates],
    ];
    for (const [field, value] of coordinateChecks) {
      if (!Array.isArray(value) || value.length !== 2) {
        issues.push({
          severity: 'error',
          code: 'malformed-coordinate',
          message: `Expected [lat, lng] pair (got ${JSON.stringify(value)}).`,
          subject: country.id,
          field: `${country.id}.${field}`,
        });
        continue;
      }
      const [lat, lng] = value as [number, number];
      if (!isFiniteNumber(lat) || lat < -90 || lat > 90) {
        issues.push({
          severity: 'error',
          code: 'coordinate-out-of-range',
          message: `Latitude ${lat} is outside [-90, 90].`,
          subject: country.id,
          field: `${country.id}.${field}[0]`,
        });
      }
      if (!isFiniteNumber(lng) || lng < -180 || lng > 180) {
        issues.push({
          severity: 'error',
          code: 'coordinate-out-of-range',
          message: `Longitude ${lng} is outside [-180, 180].`,
          subject: country.id,
          field: `${country.id}.${field}[1]`,
        });
      }
    }

    /* Plausibility floors: a negative population or a zeroed FX rate means the
     * value is a placeholder, not a measurement. */
    if (isFiniteNumber(country.demographics?.population) && country.demographics.population <= 0) {
      issues.push({
        severity: 'error',
        code: 'implausible-population',
        message: `Population must be positive (got ${country.demographics.population}).`,
        subject: country.id,
        field: `${country.id}.demographics.population`,
      });
    }
    if (isFiniteNumber(country.currency?.fallbackUsdRate) && country.currency.fallbackUsdRate <= 0) {
      issues.push({
        severity: 'error',
        code: 'implausible-fx-rate',
        message: `fallbackUsdRate must be positive (got ${country.currency.fallbackUsdRate}).`,
        subject: country.id,
        field: `${country.id}.currency.fallbackUsdRate`,
      });
    }
  }

  const errorCount = issues.filter((issue) => issue.severity === 'error').length;

  return {
    stats: computeDatasetStats(countries, regions, subregions),
    issues,
    errorCount,
    warningCount: issues.length - errorCount,
    isHealthy: errorCount === 0,
  };
}
