// src/types.ts
export type Mood = 'happy' | 'sad' | 'energetic' | 'calm' | 'angry';

export interface MoodTheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  cardBg: string;
  gradientStart: string;
  gradientEnd: string;
  animation: string;
}

export interface MoodContent {
  title: string;
  emoji: string;
  quotes: string[];
  articles: Article[];
  playlists: Playlist[];
  videos: Video[];
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  source: string;
  url: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  sourceUrl: string;
  source: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  source: string;
  url: string;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: 'Books' | 'Clothing' | 'Tech' | 'Decor' | 'Wellness';
  moodTags: Mood[];
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: Mood;
  note: string;
  timestamp: number;
}

export interface User {
  nickname: string;
  avatarUrl: string;
  preferences: {
    useFaceDetection: boolean;
    darkMode: boolean;
    soundEffects: boolean;
  };
}