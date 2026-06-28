import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Aurora from "../components/Aurora";
import ConditionalNavigation from "../components/ConditionalNavigation";
import AnalyticsInit from "../components/AnalyticsInit";
import { AuthProvider } from "../contexts/AuthProvider";
import { CurrencyProvider } from "../contexts/CurrencyContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Giant display face — kinetic, cinematic titles.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Editorial accent — used in italic, with restraint, on key words.
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "VeroLinkr — Get paid for proof, not promises",
  description:
    "Connect Instagram, YouTube and Facebook once. VeroLinkr verifies your real reach and pays you for every genuine view — no fake metrics, no chasing invoices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} antialiased`}
      >
        {/* Load error suppression BEFORE React hydration */}
        <Script 
          src="/suppress-hydration-warnings.js" 
          strategy="beforeInteractive"
        />
        {/* Platform-wide aurora background — a fixed, non-interactive glow that
            sits behind every page on the otherwise white surface. */}
        <div className="aurora-bg" aria-hidden>
          <Aurora />
        </div>
        <AuthProvider>
          <AnalyticsInit />
          <CurrencyProvider>
            <ConditionalNavigation />
            {children}
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
