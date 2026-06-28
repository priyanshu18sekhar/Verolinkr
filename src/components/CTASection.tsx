"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="border-t border-white/10 py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="lp-eyebrow">Free to start</span>
          <h2 className="lp-giant lp-chrome mx-auto mt-6 max-w-5xl" style={{ fontSize: "clamp(2.6rem,8vw,7rem)" }}>
            Your reach is real.
            <br />
            Your income should be too.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg lp-muted">
            Join VeroLinkr, verify your platforms, and get paid for the audience
            you actually have.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/auth?role=creator" className="lp-btn premium-glow-button">
              Start as creator <span aria-hidden>→</span>
            </Link>
            <Link href="/auth?role=brand" className="lp-btn lp-btn-ghost">
              Start as brand
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm lp-faint">
            <span>No setup fees</span>
            <span aria-hidden>•</span>
            <span>Escrow-protected</span>
            <span aria-hidden>•</span>
            <span>Withdraw anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
