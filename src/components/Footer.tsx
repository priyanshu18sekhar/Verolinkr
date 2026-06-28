"use client";

import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { name: "How it works", href: "/#how" },
      { name: "For creators", href: "/auth?role=creator" },
      { name: "For brands", href: "/auth?role=brand" },
      { name: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Contact", href: "/contact" },
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "Instagram", href: "#" },
      { name: "YouTube", href: "#" },
      { name: "LinkedIn", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="vl-section border-t border-[var(--vl-line)] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Wordmark />
            </div>
            <p className="mt-4 max-w-xs text-sm text-[var(--vl-muted)]">
              Get paid for proof, not promises. Verified creator marketing for
              the people who make it.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="vl-mono text-xs uppercase tracking-[0.18em] text-[var(--vl-muted)]">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--vl-ink)]/70 transition-colors hover:text-[var(--vl-ink)]"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-[var(--vl-line)] pt-8 text-sm text-[var(--vl-muted)] md:flex-row">
          <p>© {new Date().getFullYear()} VeroLinkr. All rights reserved.</p>
          <p className="vl-mono text-xs">Built for authentic marketing.</p>
        </div>
      </div>
    </footer>
  );
}

function Wordmark() {
  return (
    <span className="vl-display text-xl tracking-tight text-[var(--vl-ink)]">
      Vero<span className="text-[var(--vl-indigo)]">Linkr</span>
    </span>
  );
}
