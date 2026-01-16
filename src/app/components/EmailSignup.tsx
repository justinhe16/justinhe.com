'use client';

import { useState, useRef, useEffect } from 'react';
import { animate, stagger, splitText } from 'animejs';
import { addEmailToList, isSupabaseConfigured } from '@/lib/supabase';

type SignupState = 'initial' | 'expanding' | 'expanded' | 'submitting' | 'success' | 'error';

interface EmailSignupProps {
  startAnimation?: boolean;
}

export default function EmailSignup({ startAnimation = false }: EmailSignupProps) {
  const [state, setState] = useState<SignupState>('initial');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showButton, setShowButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonTextRef = useRef<HTMLSpanElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Don't render if Supabase isn't configured
  if (!isSupabaseConfigured()) {
    return null;
  }

  // Typewriter effect for initial button - starts after intro text finishes
  useEffect(() => {
    if (!startAnimation) return;

    // Small delay before showing for smooth transition
    const timer = setTimeout(() => {
      if (buttonTextRef.current) {
        // Split text into words
        const { words } = splitText(buttonTextRef.current, {
          words: true,
        });

        if (words && words.length > 0) {
          // Set all words to invisible first
          words.forEach((word: HTMLElement) => {
            word.style.opacity = '0';
          });

          // Show button container
          setShowButton(true);

          // Animate words with typewriter effect
          animate(words, {
            opacity: [0, 1],
            translateY: [5, 0],
            duration: 300,
            delay: stagger(50),
            easing: 'out(2)',
          });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [startAnimation]);

  // Animate success message when it appears
  useEffect(() => {
    if (state === 'success' && successRef.current) {
      animate(successRef.current, {
        opacity: [0, 1],
        translateY: [10, 0],
        scale: [0.95, 1],
        duration: 500,
        easing: 'out(3)',
      });
    }
  }, [state]);

  const handleExpand = () => {
    setState('expanding');

    // Animate button fading out and morphing
    if (buttonRef.current) {
      animate(buttonRef.current, {
        opacity: [1, 0],
        scale: [1, 0.95],
        duration: 300,
        easing: 'out(2)',
      });
    }

    // After button fades, change state to show form
    setTimeout(() => {
      setState('expanded');
    }, 300);
  };

  // Animate form when it appears
  useEffect(() => {
    if (state === 'expanded' && formRef.current) {
      animate(formRef.current, {
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 500,
        easing: 'out(3)',
      });

      // Focus input after animation starts
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email');
      return;
    }

    setState('submitting');
    setErrorMessage('');

    // Animate form while submitting
    if (formRef.current) {
      animate(formRef.current, {
        opacity: [1, 0.6],
        scale: [1, 0.98],
        duration: 300,
        easing: 'out(2)',
      });
    }

    try {
      await addEmailToList(email);

      // Animate out the form
      if (formRef.current) {
        animate(formRef.current, {
          opacity: [0.6, 0],
          translateY: [0, -10],
          duration: 400,
          easing: 'out(2)',
        });
      }

      // Show success after form animates out
      setTimeout(() => {
        setState('success');
      }, 400);
    } catch (error: any) {
      // Reset form animation on error
      if (formRef.current) {
        animate(formRef.current, {
          opacity: [0.6, 1],
          scale: [0.98, 1],
          duration: 300,
          easing: 'out(2)',
        });
      }
      setState('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div ref={containerRef} className="mt-6">
      {(state === 'initial' || state === 'expanding') && (
        <button
          ref={buttonRef}
          onClick={handleExpand}
          disabled={state === 'expanding'}
          className="text-sm transition-all relative cursor-pointer hover:opacity-80"
          style={{
            opacity: showButton ? 1 : 0,
            textDecoration: 'underline',
            textDecorationThickness: '1px',
            textUnderlineOffset: '4px'
          }}
        >
          <span ref={buttonTextRef} className="signup-text">sign up for my email list :)</span>
        </button>
      )}

      {(state === 'expanded' || state === 'submitting') && (
        <div ref={formRef} style={{ opacity: 0 }}>
          <form onSubmit={handleSubmit} className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-gray-800 font-sans text-sm transition-colors placeholder:text-gray-400"
                disabled={state === 'submitting'}
              />
              {errorMessage && (
                <p className="text-red-500 text-xs mt-1 font-sans absolute">{errorMessage}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={state === 'submitting'}
              className="text-2xl hover:scale-110 transition-transform disabled:opacity-50 disabled:scale-100"
            >
              {state === 'submitting' ? '...' : '→'}
            </button>
          </form>
        </div>
      )}

      {state === 'success' && (
        <div ref={successRef} className="flex items-center gap-2 text-green-700" style={{ opacity: 0 }}>
          <span className="text-xl">✓</span>
          <span className="text-sm">thank you for signing up!</span>
        </div>
      )}

      {state === 'error' && (
        <div className="text-red-600 text-sm">
          {errorMessage}
          <button
            onClick={() => setState('expanded')}
            className="ml-2 underline"
          >
            try again
          </button>
        </div>
      )}
    </div>
  );
}
