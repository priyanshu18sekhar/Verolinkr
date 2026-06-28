"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// WebGL backdrop is client-only.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const Hero = () => {
  return (
    <section className="vl-section relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 3D element */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Brand name — nothing else */}
      <motion.h1
        className="vl-display relative z-10 select-none text-center text-[clamp(3rem,13vw,12rem)] leading-none text-[var(--vl-ink)]"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        VeroLinkr
      </motion.h1>
    </section>
  );
};

export default Hero;
