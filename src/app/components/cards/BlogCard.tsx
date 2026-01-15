'use client';

import { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import BaseCard from './BaseCard';
import { BlogCardData } from '@/types/cards';
import { useHoverTrigger } from '@/contexts/HoverTriggerContext';

interface BlogCardProps {
  data: BlogCardData;
}

export default function BlogCard({ data }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardElementRef = useRef<HTMLDivElement>(null);
  const { activeTrigger } = useHoverTrigger();
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for mobile
  useEffect(() => {
    if (!isMobile || !cardElementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.6, // Trigger when 60% of card is visible (more centered)
        rootMargin: '-30% 0px', // Only trigger in middle 40% of viewport
      }
    );

    observer.observe(cardElementRef.current);

    return () => observer.disconnect();
  }, [isMobile]);

  // Check if this card should be triggered
  const isTriggered = activeTrigger === 'write' && data.category === 'blog';

  useEffect(() => {
    if (imageRef.current) {
      const shouldAnimate = isHovered || isTriggered || (isMobile && isInView);

      if (shouldAnimate) {
        // Zoom, tilt, and raise effect on hover or trigger
        animate(imageRef.current, {
          scale: [1, 1.10],
          rotate: [0, -2],
          translateY: [0, -30],
          duration: 500,
          easing: 'out(3)',
        });
      } else {
        // Return to normal
        animate(imageRef.current, {
          scale: [1.10, 1],
          rotate: [-2, 0],
          translateY: [-30, 0],
          duration: 500,
          easing: 'out(3)',
        });
      }
    }
  }, [isHovered, isTriggered, isMobile, isInView]);

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
        ref={cardElementRef}
        className="w-full h-full p-6 flex flex-col justify-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Title and Date - Top */}
        <div>
          <h3 className="text-xl font-medium mb-2">{data.title}</h3>
          <p className="text-sm text-gray-500 font-sans">{data.date}</p>
        </div>

        {/* Image - Lower placement */}
        <div className="flex items-end justify-center mt-5">
          <img
            ref={imageRef}
            src={data.imageUrl}
            alt={data.title}
            className="max-w-[100%] max-h-[85%] object-contain rounded-md shadow-md"
          />
        </div>
      </div>
    </BaseCard>
  );
}
