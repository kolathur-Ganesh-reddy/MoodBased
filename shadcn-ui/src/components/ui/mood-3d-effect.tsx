// src/components/ui/mood-3d-effect.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useMoodContext } from '@/contexts/MoodContext';
import { useDynamicTheme } from '@/hooks/useDynamicTheme';
import '../styles/3d-animations.css';

interface Mood3DEffectProps {
  intensity?: number;
}

export const Mood3DEffect: React.FC<Mood3DEffectProps> = ({ intensity = 1.0 }) => {
  const { currentMood } = useMoodContext();
  const { getThemeColors } = useDynamicTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Create particles
    createParticles();

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      if (particlesRef.current) {
        // Rotate particles
        particlesRef.current.rotation.x += 0.0005;
        particlesRef.current.rotation.y += 0.001;
        
        // Update particle positions for a wave effect
        const positions = particlesRef.current.geometry.attributes.position;
        const time = Date.now() * 0.0005;
        
        for (let i = 0; i < positions.count; i++) {
          const ix = i * 3;
          const x = positions.getX(i);
          const y = positions.getY(i);
          
          // Create wave motion based on position
          const z = Math.sin((x + time) * 0.3) * 0.5 + Math.cos((y + time) * 0.2) * 0.5;
          positions.setZ(i, z);
        }
        
        positions.needsUpdate = true;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (particlesRef.current && sceneRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
        sceneRef.current.remove(particlesRef.current);
      }
    };
  }, []);

  // Update particles when mood changes
  useEffect(() => {
    if (currentMood && particlesRef.current && sceneRef.current) {
      updateParticlesForMood(currentMood);
    }
  }, [currentMood]);

  const createParticles = () => {
    if (!sceneRef.current) return;

    // Remove existing particles
    if (particlesRef.current) {
      sceneRef.current.remove(particlesRef.current);
      particlesRef.current.geometry.dispose();
      (particlesRef.current.material as THREE.Material).dispose();
    }

    // Create particle geometry
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Default colors (will be updated when mood changes)
    const color = new THREE.Color(0x6366f1);

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a sphere
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      color.toArray(colors, i * 3);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Material with custom shader for glowing particles
    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    // Create points object
    const particles = new THREE.Points(geometry, material);
    sceneRef.current.add(particles);
    particlesRef.current = particles;

    // Set initial colors based on current mood
    if (currentMood) {
      updateParticlesForMood(currentMood);
    }
  };

  const updateParticlesForMood = (mood: string) => {
    if (!particlesRef.current) return;
    
    const theme = getThemeColors(mood as any);
    const colors = particlesRef.current.geometry.attributes.color as THREE.BufferAttribute;
    
    // Parse theme colors to create a gradient effect
    const colorStart = new THREE.Color(theme.gradientStart);
    const colorEnd = new THREE.Color(theme.gradientEnd);
    const colorAccent = new THREE.Color(theme.accent);

    for (let i = 0; i < colors.count; i++) {
      // Mix colors based on position for gradient effect
      const mix = Math.random();
      let color;
      
      if (mix < 0.33) {
        color = colorStart;
      } else if (mix < 0.66) {
        color = colorAccent;
      } else {
        color = colorEnd;
      }
      
      // Apply intensity
      color.r *= intensity;
      color.g *= intensity;
      color.b *= intensity;
      
      color.toArray(colors.array, i * 3);
    }
    
    colors.needsUpdate = true;
    
    // Update animation speed based on mood
    const speedMultiplier = mood === 'energetic' ? 2 :
                           mood === 'happy' ? 1.5 :
                           mood === 'calm' ? 0.7 :
                           mood === 'sad' ? 0.5 : 1;
                           
    if (particlesRef.current) {
      particlesRef.current.userData.speedMultiplier = speedMultiplier;
    }
    
    // Add a class to the body for CSS animations
    document.body.setAttribute('data-mood-3d', mood);
  };

  return (
    <div 
      ref={containerRef}
      className={`mood-3d-container ${currentMood ? `mood-3d-${currentMood}` : ''}`}
    />
  );
};

export default Mood3DEffect;