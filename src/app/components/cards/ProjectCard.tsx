'use client';

import { useState, useRef, useEffect } from 'react';
import { animate } from 'animejs';
import BaseCard from './BaseCard';
import { ProjectCardData } from '@/types/cards';
import { useHoverTrigger } from '@/contexts/HoverTriggerContext';

interface ProjectCardProps {
  data: ProjectCardData;
}

export default function ProjectCard({ data }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const { activeTrigger } = useHoverTrigger();

  // Check if this card should be triggered
  const isTriggered =
    (activeTrigger === 'building' && data.category === 'project') ||
    (activeTrigger === 'dori' && data.id.includes('dori'));

  useEffect(() => {
    if (imageRef.current) {
      const shouldAnimate = isHovered || isTriggered;

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
  }, [isHovered, isTriggered]);

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
        className="w-full h-full p-6 flex flex-col justify-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Title and Caption - Top */}
        <div>
          <h3 className="text-xl font-medium mb-2">{data.title}</h3>
          <p className="text-sm text-gray-600 font-sans">{data.caption}</p>
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
