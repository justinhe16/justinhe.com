'use client';

import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { blogsData } from '@/data/blogsData';
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import Header from '../../components/Header';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const id = params.id as string;

  // Find the blog post by ID
  const blogPost = blogsData.find((blog) => blog.id === id);

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

  // If blog not found, show 404
  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-medium mb-4">Blog post not found</h1>
          <button
            onClick={() => router.push('/blog')}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const handleCategoryClick = (category: string) => {
    router.push(`/${category}`);
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <div ref={headerRef} className={`relative z-50 ${isFirstLoad ? 'opacity-0' : ''}`}>
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
              Blog
            </span>
          </div>
          <h1 className="text-2xl lg:text-4xl font-medium mb-4">{blogPost.title}</h1>
          <p className="text-gray-500 font-sans mb-8">{blogPost.date}</p>
          <div className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed">
            <ReactMarkdown
              components={{
                img: ({ node, ...props }) => (
                  <img {...props} className="rounded-lg my-8 w-full" alt={props.alt || ''} />
                ),
                p: ({ node, ...props }) => (
                  <p {...props} className="mb-4" />
                ),
                h2: ({ node, ...props }) => (
                  <h2 {...props} className="text-2xl font-medium mt-8 mb-4" />
                ),
                h3: ({ node, ...props }) => (
                  <h3 {...props} className="text-xl font-medium mt-6 mb-3" />
                ),
              }}
            >
              {blogPost.content || blogPost.contentPreview}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
