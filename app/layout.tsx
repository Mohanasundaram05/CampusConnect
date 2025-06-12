import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { LanguageProvider } from "@/contexts/language-context";
import { ThemeProvider } from "@/contexts/theme-context";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import FloatingMenuButton from "@/components/FloatingMenuButton";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CampusConnect - AI Powered College Recommendations",
  description: "Connect with your campus community",
};

// The layout content that requires client-side features will be moved to a separate file
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Wrap the children with the client component */}
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
