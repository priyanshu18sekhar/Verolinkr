"use client";

import Link from "next/link";

const links = [
  { name: "Contact", href: "/contact" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Log in", href: "/auth" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <Link href="/" className="cine-mono text-[0.95rem] font-semibold tracking-tight text-[#08080c]">
          Vero<span className="text-[#4f2bff]">·</span>Linkr
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="cine-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#6b6a7b] transition-colors hover:text-[#08080c]"
            >
              {l.name}
            </Link>
          ))}
        </nav>

        <p className="cine-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#a3a2b0]">
          © {new Date().getFullYear()} VeroLinkr
        </p>
      </div>
    </footer>
  );
}
