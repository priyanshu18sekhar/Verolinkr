"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Shared cinematic easing — a long, filmic settle.
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Reveal — fade + rise + de-blur when scrolled into view. The workhorse
 * entrance for the landing's acts. Honours reduced-motion (plain fade).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  amount = 0.45,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: "blur(12px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const wordsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.04 } },
};
const wordItem: Variants = {
  hidden: { opacity: 0, y: "0.42em", filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: EASE },
  },
};

/**
 * Words — staggered word-by-word title reveal (a film-title rise). Pass plain
 * text; each word animates in sequence. Use `accent` to render specific words
 * in the italic serif accent face.
 */
export function Words({
  text,
  className,
  accent = [],
  start = "show",
}: {
  text: string;
  className?: string;
  accent?: string[];
  start?: "show" | "load";
}) {
  const reduce = useReducedMotion();
  const tokens = text.split(" ");
  const isAccent = (w: string) => accent.includes(w.replace(/[.,]/g, ""));

  if (reduce) {
    return (
      <span className={className}>
        {tokens.map((w, i) => (
          <span key={i} className={isAccent(w) ? "cine-serif" : undefined}>
            {w}
            {i < tokens.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  }

  const viewProps =
    start === "load"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      variants={wordsContainer}
      initial="hidden"
      {...viewProps}
    >
      {tokens.map((w, i) => (
        <span key={i} style={{ display: "inline-block", verticalAlign: "top", willChange: "transform, filter" }}>
          <motion.span
            variants={wordItem}
            className={isAccent(w) ? "cine-serif" : undefined}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {w}
            {i < tokens.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
