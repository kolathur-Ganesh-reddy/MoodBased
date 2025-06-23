// src/pages/DashboardPage.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ContentFeed } from '@/components/ContentFeed';
import { useMoodContext } from '@/contexts/MoodContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOOD_EMOJIS, MOOD_DESCRIPTIONS } from '@/lib/theme-config';

const DashboardPage = () => {
  const { currentMood, clearMood } = useMoodContext();
  
  // If no mood is selected, redirect to home
  if (!currentMood) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-6 px-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="text-5xl sm:text-6xl">
                {MOOD_EMOJIS[currentMood]}
              </div>
              <div>
                <h1 className="text-2xl font-bold capitalize text-center sm:text-left">
                  {currentMood} Mood
                </h1>
                <p className="text-muted-foreground mt-1 text-center sm:text-left">
                  {MOOD_DESCRIPTIONS[currentMood]}
                </p>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearMood}
                  >
                    Change Mood
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8">
          <ContentFeed />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;