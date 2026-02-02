import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNavigation from "../componets/ConditionalNavigation";
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

export const metadata: Metadata = {
  title: "VeroLinkr - Connect Brands with Authentic Creators",
  description: "The premier platform connecting brands with verified creators for authentic influencer marketing campaigns.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
