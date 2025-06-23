// src/hooks/useDynamicTheme.ts
import { useCallback } from 'react';
import { Mood, MoodTheme } from '@/types';

// Theme configurations for each mood
const moodThemes: Record<Mood, MoodTheme> = {
  happy: {
    primary: '#f59e0b',
    secondary: '#fbbf24',
    background: '#fffbeb',
    text: '#78350f',
    accent: '#fcd34d',
    cardBg: '#fef3c7',
    gradientStart: '#fef3c7',
    gradientEnd: '#fde68a',
    animation: 'bounce',
  },
  sad: {
    primary: '#3b82f6',
    secondary: '#60a5fa',
    background: '#eff6ff',
    text: '#1e3a8a',
    accent: '#93c5fd',
    cardBg: '#dbeafe',
    gradientStart: '#dbeafe',
    gradientEnd: '#bfdbfe',
    animation: 'fadeIn',
  },
  energetic: {
    primary: '#ef4444',
    secondary: '#f87171',
    background: '#fef2f2',
    text: '#7f1d1d',
    accent: '#fca5a5',
    cardBg: '#fee2e2',
    gradientStart: '#fee2e2',
    gradientEnd: '#fecaca',
    animation: 'pulse',
  },
  calm: {
    primary: '#10b981',
    secondary: '#34d399',
    background: '#ecfdf5',
    text: '#064e3b',
    accent: '#6ee7b7',
    cardBg: '#d1fae5',
    gradientStart: '#d1fae5',
    gradientEnd: '#a7f3d0',
    animation: 'fadeIn',
  },
  angry: {
    primary: '#dc2626',
    secondary: '#ef4444',
    background: '#fef2f2',
    text: '#7f1d1d',
    accent: '#f87171',
    cardBg: '#fee2e2',
    gradientStart: '#fee2e2',
    gradientEnd: '#fca5a5',
    animation: 'shake',
  },
};

export const useDynamicTheme = () => {
  const getThemeColors = useCallback((mood: Mood) => {
    return moodThemes[mood];
  }, []);

  const applyThemeStyles = useCallback((mood: Mood) => {
    const theme = moodThemes[mood];
    const root = document.documentElement;

    // Apply CSS variables
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-foreground', '#ffffff');
    
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--secondary-foreground', '#ffffff');
    
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent-foreground', theme.text);
    
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--foreground', theme.text);

    // Card backgrounds
    root.style.setProperty('--card', theme.cardBg);
    root.style.setProperty('--card-foreground', theme.text);

    // Apply CSS class to body for animation effects if needed
    document.body.dataset.moodAnimation = theme.animation;
    
    return theme;
  }, []);

  const resetTheme = useCallback(() => {
    const root = document.documentElement;
    
    // Reset to default theme
    root.style.removeProperty('--primary');
    root.style.removeProperty('--primary-foreground');
    root.style.removeProperty('--secondary');
    root.style.removeProperty('--secondary-foreground');
    root.style.removeProperty('--accent');
    root.style.removeProperty('--accent-foreground');
    root.style.removeProperty('--background');
    root.style.removeProperty('--foreground');
    root.style.removeProperty('--card');
    root.style.removeProperty('--card-foreground');
    
    document.body.removeAttribute('data-mood-animation');
  }, []);

  return {
    getThemeColors,
    applyThemeStyles,
    resetTheme
  };
};