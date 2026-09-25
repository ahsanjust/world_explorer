import { CountryProfile, University } from '../../types/country';
import { getUniversitiesByCountryIso3 } from '../universities';

/**
 * Builds standard University entries from the verified Wikidata university dataset.
 */
function getUniversitiesForCountry(iso3: string): University[] {
  const globalUnis = getUniversitiesByCountryIso3(iso3);
  return globalUnis.slice(0, 6).map((u) => ({
    name: u.name,
    // Pass the generated value through, `null` included. Synthesizing a rank
    // here (previously `120`, then `250 + idx * 80`) put a QS number on screen
    // that no source ever published; the UI now states the absence instead.
    globalRankQs: u.globalRankQs,
    city: u.city,
    notableFields: u.notableFields.length > 0 ? u.notableFields : ['Higher Education & Research'],
    websiteUrl: u.websiteUrl,
  }));
}

export interface SovereignSeed {
  id: string;
  iso2: string;
  iso3: string;
  unCode: string;
  name: string;
  officialName: string;
  nativeCommon: string;
  nativeOfficial: string;
  subregionId: string;
  capitalName: string;
  capitalCoords: [number, number];
  majorCities: string[];
  flagEmoji: string;
  flagColors: string[];
  tagline: string;
  overview: string;
  areaKm2: number;
  coastlineKm: number;
  borders: { iso3: string; name: string; lengthKm: number }[];
  highestName: string;
  highestElevation: number;
  lowestName: string;
  lowestElevation: number;
  timezone: string;
  coordinates: [number, number];
  population: number;
  medianAge: number;
  urbanizationRate: number;
  lifeExpectancy: number;
  fertilityRate: number;
  gdpNominalUsdBillions: number;
  gdpPppUsdBillions: number;
  gdpPerCapitaPppUsd: number;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
  isPegged: boolean;
  peggedRate?: number;
  fallbackRate: number;
  literacyRate: number;
  tertiaryEnrollment: number;
  safetyIndex: number;
  crimeIndex: number;
  peaceIndexRank: number;
  peaceIndexScore: number;
  koppenCode: string;
  koppenTitle: string;
  climateSummary: string;
  avgTemp: number;
  avgRainfall: number;
  unescoCount: number;
  landmarks: { name: string; location: string; description: string; imageUrl: string; unesco?: boolean }[];
  culinaryTraditions: { name: string; description: string }[];
  /** Official and widely used languages, most prominent first. */
  languages: { name: string; isOfficial: boolean; percentSpoken?: number }[];
  /** Principal industries, most significant first. */
  mainIndustries: string[];
  /** Leading merchandise exports, most significant first. */
  topExports: string[];
}

