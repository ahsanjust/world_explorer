import { Subregion } from '../types/spatial';

export const SUBREGIONS: Subregion[] = [
  // ASIA
  {
    id: 'middle-east',
    regionId: 'asia',
    name: 'Middle East & West Asia',
    description: 'The historic crossroads of three continents, defined by sovereign wealth, energy resources, ancient civilizations, and rapid hyper-modernization.',
    countries: ['QAT', 'ARE', 'SAU', 'OMN', 'KWT', 'BHR'],
    centerCoordinates: [25.3548, 51.1839],
    bounds: [[12.0, 34.0], [38.0, 60.0]],
  },
  {
    id: 'east-asia',
    regionId: 'asia',
    name: 'East Asia',
    description: 'Global epicenter of high-tech manufacturing, semiconductor supply chains, mega-cities, and millennia-old philosophical traditions.',
    countries: ['JPN', 'KOR', 'CHN', 'TWN'],
    centerCoordinates: [36.2048, 138.2529],
    bounds: [[20.0, 100.0], [50.0, 145.0]],
  },
  {
    id: 'southeast-asia',
    regionId: 'asia',
    name: 'Southeast Asia',
    description: 'Dynamic tropical archipelago and continental trade routes connecting the Indian Ocean and the South China Sea.',
    countries: ['SGP', 'MYS', 'IDN', 'THA', 'VNM'],
    centerCoordinates: [1.3521, 103.8198],
    bounds: [[-11.0, 95.0], [21.0, 141.0]],
  },

  // EUROPE
  {
    id: 'western-europe',
    regionId: 'europe',
    name: 'Western Europe',
    description: 'Economic and diplomatic core of Europe, renowned for advanced industry, high median wealth, alpine scenery, and historic capitals.',
    countries: ['CHE', 'DEU', 'FRA', 'NLD', 'BEL', 'AUT'],
    centerCoordinates: [46.8182, 8.2275],
    bounds: [[42.0, -5.0], [55.0, 16.0]],
  },
  {
    id: 'northern-europe',
    regionId: 'europe',
    name: 'Northern Europe',
    description: 'The Nordic and Baltic states leading global rankings in human development, institutional trust, environmental sustainability, and innovation.',
    countries: ['NOR', 'SWE', 'DNK', 'FIN', 'ISL', 'GBR'],
    centerCoordinates: [60.472, 8.4689],
    bounds: [[50.0, -25.0], [71.0, 32.0]],
  },

  // AMERICAS
  {
    id: 'north-america',
    regionId: 'americas',
    name: 'North America',
    description: 'Major global financial markets, premier research universities, vast continental biome diversity, and leading technological hubs.',
    countries: ['USA', 'CAN', 'MEX'],
    centerCoordinates: [37.0902, -95.7129],
    bounds: [[24.0, -125.0], [50.0, -65.0]],
  },
  {
    id: 'south-america',
    regionId: 'americas',
    name: 'South America',
    description: 'Home to the Amazon river basin, the Andean mountain chain, extraordinary cultural heritage, and vast agricultural and mineral reserves.',
    countries: ['BRA', 'ARG', 'CHL', 'COL', 'PER'],
    centerCoordinates: [-14.235, -51.9253],
    bounds: [[-56.0, -82.0], [13.0, -34.0]],
  },

  // AFRICA
  {
    id: 'north-africa',
    regionId: 'africa',
    name: 'North Africa',
    description: 'Mediterranean coastline, the Sahara desert, historic Nile basin civilization, and strategic trans-continental maritime gateways.',
    countries: ['EGY', 'MAR', 'DZA', 'TUN'],
    centerCoordinates: [26.8206, 30.8025],
    bounds: [[20.0, -15.0], [37.0, 36.0]],
  },
  {
    id: 'east-africa',
    regionId: 'africa',
    name: 'East Africa',
    description: 'The Great Rift Valley, world-famous wildlife conservation ecosystems, coffee origin highlands, and East Africa’s technological Silicon Savannah.',
    countries: ['KEN', 'TZA', 'RWA', 'ETH', 'UGA'],
    centerCoordinates: [-0.0236, 37.9062],
    bounds: [[-12.0, 28.0], [15.0, 51.0]],
  },
  {
    id: 'southern-africa',
    regionId: 'africa',
    name: 'Southern Africa',
    description: 'Rich mineral endowments, diverse ecological biomes, the Cape floral kingdom, and Southern Africa’s industrial and financial engine.',
    countries: ['ZAF', 'NAM', 'BWA'],
    centerCoordinates: [-30.5595, 22.9375],
    bounds: [[-35.0, 16.0], [-22.0, 33.0]],
  },

  // OCEANIA
  {
    id: 'australasia',
    regionId: 'oceania',
    name: 'Australasia',
    description: 'Australia and New Zealand, featuring isolated biodiversity, high personal freedom, expansive coastlines, and pristine natural wonders.',
    countries: ['AUS', 'NZL'],
    centerCoordinates: [-25.2744, 133.7751],
    bounds: [[-48.0, 110.0], [-10.0, 180.0]],
  },
];
