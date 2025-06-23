// src/lib/theme-config.ts
import { Mood } from '@/types';

// This file serves as a central place for theme configurations
// The actual theme implementation is in useDynamicTheme.ts hook

export const MOOD_LABELS: Record<Mood, string> = {
  happy: 'Happy',
  sad: 'Sad',
  energetic: 'Energetic',
  calm: 'Calm',
  angry: 'Angry',
};

export const MOOD_EMOJIS: Record<Mood, string> = {
  happy: '😊',
  sad: '😢',
  energetic: '⚡',
  calm: '😌',
  angry: '😠',
};

export const MOOD_DESCRIPTIONS: Record<Mood, string> = {
  happy: 'Feeling joyful, content, and positive',
  sad: 'Feeling down, melancholic, or reflective',
  energetic: 'Feeling motivated, active, and full of energy',
  calm: 'Feeling peaceful, centered, and relaxed',
  angry: 'Feeling frustrated, irritated, or intense',
};

export const DEFAULT_MOOD: Mood = 'calm';