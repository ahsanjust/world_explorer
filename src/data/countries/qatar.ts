import { CountryProfile } from '../../types/country';

export const QATAR: CountryProfile = {
  id: 'qatar',
  iso2: 'QA',
  iso3: 'QAT',
  unCode: '634',
  name: 'Qatar',
  officialName: 'State of Qatar',
  nativeNames: [
    { languageCode: 'ara', common: 'قطر', official: 'دولة قطر' },
  ],
  regionId: 'asia',
  subregionId: 'middle-east',
  capital: {
    name: 'Doha',
    coordinates: [25.2854, 51.5310],
  },
  majorCities: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Lusail', 'Al Khor'],
  flag: {
    emoji: '🇶🇦',
    svgUrl: 'https://flagcdn.com/qa.svg',
    colors: ['#8D1B3D', '#FFFFFF'], // Maroon and White
    aspectRatio: '11:28',
  },
  tagline: 'Sovereign Gulf Peninsula blending historic maritime trade with visionary architecture and sovereign wealth.',
  overview: 'Occupying the small Qatar Peninsula on the northeastern coast of the Arabian Peninsula, Qatar has transformed from a historic pearl-diving economy into one of the world’s highest GDP per capita nations, driven by the North Field natural gas reserves and forward-looking economic diversification.',

  geography: {
    landAreaKm2: 11586,
    waterPercentage: 0.0,
    coastlineKm: 563,
    borders: [
      { iso3: 'SAU', name: 'Saudi Arabia', lengthKm: 60 },
    ],
    highestPoint: { name: 'Qurayn Abu al Bawl', elevationMeters: 103 },
    lowestPoint: { name: 'Persian Gulf', elevationMeters: 0 },
    timezones: ['Asia/Qatar (UTC+3)'],
    coordinates: [25.3548, 51.1839],
  },

  demographics: {
    population: 2980000,
    populationYear: 2024,
    densityPerKm2: 257.2,
    medianAge: 32.3,
    urbanizationRate: 99.3,
    lifeExpectancyYears: 80.4,
    fertilityRate: 1.8,
    languages: [
      { name: 'Arabic', isOfficial: true, percentSpoken: 100 },
      { name: 'English', isOfficial: false, percentSpoken: 90 },
    ],
    ageDistribution: {
      under15Percent: 13.8,
      fifteenTo64Percent: 84.8,
      sixtyFivePlusPercent: 1.4,
    },
  },

  economy: {
    gdpNominalUsdBillions: 221.4,
    gdpPppUsdBillions: 328.0,
    gdpPerCapitaPppUsd: 115200,
    gdpPerCapitaNominalUsd: 74300,
    realGdpGrowthPercent: 2.8,
    inflationRatePercent: 1.6,
    unemploymentRatePercent: 0.1,
    publicDebtPercentOfGdp: 41.2,
    giniCoefficient: 35.1,
    sovereignWealthFundBillionsUsd: 510.0, // Qatar Investment Authority (QIA)
    mainIndustries: [
      'Liquefied Natural Gas (LNG)',
      'Petrochemicals',
      'Financial Services',
      'Construction & Civil Engineering',
      'Aviation & Logistics',
    ],
    trade: {
      topExports: ['Liquefied Natural Gas', 'Petroleum Gases', 'Crude Petroleum', 'Fertilizers', 'Polymers'],
      topExportPartners: [
        { country: 'China', sharePercent: 23.5 },
        { country: 'India', sharePercent: 14.8 },
        { country: 'Japan', sharePercent: 12.1 },
        { country: 'South Korea', sharePercent: 10.9 },
      ],
      topImportPartners: [
        { country: 'United States', sharePercent: 15.2 },
        { country: 'China', sharePercent: 14.1 },
        { country: 'Italy', sharePercent: 8.4 },
        { country: 'Germany', sharePercent: 6.2 },
      ],
    },
  },

  currency: {
    code: 'QAR',
    name: 'Qatari Riyal',
    symbol: 'ر.ق',
    fractionalUnit: 'Dirham (100 dirhams = 1 riyal)',
    isPegged: true,
    peggedToCurrency: 'USD',
    peggedRate: 3.64, // Officially fixed at 1 USD = 3.64 QAR by Decree No. 34 of 2001
    fallbackUsdRate: 3.64,
  },

  education: {
    literacyRatePercent: 97.8,
    tertiaryEnrollmentRatePercent: 32.5,
    educationExpenditurePercentGdp: 3.2,
    topUniversities: [
      {
        name: 'Qatar University (QU)',
        globalRankQs: 173,
        city: 'Doha',
        notableFields: ['Engineering', 'Materials Science', 'Business & Economics', 'Law'],
        websiteUrl: 'https://www.qu.edu.qa',
      },
      {
        name: 'Hamad Bin Khalifa University (HBKU)',
        globalRankQs: 310,
        city: 'Education City, Al Rayyan',
        notableFields: ['Islamic Studies', 'Genomics & Precision Medicine', 'Energy & Sustainability'],
        websiteUrl: 'https://www.hbku.edu.qa',
      },
      {
        name: 'Georgetown University in Qatar (GU-Q)',
        globalRankQs: 290,
        city: 'Education City, Al Rayyan',
        notableFields: ['International Affairs', 'Global Politics', 'Economics'],
        websiteUrl: 'https://qatar.georgetown.edu',
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 64.2, // NYC = 100
    rentIndex: 58.5,
    groceriesIndex: 55.4,
    restaurantPriceIndex: 68.2,
    localPurchasingPowerIndex: 112.5,
    samplePricesUsd: {
      inexpensiveMeal: 11.0,
      midRangeMealTwoPeople: 68.0,
      monthlyOneBedroomCityCenterRent: 1650.0,
      monthlyPassTransit: 41.2,
      coffeeCappuccino: 5.6,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 29,
    globalPeaceIndexScore: 1.624,
    safetyIndexNumbeo: 84.0, // Ranked among the safest countries globally
    crimeIndexNumbeo: 16.0,
    homicideRatePer100k: 0.4,
    politicalStabilityScore: 0.95,
    pressFreedomIndexRank: 112,
  },

  climate: {
    koppenCode: 'BWh',
    koppenTitle: 'Hot Desert Climate',
    summary: 'Arid subtropical desert climate characterized by mild, pleasant winters and extremely hot, sunny summers with minimal rainfall.',
    averageAnnualTempCelsius: 28.2,
    averageAnnualRainfallMm: 74,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 18.5, precipitationMm: 13 },
      { month: 'Feb', tempCelsius: 20.1, precipitationMm: 14 },
      { month: 'Mar', tempCelsius: 23.4, precipitationMm: 16 },
      { month: 'Apr', tempCelsius: 27.8, precipitationMm: 8 },
      { month: 'May', tempCelsius: 33.2, precipitationMm: 2 },
      { month: 'Jun', tempCelsius: 35.8, precipitationMm: 0 },
      { month: 'Jul', tempCelsius: 37.1, precipitationMm: 0 },
      { month: 'Aug', tempCelsius: 36.8, precipitationMm: 0 },
      { month: 'Sep', tempCelsius: 34.2, precipitationMm: 0 },
      { month: 'Oct', tempCelsius: 30.5, precipitationMm: 1 },
      { month: 'Nov', tempCelsius: 25.4, precipitationMm: 3 },
      { month: 'Dec', tempCelsius: 20.3, precipitationMm: 17 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 1, // Al Zubarah Archaeological Site
    topLandmarks: [
      {
        name: 'Museum of Islamic Art (MIA)',
        location: 'Doha Corniche',
        category: 'Architectural',
        description: 'Masterpiece designed by I.M. Pei on an artificial peninsula, housing 1,400 years of Islamic art across three continents.',
        imageUrl: 'https://images.unsplash.com/photo-1578895210405-907db486c111?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: false,
      },
      {
        name: 'Al Zubarah Fort & Archaeological Site',
        location: 'Al Shamal',
        category: 'Historical',
        description: 'UNESCO World Heritage 18th-century coastal fortress and pearl-fishing settlement showcasing Gulf trading history.',
        imageUrl: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
      {
        name: 'Souq Waqif',
        location: 'Central Doha',
        category: 'Cultural',
        description: 'Century-old historic market renowned for traditional spice stalls, falconry souqs, handcrafts, and evening dining.',
        imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: false,
      },
      {
        name: 'National Museum of Qatar',
        location: 'Doha',
        category: 'Architectural',
        description: 'Jean Nouvel architectural triumph inspired by the desert rose crystal formation, wrapping around the historic Palace of Sheikh Abdullah bin Jassim Al Thani.',
        imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: false,
      },
    ],
    culinaryTraditions: [
      {
        name: 'Machboos (Kabsa)',
        description: 'National dish of fragrant spiced basmati rice simmered with cardamom, cloves, dried lime (loomi), and slow-cooked lamb or chicken.',
        nationalStatus: true,
      },
      {
        name: 'Harees',
        description: 'Traditional slow-cooked wheat and meat porridge infused with cinnamon and clarified butter (ghee), customary during Ramadan.',
        nationalStatus: false,
      },
      {
        name: 'Karak Chai',
        description: 'Strong black tea brewed with evaporated milk, crushed green cardamom pods, and saffron, a cornerstone of daily social gathering.',
        nationalStatus: false,
      },
    ],
    culturalNormsAndEtiquette: [
      'Warm hospitality: Guests are traditionally welcomed with Arabian coffee (Gahwa) and dates in the majlis.',
      'Modest attire is respected in government buildings, cultural centers, and traditional souqs.',
      'Use the right hand when offering or accepting food, gifts, or coffee cups.',
      'Public displays of affection are kept private out of cultural discretion.',
    ],
    luxuryLifestyle: {
      michelinStarredVenuesCount: 4,
      fiveStarHotelsCount: 65,
      yachtMarinasAndAviation: ['The Pearl-Qatar Marina', 'Lusail Marina', 'Hamad International Private Jet Terminal'],
      primeResidentialTier: 'Ultra-Prime',
      residencyOrGoldenVisaAvailable: true, // Permanent residency through real estate investment ($200k-$1M+)
      taxNotes: 'Zero personal income tax, zero capital gains tax, zero wealth tax, and zero inheritance tax for individuals.',
    },
  },

  analyticalPeers: {
    economicTwins: ['united-arab-emirates', 'singapore', 'norway'],
    climaticTwins: ['united-arab-emirates', 'egypt'],
    regionalNeighbors: ['united-arab-emirates'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'International Monetary Fund (IMF) World Economic Outlook 2024' },
      { domain: 'Demographics', sourceName: 'Planning and Statistics Authority of Qatar & UN Population Division' },
      { domain: 'Currency', sourceName: 'Qatar Central Bank (QCB) Monetary Policy Law' },
      { domain: 'Safety', sourceName: 'Institute for Economics and Peace (Global Peace Index 2024)' },
      { domain: 'Heritage', sourceName: 'UNESCO World Heritage Centre Inscriptions' },
    ],
  },
};
