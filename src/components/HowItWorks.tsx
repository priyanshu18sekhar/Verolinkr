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
    <section className="vl-section py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="vl-eyebrow">How it works</span>
          <h2 className="vl-display mt-4 text-4xl text-[var(--vl-ink)] md:text-5xl">
            From handle to bank account, in three honest steps.
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--vl-line)] bg-[var(--vl-line)] md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className="group relative bg-[var(--vl-paper)] p-8 transition-colors hover:bg-[var(--vl-mist)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <span className="vl-mono text-sm font-semibold text-[var(--vl-indigo)]">{s.n}</span>
                <span className="vl-proof h-0.5 w-12 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="vl-display mt-5 text-2xl text-[var(--vl-ink)]">{s.title}</h3>
              <p className="mt-3 text-[var(--vl-muted)]">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
