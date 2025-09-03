"use client";

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const Footer = () => {
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: false, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax for footer
  const footerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const footerY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Social links
  const socialLinks = [
    { name: 'Twitter', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'YouTube', url: '#' },
  ];

  return (
    <motion.footer
      ref={footerRef}
      className="py-24 px-6 bg-white border-t border-gray-100 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        opacity: footerOpacity,
        y: footerY,
      }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {/* Subtle background accent */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          y: useTransform(scrollYProgress, [0, 1], [0, -50]),
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 90 }}
        >
          <motion.h3
            className="text-4xl md:text-5xl font-extrabold text-black uppercase tracking-tight"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1, type: 'spring' }}
          >
            VeroLinkr
            <motion.div
              className="w-20 h-1 bg-black mx-auto mt-3"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            />
          </motion.h3>
          <motion.p
            className="text-lg font-light text-gray-600 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Authentic Partnerships, Verified Results
          </motion.p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="text-sm font-light text-gray-600 mb-6 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            © 2025 VeroLinkr. All rights reserved.
          </motion.div>

          <motion.div
            className="flex space-x-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                className="text-sm font-light text-gray-600 uppercase tracking-wide relative"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                whileHover={{
                  color: '#000',
                  y: -3,
                  transition: { duration: 0.3 },
                }}
              >
                {social.name}
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-px bg-black"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Animated accent dots */}
        <motion.div
          className="mt-16 flex justify-center space-x-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-black rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              style={{ y: useTransform(scrollYProgress, [0, 1], [5, -5]) }}
            />
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;