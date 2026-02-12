import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { FeaturesGrid } from "@/components/marketing/FeaturesGrid";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { GoalShowcase } from "@/components/marketing/GoalShowcase";
import { Pricing } from "@/components/marketing/Pricing";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { Footer } from "@/components/marketing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <GoalShowcase />
      <Pricing />
      <CtaBanner />
      <Footer />
    </main>
  );
}
