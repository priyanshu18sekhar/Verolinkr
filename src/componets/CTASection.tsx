"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const CTASection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Pop animation for heading
  const headingScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 1.2]);
  const headingY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Button animations
  const buttonsY = useTransform(scrollYProgress, [0, 1], [150, -100]);
  const buttonsOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="min-h-screen py-40 bg-white flex items-center relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0]),
        }}
      >
        {/* Burst lines */}
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * 360;
          const distance = 200;
          
          return (
            <motion.div
              key={i}
              className="absolute border border-gray-300"
              style={{
                width: '60px',
                height: '60px',
                left: '50%',
                top: '50%',
                rotate: angle,
                x: Math.cos(angle * Math.PI / 180) * distance,
                y: Math.sin(angle * Math.PI / 180) * distance,
                opacity: useTransform(scrollYProgress, [0, 1], [0, 0.3]),
              }}
            />
          );
        })}

        {/* Pulsing circles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-gray-200 rounded-full"
            style={{
              width: 100 + i * 100,
              height: 100 + i * 100,
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              opacity: useTransform(scrollYProgress, [0, 1], [0, 0.2]),
            }}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Floating diamonds */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-gray-300"
            style={{
              width: '20px',
              height: '20px',
              left: `${(i * 8) % 100}%`,
              top: `${Math.sin(i) * 30 + 50}%`,
              rotate: 45,
              opacity: useTransform(scrollYProgress, [0, 1], [0, 0.3]),
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [45, 225, 45],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        {/* Ultra large pop heading */}
        <motion.div
          style={{
            scale: headingScale,
            y: headingY,
            opacity: headingOpacity,
          }}
        >
          <motion.h2
            className="text-[80px] md:text-[120px] lg:text-[160px] font-black mb-16 text-black leading-none tracking-tighter"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Ready to Transform
            <br />
            Your Partnerships?
          </motion.h2>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          style={{
            y: buttonsY,
            opacity: buttonsOpacity,
          }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <Link href="/auth">
            <motion.button
              className="px-16 py-6 bg-black text-white rounded-full text-2xl font-black hover:bg-gray-800 transition-all duration-200 shadow-xl hover:shadow-2xl relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Join VeroLinkr Today</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center items-center gap-8 text-sm text-gray-500 flex-wrap"
        >
          <span className="text-lg">✓ Start Free</span>
          <span className="text-2xl">•</span>
          <span className="text-lg">✓ No Setup Fees</span>
          <span className="text-2xl">•</span>
          <span className="text-lg">✓ Secure Payments</span>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
