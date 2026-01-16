'use client';

import { Github, Linkedin, FileText } from 'lucide-react';

interface HeaderProps {
  activeCategory?: string;
  onCategoryClick: (category: string) => void;
  onHomeClick: () => void;
}

export default function Header({ activeCategory, onCategoryClick, onHomeClick }: HeaderProps) {
  const categories = [
    { id: 'projects', label: 'Projects' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'blog', label: 'Blog' },
  ];

  const getThemeClass = (categoryId: string) => {
    switch (categoryId) {
      case 'projects': return 'text-blue-600 bg-blue-50';
      case 'hobbies': return 'text-red-600 bg-red-50';
      case 'blog': return 'text-yellow-700 bg-yellow-50';
      default: return '';
    }
  };

  return (
    <header className="px-8 lg:px-16 py-3 lg:py-4">
      <div className="max-w-7xl mx-auto">
        <div
          className="w-full rounded-full backdrop-blur-xl flex items-center justify-between px-4 lg:px-8 py-2 lg:py-3"
          style={{
            background: 'linear-gradient(135deg, var(--card-glass-light) 0%, var(--card-glass-mid) 50%, var(--card-glass-light) 100%)',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
          }}
        >
        {/* Left side - Navigation */}
        <nav className="flex items-center gap-2 lg:gap-4">
          <button
            onClick={onHomeClick}
            className="font-sans text-xs lg:text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Home
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat.id)}
              className={`font-sans text-xs lg:text-sm font-medium transition-all duration-200 px-2 lg:px-3 py-1 lg:py-1.5 rounded-md ${
                activeCategory === cat.id
                  ? getThemeClass(cat.id)
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Right side - Icon links */}
        <div className="flex items-center gap-2 lg:gap-4">
          <a
            href="https://github.com/justinhe16"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-colors hover:text-gray-900"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
          </a>
          <a
            href="https://www.linkedin.com/in/justinhe16/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-colors hover:text-gray-900"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
          </a>
          <a
            href="/justin_he_resume_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-colors hover:text-gray-900"
            aria-label="Resume"
          >
            <FileText className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
          </a>
        </div>
      </div>
      </div>
    </header>
  );
}
