import { RegionId } from '../types/spatial';

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

export const REGIONAL_BENCHMARKS: Record<RegionId, BenchmarkMetrics> = {
  asia: {
    gdpPerCapitaPppUsd: 23800,
    populationDensityKm2: 154,
    medianAge: 32.5,
    lifeExpectancyYears: 74.8,
    safetyIndex: 58.0,
    costOfLivingIndex: 48.0,
    homicideRatePer100k: 2.3,
  },
  europe: {
    gdpPerCapitaPppUsd: 46200,
    populationDensityKm2: 73,
    medianAge: 42.8,
    lifeExpectancyYears: 80.1,
    safetyIndex: 68.5,
    costOfLivingIndex: 65.0,
    homicideRatePer100k: 1.2,
  },
  americas: {
    gdpPerCapitaPppUsd: 31500,
    populationDensityKm2: 34,
    medianAge: 33.2,
    lifeExpectancyYears: 76.5,
    safetyIndex: 46.0,
    costOfLivingIndex: 52.0,
    homicideRatePer100k: 14.8,
  },
  africa: {
    gdpPerCapitaPppUsd: 5900,
    populationDensityKm2: 48,
    medianAge: 19.8,
    lifeExpectancyYears: 64.2,
    safetyIndex: 44.0,
    costOfLivingIndex: 32.0,
    homicideRatePer100k: 12.5,
  },
  oceania: {
    gdpPerCapitaPppUsd: 48500,
    populationDensityKm2: 5,
    medianAge: 38.0,
    lifeExpectancyYears: 82.2,
    safetyIndex: 67.0,
    costOfLivingIndex: 72.0,
    homicideRatePer100k: 1.0,
  },
  polar: {
    gdpPerCapitaPppUsd: 0,
    populationDensityKm2: 0,
    medianAge: 0,
    lifeExpectancyYears: 0,
    safetyIndex: 100,
    costOfLivingIndex: 100,
    homicideRatePer100k: 0,
  },
};
