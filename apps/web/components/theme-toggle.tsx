"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative h-8 w-16 rounded-full bg-slate-200 p-1 transition-colors duration-300 dark:bg-slate-800"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 dark:bg-slate-700 ${isDark ? "translate-x-8" : "translate-x-0"
          }`}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-slate-100" />
        ) : (
          <Sun className="h-4 w-4 text-amber-500" />
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <Sun className="h-4 w-4 text-amber-500 opacity-60 dark:opacity-20" />
        <Moon className="h-4 w-4 text-slate-600 opacity-20 dark:opacity-60" />
      </div>
    </button>
  )
}
