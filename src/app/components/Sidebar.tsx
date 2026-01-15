'use client';

import Signature from './Signature';

interface SidebarProps {
  activeCategory?: string;
  onHomeClick: () => void;
  onCategoryClick: (category: string) => void;
}

export default function Sidebar({ activeCategory, onHomeClick, onCategoryClick }: SidebarProps) {
  const categories = [
    { id: 'projects', label: 'P', title: 'Projects' },
    { id: 'hobbies', label: 'H', title: 'Hobbies' },
    { id: 'blog', label: 'B', title: 'Blog' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-24 bg-white/80 backdrop-blur-sm border-r border-gray-200 flex flex-col items-center py-8 z-50">
      {/* Home button - Signature */}
      <button
        onClick={onHomeClick}
        className="mb-12 hover:opacity-70 transition-opacity w-16"
        title="Home"
      >
        <div className="scale-[0.3] -ml-12 -mt-8">
          <Signature />
        </div>
      </button>

      {/* Category icons */}
      <div className="flex flex-col space-y-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryClick(cat.id)}
            className={`w-12 h-12 rounded-full font-sans font-medium text-lg flex items-center justify-center transition-all duration-300 ${
              activeCategory === cat.id
                ? 'bg-gray-800 text-white scale-110'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
            }`}
            title={cat.title}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
