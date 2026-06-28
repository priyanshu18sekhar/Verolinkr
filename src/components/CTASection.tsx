"use client";

import Link from "next/link";
import { Reveal, Words } from "./cinematic/Cine";

export default function CTASection() {
  return (
    <section className="cine-act items-center overflow-hidden text-center">
      {/* closing aurora glow (CSS, no WebGL) */}
      <div className="cine-glow" aria-hidden />

      <p className="cine-eyebrow relative">Free to start</p>

      <h2 className="cine-giant relative mt-6 px-4">
        <Words text="Your reach is real." accent={["real"]} />
      </h2>

      <Reveal delay={0.2} className="relative mt-5">
        <p className="cine-lead text-[#08080c]">
          Your income should be <span className="cine-serif">too.</span>
        </p>
      </Reveal>

      <Reveal delay={0.35} className="relative mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/auth?role=creator" className="cine-btn">
          Start as creator <span aria-hidden>→</span>
        </Link>
        <Link href="/auth?role=brand" className="cine-btn-ghost">
          Start as brand
        </Link>
      </Reveal>

      <Reveal delay={0.5} className="relative mt-10">
        <p className="cine-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#6b6a7b]">
          No setup fees · Escrow-protected · Withdraw anytime
        </p>
      </Reveal>
    </section>
  );
}
