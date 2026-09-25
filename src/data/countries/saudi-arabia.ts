import { CountryProfile } from '../../types/country';

export const SAUDI_ARABIA: CountryProfile = {
  id: 'saudi-arabia',
  iso2: 'SA',
  iso3: 'SAU',
  unCode: '682',
  name: 'Saudi Arabia',
  officialName: 'Kingdom of Saudi Arabia',
  nativeNames: [
    { languageCode: 'ara', common: 'السعودية', official: 'المملكة العربية السعودية' },
  ],
  regionId: 'middle-east',
  subregionId: 'arabian-peninsula',
  capital: {
    name: 'Riyadh',
    coordinates: [24.7136, 46.6753],
  },
  majorCities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Tabuk', 'Abha'],
  flag: {
    emoji: '🇸🇦',
    svgUrl: 'https://flagcdn.com/sa.svg',
    colors: ['#006C35', '#FFFFFF'],
    aspectRatio: '2:3',
  },
  tagline: 'Sovereign custodian of the two holy mosques, G20 energy powerhouse, and pioneer of the Vision 2030 post-hydrocarbon transformation.',
  overview: 'The largest sovereign nation on the Arabian Peninsula and the birthplace of Islam, Saudi Arabia is a foundational geopolitical force bridging the Red Sea and the Persian Gulf. Guided by Vision 2030, the Kingdom is orchestrating one of the most ambitious economic transformations in modern history, investing sovereign wealth into giga-projects like NEOM, renewable energy, and cultural heritage.',

  geography: {
    landAreaKm2: 2149690,
    waterPercentage: 0.0,
    coastlineKm: 2640,
    borders: [
      { iso3: 'JOR', name: 'Jordan', lengthKm: 744 },
      { iso3: 'IRQ', name: 'Iraq', lengthKm: 814 },
      { iso3: 'KWT', name: 'Kuwait', lengthKm: 222 },
      { iso3: 'QAT', name: 'Qatar', lengthKm: 60 },
      { iso3: 'ARE', name: 'United Arab Emirates', lengthKm: 457 },
      { iso3: 'OMN', name: 'Oman', lengthKm: 676 },
      { iso3: 'YEM', name: 'Yemen', lengthKm: 1458 },
    ],
    highestPoint: { name: 'Jabal Sawda', elevationMeters: 3000 },
    lowestPoint: { name: 'Red Sea', elevationMeters: 0 },
    timezones: ['Asia/Riyadh (UTC+3)'],
    coordinates: [23.8859, 45.0792],
  },

  demographics: {
    population: 36400000,
    populationYear: 2024,
    densityPerKm2: 16.9,
    medianAge: 31.8,
    urbanizationRate: 84.8,
    lifeExpectancyYears: 77.9,
    fertilityRate: 2.2,
    languages: [
      { name: 'Arabic', isOfficial: true, percentSpoken: 100 },
      { name: 'English', isOfficial: false, percentSpoken: 75 },
    ],
    ageDistribution: {
      under15Percent: 24.2,
      fifteenTo64Percent: 72.1,
      sixtyFivePlusPercent: 3.7,
    },
  },

  economy: {
    gdpNominalUsdBillions: 1108.0,
    gdpPppUsdBillions: 2140.0,
    gdpPerCapitaPppUsd: 61800,
    gdpPerCapitaNominalUsd: 32500,
    realGdpGrowthPercent: 2.7,
    inflationRatePercent: 1.7,
    unemploymentRatePercent: 4.8,
    publicDebtPercentOfGdp: 26.2,
    giniCoefficient: 36.8,
    sovereignWealthFundBillionsUsd: 925.0, // Public Investment Fund (PIF)
    mainIndustries: [
      'Petroleum & Natural Gas Extraction',
      'Petrochemicals (SABIC)',
      'Renewable Energy & Solar',
      'Mining & Minerals',
      'Logistics & Maritime Shipping',
      'Financial Services',
    ],
    trade: {
      topExports: ['Crude Petroleum', 'Refined Petroleum', 'Petrochemical Polymers', 'Industrial Chemicals'],
      topExportPartners: [
        { country: 'China', sharePercent: 18.5 },
        { country: 'India', sharePercent: 12.0 },
        { country: 'Japan', sharePercent: 10.5 },
        { country: 'South Korea', sharePercent: 9.0 },
      ],
      topImportPartners: [
        { country: 'China', sharePercent: 21.0 },
        { country: 'United States', sharePercent: 10.5 },
        { country: 'United Arab Emirates', sharePercent: 7.5 },
      ],
    },
  },

  currency: {
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: '﷼',
    fractionalUnit: 'Halala',
    isPegged: true,
    peggedToCurrency: 'USD',
    peggedRate: 3.75,
    fallbackUsdRate: 3.75,
  },

  education: {
    literacyRatePercent: 97.6,
    tertiaryEnrollmentRatePercent: 71.0,
    educationExpenditurePercentGdp: 7.8,
    topUniversities: [
      {
        name: 'King Saud University (KSU)',
        globalRankQs: 203,
        city: 'Riyadh',
        notableFields: ['Medicine', 'Engineering', 'Computer Science'],
        websiteUrl: 'https://ksu.edu.sa',
      },
      {
        name: 'King Fahd University of Petroleum & Minerals (KFUPM)',
        globalRankQs: 101,
        city: 'Dhahran',
        notableFields: ['Petroleum Engineering', 'Chemical Engineering', 'Material Science'],
        websiteUrl: 'https://www.kfupm.edu.sa',
      },
      {
        name: 'King Abdulaziz University (KAU)',
        globalRankQs: 149,
        city: 'Jeddah',
        notableFields: ['Marine Sciences', 'Artificial Intelligence', 'Medicine'],
        websiteUrl: 'https://www.kau.edu.sa',
      },
      {
        name: 'King Abdullah University of Science and Technology (KAUST)',
        globalRankQs: 95,
        city: 'Thuwal',
        notableFields: ['Biosciences', 'Solar & Alternative Energy', 'Supercomputing'],
        websiteUrl: 'https://www.kaust.edu.sa',
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 48.5,
    rentIndex: 26.4,
    groceriesIndex: 44.8,
    restaurantPriceIndex: 38.2,
    localPurchasingPowerIndex: 92.4,
    samplePricesUsd: {
      inexpensiveMeal: 6.8,
      midRangeMealTwoPeople: 45.0,
      monthlyOneBedroomCityCenterRent: 780.0,
      monthlyPassTransit: 40.0,
      coffeeCappuccino: 4.2,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 119,
    globalPeaceIndexScore: 2.32,
    safetyIndexNumbeo: 75.8,
    crimeIndexNumbeo: 24.2,
    homicideRatePer100k: 0.8,
    politicalStabilityScore: 0.12,
    pressFreedomIndexRank: 166,
  },

  climate: {
    koppenCode: 'BWh',
    koppenTitle: 'Hyper-Arid Subtropical Desert',
    summary: 'Predominantly hot desert climate with extreme daytime summer heat, dry atmosphere, mild winter temperatures in the central Nejd plateau, and temperate microclimates in the Asir mountain highlands.',
    averageAnnualTempCelsius: 26.5,
    averageAnnualRainfallMm: 95,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 15.2, precipitationMm: 12 },
      { month: 'Feb', tempCelsius: 18.1, precipitationMm: 9 },
      { month: 'Mar', tempCelsius: 22.8, precipitationMm: 21 },
      { month: 'Apr', tempCelsius: 28.5, precipitationMm: 24 },
      { month: 'May', tempCelsius: 34.0, precipitationMm: 4 },
      { month: 'Jun', tempCelsius: 37.2, precipitationMm: 0 },
      { month: 'Jul', tempCelsius: 38.8, precipitationMm: 0 },
      { month: 'Aug', tempCelsius: 38.5, precipitationMm: 0 },
      { month: 'Sep', tempCelsius: 35.1, precipitationMm: 0 },
      { month: 'Oct', tempCelsius: 29.4, precipitationMm: 3 },
      { month: 'Nov', tempCelsius: 22.0, precipitationMm: 10 },
      { month: 'Dec', tempCelsius: 16.8, precipitationMm: 12 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 7,
    topLandmarks: [
      {
        name: 'Hegra (Mada’in Salih)',
        location: 'AlUla, Medina Province',
        category: 'Historical',
        description: 'First UNESCO World Heritage site in Saudi Arabia, featuring monumental Nabataean rock-cut tombs with ornate facades dating to the 1st century BCE.',
        imageUrl: 'https://images.unsplash.com/photo-1578895210405-907db486c111?w=800&auto=format&fit=crop',
        unescoDesignated: true,
      },
      {
        name: 'Historic Diriyah (At-Turaif District)',
        location: 'Riyadh Province',
        category: 'Historical',
        description: 'The historic mud-brick citadel and original seat of power of the House of Saud, restored as a premier global cultural destination.',
        imageUrl: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800&auto=format&fit=crop',
        unescoDesignated: true,
      },
      {
        name: 'Kingdom Centre Tower',
        location: 'Riyadh',
        category: 'Architectural',
        description: 'Iconic 302-meter skyscraper featuring an inverted parabolic skybridge offering panoramic views across the Riyadh metropolis.',
        imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&auto=format&fit=crop',
        unescoDesignated: false,
      },
    ],
    culinaryTraditions: [
      { name: 'Kabsa', description: 'National dish of fragrant spiced basmati rice prepared with lamb, chicken, or camel, garnished with toasted almonds and raisins.', nationalStatus: true },
      { name: 'Mandi', description: 'Traditional slow-cooked meat and spiced rice cooked in an underground earthen tandoor pit.' },
      { name: 'Gahwa & Dates', description: 'Traditional golden Arabic coffee spiced with cardamom, cloves, and saffron, served alongside premium Sukkari or Ajwa dates.' },
    ],
    culturalNormsAndEtiquette: [
      'Generous hospitality (Karam) is a cornerstone of Saudi etiquette; accepting offered coffee and dates is customary.',
      'Modest attire is respected in public spaces; formal traditional thobe and shemagh are standard sovereign attire.',
      'Respect Islamic prayer times (Salah), during which commercial establishments traditionally pause brief operations.',
    ],
    luxuryLifestyle: {
      fiveStarHotelsCount: 160,
      yachtMarinasAndAviation: [
        'Jeddah Yacht Club & Marina (Red Sea Formula 1 venue)',
        'Sindalah Island Ultra-Luxury Island Resort (NEOM Red Sea)',
        'King Khalid International Airport Private VIP Terminal (Riyadh)',
      ],
      primeResidentialTier: 'Ultra-Prime',
      residencyOrGoldenVisaAvailable: true,
      taxNotes: 'No personal individual income tax; 15% standard Value Added Tax (VAT); corporate Zakat for domestic entities.',
    },
  },

  analyticalPeers: {
    economicTwins: ['united-arab-emirates', 'qatar'],
    climaticTwins: ['qatar', 'united-arab-emirates', 'egypt'],
    regionalNeighbors: ['united-arab-emirates', 'qatar', 'jordan', 'kuwait', 'oman'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'International Monetary Fund (IMF) World Economic Outlook 2024', referenceUrl: 'https://www.imf.org' },
      { domain: 'Sovereign Wealth', sourceName: 'Public Investment Fund (PIF) Annual Disclosure 2024', referenceUrl: 'https://www.pif.gov.sa' },
      { domain: 'Demographics', sourceName: 'General Authority for Statistics (GASTAT) Saudi Census 2024', referenceUrl: 'https://www.stats.gov.sa' },
      { domain: 'Heritage', sourceName: 'UNESCO World Heritage Centre', referenceUrl: 'https://whc.unesco.org' },
    ],
  },
};
