import { CountryProfile } from '../../types/country';

export const SWITZERLAND: CountryProfile = {
  id: 'switzerland',
  iso2: 'CH',
  iso3: 'CHE',
  unCode: '756',
  name: 'Switzerland',
  officialName: 'Swiss Confederation',
  nativeNames: [
    { languageCode: 'deu', common: 'Schweiz', official: 'Schweizerische Eidgenossenschaft' },
    { languageCode: 'fra', common: 'Suisse', official: 'Confédération suisse' },
    { languageCode: 'ita', common: 'Svizzera', official: 'Confederazione Svizzera' },
  ],
  regionId: 'europe',
  subregionId: 'western-europe',
  capital: {
    name: 'Bern (Federal City)',
    coordinates: [46.9480, 7.4474],
  },
  majorCities: ['Zurich', 'Geneva', 'Basel', 'Lausanne', 'Bern', 'Lucerne'],
  flag: {
    emoji: '🇨🇭',
    svgUrl: 'https://flagcdn.com/ch.svg',
    colors: ['#FF0000', '#FFFFFF'],
    aspectRatio: '1:1', // Distinctive square flag
  },
  tagline: 'Alpine confederation of direct democracy, sovereign monetary stability, and high median household wealth.',
  overview: 'Situated at the crossroads of Central Europe, Switzerland is defined by its armed neutrality, decentralized cantonal democracy, leading research universities, high precision engineering, and the majestic peaks of the Alps.',

  geography: {
    landAreaKm2: 41285,
    waterPercentage: 4.2,
    coastlineKm: 0, // Landlocked
    borders: [
      { iso3: 'DEU', name: 'Germany', lengthKm: 334 },
      { iso3: 'FRA', name: 'France', lengthKm: 573 },
      { iso3: 'ITA', name: 'Italy', lengthKm: 740 },
      { iso3: 'AUT', name: 'Austria', lengthKm: 164 },
      { iso3: 'LIE', name: 'Liechtenstein', lengthKm: 41 },
    ],
    highestPoint: { name: 'Dufourspitze (Monte Rosa)', elevationMeters: 4634 },
    lowestPoint: { name: 'Lake Maggiore', elevationMeters: 193 },
    timezones: ['Europe/Zurich (UTC+1, CEST UTC+2)'],
    coordinates: [46.8182, 8.2275],
  },

  demographics: {
    population: 8900000,
    populationYear: 2024,
    densityPerKm2: 215.6,
    medianAge: 43.1,
    urbanizationRate: 74.0,
    lifeExpectancyYears: 84.0,
    fertilityRate: 1.52,
    languages: [
      { name: 'German (Swiss German)', isOfficial: true, percentSpoken: 62 },
      { name: 'French', isOfficial: true, percentSpoken: 23 },
      { name: 'Italian', isOfficial: true, percentSpoken: 8 },
      { name: 'Romansh', isOfficial: true, percentSpoken: 0.5 },
    ],
    ageDistribution: {
      under15Percent: 14.9,
      fifteenTo64Percent: 66.1,
      sixtyFivePlusPercent: 19.0,
    },
  },

  economy: {
    gdpNominalUsdBillions: 905.0,
    gdpPppUsdBillions: 780.0,
    gdpPerCapitaPppUsd: 87900,
    gdpPerCapitaNominalUsd: 101700,
    realGdpGrowthPercent: 1.3,
    inflationRatePercent: 1.4,
    unemploymentRatePercent: 2.1,
    publicDebtPercentOfGdp: 39.1,
    giniCoefficient: 32.7,
    mainIndustries: [
      'Pharmaceuticals & Biotech (Novartis, Roche)',
      'Private Wealth Banking & Financial Services',
      'Haute Horlogerie & Precision Watchmaking (Rolex, Patek Philippe)',
      'Precision Machinery & Specialized Instruments',
      'Commodity Trading Hubs',
    ],
    trade: {
      topExports: ['Pharmaceuticals & Vaccines', 'Gold & Precious Metals', 'Watches & Clocks', 'Machinery', 'Chemicals'],
      topExportPartners: [
        { country: 'United States', sharePercent: 18.2 },
        { country: 'Germany', sharePercent: 15.1 },
        { country: 'China', sharePercent: 7.2 },
        { country: 'Italy', sharePercent: 6.4 },
      ],
      topImportPartners: [
        { country: 'Germany', sharePercent: 20.8 },
        { country: 'Italy', sharePercent: 8.9 },
        { country: 'United States', sharePercent: 7.4 },
        { country: 'France', sharePercent: 6.9 },
      ],
    },
  },

  currency: {
    code: 'CHF',
    name: 'Swiss Franc',
    symbol: 'CHF',
    fractionalUnit: 'Rappen / Centime',
    isPegged: false,
    fallbackUsdRate: 0.88,
  },

  education: {
    literacyRatePercent: 99.0,
    tertiaryEnrollmentRatePercent: 61.2,
    educationExpenditurePercentGdp: 5.1,
    topUniversities: [
      {
        name: 'ETH Zurich (Swiss Federal Institute of Technology)',
        globalRankQs: 7, // Ranked #7 globally, #1 in Continental Europe
        city: 'Zurich',
        notableFields: ['Computer Science', 'Physics (Einstein Alma Mater)', 'Robotics & AI', 'Architecture'],
      },
      {
        name: 'EPFL (École Polytechnique Fédérale de Lausanne)',
        globalRankQs: 26,
        city: 'Lausanne',
        notableFields: ['Bioengineering', 'Data Science', 'Clean Energy'],
      },
      {
        name: 'University of Zurich (UZH)',
        globalRankQs: 91,
        city: 'Zurich',
        notableFields: ['Medicine', 'Quantitative Finance', 'Economics'],
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 114.2, // Higher than NYC
    rentIndex: 68.4,
    groceriesIndex: 122.8,
    restaurantPriceIndex: 108.5,
    localPurchasingPowerIndex: 118.9, // Offset by very high local wages
    samplePricesUsd: {
      inexpensiveMeal: 28.0,
      midRangeMealTwoPeople: 125.0,
      monthlyOneBedroomCityCenterRent: 2150.0,
      monthlyPassTransit: 92.0,
      coffeeCappuccino: 5.8,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 6,
    globalPeaceIndexScore: 1.350,
    safetyIndexNumbeo: 78.9,
    crimeIndexNumbeo: 21.1,
    homicideRatePer100k: 0.54,
    politicalStabilityScore: 1.48, // World-leading stability
    pressFreedomIndexRank: 9,
  },

  climate: {
    koppenCode: 'Cfb',
    koppenTitle: 'Temperate Oceanic & Alpine',
    summary: 'Temperate climate moderated by Atlantic breezes in lowlands with continental and polar conditions across the high Alps.',
    averageAnnualTempCelsius: 9.3,
    averageAnnualRainfallMm: 1080,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 0.3, precipitationMm: 63 },
      { month: 'Feb', tempCelsius: 1.3, precipitationMm: 64 },
      { month: 'Mar', tempCelsius: 5.3, precipitationMm: 78 },
      { month: 'Apr', tempCelsius: 9.4, precipitationMm: 82 },
      { month: 'May', tempCelsius: 13.9, precipitationMm: 122 },
      { month: 'Jun', tempCelsius: 17.3, precipitationMm: 128 },
      { month: 'Jul', tempCelsius: 19.3, precipitationMm: 124 },
      { month: 'Aug', tempCelsius: 18.7, precipitationMm: 120 },
      { month: 'Sep', tempCelsius: 14.6, precipitationMm: 99 },
      { month: 'Oct', tempCelsius: 9.8, precipitationMm: 86 },
      { month: 'Nov', tempCelsius: 4.4, precipitationMm: 79 },
      { month: 'Dec', tempCelsius: 1.2, precipitationMm: 75 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 13,
    topLandmarks: [
      {
        name: 'The Matterhorn',
        location: 'Zermatt, Valais',
        category: 'Natural',
        description: 'Chiseled pyramid peak rising 4,478 meters above Zermatt, one of the most photographed mountains on Earth.',
        imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: false,
      },
      {
        name: 'Old City of Bern',
        location: 'Bern',
        category: 'Historical',
        description: 'UNESCO World Heritage medieval sandstone old town surrounded by the loop of the River Aare with 6 km of historic arcades.',
        imageUrl: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
      {
        name: 'Jungfrau-Aletsch Glacier',
        location: 'Bernese Alps',
        category: 'Natural',
        description: 'The largest glacier in Eurasia, stretching 23 kilometers through the high Bernese Alpine UNESCO protected zone.',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
    ],
    culinaryTraditions: [
      {
        name: 'Swiss Cheese Fondue & Raclette',
        description: 'Melted Gruyère and Emmental cheeses simmered with white wine and kirsch, served in a communal caquelon pot.',
        nationalStatus: true,
      },
      {
        name: 'Rösti',
        description: 'Crispy pan-fried shredded potato cake originating as a hearty breakfast for Bernese farmers.',
        nationalStatus: false,
      },
      {
        name: 'Swiss Chocolate Confectionery',
        description: 'Invention of milk chocolate and conching by Rodolphe Lindt and Daniel Peter that revolutionized confectionery.',
        nationalStatus: false,
      },
    ],
    culturalNormsAndEtiquette: [
      'Punctuality is regarded as a fundamental sign of respect across all professional and personal encounters.',
      'Quiet hours: Strict evening and Sunday peace regulations are observed in residential neighborhoods.',
      'Direct communication: Swiss society values honesty, clarity, and modesty over exaggeration.',
      'Environmental stewardship: Meticulous recycling sorting and preservation of trail etiquette.',
    ],
    luxuryLifestyle: {
      michelinStarredVenuesCount: 138,
      fiveStarHotelsCount: 95,
      yachtMarinasAndAviation: ['Lake Geneva Private Moorings', 'Zurich Airport VIP Lounge', 'St. Moritz Engadin Airport'],
      primeResidentialTier: 'Ultra-Prime',
      residencyOrGoldenVisaAvailable: true, // Cantonal lump-sum taxation (Forfait fiscal) for qualifying individuals
      taxNotes: 'Competitive federal plus cantonal tax system with cantonal autonomy.',
    },
  },

  analyticalPeers: {
    economicTwins: ['norway', 'singapore', 'qatar'],
    climaticTwins: ['germany', 'norway'],
    regionalNeighbors: ['germany'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Swiss Federal Statistical Office (FSO) & IMF WEO 2024' },
      { domain: 'Wealth', sourceName: 'UBS Global Wealth Report 2024' },
      { domain: 'Universities', sourceName: 'QS World University Rankings 2024 (ETH Zurich #7)' },
    ],
  },
};
