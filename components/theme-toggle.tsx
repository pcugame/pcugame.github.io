"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Set dark mode as default
    document.documentElement.classList.add("dark")
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <Button
      onClick={toggleTheme}
      size="icon"
      className={`fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full shadow-lg ${
        isDark ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90"
      }`}
      variant="default"
    >
      {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      <span className="sr-only">테마 전환</span>
    </Button>
  )
}
