"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  X, 
  Home, 
  User, 
  Sparkles, 
  TrendingUp, 
  Search, 
  Link2, 
  MessageCircle, 
  Info 
} from "lucide-react"

const sidebarItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/recommendations", label: "Recommendations", icon: Sparkles },
  { href: "/cutoff-trends", label: "Cutoff Trends", icon: TrendingUp },
  { href: "/courses", label: "Course Explorer", icon: Search },
  { href: "/comparison", label: "Compare Colleges", icon: Link2 },
  { href: "/chatbot", label: "AI Chatbot", icon: MessageCircle },
  { href: "/about", label: "About Us", icon: Info },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      id="sidebar"
      role="navigation"
      aria-label="Main navigation"
      className="h-screen w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 z-50 flex flex-col"
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Navigation</h2>
      </div>
      <nav className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className="block"
                aria-current={isActive ? "page" : undefined}
              >
                <div
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </div>
              </Link>
            )
          })}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <hr className="my-4 border-gray-200 dark:border-gray-700" />
          <Button
            asChild
            variant="outline"
            className="w-full justify-center"
          >
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button
            asChild
            className="w-full justify-center bg-[#007BFF] hover:bg-[#0056b3]"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </nav>
    </aside>
  )
} 