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
    <section className="border-t border-white/10 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="lp-eyebrow">Connect once</span>
            <h2 className="lp-h2 lp-chrome mt-5">One link to every platform you earn on.</h2>
            <div className="mt-9 space-y-3">
              {platforms.map((p, i) => (
                <motion.div
                  key={p.name}
                  className="lp-card flex items-center justify-between px-5 py-4"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div>
                    <p className="text-lg font-semibold text-white">{p.name}</p>
                    <p className="text-sm lp-muted">{p.note}</p>
                  </div>
                  <span className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/80">
                    Connect
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:pl-6">
            <p className="lp-eyebrow mb-7">Brands paying for verified reach</p>
            <div className="vl-marquee-pause relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#060608] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#060608] to-transparent" />
              <div className="vl-marquee gap-12 py-2">
                {[...brands, ...brands].map((b, i) => (
                  <span key={`${b}-${i}`} className="vl-display shrink-0 text-3xl text-white/25 transition-colors hover:text-white">
                    {b}
                  </span>
                ))}
              </div>
              <div className="vl-marquee vl-marquee-rev mt-5 gap-12 py-2">
                {[...brands.slice().reverse(), ...brands.slice().reverse()].map((b, i) => (
                  <span key={`${b}-rev-${i}`} className="vl-display shrink-0 text-3xl text-white/15 transition-colors hover:text-white">
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
