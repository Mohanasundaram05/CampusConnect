"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Menu, Globe, Sun, Moon } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import { useAuth } from "@/contexts/auth-context"
import Sidebar from "@/components/sidebar"

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/courses", label: "Courses" },
    { href: "/comparison", label: "Compare" },
    { href: "/about", label: "About" },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left section: Logo and Hamburger Menu (Desktop only) */}
            <div className="flex items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2 ml-4 lg:ml-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CC</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CampusConnect
                </span>
              </Link>
            </div>

            {/* Center section: Desktop Navigation */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right section: Controls and Auth Buttons */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                <SelectTrigger className="w-20 h-8 border-0 bg-transparent">
                  <Globe className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="ta">TA</SelectItem>
                  <SelectItem value="hi">HI</SelectItem>
                </SelectContent>
              </Select>

              {/* Theme Toggle */}
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-8 h-8 p-0">
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-2">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 dark:text-gray-300 hidden md:block">Welcome, {user?.firstName}</span>
                    <Button variant="ghost" size="sm" onClick={logout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button asChild variant="ghost" size="sm">
                      <Link href="/auth/login">{t("nav.login")}</Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md px-4 py-2 text-white font-medium"
                    >
                      <Link href="/auth/signup">{t("nav.signup")}</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  )
}
