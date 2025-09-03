"use client";

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const CTASection = () => {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: false, margin: '-150px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Section-level subtle parallax
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);

  // Button and text parallax
  const buttonY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const headingY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Button component (replacing Button3D)
  const CTAButton = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <motion.button
      className={`px-20 py-8 text-2xl font-bold text-white bg-black rounded-full shadow-lg uppercase tracking-wide ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, type: 'spring', stiffness: 100 }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 15px 30px -5px rgba(0,0,0,0.3)',
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      style={{ y: buttonY }}
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        whileHover={{ opacity: 0.2, x: ['-100%', '100%'] }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center px-6 py-40 bg-white text-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      style={{
        opacity: sectionOpacity,
        scale: sectionScale,
      }}
      transition={{ duration: 1.8, ease: 'easeOut' }}
    >
      {/* Subtle background lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          y: useTransform(scrollYProgress, [0, 1], [0, -60]),
        }}
      />

      <motion.h2
        className="text-6xl md:text-8xl lg:text-9xl font-extrabold max-w-6xl leading-tight mb-20 text-black tracking-tight uppercase"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, type: 'spring', stiffness: 90 }}
        style={{ y: headingY }}
      >
        Ready to Transform Your Partnerships?
        <motion.div
          className="w-32 h-1 bg-black mx-auto mt-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        />
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, type: 'spring' }}
      >
        <CTAButton>Join VeroLinkr Today</CTAButton>
      </motion.div>

      {/* Animated accent texts */}
      <motion.div
        className="absolute top-20 left-20 text-sm font-light text-black uppercase tracking-wide"
        style={{ y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        Start Free
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-sm font-light text-black uppercase tracking-wide"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        No Setup Fees
      </motion.div>
    </motion.section>
  );
};

export default CTASection;