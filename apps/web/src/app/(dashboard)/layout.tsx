import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background text-foreground animate-in fade-in duration-300">
            {/* Desktop Sidebar */}
            <div className="hidden border-r border-border md:block md:w-64 fixed h-full z-30 bg-background">
                <Sidebar className="h-full" />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 md:pl-64 transition-all duration-300">
                <Header />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
