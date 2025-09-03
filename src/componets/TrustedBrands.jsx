"use client";

import { motion, useMotionValue, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const brandLogos = [
  "APPLE", "NIKE", "GOOGLE", "TESLA", "AIRBNB", "SPOTIFY", "UBER", "NETFLIX",
  "AMAZON", "MICROSOFT", "META", "TIKTOK", "YOUTUBE", "INSTAGRAM", "TWITTER", "LINKEDIN"
];

const LogoSection = () => {
  const logoSectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSectionInView = useInView(logoSectionRef, { once: false, margin: '-100px' });

  
  const scrollTarget = logoSectionRef.current ? logoSectionRef : undefined;
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.debug('[TrustedBrands] logoSectionRef.current ->', logoSectionRef.current, 'scrollTarget ->', !!scrollTarget);
  }
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ['start end', 'end start'],
  });
  
  // Enhanced 3D parallax for section
  const sectionRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12]);
  const sectionRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-6, 0, 6]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  // Floating particles animation
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
  }));

  return (
    <motion.section
      ref={logoSectionRef}
      className="py-40 overflow-hidden bg-white relative" // Pure white background, increased padding
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        perspective: '4000px', // Deeper perspective for dramatic 3D
        rotateX: sectionRotateX,
        rotateY: sectionRotateY,
        scale: sectionScale,
        opacity: sectionOpacity,
        transformStyle: 'preserve-3d',
      }}
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-black/10 rounded-full pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: particle.id * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.h2
        className="text-6xl md:text-7xl font-black text-center mb-24 text-black tracking-wider relative" // Larger, more refined typography
        initial={{ opacity: 0, y: 80, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, type: 'spring', stiffness: 90 }}
        whileHover={{
          scale: 1.03,
          textShadow: '0 6px 12px rgba(0,0,0,0.15)',
          transition: { duration: 0.3 },
        }}
      >
        Trusted by Leading Brands
        {/* Subtle underline animation */}
        <motion.div
          className="absolute bottom-0 left-1/2 w-32 h-1 bg-black"
          initial={{ scaleX: 0, x: '-50%' }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
        />
      </motion.h2>

      {/* First row - left to right with enhanced animations */}
      <motion.div
        className="flex gap-20 mb-16" // Wider gap for spacious luxury
        animate={{
          x: logoSectionInView ? ['-70%', '0%'] : '-70%',
        }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        style={{
          rotateY: useTransform(scrollYProgress, [0, 1], [-5, 5]),
          rotateX: useTransform(scrollYProgress, [0, 1], [3, -3]),
          transformStyle: 'preserve-3d',
        }}
      >
        {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, index) => (
          <BrandLogo key={`first-${index}`} logo={logo} index={index} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>

      {/* Second row - right to left with contrasting animations */}
      <motion.div
        className="flex gap-20"
        animate={{
          x: logoSectionInView ? ['0%', '-70%'] : '0%',
        }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          rotateY: useTransform(scrollYProgress, [0, 1], [5, -5]),
          rotateX: useTransform(scrollYProgress, [0, 1], [-3, 3]),
          transformStyle: 'preserve-3d',
        }}
      >
        {[...brandLogos.slice().reverse(), ...brandLogos.slice().reverse(), ...brandLogos.slice().reverse()].map((logo, index) => (
          <BrandLogo key={`second-${index}`} logo={logo} index={index} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>
    </motion.section>
  );
};

const BrandLogo = ({ logo, index, scrollYProgress }) => {
  const ref = useRef(null);
  const rotateY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const scale = useMotionValue(1);
  const z = useMotionValue(0);
  const glowOpacity = useMotionValue(0);

  // Mouse interaction for 3D tilt and glow
  const handlePointerMove = (e) => {
    const element = ref.current;
    if (!element) return;
    
    const { left, top, width, height } = element.getBoundingClientRect();
    const mouseX = (e.clientX - left) / width - 0.5;
    const mouseY = (e.clientY - top) / height - 0.5;
    
    rotateY.set(mouseX * 40); // More pronounced tilt
    rotateX.set(mouseY * -40);
    scale.set(1.2);
    z.set(30);
    glowOpacity.set(0.3);
  };

  const handlePointerLeave = () => {
    rotateY.set(0);
    rotateX.set(0);
    scale.set(1);
    z.set(0);
    glowOpacity.set(0);
  };

  // Scroll-based animations
  const logoOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const logoGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.2, 0]);

  // Letter-by-letter animation
  const letters = logo.split('');

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0 text-3xl md:text-4xl font-black text-gray-400 whitespace-nowrap cursor-pointer select-none relative"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateY,
        rotateX,
        scale,
        z,
        opacity: logoOpacity,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
      animate={{
        z: [0, 20, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: index * 0.25,
        ease: 'easeInOut',
      }}
      whileHover={{
        color: '#000',
        textShadow: '0 8px 16px rgba(0,0,0,0.3)',
        transition: { duration: 0.3 },
      }}
    >
      {letters.map((letter, letterIndex) => (
        <motion.span
          key={`${index}-${letterIndex}`}
          className="inline-block"
          animate={{
            y: [0, -5, 0],
            rotateX: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.25 + letterIndex * 0.1,
            ease: 'easeInOut',
          }}
        >
          {letter}
        </motion.span>
      ))}
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-black/10 rounded-full blur-md pointer-events-none"
        style={{
          opacity: glowOpacity,
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]),
        }}
        animate={{
          opacity: [0, logoGlow, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.3,
        }}
      />
    </motion.div>
  );
};

export default LogoSection;