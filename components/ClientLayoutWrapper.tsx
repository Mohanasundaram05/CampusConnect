"use client";

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Sidebar from '@/components/sidebar';
import { AuthProvider } from '@/contexts/auth-context';
import { LanguageProvider } from '@/contexts/language-context';
import { ThemeProvider } from '@/contexts/theme-context';
import type React from 'react';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 min-h-0">
              {/* Static Sidebar */}
              <Sidebar />
              {/* Main Content */}
              <main className="flex-1 min-w-0">{children}</main>
            </div>
            <Footer />
          </div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
} 