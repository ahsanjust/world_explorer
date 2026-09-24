import { CountryProfile } from '../../types/country';

export const GERMANY: CountryProfile = {
  id: 'germany',
  iso2: 'DE',
  iso3: 'DEU',
  unCode: '276',
  name: 'Germany',
  officialName: 'Federal Republic of Germany',
  nativeNames: [
    { languageCode: 'deu', common: 'Deutschland', official: 'Bundesrepublik Deutschland' },
  ],
  regionId: 'europe',
  subregionId: 'western-europe',
  capital: {
    name: 'Berlin',
    coordinates: [52.5200, 13.4050],
  },
  majorCities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne', 'Stuttgart'],
  flag: {
    emoji: '🇩🇪',
    svgUrl: 'https://flagcdn.com/de.svg',
    colors: ['#000000', '#DD0000', '#FFCC00'],
    aspectRatio: '3:5',
  },
  tagline: 'Europe’s economic powerhouse, defined by precision engineering, philosophy, and renewable energy transition.',
  overview: 'Situated at the heart of Europe, Germany is the continent’s most populous democracy and largest national economy, celebrated for its Mittelstand precision manufacturing, legendary automotive brands, and philosophical traditions.',

  geography: {
    landAreaKm2: 357588,
    waterPercentage: 2.18,
    coastlineKm: 2389,
    borders: [
      { iso3: 'DNK', name: 'Denmark', lengthKm: 140 },
      { iso3: 'POL', name: 'Poland', lengthKm: 467 },
      { iso3: 'CZE', name: 'Czechia', lengthKm: 704 },
      { iso3: 'AUT', name: 'Austria', lengthKm: 801 },
      { iso3: 'CHE', name: 'Switzerland', lengthKm: 334 },
      { iso3: 'FRA', name: 'France', lengthKm: 448 },
      { iso3: 'LUX', name: 'Luxembourg', lengthKm: 128 },
      { iso3: 'BEL', name: 'Belgium', lengthKm: 133 },
      { iso3: 'NLD', name: 'Netherlands', lengthKm: 575 },
    ],
    highestPoint: { name: 'Zugspitze', elevationMeters: 2962 },
    lowestPoint: { name: 'Neuendorf-Sachsenbande', elevationMeters: -3.5 },
    timezones: ['Europe/Berlin (UTC+1, CEST UTC+2)'],
    coordinates: [51.1657, 10.4515],
  },

  demographics: {
    population: 84600000,
    populationYear: 2024,
    densityPerKm2: 236.6,
    medianAge: 46.8,
    urbanizationRate: 77.8,
    lifeExpectancyYears: 81.2,
    fertilityRate: 1.46,
    languages: [
      { name: 'German', isOfficial: true, percentSpoken: 95 },
    ],
    ageDistribution: {
      under15Percent: 13.9,
      fifteenTo64Percent: 63.8,
      sixtyFivePlusPercent: 22.3,
    },
  },

  economy: {
    gdpNominalUsdBillions: 4590.0,
    gdpPppUsdBillions: 5680.0,
    gdpPerCapitaPppUsd: 67200,
    gdpPerCapitaNominalUsd: 54300,
    realGdpGrowthPercent: 0.3,
    inflationRatePercent: 2.3,
    unemploymentRatePercent: 3.4,
    publicDebtPercentOfGdp: 63.7,
    giniCoefficient: 31.7,
    mainIndustries: [
      'Automotive Engineering (BMW, Mercedes-Benz, Volkswagen Group, Porsche)',
      'Industrial Machinery & Factory Automation (Siemens, Bosch)',
      'Chemicals & Advanced Materials (BASF, Bayer)',
      'Renewable Energy Tech & Wind Turbines',
      'Banking & Central Finance (ECB Seat in Frankfurt)',
    ],
    trade: {
      topExports: ['Motor vehicles & parts', 'Machinery', 'Chemical products', 'Computer & optical electronics', 'Pharmaceuticals'],
      topExportPartners: [
        { country: 'United States', sharePercent: 10.4 },
        { country: 'France', sharePercent: 7.5 },
        { country: 'Netherlands', sharePercent: 6.8 },
        { country: 'China', sharePercent: 6.2 },
      ],
      topImportPartners: [
        { country: 'China', sharePercent: 11.5 },
        { country: 'Netherlands', sharePercent: 8.9 },
        { country: 'Poland', sharePercent: 6.2 },
        { country: 'United States', sharePercent: 5.9 },
      ],
    },
  },

  currency: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    fractionalUnit: 'Cent',
    isPegged: false,
    fallbackUsdRate: 0.92,
  },

  education: {
    literacyRatePercent: 99.0,
    tertiaryEnrollmentRatePercent: 73.5,
    educationExpenditurePercentGdp: 4.8,
    topUniversities: [
      {
        name: 'Technical University of Munich (TUM)',
        globalRankQs: 28,
        city: 'Munich',
        notableFields: ['Automotive Engineering', 'Artificial Intelligence', 'Physics'],
        websiteUrl: 'https://www.tum.de/en',
      },
      {
        name: 'Ludwig Maximilian University of Munich (LMU)',
        globalRankQs: 59,
        city: 'Munich',
        notableFields: ['Medicine', 'Philosophy', 'Law'],
        websiteUrl: 'https://www.lmu.de/en',
      },
      {
        name: 'Heidelberg University (Ruprecht-Karls)',
        globalRankQs: 84,
        city: 'Heidelberg',
        notableFields: ['Oldest German University (1386)', 'Medicine', 'Genetics'],
        websiteUrl: 'https://www.uni-heidelberg.de/en',
      },
      {
        name: 'Free University of Berlin (Freie Universität Berlin)',
        globalRankQs: 98,
        city: 'Berlin',
        notableFields: ['Political Science', 'Humanities', 'Social Sciences'],
        websiteUrl: 'https://www.fu-berlin.de/en',
      },
      {
        name: 'RWTH Aachen University',
        globalRankQs: 99,
        city: 'Aachen',
        notableFields: ['Mechanical Engineering', 'Materials Science', 'Electrical Engineering'],
        websiteUrl: 'https://www.rwth-aachen.de',
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 65.4,
    rentIndex: 31.8,
    groceriesIndex: 58.6,
    restaurantPriceIndex: 55.4,
    localPurchasingPowerIndex: 98.7,
    samplePricesUsd: {
      inexpensiveMeal: 14.0,
      midRangeMealTwoPeople: 65.0,
      monthlyOneBedroomCityCenterRent: 1050.0,
      monthlyPassTransit: 53.0, // €49 Deutschlandticket national transit pass
      coffeeCappuccino: 3.8,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 20,
    globalPeaceIndexScore: 1.542,
    safetyIndexNumbeo: 62.4,
    crimeIndexNumbeo: 37.6,
    homicideRatePer100k: 0.82,
    politicalStabilityScore: 0.88,
    pressFreedomIndexRank: 10,
  },

  climate: {
    koppenCode: 'Cfb',
    koppenTitle: 'Temperate Oceanic',
    summary: 'Moderate climate with warm summers and cool, overcast winters; maritime conditions prevail across northwest lowlands.',
    averageAnnualTempCelsius: 9.8,
    averageAnnualRainfallMm: 780,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 0.8, precipitationMm: 42 },
      { month: 'Feb', tempCelsius: 1.8, precipitationMm: 35 },
      { month: 'Mar', tempCelsius: 5.5, precipitationMm: 41 },
      { month: 'Apr', tempCelsius: 10.1, precipitationMm: 36 },
      { month: 'May', tempCelsius: 14.8, precipitationMm: 54 },
      { month: 'Jun', tempCelsius: 18.2, precipitationMm: 62 },
      { month: 'Jul', tempCelsius: 20.1, precipitationMm: 65 },
      { month: 'Aug', tempCelsius: 19.6, precipitationMm: 58 },
      { month: 'Sep', tempCelsius: 15.2, precipitationMm: 47 },
      { month: 'Oct', tempCelsius: 10.3, precipitationMm: 41 },
      { month: 'Nov', tempCelsius: 5.4, precipitationMm: 44 },
      { month: 'Dec', tempCelsius: 1.9, precipitationMm: 46 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 54, // Third highest in the world
    topLandmarks: [
      {
        name: 'Neuschwanstein Castle',
        location: 'Hohenschwangau, Bavaria',
        category: 'Architectural',
        description: 'Fairy-tale 19th-century Romanesque Revival palace commissioned by King Ludwig II of Bavaria, inspiring the Disney castle.',
        imageUrl: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: false,
      },
      {
        name: 'Brandenburg Gate',
        location: 'Berlin',
        category: 'Historical',
        description: '18th-century neoclassical monument that stood as the symbol of Cold War division and subsequent German reunification.',
        imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: false,
      },
      {
        name: 'Cologne Cathedral (Kölner Dom)',
        location: 'Cologne',
        category: 'Historical',
        description: 'Monumental High Gothic cathedral housing the Shrine of the Three Kings, taking over six centuries to construct.',
        imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
    ],
    culinaryTraditions: [
      {
        name: 'Sauerbraten',
        description: 'Traditional German pot roast marinated for days in wine vinegar and herbs, served with potato dumplings and red cabbage.',
        nationalStatus: true,
      },
      {
        name: 'Bavarian Pretzel & Weißwurst',
        description: 'Traditional Munich morning meal of veal sausage, sweet mustard, and fresh lye pretzel with wheat beer.',
        nationalStatus: false,
      },
    ],
    culturalNormsAndEtiquette: [
      'Ordnung muss sein (Order is essential): Respect for civic structure, sorting, and traffic crossings.',
      'Feierabend: Clear division between professional labor and personal evening rest.',
      'Honest feedback: Constructive directness is preferred over artificial pleasantries.',
    ],
    luxuryLifestyle: {
      michelinStarredVenuesCount: 334,
      fiveStarHotelsCount: 110,
      yachtMarinasAndAviation: ['Kiel Yacht Club (Kieler Förde)', 'Munich Airport VIP Wing'],
      primeResidentialTier: 'High-Prime',
      residencyOrGoldenVisaAvailable: false, // Opportunity Card (Chancenkarte) points system
      taxNotes: 'Progressive federal tax with social solidarity surcharges.',
    },
  },

  analyticalPeers: {
    economicTwins: ['japan', 'united-states'],
    climaticTwins: ['united-kingdom', 'switzerland'],
    regionalNeighbors: ['switzerland', 'norway'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Federal Statistical Office (Destatis) & IMF WEO 2024' },
      { domain: 'Heritage', sourceName: 'UNESCO World Heritage List (54 properties)' },
    ],
  },
};
