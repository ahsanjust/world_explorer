export interface ThematicPortal {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  countryIds: string[];
}

export const THEMATIC_PORTALS: ThematicPortal[] = [
  {
    id: 'sovereign-wealth',
    title: 'Sovereign Wealth & High-Income Hubs',
    tagline: 'Gulf financial titans with massive sovereign funds and among the highest GDP per capita on Earth.',
    description: 'Nations that have leveraged state reserves, natural wealth, and strategic commerce into high standards of living, robust public infrastructure, and extraordinary institutional wealth.',
    iconName: 'Coins',
    accentColor: '#E5B558', // Gold
    countryIds: ['qatar', 'united-arab-emirates'],
  },
  {
    id: 'ancient-heritage',
    title: 'Ancient Civilizations & Living Heritage',
    tagline: 'Millennia of pharaonic, Islamic, and Bedouin heritage shaping modern identity.',
    description: 'Civilizations that pioneered writing, urban planning, mathematics, and international commerce, whose monuments and traditions continue to shape the modern Middle East.',
    iconName: 'Landmark',
    accentColor: '#A78BFA', // Violet
    countryIds: ['egypt', 'qatar', 'united-arab-emirates'],
  },
  {
    id: 'future-megaprojects',
    title: 'Visionary Megaprojects & Hyper-Modernization',
    tagline: 'Desert skylines, smart cities, and audacious national transformation programs.',
    description: 'Nations investing sovereign capital into landmark architecture, new cultural districts, and post-hydrocarbon economic diversification — from Lusail and the New Administrative Capital to Saadiyat Island.',
    iconName: 'Globe2',
    accentColor: '#38BDF8', // Cyan
    countryIds: ['qatar', 'united-arab-emirates', 'egypt'],
  },
];
