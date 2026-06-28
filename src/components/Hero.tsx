"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Words, EASE } from "./cinematic/Cine";

const Hero = () => {
  const reduce = useReducedMotion();

  return (
    <section className="cine-act items-center text-center">
      {/* receipt-style timecode eyebrow */}
      <motion.p
        className="cine-eyebrow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Verified reach — receipt #VL·001
      </motion.p>

      <h1 className="cine-giant mt-7 px-4">
        <span className="block">
          <Words text="Get paid for proof," accent={["proof"]} start="load" />
        </span>
        <span className="block">
          <Words text="not promises." accent={["promises"]} start="load" />
        </span>
      </h1>

      <motion.p
        className="cine-mono mt-9 text-xs uppercase tracking-[0.28em] text-[#6b6a7b]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
      >
        Instagram · YouTube · Facebook
      </motion.p>

      {/* scroll cue */}
      {!reduce && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <motion.div
            className="h-12 w-px bg-gradient-to-b from-[#08080c]/50 to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.25, 0.8, 0.25] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
