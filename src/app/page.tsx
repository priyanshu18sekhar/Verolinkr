'use client';

import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import TrustedBrands from '../componets/TrustedBrands';
import PhoneDemo from '../componets/PhoneDemo';
import Button3D from '../componets/ui/Button3D';
import FloatingCard from '../componets/ui/FloatingCard';
import Hero from '../componets/Hero';
import ProblemSection from '../componets/ProblemSection';
import SolutionSection from '../componets/SolutionSection';
import StatsSection from '../componets/StatsSection';
import CTASection from '../componets/CTASection';
import Footer from '../componets/Footer';
export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const logoSectionRef = useRef(null);

  // Set mounted state on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Create main scroll observer
  const { scrollYProgress: mainScrollProgress } = useScroll();
  const mainScrollMotion = useMotionValue(0);

  // Create phone scroll observer
  // Only pass phoneRef when the DOM node exists to avoid framer-motion invariant
  const phoneScrollTarget = phoneRef.current ? phoneRef : undefined;
  const { scrollYProgress: phoneScrollProgress } = useScroll({
    target: phoneScrollTarget,
    offset: ["start end", "end start"]
  });
  const phoneScrollMotion = useMotionValue(0);

  const logoSectionInView = useInView(logoSectionRef, { once: false });

  // Set up scroll value synchronization
  useEffect(() => {
    if (!mounted) return;

    const unsubscribeMain = mainScrollProgress.onChange(v => {
      mainScrollMotion.set(v);
    });

    const unsubscribePhone = phoneScrollProgress.onChange(v => {
      phoneScrollMotion.set(v);
    });

    return () => {
      unsubscribeMain();
      unsubscribePhone();
    };
  }, [mounted, mainScrollProgress, phoneScrollProgress]);

  // Smooth scroll-based transforms
  const y1 = useTransform(mainScrollMotion, [0, 1], [0, -500]);
  const y2 = useTransform(mainScrollMotion, [0, 1], [0, -800]);
  const rotate = useTransform(mainScrollMotion, [0, 1], [0, 360]);
  const scale = useTransform(mainScrollMotion, [0, 0.5, 1], [1, 1.2, 0.8]);
  
  // New reel rotation based on scroll
const reelScale = useTransform(mainScrollMotion, [0, 0.5, 1], [0.8, 1.2, 0.9]);
const reelRotation = useTransform(mainScrollMotion, [0, 1], [0, 360]);
  
  const phoneY = useTransform(phoneScrollMotion, [0, 0.5, 1], [100, 0, -100]);
  const phoneRotateX = useTransform(phoneScrollMotion, [0, 0.5, 1], [15, 0, -15]);
  const phoneScale = useTransform(phoneScrollMotion, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]);

  // Spring animations
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const smoothY1 = useSpring(y1, springConfig);
  const smoothY2 = useSpring(y2, springConfig);
  const smoothRotate = useSpring(rotate, springConfig);
  const smoothReelRotation = useSpring(reelRotation, springConfig);
  const smoothReelScale = useSpring(reelScale, springConfig);


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Only render on client side to prevent hydration issues
  if (!mounted) return null;

  const fadeInUp = {
    initial: { opacity: 0, y: 100, rotateX: 20 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Define animation variants
  const floatingVariants = {
    float: {
      y: [0, -20],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 1.5,
          ease: "easeInOut" as const
        }
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05],
      transition: {
        scale: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 1,
          ease: "easeInOut" as const
        }
      }
    }
  };



  const Phone3D = () => {
    const [phoneContent, setPhoneContent] = useState(0);
    const phoneContentRef = useRef(null);

    const phoneScreens = [
      {
        title: "Brand Dashboard",
        content: ["Active Campaigns: 24", "Total Reach: 2.4M", "Engagement Rate: 8.5%", "ROI: 340%"]
      },
      {
        title: "Creator Profile",
        content: ["Followers: 150K", "Engagement: 12.3%", "Niche: Lifestyle", "Rating: 4.9/5"]
      },
      {
        title: "Campaign Analytics",
        content: ["Views: 1.2M", "Clicks: 96K", "Conversions: 12K", "Revenue: $45K"]
      }
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setPhoneContent((prev) => (prev + 1) % phoneScreens.length);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    return (
      <motion.div
        ref={phoneRef}
        className="relative mx-auto"
        style={{
          y: phoneY,
          rotateX: phoneRotateX,
          scale: phoneScale,
          transformStyle: 'preserve-3d'
        }}
        variants={floatingVariants}
        animate="float"
      >
        {/* Phone Body */}
        
      </motion.div>
    );
  };

  // ...use ui components Button3D and FloatingCard imported above

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black font-sans antialiased overflow-x-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, rgba(0,0,0,0.02) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating geometric shapes */}
      <motion.div
        className="fixed top-20 right-20 w-32 h-32 border-2 border-black/10 rounded-full pointer-events-none z-10"
        style={{ y: smoothY1, rotate: smoothRotate }}
        variants={pulseVariants}
        animate="pulse"
      />
      <motion.div
        className="fixed bottom-40 left-20 w-24 h-24 border-2 border-black/10 pointer-events-none z-10"
        style={{ y: smoothY2, rotate: smoothRotate }}
        variants={floatingVariants}
        animate="float"
      />

  {/* Hero Section */}
  <Hero mousePosition={mousePosition} reelRotation={smoothReelRotation} reelScale={smoothReelScale} />

      {/* Animated Brand Logos Section */}
      <TrustedBrands />

      {/* 3D Phone Demo Section */}
      <PhoneDemo />

  {/* Problem Section */}
  <ProblemSection pulseVariants={pulseVariants} />

  {/* Solution Section */}
  <SolutionSection fadeInUp={fadeInUp} />

  {/* Stats Section */}
  <StatsSection fadeInUp={fadeInUp} />

  {/* CTA Section */}
  <CTASection fadeInUp={fadeInUp} />

  {/* Footer */}
  <Footer staggerContainer={staggerContainer} />

      {/* Cursor follower */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-black/10 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x -16,
          y: mousePosition.y -16,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />

      {/* Parallax background elements */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(0,0,0,0.03) 0%, transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(0,0,0,0.02) 0%, transparent 30%),
            radial-gradient(circle at 40% 80%, rgba(0,0,0,0.01) 0%, transparent 30%)
          `,
          y: smoothY1
        }}
      />
    </div>
  );
}