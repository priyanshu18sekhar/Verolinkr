"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const StatsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const [countedStats, setCountedStats] = useState({
    creators: 0,
    brands: 0,
    success: 0,
    processed: 0,
  });

  const stats = [
    { number: 100, suffix: '+', label: "Active Creators", key: 'creators' },
    { number: 5, suffix: '+', label: "Brand Partners", key: 'brands' },
    { number: 98, suffix: '%', label: "Success Rate", key: 'success' },
    { number: 1, suffix: 'M+', label: "Processed", key: 'processed' },
  ];

  // Parallax effects
  const sectionY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Counter animation trigger
  const shouldAnimate = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  useEffect(() => {
    const unsubscribe = shouldAnimate.on('change', (value) => {
      if (value > 0.5) {
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        const timers = stats.map((stat) => {
          const maxValue = stat.number;
          let currentStep = 0;

          return setInterval(() => {
            currentStep++;
            if (currentStep > steps) return;
            const progress = currentStep / steps;
            const currentValue = Math.floor(maxValue * progress);

            setCountedStats(prev => ({
              ...prev,
              [stat.key]: currentValue
            }));
          }, interval);
        });

        return () => timers.forEach(timer => clearInterval(timer));
      }
    });
    return unsubscribe;
  }, []);

  return (
    <section ref={containerRef} className="py-40 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.2, 0]),
        }}
      >
        {/* Grid pattern */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-gray-200"
            style={{
              width: '50px',
              height: '50px',
              left: `${(i % 5) * 25}%`,
              top: `${Math.floor(i / 5) * 20}%`,
              rotate: useTransform(scrollYProgress, [0, 1], [0, 90]),
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.15, 0]),
            }}
          />
        ))}

        {/* Numbers pattern */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl font-black text-gray-100"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(Math.sin(i) * 25 + 50)}%`,
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0]),
              rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
            }}
          >
            {i + 1}
          </motion.div>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          style={{
            y: sectionY,
            opacity: sectionOpacity,
            scale,
          }}
        >
          {/* Heading */}
          <motion.div
            className="text-center mb-32"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl md:text-8xl font-black mb-8 text-black tracking-tighter">
              Our Impact
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="text-7xl md:text-9xl font-black mb-6 text-black"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2, type: 'spring', stiffness: 200 }}
                >
                  {countedStats[stat.key as keyof typeof countedStats].toLocaleString()}{stat.suffix}
                </motion.div>
                <p className="text-xl font-regular text-gray-600 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
