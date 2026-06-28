"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// WebGL liquid-metal background is client-only.
const LiquidMetal = dynamic(() => import("./LiquidMetal"), { ssr: false });

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060608]">
      {/* full-screen liquid metal */}
      <div className="absolute inset-0 z-0">
        <LiquidMetal />
      </div>

      {/* soft scrim so the wordmark stays legible over bright metal */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse at center, rgba(6,6,8,0.55) 0%, rgba(6,6,8,0.15) 45%, transparent 70%)" }}
      />

      {/* brand name — nothing else */}
      <motion.h1
        className="lp-giant lp-chrome relative z-10 select-none px-4 text-center"
        initial={{ opacity: 0, y: 28, scale: 0.97, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        VeroLinkr
      </motion.h1>

      {/* minimal scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          className="h-10 w-[1px] bg-gradient-to-b from-white/60 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
