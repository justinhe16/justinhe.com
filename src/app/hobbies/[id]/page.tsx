'use client';

import { useParams, useRouter } from 'next/navigation';
import { hobbiesData } from '@/data/hobbiesData';
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import Header from '../../components/Header';

export default function HobbyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const id = params.id as string;

  // Find the hobby by ID
  const hobby = hobbiesData.find((h) => h.id === id);

  // Check if this is first category page load
  const isFirstLoad = typeof window !== 'undefined' && !sessionStorage.getItem('categoryPageLoaded');

  useEffect(() => {
    // Mark that we're in the category system
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('categoryPageLoaded', 'true');
    }

    // Animate content
    if (contentRef.current) {
      animate(contentRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'out(3)',
      });
    }

    // Header - only animate if first load
    if (headerRef.current) {
      if (isFirstLoad) {
        animate(headerRef.current, {
          opacity: [0, 1],
          translateY: [-20, 0],
          duration: 600,
          easing: 'out(2)',
        });
      } else {
        // Show immediately without animation
        headerRef.current.style.opacity = '1';
        headerRef.current.style.transform = 'translateY(0)';
      }
    }
  }, [isFirstLoad]);

  // If hobby not found, show 404
  if (!hobby) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-medium mb-4">Hobby not found</h1>
          <button
            onClick={() => router.push('/hobbies')}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Hobbies
          </button>
        </div>
      </div>
    );
  }

  const handleCategoryClick = (category: string) => {
    router.push(`/${category}`);
  };

  const handleHomeClick = () => {
    // Clear the flag so home page shows full animation
    sessionStorage.removeItem('categoryPageLoaded');
    router.push('/');
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <div ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 ${isFirstLoad ? 'opacity-0' : ''}`}>
        <Header
          onCategoryClick={handleCategoryClick}
          onHomeClick={handleHomeClick}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 opacity-0"
      >
        <div className="p-12">
          <div className="mb-2">
            <span className="text-xs font-sans text-gray-500 uppercase tracking-wider">
              Hobby
            </span>
          </div>
          <h1 className="text-4xl font-medium mb-8">{hobby.activity}</h1>
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={hobby.imageUrl}
              alt={hobby.activity}
              className="w-full h-auto"
            />
          </div>
          <div className="prose prose-lg">
            <p className="text-gray-700 font-sans leading-relaxed">
              [Hobby details, photos, stories, etc. would go here...]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
