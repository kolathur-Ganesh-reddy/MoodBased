// src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoodSelector } from '@/components/MoodSelector';
import { useMoodContext } from '@/contexts/MoodContext';
import { AnimatedGradient } from '@/components/ui/animated-gradient';
import { Mood3DEffect } from '@/components/ui/mood-3d-effect';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { currentMood } = useMoodContext();
  const navigate = useNavigate();

  // Redirect to dashboard if mood is already selected
  React.useEffect(() => {
    if (currentMood) {
      navigate('/dashboard');
    }
  }, [currentMood, navigate]);

  return (
    <div className="min-h-screen flex flex-col parallax">
      <AnimatedGradient />
      <Mood3DEffect />
      
      <div className="container mx-auto flex flex-col flex-grow items-center justify-center px-4 py-12 parallax-layer" data-depth="0.2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-4xl text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-3d pulse-3d">
            Welcome to VibeScape
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            A dynamic content experience that adapts to your current mood
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-4xl"
        >
          <MoodSelector />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 text-center space-y-6 max-w-2xl"
        >
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border mood-card-3d content-3d-container">
              <div className="text-3xl mb-2 float-3d">🎭</div>
              <div className="content-3d">
                <h3 className="font-medium mb-1 text-3d">Select Your Mood</h3>
                <p className="text-sm text-muted-foreground">Choose how you're feeling right now</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border mood-card-3d content-3d-container">
              <div className="text-3xl mb-2 float-3d">🎨</div>
              <div className="content-3d">
                <h3 className="font-medium mb-1 text-3d">Experience Transformation</h3>
                <p className="text-sm text-muted-foreground">Watch the interface adapt to your mood</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border mood-card-3d content-3d-container">
              <div className="text-3xl mb-2 float-3d">📊</div>
              <div className="content-3d">
                <h3 className="font-medium mb-1 text-3d">Track Your Moods</h3>
                <p className="text-sm text-muted-foreground">See patterns in your emotional journey</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6">
            <Button
              size="lg"
              onClick={() => document.querySelector('.mood-selector')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;