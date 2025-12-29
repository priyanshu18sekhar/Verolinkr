"use client";
/* eslint-disable react-hooks/rules-of-hooks */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SectionDividerProps {
  type?: 'wave' | 'zigzag' | 'grid' | 'dots';
}

export default function SectionDivider({ type = 'wave' }: SectionDividerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  if (type === 'wave') {
    return (
      <div ref={ref} className="relative h-32 overflow-hidden">
        <motion.svg
          viewBox="0 0 1200 120"
          className="absolute inset-0 w-full h-full"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]) }}
        >
          <motion.path
            d="M0,60 Q300,0 600,60 T1200,60"
            stroke="#000"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10,10"
            animate={{
              pathLength: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </div>
    );
  }

  if (type === 'zigzag') {
    return (
      <div ref={ref} className="relative h-24 overflow-hidden">
        <motion.svg
          viewBox="0 0 1200 100"
          className="absolute inset-0 w-full h-full"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]) }}
        >
          <motion.path
            d="M0,50 L100,20 L200,80 L300,10 L400,90 L500,30 L600,70 L700,20 L800,60 L900,40 L1000,80 L1100,10 L1200,50"
            stroke="#000"
            strokeWidth="3"
            fill="none"
            style={{
              rotate,
            }}
          />
        </motion.svg>
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div ref={ref} className="relative h-32 overflow-hidden">
        <motion.div
          className="grid grid-cols-12 gap-4 h-full"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
          }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="border-t border-black"
              animate={{
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  if (type === 'dots') {
    return (
      <div ref={ref} className="relative h-24 overflow-hidden flex items-center justify-center">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-black rounded-full mx-2"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
            }}
            animate={{
              scale: [1, 1.5, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}

