'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type HoverTrigger = 'digital-nook' | 'building' | 'dori' | 'serial-hobbyist' | 'video' | 'surfing' | 'rock-climbing' | 'thoughts' | null;

interface HoverTriggerContextType {
  activeTrigger: HoverTrigger;
  setActiveTrigger: (trigger: HoverTrigger) => void;
  focusedCard: string | null;
  setFocusedCard: (cardId: string | null) => void;
}

const HoverTriggerContext = createContext<HoverTriggerContextType | undefined>(undefined);

export function HoverTriggerProvider({ children }: { children: ReactNode }) {
  const [activeTrigger, setActiveTrigger] = useState<HoverTrigger>(null);
  const [focusedCard, setFocusedCard] = useState<string | null>(null);

  return (
    <HoverTriggerContext.Provider value={{ activeTrigger, setActiveTrigger, focusedCard, setFocusedCard }}>
      {children}
    </HoverTriggerContext.Provider>
  );
}

export function useHoverTrigger() {
  const context = useContext(HoverTriggerContext);
  if (context === undefined) {
    throw new Error('useHoverTrigger must be used within a HoverTriggerProvider');
  }
  return context;
}
