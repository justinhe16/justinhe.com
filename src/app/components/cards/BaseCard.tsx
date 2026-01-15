'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { animate } from 'animejs';
import { CardWidth, CardHeight, CardCategory } from '@/types/cards';
import { useHoverTrigger } from '@/contexts/HoverTriggerContext';

interface BaseCardProps {
  cardId: string;
  width: CardWidth;
  height: CardHeight;
  category: CardCategory;
  hasDetailPage?: boolean;
  children: React.ReactNode;
  disableHoverFloat?: boolean;
}

export default function BaseCard({ cardId, width, height, category, hasDetailPage, children = false, disableHoverFloat = false }: BaseCardProps) {
  const router = useRouter();
  const { activeTrigger, focusedCard, setFocusedCard } = useHoverTrigger();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }); // Default to center
  const blobRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const innerCardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const triggeredAnimationFrameRef = useRef<number | undefined>(undefined);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const [isTriggered, setIsTriggered] = useState(false);
  const randomTiltRef = useRef({ rotateX: 0, rotateY: 0 });

  // A card is NOT dimmed if:
  // 1. No focus is active (nothing hovered, no trigger)
  // 2. This card is directly hovered (focusedCard matches)
  // 3. This card matches the current trigger (isTriggered)
  const isDimmed = (() => {
    // If this card is directly hovered, never dim it
    if (focusedCard === cardId) return false;

    // If this card is triggered by a word, never dim it
    if (isTriggered) return false;

    // If any focus or trigger is active, dim this card
    if (focusedCard !== null || activeTrigger !== null) return true;

    return false;
  })();

  const widthClass = width === '2x' ? 'col-span-1 lg:col-span-2' : 'col-span-1';
  const heightClass = height === '2x' ? 'row-span-1 lg:row-span-2' : 'row-span-1';
  const hoverClass = disableHoverFloat ? '' : 'hover:scale-[1.01]';

  // Get category-specific gradient for glassmorphism
  const getGlassGradient = () => {
    switch (category) {
      case 'blog':
        return 'linear-gradient(135deg, var(--card-blog-light) 0%, var(--card-blog-mid) 50%, var(--card-blog-light) 100%)';
      case 'project':
        return 'linear-gradient(135deg, var(--card-project-light) 0%, var(--card-project-mid) 50%, var(--card-project-light) 100%)';
      case 'hobby':
        return 'linear-gradient(135deg, var(--card-hobby-light) 0%, var(--card-hobby-mid) 50%, var(--card-hobby-light) 100%)';
      default:
        return 'linear-gradient(135deg, var(--card-default-light) 0%, var(--card-default-mid) 50%, var(--card-default-light) 100%)';
    }
  };

  // Expanding wave effect on hover or trigger
  useEffect(() => {
    if (blobRef.current) {
      const shouldAnimate = isHovered || isTriggered;

      if (shouldAnimate) {
        // Wave expands to fill the card (slower and much larger)
        animate(blobRef.current, {
          width: ['128px', '2000px'],
          height: ['128px', '2000px'],
          opacity: [0, 0.8],
          duration: 1800,
          easing: 'out(3)',
        });
      } else {
        // Wave retreats
        animate(blobRef.current, {
          width: ['2000px', '128px'],
          height: ['2000px', '128px'],
          opacity: [0.8, 0],
          duration: 1000,
          easing: 'in(3)',
        });
      }
    }
  }, [isHovered, isTriggered]);

  // Check if this card should be triggered by the active trigger
  useEffect(() => {
    if (!activeTrigger) {
      setIsTriggered(false);
      return;
    }

    const shouldTrigger =
      (activeTrigger === 'building' && category === 'project') ||
      (activeTrigger === 'dori' && cardId.includes('dori')) ||
      (activeTrigger === 'travel' && (cardId === 'hobby-coachella' || cardId === 'hobby-angels-landing')) ||
      (activeTrigger === 'foraging-frames' && cardId === 'hobby-palm-trees') ||
      (activeTrigger === 'surfing' && (cardId.includes('surfing') || cardId.includes('mentawai'))) ||
      (activeTrigger === 'rock-climbing' && cardId.includes('rock-climbing')) ||
      (activeTrigger === 'write' && category === 'blog');

    if (shouldTrigger) {
      // Generate random tilt (left or right) - similar to hover effect
      const direction = Math.random() > 0.5 ? 1 : -1;
      randomTiltRef.current = {
        rotateX: (Math.random() * 8 - 4), // Random -4 to 4 degrees
        rotateY: direction * (Math.random() * 6 + 4) // Random 4-10 degrees, left or right
      };
    }

    setIsTriggered(shouldTrigger);
  }, [activeTrigger, cardId, category]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    }
    setIsHovered(true);
    setFocusedCard(cardId);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setFocusedCard(null);
  };

  // 3D hover effect with mouse following
  useEffect(() => {
    const card = innerCardRef.current;
    if (!card) return;

    let rect: DOMRect;
    let centerX: number;
    let centerY: number;

    const updateCardTransform = (mouseX: number, mouseY: number) => {
      if (!rect) {
        rect = card.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      }

      const relativeX = mouseX - centerX;
      const relativeY = mouseY - centerY;

      return {
        rotateX: -relativeY * 0.10,
        rotateY: relativeX * 0.10,
        scale: 1.05
      };
    };

    const animate3D = () => {
      const transform = updateCardTransform(
        lastMousePosition.current.x,
        lastMousePosition.current.y
      );

      card.style.transform = `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(${transform.scale}, ${transform.scale}, ${transform.scale})`;
      card.style.boxShadow = '0 10px 35px rgba(0, 0, 0, 0.15)';

      animationFrameRef.current = requestAnimationFrame(animate3D);
    };

    const stopAnimation = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.boxShadow = 'none';
      card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease, opacity 0.3s ease';

      rect = null as any;
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter3D = () => {
      card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.3s ease';
      animate3D();
    };

    const handleMouseLeave3D = () => {
      stopAnimation();
    };

    card.addEventListener('mouseenter', handleMouseEnter3D);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave3D);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      card.removeEventListener('mouseenter', handleMouseEnter3D);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave3D);
    };
  }, []);

  // Dynamic tilting animation for triggered state
  useEffect(() => {
    const card = innerCardRef.current;
    if (!card || isHovered) return; // Don't interfere if user is hovering

    if (isTriggered) {
      card.style.transition = 'transform 0.1s ease, box-shadow 0.5s ease, opacity 0.3s ease';

      let time = 0;
      const baseRotateX = randomTiltRef.current.rotateX;
      const baseRotateY = randomTiltRef.current.rotateY;

      const animateTilt = () => {
        time += 0.015;

        // Create smooth, slow oscillating movement
        const dynamicRotateX = baseRotateX + Math.sin(time * 1.2) * 2;
        const dynamicRotateY = baseRotateY + Math.cos(time * 0.8) * 3;
        const dynamicScale = 1.05 + Math.sin(time * 0.5) * 0.02;

        card.style.transform = `perspective(1000px) rotateX(${dynamicRotateX}deg) rotateY(${dynamicRotateY}deg) scale3d(${dynamicScale}, ${dynamicScale}, ${dynamicScale})`;
        card.style.boxShadow = '0 10px 35px rgba(0, 0, 0, 0.15)';

        triggeredAnimationFrameRef.current = requestAnimationFrame(animateTilt);
      };

      animateTilt();
    } else {
      // Stop animation and reset
      if (triggeredAnimationFrameRef.current) {
        cancelAnimationFrame(triggeredAnimationFrameRef.current);
      }
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.boxShadow = 'none';
      card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease, opacity 0.3s ease';
    }

    return () => {
      if (triggeredAnimationFrameRef.current) {
        cancelAnimationFrame(triggeredAnimationFrameRef.current);
      }
    };
  }, [isTriggered, isHovered]);

  const handleClick = () => {
    // Map category to route (handle pluralization)
    const categoryRoute = category === 'blog' ? 'blog' : category === 'project' ? 'projects' : 'hobbies';

    // Determine route based on whether card has detail page
    const route = hasDetailPage ? `/${categoryRoute}/${cardId}` : `/${categoryRoute}`;
    router.push(route);
  };

  return (
    <div
      ref={cardRef}
      data-card-id={cardId}
      data-category={category}
      className={`${widthClass} ${heightClass} spotlight-card group relative overflow-visible rounded-lg transition-all duration-300 ease-in-out`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={innerCardRef}
        className="cursor-pointer relative backdrop-blur-xl rounded-lg overflow-hidden w-full h-full group-hover:backdrop-blur-[20px] transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, var(--card-glass-light) 0%, var(--card-glass-mid) 50%, var(--card-glass-light) 100%)',
          opacity: isDimmed ? 0.3 : 1,
        }}
        onClick={handleClick}
      >
        {/* Expanding wave blob - starts from mouse position and fills card with glassmorphism */}
        <div
          ref={blobRef}
          className="absolute size-32 rounded-full opacity-0 pointer-events-none z-0"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)',
            background: getGlassGradient(),
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
          }}
        />

        {/* Card content - z-10 so it appears above the glow */}
        <div className="w-full h-full relative z-10 pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