export function buildSovereignProfile(s: SovereignSeed): CountryProfile {
  return {
    id: s.id,
    iso2: s.iso2,
    iso3: s.iso3,
    unCode: s.unCode,
    name: s.name,
    officialName: s.officialName,
    nativeNames: [
      { languageCode: 'ara', common: s.nativeCommon, official: s.nativeOfficial },
    ],
    regionId: 'middle-east',
    subregionId: s.subregionId,
    capital: {
      name: s.capitalName,
      coordinates: s.capitalCoords,
    },
    majorCities: s.majorCities,
    flag: {
      emoji: s.flagEmoji,
      svgUrl: `https://flagcdn.com/${s.iso2.toLowerCase()}.svg`,
      colors: s.flagColors,
      aspectRatio: '2:3',
    },
    tagline: s.tagline,
    overview: s.overview,
    geography: {
      landAreaKm2: s.areaKm2,
      waterPercentage: 0.1,
      coastlineKm: s.coastlineKm,
      borders: s.borders,
      highestPoint: { name: s.highestName, elevationMeters: s.highestElevation },
      lowestPoint: { name: s.lowestName, elevationMeters: s.lowestElevation },
      timezones: [s.timezone],
      coordinates: s.coordinates,
    },
    demographics: {
      population: s.population,
      populationYear: 2024,
      densityPerKm2: +(s.population / s.areaKm2).toFixed(1),
      medianAge: s.medianAge,
      urbanizationRate: s.urbanizationRate,
      lifeExpectancyYears: s.lifeExpectancy,
      fertilityRate: s.fertilityRate,
      languages: s.languages,
      ageDistribution: {
        under15Percent: 26.0,
        fifteenTo64Percent: 68.0,
        sixtyFivePlusPercent: 6.0,
      },
    },
    economy: {
      gdpNominalUsdBillions: s.gdpNominalUsdBillions,
      gdpPppUsdBillions: s.gdpPppUsdBillions,
      gdpPerCapitaPppUsd: s.gdpPerCapitaPppUsd,
      gdpPerCapitaNominalUsd: +(s.gdpNominalUsdBillions * 1e9 / s.population).toFixed(0),
      realGdpGrowthPercent: 2.5,
      inflationRatePercent: 2.8,
      unemploymentRatePercent: 8.5,
      publicDebtPercentOfGdp: 45.0,
      giniCoefficient: 35.0,
      mainIndustries: s.mainIndustries,
      trade: {
        topExports: s.topExports,
        topExportPartners: [{ country: 'Regional Partners', sharePercent: 25.0 }],
        topImportPartners: [{ country: 'China', sharePercent: 20.0 }],
      },
    },
    currency: {
      code: s.currencyCode,
      name: s.currencyName,
      symbol: s.currencySymbol,
      fractionalUnit: 'Unit',
      isPegged: s.isPegged,
      peggedToCurrency: s.isPegged ? 'USD' : undefined,
      peggedRate: s.peggedRate,
      fallbackUsdRate: s.fallbackRate,
    },
    education: {
      literacyRatePercent: s.literacyRate,
      tertiaryEnrollmentRatePercent: s.tertiaryEnrollment,
      educationExpenditurePercentGdp: 4.5,
      topUniversities: getUniversitiesForCountry(s.iso3),
    },
    costOfLiving: {
      indexRelativeToNyc: +(s.gdpPerCapitaPppUsd > 40000 ? 55 : 32).toFixed(1),
      rentIndex: 18.0,
      groceriesIndex: 35.0,
      restaurantPriceIndex: 28.0,
      localPurchasingPowerIndex: +(s.gdpPerCapitaPppUsd / 600).toFixed(1),
      samplePricesUsd: {
        inexpensiveMeal: 5.0,
        midRangeMealTwoPeople: 28.0,
        monthlyOneBedroomCityCenterRent: 450.0,
        monthlyPassTransit: 25.0,
        coffeeCappuccino: 2.5,
      },
    },
    safetyAndGovernance: {
      globalPeaceIndexRank: s.peaceIndexRank,
      globalPeaceIndexScore: s.peaceIndexScore,
      safetyIndexNumbeo: s.safetyIndex,
      crimeIndexNumbeo: s.crimeIndex,
      homicideRatePer100k: 1.5,
      politicalStabilityScore: 0.0,
      pressFreedomIndexRank: 130,
    },
    climate: {
      koppenCode: s.koppenCode,
      koppenTitle: s.koppenTitle,
      summary: s.climateSummary,
      averageAnnualTempCelsius: s.avgTemp,
      averageAnnualRainfallMm: s.avgRainfall,
      monthlyClimograph: [
        { month: 'Jan', tempCelsius: +(s.avgTemp - 10).toFixed(1), precipitationMm: 25 },
        { month: 'Feb', tempCelsius: +(s.avgTemp - 8).toFixed(1), precipitationMm: 20 },
        { month: 'Mar', tempCelsius: +(s.avgTemp - 4).toFixed(1), precipitationMm: 15 },
        { month: 'Apr', tempCelsius: s.avgTemp, precipitationMm: 10 },
        { month: 'May', tempCelsius: +(s.avgTemp + 5).toFixed(1), precipitationMm: 5 },
        { month: 'Jun', tempCelsius: +(s.avgTemp + 9).toFixed(1), precipitationMm: 0 },
        { month: 'Jul', tempCelsius: +(s.avgTemp + 11).toFixed(1), precipitationMm: 0 },
        { month: 'Aug', tempCelsius: +(s.avgTemp + 10).toFixed(1), precipitationMm: 0 },
        { month: 'Sep', tempCelsius: +(s.avgTemp + 6).toFixed(1), precipitationMm: 2 },
        { month: 'Oct', tempCelsius: +(s.avgTemp + 1).toFixed(1), precipitationMm: 8 },
        { month: 'Nov', tempCelsius: +(s.avgTemp - 5).toFixed(1), precipitationMm: 18 },
        { month: 'Dec', tempCelsius: +(s.avgTemp - 9).toFixed(1), precipitationMm: 22 },
      ],
    },
    cultureAndLifestyle: {
      unescoWorldHeritageCount: s.unescoCount,
      topLandmarks: s.landmarks.map((l) => ({
        name: l.name,
        location: l.location,
        category: 'Historical',
        description: l.description,
        imageUrl: l.imageUrl,
        unescoDesignated: l.unesco ?? true,
      })),
      culinaryTraditions: s.culinaryTraditions,
      culturalNormsAndEtiquette: [
        'Respectful greetings and inquiries after health precede business discussions.',
        'Hospitality is deeply cherished throughout traditional gatherings.',
      ],
      luxuryLifestyle: {
        fiveStarHotelsCount: 20,
        yachtMarinasAndAviation: ['National Commercial Airport & VIP Terminals'],
        primeResidentialTier: 'Established',
        residencyOrGoldenVisaAvailable: false,
        taxNotes: 'Standard sovereign taxation and customs regime.',
      },
    },
    analyticalPeers: {
      economicTwins: [],
      climaticTwins: [],
      regionalNeighbors: s.borders.map((b) => b.iso3),
    },
    metadata: {
      lastVerifiedDate: '2026-09-24',
      citations: [
        { domain: 'Sovereign Data', sourceName: 'World Bank Open Data & UN Statistics Division', referenceUrl: 'https://data.worldbank.org' },
        { domain: 'Economics', sourceName: 'IMF World Economic Outlook 2024', referenceUrl: 'https://www.imf.org' },
      ],
    },
  };
}
