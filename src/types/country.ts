import { RegionId } from './spatial';
import { CurrencySpec } from './currency';

export interface University {
  name: string;
  globalRankQs: number;
  city: string;
  notableFields: string[];
}

export interface Landmark {
  name: string;
  location: string;
  category: 'Natural' | 'Historical' | 'Architectural' | 'Cultural';
  description: string;
  imageUrl: string;
  unescoDesignated?: boolean;
}

export interface ClimographPoint {
  month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
  tempCelsius: number;
  precipitationMm: number;
}

export interface CountryProfile {
  id: string; // "qatar", "japan", "switzerland"
  iso2: string; // "QA"
  iso3: string; // "QAT"
  unCode: string;
  name: string;
  officialName: string;
  nativeNames: { languageCode: string; common: string; official: string }[];
  regionId: RegionId;
  subregionId: string;
  capital: {
    name: string;
    coordinates: [number, number]; // [lat, lng]
  };
  majorCities: string[];
  flag: {
    emoji: string;
    svgUrl: string;
    colors: string[];
    aspectRatio: string;
  };
  tagline: string;
  overview: string;

  geography: {
    landAreaKm2: number;
    waterPercentage: number;
    coastlineKm: number;
    borders: { iso3: string; name: string; lengthKm: number }[];
    highestPoint: { name: string; elevationMeters: number };
    lowestPoint: { name: string; elevationMeters: number };
    timezones: string[];
    coordinates: [number, number]; // [lat, lng]
  };

  demographics: {
    population: number;
    populationYear: number;
    densityPerKm2: number;
    medianAge: number;
    urbanizationRate: number; // %
    lifeExpectancyYears: number;
    fertilityRate: number;
    languages: { name: string; isOfficial: boolean; percentSpoken?: number }[];
    ageDistribution: {
      under15Percent: number;
      fifteenTo64Percent: number;
      sixtyFivePlusPercent: number;
    };
  };

  economy: {
    gdpNominalUsdBillions: number;
    gdpPppUsdBillions: number;
    gdpPerCapitaPppUsd: number;
    gdpPerCapitaNominalUsd: number;
    realGdpGrowthPercent: number;
    inflationRatePercent: number;
    unemploymentRatePercent: number;
    publicDebtPercentOfGdp: number;
    giniCoefficient: number; // 0 to 100
    sovereignWealthFundBillionsUsd?: number;
    mainIndustries: string[];
    trade: {
      topExports: string[];
      topExportPartners: { country: string; sharePercent: number }[];
      topImportPartners: { country: string; sharePercent: number }[];
    };
  };

  currency: CurrencySpec;

  education: {
    literacyRatePercent: number;
    tertiaryEnrollmentRatePercent: number;
    educationExpenditurePercentGdp: number;
    topUniversities: University[];
  };

  costOfLiving: {
    indexRelativeToNyc: number; // NYC = 100
    rentIndex: number;
    groceriesIndex: number;
    restaurantPriceIndex: number;
    localPurchasingPowerIndex: number;
    samplePricesUsd: {
      inexpensiveMeal: number;
      midRangeMealTwoPeople: number;
      monthlyOneBedroomCityCenterRent: number;
      monthlyPassTransit: number;
      coffeeCappuccino: number;
    };
  };

  safetyAndGovernance: {
    globalPeaceIndexRank: number;
    globalPeaceIndexScore: number; // 1.0 (most peaceful) to 5.0
    safetyIndexNumbeo: number; // 0 to 100 (higher = safer)
    crimeIndexNumbeo: number; // 0 to 100 (lower = safer)
    homicideRatePer100k: number;
    politicalStabilityScore: number; // -2.5 to +2.5
    pressFreedomIndexRank: number;
  };

  climate: {
    koppenCode: string; // "BWh", "Cfb", etc.
    koppenTitle: string;
    summary: string;
    averageAnnualTempCelsius: number;
    averageAnnualRainfallMm: number;
    monthlyClimograph: ClimographPoint[];
  };

  cultureAndLifestyle: {
    unescoWorldHeritageCount: number;
    topLandmarks: Landmark[];
    culinaryTraditions: { name: string; description: string; nationalStatus?: boolean }[];
    culturalNormsAndEtiquette: string[];
    luxuryLifestyle: {
      michelinStarredVenuesCount?: number;
      fiveStarHotelsCount: number;
      yachtMarinasAndAviation: string[];
      primeResidentialTier: 'Ultra-Prime' | 'High-Prime' | 'Established' | 'Emerging';
      residencyOrGoldenVisaAvailable: boolean;
      taxNotes: string;
    };
  };

  analyticalPeers: {
    economicTwins: string[]; // country IDs
    climaticTwins: string[];
    regionalNeighbors: string[];
  };

  metadata: {
    lastVerifiedDate: string;
    citations: { domain: string; sourceName: string; referenceUrl?: string }[];
  };
}

export interface CountrySummary {
  id: string;
  iso2: string;
  iso3: string;
  name: string;
  regionId: RegionId;
  subregionId: string;
  capital: string;
  flagEmoji: string;
  population: number;
  gdpPerCapitaPppUsd: number;
  safetyIndex: number;
  costOfLivingIndex: number;
  climateSummary: string;
  coordinates: [number, number];
}
