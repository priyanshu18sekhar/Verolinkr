"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const creator = {
  eyebrow: "For creators",
  title: "Turn real reach into real income.",
  points: [
    "Get discovered for your authentic audience, not a follower count",
    "Earn per verified view — paid in your currency, on time",
    "Escrow protection so you never work for free",
    "One dashboard for Instagram, YouTube and Facebook earnings",
  ],
  cta: { label: "Start earning", href: "/auth?role=creator" },
};

const brand = {
  eyebrow: "For brands",
  title: "Pay for proof, not vanity metrics.",
  points: [
    "Match with creators by verified reach and genuine engagement",
    "Cost-per-view pricing with transparent, auditable data",
    "Funds held in escrow, released only on delivery",
    "KYC-checked creators and dispute resolution built in",
  ],
  cta: { label: "Find creators", href: "/auth?role=brand" },
};

function Column({ data }: { data: typeof creator }) {
  return (
    <motion.div
      className="lp-card flex flex-col p-9 lg:p-11"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="lp-eyebrow">{data.eyebrow}</span>
      <h3 className="vl-display mt-5 text-4xl text-white md:text-5xl">{data.title}</h3>
      <ul className="mt-8 flex-1 space-y-4">
        {data.points.map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[#060608]">
              <svg viewBox="0 0 20 20" fill="none" className="h-2.5 w-2.5" aria-hidden>
                <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="lp-muted">{p}</span>
          </li>
        ))}
      </ul>
      <Link href={data.cta.href} className="lp-btn premium-glow-button mt-9 self-start">
        {data.cta.label} <span aria-hidden>→</span>
      </Link>
    </motion.div>
  );
}

export default function DualValue() {
  return (
    <section className="border-t border-white/10 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <span className="lp-eyebrow">Two sides, one source of truth</span>
          <h2 className="lp-h2 lp-chrome mt-5">
            Built for the people who make it, and the brands who back it.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Column data={creator} />
          <Column data={brand} />
        </div>
      </div>
    </section>
  );
}
