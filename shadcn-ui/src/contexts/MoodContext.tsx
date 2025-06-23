// src/contexts/MoodContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Mood, MoodEntry } from '../types';
import { useMoodHistory } from '../hooks/useMoodHistory';

interface MoodContextType {
  currentMood: Mood | null;
  setMood: (mood: Mood) => void;
  moodHistory: MoodEntry[];
  addMoodEntry: (mood: Mood, note: string) => void;
  clearMood: () => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);
  const { moodHistory, addEntry, loadHistory } = useMoodHistory();

  useEffect(() => {
    loadHistory();
    
    // Check for previously selected mood in the session
    const savedMood = sessionStorage.getItem('currentMood') as Mood | null;
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, [loadHistory]);

  const setMood = (mood: Mood) => {
    setCurrentMood(mood);
    sessionStorage.setItem('currentMood', mood);
  };

  const addMoodEntry = (mood: Mood, note: string) => {
    addEntry(mood, note);
  };

  const clearMood = () => {
    setCurrentMood(null);
    sessionStorage.removeItem('currentMood');
  };

  return (
    <MoodContext.Provider
      value={{ currentMood, setMood, moodHistory, addMoodEntry, clearMood }}
    >
      {children}
    </MoodContext.Provider>
  );
};

export const useMoodContext = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMoodContext must be used within a MoodProvider');
  }
  return context;
};