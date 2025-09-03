"use client";

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: false, margin: '-150px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Section-level parallax
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  const sectionRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);

  // Heading and button parallax
  const headingY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const buttonY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // DNA-like cinema reel animation parameters
  const reelRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const reelScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const reelOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  // Button component
  const HeroButton = ({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) => (
    <motion.button
      className={`px-12 py-6 text-lg font-extrabold uppercase tracking-wide rounded-full shadow-2xl ${
        primary ? 'bg-black text-white' : 'bg-white text-black border-2 border-black'
      }`}
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, type: 'spring', stiffness: 120 }}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 15px 30px -5px rgba(0,0,0,0.3)',
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      style={{ y: buttonY }}
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
        whileHover={{ opacity: 1, x: ['-100%', '100%'] }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center px-6 text-center relative z-20 bg-white overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      style={{
        opacity: sectionOpacity,
        scale: sectionScale,
        rotateX: sectionRotateX,
        transformStyle: 'preserve-3d',
      }}
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      {/* Subtle background lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          y: useTransform(scrollYProgress, [0, 1], [0, -80]),
        }}
      />

      {/* DNA-like cinema reel animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          rotate: reelRotate,
          scale: reelScale,
          opacity: reelOpacity,
          transformStyle: 'preserve-3d',
        }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 rounded-full bg-black/20"
            style={{
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              transform: `rotate(${i * 30}deg) translate(${50 + Math.sin(i * 0.5) * 20}px, ${Math.cos(i * 0.5) * 100}px) rotate(-${i * 30}deg)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.8, 0.3],
              rotateX: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <motion.h1
        className="text-7xl md:text-9xl lg:text-[14rem] font-extrabold tracking-tight leading-none mb-12 text-black uppercase relative z-10"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, type: 'spring', stiffness: 100 }}
        style={{ y: headingY, transformStyle: 'preserve-3d' }}
      >
        <span className="inline-block relative">
          Vero
          <motion.div
            className="absolute -bottom-3 left-0 w-full h-1.5 bg-black"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          />
        </span>
        <motion.span
          className="inline-block"
          animate={{ scale: [1, 1.05, 1], rotateY: [0, 5, 0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          Linkr
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-2xl md:text-3xl font-light text-gray-600 max-w-4xl mb-16 leading-relaxed"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
      >
        The ultimate platform uniting verified brands with authentic creators
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <HeroButton primary>I'm a Brand</HeroButton>
        <HeroButton>I'm a Creator</HeroButton>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <div className="w-8 h-12 border-2 border-black rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-4 bg-black rounded-full mt-2"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;