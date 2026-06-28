"use client";

import { motion } from "framer-motion";
import { Reveal, Words, EASE } from "./cinematic/Cine";

const platforms = ["Instagram", "YouTube", "Facebook"];
const brands = ["NIKE", "SPOTIFY", "AIRBNB", "NOTION", "DUOLINGO", "CANVA", "RED BULL", "GYMSHARK", "HBO", "REVOLUT"];

export default function ConnectStrip() {
  return (
    <section id="connect" className="cine-act items-center scroll-mt-24 text-center">
      <p className="cine-eyebrow">Step 01 — Connect</p>

      <h2 className="cine-giant mt-6 px-4">
        <Words text="Connect once." accent={["once"]} />
      </h2>

      <div className="mt-14 flex w-full max-w-5xl flex-col items-center gap-3 px-6 sm:flex-row sm:justify-center sm:gap-10">
        {platforms.map((p, i) => (
          <Reveal key={p} delay={0.15 + i * 0.12} className="flex items-center gap-3">
            <motion.svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-[#4f2bff]"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: EASE }}
            >
              <motion.path
                d="M4 12.5l5 5 11-12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
            <span className="cine-mid !text-[clamp(1.7rem,4vw,3rem)]">{p}</span>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.5} className="mt-12 max-w-md px-6">
        <p className="cine-mono text-xs uppercase tracking-[0.22em] text-[#6b6a7b]">
          One link. Real audience data, pulled from the source.
        </p>
      </Reveal>

      {/* ambient proof — brands paying for verified reach */}
      <div className="vl-marquee-pause relative mt-16 w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
        <div className="vl-marquee gap-14 py-2">
          {[...brands, ...brands].map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="cine-mono shrink-0 text-sm uppercase tracking-[0.2em] text-[#08080c]/20 transition-colors hover:text-[#08080c]"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
