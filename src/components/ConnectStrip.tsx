"use client";

import { motion } from "framer-motion";

const platforms = [
  { name: "Instagram", note: "Reels, Stories & posts" },
  { name: "YouTube", note: "Long-form & Shorts" },
  { name: "Facebook", note: "Pages & Reels" },
];

const brands = [
  "NIKE", "SPOTIFY", "AIRBNB", "NOTION", "DUOLINGO", "CANVA",
  "RED BULL", "GYMSHARK", "HBO", "REVOLUT",
];

export default function ConnectStrip() {
  return (
    <section className="vl-section-mist border-y border-[var(--vl-line)] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* connect once */}
          <div>
            <span className="vl-eyebrow">Connect once</span>
            <h2 className="vl-display mt-4 text-3xl text-[var(--vl-ink)] md:text-4xl">
              One link to every platform you earn on.
            </h2>
            <div className="mt-7 space-y-3">
              {platforms.map((p, i) => (
                <motion.div
                  key={p.name}
                  className="vl-card flex items-center justify-between px-4 py-3"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div>
                    <p className="font-semibold text-[var(--vl-ink)]">{p.name}</p>
                    <p className="text-sm text-[var(--vl-muted)]">{p.note}</p>
                  </div>
                  <span className="vl-tag">Connect</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* brand marquee */}
          <div className="lg:pl-6">
            <p className="vl-mono mb-6 text-xs uppercase tracking-[0.2em] text-[var(--vl-muted)]">
              Brands paying for verified reach
            </p>
            <div className="vl-marquee-pause relative overflow-hidden">
              {/* edge fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--vl-mist)] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--vl-mist)] to-transparent" />
              <div className="vl-marquee gap-12 py-2">
                {[...brands, ...brands].map((b, i) => (
                  <span
                    key={`${b}-${i}`}
                    className="vl-display shrink-0 text-2xl text-[var(--vl-ink)]/30 transition-colors hover:text-[var(--vl-ink)]"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div className="vl-marquee vl-marquee-rev mt-4 gap-12 py-2">
                {[...brands.slice().reverse(), ...brands.slice().reverse()].map((b, i) => (
                  <span
                    key={`${b}-rev-${i}`}
                    className="vl-display shrink-0 text-2xl text-[var(--vl-ink)]/20 transition-colors hover:text-[var(--vl-ink)]"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
