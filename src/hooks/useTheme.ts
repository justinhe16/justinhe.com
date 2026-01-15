import { useCallback } from 'react';

export type Theme = 'default' | 'projects' | 'hobbies' | 'blog';

interface ThemeColors {
  bg1: string;
  bg2: string;
  signature: string;
  primary: string;
}

const themeColors: Record<Theme, ThemeColors> = {
  default: {
    bg1: '#ffffff',
    bg2: '#f5e6d3',
    signature: '#000000',
    primary: '#A0826D',
  },
  projects: {
    bg1: '#ffffff',
    bg2: '#bbdefb',
    signature: '#1565C0',
    primary: '#2196F3',
  },
  hobbies: {
    bg1: '#ffffff',
    bg2: '#ffcdd2',
    signature: '#C62828',
    primary: '#F44336',
  },
  blog: {
    bg1: '#ffffff',
    bg2: '#fff9c4',
    signature: '#F57F17',
    primary: '#FFC107',
  },
};

export function useTheme() {
  const switchTheme = useCallback((theme: Theme) => {
    const colors = themeColors[theme];
    const root = document.documentElement;

    // Directly set CSS variables - CSS transitions will handle smooth animation
    root.style.setProperty('--theme-bg-1', colors.bg1);
    root.style.setProperty('--theme-bg-2', colors.bg2);
    root.style.setProperty('--theme-signature', colors.signature);
    root.style.setProperty('--theme-primary', colors.primary);
  }, []);

  const getThemeColor = useCallback((theme: Theme) => {
    return themeColors[theme];
  }, []);

  return { switchTheme, getThemeColor };
}
