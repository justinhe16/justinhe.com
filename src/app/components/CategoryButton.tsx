'use client';

import { Theme } from '@/hooks/useTheme';

interface CategoryButtonProps {
  label: string;
  theme: Theme;
  onClick?: () => void;
  onHover?: (theme: Theme) => void;
  onLeave?: () => void;
}

export default function CategoryButton({
  label,
  theme,
  onClick,
  onHover,
  onLeave
}: CategoryButtonProps) {
  const getHighlightColor = () => {
    switch (theme) {
      case 'projects': return 'category-projects';
      case 'hobbies': return 'category-hobbies';
      case 'blog': return 'category-blog';
      default: return 'category-default';
    }
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover?.(theme)}
      onMouseLeave={() => onLeave?.()}
      className={`category-btn ${getHighlightColor()} text-4xl md:text-5xl transition-colors duration-300 text-right leading-none relative inline-block`}
    >
      <span className="relative z-10">{label}</span>
    </button>
  );
}
