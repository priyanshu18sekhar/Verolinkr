"use client";

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const brandLogos = [
  "APPLE", "NIKE", "GOOGLE", "TESLA", "AIRBNB", "SPOTIFY", "UBER", "NETFLIX",
  "AMAZON", "MICROSOFT", "META", "TIKTOK", "YOUTUBE", "INSTAGRAM", "TWITTER", "LINKEDIN",
  "APPLE", "NIKE", "GOOGLE", "TESLA", "AIRBNB", "SPOTIFY", "UBER", "NETFLIX"
];

const TrustedBrands = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Parallax effects
  const sectionY = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Infinite scroll animation
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-10%', '-110%']);

  return (
    <section 
      ref={containerRef}
      className="py-40 overflow-hidden bg-white relative"
    >
      {/* Heading */}
      <motion.div
        className="text-center mb-24 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-6xl md:text-8xl font-black mb-8 text-black tracking-tighter"
          style={{
            y: sectionY,
            opacity: sectionOpacity,
          }}
        >
          Trusted by Leading Brands
        </motion.h2>
        <div className="w-24 h-1 bg-black mx-auto"></div>
      </motion.div>

      {/* First row - infinite scroll */}
      <div className="overflow-hidden mb-8">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          style={{ x: x1 }}
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }
          }}
        >
          {[...brandLogos, ...brandLogos].map((logo, index) => (
            <motion.div
              key={`first-${index}`}
              className="flex-shrink-0"
              whileHover={{ scale: 1.15, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <BrandLogo logo={logo} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Second row - infinite scroll reverse */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          style={{ x: x2 }}
          animate={{
            x: ['-10%', '-110%'],
          }}
          transition={{
            x: {
              duration: 45,
              repeat: Infinity,
              ease: 'linear',
            }
          }}
        >
          {[...brandLogos.slice().reverse(), ...brandLogos.slice().reverse()].map((logo, index) => (
            <motion.div
              key={`second-${index}`}
              className="flex-shrink-0"
              whileHover={{ scale: 1.15, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <BrandLogo logo={logo} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const BrandLogo = ({ logo, index }) => {
  return (
    <motion.div
      className="text-4xl md:text-5xl font-black text-gray-200 whitespace-nowrap cursor-pointer select-none"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
      whileHover={{ 
        color: '#000',
        textShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      {logo}
    </motion.div>
  );
};

export default TrustedBrands;
