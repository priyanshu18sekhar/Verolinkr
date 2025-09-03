"use client";

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const StatsSection = () => {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: false, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Section-level subtle parallax
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Individual stat parallax
  const statY = (index: number) =>
    useTransform(scrollYProgress, [0, 1], [30 + index * 10, -30 - index * 10]);

  const stats = [
    { number: "10K+", label: "Active Creators", progress: 85 },
    { number: "500+", label: "Brand Partners", progress: 75 },
    { number: "98%", label: "Success Rate", progress: 98 },
    { number: "$5M+", label: "Processed", progress: 90 },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="py-32 px-6 bg-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      style={{
        opacity: sectionOpacity,
        scale: sectionScale,
      }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {/* Subtle background accent lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          y: useTransform(scrollYProgress, [0, 1], [0, -60]),
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl font-extrabold text-center mb-20 text-black tracking-tight uppercase"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 100 }}
        >
          Our Impact
          <motion.div
            className="w-24 h-1 bg-black mx-auto mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          />
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center relative"
              style={{ y: statY(index) }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2, type: 'spring' }}
            >
              {/* Animated Number */}
              <motion.div
                className="text-5xl md:text-7xl font-extrabold mb-4 text-black"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.25, type: 'spring', stiffness: 120 }}
              >
                {stat.number}
              </motion.div>

              {/* Label */}
              <motion.div
                className="text-lg font-light text-gray-600 uppercase"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
              >
                {stat.label}
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                className="w-24 h-1 bg-gray-100 rounded-full mt-4 mx-auto overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.35 }}
              >
                <motion.div
                  className="h-full bg-black"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stat.progress}%` }}
                  transition={{ duration: 1.2, delay: index * 0.4, ease: 'easeOut' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;