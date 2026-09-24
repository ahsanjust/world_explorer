import { CountryProfile } from '../../types/country';

export const CANADA: CountryProfile = {
  id: 'canada',
  iso2: 'CA',
  iso3: 'CAN',
  unCode: '124',
  name: 'Canada',
  officialName: 'Canada',
  nativeNames: [
    { languageCode: 'eng', common: 'Canada', official: 'Canada' },
    { languageCode: 'fra', common: 'Canada', official: 'Canada' },
  ],
  regionId: 'americas',
  subregionId: 'north-america',
  capital: {
    name: 'Ottawa',
    coordinates: [45.4215, -75.6972],
  },
  majorCities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa', 'Edmonton'],
  flag: {
    emoji: '🇨🇦',
    svgUrl: 'https://flagcdn.com/ca.svg',
    colors: ['#D80621', '#FFFFFF'], // Red and White
    aspectRatio: '1:2',
  },
  tagline: 'Expansive boreal and maritime confederation, resource-rich federation with world-class cities and high human development.',
  overview: 'Spanning from the Atlantic to the Pacific and northward into the Arctic Ocean, Canada is the world’s second-largest country by total area. Renowned for its pristine wilderness, stable democratic institutions, high standard of living, and thriving innovation in aerospace, clean energy, and artificial intelligence.',

  geography: {
    landAreaKm2: 9984670,
    waterPercentage: 8.92,
    coastlineKm: 202080,
    borders: [
      { iso3: 'USA', name: 'United States', lengthKm: 8893 },
    ],
    highestPoint: { name: 'Mount Logan', elevationMeters: 5959 },
    lowestPoint: { name: 'North Atlantic Ocean', elevationMeters: 0 },
    timezones: ['UTC-3.5', 'UTC-4', 'UTC-5', 'UTC-6', 'UTC-7', 'UTC-8'],
    coordinates: [56.1304, -106.3468],
  },

  demographics: {
    population: 40097762,
    populationYear: 2024,
    densityPerKm2: 4.2,
    medianAge: 41.1,
    urbanizationRate: 81.8,
    lifeExpectancyYears: 82.6,
    fertilityRate: 1.33,
    languages: [
      { name: 'English', isOfficial: true, percentSpoken: 75.5 },
      { name: 'French', isOfficial: true, percentSpoken: 21.4 },
    ],
    ageDistribution: {
      under15Percent: 15.6,
      fifteenTo64Percent: 65.3,
      sixtyFivePlusPercent: 19.1,
    },
  },

  economy: {
    gdpNominalUsdBillions: 2140.0,
    gdpPppUsdBillions: 2380.0,
    gdpPerCapitaPppUsd: 59800,
    gdpPerCapitaNominalUsd: 53800,
    realGdpGrowthPercent: 1.5,
    inflationRatePercent: 2.4,
    unemploymentRatePercent: 6.4,
    publicDebtPercentOfGdp: 104.7,
    giniCoefficient: 31.7,
    sovereignWealthFundBillionsUsd: 650.0, // Canada Pension Plan Investment Board (CPPIB)
    mainIndustries: [
      'Energy & Petroleum Extraction',
      'Banking & Financial Services',
      'Mining, Minerals & Timber',
      'Aerospace & Automotive Engineering',
      'Artificial Intelligence & Clean Technology',
    ],
    trade: {
      topExports: ['Crude Petroleum', 'Motor Vehicles & Parts', 'Gold', 'Petroleum Gas', 'Lumber & Softwood'],
      topExportPartners: [
        { country: 'United States', sharePercent: 76.5 },
        { country: 'China', sharePercent: 4.1 },
        { country: 'United Kingdom', sharePercent: 3.2 },
        { country: 'Japan', sharePercent: 2.1 },
      ],
      topImportPartners: [
        { country: 'United States', sharePercent: 49.2 },
        { country: 'China', sharePercent: 12.3 },
        { country: 'Mexico', sharePercent: 5.6 },
        { country: 'Germany', sharePercent: 3.1 },
      ],
    },
  },

  currency: {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'CA$',
    fractionalUnit: 'Cent (100 cents = 1 dollar)',
    isPegged: false,
    fallbackUsdRate: 1.36,
  },

  education: {
    literacyRatePercent: 99.0,
    tertiaryEnrollmentRatePercent: 74.2,
    educationExpenditurePercentGdp: 5.2,
    topUniversities: [
      {
        name: 'University of Toronto',
        globalRankQs: 21,
        city: 'Toronto',
        notableFields: ['Artificial Intelligence', 'Medicine', 'Computer Science', 'Economics'],
        websiteUrl: 'https://www.utoronto.ca',
      },
      {
        name: 'McGill University',
        globalRankQs: 30,
        city: 'Montreal',
        notableFields: ['Neuroscience', 'Law', 'Engineering', 'Humanities'],
        websiteUrl: 'https://www.mcgill.ca',
      },
      {
        name: 'University of British Columbia (UBC)',
        globalRankQs: 34,
        city: 'Vancouver',
        notableFields: ['Forestry & Environmental Sciences', 'Business', 'Oceanography'],
        websiteUrl: 'https://www.ubc.ca',
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 72.4,
    rentIndex: 44.5,
    groceriesIndex: 74.2,
    restaurantPriceIndex: 68.9,
    localPurchasingPowerIndex: 91.2,
    samplePricesUsd: {
      inexpensiveMeal: 17.5,
      midRangeMealTwoPeople: 72.0,
      monthlyOneBedroomCityCenterRent: 1550.0,
      monthlyPassTransit: 85.0,
      coffeeCappuccino: 3.9,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 11,
    globalPeaceIndexScore: 1.382,
    safetyIndexNumbeo: 60.8,
    crimeIndexNumbeo: 39.2,
    homicideRatePer100k: 2.1,
    politicalStabilityScore: 1.05,
    pressFreedomIndexRank: 15,
  },

  climate: {
    koppenCode: 'Dfb',
    koppenTitle: 'Warm-summer Humid Continental / Subarctic',
    summary: 'Warm temperate summers across the heavily populated southern belt contrasting with cold subarctic winters and arctic tundra throughout northern regions.',
    averageAnnualTempCelsius: 3.2,
    averageAnnualRainfallMm: 537,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: -9.5, precipitationMm: 62 },
      { month: 'Feb', tempCelsius: -8.0, precipitationMm: 53 },
      { month: 'Mar', tempCelsius: -2.1, precipitationMm: 60 },
      { month: 'Apr', tempCelsius: 6.2, precipitationMm: 68 },
      { month: 'May', tempCelsius: 13.5, precipitationMm: 78 },
      { month: 'Jun', tempCelsius: 18.8, precipitationMm: 85 },
      { month: 'Jul', tempCelsius: 21.6, precipitationMm: 89 },
      { month: 'Aug', tempCelsius: 20.5, precipitationMm: 83 },
      { month: 'Sep', tempCelsius: 15.6, precipitationMm: 81 },
      { month: 'Oct', tempCelsius: 8.8, precipitationMm: 74 },
      { month: 'Nov', tempCelsius: 2.0, precipitationMm: 75 },
      { month: 'Dec', tempCelsius: -5.8, precipitationMm: 71 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 22,
    topLandmarks: [
      {
        name: 'Banff & Jasper National Parks',
        location: 'Alberta / Rocky Mountains',
        category: 'Natural',
        description: 'Spectacular turquoise glacier lakes including Lake Louise and dramatic alpine peaks along the Icefields Parkway.',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
        unescoDesignated: true,
      },
      {
        name: 'Historic District of Old Québec',
        location: 'Quebec City, Quebec',
        category: 'Historical',
        description: 'The only North American fortified city north of Mexico, preserving 17th-century European stone ramparts and cobblestone plazas.',
        imageUrl: 'https://images.unsplash.com/photo-1517935703635-2717090c2210?w=800',
        unescoDesignated: true,
      },
      {
        name: 'CN Tower & Toronto Waterfront',
        location: 'Toronto, Ontario',
        category: 'Architectural',
        description: 'Iconic 553-meter telecommunications tower dominating the skyline of Canada’s largest commercial metropolis.',
        imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800',
        unescoDesignated: false,
      },
    ],
    culinaryTraditions: [
      { name: 'Poutine', description: 'Crisp hand-cut fries smothered in hot savory beef gravy and fresh Quebec cheese curds.', nationalStatus: true },
      { name: 'Pure Maple Syrup & Taffy', description: 'Artisanal boiled sap poured fresh over winter snow, produced in Eastern Canadian sugar shacks.', nationalStatus: true },
      { name: 'Tourtière', description: 'Spiced minced pork and veal savory pie seasoned with cloves and cinnamon, a French Canadian holiday staple.' },
    ],
    culturalNormsAndEtiquette: [
      'Official federal bilingualism (English and French) celebrated across government and commerce.',
      'Cultural emphasis on politeness, orderly queuing, civic modesty, and multicultural pluralism.',
      'Deep national commitment to Truth and Reconciliation honoring Indigenous First Nations, Inuit, and Métis peoples.',
      'Passionate engagement with outdoor winter recreation, ice hockey, and wilderness canoeing.',
    ],
    luxuryLifestyle: {
      michelinStarredVenuesCount: 17,
      fiveStarHotelsCount: 65,
      yachtMarinasAndAviation: ['Vancouver Coal Harbour Marina', 'Royal Canadian Yacht Club Toronto', 'Victoria Harbour Marina'],
      primeResidentialTier: 'High-Prime',
      residencyOrGoldenVisaAvailable: true,
      taxNotes: 'Progressive federal and provincial personal taxation with tax-exempt TFSA and RRSP registered savings accounts.',
    },
  },

  analyticalPeers: {
    economicTwins: ['australia', 'norway', 'united-states'],
    climaticTwins: ['norway'],
    regionalNeighbors: ['united-states'],
  },

  metadata: {
    lastVerifiedDate: '2025-01-15',
    citations: [
      { domain: 'statcan.gc.ca', sourceName: 'Statistics Canada' },
      { domain: 'worldbank.org', sourceName: 'World Bank Open Data' },
      { domain: 'imf.org', sourceName: 'IMF World Economic Outlook 2024' },
    ],
  },
};
