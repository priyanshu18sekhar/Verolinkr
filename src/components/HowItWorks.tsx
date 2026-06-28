"use client";

import { motion } from "framer-motion";

// A real, ordered process — numbering is earned here.
const steps = [
  {
    n: "01",
    title: "Connect & verify",
    body: "Link Instagram, YouTube and Facebook. We pull real audience and engagement data straight from the source — and seal it as verified.",
  },
  {
    n: "02",
    title: "Get matched",
    body: "Brands find you by your verified reach, niche and authentic engagement. Accept the campaigns that fit, skip the ones that don't.",
  },
  {
    n: "03",
    title: "Get paid per proof",
    body: "Post, and earn for every genuine view. Funds sit in escrow until the work is verified, then land in your bank — no chasing invoices.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="lp-eyebrow">How it works</span>
          <h2 className="lp-h2 mt-5 text-white">
            From handle to bank account, in three honest steps.
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className="group relative bg-[#060608] p-9 transition-colors hover:bg-white/[0.04]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <span className="vl-display block text-6xl text-white/15">{s.n}</span>
              <h3 className="vl-display mt-5 text-3xl text-white">{s.title}</h3>
              <p className="mt-3 lp-muted">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
