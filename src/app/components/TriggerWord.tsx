'use client';

import { useHoverTrigger } from '@/contexts/HoverTriggerContext';

interface TriggerWordProps {
  trigger: 'digital-nook' | 'building' | 'dori' | 'serial-hobbyist' | 'video' | 'surfing' | 'rock-climbing' | 'thoughts';
  children: React.ReactNode;
  showUnderline?: boolean;
}

export default function TriggerWord({ trigger, children, showUnderline = true }: TriggerWordProps) {
  const { setActiveTrigger } = useHoverTrigger();

  // Tailwind color references (rgb values for SVG):
  // amber-500: rgb(245, 158, 11) -> %23f59e0b
  // blue-500: rgb(59, 130, 246) -> %233b82f6
  // blue-400: rgb(96, 165, 250) -> %2360a5fa
  // red-500: rgb(239, 68, 68) -> %23ef4444
  // purple-500: rgb(168, 85, 247) -> %23a855f7
  // red-400: rgb(248, 113, 113) -> %23f87171
  // amber-400: rgb(251, 191, 36) -> %23fbbf24

  // Different underline styles and colors for each word
  const getUnderlineStyle = () => {
    switch (trigger) {
      case 'digital-nook':
        return {
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 4\'%3E%3Cpath fill=\'none\' stroke=\'%23f59e0b\' stroke-width=\'3\' d=\'M0,3 Q5,0 10,3 T20,3\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: '10px 5px',
        };
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
      case 'serial-hobbyist':
        return {
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 4\'%3E%3Cpath fill=\'none\' stroke=\'%23ef4444\' stroke-width=\'1.5\' d=\'M0,2 Q2.5,0 5,2 T10,2 T15,2 T20,2\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: '20px 4px',
        };
      case 'video':
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
      case 'thoughts':
        return {
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 4\'%3E%3Cpath fill=\'none\' stroke=\'%23fbbf24\' stroke-width=\'1.5\' d=\'M0,3 C2,1 3,1 5,3 C7,1 8,1 10,3 C12,1 13,1 15,3 C17,1 18,1 20,3\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: '20px 4px',
        };
      default:
        return {};
    }
  };

  const underlineStyle = getUnderlineStyle();

  return (
    <span
      className="font-semibold cursor-pointer inline-block relative"
      onMouseEnter={() => setActiveTrigger(trigger)}
      onMouseLeave={() => setActiveTrigger(null)}
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
