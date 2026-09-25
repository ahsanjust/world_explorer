import { CountryProfile } from '../../types/country';

export const MOROCCO: CountryProfile = {
  id: 'morocco',
  iso2: 'MA',
  iso3: 'MAR',
  unCode: '504',
  name: 'Morocco',
  officialName: 'Kingdom of Morocco',
  nativeNames: [
    { languageCode: 'ara', common: 'المغرب', official: 'المملكة المغربية' },
    { languageCode: 'ber', common: 'ⵍⵎⵖⵔⵉⴱ', official: 'ⵜⴰⴳⵍⴷⵉⵜ ⵏ ⵍⵎⵖⵔⵉⴱ' },
  ],
  regionId: 'middle-east',
  subregionId: 'north-africa',
  capital: {
    name: 'Rabat',
    coordinates: [34.0209, -6.8416],
  },
  majorCities: ['Casablanca', 'Rabat', 'Fez', 'Marrakech', 'Tangier', 'Agadir', 'Meknes', 'Oujda'],
  flag: {
    emoji: '🇲🇦',
    svgUrl: 'https://flagcdn.com/ma.svg',
    colors: ['#C1272D', '#006233'],
    aspectRatio: '2:3',
  },
  tagline: 'Atlantic-Mediterranean kingdom safeguarding twelve centuries of royal dynasty, imperial cities, and the historic Strait of Gibraltar gateway.',
  overview: 'Anchoring the northwestern edge of Africa where the Mediterranean meets the Atlantic Ocean, Morocco is an ancient constitutional monarchy with a rich Berber, Arab, Saharan, and Andalusian heritage. As a modern industrial and diplomatic hub, Morocco is home to Africa’s busiest container port (Tanger Med), the world’s largest phosphate reserves, massive solar complexes (Noor Ouarzazate), and the world’s oldest continuously operating university (Al-Qarawiyyin).',

  geography: {
    landAreaKm2: 446550,
    waterPercentage: 0.05,
    coastlineKm: 1835,
    borders: [
      { iso3: 'DZA', name: 'Algeria', lengthKm: 1559 },
      { iso3: 'ESP', name: 'Spain (Ceuta & Melilla)', lengthKm: 18 },
    ],
    highestPoint: { name: 'Toubkal (High Atlas)', elevationMeters: 4167 },
    lowestPoint: { name: 'Sebkha Tah', elevationMeters: -55 },
    timezones: ['Africa/Casablanca (UTC+1)'],
    coordinates: [31.7917, -7.0926],
  },

  demographics: {
    population: 37500000,
    populationYear: 2024,
    densityPerKm2: 84.0,
    medianAge: 30.2,
    urbanizationRate: 64.6,
    lifeExpectancyYears: 74.3,
    fertilityRate: 2.3,
    languages: [
      { name: 'Arabic', isOfficial: true, percentSpoken: 92 },
      { name: 'Tamazight (Berber)', isOfficial: true, percentSpoken: 28 },
      { name: 'French', isOfficial: false, percentSpoken: 65 },
    ],
    ageDistribution: {
      under15Percent: 25.8,
      fifteenTo64Percent: 66.8,
      sixtyFivePlusPercent: 7.4,
    },
  },

  economy: {
    gdpNominalUsdBillions: 152.0,
    gdpPppUsdBillions: 385.0,
    gdpPerCapitaPppUsd: 10400,
    gdpPerCapitaNominalUsd: 4100,
    realGdpGrowthPercent: 3.1,
    inflationRatePercent: 1.8,
    unemploymentRatePercent: 11.2,
    publicDebtPercentOfGdp: 69.5,
    giniCoefficient: 39.5,
    mainIndustries: [
      'Automotive Manufacturing (Renault & Stellantis)',
      'Phosphate Mining & Fertilizers (OCP Group)',
      'Aerospace Components & Precision Engineering',
      'Renewable Energy (Solar & Wind)',
      'Agribusiness & Citrus Exports',
      'Tourism & Handicrafts',
    ],
    trade: {
      topExports: ['Motor Cars & Wiring Assemblies', 'Phosphoric Acid & Fertilizers', 'Apparel & Knitwear', 'Inorganic Chemicals'],
      topExportPartners: [
        { country: 'Spain', sharePercent: 21.0 },
        { country: 'France', sharePercent: 19.5 },
        { country: 'India', sharePercent: 6.0 },
        { country: 'Italy', sharePercent: 4.8 },
      ],
      topImportPartners: [
        { country: 'Spain', sharePercent: 15.0 },
        { country: 'China', sharePercent: 10.5 },
        { country: 'France', sharePercent: 10.0 },
      ],
    },
  },

  currency: {
    code: 'MAD',
    name: 'Moroccan Dirham',
    symbol: 'د.م.',
    fractionalUnit: 'Santim',
    isPegged: false, // Pegged to currency basket: 60% EUR, 40% USD
    fallbackUsdRate: 9.85,
  },

  education: {
    literacyRatePercent: 77.2,
    tertiaryEnrollmentRatePercent: 43.8,
    educationExpenditurePercentGdp: 5.6,
    topUniversities: [
      {
        name: 'University of al-Qarawiyyin',
        globalRankQs: 701,
        city: 'Fez',
        notableFields: ['Oldest Continually Operating University (859 CE)', 'Islamic Law & Jurisprudence', 'Linguistics'],
        websiteUrl: 'http://uaq.ma',
      },
      {
        name: 'Mohammed V University',
        globalRankQs: 801,
        city: 'Rabat',
        notableFields: ['Medicine', 'Law', 'Engineering & Applied Sciences'],
        websiteUrl: 'http://www.um5.ac.ma',
      },
      {
        name: 'Cadi Ayyad University',
        globalRankQs: 1001,
        city: 'Marrakech',
        notableFields: ['Astronomy & Physics', 'Environmental Sciences', 'Materials Science'],
        websiteUrl: 'https://www.uca.ma',
      },
      {
        name: 'Al Akhawayn University',
        globalRankQs: 950,
        city: 'Ifrane',
        notableFields: ['Computer Science', 'Business Administration', 'International Relations'],
        websiteUrl: 'http://www.aui.ma',
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 32.4,
    rentIndex: 11.2,
    groceriesIndex: 30.5,
    restaurantPriceIndex: 24.8,
    localPurchasingPowerIndex: 31.8,
    samplePricesUsd: {
      inexpensiveMeal: 3.8,
      midRangeMealTwoPeople: 22.0,
      monthlyOneBedroomCityCenterRent: 380.0,
      monthlyPassTransit: 22.0,
      coffeeCappuccino: 1.8,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 84,
    globalPeaceIndexScore: 2.01,
    safetyIndexNumbeo: 54.8,
    crimeIndexNumbeo: 45.2,
    homicideRatePer100k: 1.3,
    politicalStabilityScore: -0.28,
    pressFreedomIndexRank: 129,
  },

  climate: {
    koppenCode: 'Csa',
    koppenTitle: 'Mediterranean to Semi-Arid Oceanic',
    summary: 'Warm Mediterranean climate along the Atlantic and Mediterranean coasts with mild wet winters and dry sunny summers, transitioning to arid steppe and Saharan desert climates inland beyond the Atlas mountain range.',
    averageAnnualTempCelsius: 17.5,
    averageAnnualRainfallMm: 520,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 12.3, precipitationMm: 68 },
      { month: 'Feb', tempCelsius: 13.5, precipitationMm: 55 },
      { month: 'Mar', tempCelsius: 15.2, precipitationMm: 48 },
      { month: 'Apr', tempCelsius: 17.0, precipitationMm: 38 },
      { month: 'May', tempCelsius: 19.8, precipitationMm: 18 },
      { month: 'Jun', tempCelsius: 22.4, precipitationMm: 4 },
      { month: 'Jul', tempCelsius: 24.8, precipitationMm: 1 },
      { month: 'Aug', tempCelsius: 25.1, precipitationMm: 1 },
      { month: 'Sep', tempCelsius: 23.6, precipitationMm: 12 },
      { month: 'Oct', tempCelsius: 20.4, precipitationMm: 45 },
      { month: 'Nov', tempCelsius: 16.2, precipitationMm: 75 },
      { month: 'Dec', tempCelsius: 13.0, precipitationMm: 80 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 9,
    topLandmarks: [
      {
        name: 'Medina of Fez (Fes el-Bali)',
        location: 'Fez',
        category: 'Historical',
        description: 'World’s largest contiguous car-free urban zone, founded in the 9th century, home to thousands of winding alleyways, historic madrasas, and the Chouara Tannery.',
        imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop',
        unescoDesignated: true,
      },
      {
        name: 'Hassan II Mosque',
        location: 'Casablanca',
        category: 'Architectural',
        description: 'Monumental oceanfront mosque with a 210-meter minaret (one of the tallest in the world), featuring a glass floor revealing the Atlantic tides below.',
        imageUrl: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&auto=format&fit=crop',
        unescoDesignated: false,
      },
      {
        name: 'Ksar of Ait-Ben-Haddou',
        location: 'Ouarzazate Province',
        category: 'Historical',
        description: 'Iconic traditional pre-Saharan earthen clay fortress along the historic trans-Saharan caravan route between Marrakech and the Sudan.',
        imageUrl: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&auto=format&fit=crop',
        unescoDesignated: true,
      },
    ],
    culinaryTraditions: [
      { name: 'Tagine', description: 'Slow-simmered savory stew of lamb, poultry, or vegetables cooked in a traditional conical earthenware pot with preserved lemons and saffron.', nationalStatus: true },
      { name: 'Couscous Royale', description: 'Hand-rolled steamed semolina grains served on Fridays with seven vegetables, tender meat, and aromatic bouillon.' },
      { name: 'Maghrebi Mint Tea (Atay)', description: 'Ceremonial green gunpowder tea steeped with fresh spearmint leaves and poured from height into ornate glasses.' },
    ],
    culturalNormsAndEtiquette: [
      'Warm greetings with inquiries regarding family wellbeing are customary before initiating business discussions.',
      'Accepting freshly poured mint tea is an essential courtesy that solidifies personal rapport.',
      'Dining traditionally from a shared communal tagine using the right hand and fresh khobz bread is widespread.',
    ],
    luxuryLifestyle: {
      fiveStarHotelsCount: 85,
      yachtMarinasAndAviation: [
        'Marina Bouregreg (Rabat-Salé)',
        'Tanja Marina Bay (Tangier Strait of Gibraltar)',
        'Casablanca Mohammed V VIP Aviation Terminal',
      ],
      primeResidentialTier: 'Established',
      residencyOrGoldenVisaAvailable: false,
      taxNotes: 'Territorial taxation with international tax treaties; incentives for export manufacturers in free trade zones.',
    },
  },

  analyticalPeers: {
    economicTwins: ['egypt', 'tunisia', 'jordan'],
    climaticTwins: ['turkey', 'cyprus', 'lebanon'],
    regionalNeighbors: ['algeria', 'tunisia', 'libya', 'egypt'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Haut-Commissariat au Plan (HCP) & Bank Al-Maghrib (Central Bank)', referenceUrl: 'https://www.hcp.ma' },
      { domain: 'Macro', sourceName: 'International Monetary Fund (IMF) World Economic Outlook 2024', referenceUrl: 'https://www.imf.org' },
      { domain: 'Heritage', sourceName: 'UNESCO World Heritage List', referenceUrl: 'https://whc.unesco.org' },
    ],
  },
};
