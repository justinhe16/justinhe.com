'use client';

import { useEffect, useRef } from 'react';

export default function GrainBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && typeof window !== 'undefined') {
      // Dynamically import grained to avoid SSR issues
      import('grained').then((module) => {
        const grained = module.default || module;

        if (typeof grained === 'function') {
          grained('#grain-container', {
            animate: true,
            patternWidth: 100,
            patternHeight: 100,
            grainOpacity: 0.8,
            grainDensity: 5,
            grainWidth: 1,
            grainHeight: 1,
          });
        }
      }).catch((err) => {
        console.error('Failed to load grained:', err);
      });
    }
  }, []);

  return (
    <div
      id="grain-container"
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
}
