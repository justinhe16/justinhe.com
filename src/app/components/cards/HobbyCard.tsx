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
  const cardElementRef = useRef<HTMLDivElement>(null);
  const { activeTrigger } = useHoverTrigger();
  const [isInView, setIsInView] = useState(false);
  const [isVideoInView, setIsVideoInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for mobile animations (strict - for center focus)
  useEffect(() => {
    if (!isMobile || !cardElementRef.current) return;

    // Special handling for last card (dyno) - less sensitive
    const isLastCard = data.id.includes('dyno') || data.id.includes('rock-climbing');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      isLastCard
        ? {
            threshold: 0.3, // Looser for last card
            rootMargin: '-15% 0px', // Less strict margin
          }
        : {
            threshold: 0.6, // Trigger when 60% of card is visible (more centered)
            rootMargin: '-30% 0px', // Only trigger in middle 40% of viewport
          }
    );

    observer.observe(cardElementRef.current);

    return () => observer.disconnect();
  }, [isMobile, data.id]);

  // Separate Intersection Observer for video playback (lenient - plays easier)
  useEffect(() => {
    if (!isMobile || !cardElementRef.current || !data.videoUrl) return;

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVideoInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3, // Play when 30% visible
        rootMargin: '-10% 0px', // Looser margin
      }
    );

    videoObserver.observe(cardElementRef.current);

    return () => videoObserver.disconnect();
  }, [isMobile, data.videoUrl]);

  // Check if this card should be triggered
  const isTriggered =
    (activeTrigger === 'travel' && (data.id === 'hobby-coachella' || data.id === 'hobby-angels-landing')) ||
    (activeTrigger === 'foraging-frames' && data.id === 'hobby-palm-trees') ||
    (activeTrigger === 'surfing' && (data.id.includes('surfing') || data.id.includes('mentawai'))) ||
    (activeTrigger === 'rock-climbing' && data.id.includes('rock-climbing'));

  const shouldAnimate = isHovered || isTriggered || (isMobile && isInView);

  // Handle video playback
  useEffect(() => {
    if (videoRef.current) {
      const shouldPlayVideo = isHovered || isTriggered || (isMobile && isVideoInView);

      if (shouldPlayVideo) {
        videoRef.current.play().catch(() => {
          // Ignore play errors
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, isTriggered, isMobile, isVideoInView]);

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
        ref={cardElementRef}
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
              className="w-full h-full object-cover scale-135 lg:scale-100"
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
