"use client";

import { motion } from 'framer-motion';
import React from 'react';

export default function Button3D({ children, primary = false, className = "" }: { children: React.ReactNode; primary?: boolean; className?: string }) {
  return (
    <motion.button
      className={`
        relative px-12 py-5 text-lg font-bold transition-all duration-500 overflow-hidden
        transform-gpu perspective-1000
        ${primary 
          ? 'bg-black text-white shadow-2xl' 
          : 'border-3 border-black text-black bg-white shadow-xl'
        }
        ${className}
      `}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5, 
        rotateX: 5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      whileTap={{ 
        scale: 0.95, 
        rotateY: -5, 
        rotateX: -5 
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        whileHover={{ 
          opacity: 0.2,
          x: ['-100%', '100%']
        }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10 block">{children}</span>
      
      <motion.div
        className={`absolute inset-0 ${primary ? 'bg-gray-800' : 'bg-gray-100'}`}
        style={{
          transform: 'translateZ(-4px)',
          zIndex: -1
        }}
      />
    </motion.button>
  );
}
