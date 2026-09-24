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
    tagline: 'Global financial titans with massive sovereign funds and high GDP per capita.',
    description: 'Nations that have leveraged state reserves, natural wealth, or strategic commerce into high standards of living, robust public infrastructure, and extraordinary institutional wealth.',
    iconName: 'Coins',
    accentColor: '#E5B558', // Gold
    countryIds: ['qatar', 'united-arab-emirates', 'singapore', 'switzerland', 'norway'],
  },
  {
    id: 'safety-havens',
    title: 'Global Peace & High-Safety Havens',
    tagline: 'Countries with the lowest violent crime and top institutional stability.',
    description: 'Nations consistently ranking at the top of the Global Peace Index, defined by transparent judicial systems, social harmony, low homicide rates, and safe streets.',
    iconName: 'ShieldCheck',
    accentColor: '#34D399', // Emerald
    countryIds: ['switzerland', 'japan', 'singapore', 'norway', 'canada'],
  },
  {
    id: 'nordic-alpine',
    title: 'Nordic & Alpine Quality of Life',
    tagline: 'Pioneering sustainability, work-life equilibrium, and pristine nature.',
    description: 'Societies blending breathtaking alpine and fjord topography with high institutional trust, clean energy transitions, world-class healthcare, and social equity.',
    iconName: 'Mountain',
    accentColor: '#38BDF8', // Cyan
    countryIds: ['norway', 'switzerland', 'germany'],
  },
  {
    id: 'megadiverse-giants',
    title: 'Continental Giants & Megadiversity',
    tagline: 'Vast ecological realms spanning rainforests, deserts, and vast wildlife ecosystems.',
    description: 'Massive continental landmasses hosting the world’s most biodiverse wildernesses, critical carbon sinks, unique wildlife migrations, and expansive natural reserves.',
    iconName: 'Globe2',
    accentColor: '#FB7185', // Rose
    countryIds: ['brazil', 'united-states', 'canada', 'australia', 'kenya', 'south-africa'],
  },
  {
    id: 'ancient-heritage',
    title: 'Ancient Civilizations & Living Heritage',
    tagline: 'Millennia of human achievement, architecture, and enduring culture.',
    description: 'Civilizations that pioneered mathematics, philosophy, architecture, and international commerce, whose monuments and traditions continue to shape modern humanity.',
    iconName: 'Landmark',
    accentColor: '#A78BFA', // Violet
    countryIds: ['egypt', 'japan', 'united-kingdom', 'qatar'],
  },
];
