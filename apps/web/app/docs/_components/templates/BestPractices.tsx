import { Check, X } from 'lucide-react'
import React from 'react'
import { BestPractice } from '../ComponentDocTemplate'

const BestPractices = ({ bestPractices }: { bestPractices: BestPractice[] }) => {
  return (
    <section className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 space-y-8">
      <h2 id="best-practices" className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white">Best Practices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {bestPractices.map((practice, index) => (
          practice.type === 'do' ? (
            <div key={index} className="rounded-xl border border-green-100 dark:border-green-900/30 bg-green-50/50 dark:bg-green-900/10 md:p-8 p-4 shadow-sm">
              <h3 className="flex items-center text-lg font-semibold text-green-800 dark:text-green-400 mb-6">
                <Check className="text-green-500 mr-3 h-6 w-6 bg-green-100 dark:bg-green-800/50 p-1 rounded-full" /> Do
              </h3>
              <ul className="space-y-4 md:ml-10 ml-6 list-disc text-green-800 dark:text-green-400 text-base">
                {practice.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div key={index} className="rounded-xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 md:p-8 p-4 shadow-sm">
              <h3 className="flex items-center text-lg font-semibold text-red-800 dark:text-red-400 mb-6">
                <X className="text-red-500 mr-3 h-6 w-6 bg-red-100 dark:bg-red-800/50 p-1 rounded-full" /> Don&apos;t
              </h3>
              <ul className="space-y-4 md:ml-10 ml-6 list-disc text-red-800 dark:text-red-400 text-base">
                {practice.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>
    </section>)
}

export default BestPractices