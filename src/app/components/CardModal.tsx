'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { animate } from 'animejs';
import ReactMarkdown from 'react-markdown';
import { CardData } from '@/types/cards';

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: CardData | null;
}

export default function CardModal({ isOpen, onClose, cardData }: CardModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && overlayRef.current && contentRef.current) {
      // Fade in overlay
      animate(overlayRef.current, {
        opacity: [0, 1],
        duration: 300,
        easing: 'out(2)',
      });

      // Scale in content
      animate(contentRef.current, {
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 400,
        delay: 100,
        easing: 'out(3)',
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    if (overlayRef.current && contentRef.current) {
      // Fade out
      animate(overlayRef.current, {
        opacity: [1, 0],
        duration: 300,
        easing: 'out(2)',
      });

      animate(contentRef.current, {
        opacity: [1, 0],
        scale: [1, 0.95],
        duration: 300,
        easing: 'out(2)',
      });

      setTimeout(() => {
        onClose();
      }, 300);
    } else {
      onClose();
    }
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !cardData) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-white opacity-0 overflow-y-auto"
    >
      {/* Close button - top right */}
      <button
        onClick={handleClose}
        className="fixed top-4 lg:top-8 right-4 lg:right-8 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <X className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
      </button>

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24 opacity-0"
      >

        {/* Content based on card type */}
        <div className="p-12">
          {cardData.category === 'blog' && (
            <div>
              <div className="mb-2">
                <span className="text-xs font-sans text-gray-500 uppercase tracking-wider">
                  Blog
                </span>
              </div>
              <h1 className="text-2xl lg:text-4xl font-medium mb-4">{cardData.title}</h1>
              <p className="text-gray-500 font-sans mb-8">{cardData.date}</p>
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
                  {cardData.content || cardData.contentPreview}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {cardData.category === 'project' && (
            <div>
              <div className="mb-2">
                <span className="text-xs font-sans text-gray-500 uppercase tracking-wider">
                  Project
                </span>
              </div>
              <h1 className="text-2xl lg:text-4xl font-medium mb-4">{cardData.title}</h1>
              <p className="text-gray-600 font-sans text-lg mb-8">{cardData.caption}</p>
              <div className="mb-8 rounded-lg overflow-hidden">
                <img
                  src={cardData.imageUrl}
                  alt={cardData.title}
                  className="w-full h-auto"
                />
              </div>
              <div className="prose prose-lg">
                <p className="text-gray-700 font-sans leading-relaxed">
                  [Project details, description, tech stack, etc. would go here...]
                </p>
              </div>
            </div>
          )}

          {cardData.category === 'hobby' && (
            <div>
              <div className="mb-2">
                <span className="text-xs font-sans text-gray-500 uppercase tracking-wider">
                  Hobby
                </span>
              </div>
              <h1 className="text-4xl font-medium mb-8">{cardData.activity}</h1>
              <div className="mb-8 rounded-lg overflow-hidden">
                <img
                  src={cardData.imageUrl}
                  alt={cardData.activity}
                  className="w-full h-auto"
                />
              </div>
              <div className="prose prose-lg">
                <p className="text-gray-700 font-sans leading-relaxed">
                  [Hobby details, photos, stories, etc. would go here...]
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
