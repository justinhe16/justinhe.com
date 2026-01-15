'use client';

import { useState, useEffect, useRef } from 'react';
import { animate, splitText, stagger } from 'animejs';
import BaseCard from './BaseCard';
import { BlogCardData } from '@/types/cards';

interface BlogCardProps {
  data: BlogCardData;
}

export default function BlogCard({ data }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewTextRef = useRef<HTMLParagraphElement>(null);
  const hasSplitRef = useRef(false);

  useEffect(() => {
    if (isHovered && previewRef.current && previewTextRef.current && !hasSplitRef.current) {
      hasSplitRef.current = true;

      // Fade in container
      animate(previewRef.current, {
        opacity: [0, 1],
        duration: 200,
        easing: 'out(2)',
      });

      // Split text into words and animate
      const { words } = splitText(previewTextRef.current, {
        words: true,
      });

      if (words && words.length > 0) {
        animate(words, {
          opacity: [0, 1],
          translateY: [5, 0],
          duration: 300,
          delay: stagger(25), // 25ms between each word (faster)
          easing: 'out(2)',
        });
      }
    } else if (!isHovered && hasSplitRef.current) {
      // Reset for next hover
      hasSplitRef.current = false;
      if (previewTextRef.current) {
        previewTextRef.current.innerHTML = data.contentPreview;
      }
    }
  }, [isHovered, data.contentPreview]);

  return (
    <BaseCard
      cardId={data.id}
      width={data.width}
      height={data.height}
      category={data.category}
      hasDetailPage={data.hasDetailPage}
      disableHoverFloat={true}
    >
      <div
        className="w-full h-full p-6 flex flex-col justify-between relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Title and Date - Always visible */}
        <div className="relative z-10">
          <h3 className="text-xl font-medium mb-2">{data.title}</h3>
          <p className="text-sm text-gray-500 font-sans">{data.date}</p>
        </div>

        {/* Line-by-line preview - shown on hover with blurred edges */}
        {isHovered && (
          <div
            ref={previewRef}
            className="absolute inset-0 p-6 pt-20 opacity-0"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <p ref={previewTextRef} className="text-sm text-gray-700 font-sans leading-relaxed">
              {data.contentPreview}
            </p>
          </div>
        )}
      </div>
    </BaseCard>
  );
}
