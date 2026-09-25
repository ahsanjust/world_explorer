import { CountryProfile } from '../../types/country';

export const TURKEY: CountryProfile = {
  id: 'turkey',
  iso2: 'TR',
  iso3: 'TUR',
  unCode: '792',
  name: 'Türkiye',
  officialName: 'Republic of Türkiye',
  nativeNames: [
    { languageCode: 'tur', common: 'Türkiye', official: 'Türkiye Cumhuriyeti' },
  ],
  regionId: 'middle-east',
  subregionId: 'anatolia-mesopotamia-iran',
  capital: {
    name: 'Ankara',
    coordinates: [39.9334, 32.8597],
  },
  majorCities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya', 'Adana', 'Gaziantep', 'Konya'],
  flag: {
    emoji: '🇹🇷',
    svgUrl: 'https://flagcdn.com/tr.svg',
    colors: ['#E30A17', '#FFFFFF'],
    aspectRatio: '2:3',
  },
  tagline: 'Transcontinental Anatolian nexus uniting Europe and Asia across the historic Bosporus Strait with massive manufacturing and civilizational depth.',
  overview: 'Situated at the crossroads of Southeast Europe and West Asia, Türkiye controls the strategic Turkish Straits (Bosporus and Dardanelles) connecting the Black Sea to the Mediterranean. Heir to the Byzantine and Ottoman empires, modern Türkiye combines deep archaeological heritage with powerful industrial manufacturing, aerospace engineering, defense tech, and global aviation logistics.',

  geography: {
    landAreaKm2: 783562,
    waterPercentage: 1.3,
    coastlineKm: 7200,
    borders: [
      { iso3: 'GRC', name: 'Greece', lengthKm: 206 },
      { iso3: 'BGR', name: 'Bulgaria', lengthKm: 240 },
      { iso3: 'GEO', name: 'Georgia', lengthKm: 252 },
      { iso3: 'ARM', name: 'Armenia', lengthKm: 268 },
      { iso3: 'AZE', name: 'Azerbaijan', lengthKm: 9 },
      { iso3: 'IRN', name: 'Iran', lengthKm: 499 },
      { iso3: 'IRQ', name: 'Iraq', lengthKm: 352 },
      { iso3: 'SYR', name: 'Syria', lengthKm: 822 },
    ],
    highestPoint: { name: 'Mount Ararat (Ağrı Dağı)', elevationMeters: 5137 },
    lowestPoint: { name: 'Mediterranean Sea', elevationMeters: 0 },
    timezones: ['Europe/Istanbul (UTC+3)'],
    coordinates: [38.9637, 35.2433],
  },

  demographics: {
    population: 85300000,
    populationYear: 2024,
    densityPerKm2: 108.8,
    medianAge: 33.5,
    urbanizationRate: 77.5,
    lifeExpectancyYears: 78.6,
    fertilityRate: 1.51,
    languages: [
      { name: 'Turkish', isOfficial: true, percentSpoken: 90 },
      { name: 'Kurdish', isOfficial: false, percentSpoken: 12 },
    ],
    ageDistribution: {
      under15Percent: 21.4,
      fifteenTo64Percent: 68.9,
      sixtyFivePlusPercent: 9.7,
    },
  },

  economy: {
    gdpNominalUsdBillions: 1154.0,
    gdpPppUsdBillions: 3570.0,
    gdpPerCapitaPppUsd: 41400,
    gdpPerCapitaNominalUsd: 13400,
    realGdpGrowthPercent: 3.2,
    inflationRatePercent: 48.6,
    unemploymentRatePercent: 8.8,
    publicDebtPercentOfGdp: 29.5,
    giniCoefficient: 41.5,
    sovereignWealthFundBillionsUsd: 55.0, // Turkey Wealth Fund (TWF)
    mainIndustries: [
      'Automotive & Commercial Vehicles',
      'Aerospace & Unmanned Aerial Systems (Baykar/TAI)',
      'Textiles & Apparel Manufacturing',
      'Iron, Steel & Construction Materials',
      'Consumer Electronics & Home Appliances',
      'Tourism & Hospitality',
    ],
    trade: {
      topExports: ['Motor Vehicles & Parts', 'Machinery & Boilers', 'Iron and Steel', 'Apparel & Knitwear', 'Electrical Equipment'],
      topExportPartners: [
        { country: 'Germany', sharePercent: 8.5 },
        { country: 'United States', sharePercent: 6.0 },
        { country: 'United Kingdom', sharePercent: 5.5 },
        { country: 'Italy', sharePercent: 5.2 },
      ],
      topImportPartners: [
        { country: 'Russia', sharePercent: 12.5 },
        { country: 'China', sharePercent: 12.0 },
        { country: 'Germany', sharePercent: 8.0 },
      ],
    },
  },

  currency: {
    code: 'TRY',
    name: 'Turkish Lira',
    symbol: '₺',
    fractionalUnit: 'Kuruş',
    isPegged: false,
    fallbackUsdRate: 34.2,
  },

  education: {
    literacyRatePercent: 97.4,
    tertiaryEnrollmentRatePercent: 115.0,
    educationExpenditurePercentGdp: 4.1,
    topUniversities: [
      {
        name: 'Middle East Technical University (ODTÜ)',
        globalRankQs: 336,
        city: 'Ankara',
        notableFields: ['Engineering', 'Computer Science', 'Physics'],
        websiteUrl: 'https://www.metu.edu.tr',
      },
      {
        name: 'Istanbul Technical University (İTÜ)',
        globalRankQs: 404,
        city: 'Istanbul',
        notableFields: ['Civil Engineering', 'Naval Architecture', 'Mining Engineering'],
        websiteUrl: 'https://www.itu.edu.tr',
      },
      {
        name: 'Koç University',
        globalRankQs: 401,
        city: 'Istanbul',
        notableFields: ['Medicine', 'Business Administration', 'Social Sciences'],
        websiteUrl: 'https://www.ku.edu.tr',
      },
      {
        name: 'Boğaziçi University',
        globalRankQs: 418,
        city: 'Istanbul',
        notableFields: ['Electrical Engineering', 'Economics', 'Philosophy'],
        websiteUrl: 'https://www.boun.edu.tr',
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 38.2,
    rentIndex: 16.5,
    groceriesIndex: 35.8,
    restaurantPriceIndex: 32.4,
    localPurchasingPowerIndex: 38.6,
    samplePricesUsd: {
      inexpensiveMeal: 6.0,
      midRangeMealTwoPeople: 32.0,
      monthlyOneBedroomCityCenterRent: 550.0,
      monthlyPassTransit: 32.0,
      coffeeCappuccino: 2.8,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 139,
    globalPeaceIndexScore: 2.78,
    safetyIndexNumbeo: 59.4,
    crimeIndexNumbeo: 40.6,
    homicideRatePer100k: 2.5,
    politicalStabilityScore: -1.25,
    pressFreedomIndexRank: 158,
  },

  climate: {
    koppenCode: 'Csa',
    koppenTitle: 'Mediterranean to Continental Steppe',
    summary: 'Diverse temperate climate ranging from warm Mediterranean coastal plains along the Aegean and Riviera, to humid subtropical Black Sea coasts, and semi-arid continental conditions with snowy winters on the central Anatolian plateau.',
    averageAnnualTempCelsius: 12.0,
    averageAnnualRainfallMm: 580,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 0.8, precipitationMm: 42 },
      { month: 'Feb', tempCelsius: 2.6, precipitationMm: 37 },
      { month: 'Mar', tempCelsius: 6.8, precipitationMm: 39 },
      { month: 'Apr', tempCelsius: 11.9, precipitationMm: 48 },
      { month: 'May', tempCelsius: 16.5, precipitationMm: 52 },
      { month: 'Jun', tempCelsius: 20.8, precipitationMm: 36 },
      { month: 'Jul', tempCelsius: 24.3, precipitationMm: 15 },
      { month: 'Aug', tempCelsius: 24.2, precipitationMm: 12 },
      { month: 'Sep', tempCelsius: 19.3, precipitationMm: 18 },
      { month: 'Oct', tempCelsius: 13.7, precipitationMm: 31 },
      { month: 'Nov', tempCelsius: 7.8, precipitationMm: 35 },
      { month: 'Dec', tempCelsius: 3.0, precipitationMm: 45 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 21,
    topLandmarks: [
      {
        name: 'Hagia Sophia (Ayasofya-i Kebir Cami-i Şerifi)',
        location: 'Istanbul',
        category: 'Historical',
        description: 'Monumental 6th-century architectural masterpiece built by Emperor Justinian, featuring revolutionary pendentive dome engineering and historic Islamic calligraphy medallions.',
        imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop',
        unescoDesignated: true,
      },
      {
        name: 'Cappadocia & Göreme National Park',
        location: 'Nevşehir, Central Anatolia',
        category: 'Natural',
        description: 'Spectacular eroded volcanic landscape famous for fairy chimneys, subterranean troglodyte cities, and early Christian rock-cut fresco sanctuaries.',
        imageUrl: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&auto=format&fit=crop',
        unescoDesignated: true,
      },
      {
        name: 'Ephesus (Efes)',
        location: 'İzmir Province',
        category: 'Historical',
        description: 'Magnificent Greco-Roman archaeological metropolis featuring the Library of Celsus, the Great Theatre, and the ruins of the Temple of Artemis.',
        imageUrl: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800&auto=format&fit=crop',
        unescoDesignated: true,
      },
    ],
    culinaryTraditions: [
      { name: 'Kebap & Meze', description: 'Renowned slow-grilled meats including Adana and İskender kebaps accompanied by rich spreads of hummus, haydari, and warm pide.' },
      { name: 'Baklava', description: 'Delicate multilayered filo pastry layered with Antep pistachios and infused with clarified butter and sugar syrup.', nationalStatus: true },
      { name: 'Türk Kahvesi & Çay', description: 'Unfiltered fine-ground Turkish coffee brewed in a copper cezve, paired with black Rize tea served in iconic tulip glasses.' },
    ],
    culturalNormsAndEtiquette: [
      'Turkish hospitality (Misafirperverlik) is sacred; tea is immediately offered upon arriving at any home or office.',
      'Remove footwear before stepping onto carpeted residential areas or entering sacred mosques.',
      'Respectful treatment of elders (respectful greeting and hand-kissing gesture) is deeply embedded.',
    ],
    luxuryLifestyle: {
      michelinStarredVenuesCount: 12,
      fiveStarHotelsCount: 220,
      yachtMarinasAndAviation: [
        'Yalıkavak Marina Bodrum (Superyacht marina of the year)',
        'D-Marin Göcek & Marmaris Yacht Marina',
        'Istanbul Airport (IST) General Aviation & CIP Private Terminals',
      ],
      primeResidentialTier: 'High-Prime',
      residencyOrGoldenVisaAvailable: true,
      taxNotes: 'Standard progressive income tax; real estate citizenship investment program available.',
    },
  },

  analyticalPeers: {
    economicTwins: ['saudi-arabia', 'egypt'],
    climaticTwins: ['cyprus', 'jordan', 'lebanon'],
    regionalNeighbors: ['iran', 'iraq', 'syria', 'georgia', 'armenia', 'azerbaijan'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Turkish Statistical Institute (TÜİK) & Central Bank of the Republic of Turkey (TCMB)', referenceUrl: 'https://www.tuik.gov.tr' },
      { domain: 'Macro', sourceName: 'International Monetary Fund (IMF) World Economic Outlook 2024', referenceUrl: 'https://www.imf.org' },
      { domain: 'Heritage', sourceName: 'UNESCO World Heritage List', referenceUrl: 'https://whc.unesco.org' },
    ],
  },
};
