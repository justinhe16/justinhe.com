'use client';

import { useState, useRef, useEffect } from 'react';
import { animate } from 'animejs';
import BaseCard from './BaseCard';
import { HobbyCardData } from '@/types/cards';
import { useHoverTrigger } from '@/contexts/HoverTriggerContext';

interface HobbyCardProps {
  data: HobbyCardData;
}

export default function HobbyCard({ data }: HobbyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { activeTrigger } = useHoverTrigger();

  // Check if this card should be triggered
  const isTriggered =
    (activeTrigger === 'travel' && (data.id === 'hobby-coachella' || data.id === 'hobby-angels-landing')) ||
    (activeTrigger === 'foraging-frames' && data.id === 'hobby-palm-trees') ||
    (activeTrigger === 'surfing' && (data.id.includes('surfing') || data.id.includes('mentawai'))) ||
    (activeTrigger === 'rock-climbing' && data.id.includes('rock-climbing'));

  const shouldAnimate = isHovered || isTriggered;

  // Handle video playback
  useEffect(() => {
    if (videoRef.current) {
      if (shouldAnimate) {
        videoRef.current.play().catch(() => {
          // Ignore play errors
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [shouldAnimate]);

  // Handle dropdown animation
  useEffect(() => {
    if (mediaRef.current) {
      if (shouldAnimate) {
        // Drop media down by 40px to reveal text underneath
        animate(mediaRef.current, {
          translateY: [0, 40],
          duration: 500,
          easing: 'out(3)',
        });
      } else {
        // Return media to normal position
        animate(mediaRef.current, {
          translateY: [40, 0],
          duration: 500,
          easing: 'out(3)',
        });
      }
    }
  }, [shouldAnimate]);

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
        {/* Activity Label - always present, revealed when media slides down */}
        <div className="absolute top-0 left-0 right-0 h-[40px] bg-white flex items-center px-6 z-10">
          <span className="text-sm font-sans font-medium text-gray-600">{data.activity}</span>
        </div>

        {/* Full-canvas media (image or video) that slides down on hover */}
        <div
          ref={mediaRef}
          className="absolute inset-0 z-20"
        >
          {data.videoUrl ? (
            <video
              ref={videoRef}
              src={data.videoUrl}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
            />
          ) : (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${data.imageUrl})` }}
            />
          )}
        </div>
      </div>
    </BaseCard>
  );
}
