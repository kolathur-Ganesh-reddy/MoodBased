// src/pages/DiaryPage.tsx
import React from 'react';
import { Layout } from '@/components/Layout';
import { MoodDiary } from '@/components/MoodDiary';
import { useMoodContext } from '@/contexts/MoodContext';

const DiaryPage = () => {
  // We don't force mood selection for diary page
  // It can be useful regardless of current mood
  
  return (
    <Layout>
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">Mood Diary</h1>
          <p className="text-muted-foreground">
            Track, visualize and reflect on your mood patterns over time
          </p>
        </div>
        
        <MoodDiary />
      </div>
    </Layout>
  );
};

export default DiaryPage;