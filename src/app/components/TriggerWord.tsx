'use client';

import { useHoverTrigger } from '@/contexts/HoverTriggerContext';
import { useRouter } from 'next/navigation';

interface TriggerWordProps {
  trigger: 'building' | 'dori' | 'travel' | 'foraging-frames' | 'surfing' | 'rock-climbing' | 'write';
  children: React.ReactNode;
  showUnderline?: boolean;
}

export default function TriggerWord({ trigger, children, showUnderline = true }: TriggerWordProps) {
  const { setActiveTrigger } = useHoverTrigger();
  const router = useRouter();

  // Tailwind color references (rgb values for SVG):
  // blue-500: rgb(59, 130, 246) -> %233b82f6
  // blue-400: rgb(96, 165, 250) -> %2360a5fa
  // red-400: rgb(248, 113, 113) -> %23f87171
  // amber-500: rgb(245, 158, 11) -> %23f59e0b
  // purple-500: rgb(168, 85, 247) -> %23a855f7
  // green-500: rgb(34, 197, 94) -> %2322c55e
  // pink-500: rgb(236, 72, 153) -> %23ec4899
  // cyan-500: rgb(6, 182, 212) -> %2306b6d4

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

  // Different underline styles and colors for each word
  const getUnderlineStyle = () => {
    switch (trigger) {
      case 'building':
        return {
          backgroundImage: 'linear-gradient(120deg, rgb(59, 130, 246) 0%, rgb(59, 130, 246) 100%)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 2px',
          backgroundPosition: '0 100%',
        };
      case 'dori':
        return {
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 4\'%3E%3Cpath fill=\'none\' stroke=\'%2360a5fa\' stroke-width=\'2\' d=\'M0,2 L4,2 M6,2 L10,2 M12,2 L16,2 M18,2 L20,2\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: '20px 4px',
        };
      case 'travel':
        return {
          backgroundImage: 'linear-gradient(120deg, rgb(236, 72, 153) 0%, rgb(236, 72, 153) 100%)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 2px',
          backgroundPosition: '0 100%',
        };
      case 'foraging-frames':
        return {
          backgroundImage: 'linear-gradient(120deg, rgb(168, 85, 247) 0%, rgb(168, 85, 247) 100%)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 3px',
          backgroundPosition: '0 100%',
        };
      case 'surfing':
        return {
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 4\'%3E%3Cpath fill=\'none\' stroke=\'%23f87171\' stroke-width=\'2\' d=\'M0,2 Q5,0 10,2 T20,2\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: '20px 4px',
        };
      case 'rock-climbing':
        return {
          backgroundImage: 'linear-gradient(120deg, rgb(245, 158, 11) 0%, rgb(245, 158, 11) 100%)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 2px',
          backgroundPosition: '0 100%',
        };
      case 'write':
        return {
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 4\'%3E%3Cpath fill=\'none\' stroke=\'%2322c55e\' stroke-width=\'1.5\' d=\'M0,3 C2,1 3,1 5,3 C7,1 8,1 10,3 C12,1 13,1 15,3 C17,1 18,1 20,3\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: '20px 4px',
        };
      default:
        return {};
    }
  };

  const underlineStyle = getUnderlineStyle();
  const link = getLink();

  const handleClick = () => {
    router.push(link);
  };

  return (
    <span
      className="font-semibold cursor-pointer inline-block relative transition-transform duration-300 hover:-translate-y-1"
      onMouseEnter={() => setActiveTrigger(trigger)}
      onMouseLeave={() => setActiveTrigger(null)}
      onClick={handleClick}
    >
      {children}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          ...underlineStyle,
          opacity: showUnderline ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />
    </span>
  );
}
