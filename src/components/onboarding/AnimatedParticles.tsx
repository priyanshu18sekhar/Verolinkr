'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  left: number;
  top: number;
  duration: number;
  delay: number;
}

interface AnimatedParticlesProps {
  count?: number;
}

export default function AnimatedParticles({ count = 50 }: AnimatedParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 4,
      });
    }
    
    setParticles(newParticles);
  }, [count]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gray-200 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

