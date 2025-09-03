"use client";

import { motion } from 'framer-motion';
import React from 'react';

export default function FloatingCard({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05],
      transition: {
        scale: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 1,
          ease: "easeInOut" as const
        }
      }
    }
  };

  return (
    <motion.div
      className={`bg-white/10 backdrop-blur-sm border border-black/10 rounded-3xl p-8 ${className}`}
      initial={{ opacity: 0, y: 100, rotateX: 45 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ 
        y: -10, 
        rotateX: 5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        scale: 1.02
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}
