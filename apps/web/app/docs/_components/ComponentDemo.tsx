'use client'
import React, { useState } from 'react'
import { CodeBlock } from './CodeBlock'
import { Code, Eye, Copy, Check } from 'lucide-react'

interface ComponentDemoProps {
  title?: string
  description?: string
  code: string
  preview: React.ReactNode
  className?: string
}

export function ComponentDemo({
  title,
  description,
  code,
  preview,
  className = ''
}: ComponentDemoProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`${className}`}>
      {title && <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">{title}</h3>}
      {description && <p className="mb-3 text-gray-600 dark:text-gray-400 text-sm">{description}</p>}

      <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-lg shadow-xs">
        <div className="flex items-center border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium focus:outline-hidden transition-colors ${activeTab === 'preview'
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium focus:outline-hidden transition-colors ${activeTab === 'code'
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
          >
            <Code className="h-3.5 w-3.5" />
            Code
          </button>

          {activeTab === 'code' && (
            <button
              onClick={handleCopy}
              className="ml-auto mr-3 flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>

        {activeTab === 'preview' && (
          <div className="p-8 bg-white dark:bg-gray-900 flex items-center justify-center">
            <div className="w-full">{preview}</div>
          </div>
        )}

        {activeTab === 'code' && (
          <CodeBlock code={code} showHeader={false} showCopyButton={false} />
        )}
      </div>
    </div>
  )
}
