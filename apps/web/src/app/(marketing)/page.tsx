import { HeroSection } from "@/components/marketing/landing/HeroSection";
import { WorkspaceSection } from "@/components/marketing/landing/WorkspaceSection";
import { CoreCapabilities } from "@/components/marketing/landing/CoreCapabilities";
import { KnowledgeGraph } from "@/components/marketing/landing/KnowledgeGraph";
import { ComparisonTable } from "@/components/marketing/landing/ComparisonTable";
import { SessionTimeline } from "@/components/marketing/landing/SessionTimeline";
import { CtaSection } from "@/components/marketing/landing/CtaSection";

export default function LandingPage() {
    return (
        <div className="bg-[#030305] min-h-screen text-slate-100 font-sans selection:bg-primary/30">
            <HeroSection />
            <WorkspaceSection />
            <CoreCapabilities />
            <KnowledgeGraph />
            <ComparisonTable />
            <SessionTimeline />
            <CtaSection />
        </div>
    );
}
