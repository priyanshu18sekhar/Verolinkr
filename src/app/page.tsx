import Hero from "../components/Hero";
import ConnectStrip from "../components/ConnectStrip";
import HowItWorks from "../components/HowItWorks";
import DualValue from "../components/DualValue";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <main className="lp-wrap antialiased">
      <Hero />
      <ConnectStrip />
      <div id="how" className="scroll-mt-20">
        <HowItWorks />
      </div>
      <DualValue />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
