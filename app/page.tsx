"use client"

import { useState } from "react"
import { ProjectGrid } from "@/components/project-grid"
import { ThemeToggle } from "@/components/theme-toggle"
import { YearSelector } from "@/components/year-selector"

export default function Home() {
  const [selectedYear, setSelectedYear] = useState("2025")

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />
          </div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-center flex-1 text-balance">
            배재대학교 게임공학과 {selectedYear} 졸업작품 전시 페이지
          </h1>
          <div className="w-[100px]" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <ProjectGrid year={selectedYear} />
      </main>

      {/* Theme Toggle - Fixed Bottom Left */}
      <ThemeToggle />
    </div>
  )
}
