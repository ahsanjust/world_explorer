import { CountryProfile } from '../../types/country';

export const NORWAY: CountryProfile = {
  id: 'norway',
  iso2: 'NO',
  iso3: 'NOR',
  unCode: '578',
  name: 'Norway',
  officialName: 'Kingdom of Norway',
  nativeNames: [
    { languageCode: 'nor', common: 'Norge', official: 'Kongeriket Norge' },
  ],
  regionId: 'europe',
  subregionId: 'northern-europe',
  capital: {
    name: 'Oslo',
    coordinates: [59.9139, 10.7522],
  },
  majorCities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Tromsø'],
  flag: {
    emoji: '🇳🇴',
    svgUrl: 'https://flagcdn.com/no.svg',
    colors: ['#BA0C2F', '#00205B', '#FFFFFF'],
    aspectRatio: '8:11',
  },
  tagline: 'Nordic kingdom of glacial fjords, sovereign wealth stewardship, and world-leading human development.',
  overview: 'Occupying the western portion of the Scandinavian Peninsula, Norway is globally revered for its dramatic glacier-carved coastline, the world’s largest sovereign wealth fund (over $1.7 trillion USD), egalitarian social trust, and leadership in electric vehicle adoption.',

  geography: {
    landAreaKm2: 385207,
    waterPercentage: 6.0,
    coastlineKm: 25148,
    borders: [
      { iso3: 'SWE', name: 'Sweden', lengthKm: 1619 },
      { iso3: 'FIN', name: 'Finland', lengthKm: 727 },
      { iso3: 'RUS', name: 'Russia', lengthKm: 196 },
    ],
    highestPoint: { name: 'Galdhøpiggen', elevationMeters: 2469 },
    lowestPoint: { name: 'Norwegian Sea', elevationMeters: 0 },
    timezones: ['Europe/Oslo (UTC+1, CEST UTC+2)'],
    coordinates: [60.4720, 8.4689],
  },

  demographics: {
    population: 5550000,
    populationYear: 2024,
    densityPerKm2: 15.1,
    medianAge: 40.5,
    urbanizationRate: 83.5,
    lifeExpectancyYears: 83.4,
    fertilityRate: 1.41,
    languages: [
      { name: 'Norwegian (Bokmål / Nynorsk)', isOfficial: true, percentSpoken: 95 },
      { name: 'Sámi', isOfficial: true, percentSpoken: 1 },
      { name: 'English', isOfficial: false, percentSpoken: 90 },
    ],
    ageDistribution: {
      under15Percent: 16.8,
      fifteenTo64Percent: 64.9,
      sixtyFivePlusPercent: 18.3,
    },
  },

  economy: {
    gdpNominalUsdBillions: 546.0,
    gdpPppUsdBillions: 450.0,
    gdpPerCapitaPppUsd: 82800,
    gdpPerCapitaNominalUsd: 98400,
    realGdpGrowthPercent: 1.6,
    inflationRatePercent: 3.1,
    unemploymentRatePercent: 3.6,
    publicDebtPercentOfGdp: 42.5,
    giniCoefficient: 27.6,
    sovereignWealthFundBillionsUsd: 1720.0, // Government Pension Fund Global (Statens pensjonsfond utland)
    mainIndustries: [
      'North Sea Offshore Oil & Gas (Equinor)',
      'Hydroelectric Power & Clean Aluminum Smelting',
      'Maritime Shipping & Marine Engineering (Kongsberg)',
      'Aquaculture & Salmon Farming (Mowi)',
      'Fintech & Green Technologies',
    ],
    trade: {
      topExports: ['Natural Gas (pipeline)', 'Crude Petroleum', 'Fresh Salmon', 'Aluminum', 'Refined Petroleum'],
      topExportPartners: [
        { country: 'Germany', sharePercent: 28.5 },
        { country: 'United Kingdom', sharePercent: 21.0 },
        { country: 'France', sharePercent: 8.5 },
        { country: 'Netherlands', sharePercent: 7.9 },
      ],
      topImportPartners: [
        { country: 'China', sharePercent: 12.1 },
        { country: 'Germany', sharePercent: 11.4 },
        { country: 'Sweden', sharePercent: 10.8 },
        { country: 'United States', sharePercent: 6.8 },
      ],
    },
  },

  currency: {
    code: 'NOK',
    name: 'Norwegian Krone',
    symbol: 'kr',
    fractionalUnit: 'Øre',
    isPegged: false,
    fallbackUsdRate: 10.6,
  },

  education: {
    literacyRatePercent: 99.0,
    tertiaryEnrollmentRatePercent: 84.5,
    educationExpenditurePercentGdp: 6.6,
    topUniversities: [
      {
        name: 'University of Oslo (UiO)',
        globalRankQs: 117,
        city: 'Oslo',
        notableFields: ['Life Sciences', 'Maritime Law', 'Geosciences'],
        websiteUrl: 'https://www.uio.no/english',
      },
      {
        name: 'Norwegian University of Science and Technology (NTNU)',
        globalRankQs: 292,
        city: 'Trondheim',
        notableFields: ['Subsea Engineering', 'Cybernetics', 'Renewable Energy'],
        websiteUrl: 'https://www.ntnu.edu',
      },
      {
        name: 'University of Bergen (UiB)',
        globalRankQs: 281,
        city: 'Bergen',
        notableFields: ['Marine Research', 'Climate Research', 'Global Development'],
        websiteUrl: 'https://www.uib.no/en',
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 86.5,
    rentIndex: 38.2,
    groceriesIndex: 89.4,
    restaurantPriceIndex: 84.1,
    localPurchasingPowerIndex: 96.2,
    samplePricesUsd: {
      inexpensiveMeal: 21.0,
      midRangeMealTwoPeople: 110.0,
      monthlyOneBedroomCityCenterRent: 1450.0,
      monthlyPassTransit: 82.0,
      coffeeCappuccino: 4.8,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 24,
    globalPeaceIndexScore: 1.574,
    safetyIndexNumbeo: 72.8,
    crimeIndexNumbeo: 27.2,
    homicideRatePer100k: 0.55,
    politicalStabilityScore: 1.34,
    pressFreedomIndexRank: 1, // Ranked #1 globally in World Press Freedom Index
  },

  climate: {
    koppenCode: 'Cfb',
    koppenTitle: 'Marine Coastal & Subarctic',
    summary: 'Temperate oceanic climate along coastal fjords warmed by the Gulf Stream, turning subarctic and alpine with heavy snowfall inland and in the north.',
    averageAnnualTempCelsius: 6.8,
    averageAnnualRainfallMm: 860,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: -2.3, precipitationMm: 58 },
      { month: 'Feb', tempCelsius: -1.8, precipitationMm: 46 },
      { month: 'Mar', tempCelsius: 1.4, precipitationMm: 47 },
      { month: 'Apr', tempCelsius: 6.2, precipitationMm: 42 },
      { month: 'May', tempCelsius: 11.5, precipitationMm: 59 },
      { month: 'Jun', tempCelsius: 15.4, precipitationMm: 68 },
      { month: 'Jul', tempCelsius: 17.8, precipitationMm: 82 },
      { month: 'Aug', tempCelsius: 16.4, precipitationMm: 89 },
      { month: 'Sep', tempCelsius: 11.8, precipitationMm: 78 },
      { month: 'Oct', tempCelsius: 6.6, precipitationMm: 84 },
      { month: 'Nov', tempCelsius: 1.9, precipitationMm: 73 },
      { month: 'Dec', tempCelsius: -1.5, precipitationMm: 56 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 8,
    topLandmarks: [
      {
        name: 'Geirangerfjord & Nærøyfjord',
        location: 'Møre og Romsdal & Vestland',
        category: 'Natural',
        description: 'Iconic glacial fjords with steep crystalline rock walls towering 1,400 meters and cascading waterfalls including the Seven Sisters.',
        imageUrl: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
      {
        name: 'Bryggen Hanseatic Wharf',
        location: 'Bergen',
        category: 'Historical',
        description: 'Historic wooden trading buildings along Bergen harbor, dating to the Hanseatic League’s dried cod commerce in the 14th century.',
        imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
    ],
    culinaryTraditions: [
      {
        name: 'Fårikål',
        description: 'National dish consisting of mutton on the bone, green cabbage, and whole black peppercorns simmered for hours.',
        nationalStatus: true,
      },
      {
        name: 'Smoked Arctic Salmon & Gravlaks',
        description: 'Cured Atlantic salmon marinated in salt, sugar, and fresh dill, served with sweet mustard sauce.',
        nationalStatus: false,
      },
    ],
    culturalNormsAndEtiquette: [
      'Friluftsliv (Free air life): Cultural philosophy prioritizing outdoor immersion in mountains and nature regardless of weather.',
      'Allemannsretten (Right to roam): Constitutional right allowing anyone to walk and camp on uncultivated land.',
      'Janteloven: Cultural modesty that frowns upon boasting or ostentatious displays of individual superiority.',
    ],
    luxuryLifestyle: {
      michelinStarredVenuesCount: 16,
      fiveStarHotelsCount: 22,
      yachtMarinasAndAviation: ['KNS Dronningen Marina Oslo', 'Oslo Gardermoen VIP Lounge'],
      primeResidentialTier: 'High-Prime',
      residencyOrGoldenVisaAvailable: false,
      taxNotes: 'Comprehensive welfare model funded by progressive income taxes and wealth tax (Formuesskatt).',
    },
  },

  analyticalPeers: {
    economicTwins: ['switzerland', 'qatar', 'singapore'],
    climaticTwins: ['switzerland', 'germany'],
    regionalNeighbors: ['germany', 'united-kingdom'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Norges Bank Investment Management (NBIM) & Statistics Norway (SSB)' },
      { domain: 'Governance', sourceName: 'Reporters Without Borders Press Freedom Index 2024 (#1)' },
    ],
  },
};
