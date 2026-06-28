import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import "./globals.css";
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

// Characterful display face — used with restraint for headlines and the wordmark.
const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}
      >
        {/* Load error suppression BEFORE React hydration */}
        <Script 
          src="/suppress-hydration-warnings.js" 
          strategy="beforeInteractive"
        />
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
