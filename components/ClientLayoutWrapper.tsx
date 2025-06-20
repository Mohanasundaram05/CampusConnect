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
            <div className="flex flex-1">
              {/* Persistent sidebar on desktop */}
              <aside className="hidden md:block w-64 h-[calc(100vh-4rem)] sticky top-16 z-40">
                <Sidebar isOpen={true} onClose={() => {}} variant="persistent" />
              </aside>
              {/* Main content */}
              <main className="flex-1 md:ml-0">{children}</main>
            </div>
            <Footer />
            {/* Sidebar drawer for mobile */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} variant="drawer" />
            {/* Floating Menu Button for mobile */}
            <FloatingMenuButton onOpenSidebar={() => setIsSidebarOpen(true)} />
          </div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
} 