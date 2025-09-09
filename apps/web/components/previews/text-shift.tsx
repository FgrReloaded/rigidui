"use client"
import React from 'react'
import TextShift from '@/r/new-york/text-shift/text-shift'

const TextShiftPreview = () => {
  return (
    <div className="relative min-h-[400px] w-full overflow-hidden">

      <div className="relative flex flex-col items-center justify-center h-full px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium text-slate-900 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Hover to see the magic
          </div>
        </div>

        <div className="space-y-16 text-center">
          <div className="space-y-2">
            <TextShift
              primaryText="Developer"
              secondaryText="Designer"
              className="text-5xl md:text-6xl font-bold tracking-tight"
              primaryTextColor="text-slate-900 dark:text-white"
              secondaryTextColor="text-gray-600 dark:text-gray-400"
              duration={1}
              staggerDelay={0.04}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextShiftPreview
