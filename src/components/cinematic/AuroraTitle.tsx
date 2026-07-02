"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "./Cine";

/* On-brand aurora hues each letter can drift through. */
const HUES = [255, 222, 190, 165, 322];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.024, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE },
  },
};

type Unit =
  | { kind: "letter"; ch: string; hue: number }
  | { kind: "word"; ch: string }
  | { kind: "space" };

/**
 * AuroraTitle — god-mode kinetic headline.
 *
 * Normal words split into individual letters that rise in, breathe with an
 * ambient shimmer, and ignite with an aurora glow + lift in proximity to the
 * pointer — each letter reacting on its own.
 *
 * Accent (cursive) words get a distinct treatment: the WHOLE word renders as a
 * single italic serif unit filled with a live, drifting aurora gradient that
 * blooms brighter as the pointer nears — it glows as one, not letter-by-letter.
 *
 * Honours reduced-motion with a plain static render.
 */
export function AuroraTitle({
  text,
  accent = [],
  className,
  start = "show",
}: {
  text: string;
  accent?: string[];
  className?: string;
  start?: "show" | "load";
}) {
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const glow = useRef<number[]>([]);
  const pointer = useRef<{ x: number; y: number; on: boolean }>({ x: 0, y: 0, on: false });

  // Build the unit stream — accent words stay whole, others split to letters.
  const words = text.split(" ");
  const units: Unit[] = [];
  let li = 0;
  words.forEach((w, wi) => {
    const isAccent = accent.includes(w.replace(/[.,!?]/g, ""));
    if (isAccent) {
      units.push({ kind: "word", ch: w });
    } else {
      for (const ch of w) {
        units.push({ kind: "letter", ch, hue: HUES[li % HUES.length] });
        li++;
      }
    }
    if (wi < words.length - 1) units.push({ kind: "space" });
  });

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const RADIUS = 180;

    const tick = (t: number) => {
      const time = t * 0.001;
      const p = pointer.current;
      const els = refs.current;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;
        // gentle ambient shimmer so the titles stay alive at rest, each unit
        // phase-shifted; pointer proximity then blooms the full glow on top
        let target = (Math.sin(time * 1.1 + i * 0.45) * 0.5 + 0.5) * 0.14;
        if (p.on) {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const d = Math.hypot(p.x - cx, p.y - cy);
          const prox = Math.max(0, 1 - d / RADIUS);
          target = Math.max(target, Math.pow(prox, 1.5));
        }
        const cur = glow.current[i] ?? 0;
        const next = cur + (target - cur) * 0.16;
        glow.current[i] = next;
        el.style.setProperty("--g", next.toFixed(3));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const onMove = (e: React.PointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY, on: true };
  };
  const onLeave = () => {
    pointer.current.on = false;
  };

  if (reduce) {
    return (
      <span className={className}>
        {words.map((w, i) => (
          <span key={i} className={accent.includes(w.replace(/[.,!?]/g, "")) ? "cine-serif" : undefined}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  }

  const viewProps =
    start === "load"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: { once: true, amount: 0.5 } };

  // Group each word's units so lines can only break BETWEEN words — letters
  // are individual inline-blocks and would otherwise wrap mid-word.
  type GlyphUnit = Exclude<Unit, { kind: "space" }>;
  const groups: GlyphUnit[][] = [];
  let current: GlyphUnit[] = [];
  for (const u of units) {
    if (u.kind === "space") {
      if (current.length) groups.push(current);
      current = [];
    } else {
      current.push(u);
    }
  }
  if (current.length) groups.push(current);

  let refIdx = -1;
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...viewProps}
    >
      {groups.map((group, gi) => (
        <span key={gi}>
          <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {group.map((u, i) => {
              refIdx++;
              const idx = refIdx;
              const isWord = u.kind === "word";
              return (
                <motion.span
                  key={i}
                  variants={item}
                  style={{ display: "inline-block", willChange: "transform, filter" }}
                >
                  <span
                    ref={(el) => {
                      refs.current[idx] = el;
                    }}
                    className={isWord ? "god-word" : "god-letter"}
                    data-text={isWord ? u.ch : undefined}
                    style={isWord ? undefined : ({ ["--h" as string]: (u as { hue: number }).hue })}
                  >
                    {u.ch}
                  </span>
                </motion.span>
              );
            })}
          </span>
          {gi < groups.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}
