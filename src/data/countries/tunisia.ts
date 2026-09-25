import { CountryProfile } from '../../types/country';
import { buildSovereignProfile } from './sovereignDossier';

/**
 * Tunisia — full sovereign dossier (subregion: north-africa).
 *
 * Seed fields are the country's own; the shared builder in `sovereignDossier.ts`
 * supplies the fields that are still awaiting per-country research.
 */
export const TUNISIA: CountryProfile = buildSovereignProfile({
    id: 'tunisia',
    iso2: 'TN',
    iso3: 'TUN',
    unCode: '788',
    name: 'Tunisia',
    officialName: 'Republic of Tunisia',
    nativeCommon: 'تونس',
    nativeOfficial: 'الجمهورية التونسية',
    subregionId: 'north-africa',
    capitalName: 'Tunis',
    capitalCoords: [36.8065, 10.1815],
    majorCities: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabès'],
    flagEmoji: '🇹🇳',
    flagColors: ['#E70013', '#FFFFFF'],
    tagline: 'Carthaginian maritime cradle at the narrow waist of the Mediterranean, noted for education, olive groves, and tourism.',
    overview: 'Positioned at the geographical center of Mediterranean trade, Tunisia was the heartland of the ancient Carthaginian Empire and the birthplace of the modern Arab Spring.',
    areaKm2: 163610,
    coastlineKm: 1148,
    borders: [
      { iso3: 'DZA', name: 'Algeria', lengthKm: 1010 },
      { iso3: 'LBY', name: 'Libya', lengthKm: 461 },
    ],
    highestName: 'Jebel ech Chambi',
    highestElevation: 1544,
    lowestName: 'Chott el Djerid',
    lowestElevation: -17,
    timezone: 'Africa/Tunis (UTC+1)',
    coordinates: [33.8869, 9.5375],
    population: 12400000,
    medianAge: 33.1,
    urbanizationRate: 70.2,
    lifeExpectancy: 76.5,
    fertilityRate: 2.1,
    gdpNominalUsdBillions: 51.5,
    gdpPppUsdBillions: 162.0,
    gdpPerCapitaPppUsd: 13100,
    currencyCode: 'TND',
    currencyName: 'Tunisian Dinar',
    currencySymbol: 'د.ت',
    isPegged: false,
    fallbackRate: 3.08,
    literacyRate: 82.3,
    tertiaryEnrollment: 33.5,
    safetyIndex: 56.4,
    crimeIndex: 43.6,
    peaceIndexRank: 73,
    peaceIndexScore: 1.96,
    koppenCode: 'Csa',
    koppenTitle: 'Warm Mediterranean & Semi-Arid',
    climateSummary: 'Mediterranean maritime climate in the north, transitioning to desert oasis in the south.',
    avgTemp: 19.5,
    avgRainfall: 420,
    unescoCount: 9,
    landmarks: [
      { name: 'Amphitheatre of El Jem', location: 'El Jem', description: 'Magnificent 3rd-century Roman amphitheatre rivaling the Colosseum.', imageUrl: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800&auto=format&fit=crop' },
      { name: 'Carthage Archaeological Site', location: 'Tunis', description: 'Ancient Phoenician metropolis and naval super-power.', imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop' },
    ],
    culinaryTraditions: [
      { name: 'Brik à l’Œuf', description: 'Crisp deep-fried pastry pocket filled with egg, tuna, capers, and parsley.' },
      { name: 'Ojja with Merguez', description: 'Poached eggs in rich spicy tomato-pepper stew with spicy lamb sausages.' },
    ],
    languages: [
      { name: 'Arabic', isOfficial: true },
      { name: 'French', isOfficial: false },
    ],
    mainIndustries: ['Textiles & Apparel', 'Electrical & Mechanical Engineering', 'Olive Oil & Agri-food', 'Tourism', 'Phosphate Mining'],
    topExports: ['Textiles & clothing', 'Electrical components', 'Olive oil', 'Phosphates & chemicals'],
});
