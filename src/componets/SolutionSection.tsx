"use client";
/* eslint-disable react-hooks/rules-of-hooks */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const SolutionSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

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
    <section ref={containerRef} className="py-40 bg-white relative overflow-hidden">
      {/* Animated background - cinematic elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.2, 0]),
        }}
      >
        {/* Video reels effect */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-gray-300"
            style={{
              width: '60px',
              height: '100px',
              borderRadius: '8px',
              left: `${(i * 12) % 100}%`,
              top: `${Math.cos(i * 0.5) * 30 + 50}%`,
              rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0]),
              y: useTransform(scrollYProgress, [0, 1], [0, -50]),
            }}
          >
            {/* Reel detail */}
            <div className="absolute inset-0 flex flex-col items-center justify-around p-2">
              {[0, 1, 2, 3].map((j) => (
                <div key={j} className="w-full h-0.5 bg-gray-200" />
              ))}
            </div>
          </motion.div>
        ))}

        {/* Floating boxes */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`box-${i}`}
            className="absolute border-2 border-gray-300"
            style={{
              width: '40px',
              height: '40px',
              left: `${(i * 10) % 100}%`,
              top: `${Math.cos(i * 0.8) * 30 + 50}%`,
              rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.25, 0]),
              y: useTransform(scrollYProgress, [0, 1], [0, -100]),
            }}
          />
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
          {/* Section Heading */}
          <motion.div
            className="text-center mb-32"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl md:text-8xl font-black mb-8 text-black tracking-tighter">
              Our Solution
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </motion.div>

          {/* Three Column Grid */}
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                className="border-b-4 border-black pb-8"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <h4 className="text-4xl font-black mb-6 text-black">
                  {solution.title}
                </h4>
                <p className="text-xl font-regular leading-relaxed text-gray-700 mb-8">
                  {solution.content}
                </p>
                <p className="text-sm font-black text-black uppercase tracking-widest">
                  {solution.stat}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
