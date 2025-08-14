"use client";

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Sidebar from '@/components/sidebar';
import FloatingMenuButton from '@/components/FloatingMenuButton';
import { AuthProvider } from '@/contexts/auth-context';
import { LanguageProvider } from '@/contexts/language-context';
import { ThemeProvider } from '@/contexts/theme-context';
import type React from 'react';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">{children}</main>
            <Footer />
          </div>
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          
          <FloatingMenuButton onOpenSidebar={() => setIsSidebarOpen(true)} />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}