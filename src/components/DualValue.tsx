"use client";

import Link from "next/link";
import { Reveal } from "./cinematic/Cine";
import { AuroraTitle } from "./cinematic/AuroraTitle";

const sides = [
  {
    eyebrow: "For creators",
    title: "Creators",
    line: "Turn real reach into real income — paid per verified view, on time.",
    cta: { label: "Start earning", href: "/auth?role=creator" },
    more: { label: "See the receipt", href: "#for-creators" },
  },
  {
    eyebrow: "For brands",
    title: "Brands",
    line: "Pay for proof, not vanity metrics. Verified audiences, escrow-protected.",
    cta: { label: "Find creators", href: "/auth?role=brand" },
    more: { label: "See the audit", href: "#for-brands" },
  },
];

export default function DualValue() {
  return (
    <section className="cine-act items-center scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="cine-eyebrow">Two sides, one source of truth</p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden md:grid-cols-2">
          {sides.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 0.12}
              className={`flex flex-col px-4 py-8 md:px-12 ${
                i === 0 ? "md:border-r md:border-black/10" : ""
              }`}
            >
              <p className="cine-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#6b6a7b]">
                {s.eyebrow}
              </p>
              <h3 className="cine-mid mt-4">
                <AuroraTitle text={s.title} />
              </h3>
              <p className="cine-body mt-5 max-w-sm text-[1.05rem]">{s.line}</p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link href={s.cta.href} className="cine-btn-ghost self-start">
                  {s.cta.label} <span aria-hidden>→</span>
                </Link>
                <a
                  href={s.more.href}
                  className="cine-mono text-[0.66rem] uppercase tracking-[0.2em] text-[#6b6a7b] transition-colors hover:text-[#08080c]"
                >
                  {s.more.label} ↓
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
