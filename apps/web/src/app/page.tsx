import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { FeaturesGrid } from "@/components/marketing/FeaturesGrid";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { GoalShowcase } from "@/components/marketing/GoalShowcase";
import { WorkspaceSection } from "@/components/marketing/landing/WorkspaceSection";
import { CoreCapabilities } from "@/components/marketing/landing/CoreCapabilities";
import { KnowledgeGraph } from "@/components/marketing/landing/KnowledgeGraph";
import { ComparisonTable } from "@/components/marketing/landing/ComparisonTable";
import { SessionTimeline } from "@/components/marketing/landing/SessionTimeline";
import { Pricing } from "@/components/marketing/Pricing";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { Footer } from "@/components/marketing/Footer";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen text-foreground antialiased selection:bg-primary/30 selection:text-primary-foreground">
      {/* Fixed animated background layer at z-0 */}
      <AmbientBackground />

      {/* Content layer at z-10 — above the background */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <WorkspaceSection />
        <CoreCapabilities />
        <FeaturesGrid />
        <KnowledgeGraph />
        <HowItWorks />
        <GoalShowcase />
        <ComparisonTable />
        <SessionTimeline />
        <Pricing />
        <CtaBanner />
        <Footer />
      </div>
    </main>
  );
}
