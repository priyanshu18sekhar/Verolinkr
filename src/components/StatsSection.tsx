"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, EASE } from "./cinematic/Cine";

function useCountUp(target: number, decimals: number, start: boolean) {
  const [v, setV] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setV(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 2000;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, reduce]);
  return decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
}

const sideStats = [
  { value: 50000, suffix: "+", label: "creators verified" },
  { value: 18, suffix: "M", label: "verified views / month" },
];

function SideStat({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const display = useCountUp(value, 0, start);
  return (
    <div className="text-center">
      <p className="cine-mid !text-[clamp(2rem,5vw,3.4rem)]" style={{ fontFeatureSettings: '"tnum" 1' }}>
        {display}
        {suffix}
      </p>
      <p className="cine-mono mt-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#6b6a7b]">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  const hero = useCountUp(9.4, 1, start);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStart(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="earn" ref={ref} className="cine-act items-center scroll-mt-24 text-center">
      <p className="cine-eyebrow">Step 03 — Earn</p>

      <motion.p
        className="cine-giant mt-6 px-4"
        style={{ fontFeatureSettings: '"tnum" 1' }}
        initial={{ opacity: 0, filter: "blur(16px)", scale: 0.96 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        ${hero}M
      </motion.p>

      <Reveal delay={0.2} className="mt-4">
        <p className="cine-lead text-[#08080c]">
          paid to creators, for <span className="cine-serif">every real view.</span>
        </p>
      </Reveal>

      <Reveal delay={0.4} className="mt-16 flex w-full max-w-2xl items-start justify-center gap-16 px-6">
        {sideStats.map((s) => (
          <SideStat key={s.label} {...s} start={start} />
        ))}
      </Reveal>
    </section>
  );
}
