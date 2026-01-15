'use client';

import GrainBackground from './GrainBackground';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GrainBackground />
      {children}
    </>
  );
}
