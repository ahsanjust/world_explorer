import { CountryProfile } from '../../types/country';

export const UNITED_KINGDOM: CountryProfile = {
  id: 'united-kingdom',
  iso2: 'GB',
  iso3: 'GBR',
  unCode: '826',
  name: 'United Kingdom',
  officialName: 'United Kingdom of Great Britain and Northern Ireland',
  nativeNames: [
    { languageCode: 'eng', common: 'United Kingdom', official: 'United Kingdom of Great Britain and Northern Ireland' },
  ],
  regionId: 'europe',
  subregionId: 'northern-europe',
  capital: {
    name: 'London',
    coordinates: [51.5074, -0.1278],
  },
  majorCities: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow', 'Bristol'],
  flag: {
    emoji: '🇬🇧',
    svgUrl: 'https://flagcdn.com/gb.svg',
    colors: ['#012169', '#C8102E', '#FFFFFF'],
    aspectRatio: '1:2',
  },
  tagline: 'Island nation and historic financial capital, celebrated for world-leading universities, parliamentary law, and cultural reach.',
  overview: 'Encompassing England, Scotland, Wales, and Northern Ireland off the northwest coast of mainland Europe, the United Kingdom blends centuries of constitutional history, global financial markets, Shakespearean literary heritage, and premier scientific discovery.',

  geography: {
    landAreaKm2: 242495,
    waterPercentage: 1.34,
    coastlineKm: 12429,
    borders: [
      { iso3: 'IRL', name: 'Ireland', lengthKm: 499 },
    ],
    highestPoint: { name: 'Ben Nevis', elevationMeters: 1345 },
    lowestPoint: { name: 'The Fens', elevationMeters: -4 },
    timezones: ['Europe/London (UTC+0, BST UTC+1)'],
    coordinates: [55.3781, -3.4360],
  },

  demographics: {
    population: 68300000,
    populationYear: 2024,
    densityPerKm2: 281.6,
    medianAge: 40.7,
    urbanizationRate: 84.4,
    lifeExpectancyYears: 81.3,
    fertilityRate: 1.56,
    languages: [
      { name: 'English', isOfficial: true, percentSpoken: 98 },
      { name: 'Welsh', isOfficial: true, percentSpoken: 1.5 },
      { name: 'Scots / Gaelic', isOfficial: true, percentSpoken: 1.0 },
    ],
    ageDistribution: {
      under15Percent: 17.4,
      fifteenTo64Percent: 63.7,
      sixtyFivePlusPercent: 18.9,
    },
  },

  economy: {
    gdpNominalUsdBillions: 3495.0,
    gdpPppUsdBillions: 4030.0,
    gdpPerCapitaPppUsd: 58900,
    gdpPerCapitaNominalUsd: 51100,
    realGdpGrowthPercent: 1.1,
    inflationRatePercent: 2.2,
    unemploymentRatePercent: 4.2,
    publicDebtPercentOfGdp: 101.2,
    giniCoefficient: 35.1,
    mainIndustries: [
      'Global Financial Services & FinTech (City of London)',
      'Pharmaceuticals & Biotechnology (AstraZeneca, GSK)',
      'Aerospace & Defense (Rolls-Royce, BAE Systems)',
      'Creative Industries & Digital Media',
      'Automotive Engineering & Formula 1 Racing Technology',
    ],
    trade: {
      topExports: ['Financial Services', 'Cars', 'Gas turbines', 'Crude Petroleum', 'Medicinal mixtures'],
      topExportPartners: [
        { country: 'United States', sharePercent: 21.0 },
        { country: 'Germany', sharePercent: 7.8 },
        { country: 'Netherlands', sharePercent: 6.9 },
        { country: 'Ireland', sharePercent: 6.2 },
      ],
      topImportPartners: [
        { country: 'United States', sharePercent: 12.8 },
        { country: 'Germany', sharePercent: 11.9 },
        { country: 'China', sharePercent: 10.4 },
        { country: 'Netherlands', sharePercent: 7.8 },
      ],
    },
  },

  currency: {
    code: 'GBP',
    name: 'Pound Sterling',
    symbol: '£',
    fractionalUnit: 'Penny / Pence',
    isPegged: false,
    fallbackUsdRate: 0.79,
  },

  education: {
    literacyRatePercent: 99.0,
    tertiaryEnrollmentRatePercent: 72.0,
    educationExpenditurePercentGdp: 5.5,
    topUniversities: [
      {
        name: 'Imperial College London',
        globalRankQs: 2, // Ranked #2 globally
        city: 'London',
        notableFields: ['Engineering', 'Data Science', 'Infectious Disease Modeling'],
        websiteUrl: 'https://www.imperial.ac.uk',
      },
      {
        name: 'University of Oxford',
        globalRankQs: 3,
        city: 'Oxford',
        notableFields: ['Philosophy, Politics & Economics (PPE)', 'Medicine', 'Literature'],
        websiteUrl: 'https://www.ox.ac.uk',
      },
      {
        name: 'University of Cambridge',
        globalRankQs: 5,
        city: 'Cambridge',
        notableFields: ['Mathematics (Newton Alma Mater)', 'Physics', 'Biochemistry'],
        websiteUrl: 'https://www.cam.ac.uk',
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 72.4,
    rentIndex: 42.6,
    groceriesIndex: 61.5,
    restaurantPriceIndex: 74.2,
    localPurchasingPowerIndex: 91.5,
    samplePricesUsd: {
      inexpensiveMeal: 18.0,
      midRangeMealTwoPeople: 75.0,
      monthlyOneBedroomCityCenterRent: 1950.0,
      monthlyPassTransit: 180.0, // London Tube Zone 1-3
      coffeeCappuccino: 4.5,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 34,
    globalPeaceIndexScore: 1.662,
    safetyIndexNumbeo: 53.8,
    crimeIndexNumbeo: 46.2,
    homicideRatePer100k: 1.0,
    politicalStabilityScore: 0.45,
    pressFreedomIndexRank: 23,
  },

  climate: {
    koppenCode: 'Cfb',
    koppenTitle: 'Temperate Maritime',
    summary: 'Cool, maritime climate moderated by the North Atlantic Current, featuring overcast skies, frequent light precipitation, and mild temperatures.',
    averageAnnualTempCelsius: 10.5,
    averageAnnualRainfallMm: 620,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 5.2, precipitationMm: 55 },
      { month: 'Feb', tempCelsius: 5.5, precipitationMm: 41 },
      { month: 'Mar', tempCelsius: 7.9, precipitationMm: 42 },
      { month: 'Apr', tempCelsius: 10.4, precipitationMm: 43 },
      { month: 'May', tempCelsius: 13.8, precipitationMm: 48 },
      { month: 'Jun', tempCelsius: 16.9, precipitationMm: 49 },
      { month: 'Jul', tempCelsius: 19.2, precipitationMm: 45 },
      { month: 'Aug', tempCelsius: 18.9, precipitationMm: 52 },
      { month: 'Sep', tempCelsius: 15.8, precipitationMm: 51 },
      { month: 'Oct', tempCelsius: 12.0, precipitationMm: 68 },
      { month: 'Nov', tempCelsius: 8.1, precipitationMm: 63 },
      { month: 'Dec', tempCelsius: 5.7, precipitationMm: 57 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 33,
    topLandmarks: [
      {
        name: 'Tower of London & Tower Bridge',
        location: 'London',
        category: 'Historical',
        description: 'Historic Norman fortress beside the River Thames housing the Crown Jewels and 900 years of royal British intrigue.',
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
      {
        name: 'Stonehenge',
        location: 'Wiltshire',
        category: 'Historical',
        description: 'Enigmatic prehistoric megalithic stone circle constructed between 3000 BC and 2000 BC aligned with the solstices.',
        imageUrl: 'https://images.unsplash.com/photo-1599833975787-5c143f373c30?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
    ],
    culinaryTraditions: [
      {
        name: 'Sunday Roast & Yorkshire Pudding',
        description: 'Roast beef with roasted potatoes, seasonal vegetables, rich gravy, and puffed baked Yorkshire pudding.',
        nationalStatus: true,
      },
      {
        name: 'Fish and Chips',
        description: 'Battered fresh Atlantic cod served with thick-cut malt-vinegared chips and mushy peas.',
        nationalStatus: false,
      },
    ],
    culturalNormsAndEtiquette: [
      'Queuing: Cutting into an established line is considered a major social transgression.',
      'Politeness and queuing: Apologizing and thanking drivers or clerks is reflexively expected.',
      'Pub culture: Ordering drinks at the bar counter rather than waiting for table service.',
    ],
    luxuryLifestyle: {
      michelinStarredVenuesCount: 188,
      fiveStarHotelsCount: 135,
      yachtMarinasAndAviation: ['St Katharine Docks London', 'Farnborough Airport (Dedicated Business Aviation)'],
      primeResidentialTier: 'Ultra-Prime',
      residencyOrGoldenVisaAvailable: false, // Innovator Founder visa route
      taxNotes: 'UK tax reform phasing out non-domiciled status in favor of residence-based regime.',
    },
  },

  analyticalPeers: {
    economicTwins: ['germany', 'japan'],
    climaticTwins: ['germany', 'norway'],
    regionalNeighbors: ['norway', 'germany'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Office for National Statistics (ONS) & Bank of England' },
      { domain: 'Universities', sourceName: 'QS World University Rankings 2024 (Imperial #2, Oxford #3, Cambridge #5)' },
    ],
  },
};
