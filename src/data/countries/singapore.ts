import { CountryProfile } from '../../types/country';

export const SINGAPORE: CountryProfile = {
  id: 'singapore',
  iso2: 'SG',
  iso3: 'SGP',
  unCode: '702',
  name: 'Singapore',
  officialName: 'Republic of Singapore',
  nativeNames: [
    { languageCode: 'eng', common: 'Singapore', official: 'Republic of Singapore' },
    { languageCode: 'zho', common: '新加坡', official: '新加坡共和国' },
    { languageCode: 'msa', common: 'Singapura', official: 'Republik Singapura' },
    { languageCode: 'tam', common: 'சிங்கப்பூர்', official: 'சிங்கப்பூர் குடியரசு' },
  ],
  regionId: 'asia',
  subregionId: 'southeast-asia',
  capital: {
    name: 'Singapore (City-State)',
    coordinates: [1.3521, 103.8198],
  },
  majorCities: ['Singapore Central Area', 'Jurong East', 'Tampines', 'Woodlands'],
  flag: {
    emoji: '🇸🇬',
    svgUrl: 'https://flagcdn.com/sg.svg',
    colors: ['#ED2939', '#FFFFFF'],
    aspectRatio: '2:3',
  },
  tagline: 'Global maritime and financial nexus known as the "Garden City", leading world innovation and trade connectivity.',
  overview: 'Situated at the southern tip of the Malay Peninsula along the critical Strait of Malacca, Singapore has risen from a colonial trading post into an ultra-modern global economic powerhouse, celebrated for its incorruptible governance, botanical urban design, and top-tier education system.',

  geography: {
    landAreaKm2: 734.3,
    waterPercentage: 1.4,
    coastlineKm: 193,
    borders: [],
    highestPoint: { name: 'Bukit Timah', elevationMeters: 163.6 },
    lowestPoint: { name: 'Singapore Strait', elevationMeters: 0 },
    timezones: ['Asia/Singapore (UTC+8)'],
    coordinates: [1.3521, 103.8198],
  },

  demographics: {
    population: 5920000,
    populationYear: 2024,
    densityPerKm2: 8058.0, // Third highest density in the world
    medianAge: 42.8,
    urbanizationRate: 100.0,
    lifeExpectancyYears: 84.1,
    fertilityRate: 0.97,
    languages: [
      { name: 'English', isOfficial: true, percentSpoken: 85 },
      { name: 'Mandarin Chinese', isOfficial: true, percentSpoken: 50 },
      { name: 'Malay', isOfficial: true, percentSpoken: 13 },
      { name: 'Tamil', isOfficial: true, percentSpoken: 4 },
    ],
    ageDistribution: {
      under15Percent: 12.1,
      fifteenTo64Percent: 70.3,
      sixtyFivePlusPercent: 17.6,
    },
  },

  economy: {
    gdpNominalUsdBillions: 501.4,
    gdpPppUsdBillions: 757.0,
    gdpPerCapitaPppUsd: 133700,
    gdpPerCapitaNominalUsd: 84700,
    realGdpGrowthPercent: 2.7,
    inflationRatePercent: 2.4,
    unemploymentRatePercent: 1.9,
    publicDebtPercentOfGdp: 168.0, // Domestic non-debt borrowing for infrastructure assets
    giniCoefficient: 39.8,
    sovereignWealthFundBillionsUsd: 1080.0, // GIC + Temasek Holdings combined
    mainIndustries: [
      'Financial Hub & Asset Management',
      'Advanced Semiconductor Packaging',
      'Biomedical Sciences & Pharmaceuticals',
      'Petrochemical Refining (Jurong Island)',
      'Global Logistics & Maritime Port Management',
    ],
    trade: {
      topExports: ['Integrated Circuits & Chips', 'Refined Petroleum', 'Gold', 'Gas Turbines', 'Medical Equipment'],
      topExportPartners: [
        { country: 'China', sharePercent: 14.8 },
        { country: 'Hong Kong', sharePercent: 12.2 },
        { country: 'United States', sharePercent: 10.4 },
        { country: 'Malaysia', sharePercent: 9.8 },
      ],
      topImportPartners: [
        { country: 'China', sharePercent: 13.5 },
        { country: 'Malaysia', sharePercent: 13.1 },
        { country: 'United States', sharePercent: 10.8 },
        { country: 'Taiwan', sharePercent: 8.6 },
      ],
    },
  },

  currency: {
    code: 'SGD',
    name: 'Singapore Dollar',
    symbol: 'S$',
    fractionalUnit: 'Cent',
    isPegged: false, // Managed float via Monetary Authority of Singapore (MAS) trade-weighted nominal effective exchange rate (S$NEER)
    fallbackUsdRate: 1.34,
  },

  education: {
    literacyRatePercent: 97.6,
    tertiaryEnrollmentRatePercent: 91.0,
    educationExpenditurePercentGdp: 2.8,
    topUniversities: [
      {
        name: 'National University of Singapore (NUS)',
        globalRankQs: 8, // Ranked #8 globally, #1 in Asia
        city: 'Kent Ridge, Singapore',
        notableFields: ['Computer Science & AI', 'Civil Engineering', 'Law', 'Business'],
        websiteUrl: 'https://www.nus.edu.sg',
      },
      {
        name: 'Nanyang Technological University (NTU)',
        globalRankQs: 15,
        city: 'Jurong West, Singapore',
        notableFields: ['Materials Science (Top 3 worldwide)', 'Mechanical Engineering', 'Chemistry'],
        websiteUrl: 'https://www.ntu.edu.sg',
      },
      {
        name: 'Singapore Management University (SMU)',
        globalRankQs: 545,
        city: 'Bras Basah, Singapore',
        notableFields: ['Finance & Accounting', 'Corporate Governance', 'FinTech'],
        websiteUrl: 'https://www.smu.edu.sg',
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 88.5,
    rentIndex: 82.1,
    groceriesIndex: 78.4,
    restaurantPriceIndex: 62.4, // Hawker centers keep casual dining affordable
    localPurchasingPowerIndex: 102.3,
    samplePricesUsd: {
      inexpensiveMeal: 5.2, // Famous Hawker Centre meal
      midRangeMealTwoPeople: 75.0,
      monthlyOneBedroomCityCenterRent: 2650.0,
      monthlyPassTransit: 95.0,
      coffeeCappuccino: 4.8,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 5,
    globalPeaceIndexScore: 1.339,
    safetyIndexNumbeo: 76.5,
    crimeIndexNumbeo: 23.5,
    homicideRatePer100k: 0.12, // One of the absolute lowest in the world
    politicalStabilityScore: 1.55,
    pressFreedomIndexRank: 129,
  },

  climate: {
    koppenCode: 'Af',
    koppenTitle: 'Tropical Rainforest Climate',
    summary: 'Uniform high temperatures, plentiful rainfall, and persistent tropical humidity year-round with no true dry season.',
    averageAnnualTempCelsius: 27.5,
    averageAnnualRainfallMm: 2340,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 26.5, precipitationMm: 243 },
      { month: 'Feb', tempCelsius: 27.1, precipitationMm: 160 },
      { month: 'Mar', tempCelsius: 27.6, precipitationMm: 174 },
      { month: 'Apr', tempCelsius: 28.0, precipitationMm: 179 },
      { month: 'May', tempCelsius: 28.3, precipitationMm: 171 },
      { month: 'Jun', tempCelsius: 28.3, precipitationMm: 130 },
      { month: 'Jul', tempCelsius: 27.9, precipitationMm: 150 },
      { month: 'Aug', tempCelsius: 27.9, precipitationMm: 147 },
      { month: 'Sep', tempCelsius: 27.6, precipitationMm: 157 },
      { month: 'Oct', tempCelsius: 27.6, precipitationMm: 154 },
      { month: 'Nov', tempCelsius: 26.9, precipitationMm: 252 },
      { month: 'Dec', tempCelsius: 26.5, precipitationMm: 318 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 1, // Singapore Botanic Gardens
    topLandmarks: [
      {
        name: 'Marina Bay Sands & SkyPark',
        location: 'Downtown Core',
        category: 'Architectural',
        description: 'Iconic three-tower integrated resort crowned by a 340-meter cantilevered sky park and world-famous infinity pool.',
        imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: false,
      },
      {
        name: 'Gardens by the Bay',
        location: 'Marina South',
        category: 'Architectural',
        description: 'Futuristic 101-hectare botanical park featuring 50-meter Supertree structures and the climate-controlled Cloud Forest dome.',
        imageUrl: 'https://images.unsplash.com/photo-1506351421178-63b52a2d15c2?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: false,
      },
      {
        name: 'Singapore Botanic Gardens',
        location: 'Tanglin',
        category: 'Natural',
        description: '165-year-old tropical botanical garden and UNESCO World Heritage site housing the National Orchid Garden with over 1,000 species.',
        imageUrl: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
    ],
    culinaryTraditions: [
      {
        name: 'Hainanese Chicken Rice',
        description: 'Poached fragrant chicken served over rice cooked in chicken fat, ginger, and pandan broth, with chili garlic dip.',
        nationalStatus: true,
      },
      {
        name: 'Chilli Crab',
        description: 'Mud crab stir-fried in a rich, sweet, and savory tomato-chili egg gravy, eaten with fried mantou buns.',
        nationalStatus: false,
      },
      {
        name: 'Laksa (Katong Laksa)',
        description: 'Spicy coconut milk noodle soup flavored with dried shrimp and sambal, served with cockles, prawns, and fish cakes.',
        nationalStatus: false,
      },
    ],
    culturalNormsAndEtiquette: [
      'Choping: Reserving seats at hawker centres using tissue packets is a widely accepted civic custom.',
      'Chewing gum ban: Strict civic cleanliness laws protect public infrastructure and urban aesthetics.',
      'Multicultural harmony: Religious harmony and racial equality are legally and culturally reinforced.',
      'Escalator etiquette: Stand on the left to allow commuters to pass on the right.',
    ],
    luxuryLifestyle: {
      michelinStarredVenuesCount: 55,
      fiveStarHotelsCount: 72,
      yachtMarinasAndAviation: ['ONE°15 Marina Sentosa Cove', 'Marina at Keppel Bay', 'Seletar Airport Private Jet Hub'],
      primeResidentialTier: 'Ultra-Prime',
      residencyOrGoldenVisaAvailable: true, // Global Investor Programme (GIP)
      taxNotes: 'Territorial tax system with zero capital gains tax and zero dividend withholding tax.',
    },
  },

  analyticalPeers: {
    economicTwins: ['qatar', 'switzerland', 'united-arab-emirates'],
    climaticTwins: ['brazil'],
    regionalNeighbors: ['japan'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Department of Statistics Singapore (SingStat) & IMF 2024' },
      { domain: 'Universities', sourceName: 'QS World University Rankings 2024 (NUS #8, NTU #15)' },
      { domain: 'Safety', sourceName: 'Singapore Police Force Annual Crime Statistics & GPI 2024' },
    ],
  },
};
