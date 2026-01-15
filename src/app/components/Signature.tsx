'use client';

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { animate } from 'animejs';

interface SignatureProps {
  onAnimationComplete?: () => void;
}

export interface SignatureRef {
  redraw: () => void;
}

const Signature = forwardRef<SignatureRef, SignatureProps>(
  ({ onAnimationComplete }, ref) => {
    const pathRef = useRef<SVGPathElement>(null);
    const blurPathRef = useRef<SVGPathElement>(null);

  const drawSignature = (isInitial = false) => {
    if (pathRef.current && blurPathRef.current) {
      const path = pathRef.current;
      const blurPath = blurPathRef.current;
      const pathLength = path.getTotalLength();

      // Reset paths
      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `${pathLength}`;
      blurPath.style.strokeDasharray = `${pathLength}`;
      blurPath.style.strokeDashoffset = `${pathLength}`;
      blurPath.style.opacity = '0.4';

      const duration = isInitial ? 1800 : 1200; // Faster redraw
      const delay = isInitial ? 300 : 0;

      // Animate the main (sharp) path
      animate(path, {
        strokeDashoffset: [pathLength, 0],
        easing: 'inOut(2)',
        duration,
        delay,
        complete: () => {
          if (isInitial && onAnimationComplete) {
            setTimeout(onAnimationComplete, 200);
          }
        },
      });

      // Animate the blur path slightly ahead
      animate(blurPath, {
        strokeDashoffset: [pathLength, 0],
        easing: 'inOut(2)',
        duration,
        delay: isInitial ? 250 : 0,
      });

      // Fade out the blur path
      animate(blurPath, {
        opacity: [0.4, 0],
        duration: 400,
        delay: duration,
        easing: 'out(2)',
      });
    }
  };

  // Expose redraw function via ref
  useImperativeHandle(ref, () => ({
    redraw: () => drawSignature(false),
  }));

  useEffect(() => {
    drawSignature(true);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <svg
        width="283"
        height="195"
        viewBox="0 0 283 195"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-md"
      >
        <defs>
          <filter id="tip-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* Blurred tip path (draws slightly ahead) */}
        <path
          ref={blurPathRef}
          d="M1.01923 163.537C0.863525 164.583 1.61345 169.699 4.74114 186.386C5.99165 193.057 5.8411 202.306 26.3983 178.091C46.9555 153.877 87.6847 95.9977 111.346 60.7298C135.008 25.462 140.368 14.5591 143.241 8.41007C146.115 2.26105 146.339 1.19629 145.542 1.0216C142.92 0.446971 132.46 11.3767 116.516 29.2437C108.847 37.8374 103.258 46.5241 98.0422 54.9514C87.9558 71.248 79.4667 86.5 79.4667 99.5781C79.4667 105.445 80.1959 110.041 82.8995 114.331C85.6032 118.622 89.7927 122.449 97.5042 126.707C105.216 130.966 116.322 135.539 130.575 139.243C144.829 142.947 161.892 145.642 178.324 147.117C194.755 148.591 210.039 148.762 223.465 148.209C236.891 147.655 247.998 146.371 256.58 144.822C270.883 141.498 278.72 138.584 281.849 136.407"
          stroke="var(--theme-signature)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.4"
          filter="url(#tip-blur)"
        />

        {/* Main sharp path */}
        <path
          ref={pathRef}
          d="M1.01923 163.537C0.863525 164.583 1.61345 169.699 4.74114 186.386C5.99165 193.057 5.8411 202.306 26.3983 178.091C46.9555 153.877 87.6847 95.9977 111.346 60.7298C135.008 25.462 140.368 14.5591 143.241 8.41007C146.115 2.26105 146.339 1.19629 145.542 1.0216C142.92 0.446971 132.46 11.3767 116.516 29.2437C108.847 37.8374 103.258 46.5241 98.0422 54.9514C87.9558 71.248 79.4667 86.5 79.4667 99.5781C79.4667 105.445 80.1959 110.041 82.8995 114.331C85.6032 118.622 89.7927 122.449 97.5042 126.707C105.216 130.966 116.322 135.539 130.575 139.243C144.829 142.947 161.892 145.642 178.324 147.117C194.755 148.591 210.039 148.762 223.465 148.209C236.891 147.655 247.998 146.371 256.58 144.822C270.883 141.498 278.72 138.584 281.849 136.407"
          stroke="var(--theme-signature)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
});

Signature.displayName = 'Signature';

export default Signature;
