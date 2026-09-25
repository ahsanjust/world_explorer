import { CountryProfile } from '../../types/country';

export const UAE: CountryProfile = {
  id: 'united-arab-emirates',
  iso2: 'AE',
  iso3: 'ARE',
  unCode: '784',
  name: 'United Arab Emirates',
  officialName: 'United Arab Emirates',
  nativeNames: [
    { languageCode: 'ara', common: 'الإمارات', official: 'الإمارات العربية المتحدة' },
  ],
  regionId: 'middle-east',
  subregionId: 'arabian-peninsula',
  capital: {
    name: 'Abu Dhabi',
    coordinates: [24.4539, 54.3773],
  },
  majorCities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ajman', 'Ras Al Khaimah'],
  flag: {
    emoji: '🇦🇪',
    svgUrl: 'https://flagcdn.com/ae.svg',
    colors: ['#00732F', '#FFFFFF', '#000000', '#FF0000'],
    aspectRatio: '1:2',
  },
  tagline: 'Seven sovereign emirates pioneering futuristic aerospace, sovereign wealth stewardship, and cosmopolitan luxury.',
  overview: 'Federation of seven emirates on the Arabian Peninsula, the UAE has evolved from historic Bedouin tribal territories and coastal pearl ports into a global hub for aviation, international finance, luxury tourism, and renewable energy.',

  geography: {
    landAreaKm2: 83600,
    waterPercentage: 0.0,
    coastlineKm: 1318,
    borders: [
      { iso3: 'SAU', name: 'Saudi Arabia', lengthKm: 457 },
      { iso3: 'OMN', name: 'Oman', lengthKm: 410 },
    ],
    highestPoint: { name: 'Jabal Bil Ays (Jebel Jais)', elevationMeters: 1910 },
    lowestPoint: { name: 'Persian Gulf', elevationMeters: 0 },
    timezones: ['Asia/Dubai (UTC+4)'],
    coordinates: [23.4241, 53.8478],
  },

  demographics: {
    population: 10170000,
    populationYear: 2024,
    densityPerKm2: 121.7,
    medianAge: 33.6,
    urbanizationRate: 87.8,
    lifeExpectancyYears: 79.5,
    fertilityRate: 1.46,
    languages: [
      { name: 'Arabic', isOfficial: true, percentSpoken: 100 },
      { name: 'English', isOfficial: false, percentSpoken: 85 },
    ],
    ageDistribution: {
      under15Percent: 14.8,
      fifteenTo64Percent: 83.8,
      sixtyFivePlusPercent: 1.4,
    },
  },

  economy: {
    gdpNominalUsdBillions: 507.5,
    gdpPppUsdBillions: 890.0,
    gdpPerCapitaPppUsd: 87500,
    gdpPerCapitaNominalUsd: 49900,
    realGdpGrowthPercent: 3.5,
    inflationRatePercent: 2.1,
    unemploymentRatePercent: 2.7,
    publicDebtPercentOfGdp: 29.8,
    giniCoefficient: 32.5,
    sovereignWealthFundBillionsUsd: 1540.0, // ADIA + Mubadala + ICD + ADQ
    mainIndustries: [
      'Petroleum & Natural Gas (ADNOC)',
      'Aviation & Airport Logistics (Emirates, Etihad)',
      'Real Estate & Urban Architecture (Emaar, Nakheel)',
      'International Financial Center (DIFC, ADGM)',
      'Renewable Energy & Nuclear Power (Barakah)',
    ],
    trade: {
      topExports: ['Crude Oil', 'Refined Petroleum', 'Gold & Diamonds', 'Broadcasting Equipment', 'Plastics'],
      topExportPartners: [
        { country: 'India', sharePercent: 14.5 },
        { country: 'Japan', sharePercent: 11.2 },
        { country: 'China', sharePercent: 8.9 },
        { country: 'Saudi Arabia', sharePercent: 6.8 },
      ],
      topImportPartners: [
        { country: 'China', sharePercent: 16.2 },
        { country: 'India', sharePercent: 11.4 },
        { country: 'United States', sharePercent: 7.8 },
        { country: 'Germany', sharePercent: 4.2 },
      ],
    },
  },

  currency: {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'د.إ',
    fractionalUnit: 'Fils (100 fils = 1 dirham)',
    isPegged: true,
    peggedToCurrency: 'USD',
    peggedRate: 3.6725, // Pegged at 3.6725 AED per USD since November 1997
    fallbackUsdRate: 3.6725,
  },

  education: {
    literacyRatePercent: 98.1,
    tertiaryEnrollmentRatePercent: 57.0,
    educationExpenditurePercentGdp: 3.1,
    topUniversities: [
      {
        name: 'Khalifa University',
        globalRankQs: 202,
        city: 'Abu Dhabi',
        notableFields: ['Petroleum Engineering', 'Renewable Energy', 'Aerospace Engineering'],
        websiteUrl: 'https://www.ku.ac.ae',
      },
      {
        name: 'United Arab Emirates University (UAEU)',
        globalRankQs: 261,
        city: 'Al Ain',
        notableFields: ['Medicine & Health Sciences', 'Business', 'Water Resources'],
        websiteUrl: 'https://www.uaeu.ac.ae',
      },
      {
        name: 'American University of Sharjah (AUS)',
        globalRankQs: 332,
        city: 'Sharjah',
        notableFields: ['Architecture & Design', 'Civil Engineering'],
        websiteUrl: 'https://www.aus.edu',
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 67.8,
    rentIndex: 61.2,
    groceriesIndex: 52.4,
    restaurantPriceIndex: 65.8,
    localPurchasingPowerIndex: 104.5,
    samplePricesUsd: {
      inexpensiveMeal: 10.5,
      midRangeMealTwoPeople: 65.0,
      monthlyOneBedroomCityCenterRent: 1850.0,
      monthlyPassTransit: 82.0,
      coffeeCappuccino: 5.2,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 31,
    globalPeaceIndexScore: 1.635,
    safetyIndexNumbeo: 84.8, // Ranked amongst the safest countries globally
    crimeIndexNumbeo: 15.2,
    homicideRatePer100k: 0.5,
    politicalStabilityScore: 0.92,
    pressFreedomIndexRank: 145,
  },

  climate: {
    koppenCode: 'BWh',
    koppenTitle: 'Hot Desert Climate',
    summary: 'Subtropical arid climate with sunny, warm winters and very hot, humid coastal summers.',
    averageAnnualTempCelsius: 28.5,
    averageAnnualRainfallMm: 95,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 19.2, precipitationMm: 18 },
      { month: 'Feb', tempCelsius: 20.8, precipitationMm: 24 },
      { month: 'Mar', tempCelsius: 24.1, precipitationMm: 22 },
      { month: 'Apr', tempCelsius: 28.5, precipitationMm: 8 },
      { month: 'May', tempCelsius: 33.1, precipitationMm: 1 },
      { month: 'Jun', tempCelsius: 35.6, precipitationMm: 0 },
      { month: 'Jul', tempCelsius: 37.4, precipitationMm: 0 },
      { month: 'Aug', tempCelsius: 37.2, precipitationMm: 0 },
      { month: 'Sep', tempCelsius: 34.8, precipitationMm: 0 },
      { month: 'Oct', tempCelsius: 30.6, precipitationMm: 1 },
      { month: 'Nov', tempCelsius: 25.8, precipitationMm: 4 },
      { month: 'Dec', tempCelsius: 21.4, precipitationMm: 17 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 1, // Cultural Sites of Al Ain
    topLandmarks: [
      {
        name: 'Burj Khalifa',
        location: 'Downtown Dubai',
        category: 'Architectural',
        description: 'World’s tallest freestanding structure rising 828 meters into the desert sky, an engineering triumph of the 21st century.',
        imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: false,
      },
      {
        name: 'Sheikh Zayed Grand Mosque',
        location: 'Abu Dhabi',
        category: 'Architectural',
        description: 'Monolithic white marble Islamic architectural triumph featuring 82 domes, pure gold-plated chandeliers, and the world’s largest hand-knotted carpet.',
        imageUrl: 'https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: false,
      },
      {
        name: 'Louvre Abu Dhabi',
        location: 'Saadiyat Island, Abu Dhabi',
        category: 'Architectural',
        description: 'Jean Nouvel dome museum appearing to float on the Arabian Sea, featuring a "rain of light" geometric ceiling and universal cultural collections.',
        imageUrl: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: false,
      },
    ],
    culinaryTraditions: [
      {
        name: 'Al Harees',
        description: 'Ancient Emirati slow-simmered whole wheat and meat prepared in clay pots, traditional for weddings and national occasions.',
        nationalStatus: true,
      },
      {
        name: 'Luqaimat',
        description: 'Crispy golden fried dough dumplings drizzled with date syrup (dibs) and toasted white sesame seeds.',
        nationalStatus: false,
      },
    ],
    culturalNormsAndEtiquette: [
      'Gahwa hospitality: Arabian cardamom coffee served in handle-less finjan cups.',
      'Respect during Ramadan: Public eating, drinking, and smoking during daylight fasting hours is legally regulated.',
      'Cultural respect: National dress (Kandura for men, Abaya for women) is worn with pride.',
    ],
    luxuryLifestyle: {
      michelinStarredVenuesCount: 18,
      fiveStarHotelsCount: 175,
      yachtMarinasAndAviation: ['Dubai Marina Yacht Club', 'Yas Marina', 'Al Maktoum International VIP Terminal'],
      primeResidentialTier: 'Ultra-Prime',
      residencyOrGoldenVisaAvailable: true, // 10-Year Golden Visa for investors, entrepreneurs, and scientists
      taxNotes: 'Zero personal income tax, zero capital gains tax; standard 9% corporate tax on profits exceeding 375,000 AED.',
    },
  },

  analyticalPeers: {
    // Strict ME scope: peers must reference authored in-app dossiers only.
    economicTwins: ['qatar'],
    climaticTwins: ['qatar', 'egypt'],
    regionalNeighbors: ['qatar'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Federal Competitiveness and Statistics Centre (FCSC) & IMF 2024' },
      { domain: 'Currency', sourceName: 'Central Bank of the UAE (CBUAE)' },
      { domain: 'Safety', sourceName: 'Numbeo Safety Index 2024 (Rank #2 Worldwide)' },
    ],
  },
};
