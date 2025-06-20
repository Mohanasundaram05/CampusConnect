"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface FloatingMenuButtonProps {
  onOpenSidebar: () => void
}

export default function FloatingMenuButton({ onOpenSidebar }: FloatingMenuButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed bottom-4 left-4 z-50 md:hidden"
    >
      <Button 
        variant="default" 
        size="icon" 
        className="rounded-full w-12 h-12 shadow-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
        onClick={onOpenSidebar}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6 text-white" />
      </Button>
    </motion.div>
  )
} 