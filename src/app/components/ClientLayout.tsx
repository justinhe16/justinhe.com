'use client';

import { useEffect } from 'react';
import GrainBackground from './GrainBackground';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log('🌈 ClientLayout mounted, gradient element should be present');
    const gradientEl = document.querySelector('.gradient-background-transition');
    console.log('🌈 Gradient element found:', !!gradientEl);
    if (gradientEl) {
      const styles = window.getComputedStyle(gradientEl);
      console.log('🌈 Gradient background:', styles.background);
      console.log('🌈 Gradient z-index:', styles.zIndex);
    }
  }, []);

  return (
    <>
      <GrainBackground />
      {/* Gradient layers - one for each theme */}
      <div className="gradient-layer gradient-layer-default" />
      <div className="gradient-layer gradient-layer-projects" />
      <div className="gradient-layer gradient-layer-blog" />
      <div className="gradient-layer gradient-layer-hobbies" />
      {/* Noise overlay */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          zIndex: -1,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")"
        }}
      />
      {children}
    </>
  );
}
