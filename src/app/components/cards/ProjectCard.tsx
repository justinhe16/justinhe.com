'use client';

import { useState, useRef, useEffect } from 'react';
import { animate } from 'animejs';
import BaseCard from './BaseCard';
import { ProjectCardData } from '@/types/cards';

interface ProjectCardProps {
  data: ProjectCardData;
}

export default function ProjectCard({ data }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      if (isHovered) {
        // Zoom, tilt, and raise effect on hover
        animate(imageRef.current, {
          scale: [1, 1.60],
          rotate: [0, -2],
          translateY: [0, -30],
          duration: 500,
          easing: 'out(3)',
        });
      } else {
        // Return to normal
        animate(imageRef.current, {
          scale: [1.60, 1],
          rotate: [-2, 0],
          translateY: [-30, 0],
          duration: 500,
          easing: 'out(3)',
        });
      }
    }
  }, [isHovered]);

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
        <div className="flex items-end justify-center mt-10">
          <img
            ref={imageRef}
            src={data.imageUrl}
            alt={data.title}
            className="max-w-[80%] max-h-[65%] object-contain rounded-md shadow-md"
          />
        </div>
      </div>
    </BaseCard>
  );
}
