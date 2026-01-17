'use client';

import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { projectsData } from '@/data/projectsData';
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import Header from '../../components/Header';
import { useTheme } from '@/hooks/useTheme';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { switchTheme } = useTheme();
  const id = params.id as string;

  // Find the project by ID
  const project = projectsData.find((proj) => proj.id === id);

  // Check if this is first category page load
  const isFirstLoad = typeof window !== 'undefined' && !sessionStorage.getItem('categoryPageLoaded');

  useEffect(() => {
    // Set theme
    switchTheme('projects');

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

  // If project not found, show 404
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-medium mb-4">Project not found</h1>
          <button
            onClick={() => router.push('/projects')}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Projects
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
              Project
            </span>
          </div>
          <h1 className="text-2xl lg:text-4xl font-medium mb-4">{project.title}</h1>
          {project.date && (
            <p className="text-gray-500 font-sans mb-8">{project.date}</p>
          )}
          <div className="prose prose-xl max-w-none text-gray-700 leading-loose">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                img: ({ node, ...props }) => (
                  <img {...props} className="rounded-lg my-8 w-full" alt={props.alt || ''} />
                ),
                video: ({ node, ...props }) => (
                  <video {...props} className="rounded-lg my-8 w-full" controls />
                ),
                p: ({ node, ...props }) => (
                  <p {...props} className="mb-4 font-sans text-lg" style={{ lineHeight: 'var(--line-height-content)' }} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 {...props} className="text-3xl font-bold mt-8 mb-4" />
                ),
                h3: ({ node, ...props }) => (
                  <h3 {...props} className="text-2xl font-bold mt-6 mb-3" />
                ),
                li: ({ node, ...props }) => (
                  <li {...props} className="font-sans text-lg" style={{ lineHeight: 'var(--line-height-content)' }} />
                ),
                ul: ({ node, ...props }) => (
                  <ul {...props} className="font-sans" />
                ),
                ol: ({ node, ...props }) => (
                  <ol {...props} className="font-sans" />
                ),
                strong: ({ node, ...props }) => (
                  <strong {...props} className="font-sans font-bold" />
                ),
                a: ({ node, ...props }) => (
                  <a {...props} className="font-sans underline hover:no-underline" />
                ),
              }}
            >
              {project.content || project.contentPreview || project.caption}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
