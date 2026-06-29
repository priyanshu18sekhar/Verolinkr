"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal, EASE } from "./cinematic/Cine";
import { AuroraTitle } from "./cinematic/AuroraTitle";

/**
 * Act 02 — Verify. The signature moment: a verification seal that stamps and
 * draws itself when scrolled into view, embodying "proof, sealed."
 */
export default function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="verify" className="cine-act items-center scroll-mt-24 text-center">
      <p className="cine-eyebrow">Step 02 — Verify</p>

      <h2 className="cine-giant mt-6 px-4">
        <AuroraTitle text="Get verified." accent={["verified"]} />
      </h2>

      {/* The seal */}
      <motion.div
        className="relative mt-14 h-56 w-56 sm:h-64 sm:w-64"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.5, rotate: -12 }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {/* aurora glow under the seal */}
        <div
          className="absolute inset-0 -z-10 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(79,43,255,0.28), rgba(0,224,192,0.18) 45%, transparent 70%)",
          }}
        />

        <svg viewBox="0 0 220 220" className="h-full w-full">
          {/* rotating circular caption */}
          <motion.g
            style={{ transformOrigin: "110px 110px" }}
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          >
            <defs>
              <path
                id="seal-ring"
                d="M110,110 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0"
              />
            </defs>
            <text className="cine-mono" fontSize="11" letterSpacing="6" fill="#6b6a7b">
              <textPath href="#seal-ring" startOffset="0%">
                VEROLINKR · VERIFIED REACH · PROOF NOT PROMISES ·
              </textPath>
            </text>
          </motion.g>

          {/* inner ring draws on */}
          <motion.circle
            cx="110"
            cy="110"
            r="64"
            fill="none"
            stroke="#08080c"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
          />

          {/* check draws on */}
          <motion.path
            d="M84 112 l16 16 l34 -38"
            fill="none"
            stroke="#4f2bff"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
          />
        </svg>
      </motion.div>

      <Reveal delay={0.3} className="mt-12 max-w-md px-6">
        <p className="cine-mono text-xs uppercase tracking-[0.22em] text-[#6b6a7b]">
          We seal your real reach — so brands pay for what&apos;s true.
        </p>
      </Reveal>
    </section>
  );
}
