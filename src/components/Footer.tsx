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
    <footer className="border-t border-white/10 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <span className="vl-display text-xl tracking-tight text-white">VeroLinkr</span>
            <p className="mt-4 max-w-xs text-sm lp-muted">
              Get paid for proof, not promises. Verified creator marketing for
              the people who make it.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="lp-eyebrow">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-sm text-white/65 transition-colors hover:text-white">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-sm lp-faint md:flex-row">
          <p>© {new Date().getFullYear()} VeroLinkr. All rights reserved.</p>
          <p className="vl-mono text-xs">Built for authentic marketing.</p>
        </div>
      </div>
    </footer>
  );
}
