"use client";

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const ProblemSection = () => {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: false, margin: '-150px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Section-level subtle parallax
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.7]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Card subtle parallax
  const card1Y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const brandsProblems = [
    {
      text: "Struggling to find creators who truly align with your brand’s vision.",
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
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex items-center px-6 py-32 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      style={{
        opacity: sectionOpacity,
        scale: sectionScale,
      }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className="text-6xl md:text-8xl font-extrabold text-center mb-24 text-black tracking-tight uppercase"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 100 }}
        >
          The Challenge
          <motion.div
            className="w-24 h-1 bg-black mx-auto mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          />
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <motion.div
            className="bg-white p-10 rounded-2xl shadow-md"
            style={{ y: card1Y }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.h3
              className="text-4xl md:text-5xl font-extrabold mb-8 text-black uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              For Brands
            </motion.h3>
            <div className="space-y-8 text-lg font-light leading-relaxed text-black">
              {brandsProblems.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                >
                  <p className="font-medium">{item.text}</p>
                  <motion.p
                    className="text-base text-gray-600 mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3, duration: 0.5 }}
                  >
                    {item.detail}
                  </motion.p>
                  <motion.div
                    className="absolute -left-4 top-0 h-1 w-12 bg-black"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.4, duration: 0.6 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-10 rounded-2xl shadow-md"
            style={{ y: card2Y }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <motion.h3
              className="text-4xl md:text-5xl font-extrabold mb-8 text-black uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              For Creators
            </motion.h3>
            <div className="space-y-8 text-lg font-light leading-relaxed text-black">
              {creatorsProblems.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                >
                  <p className="font-medium">{item.text}</p>
                  <motion.p
                    className="text-base text-gray-600 mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3, duration: 0.5 }}
                  >
                    {item.detail}
                  </motion.p>
                  <motion.div
                    className="absolute -right-4 top-0 h-1 w-12 bg-black"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.4, duration: 0.6 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProblemSection;