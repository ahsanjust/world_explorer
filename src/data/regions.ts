import { Region } from '../types/spatial';

export const REGIONS: Region[] = [
  {
    id: 'asia',
    name: 'Asia',
    code: 'AS',
    hemisphere: 'Both',
    countryCount: 49,
    totalPopulation: 4750000000,
    totalGdpTrillionUsd: 39.5,
    overview: 'The largest and most populous continent, spanning the Arabian desert, the Himalayas, and East Asian economic titans.',
    subregions: ['middle-east', 'east-asia', 'southeast-asia', 'south-asia', 'central-asia'],
    focalCoordinates: [34.0479, 100.6197],
    focalZoom: 2.5,
    color: '#E5B558', // Gold
  },
  {
    id: 'europe',
    name: 'Europe',
    code: 'EU',
    hemisphere: 'Northern',
    countryCount: 44,
    totalPopulation: 742000000,
    totalGdpTrillionUsd: 24.8,
    overview: 'A historic heartland of science, law, and culture, defined by high quality of life, open trade networks, and dense architectural heritage.',
    subregions: ['western-europe', 'northern-europe', 'southern-europe', 'eastern-europe'],
    focalCoordinates: [54.526, 15.2551],
    focalZoom: 3.2,
    color: '#38BDF8', // Cyan
  },
  {
    id: 'americas',
    name: 'Americas',
    code: 'AM',
    hemisphere: 'Both',
    countryCount: 35,
    totalPopulation: 1040000000,
    totalGdpTrillionUsd: 34.2,
    overview: 'Stretching from the Canadian Arctic through the Isthmus of Panama to Tierra del Fuego, boasting vast natural resources and major consumer markets.',
    subregions: ['north-america', 'central-america', 'caribbean', 'south-america'],
    focalCoordinates: [19.4326, -99.1332],
    focalZoom: 2.2,
    color: '#34D399', // Emerald
  },
  {
    id: 'africa',
    name: 'Africa',
    code: 'AF',
    hemisphere: 'Both',
    countryCount: 54,
    totalPopulation: 1450000000,
    totalGdpTrillionUsd: 3.1,
    overview: 'The cradle of humankind with the world’s youngest demographic structure, boundless renewable potential, and extraordinary biomes.',
    subregions: ['north-africa', 'east-africa', 'west-africa', 'southern-africa', 'central-africa'],
    focalCoordinates: [2.0, 20.0],
    focalZoom: 2.3,
    color: '#FB7185', // Rose
  },
  {
    id: 'oceania',
    name: 'Oceania',
    code: 'OC',
    hemisphere: 'Southern',
    countryCount: 14,
    totalPopulation: 45000000,
    totalGdpTrillionUsd: 2.1,
    overview: 'A maritime realm encompassing the Australian continent and thousands of Pacific island archipelagos with unique biodiversity.',
    subregions: ['australasia', 'polynesia', 'melanesia', 'micronesia'],
    focalCoordinates: [-25.2744, 133.7751],
    focalZoom: 2.8,
    color: '#A78BFA', // Violet
  },
];
