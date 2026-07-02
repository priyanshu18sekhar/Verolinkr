import Hero from "../components/Hero";
import ConnectStrip from "../components/ConnectStrip";
import HowItWorks from "../components/HowItWorks";
import StatsSection from "../components/StatsSection";
import DualValue from "../components/DualValue";
import ForCreators from "../components/ForCreators";
import ForBrands from "../components/ForBrands";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <main className="cine-wrap antialiased">
      {/* A title-sequence scroll: Connect → Verify → Earn → choose your
          side → each side's proof → start. */}
      <Hero />
      <ConnectStrip />
      <HowItWorks />
      <StatsSection />
      <DualValue />
      <ForCreators />
      <ForBrands />
      <CTASection />
      <Footer />
    </main>
  );
}
