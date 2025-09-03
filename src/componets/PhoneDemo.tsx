"use client";

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const PhoneDemo = () => {
  const sectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sectionInView = useInView(sectionRef, { once: false, margin: '-200px' });

  // Scroll setup
  const scrollTarget = sectionRef.current ? sectionRef : undefined;
  if (typeof window !== 'undefined') {
    console.debug('[PhoneDemo] sectionRef.current ->', sectionRef.current, 'scrollTarget ->', !!scrollTarget);
  }
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ['start end', 'end start'],
  });

  // Section-level 3D parallax
  const sectionRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  // Phone animations
  const phoneY = useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, -200]);
  const phoneRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]);
  const phoneRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 15]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  // Content switch based on scroll
  const contentIndex = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 0, 1, 2]);
  const getCurrentContent = () => {
    const index = Math.floor(contentIndex.get());
    return phoneScreens[index];
  };

  // Progress bars tied to scroll
  const progress1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const progress2 = useTransform(scrollYProgress, [0, 1], [0, 95]);
  const progress3 = useTransform(scrollYProgress, [0, 1], [0, 70]);

  // Cinema reel particles
  const reelRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const reelScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);

  const phoneScreens = [
    {
      title: "Brand Dashboard",
      content: ["Active Campaigns: 24", "Total Reach: 2.4M", "Engagement: 8.5%", "ROI: 340%"],
    },
    {
      title: "Creator Profile",
      content: ["Followers: 150K", "Engagement: 12.3%", "Niche: Lifestyle", "Rating: 4.9/5"],
    },
    {
      title: "Campaign Analytics",
      content: ["Views: 1.2M", "Clicks: 96K", "Conversions: 12K", "Revenue: $45K"],
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center px-6 py-40 bg-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        perspective: '6000px',
        rotateX: sectionRotateX,
        scale: sectionScale,
        opacity: sectionOpacity,
        transformStyle: 'preserve-3d',
      }}
      transition={{ duration: 2.2, ease: 'easeOut' }}
    >
      {/* Subtle background lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          y: useTransform(scrollYProgress, [0, 1], [0, -60]),
        }}
      />

      {/* Cinema reel particles orbiting phone */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          rotate: reelRotate,
          scale: reelScale,
          transformStyle: 'preserve-3d',
        }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-5 h-5 rounded-full bg-black/30"
            style={{
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              transform: `rotate(${i * 36}deg) translate(${60 + Math.sin(i * 0.5) * 30}px, ${Math.cos(i * 0.5) * 150}px) rotate(-${i * 36}deg)`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.9, 0.3],
              rotateX: [0, 180],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <motion.h2
        className="text-6xl md:text-8xl font-extrabold text-center mb-24 text-black tracking-tight uppercase"
        initial={{ opacity: 0, y: 120, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, type: 'spring', stiffness: 90 }}
        style={{
          y: useTransform(scrollYProgress, [0, 1], [50, -50]),
          transformStyle: 'preserve-3d',
        }}
      >
        Experience the Platform
        <motion.div
          className="w-32 h-1 bg-black mx-auto mt-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        />
      </motion.h2>

      {/* Enhanced 3D Phone */}
      <motion.div
        className="relative mx-auto"
        style={{
          y: phoneY,
          rotateX: phoneRotateX,
          rotateY: phoneRotateY,
          scale: phoneScale,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Phone Body */}
        <motion.div
          className="relative w-80 h-[640px] bg-black rounded-[60px] p-4 shadow-2xl"
          style={{
            boxShadow: useTransform(scrollYProgress, [0, 0.5, 1], [
              '0 20px 50px -10px rgba(0,0,0,0.3)',
              '0 80px 150px -30px rgba(0,0,0,0.6)',
              '0 20px 50px -10px rgba(0,0,0,0.3)',
            ]),
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Screen */}
          <div className="w-full h-full bg-white rounded-[50px] overflow-hidden relative">
            {/* Notch */}
            <motion.div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-black rounded-full z-10"
              style={{
                scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]),
              }}
            />

            {/* Screen Content */}
            <motion.div
              className="pt-14 px-8 h-full overflow-hidden"
              style={{
                y: useTransform(scrollYProgress, [0, 1], [30, -30]),
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.h3
                className="text-2xl font-extrabold mb-8 text-center text-black uppercase"
                style={{
                  y: useTransform(scrollYProgress, [0, 1], [15, -15]),
                  rotateX: useTransform(scrollYProgress, [0, 1], [8, -8]),
                }}
              >
                {getCurrentContent().title}
              </motion.h3>

              <div className="space-y-6">
                {getCurrentContent().content.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-100 p-4 rounded-2xl shadow-sm"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    style={{
                      scale: useTransform(scrollYProgress, [0, 1], [0.9, 1.1]),
                      rotateY: useTransform(scrollYProgress, [0, 1], [-3 + index, 3 - index]),
                    }}
                  >
                    <p className="font-medium text-lg text-black">{item}</p>
                  </motion.div>
                ))}
              </div>

              {/* Progress Bars */}
              <div className="absolute bottom-24 left-8 right-8">
                <div className="space-y-4">
                  {[progress1, progress2, progress3].map((progress, index) => (
                    <motion.div key={index} className="relative">
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-black rounded-full"
                          style={{ width: progress }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Screen Reflection */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-20 pointer-events-none"
              style={{
                backgroundPosition: useTransform(scrollYProgress, [0, 1], ['0% 0%', '100% 100%']),
              }}
            />
          </div>

          {/* 3D Bezel */}
          <motion.div
            className="absolute inset-0 rounded-[60px] border-4 border-gray-800/30"
            style={{
              z: useTransform(scrollYProgress, [0, 1], [10, 20]),
            }}
          />
        </motion.div>
      </motion.div>

      <motion.p
        className="text-xl font-light text-center max-w-3xl mt-24 text-black leading-relaxed"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
          y: useTransform(scrollYProgress, [0, 1], [40, -40]),
        }}
      >
        Real-time analytics, secure payments, and AI-powered matching at your fingertips
      </motion.p>
    </motion.section>
  );
};

export default PhoneDemo;