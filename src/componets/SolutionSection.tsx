"use client";

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const SolutionSection = () => {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: false, margin: '-150px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Section-level subtle parallax
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);

  // Card parallax
  const card1Y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const solutions = [
    {
      title: "Verified CPV",
      content: "Transparent cost-per-view metrics with verified engagement data to ensure authentic results.",
      stat: "99% Data Accuracy",
    },
    {
      title: "Secure Escrow",
      content: "Robust payment protection ensures funds are released only when deliverables are met.",
      stat: "100% Payment Security",
    },
    {
      title: "AI-Driven Vetting",
      content: "Advanced algorithms match brands with creators for perfect audience alignment.",
      stat: "95% Match Success",
    }
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex items-center px-6 py-40 bg-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      style={{
        opacity: sectionOpacity,
        scale: sectionScale,
      }}
      transition={{ duration: 1.8, ease: 'easeOut' }}
    >
      {/* Subtle background lines for luxury depth */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          y: useTransform(scrollYProgress, [0, 1], [0, -50]),
        }}
      />

      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.h2
          className="text-6xl md:text-8xl font-extrabold text-center mb-28 text-black tracking-tight uppercase"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, type: 'spring', stiffness: 90 }}
        >
          Our Solution
          <motion.div
            className="w-32 h-1 bg-black mx-auto mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          />
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg relative"
              style={{ y: index === 0 ? card1Y : index === 1 ? card2Y : card3Y }}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              {/* Animated border accent */}
              <motion.div
                className="absolute top-0 left-0 h-1 w-16 bg-black"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
              />

              <motion.h3
                className="text-3xl md:text-4xl font-bold mb-6 text-black uppercase"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.25 }}
              >
                {solution.title}
              </motion.h3>

              <motion.p
                className="text-lg font-light leading-relaxed text-black mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
              >
                {solution.content}
              </motion.p>

              <motion.div
                className="text-sm font-medium text-gray-600 uppercase"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.35, type: 'spring' }}
              >
                {solution.stat}
              </motion.div>

              {/* Subtle scroll-driven progress bar */}
              <motion.div
                className="w-full h-1 bg-gray-100 rounded-full mt-4 overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.4 }}
              >
                <motion.div
                  className="h-full bg-black"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${80 + index * 5}%` }}
                  transition={{ duration: 1, delay: index * 0.45, ease: 'easeOut' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SolutionSection;