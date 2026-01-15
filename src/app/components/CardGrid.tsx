'use client';

import BlogCard from './cards/BlogCard';
import ProjectCard from './cards/ProjectCard';
import HobbyCard from './cards/HobbyCard';
import { CardData } from '@/types/cards';

interface CardGridProps {
  cards: CardData[];
  gridCols?: 2 | 3; // 2 for homepage, 3 for focus pages
}

export default function CardGrid({ cards, gridCols = 2 }: CardGridProps) {
  const renderCard = (card: CardData) => {
    switch (card.category) {
      case 'blog':
        return <BlogCard key={card.id} data={card} />;
      case 'project':
        return <ProjectCard key={card.id} data={card} />;
      case 'hobby':
        return <HobbyCard key={card.id} data={card} />;
      default:
        return null;
    }
  };

  const gridColsClass = gridCols === 3 ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-2';

  return (
    <div className={`grid ${gridColsClass} auto-rows-[240px] gap-4 w-full`}>
      {cards.map((card) => renderCard(card))}
    </div>
  );
}
