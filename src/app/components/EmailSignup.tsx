'use client';

import { useState, useRef } from 'react';
import { animate } from 'animejs';
import { addEmailToList, isSupabaseConfigured } from '@/lib/supabase';

type SignupState = 'initial' | 'expanded' | 'submitting' | 'success' | 'error';

export default function EmailSignup() {
  const [state, setState] = useState<SignupState>('initial');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  // Don't render if Supabase isn't configured
  if (!isSupabaseConfigured()) {
    return null;
  }

  const handleExpand = () => {
    setState('expanded');
    if (formRef.current) {
      animate(formRef.current, {
        height: [0, 'auto'],
        opacity: [0, 1],
        duration: 400,
        easing: 'out(3)',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email');
      return;
    }

    setState('submitting');
    setErrorMessage('');

    try {
      await addEmailToList(email);

      setState('success');

      // Animate to success state
      if (formRef.current) {
        animate(formRef.current, {
          height: ['auto', 60],
          duration: 400,
          easing: 'out(2)',
        });
      }
    } catch (error: any) {
      setState('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="mt-6">
      {state === 'initial' && (
        <button
          onClick={handleExpand}
          className="text-sm underline decoration-1 underline-offset-4 hover:decoration-2 transition-all"
        >
          sign up for my email list :)
        </button>
      )}

      {(state === 'expanded' || state === 'submitting') && (
        <div ref={formRef} className="overflow-hidden">
          <form onSubmit={handleSubmit} className="flex gap-2 items-start">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 font-sans text-sm"
                disabled={state === 'submitting'}
                autoFocus
              />
              {errorMessage && (
                <p className="text-red-500 text-xs mt-1 font-sans">{errorMessage}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={state === 'submitting'}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 font-sans text-sm"
            >
              {state === 'submitting' ? '...' : '→'}
            </button>
          </form>
        </div>
      )}

      {state === 'success' && (
        <div
          ref={formRef}
          className="flex items-center gap-2 text-green-700"
        >
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
