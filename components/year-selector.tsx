"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface YearSelectorProps {
  selectedYear: string
  onYearChange: (year: string) => void
}

export function YearSelector({ selectedYear, onYearChange }: YearSelectorProps) {
  // In a real app, this would read from the data directory
  const availableYears = ["2025", "2024", "2023", "2022", "2021"]

  return (
    <Select value={selectedYear} onValueChange={onYearChange}>
      <SelectTrigger className="w-[120px] bg-white dark:bg-black text-black dark:text-white border-2 border-primary hover:bg-gray-100 dark:hover:bg-gray-900">
        <SelectValue placeholder="연도 선택" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-black border-2 border-primary">
        {availableYears.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
