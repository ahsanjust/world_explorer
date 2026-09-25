import { CountryProfile } from '../../types/country';

export const OMAN: CountryProfile = {
  id: 'oman',
  iso2: 'OM',
  iso3: 'OMN',
  unCode: '512',
  name: 'Oman',
  officialName: 'Sultanate of Oman',
  nativeNames: [
    { languageCode: 'ara', common: 'عُمان', official: 'سلطنة عُمان' },
  ],
  regionId: 'middle-east',
  subregionId: 'arabian-peninsula',
  capital: {
    name: 'Muscat',
    coordinates: [23.5880, 58.3829],
  },
  majorCities: ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Seeb', 'Bawshar'],
  flag: {
    emoji: '🇴🇲',
    svgUrl: 'https://flagcdn.com/om.svg',
    colors: ['#EF3340', '#009739', '#FFFFFF'],
    aspectRatio: '1:2',
  },
  tagline: 'Maritime maritime sultanate commanding the Strait of Hormuz, celebrated for neutral diplomacy, frankincense heritage, and dramatic fjordlands.',
  overview: 'Positioned strategically at the mouth of the Persian Gulf along the Arabian Sea and the Gulf of Oman, the Sultanate of Oman is one of the oldest independent states in the Arab world. Renowned for its principled foreign policy neutrality, authentic Islamic architecture with zero skyscraper mandates in its capital, and the lush monsoon (Khareef) subtropical microclimate of Salalah.',

  geography: {
    landAreaKm2: 309500,
    waterPercentage: 0.0,
    coastlineKm: 2092,
    borders: [
      { iso3: 'ARE', name: 'United Arab Emirates', lengthKm: 410 },
      { iso3: 'SAU', name: 'Saudi Arabia', lengthKm: 676 },
      { iso3: 'YEM', name: 'Yemen', lengthKm: 288 },
    ],
    highestPoint: { name: 'Jabal Shams (Mountain of the Sun)', elevationMeters: 3009 },
    lowestPoint: { name: 'Arabian Sea', elevationMeters: 0 },
    timezones: ['Asia/Muscat (UTC+4)'],
    coordinates: [21.4735, 55.9754],
  },

  demographics: {
    population: 4650000,
    populationYear: 2024,
    densityPerKm2: 15.0,
    medianAge: 31.0,
    urbanizationRate: 87.0,
    lifeExpectancyYears: 78.5,
    fertilityRate: 2.6,
    languages: [
      { name: 'Arabic', isOfficial: true, percentSpoken: 100 },
      { name: 'English', isOfficial: false, percentSpoken: 80 },
    ],
    ageDistribution: {
      under15Percent: 21.8,
      fifteenTo64Percent: 74.4,
      sixtyFivePlusPercent: 3.8,
    },
  },

  economy: {
    gdpNominalUsdBillions: 110.5,
    gdpPppUsdBillions: 195.0,
    gdpPerCapitaPppUsd: 42200,
    gdpPerCapitaNominalUsd: 23800,
    realGdpGrowthPercent: 2.4,
    inflationRatePercent: 1.2,
    unemploymentRatePercent: 2.5,
    publicDebtPercentOfGdp: 36.5,
    giniCoefficient: 31.2,
    sovereignWealthFundBillionsUsd: 48.0, // Oman Investment Authority (OIA)
    mainIndustries: [
      'Crude Oil & Refined Hydrocarbons',
      'Liquefied Natural Gas (LNG)',
      'Green Hydrogen & Ammonia Production',
      'Commercial Maritime Ports (Duqm & Salalah)',
      'High-End Eco-Tourism & Cultural Hospitality',
      'Fisheries & Agriculture',
    ],
    trade: {
      topExports: ['Petroleum Oils', 'Petroleum Gases (LNG)', 'Acyclic Alcohols', 'Iron Ores & Pellets'],
      topExportPartners: [
        { country: 'China', sharePercent: 42.0 },
        { country: 'India', sharePercent: 10.5 },
        { country: 'South Korea', sharePercent: 6.8 },
      ],
      topImportPartners: [
        { country: 'United Arab Emirates', sharePercent: 28.0 },
        { country: 'China', sharePercent: 9.5 },
        { country: 'India', sharePercent: 8.0 },
      ],
    },
  },

  currency: {
    code: 'OMR',
    name: 'Omani Rial',
    symbol: 'ر.ع.',
    fractionalUnit: 'Baisa',
    isPegged: true,
    peggedToCurrency: 'USD',
    peggedRate: 0.3845,
    fallbackUsdRate: 0.385,
  },

  education: {
    literacyRatePercent: 96.1,
    tertiaryEnrollmentRatePercent: 45.2,
    educationExpenditurePercentGdp: 6.2,
    topUniversities: [
      {
        name: 'Sultan Qaboos University (SQU)',
        globalRankQs: 454,
        city: 'Muscat',
        notableFields: ['Earth Sciences & Petroleum', 'Medicine', 'Marine Biology'],
        websiteUrl: 'http://www.squ.edu.om',
      },
      {
        name: 'University of Nizwa',
        globalRankQs: 801,
        city: 'Nizwa',
        notableFields: ['Pharmacy & Health Sciences', 'Natural Products Research'],
        websiteUrl: 'https://www.unizwa.edu.om',
      },
      {
        name: 'Sohar University',
        globalRankQs: 901,
        city: 'Sohar',
        notableFields: ['Engineering & Computing', 'Applied Sciences'],
        websiteUrl: 'https://www.su.edu.om',
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 46.8,
    rentIndex: 18.5,
    groceriesIndex: 45.2,
    restaurantPriceIndex: 34.0,
    localPurchasingPowerIndex: 88.5,
    samplePricesUsd: {
      inexpensiveMeal: 6.5,
      midRangeMealTwoPeople: 40.0,
      monthlyOneBedroomCityCenterRent: 650.0,
      monthlyPassTransit: 38.0,
      coffeeCappuccino: 4.0,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 48,
    globalPeaceIndexScore: 1.76,
    safetyIndexNumbeo: 80.2,
    crimeIndexNumbeo: 19.8,
    homicideRatePer100k: 0.3,
    politicalStabilityScore: 0.42,
    pressFreedomIndexRank: 155,
  },

  climate: {
    koppenCode: 'BWh',
    koppenTitle: 'Hot Subtropical Arid & Monsoon Coastal',
    summary: 'Arid desert climate with hot summers and mild pleasant winters in the north; the southern Dhofar Governorate experiences the unique Khareef monsoon bringing cool mist, cloud cover, and lush green hills from June to September.',
    averageAnnualTempCelsius: 28.5,
    averageAnnualRainfallMm: 100,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 21.5, precipitationMm: 24 },
      { month: 'Feb', tempCelsius: 23.0, precipitationMm: 22 },
      { month: 'Mar', tempCelsius: 26.2, precipitationMm: 16 },
      { month: 'Apr', tempCelsius: 30.5, precipitationMm: 8 },
      { month: 'May', tempCelsius: 35.0, precipitationMm: 1 },
      { month: 'Jun', tempCelsius: 36.8, precipitationMm: 1 },
      { month: 'Jul', tempCelsius: 36.2, precipitationMm: 2 },
      { month: 'Aug', tempCelsius: 34.5, precipitationMm: 3 },
      { month: 'Sep', tempCelsius: 33.0, precipitationMm: 0 },
      { month: 'Oct', tempCelsius: 30.2, precipitationMm: 1 },
      { month: 'Nov', tempCelsius: 26.0, precipitationMm: 6 },
      { month: 'Dec', tempCelsius: 23.0, precipitationMm: 16 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 5,
    topLandmarks: [
      {
        name: 'Sultan Qaboos Grand Mosque',
        location: 'Bawshar, Muscat',
        category: 'Architectural',
        description: 'Breathtaking contemporary Islamic monument featuring hand-woven Persian carpets spanning 4,300 square meters and a 14-meter Italian crystal Swarovski chandelier.',
        imageUrl: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&auto=format&fit=crop',
        unescoDesignated: false,
      },
      {
        name: 'Land of Frankincense',
        location: 'Dhofar Province',
        category: 'Historical',
        description: 'Ancient frankincense trees of Wadi Dawkah and the fortified port of Khor Rori (Sumhuram), the epicenter of the historic maritime frankincense trade.',
        imageUrl: 'https://images.unsplash.com/photo-1578895210405-907db486c111?w=800&auto=format&fit=crop',
        unescoDesignated: true,
      },
      {
        name: 'Bahla Fort',
        location: 'Dakhiliya Governorate',
        category: 'Historical',
        description: 'Immense 12th-century mud-brick fortress and defensive oasis wall built by the Banu Nabhan dynasty, commanding strategic desert interior trade routes.',
        imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&auto=format&fit=crop',
        unescoDesignated: true,
      },
    ],
    culinaryTraditions: [
      { name: 'Shuwa', description: 'Celebratory ceremonial lamb slow-roasted for up to 48 hours in an underground palm-leaf pit marinated in cloves, cumin, coriander, and vinegar.', nationalStatus: true },
      { name: 'Omani Halwa', description: 'Rich confection made from caramelized sugar, saffron, cardamom, rosewater, and almonds, traditionally served with Omani kahwa.' },
      { name: 'Mashuai', description: 'Spit-roasted kingfish seasoned with dried lime (loomi) and served on saffron basmati rice.' },
    ],
    culturalNormsAndEtiquette: [
      'Exceptional courtesy, soft spokenness, and modesty are core cultural virtues.',
      'Omani men traditionally wear the pristine white dishdasha with a hand-embroidered kummah or mussar turban.',
      'Photography of official government installations and private residential quarters without consent is discouraged.',
    ],
    luxuryLifestyle: {
      fiveStarHotelsCount: 45,
      yachtMarinasAndAviation: [
        'Al Mouj Marina Muscat (The Wave Muscat luxury lifestyle marina)',
        'Six Senses Zighy Bay Luxury Yacht Harbor (Musandam Peninsula)',
        'Muscat International Airport VIP General Aviation Terminal',
      ],
      primeResidentialTier: 'Established',
      residencyOrGoldenVisaAvailable: true,
      taxNotes: 'No personal income tax; 5% standard Value Added Tax (VAT); Investor residency visa available for property buyers.',
    },
  },

  analyticalPeers: {
    economicTwins: ['qatar', 'united-arab-emirates', 'saudi-arabia'],
    climaticTwins: ['qatar', 'united-arab-emirates'],
    regionalNeighbors: ['united-arab-emirates', 'saudi-arabia', 'yemen'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'National Centre for Statistics & Information (NCSI) Oman', referenceUrl: 'https://www.ncsi.gov.om' },
      { domain: 'Central Bank', sourceName: 'Central Bank of Oman (CBO) Monetary Operations', referenceUrl: 'https://cbo.gov.om' },
      { domain: 'UNESCO', sourceName: 'UNESCO World Heritage Centre', referenceUrl: 'https://whc.unesco.org' },
    ],
  },
};
