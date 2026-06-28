"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { EASE } from "./cinematic/Cine";

const links = [
  { name: "Connect", href: "/#connect" },
  { name: "Verify", href: "/#verify" },
  { name: "Earn", href: "/#earn" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Past the cold-open, the glass pill compresses.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 60));

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <motion.nav
        className="glass-nav pointer-events-auto flex items-center justify-between gap-2 overflow-hidden rounded-full"
        initial={false}
        animate={{
          width: scrolled ? "min(540px, 94vw)" : "min(900px, 96vw)",
          paddingLeft: scrolled ? 16 : 22,
          paddingRight: scrolled ? 10 : 12,
          paddingTop: scrolled ? 9 : 13,
          paddingBottom: scrolled ? 9 : 13,
        }}
        transition={{ type: "spring", stiffness: 240, damping: 28, mass: 0.9 }}
      >
        <Link
          href="/"
          className="cine-mono shrink-0 text-[0.95rem] font-semibold tracking-tight text-[#08080c]"
        >
          Vero<span className="text-[#4f2bff]">·</span>Linkr
        </Link>

        {/* Center links — present when expanded, fold away as it compresses. */}
        <motion.div
          className="hidden items-center gap-7 overflow-hidden md:flex"
          animate={{
            opacity: scrolled ? 0 : 1,
            width: scrolled ? 0 : "auto",
            filter: scrolled ? "blur(4px)" : "blur(0px)",
          }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ pointerEvents: scrolled ? "none" : "auto" }}
        >
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="cine-mono whitespace-nowrap text-xs uppercase tracking-[0.18em] text-[#46455a] transition-colors hover:text-[#08080c]"
            >
              {l.name}
            </Link>
          ))}
        </motion.div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/auth"
            className="cine-mono hidden whitespace-nowrap px-2 text-xs uppercase tracking-[0.16em] text-[#46455a] transition-colors hover:text-[#08080c] sm:inline-flex"
          >
            Log in
          </Link>
          <Link href="/auth?role=creator" className="cine-btn !px-4 !py-2 !text-[0.8rem]">
            Start earning
          </Link>
          <button
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#08080c] md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="glass-nav pointer-events-auto absolute top-[72px] left-3 right-3 rounded-3xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="cine-mono rounded-xl px-3 py-3 text-sm uppercase tracking-[0.16em] text-[#46455a] transition-colors hover:bg-black/[0.04] hover:text-[#08080c]"
                >
                  {l.name}
                </Link>
              ))}
              <Link
                href="/auth"
                onClick={() => setOpen(false)}
                className="cine-btn-ghost mt-2 w-full"
              >
                Log in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
