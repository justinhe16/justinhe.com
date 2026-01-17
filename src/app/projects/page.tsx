'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { animate } from 'animejs';
import Header from '../components/Header';
import CardGrid from '../components/CardGrid';
import { useTheme } from '@/hooks/useTheme';
import { projectsData } from '@/data/projectsData';
import { HoverTriggerProvider } from '@/contexts/HoverTriggerContext';

function ProjectsContent() {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { switchTheme } = useTheme();
  const hasAnimatedRef = useRef(false);
  const hasMountedRef = useRef(false);

  // Check if this is first category page load on render
  const isFirstLoad = typeof window !== 'undefined' && !sessionStorage.getItem('categoryPageLoaded');

  useEffect(() => {
    // Prevent double-run
    if (hasMountedRef.current) return;
    hasMountedRef.current = true;

    console.log('🔵 Projects page useEffect running (ONCE)');

    // Set theme on mount
    switchTheme('projects');

    // Only animate header on first load (coming from home)
    const isFirstCategoryPageLoad = !sessionStorage.getItem('categoryPageLoaded');
    console.log('🔵 isFirstCategoryPageLoad:', isFirstCategoryPageLoad);

    // Set up header visibility
    if (headerRef.current) {
      if (isFirstCategoryPageLoad) {
        console.log('🔵 ANIMATING HEADER (first load)');
        sessionStorage.setItem('categoryPageLoaded', 'true');

        // Animate header in
        setTimeout(() => {
          if (headerRef.current) {
            console.log('🔵 Starting header animation');
            animate(headerRef.current, {
              opacity: [0, 1],
              translateY: [-20, 0],
              duration: 600,
              easing: 'out(2)',
            });
          }
        }, 200);
      } else {
        console.log('🔵 SHOWING HEADER IMMEDIATELY (not first load)');
        // Not first load - show immediately without animation
        headerRef.current.style.opacity = '1';
        headerRef.current.style.transform = 'translateY(0)';
      }
    }

    // Animate content
    if (contentRef.current) {
      console.log('🔵 Starting content animation with delay:', isFirstCategoryPageLoad ? 400 : 0);
      setTimeout(() => {
        if (contentRef.current) {
          console.log('🔵 Executing content animation');
          animate(contentRef.current, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            easing: 'out(2)',
          });
        }
      }, isFirstCategoryPageLoad ? 400 : 0);
    }
  }, []);

  const handleCategoryClick = (category: string) => {
    if (contentRef.current) {
      animate(contentRef.current, {
        opacity: [1, 0],
        duration: 300,
        easing: 'out(2)',
      });
    }

    setTimeout(() => {
      router.push(`/${category}`, { scroll: false });
    }, 300);
  };

  const handleHomeClick = () => {
    if (contentRef.current) {
      animate(contentRef.current, {
        opacity: [1, 0],
        duration: 300,
        easing: 'out(2)',
      });
    }

    if (headerRef.current) {
      animate(headerRef.current, {
        opacity: [1, 0],
        duration: 300,
        easing: 'out(2)',
      });
    }

    setTimeout(() => {
      // Clear the flag so home page shows full animation
      sessionStorage.removeItem('categoryPageLoaded');
      router.push('/', { scroll: false });
    }, 300);
  };

  return (
    <>
      <div ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 ${isFirstLoad ? 'opacity-0' : ''}`}>
        <Header
          activeCategory="projects"
          onHomeClick={handleHomeClick}
          onCategoryClick={handleCategoryClick}
        />
      </div>

      <div className="min-h-screen relative">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-16 lg:pt-32 pb-12 lg:pb-24 opacity-0">
          {/* Left Column - Description Card (1 column on desktop, full width on mobile) */}
          <div className="lg:col-span-1">
            <div
              className="backdrop-blur-xl rounded-lg p-6 lg:p-8 h-full flex flex-col justify-center"
              style={{
                background: 'linear-gradient(135deg, var(--card-project-light) 0%, var(--card-project-mid) 50%, var(--card-project-light) 100%)',
              }}
            >
              <h2 className="text-3xl lg:text-4xl font-medium mb-4">Projects</h2>
              <p className="text-sm lg:text-base text-gray-800 font-sans">
                A collection of things I've built
              </p>
            </div>
          </div>

          {/* Right Columns - Card Grid (3 columns on desktop, full width on mobile) */}
          <div className="lg:col-span-3">
            <CardGrid cards={projectsData} gridCols={3} />
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default function ProjectsPage() {
  return (
    <HoverTriggerProvider>
      <ProjectsContent />
    </HoverTriggerProvider>
  );
}
