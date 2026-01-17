'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { animate, stagger, splitText } from 'animejs';
import Signature, { SignatureRef } from './components/Signature';
import EmailSignup from './components/EmailSignup';
import CardGrid from './components/CardGrid';
import TriggerWord from './components/TriggerWord';
import Header from './components/Header';
import { useTheme } from '@/hooks/useTheme';
import { homePageCards } from '@/data/homePageCards';
import { HoverTriggerProvider, useHoverTrigger } from '@/contexts/HoverTriggerContext';

function HomeContent() {
  const router = useRouter();
  const signatureRef = useRef<HTMLDivElement>(null);
  const signatureComponentRef = useRef<SignatureRef>(null);
  const splitContentRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [showUnderlines, setShowUnderlines] = useState(false);
  const { switchTheme } = useTheme();
  const { activeTrigger, focusedCard } = useHoverTrigger();

  // Dim left card only when directly hovering a card, not when hovering trigger words
  const isLeftCardDimmed = focusedCard !== null;

  const handleDrawingComplete = () => {
    // Wait after drawing completes, then slide
    setTimeout(() => {
      // Slide signature to left (different positions for mobile vs desktop)
      const isMobile = window.innerWidth < 1024;

      if (signatureRef.current) {
        if (isMobile) {
          // On mobile, fade out the signature after drawing
          animate(signatureRef.current, {
            opacity: [1, 0],
            duration: 800,
            easing: 'out(3)',
          });
        } else {
          // On desktop, slide to left column position
          animate(signatureRef.current, {
            translateX: [0, 'calc(-7vw)'],
            translateY: [0, 'calc(18vh)'],
            scale: [1, 0.5],
            duration: 800,
            easing: 'out(3)',
          });
        }
      }

      // Fade in split content DURING the slide (starts 300ms into slide on desktop)
      if (splitContentRef.current) {
        animate(splitContentRef.current, {
          opacity: [0, 1],
          duration: 600,
          delay: isMobile ? 800 : 300, // Wait for signature fade on mobile
          easing: 'out(2)',
        });
      }

      // Show and animate content elements
      // Mobile: wait for signature to fully fade (800ms) + small gap
      // Desktop: start during slide (400ms)
      setTimeout(() => {
        setShowContent(true);
      }, isMobile ? 900 : 400);
    }, 2000); // 2 second pause after drawing completes
  };

  useEffect(() => {
    // Set default theme
    switchTheme('default');

    // Clear category page loaded flag when returning to home
    sessionStorage.removeItem('categoryPageLoaded');

    // Initially hide split content
    if (splitContentRef.current) {
      splitContentRef.current.style.opacity = '0';
    }
  }, [switchTheme]);

  useEffect(() => {
    // Animate content elements with stagger when they appear
    if (showContent) {
      // Fade in mobile header first
      if (headerRef.current) {
        animate(headerRef.current, {
          opacity: [0, 1],
          duration: 400,
          easing: 'out(2)',
        });
      }

      // First fade in the container
      const leftElements = leftContentRef.current?.querySelectorAll('.fade-in-item');

      if (leftElements && leftElements.length > 0) {
        animate(leftElements, {
          opacity: [0, 1],
          duration: 400,
          easing: 'out(2)',
        });
      }

      // Use splitText to split intro text into words
      const introTextElement = leftContentRef.current?.querySelector('.intro-text');
      if (introTextElement) {
        const { words } = splitText(introTextElement, {
          words: true,
        });

        // Animate words with typewriter effect
        if (words && words.length > 0) {
          animate(words, {
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 400,
            delay: stagger(50), // 50ms between each word
            easing: 'out(2)',
            onComplete: () => {
              // Fade in underlines after typewriter completes
              setTimeout(() => setShowUnderlines(true), 100);
            },
          });
        }
      }

      // Animate right column card grid
      const rightElements = rightContentRef.current?.querySelectorAll('.fade-in-item');
      if (rightElements && rightElements.length > 0) {
        animate(rightElements, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          delay: 800, // Start after intro animation
          easing: 'out(2)',
        });
      }

    }
  }, [showContent]);

  // Auto-scroll to first triggered card when hovering trigger words
  useEffect(() => {
    if (!activeTrigger || !rightContentRef.current) return;

    // Find all cards in the right column
    const cards = rightContentRef.current.querySelectorAll('.spotlight-card');

    // Find the first triggered card based on activeTrigger
    let firstTriggeredCard: Element | null = null;

    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      const cardId = cardElement.dataset?.cardId;
      const category = cardElement.dataset?.category;

      if (!cardId) return;

      const shouldScroll =
        (activeTrigger === 'building' && category === 'project') ||
        (activeTrigger === 'dori' && cardId.includes('dori')) ||
        (activeTrigger === 'travel' && (cardId === 'hobby-coachella' || cardId === 'hobby-angels-landing')) ||
        (activeTrigger === 'foraging-frames' && cardId === 'hobby-palm-trees') ||
        (activeTrigger === 'surfing' && (cardId.includes('surfing') || cardId.includes('mentawai'))) ||
        (activeTrigger === 'rock-climbing' && cardId.includes('rock-climbing')) ||
        (activeTrigger === 'write' && category === 'blog');

      if (shouldScroll && !firstTriggeredCard) {
        firstTriggeredCard = card;
      }
    });

    // Scroll to the first triggered card
    if (firstTriggeredCard) {
      const cardRect = firstTriggeredCard.getBoundingClientRect();

      // Calculate scroll position relative to the page
      const scrollTop = window.scrollY + cardRect.top - 150;

      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
    }
  }, [activeTrigger]);

  return (
    <>
      {/* Header - Mobile only, fades in with content */}
      <div ref={headerRef} className="lg:hidden fixed top-0 left-0 right-0 z-50 opacity-0">
        <Header
          onCategoryClick={(category) => router.push(`/${category}`)}
          onHomeClick={() => router.push('/')}
        />
      </div>

      {/* Main Container */}
      <div className="min-h-screen relative">
        {/* Signature - starts centered on full page */}
        <div
          ref={signatureRef}
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-20 transition-opacity duration-300"
          style={{
            opacity: isLeftCardDimmed ? 0.3 : 1,
          }}
        >
          <Signature
            ref={signatureComponentRef}
            onAnimationComplete={handleDrawingComplete}
          />
        </div>

        {/* Split Layout Content - fades in after slide */}
        {(
          <div className="max-w-7xl mx-auto px-8">
            <div
              ref={splitContentRef}
              className="grid grid-cols-1 lg:grid-cols-2"
            >
          {/* Left Column - Sticky on desktop, static on mobile */}
          <div className="lg:sticky top-0 lg:h-screen flex justify-center relative pt-16 lg:pt-24">
            <div
              ref={leftContentRef}
              className="flex flex-col justify-start px-8 lg:px-12 pt-10 lg:py-12 space-y-8 lg:space-y-12 relative z-10 backdrop-blur-xl rounded-2xl border border-white/0 h-auto lg:h-[680px] transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--card-glass-light) 0%, var(--card-glass-mid) 50%, var(--card-glass-light) 100%)',
                opacity: isLeftCardDimmed ? 0.3 : 1,
              }}
            >
              <div className="fade-in-item opacity-0">
                <p className="text-3xl lg:text-5xl">
                 Hello! I'm Justin.
                  </p>
                  <p className="intro-text text-large lg:text-2xl text-foreground max-w-2xl text-left" style={{ lineHeight: '1.35' }}>
                    <br />
                    Welcome to my digital nook - I love <TriggerWord trigger="building" showUnderline={showUnderlines}>building</TriggerWord>, and am currently working on <TriggerWord trigger="dori" showUnderline={showUnderlines}>dori</TriggerWord> full time.
                    <br />
                    <br />
                    Beyond that, I indulge in <TriggerWord trigger="travel" showUnderline={showUnderlines}>traveling</TriggerWord> and <TriggerWord trigger="foraging-frames" showUnderline={showUnderlines}>foraging frames</TriggerWord>! I also <TriggerWord trigger="surfing" showUnderline={showUnderlines}>ride waves</TriggerWord> and <TriggerWord trigger="rock-climbing" showUnderline={showUnderlines}>climb rocks</TriggerWord>.
                    <br />
                    <br />
                    Sometimes I <TriggerWord trigger="write" showUnderline={showUnderlines}>write</TriggerWord>, too.
                  </p>
                </div>

                <div className="-mt-6 mb-8">
                  <EmailSignup startAnimation={showUnderlines} />
                </div>
            </div>
          </div>

          {/* Right Column - Scrollable Card Grid with padding */}
          <div ref={rightContentRef} className="min-h-screen py-6 lg:py-24 px-0 lg:px-8">
            {showContent && (
              <div className="fade-in-item opacity-0 w-full">
                <CardGrid cards={homePageCards} />
              </div>
            )}
          </div>
        </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function Home() {
  return (
    <HoverTriggerProvider>
      <HomeContent />
    </HoverTriggerProvider>
  );
}
