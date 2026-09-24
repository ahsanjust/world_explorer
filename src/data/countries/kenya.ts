import { CountryProfile } from '../../types/country';

export const KENYA: CountryProfile = {
  id: 'kenya',
  iso2: 'KE',
  iso3: 'KEN',
  unCode: '404',
  name: 'Kenya',
  officialName: 'Republic of Kenya',
  nativeNames: [
    { languageCode: 'swa', common: 'Kenya', official: 'Jamhuri ya Kenya' },
    { languageCode: 'eng', common: 'Kenya', official: 'Republic of Kenya' },
  ],
  regionId: 'africa',
  subregionId: 'east-africa',
  capital: {
    name: 'Nairobi',
    coordinates: [-1.2921, 36.8219],
  },
  majorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  flag: {
    emoji: '🇰🇪',
    svgUrl: 'https://flagcdn.com/ke.svg',
    colors: ['#000000', '#BB0000', '#006600', '#FFFFFF'],
    aspectRatio: '2:3',
  },
  tagline: 'East Africa’s economic and innovation vanguard, cradle of human origins, and host of the Great Wildebeest Migration.',
  overview: 'Bisected by the equator and the Great Rift Valley, Kenya is the economic, financial, and transport hub of East Africa. It has pioneered mobile money (M-Pesa), geothermal energy, and is home to the world’s premier wildlife conservation landscapes.',

  geography: {
    landAreaKm2: 580367,
    waterPercentage: 1.9,
    coastlineKm: 536,
    borders: [
      { iso3: 'ETH', name: 'Ethiopia', lengthKm: 867 },
      { iso3: 'SOM', name: 'Somalia', lengthKm: 684 },
      { iso3: 'SSD', name: 'South Sudan', lengthKm: 317 },
      { iso3: 'TZA', name: 'Tanzania', lengthKm: 775 },
      { iso3: 'UGA', name: 'Uganda', lengthKm: 814 },
    ],
    highestPoint: { name: 'Mount Kenya (Batian)', elevationMeters: 5199 },
    lowestPoint: { name: 'Indian Ocean', elevationMeters: 0 },
    timezones: ['Africa/Nairobi (UTC+3)'],
    coordinates: [-0.0236, 37.9062],
  },

  demographics: {
    population: 55100000,
    populationYear: 2024,
    densityPerKm2: 94.9,
    medianAge: 20.1, // Young, dynamic demographic
    urbanizationRate: 29.5,
    lifeExpectancyYears: 67.2,
    fertilityRate: 3.3,
    languages: [
      { name: 'Swahili (Kiswahili)', isOfficial: true, percentSpoken: 90 },
      { name: 'English', isOfficial: true, percentSpoken: 80 },
    ],
    ageDistribution: {
      under15Percent: 38.5,
      fifteenTo64Percent: 58.5,
      sixtyFivePlusPercent: 3.0,
    },
  },

  economy: {
    gdpNominalUsdBillions: 115.0,
    gdpPppUsdBillions: 340.0,
    gdpPerCapitaPppUsd: 6150,
    gdpPerCapitaNominalUsd: 2080,
    realGdpGrowthPercent: 5.2,
    inflationRatePercent: 4.4,
    unemploymentRatePercent: 5.6,
    publicDebtPercentOfGdp: 68.2,
    giniCoefficient: 40.8,
    mainIndustries: [
      'Agriculture & Horticulture (Cut flowers, tea, specialty Arabica coffee)',
      'Fintech & Digital Innovation ("Silicon Savannah" & M-Pesa)',
      'Geothermal & Renewable Energy Generation (Olkaria)',
      'Eco-Tourism & Wildlife Conservation',
      'Port Logistics & Regional Transport Corridor (Mombasa Gateway)',
    ],
    trade: {
      topExports: ['Black Tea', 'Fresh Cut Roses', 'Refined Petroleum', 'Coffee', 'Titanium Ores'],
      topExportPartners: [
        { country: 'Uganda', sharePercent: 12.5 },
        { country: 'United States', sharePercent: 8.8 },
        { country: 'Netherlands', sharePercent: 8.2 },
        { country: 'Pakistan', sharePercent: 7.9 },
      ],
      topImportPartners: [
        { country: 'China', sharePercent: 20.5 },
        { country: 'India', sharePercent: 11.2 },
        { country: 'United Arab Emirates', sharePercent: 9.8 },
        { country: 'Saudi Arabia', sharePercent: 5.4 },
      ],
    },
  },

  currency: {
    code: 'KES',
    name: 'Kenyan Shilling',
    symbol: 'KSh',
    fractionalUnit: 'Cent',
    isPegged: false,
    fallbackUsdRate: 129.5,
  },

  education: {
    literacyRatePercent: 82.6,
    tertiaryEnrollmentRatePercent: 12.8,
    educationExpenditurePercentGdp: 5.1,
    topUniversities: [
      {
        name: 'University of Nairobi (UoN)',
        globalRankQs: 750,
        city: 'Nairobi',
        notableFields: ['Agricultural Economics', 'Tropical Infectious Diseases', 'Development Studies'],
      },
      {
        name: 'Kenyatta University',
        globalRankQs: 900,
        city: 'Nairobi',
        notableFields: ['Education', 'Environmental Science'],
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 31.2,
    rentIndex: 8.9,
    groceriesIndex: 28.5,
    restaurantPriceIndex: 24.1,
    localPurchasingPowerIndex: 22.8,
    samplePricesUsd: {
      inexpensiveMeal: 3.5,
      midRangeMealTwoPeople: 22.0,
      monthlyOneBedroomCityCenterRent: 320.0,
      monthlyPassTransit: 28.0,
      coffeeCappuccino: 2.2,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 121,
    globalPeaceIndexScore: 2.378,
    safetyIndexNumbeo: 39.5,
    crimeIndexNumbeo: 60.5,
    homicideRatePer100k: 5.3,
    politicalStabilityScore: -0.65,
    pressFreedomIndexRank: 102,
  },

  climate: {
    koppenCode: 'Cwb',
    koppenTitle: 'Subtropical Highland & Tropical Savanna',
    summary: 'Pleasant year-round mild temperatures in the central highlands due to elevation (1,700m+ in Nairobi), with tropical coastal warmth along the Indian Ocean.',
    averageAnnualTempCelsius: 19.5,
    averageAnnualRainfallMm: 925,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 19.8, precipitationMm: 64 },
      { month: 'Feb', tempCelsius: 20.4, precipitationMm: 56 },
      { month: 'Mar', tempCelsius: 20.5, precipitationMm: 92 },
      { month: 'Apr', tempCelsius: 19.8, precipitationMm: 219 },
      { month: 'May', tempCelsius: 18.9, precipitationMm: 153 },
      { month: 'Jun', tempCelsius: 17.5, precipitationMm: 35 },
      { month: 'Jul', tempCelsius: 16.8, precipitationMm: 18 },
      { month: 'Aug', tempCelsius: 17.2, precipitationMm: 24 },
      { month: 'Sep', tempCelsius: 18.6, precipitationMm: 31 },
      { month: 'Oct', tempCelsius: 19.8, precipitationMm: 61 },
      { month: 'Nov', tempCelsius: 19.2, precipitationMm: 150 },
      { month: 'Dec', tempCelsius: 19.1, precipitationMm: 108 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 8,
    topLandmarks: [
      {
        name: 'Maasai Mara National Reserve',
        location: 'Narok County',
        category: 'Natural',
        description: 'World-renowned savanna ecosystem hosting the annual migration of over two million wildebeest, zebras, and gazelles across the Mara River.',
        imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: false,
      },
      {
        name: 'Mount Kenya National Park',
        location: 'Central Kenya',
        category: 'Natural',
        description: 'Africa’s second-highest peak with rugged glacier-clad summits and afro-alpine vegetation, recognized as a sacred dwelling place by the Kikuyu people.',
        imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
      {
        name: 'Lamu Old Town',
        location: 'Lamu Island',
        category: 'Historical',
        description: 'Oldest and best-preserved Swahili settlement in East Africa built of coral stone and mangrove timber, with narrow car-free streets.',
        imageUrl: 'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
    ],
    culinaryTraditions: [
      {
        name: 'Ugali with Sukuma Wiki & Nyama Choma',
        description: 'Dense cornmeal staple paired with braised collard greens and open-fire roasted goat or beef.',
        nationalStatus: true,
      },
      {
        name: 'Kenyan Chai',
        description: 'Rich spiced whole-milk tea brewed with loose-leaf black tea from the Kericho highlands.',
        nationalStatus: false,
      },
    ],
    culturalNormsAndEtiquette: [
      'Harambee (Pulling together): Deep-seated community tradition of collective resource mobilization for shared civic goals.',
      'Respect for elders: Greetings are respectful, often using two hands to shake an elder’s hand.',
      'Politeness: Taking time to ask about family and welfare before launching into business matters.',
    ],
    luxuryLifestyle: {
      fiveStarHotelsCount: 28,
      yachtMarinasAndAviation: ['English Point Marina Mombasa', 'Wilson Airport (Nairobi Safari Aviation Hub)'],
      primeResidentialTier: 'Emerging',
      residencyOrGoldenVisaAvailable: false,
      taxNotes: 'Standard resident income tax rates with incentives for designated Special Economic Zones.',
    },
  },

  analyticalPeers: {
    economicTwins: ['egypt', 'brazil'],
    climaticTwins: ['brazil'],
    regionalNeighbors: ['egypt'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Kenya National Bureau of Statistics (KNBS) & Central Bank of Kenya' },
      { domain: 'Heritage', sourceName: 'UNESCO World Heritage List (8 inscriptions)' },
    ],
  },
};
