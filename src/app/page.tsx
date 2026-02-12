'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import TrustedBrands from '../components/TrustedBrands';
import PhoneDemo from '../components/PhoneDemo';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import StatsSection from '../components/StatsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import SectionDivider from '../components/SectionDivider';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased overflow-x-hidden">
      {/* Hero Section */}
      <Hero mousePosition={mousePosition} />

      {/* Trusted Brands */}
      <TrustedBrands />
      <SectionDivider type="wave" />

      {/* Phone Demo Section */}
      <PhoneDemo />
      <SectionDivider type="zigzag" />

      {/* Problem Section */}
      <ProblemSection />
      <SectionDivider type="grid" />

      {/* Solution Section */}
      <SolutionSection />
      <SectionDivider type="dots" />

      {/* Stats Section */}
      <StatsSection />
      <SectionDivider type="wave" />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
