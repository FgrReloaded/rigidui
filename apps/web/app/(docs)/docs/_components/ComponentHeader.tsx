import React from 'react'
import { Github, Package } from 'lucide-react'
import Link from 'next/link'

interface ComponentHeaderProps {
  title: string
  description: string
  githubPath?: string
  npm?: string
}

export function ComponentHeader({
  title,
  description,
  githubPath,
  npm,
}: ComponentHeaderProps) {
  return (
    <div className="mb-10">
      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 md:text-lg">
            {description}
          </p>

          {(githubPath || npm) && (
            <div className="flex flex-wrap gap-4 pt-2">
              {githubPath && (
                <Link
                  href={`https://github.com/FgrReloaded/rigidui/blob/main/${githubPath}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  View source
                </Link>
              )}

              {npm && (
                <Link
                  href={`https://www.npmjs.com/package/${npm}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <Package className="h-4 w-4" />
                  {npm}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 border-b border-gray-200 dark:border-gray-800"></div>
    </div>
  )
}
