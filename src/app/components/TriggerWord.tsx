'use client';

import { useHoverTrigger } from '@/contexts/HoverTriggerContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface TriggerWordProps {
  trigger: 'building' | 'dori' | 'travel' | 'foraging-frames' | 'surfing' | 'rock-climbing' | 'write';
  children: React.ReactNode;
  showUnderline?: boolean;
}

export default function TriggerWord({ trigger, children, showUnderline = true }: TriggerWordProps) {
  const { setActiveTrigger } = useHoverTrigger();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get link for each trigger
  const getLink = () => {
    switch (trigger) {
      case 'building':
        return '/projects';
      case 'dori':
        return '/projects';
      case 'travel':
        return '/hobbies';
      case 'foraging-frames':
        return '/hobbies';
      case 'surfing':
        return '/hobbies';
      case 'rock-climbing':
        return '/hobbies';
      case 'write':
        return '/blog';
      default:
        return '/';
    }
  };

  // Different highlighter colors for each word
  const getHighlighterColor = () => {
    switch (trigger) {
      case 'building':
        return 'rgba(59, 130, 246, 0.3)'; // blue
      case 'dori':
        return 'rgba(96, 165, 250, 0.35)'; // lighter blue
      case 'travel':
        return 'rgba(236, 72, 153, 0.3)'; // pink
      case 'foraging-frames':
        return 'rgba(168, 85, 247, 0.3)'; // purple
      case 'surfing':
        return 'rgba(248, 113, 113, 0.35)'; // red
      case 'rock-climbing':
        return 'rgba(245, 158, 11, 0.35)'; // amber
      case 'write':
        return 'rgba(34, 197, 94, 0.3)'; // green
      default:
        return 'transparent';
    }
  };

  const highlighterColor = getHighlighterColor();
  const link = getLink();

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) {
      // On mobile, prevent navigation and trigger scroll behavior
      e.preventDefault();
      setActiveTrigger(trigger);

      // Clear trigger after a delay
      setTimeout(() => {
        setActiveTrigger(null);
      }, 2000);
    } else {
      // On desktop, navigate normally
      router.push(link);
    }
  };

  return (
    <span
      className="font-semibold cursor-pointer inline-block relative transition-transform duration-300 hover:-translate-y-1 px-1 -mx-1"
      onMouseEnter={() => !isMobile && setActiveTrigger(trigger)}
      onMouseLeave={() => !isMobile && setActiveTrigger(null)}
      onClick={handleClick}
      style={{
        backgroundColor: showUnderline ? highlighterColor : 'transparent',
        transition: 'background-color 0.6s ease, transform 0.3s ease',
      }}
    >
      {children}
    </span>
  );
}
