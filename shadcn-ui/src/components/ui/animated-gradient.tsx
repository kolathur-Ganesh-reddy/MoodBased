// src/components/ui/animated-gradient.tsx
import React, { useEffect, useRef } from 'react';
import { useMoodContext } from '@/contexts/MoodContext';
import { useDynamicTheme } from '@/hooks/useDynamicTheme';
import { cn } from '@/lib/utils';

export const AnimatedGradient = () => {
  const { currentMood } = useMoodContext();
  const { getThemeColors } = useDynamicTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Gradient blobs
    const blobs: Blob[] = [];
    const numBlobs = 4;
    
    let colors: string[] = [];
    
    // Default colors if no mood is set
    if (!currentMood) {
      colors = [
        'rgba(99, 102, 241, 0.2)',
        'rgba(79, 70, 229, 0.2)',
        'rgba(67, 56, 202, 0.2)',
        'rgba(124, 58, 237, 0.2)',
      ];
    } else {
      const theme = getThemeColors(currentMood);
      colors = [
        `${theme.gradientStart}40`,
        `${theme.primary}30`,
        `${theme.secondary}30`,
        `${theme.gradientEnd}40`,
      ];
    }
    
    // Create blobs with random properties
    for (let i = 0; i < numBlobs; i++) {
      blobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 100,
        xSpeed: (Math.random() - 0.5) * 0.7,
        ySpeed: (Math.random() - 0.5) * 0.7,
        color: colors[i % colors.length],
      });
    }
    
    // Animation loop
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update blobs
      for (const blob of blobs) {
        // Update position
        blob.x += blob.xSpeed;
        blob.y += blob.ySpeed;
        
        // Bounce off edges
        if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius;
        if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius;
        if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius;
        
        // Draw blob
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      requestRef.current = requestAnimationFrame(render);
    };
    
    requestRef.current = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [currentMood, getThemeColors]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={cn(
        "fixed inset-0 -z-10 w-full h-full",
        currentMood ? 'transition-opacity duration-1000' : ''
      )}
    />
  );
};

// Types for the animated gradient
interface Blob {
  x: number;
  y: number;
  radius: number;
  xSpeed: number;
  ySpeed: number;
  color: string;
}