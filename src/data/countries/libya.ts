import { CountryProfile } from '../../types/country';
import { buildSovereignProfile } from './sovereignDossier';

/**
 * Libya — full sovereign dossier (subregion: north-africa).
 *
 * Seed fields are the country's own; the shared builder in `sovereignDossier.ts`
 * supplies the fields that are still awaiting per-country research.
 */
export const LIBYA: CountryProfile = buildSovereignProfile({
    id: 'libya',
    iso2: 'LY',
    iso3: 'LBY',
    unCode: '434',
    name: 'Libya',
    officialName: 'State of Libya',
    nativeCommon: 'ليبيا',
    nativeOfficial: 'دولة ليبيا',
    subregionId: 'north-africa',
    capitalName: 'Tripoli',
    capitalCoords: [32.8872, 13.1913],
    majorCities: ['Tripoli', 'Benghazi', 'Misrata', 'Bayda', 'Zawiya', 'Tobruk', 'Sabha'],
    flagEmoji: '🇱🇾',
    flagColors: ['#E70013', '#000000', '#239E46', '#FFFFFF'],
    tagline: 'Vast Mediterranean coastline guarding Africa’s largest proven crude oil reserves and pristine Roman ruins.',
    overview: 'Covering substantial Saharan territory along the central Mediterranean coast, Libya features dramatic classical cities such as Leptis Magna and Sabratha, funded by major hydrocarbon wealth.',
    areaKm2: 1759540,
    coastlineKm: 1770,
    borders: [
      { iso3: 'EGY', name: 'Egypt', lengthKm: 1115 },
      { iso3: 'TUN', name: 'Tunisia', lengthKm: 459 },
      { iso3: 'DZA', name: 'Algeria', lengthKm: 982 },
      { iso3: 'SDN', name: 'Sudan', lengthKm: 383 },
    ],
    highestName: 'Bikku Bitti',
    highestElevation: 2267,
    lowestName: 'Sabkhat Ghuzayyil',
    lowestElevation: -47,
    timezone: 'Africa/Tripoli (UTC+2)',
    coordinates: [26.3351, 17.2283],
    population: 6900000,
    medianAge: 29.2,
    urbanizationRate: 81.1,
    lifeExpectancy: 73.1,
    fertilityRate: 2.3,
    gdpNominalUsdBillions: 50.0,
    gdpPppUsdBillions: 147.0,
    gdpPerCapitaPppUsd: 21500,
    currencyCode: 'LYD',
    currencyName: 'Libyan Dinar',
    currencySymbol: 'ل.د',
    isPegged: false,
    fallbackRate: 4.85,
    literacyRate: 91.4,
    tertiaryEnrollment: 60.0,
    safetyIndex: 39.5,
    crimeIndex: 60.5,
    peaceIndexRank: 137,
    peaceIndexScore: 2.76,
    koppenCode: 'BWh',
    koppenTitle: 'Mediterranean Coast to Hyper-Arid Sahara',
    climateSummary: 'Warm Mediterranean climate along the northern littoral; extremely hot and hyper-arid desert across 90% of the land.',
    avgTemp: 22.0,
    avgRainfall: 140,
    unescoCount: 5,
    landmarks: [
      { name: 'Leptis Magna', location: 'Al-Khums', description: 'Prominent city of the Roman Empire, renowned for the Arch of Septimius Severus and theatre.', imageUrl: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&auto=format&fit=crop' },
      { name: 'Old Town of Ghadames', location: 'Ghadames Oasis', description: 'The "Pearl of the Desert", a pre-Saharan mudbrick architectural oasis.', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop' },
    ],
    culinaryTraditions: [
      { name: 'Bazeen', description: 'Barley flour dough dome surrounded by spiced tomato sauce, lamb meat, potatoes, and hard-boiled eggs.' },
      { name: 'Usban', description: 'Traditional sausage stuffed with spiced rice, herbs, and minced lamb tripe.' },
    ],
    languages: [
      { name: 'Arabic', isOfficial: true },
    ],
    mainIndustries: ['Oil & Gas', 'Petrochemicals', 'Cement & Construction', 'Agriculture (dates & olives)', 'Fishing'],
    topExports: ['Crude oil', 'Natural gas', 'Petroleum products', 'Chemicals'],
});
