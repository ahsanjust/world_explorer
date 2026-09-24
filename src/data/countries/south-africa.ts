import { CountryProfile } from '../../types/country';

export const SOUTH_AFRICA: CountryProfile = {
  id: 'south-africa',
  iso2: 'ZA',
  iso3: 'ZAF',
  unCode: '710',
  name: 'South Africa',
  officialName: 'Republic of South Africa',
  nativeNames: [
    { languageCode: 'zul', common: 'iNingizimu Afrika', official: 'iRiphabhuliki yaseNingizimu Afrika' },
    { languageCode: 'afr', common: 'Suid-Afrika', official: 'Republiek van Suid-Afrika' },
    { languageCode: 'eng', common: 'South Africa', official: 'Republic of South Africa' },
  ],
  regionId: 'africa',
  subregionId: 'southern-africa',
  capital: {
    name: 'Pretoria (Executive)',
    coordinates: [-25.7479, 28.2293],
  },
  majorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Gqeberha'],
  flag: {
    emoji: '🇿🇦',
    svgUrl: 'https://flagcdn.com/za.svg',
    colors: ['#007A3D', '#002395', '#E03C31', '#FFB612', '#000000', '#FFFFFF'],
    aspectRatio: '2:3',
  },
  tagline: 'Rainbow Nation uniting dramatic Atlantic-Indian oceans, vast mineral wealth, and vibrant constitutional democracy.',
  overview: 'Positioned at the southern tip of the African continent, South Africa is the industrial and financial powerhouse of Sub-Saharan Africa. Possessing the world’s largest reserves of platinum-group metals and manganese, South Africa blends breathtaking landscapes—from Table Mountain to the Kruger bushveld—with a dynamic multi-ethnic society.',

  geography: {
    landAreaKm2: 1221037,
    waterPercentage: 0.38,
    coastlineKm: 2798,
    borders: [
      { iso3: 'NAM', name: 'Namibia', lengthKm: 1005 },
      { iso3: 'BWA', name: 'Botswana', lengthKm: 1969 },
      { iso3: 'ZWE', name: 'Zimbabwe', lengthKm: 230 },
      { iso3: 'MOZ', name: 'Mozambique', lengthKm: 496 },
      { iso3: 'SWZ', name: 'Eswatini', lengthKm: 438 },
      { iso3: 'LSO', name: 'Lesotho', lengthKm: 1106 },
    ],
    highestPoint: { name: 'Mafadi (Drakensberg)', elevationMeters: 3450 },
    lowestPoint: { name: 'Atlantic Ocean', elevationMeters: 0 },
    timezones: ['Africa/Johannesburg (UTC+2)'],
    coordinates: [-30.5595, 22.9375],
  },

  demographics: {
    population: 60414495,
    populationYear: 2024,
    densityPerKm2: 49.5,
    medianAge: 28.0,
    urbanizationRate: 68.3,
    lifeExpectancyYears: 65.3,
    fertilityRate: 2.3,
    languages: [
      { name: 'isiZulu', isOfficial: true, percentSpoken: 24.6 },
      { name: 'isiXhosa', isOfficial: true, percentSpoken: 17.0 },
      { name: 'Afrikaans', isOfficial: true, percentSpoken: 12.1 },
      { name: 'English', isOfficial: true, percentSpoken: 8.3 },
    ],
    ageDistribution: {
      under15Percent: 28.6,
      fifteenTo64Percent: 65.4,
      sixtyFivePlusPercent: 6.0,
    },
  },

  economy: {
    gdpNominalUsdBillions: 377.7,
    gdpPppUsdBillions: 997.0,
    gdpPerCapitaPppUsd: 16100,
    gdpPerCapitaNominalUsd: 6100,
    realGdpGrowthPercent: 1.1,
    inflationRatePercent: 4.8,
    unemploymentRatePercent: 32.1,
    publicDebtPercentOfGdp: 74.1,
    giniCoefficient: 63.0,
    sovereignWealthFundBillionsUsd: 140.0, // Public Investment Corporation (PIC)
    mainIndustries: [
      'Platinum, Manganese & Gold Mining',
      'Banking & FinTech',
      'Automotive Assembly & Components',
      'Agribusiness & Premium Viticulture',
      'Renewable Energy & Heavy Industry',
    ],
    trade: {
      topExports: ['Platinum & PGMs', 'Gold', 'Iron Ore', 'Coal', 'Citrus Fruits & Wine'],
      topExportPartners: [
        { country: 'China', sharePercent: 11.2 },
        { country: 'United States', sharePercent: 8.5 },
        { country: 'Germany', sharePercent: 7.6 },
        { country: 'Japan', sharePercent: 6.1 },
      ],
      topImportPartners: [
        { country: 'China', sharePercent: 21.0 },
        { country: 'United States', sharePercent: 7.5 },
        { country: 'Germany', sharePercent: 7.3 },
        { country: 'India', sharePercent: 6.8 },
      ],
    },
  },

  currency: {
    code: 'ZAR',
    name: 'South African Rand',
    symbol: 'R',
    fractionalUnit: 'Cent (100 cents = 1 rand)',
    isPegged: false,
    fallbackUsdRate: 18.2,
  },

  education: {
    literacyRatePercent: 95.0,
    tertiaryEnrollmentRatePercent: 24.3,
    educationExpenditurePercentGdp: 6.2,
    topUniversities: [
      {
        name: 'University of Cape Town (UCT)',
        globalRankQs: 171,
        city: 'Cape Town',
        notableFields: ['Development Economics', 'Environmental Sciences', 'Medicine', 'African Studies'],
      },
      {
        name: 'University of the Witwatersrand (Wits)',
        globalRankQs: 267,
        city: 'Johannesburg',
        notableFields: ['Mining Engineering', 'Paleoanthropology', 'Geology', 'Public Health'],
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 34.8,
    rentIndex: 12.6,
    groceriesIndex: 28.5,
    restaurantPriceIndex: 30.2,
    localPurchasingPowerIndex: 44.1,
    samplePricesUsd: {
      inexpensiveMeal: 8.2,
      midRangeMealTwoPeople: 34.0,
      monthlyOneBedroomCityCenterRent: 490.0,
      monthlyPassTransit: 45.0,
      coffeeCappuccino: 1.9,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 127,
    globalPeaceIndexScore: 2.409,
    safetyIndexNumbeo: 24.6,
    crimeIndexNumbeo: 75.4,
    homicideRatePer100k: 41.9,
    politicalStabilityScore: -0.25,
    pressFreedomIndexRank: 25,
  },

  climate: {
    koppenCode: 'Csb',
    koppenTitle: 'Warm Mediterranean / Semi-Arid Subtropical',
    summary: 'Warm, dry summers and mild wet winters in the Cape peninsula, transitioning to subtropical humidity on the east coast and temperate high-altitude highveld plateau in Johannesburg.',
    averageAnnualTempCelsius: 17.5,
    averageAnnualRainfallMm: 464,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 22.0, precipitationMm: 15 },
      { month: 'Feb', tempCelsius: 22.5, precipitationMm: 17 },
      { month: 'Mar', tempCelsius: 20.8, precipitationMm: 20 },
      { month: 'Apr', tempCelsius: 18.0, precipitationMm: 41 },
      { month: 'May', tempCelsius: 15.2, precipitationMm: 69 },
      { month: 'Jun', tempCelsius: 13.5, precipitationMm: 93 },
      { month: 'Jul', tempCelsius: 12.8, precipitationMm: 82 },
      { month: 'Aug', tempCelsius: 13.4, precipitationMm: 77 },
      { month: 'Sep', tempCelsius: 14.8, precipitationMm: 40 },
      { month: 'Oct', tempCelsius: 17.0, precipitationMm: 30 },
      { month: 'Nov', tempCelsius: 19.2, precipitationMm: 14 },
      { month: 'Dec', tempCelsius: 21.0, precipitationMm: 17 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 10,
    topLandmarks: [
      {
        name: 'Table Mountain & Cape Point',
        location: 'Cape Town, Western Cape',
        category: 'Natural',
        description: 'Iconic flat-topped sandstone mountain anchoring one of the world’s most biodiverse floral kingdoms.',
        imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800',
        unescoDesignated: true,
      },
      {
        name: 'Kruger National Park',
        location: 'Limpopo & Mpumalanga',
        category: 'Natural',
        description: 'World-renowned vast wildlife sanctuary hosting the African Big Five in natural savannas.',
        imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
        unescoDesignated: true,
      },
      {
        name: 'Robben Island',
        location: 'Table Bay, Western Cape',
        category: 'Historical',
        description: 'Historic maximum security prison island where Nelson Mandela was imprisoned for 18 years, a universal symbol of the triumph of human spirit over oppression.',
        imageUrl: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=800',
        unescoDesignated: true,
      },
    ],
    culinaryTraditions: [
      { name: 'Braai & Boerewors', description: 'Centuries-old social wood-fire barbecue tradition grilling seasoned spiced beef and coriander sausages.', nationalStatus: true },
      { name: 'Bobotie', description: 'Cape Malay baked curried minced meat topped with a golden savory egg custard layer, served with yellow rice and raisins.' },
      { name: 'Biltong', description: 'Cured, dried air-hung strips of beef or game spiced with coriander seeds, black pepper, and vinegar.' },
    ],
    culturalNormsAndEtiquette: [
      'The foundational philosophy of Ubuntu ("I am because we are") shaping social solidarity and community life.',
      'Recognition and active pride in 11 official constitutional languages across media and society.',
      'Passionate multi-ethnic sporting loyalty uniting around the Rugby World Champion Springboks, Proteas cricket, and Bafana Bafana.',
      'Vibrant contemporary arts, amapiano music culture, and world-class Cape Winelands viticulture.',
    ],
    luxuryLifestyle: {
      michelinStarredVenuesCount: 0,
      fiveStarHotelsCount: 48,
      yachtMarinasAndAviation: ['V&A Waterfront Marina Cape Town', 'Granger Bay Marina', 'Lanseria International Airport'],
      primeResidentialTier: 'Established',
      residencyOrGoldenVisaAvailable: true,
      taxNotes: 'Worldwide residence-based personal taxation with generous double taxation relief and competitive corporate tax regimes.',
    },
  },

  analyticalPeers: {
    economicTwins: ['brazil', 'egypt'],
    climaticTwins: ['australia'],
    regionalNeighbors: ['kenya', 'egypt'],
  },

  metadata: {
    lastVerifiedDate: '2025-01-15',
    citations: [
      { domain: 'statssa.gov.za', sourceName: 'Statistics South Africa' },
      { domain: 'resbank.co.za', sourceName: 'South African Reserve Bank' },
      { domain: 'worldbank.org', sourceName: 'World Bank Open Data' },
    ],
  },
};
