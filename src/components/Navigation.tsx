"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const links = [
  { name: "How it works", href: "/#how" },
  { name: "For creators", href: "/auth?role=creator" },
  { name: "For brands", href: "/auth?role=brand" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[var(--vl-line)] bg-white/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="vl-display text-lg tracking-tight text-[var(--vl-ink)]">
          Vero<span className="text-[var(--vl-indigo)]">Linkr</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="text-sm font-medium text-[var(--vl-ink)]/70 transition-colors hover:text-[var(--vl-ink)]"
            >
              {l.name}
            </Link>
          ))}
          <Link href="/auth" className="text-sm font-medium text-[var(--vl-ink)]/70 transition-colors hover:text-[var(--vl-ink)]">
            Log in
          </Link>
          <Link href="/auth?role=creator" className="vl-btn vl-btn-primary !px-5 !py-2 !text-sm">
            Start earning
          </Link>
        </div>

        <button
          className="text-[var(--vl-ink)] md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[var(--vl-line)] bg-white md:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {links.map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm font-medium text-[var(--vl-ink)]/80"
                >
                  {l.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3">
                <Link href="/auth" onClick={() => setOpen(false)} className="vl-btn vl-btn-ghost">
                  Log in
                </Link>
                <Link href="/auth?role=creator" onClick={() => setOpen(false)} className="vl-btn vl-btn-primary">
                  Start earning
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
