import { CountryProfile } from '../../types/country';

export const KUWAIT: CountryProfile = {
  id: 'kuwait',
  iso2: 'KW',
  iso3: 'KWT',
  unCode: '414',
  name: 'Kuwait',
  officialName: 'State of Kuwait',
  nativeNames: [
    { languageCode: 'ara', common: 'الكويت', official: 'دولة الكويت' },
  ],
  regionId: 'middle-east',
  subregionId: 'arabian-peninsula',
  capital: {
    name: 'Kuwait City',
    coordinates: [29.3759, 47.9774],
  },
  majorCities: ['Kuwait City', 'Al Ahmadi', 'Hawalli', 'Salmiya', 'Sabah Al Ahmad', 'Al Jahra'],
  flag: {
    emoji: '🇰🇼',
    svgUrl: 'https://flagcdn.com/kw.svg',
    colors: ['#007A3D', '#FFFFFF', '#CE1126', '#000000'],
    aspectRatio: '1:2',
  },
  tagline: 'High-income Arabian Gulf state home to the world’s oldest sovereign wealth fund and highest-valued currency unit.',
  overview: 'Nestled at the northern tip of the Persian Gulf between Saudi Arabia and Iraq, Kuwait is a constitutional emirate with an extraordinarily wealthy economy driven by proven crude reserves representing ~7% of the global total. Home to the Kuwait Investment Authority (KIA, established 1953) and the Kuwaiti Dinar, the highest-valued sovereign currency in the world.',

  geography: {
    landAreaKm2: 17818,
    waterPercentage: 0.0,
    coastlineKm: 499,
    borders: [
      { iso3: 'SAU', name: 'Saudi Arabia', lengthKm: 222 },
      { iso3: 'IRQ', name: 'Iraq', lengthKm: 254 },
    ],
    highestPoint: { name: 'Mutla Ridge', elevationMeters: 306 },
    lowestPoint: { name: 'Persian Gulf', elevationMeters: 0 },
    timezones: ['Asia/Kuwait (UTC+3)'],
    coordinates: [29.3117, 47.4818],
  },

  demographics: {
    population: 4310000,
    populationYear: 2024,
    densityPerKm2: 241.9,
    medianAge: 31.9,
    urbanizationRate: 100.0,
    lifeExpectancyYears: 80.3,
    fertilityRate: 2.1,
    languages: [
      { name: 'Arabic', isOfficial: true, percentSpoken: 100 },
      { name: 'English', isOfficial: false, percentSpoken: 85 },
    ],
    ageDistribution: {
      under15Percent: 21.0,
      fifteenTo64Percent: 75.4,
      sixtyFivePlusPercent: 3.6,
    },
  },

  economy: {
    gdpNominalUsdBillions: 160.0,
    gdpPppUsdBillions: 260.0,
    gdpPerCapitaPppUsd: 60400,
    gdpPerCapitaNominalUsd: 37100,
    realGdpGrowthPercent: 2.1,
    inflationRatePercent: 2.8,
    unemploymentRatePercent: 2.2,
    publicDebtPercentOfGdp: 3.2,
    giniCoefficient: 31.5,
    sovereignWealthFundBillionsUsd: 980.0, // Kuwait Investment Authority (KIA)
    mainIndustries: [
      'Petroleum Extraction & Refining (Kuwait Petroleum Corporation)',
      'Petrochemicals (EQUATE)',
      'Financial Services & Sovereign Investment',
      'Desalination & Power Generation',
      'Construction & Civil Engineering',
    ],
    trade: {
      topExports: ['Crude Oil', 'Refined Petroleum Products', 'Petrochemicals', 'Liquefied Propane & Butane'],
      topExportPartners: [
        { country: 'China', sharePercent: 21.0 },
        { country: 'India', sharePercent: 14.5 },
        { country: 'Japan', sharePercent: 12.0 },
        { country: 'South Korea', sharePercent: 11.5 },
      ],
      topImportPartners: [
        { country: 'China', sharePercent: 18.0 },
        { country: 'United States', sharePercent: 11.0 },
        { country: 'United Arab Emirates', sharePercent: 9.5 },
      ],
    },
  },

  currency: {
    code: 'KWD',
    name: 'Kuwaiti Dinar',
    symbol: 'د.ك',
    fractionalUnit: 'Fils',
    isPegged: false, // Pegged to an undisclosed weighted currency basket
    fallbackUsdRate: 0.307,
  },

  education: {
    literacyRatePercent: 96.5,
    tertiaryEnrollmentRatePercent: 61.2,
    educationExpenditurePercentGdp: 6.6,
    topUniversities: [
      {
        name: 'Kuwait University',
        globalRankQs: 851,
        city: 'Kuwait City (Shuwaikh & Sabah Al-Salem)',
        notableFields: ['Engineering & Petroleum', 'Medicine', 'Law & Sharia'],
        websiteUrl: 'http://www.ku.edu.kw',
      },
      {
        name: 'American University of Kuwait (AUK)',
        globalRankQs: 1001,
        city: 'Salmiya',
        notableFields: ['Business & Economics', 'Computer Engineering', 'Arts'],
        websiteUrl: 'https://www.auk.edu.kw',
      },
      {
        name: 'Gulf University for Science and Technology (GUST)',
        globalRankQs: 701,
        city: 'Mishref',
        notableFields: ['Computer Science', 'Business Administration', 'Mass Communication'],
        websiteUrl: 'https://www.gust.edu.kw',
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 49.5,
    rentIndex: 26.2,
    groceriesIndex: 42.8,
    restaurantPriceIndex: 39.5,
    localPurchasingPowerIndex: 96.2,
    samplePricesUsd: {
      inexpensiveMeal: 6.5,
      midRangeMealTwoPeople: 45.0,
      monthlyOneBedroomCityCenterRent: 850.0,
      monthlyPassTransit: 45.0,
      coffeeCappuccino: 4.5,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 35,
    globalPeaceIndexScore: 1.66,
    safetyIndexNumbeo: 76.5,
    crimeIndexNumbeo: 23.5,
    homicideRatePer100k: 0.4,
    politicalStabilityScore: 0.25,
    pressFreedomIndexRank: 154,
  },

  climate: {
    koppenCode: 'BWh',
    koppenTitle: 'Extreme Hyper-Arid Desert',
    summary: 'Hyper-arid climate featuring some of the highest recorded ambient summer temperatures on Earth exceeding 50°C, accompanied by intense sun and dry desert winds; winters are pleasantly mild with occasional brief downpours.',
    averageAnnualTempCelsius: 27.2,
    averageAnnualRainfallMm: 110,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 13.5, precipitationMm: 28 },
      { month: 'Feb', tempCelsius: 16.0, precipitationMm: 16 },
      { month: 'Mar', tempCelsius: 21.0, precipitationMm: 14 },
      { month: 'Apr', tempCelsius: 27.5, precipitationMm: 18 },
      { month: 'May', tempCelsius: 34.0, precipitationMm: 4 },
      { month: 'Jun', tempCelsius: 38.5, precipitationMm: 0 },
      { month: 'Jul', tempCelsius: 39.8, precipitationMm: 0 },
      { month: 'Aug', tempCelsius: 39.5, precipitationMm: 0 },
      { month: 'Sep', tempCelsius: 35.8, precipitationMm: 0 },
      { month: 'Oct', tempCelsius: 29.5, precipitationMm: 3 },
      { month: 'Nov', tempCelsius: 21.5, precipitationMm: 18 },
      { month: 'Dec', tempCelsius: 15.5, precipitationMm: 24 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 0,
    topLandmarks: [
      {
        name: 'Kuwait Towers (Abraj Al-Kuwait)',
        location: 'Sharq, Kuwait City',
        category: 'Architectural',
        description: 'Iconic triad of slender reinforced-concrete towers clad in thousands of enamelled steel discs, symbolizing modern Kuwait’s economic resurgence.',
        imageUrl: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&auto=format&fit=crop',
        unescoDesignated: false,
      },
      {
        name: 'Grand Mosque of Kuwait (Al-Masjid Al-Kabir)',
        location: 'Kuwait City',
        category: 'Architectural',
        description: 'Magnificent 45,000-square-meter national mosque featuring traditional Andalusian tilework, teakwood doors, and a massive central dome.',
        imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&auto=format&fit=crop',
        unescoDesignated: false,
      },
      {
        name: 'Sheikh Jaber Al-Ahmad Cultural Centre (Opera House)',
        location: 'Kuwait City',
        category: 'Cultural',
        description: 'Titanium-and-glass jewel-like cultural district known as the "Cultural District Jewels", hosting world-class performing arts.',
        imageUrl: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800&auto=format&fit=crop',
        unescoDesignated: false,
      },
    ],
    culinaryTraditions: [
      { name: 'Machboos Laham', description: 'National dish consisting of aromatic spiced basmati rice infused with dried lime (loomi) and rosewater, topped with fork-tender slow-cooked lamb and daqqus tomato sauce.', nationalStatus: true },
      { name: 'Mutabbaq Samak', description: 'Fried Zubaidi (silver pomfret) fish served over spiced rice with caramelized onions and turmeric.' },
      { name: 'Gers Ogaily', description: 'Fragrant traditional sponge cake infused with cardamom, saffron, and toasted sesame seeds.' },
    ],
    culturalNormsAndEtiquette: [
      'The traditional Diwaniya gathering is the central social and political discussion salon in Kuwaiti life.',
      'Kuwaiti hospitality is marked by generous banquets and offering of Arabian incense (Bukhoor) following meals.',
      'Business meetings start with extended cordial personal pleasantries before commercial discussions commence.',
    ],
    luxuryLifestyle: {
      fiveStarHotelsCount: 35,
      yachtMarinasAndAviation: [
        'Marina Yacht Club Salmiya (Arabian Gulf)',
        'Souq Sharq Marina Kuwait City',
        'Kuwait International Airport (KWI) Private VIP Terminal',
      ],
      primeResidentialTier: 'Ultra-Prime',
      residencyOrGoldenVisaAvailable: false,
      taxNotes: 'Zero personal individual income tax; zero capital gains tax for individuals; statutory corporate levies on foreign enterprises.',
    },
  },

  analyticalPeers: {
    economicTwins: ['qatar', 'united-arab-emirates', 'saudi-arabia'],
    climaticTwins: ['qatar', 'united-arab-emirates'],
    regionalNeighbors: ['saudi-arabia', 'iraq'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Central Bank of Kuwait (CBK) & Kuwait Central Statistical Bureau (CSB)', referenceUrl: 'https://www.cbk.gov.kw' },
      { domain: 'Sovereign Wealth', sourceName: 'Kuwait Investment Authority (KIA) Official Overview', referenceUrl: 'https://www.kia.gov.kw' },
      { domain: 'IMF', sourceName: 'International Monetary Fund (IMF) World Economic Outlook 2024', referenceUrl: 'https://www.imf.org' },
    ],
  },
};
