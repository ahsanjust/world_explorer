import { CountryProfile } from '../../types/country';

export const JAPAN: CountryProfile = {
  id: 'japan',
  iso2: 'JP',
  iso3: 'JPN',
  unCode: '392',
  name: 'Japan',
  officialName: 'State of Japan',
  nativeNames: [
    { languageCode: 'jpn', common: '日本', official: '日本国' },
  ],
  regionId: 'asia',
  subregionId: 'east-asia',
  capital: {
    name: 'Tokyo',
    coordinates: [35.6762, 139.6503],
  },
  majorCities: ['Tokyo', 'Osaka', 'Yokohama', 'Kyoto', 'Sapporo', 'Fukuoka', 'Nagoya'],
  flag: {
    emoji: '🇯🇵',
    svgUrl: 'https://flagcdn.com/jp.svg',
    colors: ['#FFFFFF', '#BC002D'],
    aspectRatio: '2:3',
  },
  tagline: 'Stratified archipelago where ancient Shinto-Buddhist craftsmanship meets world-leading technological civilization.',
  overview: 'Spanning an arc of 6,852 islands along the Pacific Ring of Fire, Japan combines high societal safety, extraordinary public transit precision, high-tech manufacturing, and deep cultural heritage.',

  geography: {
    landAreaKm2: 377975,
    waterPercentage: 1.4,
    coastlineKm: 29751,
    borders: [],
    highestPoint: { name: 'Mount Fuji', elevationMeters: 3776 },
    lowestPoint: { name: 'Hachiro-gata', elevationMeters: -4 },
    timezones: ['Asia/Tokyo (UTC+9)'],
    coordinates: [36.2048, 138.2529],
  },

  demographics: {
    population: 124500000,
    populationYear: 2024,
    densityPerKm2: 338.2,
    medianAge: 49.1,
    urbanizationRate: 91.9,
    lifeExpectancyYears: 84.6,
    fertilityRate: 1.26,
    languages: [
      { name: 'Japanese', isOfficial: true, percentSpoken: 99 },
    ],
    ageDistribution: {
      under15Percent: 11.5,
      fifteenTo64Percent: 59.0,
      sixtyFivePlusPercent: 29.5,
    },
  },

  economy: {
    gdpNominalUsdBillions: 4210.0,
    gdpPppUsdBillions: 6490.0,
    gdpPerCapitaPppUsd: 52100,
    gdpPerCapitaNominalUsd: 33800,
    realGdpGrowthPercent: 1.2,
    inflationRatePercent: 2.2,
    unemploymentRatePercent: 2.5,
    publicDebtPercentOfGdp: 261.0,
    giniCoefficient: 32.9,
    sovereignWealthFundBillionsUsd: 150.0,
    mainIndustries: [
      'Automotive Engineering (Toyota, Honda)',
      'Robotics & Industrial Automation',
      'Semiconductor Equipment & Precision Tools',
      'Chemicals & Advanced Materials',
      'Consumer Electronics & Gaming',
    ],
    trade: {
      topExports: ['Motor vehicles', 'Machinery parts', 'Integrated circuits', 'Steel', 'Optical instruments'],
      topExportPartners: [
        { country: 'United States', sharePercent: 20.2 },
        { country: 'China', sharePercent: 17.6 },
        { country: 'South Korea', sharePercent: 6.8 },
        { country: 'Taiwan', sharePercent: 6.5 },
      ],
      topImportPartners: [
        { country: 'China', sharePercent: 21.0 },
        { country: 'United States', sharePercent: 10.1 },
        { country: 'Australia', sharePercent: 9.8 },
        { country: 'Saudi Arabia', sharePercent: 4.8 },
      ],
    },
  },

  currency: {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    fractionalUnit: 'Sen (historic)',
    isPegged: false,
    fallbackUsdRate: 152.0,
  },

  education: {
    literacyRatePercent: 99.0,
    tertiaryEnrollmentRatePercent: 65.4,
    educationExpenditurePercentGdp: 3.4,
    topUniversities: [
      {
        name: 'The University of Tokyo (Todai)',
        globalRankQs: 32,
        city: 'Tokyo',
        notableFields: ['Physics & Quantum Optics', 'Mechanical Engineering', 'Law', 'Medicine'],
      },
      {
        name: 'Kyoto University',
        globalRankQs: 50,
        city: 'Kyoto',
        notableFields: ['Chemistry (Nobel Laureates)', 'Cell Biology', 'Mathematics'],
      },
      {
        name: 'Tokyo Institute of Technology (Tokyo Tech)',
        globalRankQs: 84,
        city: 'Tokyo',
        notableFields: ['Robotics', 'Materials Science', 'Computer Engineering'],
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 52.8,
    rentIndex: 26.4,
    groceriesIndex: 58.1,
    restaurantPriceIndex: 38.6,
    localPurchasingPowerIndex: 88.4,
    samplePricesUsd: {
      inexpensiveMeal: 6.8,
      midRangeMealTwoPeople: 35.0,
      monthlyOneBedroomCityCenterRent: 780.0,
      monthlyPassTransit: 65.0,
      coffeeCappuccino: 3.2,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 17,
    globalPeaceIndexScore: 1.525,
    safetyIndexNumbeo: 78.4,
    crimeIndexNumbeo: 21.6,
    homicideRatePer100k: 0.23, // Among lowest violent crime rates in the world
    politicalStabilityScore: 1.05,
    pressFreedomIndexRank: 70,
  },

  climate: {
    koppenCode: 'Cfa',
    koppenTitle: 'Humid Subtropical Climate',
    summary: 'Four distinct seasons: Cherry blossom spring, humid monsoon summer, colorful autumn foliage, and cool crisp winter with heavy snowfall in northern highlands.',
    averageAnnualTempCelsius: 16.2,
    averageAnnualRainfallMm: 1530,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 5.4, precipitationMm: 52 },
      { month: 'Feb', tempCelsius: 6.1, precipitationMm: 56 },
      { month: 'Mar', tempCelsius: 9.4, precipitationMm: 118 },
      { month: 'Apr', tempCelsius: 14.8, precipitationMm: 125 },
      { month: 'May', tempCelsius: 19.3, precipitationMm: 138 },
      { month: 'Jun', tempCelsius: 22.5, precipitationMm: 168 },
      { month: 'Jul', tempCelsius: 26.4, precipitationMm: 154 },
      { month: 'Aug', tempCelsius: 27.8, precipitationMm: 168 },
      { month: 'Sep', tempCelsius: 24.1, precipitationMm: 210 },
      { month: 'Oct', tempCelsius: 18.5, precipitationMm: 198 },
      { month: 'Nov', tempCelsius: 13.0, precipitationMm: 92 },
      { month: 'Dec', tempCelsius: 7.8, precipitationMm: 51 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 25,
    topLandmarks: [
      {
        name: 'Mount Fuji (Fuji-san)',
        location: 'Shizuoka & Yamanashi',
        category: 'Natural',
        description: 'Sacred symmetrical stratovolcano and timeless national symbol that has inspired Japanese art and poetry for millennia.',
        imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
      {
        name: 'Kinkaku-ji (Golden Pavilion)',
        location: 'Kyoto',
        category: 'Historical',
        description: 'Zen Buddhist temple whose top two floors are completely covered in pure gold leaf, reflected across the Kyoko-chi mirror pond.',
        imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
      {
        name: 'Fushimi Inari-taisha',
        location: 'Kyoto',
        category: 'Cultural',
        description: 'Iconic Shinto shrine famous for thousands of vermilion torii gates winding up the sacred Mount Inari.',
        imageUrl: 'https://images.unsplash.com/photo-1478436127897-769e00d0c71e?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: false,
      },
    ],
    culinaryTraditions: [
      {
        name: 'Washoku (Traditional Japanese Cuisine)',
        description: 'UNESCO Intangible Cultural Heritage culinary philosophy emphasizing harmony of seasonal ingredients, delicate dashi umami, and visual aesthetics.',
        nationalStatus: true,
      },
      {
        name: 'Sushi & Sashimi',
        description: 'Edo-mae tradition of pristine raw seafood seasoned with akazu rice vinegar and fresh wasabi.',
        nationalStatus: false,
      },
      {
        name: 'Ramen',
        description: 'Regional noodle broths ranging from rich Hakata tonkotsu pork bone to delicate Tokyo shoyu and Sapporo miso.',
        nationalStatus: false,
      },
    ],
    culturalNormsAndEtiquette: [
      'Bowing (Ojigi) conveys gratitude, greetings, and apologies.',
      'Shoes are removed at the genkan before entering homes, traditional ryokan, and temples.',
      'Tipping is not customary and may cause confusion; exceptional service is considered standard.',
      'Public quietude: Phone calls and loud conversations on trains and subways are discouraged.',
    ],
    luxuryLifestyle: {
      michelinStarredVenuesCount: 183, // Tokyo holds the world record for Michelin stars
      fiveStarHotelsCount: 88,
      yachtMarinasAndAviation: ['Yokohama Bayside Marina', 'Tokyo Haneda VIP Terminal'],
      primeResidentialTier: 'Ultra-Prime',
      residencyOrGoldenVisaAvailable: false, // Points-based Highly Skilled Professional Visa route
      taxNotes: 'Progressive national and inhabitant tax rates up to 55% for top earners.',
    },
  },

  analyticalPeers: {
    economicTwins: ['germany', 'united-states'],
    climaticTwins: ['united-states'],
    regionalNeighbors: ['singapore'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Cabinet Office of Japan & IMF WEO 2024' },
      { domain: 'Demographics', sourceName: 'Statistics Bureau of Japan (MIC)' },
      { domain: 'Safety', sourceName: 'National Police Agency (NPA) Crime White Paper & UNODC' },
    ],
  },
};
