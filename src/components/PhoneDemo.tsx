"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const PhoneDemo = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // 3D rotations and transformations
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          style={{
            rotateY,
            rotateX,
            scale,
            y,
            opacity,
            transformStyle: 'preserve-3d',
          }}
          className="flex justify-center items-center perspective-1000"
        >
          {/* Phone Frame */}
          <div className="relative w-[320px] h-[640px] md:w-[400px] md:h-[800px]">
            <motion.div
              className="w-full h-full bg-black rounded-[3rem] p-2 shadow-2xl relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Screen */}
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />
                
                {/* Screen Content */}
                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white">
                  {/* Simulated content */}
                  <div className="p-6">
                    <div className="h-8 bg-gray-200 rounded-full w-3/4 mb-4" />
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-5/6" />
                      <div className="h-4 bg-gray-200 rounded w-4/6" />
                    </div>
                  </div>
                  
                  {/* Carousel dots */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating highlights */}
            <motion.div
              className="absolute -inset-4 bg-blue-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-5xl md:text-7xl font-black mb-6 text-black">
            Experience the Platform
          </h3>
          <p className="text-xl text-gray-600">
            See VeroLinkr in action across all your devices
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PhoneDemo;
