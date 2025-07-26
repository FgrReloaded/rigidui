"use client"
import React, { useState } from 'react'

interface ComponentPreviewProps {
  title: string
  description?: string
  code: string
  children: React.ReactNode
}

export function ComponentPreview({ title, description, code, children }: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-medium">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>

      <div className="p-6 bg-white flex items-center justify-center">
        {children}
      </div>

      <div className="border-t border-gray-200 p-2 bg-gray-50 flex justify-end">
        <button
          onClick={() => setShowCode(!showCode)}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          {showCode ? 'Hide code' : 'Show code'}
        </button>
      </div>

      {showCode && (
        <div className="bg-gray-900 p-4 overflow-x-auto">
          <pre className="text-gray-300 text-sm">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
