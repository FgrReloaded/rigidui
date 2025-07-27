"use client"
import React, { useState, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'
import { highlightCode } from '@/lib/highlight-code'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showHeader?: boolean
  showCopyButton?: boolean
}

export function CodeBlock({
  code,
  language = 'jsx',
  showCopyButton = true
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [highlightedHtml, setHighlightedHtml] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const highlight = async () => {
      try {
        const html = await highlightCode(code, language)
        setHighlightedHtml(html)
      } catch (error) {
        console.error('Failed to highlight code:', error)
        setHighlightedHtml(`<pre><code>${code}</code></pre>`)
      } finally {
        setIsLoading(false)
      }
    }

    highlight()
  }, [code, language])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="relative overflow-hidden bg-[#030712] text-[#d4d4d4] rounded-md min-h-[100px] flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading...</div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden  text-[#d4d4d4]">
      <div
        className="relative [&>pre]:m-0 [&>pre]:p-4 [&>pre]:overflow-auto [&>pre]:text-sm [&>pre]:bg-transparent"
        data-rehype-pretty-code-fragment
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
      {showCopyButton && (
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-gray-300 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-500/50"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      )}
    </div>
  )
}
