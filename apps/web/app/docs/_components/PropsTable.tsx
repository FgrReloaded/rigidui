import React from 'react'

interface PropItem {
  name: string
  type: string
  defaultValue?: string
  description: string
  required?: boolean
}

interface PropsTableProps {
  props: PropItem[]
}

export function PropsTable({ props }: PropsTableProps) {
  const hasRequiredProps = props.some(prop => prop.required)

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
      {hasRequiredProps && (
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <span className="text-red-500">*</span> Required prop
          </p>
        </div>
      )}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-950">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Prop
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Default
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {props.map((prop) => (
              <tr key={prop.name} className="hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors">
                <td className="md:px-6 px-3 py-4 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {prop.name}
                  {prop.required && <span className="ml-1 text-red-500">*</span>}
                </td>
                <td className="md:px-6 px-3 py-4 text-sm text-gray-600 dark:text-gray-300 font-mono whitespace-nowrap max-w-1/2">
                  {prop.type}
                </td>
                <td className="md:px-6 px-3 py-4 text-sm text-gray-600 dark:text-gray-300 font-mono whitespace-nowrap">
                  {prop.defaultValue || '—'}
                </td>
                <td className="md:px-6 px-3 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
