'use client';

import { useState, useRef, useEffect } from 'react';
import { animate } from 'animejs';
import BaseCard from './BaseCard';
import { HobbyCardData } from '@/types/cards';

interface HobbyCardProps {
  data: HobbyCardData;
}

export default function HobbyCard({ data }: HobbyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      if (isHovered) {
        // Drop image down by 40px to reveal text underneath
        animate(imageRef.current, {
          translateY: [0, 40],
          duration: 500,
          easing: 'out(3)',
        });
      } else {
        // Return image to normal position
        animate(imageRef.current, {
          translateY: [40, 0],
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
        className="w-full h-full relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Activity Label - always present, revealed when image slides down */}
        <div className="absolute top-0 left-0 right-0 h-[40px] bg-white flex items-center px-6 z-10">
          <span className="text-sm font-sans font-medium text-gray-600">{data.activity}</span>
        </div>

        {/* Full-canvas image that slides down on hover */}
        <div
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center z-20"
          style={{ backgroundImage: `url(${data.imageUrl})` }}
        />
      </div>
    </BaseCard>
  );
}
