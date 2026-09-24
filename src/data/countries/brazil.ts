import { CountryProfile } from '../../types/country';

export const BRAZIL: CountryProfile = {
  id: 'brazil',
  iso2: 'BR',
  iso3: 'BRA',
  unCode: '076',
  name: 'Brazil',
  officialName: 'Federative Republic of Brazil',
  nativeNames: [
    { languageCode: 'por', common: 'Brasil', official: 'República Federativa do Brasil' },
  ],
  regionId: 'americas',
  subregionId: 'south-america',
  capital: {
    name: 'Brasília',
    coordinates: [-15.7975, -47.8919],
  },
  majorCities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte'],
  flag: {
    emoji: '🇧🇷',
    svgUrl: 'https://flagcdn.com/br.svg',
    colors: ['#009C3B', '#FFDF00', '#002776'],
    aspectRatio: '7:10',
  },
  tagline: 'Continental titan of South America, steward of the Amazon rainforest, biofuels, and vibrant cultural biodiversity.',
  overview: 'The largest nation in South and Latin America, Brazil spans nearly half the South American continent. It holds the world’s greatest biological diversity in the Amazon Basin, is an agricultural and aeronautical powerhouse, and is celebrated globally for samba, carnival, and football.',

  geography: {
    landAreaKm2: 8515767,
    waterPercentage: 0.65,
    coastlineKm: 7491,
    borders: [
      { iso3: 'ARG', name: 'Argentina', lengthKm: 1261 },
      { iso3: 'BOL', name: 'Bolivia', lengthKm: 3423 },
      { iso3: 'COL', name: 'Colombia', lengthKm: 1644 },
      { iso3: 'PER', name: 'Peru', lengthKm: 2995 },
      { iso3: 'PRY', name: 'Paraguay', lengthKm: 1365 },
      { iso3: 'URY', name: 'Uruguay', lengthKm: 1068 },
      { iso3: 'VEN', name: 'Venezuela', lengthKm: 2200 },
    ],
    highestPoint: { name: 'Pico da Neblina', elevationMeters: 2995 },
    lowestPoint: { name: 'Atlantic Ocean', elevationMeters: 0 },
    timezones: ['America/Sao_Paulo (UTC-3) and others'],
    coordinates: [-14.2350, -51.9253],
  },

  demographics: {
    population: 216400000,
    populationYear: 2024,
    densityPerKm2: 25.4,
    medianAge: 33.5,
    urbanizationRate: 87.6,
    lifeExpectancyYears: 76.2,
    fertilityRate: 1.65,
    languages: [
      { name: 'Portuguese', isOfficial: true, percentSpoken: 99 },
    ],
    ageDistribution: {
      under15Percent: 20.2,
      fifteenTo64Percent: 69.8,
      sixtyFivePlusPercent: 10.0,
    },
  },

  economy: {
    gdpNominalUsdBillions: 2170.0,
    gdpPppUsdBillions: 4270.0,
    gdpPerCapitaPppUsd: 19800,
    gdpPerCapitaNominalUsd: 10100,
    realGdpGrowthPercent: 2.9,
    inflationRatePercent: 4.1,
    unemploymentRatePercent: 6.9,
    publicDebtPercentOfGdp: 88.6,
    giniCoefficient: 52.9,
    mainIndustries: [
      'Agribusiness & Soybeans (World’s #1 exporter)',
      'Iron Ore Mining & Steel (Vale)',
      'Deepwater Offshore Oil Extraction (Petrobras Pre-Salt)',
      'Commercial Aerospace Manufacturing (Embraer)',
      'Biofuels, Ethanol & Renewable Energy',
    ],
    trade: {
      topExports: ['Soybeans', 'Crude Petroleum', 'Iron Ore', 'Raw Sugar', 'Beef & Poultry'],
      topExportPartners: [
        { country: 'China', sharePercent: 30.7 },
        { country: 'United States', sharePercent: 11.2 },
        { country: 'Argentina', sharePercent: 5.1 },
        { country: 'Netherlands', sharePercent: 3.8 },
      ],
      topImportPartners: [
        { country: 'China', sharePercent: 22.4 },
        { country: 'United States', sharePercent: 17.5 },
        { country: 'Germany', sharePercent: 5.4 },
        { country: 'Argentina', sharePercent: 4.9 },
      ],
    },
  },

  currency: {
    code: 'BRL',
    name: 'Brazilian Real',
    symbol: 'R$',
    fractionalUnit: 'Centavo',
    isPegged: false,
    fallbackUsdRate: 5.45,
  },

  education: {
    literacyRatePercent: 94.3,
    tertiaryEnrollmentRatePercent: 51.0,
    educationExpenditurePercentGdp: 6.0,
    topUniversities: [
      {
        name: 'University of São Paulo (USP)',
        globalRankQs: 92, // Ranked #1 in Latin America
        city: 'São Paulo',
        notableFields: ['Agricultural Sciences', 'Tropical Medicine', 'Physics'],
      },
      {
        name: 'State University of Campinas (Unicamp)',
        globalRankQs: 220,
        city: 'Campinas, São Paulo',
        notableFields: ['Bioenergy', 'Computer Science', 'Chemical Engineering'],
      },
    ],
  },

  costOfLiving: {
    indexRelativeToNyc: 38.4,
    rentIndex: 12.8,
    groceriesIndex: 35.1,
    restaurantPriceIndex: 29.8,
    localPurchasingPowerIndex: 39.2,
    samplePricesUsd: {
      inexpensiveMeal: 6.2,
      midRangeMealTwoPeople: 32.0,
      monthlyOneBedroomCityCenterRent: 480.0,
      monthlyPassTransit: 45.0,
      coffeeCappuccino: 2.1,
    },
  },

  safetyAndGovernance: {
    globalPeaceIndexRank: 131,
    globalPeaceIndexScore: 2.458,
    safetyIndexNumbeo: 33.2,
    crimeIndexNumbeo: 66.8,
    homicideRatePer100k: 19.4,
    politicalStabilityScore: -0.25,
    pressFreedomIndexRank: 82,
  },

  climate: {
    koppenCode: 'Aw',
    koppenTitle: 'Tropical Rainforest & Savanna',
    summary: 'Dominated by equatorial and tropical climates with high humidity and year-round warmth, transitioning to subtropical conditions in the southern states.',
    averageAnnualTempCelsius: 24.8,
    averageAnnualRainfallMm: 1780,
    monthlyClimograph: [
      { month: 'Jan', tempCelsius: 26.5, precipitationMm: 240 },
      { month: 'Feb', tempCelsius: 26.8, precipitationMm: 215 },
      { month: 'Mar', tempCelsius: 26.2, precipitationMm: 190 },
      { month: 'Apr', tempCelsius: 25.1, precipitationMm: 110 },
      { month: 'May', tempCelsius: 23.4, precipitationMm: 65 },
      { month: 'Jun', tempCelsius: 22.1, precipitationMm: 45 },
      { month: 'Jul', tempCelsius: 21.8, precipitationMm: 35 },
      { month: 'Aug', tempCelsius: 22.9, precipitationMm: 40 },
      { month: 'Sep', tempCelsius: 23.8, precipitationMm: 80 },
      { month: 'Oct', tempCelsius: 24.9, precipitationMm: 135 },
      { month: 'Nov', tempCelsius: 25.4, precipitationMm: 175 },
      { month: 'Dec', tempCelsius: 26.1, precipitationMm: 225 },
    ],
  },

  cultureAndLifestyle: {
    unescoWorldHeritageCount: 23,
    topLandmarks: [
      {
        name: 'Christ the Redeemer (Cristo Redentor)',
        location: 'Mount Corcovado, Rio de Janeiro',
        category: 'Architectural',
        description: '30-meter Art Deco statue of Jesus Christ atop Mount Corcovado, chosen as one of the New Seven Wonders of the World.',
        imageUrl: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
      {
        name: 'Iguaçu Falls (Cataratas do Iguaçu)',
        location: 'Paraná State',
        category: 'Natural',
        description: 'Spectacular semicircular waterfall system of 275 drops spanning 2.7 km between Brazil and Argentina surrounded by lush rainforest.',
        imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
      {
        name: 'Amazon Rainforest & Rio Negro',
        location: 'Amazonas',
        category: 'Natural',
        description: 'World’s largest river basin and tropical biome, housing 10% of Earth’s known species and producing 20% of global oxygen.',
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        unescoDesignated: true,
      },
    ],
    culinaryTraditions: [
      {
        name: 'Feijoada',
        description: 'National rich black bean stew slow-simmered with salted pork trimmings, beef, and sausage, served with white rice, farofa, and orange slices.',
        nationalStatus: true,
      },
      {
        name: 'Churrasco',
        description: 'Southern gaucho tradition of skewered prime meats (especially picanha) grilled over open wood coals.',
        nationalStatus: false,
      },
      {
        name: 'Pão de Queijo',
        description: 'Beloved chewy gluten-free baked cheese rolls made from cassava starch and Minas cheese.',
        nationalStatus: false,
      },
    ],
    culturalNormsAndEtiquette: [
      'Warm physical greetings: Handshakes with light cheek kisses (one or two depending on state) are standard among acquaintances.',
      'Optimism and social warmth: Brazilians prioritize warmth, celebration, and familial gatherings.',
      'Samba and Carnaval: The national celebration preceding Lent is an internationally revered expression of rhythm and creative spectacle.',
    ],
    luxuryLifestyle: {
      michelinStarredVenuesCount: 14,
      fiveStarHotelsCount: 45,
      yachtMarinasAndAviation: ['Marina da Glória Rio', 'São Paulo Catarina Executive Airport'],
      primeResidentialTier: 'Established',
      residencyOrGoldenVisaAvailable: true, // Real estate investment visa
      taxNotes: 'Worldwide taxation on resident individuals with federal progressive income rates.',
    },
  },

  analyticalPeers: {
    economicTwins: ['kenya', 'united-states'],
    climaticTwins: ['singapore', 'kenya'],
    regionalNeighbors: ['united-states'],
  },

  metadata: {
    lastVerifiedDate: '2026-09-24',
    citations: [
      { domain: 'Economics', sourceName: 'Instituto Brasileiro de Geografia e Estatística (IBGE) & IMF WEO 2024' },
      { domain: 'Universities', sourceName: 'QS Latin America University Rankings 2024 (USP #1)' },
    ],
  },
};
