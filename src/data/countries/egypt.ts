import { CountryProfile } from '../../types/country';

export const EGYPT: CountryProfile = {
  id: 'egypt',
  iso2: 'EG',
  iso3: 'EGY',
  unCode: '818',
  name: 'Egypt',
  officialName: 'Arab Republic of Egypt',
  nativeNames: [
    { languageCode: 'ara', common: 'مصر', official: 'جمهورية مصر العربية' },
  ],
  regionId: 'africa',
  subregionId: 'north-africa',
  capital: {
    name: 'Cairo',
    coordinates: [30.0444, 31.2357],
  },
  majorCities: ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said', 'Suez', 'Luxor'],
  flag: {
    emoji: '🇪🇬',
    svgUrl: 'https://flagcdn.com/eg.svg',
    colors: ['#C8102E', '#FFFFFF', '#000000', '#C6A247'],
    aspectRatio: '2:3',
  },
  tagline: 'Cradle of ancient monumental civilization, guardian of the Nile and the vital Suez Canal maritime transit artery.',
  overview: 'Spanning the northeast corner of Africa and the Sinai Peninsula in Southwest Asia, Egypt is a transcontinental nation home to over five millennia of continuous history, iconic pharaonic monuments, and the vital Suez Canal linking the Mediterranean to the Indian Ocean.',

  geography: {
    landAreaKm2: 1002450,
    waterPercentage: 0.63,
    coastlineKm: 2450,
    borders: [
      { iso3: 'LBY', name: 'Libya', lengthKm: 1115 },
      { iso3: 'SDN', name: 'Sudan', lengthKm: 1273 },
      { iso3: 'ISR', name: 'Israel', lengthKm: 208 },
    ],
    highestPoint: { name: 'Mount Catherine (Gabal Katrîne)', elevationMeters: 2629 },
    lowestPoint: { name: 'Qattara Depression', elevationMeters: -133 },
    timezones: ['Africa/Cairo (UTC+2, Summer UTC+3)'],
    coordinates: [26.8206, 30.8025],
  },

  demographics: {
    population: 112700000,
    populationYear: 2024,
    densityPerKm2: 112.4, // Concentrated densely along the fertile Nile Valley
    medianAge: 24.8,
    urbanizationRate: 43.1,
    lifeExpectancyYears: 72.0,
    fertilityRate: 2.76,
    languages: [
      { name: 'Arabic (Egyptian Arabic)', isOfficial: true, percentSpoken: 99 },
    ],
    ageDistribution: {
      under15Percent: 32.5,
      fifteenTo64Percent: 62.8,
      sixtyFivePlusPercent: 4.7,
    },
  },

  economy: {
    gdpNominalUsdBillions: 395.0,
    gdpPppUsdBillions: 1810.0,
    gdpPerCapitaPppUsd: 16100,
    gdpPerCapitaNominalUsd: 3500,
    realGdpGrowthPercent: 3.0,
    inflationRatePercent: 27.5, // Navigating recent currency realignment
    unemploymentRatePercent: 7.0,
    publicDebtPercentOfGdp: 92.4,
    giniCoefficient: 31.5,
    mainIndustries: [
      'Suez Canal Maritime Transit Revenues',
      'Petroleum & Natural Gas (Zohr offshore gas field)',
      'Heritage Tourism & Red Sea Beach Resorts (Sharm El Sheikh)',
      'Textiles, Garments & Agriculture (Nile Delta Cotton)',
      'Construction & Civil Megaprojects (New Administrative Capital)',
    ],
    trade: {
      topExports: ['Refined Petroleum', 'Crude Petroleum', 'Natural Gas', 'Fertilizers', 'Citrus Fruits & Fresh Produce'],
      topExportPartners: [
        { country: 'Turkey', sharePercent: 8.8 },
        { country: 'Italy', sharePercent: 8.2 },
        { country: 'Saudi Arabia', sharePercent: 6.9 },
        { country: 'United States', sharePercent: 5.5 },
      ],
      topImportPartners: [
        { country: 'China', sharePercent: 14.8 },
        { country: 'Saudi Arabia', sharePercent: 8.5 },
        { country: 'United States', sharePercent: 5.6 },
        { country: 'Russia', sharePercent: 5.2 },
      ],
    },
  },

  currency: {
    code: 'EGP',
    name: 'Egyptian Pound',
    symbol: 'E£',
    fractionalUnit: 'Piastre',
    isPegged: false, // Transitioned to flexible exchange rate regime in 2024
    fallbackUsdRate: 48.5,
  },

  education: {
    literacyRatePercent: 74.5,
    tertiaryEnrollmentRatePercent: 41.5,
    educationExpenditurePercentGdp: 3.5,
    topUniversities: [
      {
        name: 'Cairo University',
        globalRankQs: 350,
        city: 'Giza, Cairo',
        notableFields: ['Egyptology', 'Civil Engineering', 'Medicine'],
      },
      {
        name: 'American University in Cairo (AUC)',
        globalRankQs: 410,
        city: 'New Cairo',
        notableFields: ['Middle East Studies', 'Business Administration', 'Journalism'],
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 22.5,
    rentIndex: 5.2,
    groceriesIndex: 21.4,
    restaurantPriceIndex: 18.9,
    localPurchasingPowerIndex: 15.6,
    samplePricesUsd: {
      inexpensiveMeal: 2.8,
      midRangeMealTwoPeople: 18.0,
      monthlyOneBedroomCityCenterRent: 220.0,
      monthlyPassTransit: 14.0,
      coffeeCappuccino: 1.6,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 118,
    globalPeaceIndexScore: 2.342,
    safetyIndexNumbeo: 51.5,
    crimeIndexNumbeo: 48.5,
    homicideRatePer100k: 1.3,
    politicalStabilityScore: -1.10,
    pressFreedomIndexRank: 170,
  },

  climate: {
    koppenCode: 'BWh',
    koppenTitle: 'Hot Desert Climate',
    summary: 'Arid desert climate with scorching sunny summers, mild comfortable winters, and almost nonexistent precipitation away from the Mediterranean northern coast.',
    averageAnnualTempCelsius: 22.8,
    averageAnnualRainfallMm: 25,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 14.0, precipitationMm: 5 },
      { month: 'Feb', tempCelsius: 15.5, precipitationMm: 4 },
      { month: 'Mar', tempCelsius: 18.2, precipitationMm: 3 },
      { month: 'Apr', tempCelsius: 22.4, precipitationMm: 1 },
      { month: 'May', tempCelsius: 26.5, precipitationMm: 0 },
      { month: 'Jun', tempCelsius: 29.2, precipitationMm: 0 },
      { month: 'Jul', tempCelsius: 30.1, precipitationMm: 0 },
      { month: 'Aug', tempCelsius: 30.0, precipitationMm: 0 },
      { month: 'Sep', tempCelsius: 28.1, precipitationMm: 0 },
      { month: 'Oct', tempCelsius: 24.8, precipitationMm: 1 },
      { month: 'Nov', tempCelsius: 19.8, precipitationMm: 3 },
      { month: 'Dec', tempCelsius: 15.4, precipitationMm: 6 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 7,
    topLandmarks: [
      {
        name: 'Pyramids of Giza & The Great Sphinx',
        location: 'Giza Plateau, Cairo',
        category: 'Historical',
        description: 'Sole surviving Wonder of the Ancient World, erected over 4,500 years ago during Egypt’s Old Kingdom.',
        imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
      {
        name: 'Karnak & Valley of the Kings',
        location: 'Luxor',
        category: 'Historical',
        description: 'Vast open-air museum of ancient Thebes containing hypostyle column halls and the rock-cut tombs of pharaohs including Tutankhamun.',
        imageUrl: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
    ],
    culinaryTraditions: [
      {
        name: 'Koshary',
        description: 'Beloved national street food combining lentils, rice, chickpeas, and macaroni topped with crispy fried onions and spiced garlic-vinegar tomato sauce.',
        nationalStatus: true,
      },
      {
        name: 'Ful Medames & Taameya',
        description: 'Slow-simmered fava beans dressed with olive oil and cumin, paired with Egyptian Egyptian fava-bean falafel (Taameya).',
        nationalStatus: false,
      },
    ],
    culturalNormsAndEtiquette: [
      'Karam (Generosity): Hospitality and generous offers of tea (shai) or coffee are central to daily Egyptian encounters.',
      'Respectful modesty: Modest attire is expected when visiting mosques, churches, and historic quarters.',
      'Sense of humor (Ibn el-balad): Egyptian conversation is renowned across the Arab world for its warm wit and comedic storytelling.',
    ],
    luxuryLifestyle: {
      fiveStarHotelsCount: 82,
      yachtMarinasAndAviation: ['Hurghada Marina', 'Port Ghalib Marina', 'Cairo Sphinx International Airport'],
      primeResidentialTier: 'Emerging',
      residencyOrGoldenVisaAvailable: true, // Egyptian citizenship/residency by investment programme
      taxNotes: 'Progressive individual income tax rates up to 27.5%.',
    },
  },

  analyticalPeers: {
    economicTwins: ['kenya', 'brazil'],
    climaticTwins: ['qatar', 'united-arab-emirates'],
    regionalNeighbors: ['kenya', 'qatar'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Central Bank of Egypt (CBE) & Ministry of Finance' },
      { domain: 'Heritage', sourceName: 'UNESCO World Heritage List (Memphis and its Necropolis)' },
    ],
  },
};
