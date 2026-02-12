"use client";
/* eslint-disable react-hooks/rules-of-hooks */

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Button } from '../components/design-system';

interface HeroProps {
  mousePosition?: { x: number; y: number };
}

const Hero = ({ mousePosition }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  
  // Title animations - will track through scroll
  const titleY = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, -400]), springConfig);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5, 0.9, 1], [1, 1, 0.3, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.9, 0.7]);
  
  // Subheading
  const subheadingY = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, -300]), springConfig);
  const subheadingOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  // CTA buttons
  const buttonsY = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, -200]), springConfig);
  const buttonsOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden"
    >
      {/* Subtle gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition?.x || '50%'} ${mousePosition?.y || '50%'}, rgba(37, 99, 235, 0.02), transparent 70%)`,
        }}
      />

      {/* Floating particles */}
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gray-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Animated geometric shapes */}
      {[...Array(12)].map((_, i) => {
        const size = 30 + i * 8;
        const x = useTransform(scrollYProgress, [0, 1], [i * 80, i * 80 + 100]);
        const y = useTransform(scrollYProgress, [0, 1], [i * 50, i * 50 - 80]);
        const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
        
        return (
          <motion.div
            key={i}
            className="absolute border-2 border-gray-200"
            style={{
              width: size,
              height: size,
              x,
              y,
              rotate,
              opacity: useTransform(scrollYProgress, [0, 1], [0.2, 0]),
            }}
          />
        );
      })}

      {/* Floating orbs with different sizes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute border-2 border-gray-200 rounded-full"
          style={{
            width: 40 + i * 15,
            height: 40 + i * 15,
            left: `${(i * 12) % 100}%`,
            top: `${Math.sin(i) * 30 + 50}%`,
            opacity: useTransform(scrollYProgress, [0, 1], [0.15, 0]),
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Main Heading - Larger and more prominent */}
        <motion.div
          style={{
            y: titleY,
            opacity: titleOpacity,
            scale: titleScale,
          }}
          className="mb-16"
        >
          <motion.h1
            className="text-[90px] md:text-[160px] lg:text-[200px] xl:text-[220px] font-black tracking-tighter leading-none text-black"
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0, 
            } : {}}
            transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            {/* Individual letters with stagger */}
            {'VeroLinkr'.split('').map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ 
                  y: 100, 
                  opacity: 0,
                  rotateX: -90 
                }}
                animate={isInView ? { 
                  y: 0, 
                  opacity: 1,
                  rotateX: 0
                } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.04,
                  ease: [0.6, -0.05, 0.01, 0.99]
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        {/* Subheading - Cleaner and more refined */}
        <motion.div
          style={{
            y: subheadingY,
            opacity: subheadingOpacity,
          }}
        >
          <motion.p
            className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-600 max-w-4xl mx-auto mb-20 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            The Premium Platform for
            <br />
            <span className="font-black text-black">Authentic Influencer Marketing</span>
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          style={{
            y: buttonsY,
            opacity: buttonsOpacity,
          }}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center"
        >
          <Link href="/auth">
            <motion.button
              className="px-12 py-5 bg-black text-white rounded-full font-black text-xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Get Started</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Scroll</span>
          <div className="w-8 h-14 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              className="w-2 h-4 bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
