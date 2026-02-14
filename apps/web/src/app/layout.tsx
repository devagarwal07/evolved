import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Import Inter/Space Grotesk if available, but staying safe with existing imports
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EvolveEd — AI-Powered Learning Platform",
  description:
    "The Operating System for Learning. AI-native, outcome-driven education that structures, personalizes, and adapts to how you learn best.",
  keywords: [
    "AI learning",
    "personalized education",
    "edtech",
    "AI tutor",
    "learning paths",
    "smart notes",
    "spaced repetition",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30 selection:text-white`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
