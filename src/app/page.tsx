'use client';

import { useRef, useEffect, useState } from 'react';
import { animate, stagger, splitText } from 'animejs';
import Signature, { SignatureRef } from './components/Signature';
import EmailSignup from './components/EmailSignup';
import CardGrid from './components/CardGrid';
import TriggerWord from './components/TriggerWord';
import { useTheme } from '@/hooks/useTheme';
import { homePageCards } from '@/data/homePageCards';
import { HoverTriggerProvider, useHoverTrigger } from '@/contexts/HoverTriggerContext';

function HomeContent() {
  const signatureRef = useRef<HTMLDivElement>(null);
  const signatureComponentRef = useRef<SignatureRef>(null);
  const splitContentRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [showUnderlines, setShowUnderlines] = useState(false);
  const { switchTheme } = useTheme();
  const { activeTrigger, focusedCard } = useHoverTrigger();

  // Dim left card only when directly hovering a card, not when hovering trigger words
  const isLeftCardDimmed = focusedCard !== null;

  const handleDrawingComplete = () => {
    // Wait after drawing completes, then slide
    setTimeout(() => {
      // Slide signature to left
      if (signatureRef.current) {
        animate(signatureRef.current, {
          translateX: [0, 'calc(-7vw)'],
          translateY: [0, 'calc(25vh)'],
          scale: [1, 0.5],
          duration: 800,
          easing: 'out(3)',
        });
      }

      // Fade in split content DURING the slide (starts 300ms into slide)
      if (splitContentRef.current) {
        animate(splitContentRef.current, {
          opacity: [0, 1],
          duration: 600,
          delay: 300,
          easing: 'out(2)',
        });
      }

      // Show and animate content elements
      setTimeout(() => {
        setShowContent(true);
      }, 400);
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

  return (
    <>
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
          <div className="lg:sticky top-0 lg:h-screen flex justify-center relative pt-12 lg:pt-24">
            <div
              ref={leftContentRef}
              className="flex flex-col justify-start px-8 lg:px-12 py-8 lg:py-12 space-y-12 relative z-10 backdrop-blur-xl rounded-2xl border border-white/40 h-auto lg:h-[750px] transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--card-glass-light) 0%, var(--card-glass-mid) 50%, var(--card-glass-light) 100%)',
                opacity: isLeftCardDimmed ? 0.3 : 1,
              }}
            >
              <div className="fade-in-item opacity-0">
                <p className="text-3xl lg:text-5xl">
                 Welcome! I'm Justin.
                  </p>
                  <p className="intro-text text-xl lg:text-3xl text-foreground max-w-2xl text-left" style={{ lineHeight: '1.35' }}>
                    <br />
                    Welcome to my <TriggerWord trigger="digital-nook" showUnderline={showUnderlines}>digital nook</TriggerWord> - I love <TriggerWord trigger="building" showUnderline={showUnderlines}>building</TriggerWord>, and am currently working on <TriggerWord trigger="dori" showUnderline={showUnderlines}>dori</TriggerWord> full time.
                    <br />
                    <br />
                    Beyond that, I'm also a <TriggerWord trigger="serial-hobbyist" showUnderline={showUnderlines}>serial hobbyist</TriggerWord> - I love storytelling through <TriggerWord trigger="video" showUnderline={showUnderlines}>video</TriggerWord> and staying active with <TriggerWord trigger="surfing" showUnderline={showUnderlines}>surfing</TriggerWord> and <TriggerWord trigger="rock-climbing" showUnderline={showUnderlines}>rock climbing</TriggerWord>. Ocassionally, I'll feel compelled to <TriggerWord trigger="thoughts" showUnderline={showUnderlines}>share my thoughts</TriggerWord>!
                  </p>
                </div>

                <div className="fade-in-item opacity-0">
                  <EmailSignup />
                </div>
            </div>
          </div>

          {/* Right Column - Scrollable Card Grid with padding */}
          <div ref={rightContentRef} className="min-h-screen py-12 lg:py-24 px-6 lg:px-8">
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
