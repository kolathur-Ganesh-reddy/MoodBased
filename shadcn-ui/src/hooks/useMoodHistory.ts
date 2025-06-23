// src/hooks/useMoodHistory.ts
import { useState, useCallback } from 'react';
import { Mood, MoodEntry } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const useMoodHistory = () => {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  const loadHistory = useCallback(() => {
    try {
      const savedHistory = localStorage.getItem('mood-history');
      if (savedHistory) {
        setMoodHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading mood history:', error);
    }
  }, []);

  const saveHistory = useCallback((entries: MoodEntry[]) => {
    try {
      localStorage.setItem('mood-history', JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving mood history:', error);
    }
  }, []);

  const addEntry = useCallback((mood: Mood, note: string) => {
    const newEntry: MoodEntry = {
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
      mood,
      note,
      timestamp: Date.now(),
    };

    setMoodHistory((prev) => {
      const updated = [...prev, newEntry];
      saveHistory(updated);
      return updated;
    });
  }, [saveHistory]);

  const clearHistory = useCallback(() => {
    localStorage.removeItem('mood-history');
    setMoodHistory([]);
  }, []);

  return {
    moodHistory,
    addEntry,
    loadHistory,
    clearHistory
  };
};