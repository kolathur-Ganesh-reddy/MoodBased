// src/components/MoodSelector.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mood } from '@/types';
import { useMoodContext } from '@/contexts/MoodContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MoodOption {
  mood: Mood;
  emoji: string;
  label: string;
  className: string;
}

const moodOptions: MoodOption[] = [
  { 
    mood: 'happy', 
    emoji: '😊', 
    label: 'Happy', 
    className: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' 
  },
  { 
    mood: 'sad', 
    emoji: '😢', 
    label: 'Sad', 
    className: 'bg-blue-100 hover:bg-blue-200 text-blue-800' 
  },
  { 
    mood: 'energetic', 
    emoji: '⚡', 
    label: 'Energetic', 
    className: 'bg-orange-100 hover:bg-orange-200 text-orange-800' 
  },
  { 
    mood: 'calm', 
    emoji: '😌', 
    label: 'Calm', 
    className: 'bg-green-100 hover:bg-green-200 text-green-800' 
  },
  { 
    mood: 'angry', 
    emoji: '😠', 
    label: 'Angry', 
    className: 'bg-red-100 hover:bg-red-200 text-red-800' 
  },
];

export const MoodSelector = () => {
  const { setMood, currentMood } = useMoodContext();

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">What's your vibe today?</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-4xl">
        {moodOptions.map((option) => (
          <motion.div
            key={option.mood}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline" 
              className={cn(
                'h-24 w-full text-lg flex flex-col justify-center items-center gap-2 border-2',
                option.className,
                currentMood === option.mood && 'ring-2 ring-offset-2 ring-primary'
              )}
              onClick={() => setMood(option.mood)}
            >
              <span className="text-3xl">{option.emoji}</span>
              <span>{option.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};