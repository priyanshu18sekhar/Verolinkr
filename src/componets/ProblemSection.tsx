"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ProblemSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Parallax effects
  const sectionY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const brandsProblems = [
    {
      text: "Struggling to find creators who truly align with your brand's vision.",
      detail: "Over 70% of brands face challenges verifying creator authenticity."
    },
    {
      text: "Fake followers and metrics obscure genuine campaign impact.",
      detail: "Up to 25% of social media followers are inauthentic, skewing results."
    },
    {
      text: "Disputes over payments and deliverables drain resources.",
      detail: "Brands lose 15% of budgets to unresolved partnership issues."
    }
  ];

  const creatorsProblems = [
    {
      text: "Delayed or unfair payments disrupt your creative flow.",
      detail: "Creators wait an average of 45 days for payments."
    },
    {
      text: "Finding credible brand partnerships is time-consuming.",
      detail: "Only 30% of outreach leads to valuable collaborations."
    },
    {
      text: "Protecting your work and reputation is a constant battle.",
      detail: "40% of creators face content theft or misuse yearly."
    }
  ];

  return (
    <section ref={containerRef} className="py-40 bg-white relative overflow-hidden">
      {/* Animated background elements with scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0]),
        }}
      >
        {/* Floating geometric shapes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-gray-200"
            style={{
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
              left: `${(i * 7) % 100}%`,
              top: `${Math.sin(i) * 50 + 50}%`,
              rotate: useTransform(scrollYProgress, [0, 1], [i * 30, i * 30 + 360]),
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]),
            }}
          />
        ))}

        {/* Animated lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute bg-gray-200"
            style={{
              width: '120px',
              height: '2px',
              left: `${(i * 12) % 100}%`,
              top: `${(i * 11) % 100}%`,
              rotate: 45 + i * 10,
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.25, 0]),
              y: useTransform(scrollYProgress, [0, 1], [0, -150]),
            }}
          />
        ))}

        {/* Animated dots pattern */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1.5 h-1.5 bg-gray-300 rounded-full"
            style={{
              left: `${(i * 3.3) % 100}%`,
              top: `${(Math.sin(i * 0.5) * 40 + 50)}%`,
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 0]),
              scale: useTransform(scrollYProgress, [0, 1], [0.5, 1]),
            }}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          style={{
            y: sectionY,
            opacity: sectionOpacity,
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
              The Challenge
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </motion.div>

          {/* Two Column Grid */}
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {/* For Brands */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-4xl md:text-5xl font-black mb-12 text-black">
                For Brands
              </h3>
              <div className="space-y-12">
                {brandsProblems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="border-l-4 border-black pl-8"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ x: 10 }}
                  >
                    <p className="text-2xl font-regular leading-relaxed mb-4 text-black">
                      {item.text}
                    </p>
                    <p className="text-lg text-gray-600">
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* For Creators */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-4xl md:text-5xl font-black mb-12 text-black">
                For Creators
              </h3>
              <div className="space-y-12">
                {creatorsProblems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="border-l-4 border-black pl-8"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ x: -10 }}
                  >
                    <p className="text-2xl font-regular leading-relaxed mb-4 text-black">
                      {item.text}
                    </p>
                    <p className="text-lg text-gray-600">
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
