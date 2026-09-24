import { CountryProfile } from '../../types/country';

export const UNITED_STATES: CountryProfile = {
  id: 'united-states',
  iso2: 'US',
  iso3: 'USA',
  unCode: '840',
  name: 'United States',
  officialName: 'United States of America',
  nativeNames: [
    { languageCode: 'eng', common: 'United States', official: 'United States of America' },
  ],
  regionId: 'americas',
  subregionId: 'north-america',
  capital: {
    name: 'Washington, D.C.',
    coordinates: [38.9072, -77.0369],
  },
  majorCities: ['New York City', 'Los Angeles', 'Chicago', 'Houston', 'San Francisco', 'Miami', 'Seattle'],
  flag: {
    emoji: '🇺🇸',
    svgUrl: 'https://flagcdn.com/us.svg',
    colors: ['#B22234', '#FFFFFF', '#3C3B6E'],
    aspectRatio: '10:19',
  },
  tagline: 'Continental constitutional republic leading the world in artificial intelligence, capital markets, and academic discovery.',
  overview: 'Spanning across fifty states between the Atlantic and Pacific oceans plus Alaska and Hawaii, the United States is the world’s largest nominal economic superpower, driving global technology, scientific research, entertainment, and capital allocation.',

  geography: {
    landAreaKm2: 9833517,
    waterPercentage: 6.97,
    coastlineKm: 19924,
    borders: [
      { iso3: 'CAN', name: 'Canada', lengthKm: 8891 },
      { iso3: 'MEX', name: 'Mexico', lengthKm: 3145 },
    ],
    highestPoint: { name: 'Denali (Mount McKinley)', elevationMeters: 6190 },
    lowestPoint: { name: 'Badwater Basin, Death Valley', elevationMeters: -86 },
    timezones: ['UTC-5 (EST) to UTC-10 (HST)'],
    coordinates: [37.0902, -95.7129],
  },

  demographics: {
    population: 341000000,
    populationYear: 2024,
    densityPerKm2: 37.1,
    medianAge: 38.9,
    urbanizationRate: 83.3,
    lifeExpectancyYears: 77.5,
    fertilityRate: 1.62,
    languages: [
      { name: 'English', isOfficial: false, percentSpoken: 78.5 }, // No federal official language
      { name: 'Spanish', isOfficial: false, percentSpoken: 13.5 },
    ],
    ageDistribution: {
      under15Percent: 17.8,
      fifteenTo64Percent: 64.9,
      sixtyFivePlusPercent: 17.3,
    },
  },

  economy: {
    gdpNominalUsdBillions: 28780.0, // World's largest nominal GDP
    gdpPppUsdBillions: 28780.0,
    gdpPerCapitaPppUsd: 84400,
    gdpPerCapitaNominalUsd: 84400,
    realGdpGrowthPercent: 2.7,
    inflationRatePercent: 2.9,
    unemploymentRatePercent: 4.1,
    publicDebtPercentOfGdp: 123.0,
    giniCoefficient: 41.5,
    mainIndustries: [
      'Technology & AI (Apple, Microsoft, Alphabet, Nvidia)',
      'Global Capital Markets & Banking (Wall Street)',
      'Biotechnology, Pharmaceuticals & Healthcare',
      'Aerospace, Defense & Space Exploration (Boeing, SpaceX)',
      'Energy & Shale Petroleum Production',
    ],
    trade: {
      topExports: ['Refined Petroleum', 'Crude Petroleum', 'Integrated Circuits', 'Aircraft & Spacecraft', 'Medical Devices'],
      topExportPartners: [
        { country: 'Canada', sharePercent: 17.5 },
        { country: 'Mexico', sharePercent: 16.0 },
        { country: 'China', sharePercent: 7.5 },
        { country: 'Japan', sharePercent: 4.5 },
      ],
      topImportPartners: [
        { country: 'Mexico', sharePercent: 15.4 },
        { country: 'China', sharePercent: 13.9 },
        { country: 'Canada', sharePercent: 13.7 },
        { country: 'Germany', sharePercent: 5.1 },
      ],
    },
  },

  currency: {
    code: 'USD',
    name: 'United States Dollar',
    symbol: '$',
    fractionalUnit: 'Cent (100 cents = 1 dollar)',
    isPegged: false, // World principal reserve currency
    fallbackUsdRate: 1.0,
  },

  education: {
    literacyRatePercent: 99.0,
    tertiaryEnrollmentRatePercent: 88.0,
    educationExpenditurePercentGdp: 6.1,
    topUniversities: [
      {
        name: 'Massachusetts Institute of Technology (MIT)',
        globalRankQs: 1, // Ranked #1 in the world
        city: 'Cambridge, Massachusetts',
        notableFields: ['Artificial Intelligence', 'Physics', 'Quantum Computing', 'Aeronautics'],
      },
      {
        name: 'Harvard University',
        globalRankQs: 4,
        city: 'Cambridge, Massachusetts',
        notableFields: ['Law', 'Medicine', 'Economics', 'Government'],
      },
      {
        name: 'Stanford University',
        globalRankQs: 6,
        city: 'Stanford, California',
        notableFields: ['Computer Science', 'Venture Capital', 'Electrical Engineering'],
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 100.0, // Standard baseline (NYC = 100)
    rentIndex: 100.0,
    groceriesIndex: 100.0,
    restaurantPriceIndex: 100.0,
    localPurchasingPowerIndex: 100.0,
    samplePricesUsd: {
      inexpensiveMeal: 22.0,
      midRangeMealTwoPeople: 100.0,
      monthlyOneBedroomCityCenterRent: 3800.0,
      monthlyPassTransit: 132.0,
      coffeeCappuccino: 5.4,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 132,
    globalPeaceIndexScore: 2.448,
    safetyIndexNumbeo: 50.8,
    crimeIndexNumbeo: 49.2,
    homicideRatePer100k: 5.5,
    politicalStabilityScore: 0.12,
    pressFreedomIndexRank: 55,
  },

  climate: {
    koppenCode: 'Cfa',
    koppenTitle: 'Continental, Oceanic & Mediterranean',
    summary: 'Encompasses almost every major climate zone on Earth: Arctic tundra in Alaska, humid subtropical in the Southeast, Mediterranean in California, and desert in the Southwest.',
    averageAnnualTempCelsius: 12.8,
    averageAnnualRainfallMm: 760,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 0.5, precipitationMm: 68 },
      { month: 'Feb', tempCelsius: 2.1, precipitationMm: 62 },
      { month: 'Mar', tempCelsius: 6.8, precipitationMm: 75 },
      { month: 'Apr', tempCelsius: 12.4, precipitationMm: 78 },
      { month: 'May', tempCelsius: 17.8, precipitationMm: 85 },
      { month: 'Jun', tempCelsius: 22.9, precipitationMm: 88 },
      { month: 'Jul', tempCelsius: 25.4, precipitationMm: 92 },
      { month: 'Aug', tempCelsius: 24.6, precipitationMm: 86 },
      { month: 'Sep', tempCelsius: 20.3, precipitationMm: 79 },
      { month: 'Oct', tempCelsius: 13.8, precipitationMm: 72 },
      { month: 'Nov', tempCelsius: 7.9, precipitationMm: 74 },
      { month: 'Dec', tempCelsius: 2.4, precipitationMm: 71 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 26,
    topLandmarks: [
      {
        name: 'Grand Canyon National Park',
        location: 'Arizona',
        category: 'Natural',
        description: 'Vast gorge carved by the Colorado River revealing nearly two billion years of Earth’s geological history across red rock canyon walls.',
        imageUrl: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
      {
        name: 'Statue of Liberty & Ellis Island',
        location: 'New York Harbor',
        category: 'Historical',
        description: 'Universal symbol of political freedom and beacon of hope for over 12 million immigrants arriving in the United States.',
        imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
    ],
    culinaryTraditions: [
      {
        name: 'American Barbecue (BBQ)',
        description: 'Regional slow-smoked meat traditions ranging from Texas brisket and Carolina whole hog to Kansas City burnt ends.',
        nationalStatus: false,
      },
      {
        name: 'Clam Chowder',
        description: 'Creamy New England or brothy Manhattan soup simmered with fresh quahog clams, potatoes, and salted pork.',
        nationalStatus: false,
      },
    ],
    culturalNormsAndEtiquette: [
      'Tipping etiquette: Gratuity of 18–22% is standard in sit-down dining establishments and personal services.',
      'Personal space: Americans typically maintain an arm’s length of personal conversational space.',
      'Optimism and informality: Communication is direct, friendly, and often first-name oriented.',
    ],
    luxuryLifestyle: {
      michelinStarredVenuesCount: 228,
      fiveStarHotelsCount: 240,
      yachtMarinasAndAviation: ['Biscayne Bay Marinas Miami', 'Newport Harbor', 'Teterboro Private Jet Airport NJ'],
      primeResidentialTier: 'Ultra-Prime',
      residencyOrGoldenVisaAvailable: true, // EB-5 Immigrant Investor Visa
      taxNotes: 'Worldwide taxation on citizens and permanent residents regardless of residency.',
    },
  },

  analyticalPeers: {
    economicTwins: ['japan', 'germany'],
    climaticTwins: ['brazil', 'australia'],
    regionalNeighbors: ['brazil'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'U.S. Bureau of Economic Analysis (BEA) & IMF WEO 2024' },
      { domain: 'Universities', sourceName: 'QS World University Rankings 2024 (MIT #1, Harvard #4, Stanford #6)' },
    ],
  },
};
