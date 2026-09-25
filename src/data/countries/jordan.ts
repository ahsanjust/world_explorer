import { CountryProfile } from '../../types/country';

export const JORDAN: CountryProfile = {
  id: 'jordan',
  iso2: 'JO',
  iso3: 'JOR',
  unCode: '400',
  name: 'Jordan',
  officialName: 'Hashemite Kingdom of Jordan',
  nativeNames: [
    { languageCode: 'ara', common: 'الأردن', official: 'المملكة الأردنية الهاشمية' },
  ],
  regionId: 'middle-east',
  subregionId: 'levant',
  capital: {
    name: 'Amman',
    coordinates: [31.9539, 35.9106],
  },
  majorCities: ['Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Madaba', 'Salt', 'Jerash'],
  flag: {
    emoji: '🇯🇴',
    svgUrl: 'https://flagcdn.com/jo.svg',
    colors: ['#000000', '#FFFFFF', '#007A3D', '#CE1126'],
    aspectRatio: '1:2',
  },
  tagline: 'Hashemite peace anchor in the Levant, custodian of Petra’s rose-red Nabataean marvels, the Dead Sea depression, and the Gulf of Aqaba.',
  overview: 'Situated at the junction of the Levant, the Arabian Desert, and the Mediterranean world, Jordan is a constitutional monarchy known for diplomatic stability, highly educated human capital, and iconic world wonders. It holds the lowest land point on Earth at the mineral-rich Dead Sea and controls Jordan’s vital maritime gateway to the Red Sea at Aqaba.',

  geography: {
    landAreaKm2: 89342,
    waterPercentage: 0.6,
    coastlineKm: 26,
    borders: [
      { iso3: 'SYR', name: 'Syria', lengthKm: 379 },
      { iso3: 'IRQ', name: 'Iraq', lengthKm: 179 },
      { iso3: 'SAU', name: 'Saudi Arabia', lengthKm: 731 },
      { iso3: 'ISR', name: 'Israel', lengthKm: 307 },
      { iso3: 'PSE', name: 'Palestine (West Bank)', lengthKm: 148 },
    ],
    highestPoint: { name: 'Jabal Umm ad Dami', elevationMeters: 1854 },
    lowestPoint: { name: 'Dead Sea Shore', elevationMeters: -431 },
    timezones: ['Asia/Amman (UTC+3)'],
    coordinates: [30.5852, 36.2384],
  },

  demographics: {
    population: 11340000,
    populationYear: 2024,
    densityPerKm2: 126.9,
    medianAge: 24.3,
    urbanizationRate: 91.6,
    lifeExpectancyYears: 74.8,
    fertilityRate: 2.5,
    languages: [
      { name: 'Arabic', isOfficial: true, percentSpoken: 100 },
      { name: 'English', isOfficial: false, percentSpoken: 70 },
    ],
    ageDistribution: {
      under15Percent: 33.2,
      fifteenTo64Percent: 62.8,
      sixtyFivePlusPercent: 4.0,
    },
  },

  economy: {
    gdpNominalUsdBillions: 52.8,
    gdpPppUsdBillions: 122.0,
    gdpPerCapitaPppUsd: 10800,
    gdpPerCapitaNominalUsd: 4650,
    realGdpGrowthPercent: 2.6,
    inflationRatePercent: 1.9,
    unemploymentRatePercent: 21.4,
    publicDebtPercentOfGdp: 89.2,
    giniCoefficient: 33.7,
    mainIndustries: [
      'Potash & Phosphate Fertilizer Extraction (Arab Potash)',
      'Pharmaceutical Manufacturing & Medical Tourism',
      'Textiles & Garment Manufacturing (QIZ Free Zones)',
      'Information & Communications Technology (ICT)',
      'Eco-Tourism & Cultural Heritage Tourism',
    ],
    trade: {
      topExports: ['Fertilizers & Potash', 'Medicaments & Pharmaceuticals', 'Knit Apparel', 'Phosphates'],
      topExportPartners: [
        { country: 'United States', sharePercent: 22.5 },
        { country: 'India', sharePercent: 14.0 },
        { country: 'Saudi Arabia', sharePercent: 11.5 },
      ],
      topImportPartners: [
        { country: 'China', sharePercent: 16.5 },
        { country: 'Saudi Arabia', sharePercent: 14.5 },
        { country: 'United States', sharePercent: 5.5 },
      ],
    },
  },

  currency: {
    code: 'JOD',
    name: 'Jordanian Dinar',
    symbol: 'د.أ',
    fractionalUnit: 'Piastre / Qirsh',
    isPegged: true,
    peggedToCurrency: 'USD',
    peggedRate: 0.709,
    fallbackUsdRate: 0.709,
  },

  education: {
    literacyRatePercent: 98.4,
    tertiaryEnrollmentRatePercent: 48.2,
    educationExpenditurePercentGdp: 3.8,
    topUniversities: [
      {
        name: 'University of Jordan (UJ)',
        globalRankQs: 368,
        city: 'Amman',
        notableFields: ['Medicine', 'Pharmacy', 'Engineering', 'Arabic Linguistics'],
        websiteUrl: 'https://www.ju.edu.jo',
      },
      {
        name: 'Jordan University of Science and Technology (JUST)',
        globalRankQs: 501,
        city: 'Irbid',
        notableFields: ['Biomedical Engineering', 'Nanotechnology', 'Veterinary Medicine'],
        websiteUrl: 'https://www.just.edu.jo',
      },
      {
        name: 'Yarmouk University',
        globalRankQs: 801,
        city: 'Irbid',
        notableFields: ['Archaeology & Epigraphy', 'Humanities', 'Information Technology'],
        websiteUrl: 'https://www.yu.edu.jo',
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 41.5,
    rentIndex: 12.8,
    groceriesIndex: 38.6,
    restaurantPriceIndex: 36.2,
    localPurchasingPowerIndex: 32.4,
    samplePricesUsd: {
      inexpensiveMeal: 5.5,
      midRangeMealTwoPeople: 35.0,
      monthlyOneBedroomCityCenterRent: 400.0,
      monthlyPassTransit: 28.0,
      coffeeCappuccino: 3.2,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 62,
    globalPeaceIndexScore: 1.89,
    safetyIndexNumbeo: 60.5,
    crimeIndexNumbeo: 39.5,
    homicideRatePer100k: 1.1,
    politicalStabilityScore: -0.35,
    pressFreedomIndexRank: 132,
  },

  climate: {
    koppenCode: 'BSh',
    koppenTitle: 'Semi-Arid Steppe to Mediterranean Plateau',
    summary: 'Predominantly dry continental climate; western mountain highlands feature warm dry summers and cool wet winters with occasional snowfall in Amman, while the Jordan Rift Valley and eastern Badia are hot desert.',
    averageAnnualTempCelsius: 17.5,
    averageAnnualRainfallMm: 270,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 8.5, precipitationMm: 65 },
      { month: 'Feb', tempCelsius: 9.8, precipitationMm: 60 },
      { month: 'Mar', tempCelsius: 13.0, precipitationMm: 35 },
      { month: 'Apr', tempCelsius: 17.5, precipitationMm: 12 },
      { month: 'May', tempCelsius: 22.4, precipitationMm: 4 },
      { month: 'Jun', tempCelsius: 25.8, precipitationMm: 0 },
      { month: 'Jul', tempCelsius: 27.5, precipitationMm: 0 },
      { month: 'Aug', tempCelsius: 27.8, precipitationMm: 0 },
      { month: 'Sep', tempCelsius: 25.4, precipitationMm: 0 },
      { month: 'Oct', tempCelsius: 21.2, precipitationMm: 6 },
      { month: 'Nov', tempCelsius: 15.0, precipitationMm: 30 },
      { month: 'Dec', tempCelsius: 10.2, precipitationMm: 58 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 6,
    topLandmarks: [
      {
        name: 'Petra (Al-Khazneh / The Treasury)',
        location: 'Ma’an Governorate',
        category: 'Historical',
        description: 'World Wonder carved into vibrant pink sandstone cliffs by the ancient Nabataeans in the 3rd century BCE, accessible through the dramatic narrow Siq gorge.',
        imageUrl: 'https://images.unsplash.com/photo-1579606032824-34da7cb2b6e1?w=800&auto=format&fit=crop',
        unescoDesignated: true,
      },
      {
        name: 'Wadi Rum (Valley of the Moon)',
        location: 'Aqaba Governorate',
        category: 'Natural',
        description: 'Vast Martian desert wilderness of dramatic red sand dunes and towering granite-sandstone massifs, historic domain of Lawrence of Arabia and the Bedouin.',
        imageUrl: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&auto=format&fit=crop',
        unescoDesignated: true,
      },
      {
        name: 'Jerash Roman Ruins (Gerasa)',
        location: 'Jerash Governorate',
        category: 'Historical',
        description: 'One of the best-preserved Decapolis Roman provincial cities on Earth, featuring the Oval Forum, colonnaded Cardo Maximus, and triumphal Arch of Hadrian.',
        imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&auto=format&fit=crop',
        unescoDesignated: false,
      },
    ],
    culinaryTraditions: [
      { name: 'Mansaf', description: 'National dish consisting of tender lamb cooked in a savory fermented dried yogurt broth (Jameed), served over turmeric rice on thin shrak bread and sprinkled with toasted pine nuts.', nationalStatus: true },
      { name: 'Maqluba', description: 'Traditional upside-down layered dish of rice, fried eggplant, cauliflower, and spiced chicken or lamb.' },
      { name: 'Knafeh Nabulsiyeh', description: 'Warm dessert of melted Akkawi cheese enveloped in shredded kadaif pastry, drenched in orange-blossom sugar syrup.' },
    ],
    culturalNormsAndEtiquette: [
      'Mansaf is traditionally eaten with the right hand while standing around a large communal platter during formal banquets.',
      'Refusing hospitality or tea is considered impolite; accepting at least one small cup shows honor to the host.',
      'Greeting others with "Salam Alaykum" and showing deference to community elders is fundamental.',
    ],
    luxuryLifestyle: {
      fiveStarHotelsCount: 38,
      yachtMarinasAndAviation: [
        'Ayla Marina Village Aqaba (Red Sea luxury marina)',
        'Kempinski Ishtar & Mövenpick Dead Sea Luxury Spa Resorts',
        'Queen Alia International Airport (AMM) Royal Jordanian VIP Lounges',
      ],
      primeResidentialTier: 'Established',
      residencyOrGoldenVisaAvailable: true,
      taxNotes: 'Moderate progressive personal income tax; investor residency programs tied to domestic real estate capital investment.',
    },
  },

  analyticalPeers: {
    economicTwins: ['morocco', 'tunisia', 'egypt'],
    climaticTwins: ['turkey', 'lebanon', 'cyprus'],
    regionalNeighbors: ['saudi-arabia', 'syria', 'iraq', 'israel', 'palestine'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Central Bank of Jordan (CBJ) & Department of Statistics (DOS)', referenceUrl: 'https://www.cbj.gov.jo' },
      { domain: 'Macro', sourceName: 'International Monetary Fund (IMF) Article IV Consultation 2024', referenceUrl: 'https://www.imf.org' },
      { domain: 'UNESCO', sourceName: 'UNESCO World Heritage List', referenceUrl: 'https://whc.unesco.org' },
    ],
  },
};
