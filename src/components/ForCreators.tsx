"use client";

import Link from "next/link";
import { Reveal } from "./cinematic/Cine";

const POINTS = [
  {
    k: "Per verified view",
    v: "Set your CPV. A view only counts once it clears verification — then it pays.",
  },
  {
    k: "Read-only connect",
    v: "Link Instagram, YouTube or Facebook once. We read stats; we never post.",
  },
  {
    k: "Withdraw anytime",
    v: "Payouts land in your bank in 2–3 days through Razorpay. No chasing invoices.",
  },
];

/** The creator side, argued as a literal receipt. */
export default function ForCreators() {
  return (
    <section className="cine-act scroll-mt-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        {/* Claim */}
        <div>
          <Reveal>
            <p className="cine-eyebrow">For creators · Side A</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="cine-mid mt-6">
              Your views become <span className="cine-serif">line items</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="cine-body mt-6 max-w-md text-[1.02rem]">
              No media kits, no rate haggling, no "exposure". Connect your
              platforms, take campaigns at your price, and watch every verified
              view settle into your balance.
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
            <Link href="/auth?role=creator" className="cine-btn mt-10">
              Start earning <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        {/* The receipt artifact */}
        <Reveal delay={0.25}>
          <div className="lp-card mx-auto w-full max-w-md p-8">
            <div className="flex items-baseline justify-between">
              <p className="cine-mono text-[0.62rem] uppercase tracking-[0.28em] text-[#8a899a]">
                Payout receipt
              </p>
              <p className="cine-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#8a899a]">
                RCPT №0042
              </p>
            </div>

            <div className="vl-proof mt-5 h-[2px]" aria-hidden />

            <div className="mt-6 space-y-4">
              {[
                { label: "Wave Buds launch — reel", views: "40,000 views · ₹0.45", amt: "₹18,000" },
                { label: "Fintrack walkthrough", views: "25,000 views · ₹0.50", amt: "₹12,500" },
                { label: "Solstice morning routine", views: "55,000 views · ₹0.40", amt: "₹22,000" },
              ].map((r) => (
                <div key={r.label} className="flex items-baseline justify-between gap-4 border-b border-black/5 pb-4 last:border-b-0">
                  <div>
                    <p className="text-[0.9rem] font-semibold text-[#08080c]">{r.label}</p>
                    <p className="cine-mono mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-[#8a899a]">
                      {r.views} — verified
                    </p>
                  </div>
                  <p
                    className="text-[1.05rem] font-semibold text-[#08080c]"
                    style={{ fontFamily: "var(--font-display)", fontVariantNumeric: "tabular-nums" }}
                  >
                    {r.amt}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#08080c] px-5 py-4">
              <p className="cine-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/60">
                Paid to bank
              </p>
              <p
                className="text-xl font-semibold text-white"
                style={{ fontFamily: "var(--font-display)", fontVariantNumeric: "tabular-nums" }}
              >
                ₹52,500
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
