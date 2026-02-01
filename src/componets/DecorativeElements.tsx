"use client";
/* eslint-disable react-hooks/rules-of-hooks */

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface DecorativeElementsProps {
  section?: 'hero' | 'problem' | 'solution' | 'stats' | 'cta';
}

export default function DecorativeElements({ section = 'hero' }: DecorativeElementsProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const springConfig = { stiffness: 50, damping: 20 };

  // Different decorative sets per section
  if (section === 'hero') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden" ref={containerRef}>
        {/* Floating circles */}
        {[...Array(8)].map((_, i) => {
          const size = 40 + i * 15;
          const x = useTransform(scrollYProgress, [0, 1], [i * 100, i * 100 + 50]);
          const y = useTransform(scrollYProgress, [0, 1], [i * 60, i * 60 - 100]);
          const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
          
          return (
            <motion.div
              key={i}
              className="absolute border-2 border-gray-200 rounded-full"
              style={{
                width: size,
                height: size,
                x,
                y,
                rotate,
                opacity: useTransform(scrollYProgress, [0, 1], [0.3, 0]),
              }}
            />
          );
        })}

        {/* Diagonal lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-gray-200"
            style={{
              left: `${i * 15}%`,
              top: '20%',
              height: '200px',
              rotate: 45,
              opacity: useTransform(scrollYProgress, [0, 1], [0.2, 0]),
              y: useTransform(scrollYProgress, [0, 1], [0, -200]),
            }}
          />
        ))}
      </div>
    );
  }

  if (section === 'problem' || section === 'solution') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden" ref={containerRef}>
        {/* Stacked cards effect */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-gray-300"
            style={{
              width: '120px',
              height: '80px',
              left: `${(i * 15) % 100}%`,
              top: `${(Math.sin(i) * 20 + 40)}%`,
              rotate: useTransform(scrollYProgress, [0, 1], [i * 10, i * 10 + 90]),
              y: useTransform(scrollYProgress, [0, 1], [0, -150]),
              opacity: useTransform(scrollYProgress, [0, 1], [0.15, 0]),
            }}
          >
            {/* Card shadow */}
            <motion.div
              className="absolute inset-0 bg-gray-100"
              style={{
                transform: `translate(${i * 2}px, ${i * 2}px)`,
              }}
            />
          </motion.div>
        ))}

        {/* Animated dots */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gray-300 rounded-full"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(Math.random() * 80 + 10)}%`,
              x: useTransform(scrollYProgress, [0, 1], [0, Math.sin(i) * 100]),
              y: useTransform(scrollYProgress, [0, 1], [0, -100]),
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0]),
            }}
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    );
  }

  if (section === 'stats') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden" ref={containerRef}>
        {/* Grid pattern */}
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-gray-200"
            style={{
              width: '60px',
              height: '60px',
              left: `${(i % 4) * 25}%`,
              top: `${Math.floor(i / 4) * 25}%`,
              rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
              opacity: useTransform(scrollYProgress, [0, 1], [0.1, 0]),
            }}
          />
        ))}

        {/* Floating bars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gray-200"
            style={{
              width: `${10 + i * 5}px`,
              height: '120px',
              left: `${i * 12}%`,
              top: '30%',
              rotate: i % 2 === 0 ? 45 : -45,
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.4, 0]),
              y: useTransform(scrollYProgress, [0, 1], [0, -200]),
            }}
          />
        ))}
      </div>
    );
  }

  if (section === 'cta') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden" ref={containerRef}>
        {/* Burst effect */}
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * 360;
          const distance = useSpring(
            useTransform(scrollYProgress, [0, 1], [100, 300]),
            springConfig
          );
          
          return (
            <motion.div
              key={i}
              className="absolute border-2 border-gray-300"
              style={{
                width: '20px',
                height: '20px',
                left: '50%',
                top: '50%',
                rotate: angle,
                x: useTransform(distance, [100, 300], (d) => Math.cos(angle * Math.PI / 180) * d),
                y: useTransform(distance, [100, 300], (d) => Math.sin(angle * Math.PI / 180) * d),
                opacity: useTransform(scrollYProgress, [0, 1], [0, 0.3]),
              }}
            />
          );
        })}

        {/* Pulsing circles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-gray-200 rounded-full"
            style={{
              width: 100 + i * 80,
              height: 100 + i * 80,
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              opacity: useTransform(scrollYProgress, [0, 1], [0, 0.2]),
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}

