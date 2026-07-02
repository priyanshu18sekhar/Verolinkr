"use client";

import Link from "next/link";
import { Reveal } from "./cinematic/Cine";

const POINTS = [
  {
    k: "Verified views only",
    v: "Bots, loops and bought reach are filtered before they touch your bill.",
  },
  {
    k: "Escrow through Razorpay",
    v: "Fund a campaign up front; creators are paid as verified views arrive.",
  },
  {
    k: "Audited reach",
    v: "Every creator's audience is read from the platform APIs — the reach you see is the reach you get.",
  },
];

/** The brand side, argued as an audit. */
export default function ForBrands() {
  return (
    <section className="cine-act scroll-mt-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        {/* The audit artifact — order flips on desktop so the sides alternate */}
        <Reveal delay={0.25} className="order-last lg:order-first">
          <div className="lp-card mx-auto w-full max-w-md p-8">
            <div className="flex items-baseline justify-between">
              <p className="cine-mono text-[0.62rem] uppercase tracking-[0.28em] text-[#8a899a]">
                Campaign audit
              </p>
              <p className="cine-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#8a899a]">
                Live
              </p>
            </div>

            <h3
              className="mt-5 text-xl font-semibold text-[#08080c]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Wave Buds launch — CPV
            </h3>
            <p className="cine-mono mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-[#8a899a]">
              ₹0.45 / verified view · 6 creators
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="cine-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#8a899a]">
                    Budget delivered
                  </span>
                  <span
                    className="text-[0.95rem] font-semibold text-[#08080c]"
                    style={{ fontFamily: "var(--font-display)", fontVariantNumeric: "tabular-nums" }}
                  >
                    ₹57,780 / ₹60,000
                  </span>
                </div>
                <div className="dash-bar">
                  <div className="dash-bar-fill" style={{ width: "96%" }} />
                </div>
              </div>

              {[
                { k: "Views submitted", v: "1,41,300" },
                { k: "Failed verification", v: "− 12,900", muted: true },
                { k: "Verified · billed", v: "1,28,400" },
              ].map((r) => (
                <div key={r.k} className="flex items-baseline justify-between border-b border-black/5 pb-3 last:border-b-0">
                  <span className="cine-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#8a899a]">
                    {r.k}
                  </span>
                  <span
                    className={`text-[0.95rem] font-semibold ${r.muted ? "text-[#8a899a] line-through" : "text-[#08080c]"}`}
                    style={{ fontFamily: "var(--font-display)", fontVariantNumeric: "tabular-nums" }}
                  >
                    {r.v}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#08080c] px-5 py-4">
              <p className="cine-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/60">
                Effective CPV
              </p>
              <p
                className="text-xl font-semibold text-white"
                style={{ fontFamily: "var(--font-display)", fontVariantNumeric: "tabular-nums" }}
              >
                ₹0.45
              </p>
            </div>
          </div>
        </Reveal>

        {/* Claim */}
        <div>
          <Reveal>
            <p className="cine-eyebrow">For brands · Side B</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="cine-mid mt-6">
              Buy views that <span className="cine-serif">exist</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="cine-body mt-6 max-w-md text-[1.02rem]">
              Impressions are a promise; verified views are a receipt. Set a
              budget and a price per view — you're billed only for the audience
              that actually showed up.
            </p>
          </Reveal>

          <div className="mt-10 space-y-6">
            {POINTS.map((p, i) => (
              <Reveal key={p.k} delay={0.2 + i * 0.08}>
                <div className="flex gap-5">
                  <span className="cine-mono pt-0.5 text-[0.68rem] font-semibold text-[#c9c8d4]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold text-[#08080c]" style={{ fontFamily: "var(--font-display)" }}>
                      {p.k}
                    </p>
                    <p className="cine-body mt-1 max-w-sm text-[0.92rem]">{p.v}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <Link href="/auth?role=brand" className="cine-btn mt-10">
              Launch a campaign <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
