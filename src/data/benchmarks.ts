import { RegionId } from '../types/spatial';
import { ALL_COUNTRY_PROFILES } from './index';

export interface BenchmarkMetrics {
  gdpPerCapitaPppUsd: number;
  populationDensityKm2: number;
  medianAge: number;
  lifeExpectancyYears: number;
  safetyIndex: number; // 0-100 (higher = safer)
  costOfLivingIndex: number; // NYC = 100
  homicideRatePer100k: number;
}

export const GLOBAL_BENCHMARK: BenchmarkMetrics = {
  gdpPerCapitaPppUsd: 21500,
  populationDensityKm2: 61,
  medianAge: 31.0,
  lifeExpectancyYears: 73.4,
  safetyIndex: 52.0,
  costOfLivingIndex: 45.0,
  homicideRatePer100k: 5.4,
};

/**
 * Regional benchmark — Middle East & West Asia sphere.
 *
 * Derivation (2026-09-25 pivot): with the strict ME scope, a static "regional
 * average" sourced from outside the app would either need a citation the data
 * layer cannot verify or would risk fabrication. The benchmark is therefore
 * COMPUTED at module load as the arithmetic mean of the authored ME dossiers.
 * It transparently grows as new ME profiles are added, and every dossier is by
 * construction measured against its own cohort.
 */
function computeRegionalBenchmark(): BenchmarkMetrics {
  const profiles = ALL_COUNTRY_PROFILES;
  const mean = (pick: (c: typeof profiles[number]) => number): number =>
    profiles.reduce((sum, c) => sum + pick(c), 0) / profiles.length;

  return {
    gdpPerCapitaPppUsd: mean((c) => c.economy.gdpPerCapitaPppUsd),
    populationDensityKm2: mean((c) => c.demographics.densityPerKm2),
    medianAge: mean((c) => c.demographics.medianAge),
    lifeExpectancyYears: mean((c) => c.demographics.lifeExpectancyYears),
    safetyIndex: mean((c) => c.safetyAndGovernance.safetyIndexNumbeo),
    costOfLivingIndex: mean((c) => c.costOfLiving.indexRelativeToNyc),
    homicideRatePer100k: mean((c) => c.safetyAndGovernance.homicideRatePer100k),
  };
}

export const REGIONAL_BENCHMARKS: Record<RegionId, BenchmarkMetrics> = {
  'middle-east': computeRegionalBenchmark(),
};
