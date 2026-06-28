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

function Column({
  data,
  variant,
}: {
  data: typeof creator;
  variant: "creator" | "brand";
}) {
  const dark = variant === "brand";
  return (
    <motion.div
      className="flex flex-col rounded-3xl p-8 lg:p-10"
      style={
        dark
          ? { background: "var(--vl-ink)", color: "#fff" }
          : { background: "var(--vl-mist)", border: "1px solid var(--vl-line)" }
      }
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span
        className="vl-eyebrow"
        style={dark ? { color: "#a99bff" } : undefined}
      >
        {data.eyebrow}
      </span>
      <h3
        className="vl-display mt-4 text-3xl md:text-4xl"
        style={{ color: dark ? "#fff" : "var(--vl-ink)" }}
      >
        {data.title}
      </h3>
      <ul className="mt-7 flex-1 space-y-4">
        {data.points.map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span
              className="vl-seal mt-0.5 shrink-0"
              style={{ width: "1.25rem", height: "1.25rem" }}
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-2.5 w-2.5" aria-hidden>
                <path
                  d="M4 10.5l4 4 8-9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span style={{ color: dark ? "rgba(255,255,255,0.78)" : "var(--vl-muted)" }}>
              {p}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={data.cta.href}
        className={`vl-btn mt-8 self-start ${dark ? "" : "vl-btn-primary"}`}
        style={dark ? { background: "#fff", color: "var(--vl-ink)" } : undefined}
      >
        {data.cta.label} <span aria-hidden>→</span>
      </Link>
    </motion.div>
  );
}

export default function DualValue() {
  return (
    <section className="vl-section-mist border-t border-[var(--vl-line)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <span className="vl-eyebrow">Two sides, one source of truth</span>
          <h2 className="vl-display mt-4 text-4xl text-[var(--vl-ink)] md:text-5xl">
            Built for the people who make it, and the brands who back it.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Column data={creator} variant="creator" />
          <Column data={brand} variant="brand" />
        </div>
      </div>
    </section>
  );
}
