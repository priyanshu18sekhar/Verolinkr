"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="vl-section py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] px-8 py-16 text-center md:px-16 md:py-24"
          style={{ background: "var(--vl-ink)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* aurora wash */}
          <div
            className="vl-blob"
            style={{ width: 600, height: 600, top: -200, left: "50%", transform: "translateX(-50%)", background: "rgba(79,43,255,0.45)", opacity: 0.5 }}
          />
          <div
            className="vl-blob"
            style={{ width: 380, height: 380, bottom: -160, right: -60, background: "rgba(255,84,54,0.4)", opacity: 0.45 }}
          />

          <div className="relative z-10">
            <span className="vl-tag mx-auto" style={{ background: "rgba(255,255,255,0.1)", color: "#d6fbef" }}>
              <span className="vl-seal" style={{ width: "1rem", height: "1rem" }}>
                <svg viewBox="0 0 20 20" fill="none" className="h-2 w-2" aria-hidden>
                  <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Free to start
            </span>

            <h2 className="vl-display mx-auto mt-6 max-w-3xl text-4xl text-white md:text-6xl">
              Your reach is real. Your income should be too.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
              Join VeroLinkr, verify your platforms, and get paid for the audience
              you actually have.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/auth?role=creator"
                className="vl-btn"
                style={{ background: "#fff", color: "var(--vl-ink)" }}
              >
                Start as creator <span aria-hidden>→</span>
              </Link>
              <Link
                href="/auth?role=brand"
                className="vl-btn"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                Start as brand
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/55">
              <span>No setup fees</span>
              <span aria-hidden>•</span>
              <span>Escrow-protected</span>
              <span aria-hidden>•</span>
              <span>Withdraw anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
