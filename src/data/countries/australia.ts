import { CountryProfile } from '../../types/country';

export const AUSTRALIA: CountryProfile = {
  id: 'australia',
  iso2: 'AU',
  iso3: 'AUS',
  unCode: '036',
  name: 'Australia',
  officialName: 'Commonwealth of Australia',
  nativeNames: [
    { languageCode: 'eng', common: 'Australia', official: 'Commonwealth of Australia' },
  ],
  regionId: 'oceania',
  subregionId: 'australasia',
  capital: {
    name: 'Canberra',
    coordinates: [-35.2809, 149.1300],
  },
  majorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast'],
  flag: {
    emoji: '🇦🇺',
    svgUrl: 'https://flagcdn.com/au.svg',
    colors: ['#00008B', '#FFFFFF', '#FF0000'],
    aspectRatio: '1:2',
  },
  tagline: 'Island continent of unique biodiversity, world-leading mineral resources, and pristine ocean lifestyle.',
  overview: 'The world’s smallest continent and largest island, Australia blends ancient Indigenous continuous cultural heritage spanning over 65,000 years with high economic prosperity, world-class biomedical research, and iconic natural wonders.',

  geography: {
    landAreaKm2: 7692024,
    waterPercentage: 0.76,
    coastlineKm: 25760,
    borders: [],
    highestPoint: { name: 'Mount Kosciuszko', elevationMeters: 2228 },
    lowestPoint: { name: 'Lake Eyre', elevationMeters: -15 },
    timezones: ['Australia/Sydney (UTC+10, AEDT UTC+11) and others'],
    coordinates: [-25.2744, 133.7751],
  },

  demographics: {
    population: 26800000,
    populationYear: 2024,
    densityPerKm2: 3.5, // One of the lowest population densities globally
    medianAge: 38.0,
    urbanizationRate: 86.6,
    lifeExpectancyYears: 83.3,
    fertilityRate: 1.58,
    languages: [
      { name: 'English', isOfficial: false, percentSpoken: 72 }, // De facto national language
      { name: 'Mandarin', isOfficial: false, percentSpoken: 2.7 },
      { name: 'Arabic', isOfficial: false, percentSpoken: 1.4 },
    ],
    ageDistribution: {
      under15Percent: 18.1,
      fifteenTo64Percent: 65.1,
      sixtyFivePlusPercent: 16.8,
    },
  },

  economy: {
    gdpNominalUsdBillions: 1720.0,
    gdpPppUsdBillions: 1790.0,
    gdpPerCapitaPppUsd: 66800,
    gdpPerCapitaNominalUsd: 64200,
    realGdpGrowthPercent: 1.5,
    inflationRatePercent: 3.8,
    unemploymentRatePercent: 4.1,
    publicDebtPercentOfGdp: 53.2,
    giniCoefficient: 32.4,
    sovereignWealthFundBillionsUsd: 175.0, // Australian Future Fund
    mainIndustries: [
      'Mining & Critical Minerals (BHP, Rio Tinto — Iron Ore, Lithium, Gold)',
      'Liquefied Natural Gas (LNG) & Energy Export',
      'Banking & Superannuation Asset Management (Four Pillars)',
      'Higher Education Export & Biomedical Research',
      'Agriculture (Beef, Wheat, Wool, Premium Wine)',
    ],
    trade: {
      topExports: ['Iron Ore', 'Coal', 'Liquefied Natural Gas', 'Gold', 'Wheat & Beef'],
      topExportPartners: [
        { country: 'China', sharePercent: 34.5 },
        { country: 'Japan', sharePercent: 15.2 },
        { country: 'South Korea', sharePercent: 6.8 },
        { country: 'India', sharePercent: 5.9 },
      ],
      topImportPartners: [
        { country: 'China', sharePercent: 24.1 },
        { country: 'United States', sharePercent: 11.8 },
        { country: 'Japan', sharePercent: 6.2 },
        { country: 'Germany', sharePercent: 4.9 },
      ],
    },
  },

  currency: {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    fractionalUnit: 'Cent',
    isPegged: false,
    fallbackUsdRate: 1.51,
  },

  education: {
    literacyRatePercent: 99.0,
    tertiaryEnrollmentRatePercent: 104.0,
    educationExpenditurePercentGdp: 5.3,
    topUniversities: [
      {
        name: 'The University of Melbourne',
        globalRankQs: 13, // Ranked #13 globally
        city: 'Melbourne, Victoria',
        notableFields: ['Medicine', 'Law', 'Computer Science'],
      },
      {
        name: 'The University of Sydney',
        globalRankQs: 18,
        city: 'Sydney, New South Wales',
        notableFields: ['Veterinary Science', 'Architecture', 'Business'],
      },
      {
        name: 'Australian National University (ANU)',
        globalRankQs: 30,
        city: 'Canberra, ACT',
        notableFields: ['Public Policy', 'Earth & Marine Sciences', 'Astronomy'],
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 77.2,
    rentIndex: 48.5,
    groceriesIndex: 74.8,
    restaurantPriceIndex: 69.4,
    localPurchasingPowerIndex: 104.8,
    samplePricesUsd: {
      inexpensiveMeal: 17.5,
      midRangeMealTwoPeople: 82.0,
      monthlyOneBedroomCityCenterRent: 1850.0,
      monthlyPassTransit: 115.0,
      coffeeCappuccino: 3.8, // Famous Aussie Flat White
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 22,
    globalPeaceIndexScore: 1.554,
    safetyIndexNumbeo: 57.2,
    crimeIndexNumbeo: 42.8,
    homicideRatePer100k: 0.87,
    politicalStabilityScore: 0.98,
    pressFreedomIndexRank: 39,
  },

  climate: {
    koppenCode: 'Cfb',
    koppenTitle: 'Temperate Oceanic & Arid Desert',
    summary: 'Arid desert in the interior ("The Outback"), tropical wet/dry in the north, and temperate Mediterranean/oceanic along populated southeastern coastal belts.',
    averageAnnualTempCelsius: 18.2,
    averageAnnualRainfallMm: 530,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 23.5, precipitationMm: 102 },
      { month: 'Feb', tempCelsius: 23.4, precipitationMm: 118 },
      { month: 'Mar', tempCelsius: 22.1, precipitationMm: 129 },
      { month: 'Apr', tempCelsius: 19.5, precipitationMm: 126 },
      { month: 'May', tempCelsius: 16.6, precipitationMm: 100 },
      { month: 'Jun', tempCelsius: 14.2, precipitationMm: 132 },
      { month: 'Jul', tempCelsius: 13.4, precipitationMm: 96 },
      { month: 'Aug', tempCelsius: 14.5, precipitationMm: 81 },
      { month: 'Sep', tempCelsius: 17.0, precipitationMm: 68 },
      { month: 'Oct', tempCelsius: 18.9, precipitationMm: 77 },
      { month: 'Nov', tempCelsius: 20.4, precipitationMm: 84 },
      { month: 'Dec', tempCelsius: 22.1, precipitationMm: 77 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 20,
    topLandmarks: [
      {
        name: 'Sydney Opera House',
        location: 'Sydney Harbour',
        category: 'Architectural',
        description: 'Jørn Utzon 20th-century architectural masterpiece with soaring sail shells, one of the most recognized performing arts centers in the world.',
        imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
      {
        name: 'Great Barrier Reef',
        location: 'Queensland Coast',
        category: 'Natural',
        description: 'World’s largest coral reef system spanning 2,300 km with over 2,900 individual reefs, visible from space.',
        imageUrl: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
      {
        name: 'Uluru-Kata Tjuta National Park',
        location: 'Red Centre, Northern Territory',
        category: 'Natural',
        description: 'Sacred red sandstone monolith rising 348 meters above the central desert plain, deeply venerated by the Anangu traditional owners.',
        imageUrl: 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
    ],
    culinaryTraditions: [
      {
        name: 'Specialty Coffee Culture (Flat White)',
        description: 'Pioneered Australian espresso culture focusing on single-origin roasts, microfoam texturing, and vibrant brunch cafes.',
        nationalStatus: true,
      },
      {
        name: 'Barramundi & Sydney Rock Oysters',
        description: 'Native Australian saltwater river perch pan-seared with native herbs like lemon myrtle.',
        nationalStatus: false,
      },
    ],
    culturalNormsAndEtiquette: [
      'Fair go: Cultural ethos emphasizing egalitarianism, mutual respect, and giving everyone an equal chance.',
      'Mateship: Informality and loyalty among peers, often using "mate" in everyday casual dialogue.',
      'Sun safety (Slip, Slop, Slap): Ubiquitous consciousness regarding UV protection.',
    ],
    luxuryLifestyle: {
      fiveStarHotelsCount: 68,
      yachtMarinasAndAviation: ['Sydney Superyacht Marina (Rozelle Bay)', 'Hamilton Island Marina', 'Essendon Fields VIP Jet Terminal'],
      primeResidentialTier: 'High-Prime',
      residencyOrGoldenVisaAvailable: false, // Transitioned towards talent and employer-sponsored streams
      taxNotes: 'Progressive federal income tax on worldwide income for residents.',
    },
  },

  analyticalPeers: {
    economicTwins: ['norway', 'switzerland'],
    climaticTwins: ['united-states', 'brazil'],
    regionalNeighbors: ['singapore'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Australian Bureau of Statistics (ABS) & Reserve Bank of Australia (RBA)' },
      { domain: 'Universities', sourceName: 'QS World University Rankings 2024 (Melbourne #13, Sydney #18)' },
    ],
  },
};
