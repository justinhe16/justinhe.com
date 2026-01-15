import { CardData } from '@/types/cards';
import { hobbiesData } from './hobbiesData';
import { projectsData } from './projectsData';
import { blogsData } from './blogsData';

// Combine all card data for easy lookup
const allCards = [...hobbiesData, ...projectsData, ...blogsData];

// Helper function to get card by ID
const getCardById = (id: string): CardData | undefined => {
  return allCards.find(card => card.id === id);
};

// Define which cards to show on homepage (in order)
const homePageCardIds = [
  'hobby-angels-landing',
  'hobby-coachella',
  'hobby-mentawai-surfing',
  'creating-a-home-on-the-internet',
  'project-claude-surf',
  'hobby-palm-trees',
  'hobby-rock-climbing-dyno',
];

// Get the actual card data for homepage
export const homePageCards: CardData[] = homePageCardIds
  .map(id => getCardById(id))
  .filter((card): card is CardData => card !== undefined);
