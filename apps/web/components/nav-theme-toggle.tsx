"use client"
import React, { startTransition } from 'react'
import { useTheme } from "next-themes"


export const NavThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme()
  return (

    <div className="lg:ml-4 ml-2 lg:pl-4 pl-2 border-l border-gray-200 dark:border-gray-700">
      <button
        onClick={() => {
          startTransition(() => {
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
          })
        }}
        className="flex items-center lg:gap-3 gap-1.5 px-4 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 group border border-transparent hover:border-slate-100 dark:hover:border-slate-700 hover:shadow-sm dark:hover:shadow-slate-900/20"
      >
        <div className="sm:p-1.5 p-px rounded-md bg-slate-100 dark:bg-slate-800/60 group-hover:bg-slate-200 dark:group-hover:bg-slate-700/80 transition-colors">
          <div className="relative w-4 h-4 overflow-hidden">
            <svg
              viewBox="0 0 24 24"
              className={`absolute inset-0 w-4 h-4 text-amber-500 dark:text-amber-400 transition-all duration-500 ${resolvedTheme === "dark" ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>

            <svg
              viewBox="0 0 24 24"
              className={`absolute inset-0 w-4 h-4 text-slate-600 dark:text-slate-300 transition-all duration-500 ${resolvedTheme === "dark" ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>
        </div>
        <span className="lg:text-sm text-xs max-sm:hidden font-medium text-gray-700 dark:text-gray-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
          {resolvedTheme === "dark" ? 'Light' : 'Dark'}
        </span>
      </button>
    </div>
  )
}