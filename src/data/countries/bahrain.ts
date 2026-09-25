import { CountryProfile } from '../../types/country';

export const BAHRAIN: CountryProfile = {
  id: 'bahrain',
  iso2: 'BH',
  iso3: 'BHR',
  unCode: '048',
  name: 'Bahrain',
  officialName: 'Kingdom of Bahrain',
  nativeNames: [
    { languageCode: 'ara', common: 'البحرين', official: 'مملكة البحرين' },
  ],
  regionId: 'middle-east',
  subregionId: 'arabian-peninsula',
  capital: {
    name: 'Manama',
    coordinates: [26.2285, 50.5860],
  },
  majorCities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'A’ali', 'Isa Town'],
  flag: {
    emoji: '🇧🇭',
    svgUrl: 'https://flagcdn.com/bh.svg',
    colors: ['#CE1126', '#FFFFFF'],
    aspectRatio: '3:5',
  },
  tagline: 'Sovereign Gulf island archipelago uniting ancient Dilmun civilization, pioneering Islamic banking, and the King Fahd Causeway.',
  overview: 'Comprising an archipelago of over 30 natural and artificial islands in the Persian Gulf, Bahrain was the ancient seat of the Bronze Age Dilmun maritime trading empire. The first Gulf state to discover petroleum in 1932, modern Bahrain has diversified into a premier Middle Eastern financial and fintech center, hosting the headquarters of leading Islamic banking institutions and the Formula 1 Gulf Air Bahrain Grand Prix.',

  geography: {
    landAreaKm2: 785,
    waterPercentage: 0.0,
    coastlineKm: 161,
    borders: [], // Island nation, connected to Saudi Arabia via the 25km King Fahd Causeway
    highestPoint: { name: 'Jabal ad Dukhan (Mountain of Smoke)', elevationMeters: 134 },
    lowestPoint: { name: 'Persian Gulf', elevationMeters: 0 },
    timezones: ['Asia/Bahrain (UTC+3)'],
    coordinates: [26.0667, 50.5577],
  },

  demographics: {
    population: 1540000,
    populationYear: 2024,
    densityPerKm2: 1961.8,
    medianAge: 32.8,
    urbanizationRate: 89.8,
    lifeExpectancyYears: 79.2,
    fertilityRate: 1.8,
    languages: [
      { name: 'Arabic', isOfficial: true, percentSpoken: 100 },
      { name: 'English', isOfficial: false, percentSpoken: 85 },
    ],
    ageDistribution: {
      under15Percent: 18.5,
      fifteenTo64Percent: 78.2,
      sixtyFivePlusPercent: 3.3,
    },
  },

  economy: {
    gdpNominalUsdBillions: 46.5,
    gdpPppUsdBillions: 95.0,
    gdpPerCapitaPppUsd: 63000,
    gdpPerCapitaNominalUsd: 30200,
    realGdpGrowthPercent: 2.9,
    inflationRatePercent: 1.1,
    unemploymentRatePercent: 3.8,
    publicDebtPercentOfGdp: 118.0,
    giniCoefficient: 32.0,
    sovereignWealthFundBillionsUsd: 18.0, // Mumtalakat Holding Company
    mainIndustries: [
      'Islamic Banking & International Financial Services',
      'Aluminum Smelting (Alba — one of the world’s largest single-site smelters)',
      'Petroleum Refining & Natural Gas',
      'Fintech & Digital Asset Regulation',
      'Ship Repair & Maritime Services (ASRY)',
    ],
    trade: {
      topExports: ['Raw Aluminum & Alloys', 'Refined Petroleum Products', 'Iron Ore Agglomerated Pellets', 'Chemicals'],
      topExportPartners: [
        { country: 'Saudi Arabia', sharePercent: 22.0 },
        { country: 'United States', sharePercent: 12.5 },
        { country: 'United Arab Emirates', sharePercent: 10.0 },
      ],
      topImportPartners: [
        { country: 'China', sharePercent: 14.0 },
        { country: 'Brazil', sharePercent: 12.0 },
        { country: 'Saudi Arabia', sharePercent: 9.5 },
      ],
    },
  },

  currency: {
    code: 'BHD',
    name: 'Bahraini Dinar',
    symbol: '.د.ب',
    fractionalUnit: 'Fils',
    isPegged: true,
    peggedToCurrency: 'USD',
    peggedRate: 0.376,
    fallbackUsdRate: 0.376,
  },

  education: {
    literacyRatePercent: 97.5,
    tertiaryEnrollmentRatePercent: 62.5,
    educationExpenditurePercentGdp: 2.9,
    topUniversities: [
      {
        name: 'University of Bahrain (UOB)',
        globalRankQs: 951,
        city: 'Sakhir / Isa Town',
        notableFields: ['Engineering', 'Information Technology', 'Business Administration'],
        websiteUrl: 'https://www.uob.edu.bh',
      },
      {
        name: 'Arabian Gulf University (AGU)',
        globalRankQs: 801,
        city: 'Manama',
        notableFields: ['Medicine & Medical Sciences', 'Biotechnology', 'Environmental Studies'],
        websiteUrl: 'https://www.agu.edu.bh',
      },
      {
        name: 'Applied Science University (ASU)',
        globalRankQs: 561,
        city: 'East Al-Eker',
        notableFields: ['Administrative Sciences', 'Law', 'Arts & Design'],
        websiteUrl: 'https://www.asu.edu.bh',
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 51.2,
    rentIndex: 28.5,
    groceriesIndex: 44.0,
    restaurantPriceIndex: 41.2,
    localPurchasingPowerIndex: 82.5,
    samplePricesUsd: {
      inexpensiveMeal: 6.8,
      midRangeMealTwoPeople: 45.0,
      monthlyOneBedroomCityCenterRent: 750.0,
      monthlyPassTransit: 42.0,
      coffeeCappuccino: 4.5,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 81,
    globalPeaceIndexScore: 1.99,
    safetyIndexNumbeo: 76.2,
    crimeIndexNumbeo: 23.8,
    homicideRatePer100k: 0.5,
    politicalStabilityScore: -0.45,
    pressFreedomIndexRank: 171,
  },

  climate: {
    koppenCode: 'BWh',
    koppenTitle: 'Arid Maritime Desert',
    summary: 'Subtropical island desert climate with extremely hot, humid summers mitigated somewhat by Persian Gulf sea breezes, and mild, comfortable winter months with minimal rainfall.',
    averageAnnualTempCelsius: 27.0,
    averageAnnualRainfallMm: 72,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 17.2, precipitationMm: 15 },
      { month: 'Feb', tempCelsius: 18.5, precipitationMm: 16 },
      { month: 'Mar', tempCelsius: 21.8, precipitationMm: 14 },
      { month: 'Apr', tempCelsius: 26.5, precipitationMm: 10 },
      { month: 'May', tempCelsius: 31.8, precipitationMm: 1 },
      { month: 'Jun', tempCelsius: 34.5, precipitationMm: 0 },
      { month: 'Jul', tempCelsius: 36.0, precipitationMm: 0 },
      { month: 'Aug', tempCelsius: 36.2, precipitationMm: 0 },
      { month: 'Sep', tempCelsius: 33.8, precipitationMm: 0 },
      { month: 'Oct', tempCelsius: 29.5, precipitationMm: 1 },
      { month: 'Nov', tempCelsius: 24.2, precipitationMm: 4 },
      { month: 'Dec', tempCelsius: 19.4, precipitationMm: 11 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 3,
    topLandmarks: [
      {
        name: 'Qal’at al-Bahrain (Bahrain Fort)',
        location: 'Karbabad, Capital Governorate',
        category: 'Historical',
        description: 'Spectacular military fortress perched on an artificial tell inhabited from 2300 BCE to the 16th century, the historic capital of the ancient Dilmun civilization.',
        imageUrl: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&auto=format&fit=crop',
        unescoDesignated: true,
      },
      {
        name: 'Pearling Path (Muharraq Island)',
        location: 'Muharraq',
        category: 'Cultural',
        description: 'UNESCO World Heritage testimonial to the millennium-old Arabian Gulf pearling economy, including oyster beds, seashore sites, and historic merchants’ houses.',
        imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&auto=format&fit=crop',
        unescoDesignated: true,
      },
      {
        name: 'Bahrain World Trade Center',
        location: 'Manama',
        category: 'Architectural',
        description: 'Pioneering 240-meter twin sail-shaped towers, the first skyscraper in the world to integrate large-scale wind turbines into its design.',
        imageUrl: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800&auto=format&fit=crop',
        unescoDesignated: false,
      },
    ],
    culinaryTraditions: [
      { name: 'Machboos Rubyan', description: 'Fragrant spiced rice preparation prepared with fresh Gulf prawns, dried lime, cardamom, and fresh coriander.', nationalStatus: true },
      { name: 'Muhammar', description: 'Sweetened basmati rice caramelized with date molasses (dibs) and spices, traditionally served alongside grilled salty fish.' },
      { name: 'Halwa Bahraini', description: 'Legendary gelatinous sweet crafted with cornstarch, saffron, cardamom, and roasted nuts, famous across the Arabian Gulf.' },
    ],
    culturalNormsAndEtiquette: [
      'Bahrain has a famously cosmopolitan and tolerant social culture with vibrant multi-confessional heritage.',
      'Exchanging warm handshakes and inquiring about health and family precedes formal commercial meetings.',
      'Dress codes in Manama are relatively flexible compared to stricter Gulf neighbors, while modesty remains standard in public areas.',
    ],
    luxuryLifestyle: {
      fiveStarHotelsCount: 28,
      yachtMarinasAndAviation: [
        'Reef Island Lagoon Marina Manama',
        'Amwaj Islands Yacht Club Marina',
        'Bahrain International Airport (BAH) Private Business Aviation Terminal',
      ],
      primeResidentialTier: 'High-Prime',
      residencyOrGoldenVisaAvailable: true,
      taxNotes: 'Zero personal income tax; zero capital gains tax; Golden Residency Visa available for property owners and talent.',
    },
  },

  analyticalPeers: {
    economicTwins: ['qatar', 'kuwait', 'united-arab-emirates'],
    climaticTwins: ['qatar', 'united-arab-emirates'],
    regionalNeighbors: ['saudi-arabia', 'qatar'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Central Bank of Bahrain (CBB) & Bahrain Economic Development Board (EDB)', referenceUrl: 'https://www.cbb.gov.bh' },
      { domain: 'Sovereign Wealth', sourceName: 'Mumtalakat Holding Company Disclosures', referenceUrl: 'https://www.mumtalakat.bh' },
      { domain: 'UNESCO', sourceName: 'UNESCO World Heritage List (Pearling Testimony & Qal’at al-Bahrain)', referenceUrl: 'https://whc.unesco.org' },
    ],
  },
};
