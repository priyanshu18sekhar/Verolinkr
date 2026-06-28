import Hero from "../components/Hero";
import ConnectStrip from "../components/ConnectStrip";
import HowItWorks from "../components/HowItWorks";
import StatsSection from "../components/StatsSection";
import DualValue from "../components/DualValue";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <main className="cine-wrap antialiased">
      {/* A title-sequence scroll: Connect → Verify → Earn → choose your side → start. */}
      <Hero />
      <ConnectStrip />
      <HowItWorks />
      <StatsSection />
      <DualValue />
      <CTASection />
      <Footer />
    </main>
  );
}
