"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// WebGL backdrop is client-only.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

interface HeroProps {
  mousePosition?: { x: number; y: number };
}

/** Smoothly counts a number up to `target` once mounted. */
function useCountUp(target: number, durationMs = 1600) {
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, reduce]);
  return value;
}

const platforms = [
  { id: "ig", label: "Instagram", handle: "@maya.creates", reach: "128K" },
  { id: "yt", label: "YouTube", handle: "Maya Makes", reach: "54K" },
  { id: "fb", label: "Facebook", handle: "Maya Creates", reach: "22K" },
];

const Hero = (_props: HeroProps) => {
  const earnings = useCountUp(4820);
  const views = useCountUp(1240532);

  return (
    <section className="vl-section relative overflow-hidden">
      {/* WebGL ambient backdrop — subtle, monochrome */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-90">
        <HeroCanvas />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-32 lg:pt-28">
        {/* ---- Left: the thesis ---- */}
        <div>
          <motion.span
            className="vl-eyebrow inline-block"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Verified creator marketing
          </motion.span>

          <motion.h1
            className="vl-display mt-6 text-[clamp(2.6rem,6vw,5.2rem)] text-[var(--vl-ink)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            Get paid for <span className="vl-aurora-text">proof</span>,<br />
            not promises.
          </motion.h1>

          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--vl-muted)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Connect Instagram, YouTube and Facebook once. VeroLinkr verifies your
            real reach and pays you for every genuine view — no fake metrics, no
            chasing invoices.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <Link href="/auth?role=creator" className="vl-btn vl-btn-primary premium-glow-button">
              Start earning <span aria-hidden>→</span>
            </Link>
            <Link href="/auth?role=brand" className="vl-btn vl-btn-ghost">
              Find creators
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--vl-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="vl-seal" style={{ width: "1.1rem", height: "1.1rem" }}>
                <CheckIcon className="h-2.5 w-2.5" />
              </span>
              Escrow-protected payouts
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="vl-seal" style={{ width: "1.1rem", height: "1.1rem" }}>
                <CheckIcon className="h-2.5 w-2.5" />
              </span>
              Real engagement, verified
            </span>
          </motion.div>
        </div>

        {/* ---- Right: the signature verification receipt ---- */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="vl-card relative mx-auto max-w-md overflow-hidden p-6 backdrop-blur-sm">
            {/* header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="vl-eyebrow" style={{ fontSize: "0.62rem" }}>
                  Payout verified
                </p>
                <p className="mt-2 vl-display text-2xl text-[var(--vl-ink)]">@maya.creates</p>
              </div>
              <span className="vl-seal">
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* connected platforms */}
            <div className="mt-6 space-y-3">
              {platforms.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-xl border border-[var(--vl-line)] bg-[var(--vl-mist)] px-3.5 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--vl-ink)] text-xs font-bold text-white">
                      {p.label[0]}
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold text-[var(--vl-ink)]">{p.label}</p>
                      <p className="text-xs text-[var(--vl-muted)]">{p.handle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="vl-mono text-sm font-semibold text-[var(--vl-ink)]">{p.reach}</p>
                    <p className="text-[0.65rem] uppercase tracking-wider text-[var(--vl-muted)]">
                      verified
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* proof line connecting reach → payout */}
            <div className="my-5 flex items-center gap-3">
              <span className="vl-mono text-[0.65rem] uppercase tracking-wider text-[var(--vl-muted)]">
                reach
              </span>
              <span className="vl-proof h-0.5 flex-1 rounded-full" />
              <span className="vl-mono text-[0.65rem] uppercase tracking-wider text-[var(--vl-muted)]">
                payout
              </span>
            </div>

            {/* totals */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[var(--vl-mist)] p-4">
                <p className="text-xs text-[var(--vl-muted)]">Verified views</p>
                <p className="vl-mono mt-1 text-xl font-semibold text-[var(--vl-ink)]">
                  {views.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl p-4 text-white" style={{ background: "var(--vl-ink)" }}>
                <p className="text-xs text-white/60">This month</p>
                <p className="vl-mono mt-1 text-xl font-semibold">${earnings.toLocaleString()}</p>
              </div>
            </div>

            <button className="vl-btn vl-btn-primary premium-glow-button mt-4 w-full">
              Withdraw to bank
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M4 10.5l4 4 8-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Hero;
