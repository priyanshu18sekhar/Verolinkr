"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50000, suffix: "+", label: "Creators verified" },
  { value: 1200, suffix: "+", label: "Brands paying out" },
  { value: 18, suffix: "M", label: "Verified views / mo" },
  { value: 9.4, suffix: "M", prefix: "$", decimals: 1, label: "Paid to creators" },
];

function Stat({
  value,
  suffix,
  prefix = "",
  label,
  decimals = 0,
  start,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  decimals?: number;
  start: boolean;
}) {
  const [v, setV] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setV(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1700;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      setV(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value, reduce]);

  const display = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();

  return (
    <div className="px-6 py-10 text-center md:py-12">
      <p className="vl-display text-4xl text-[var(--vl-ink)] md:text-5xl" style={{ fontFeatureSettings: '"tnum" 1' }}>
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-[var(--vl-muted)]">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

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
    <section className="vl-section py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="grid divide-y divide-[var(--vl-line)] rounded-2xl border border-[var(--vl-line)] bg-[var(--vl-mist)] md:grid-cols-4 md:divide-x md:divide-y-0"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((s) => (
            <Stat key={s.label} {...s} start={start} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
