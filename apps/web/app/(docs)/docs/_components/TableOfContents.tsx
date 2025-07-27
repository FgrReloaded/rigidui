'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { List } from 'lucide-react'

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    const getHeadings = () => {
      const headingElements = Array.from(document.querySelectorAll('h2, h3, h4')).filter(
        heading => heading.id && heading.textContent
      )

      const headings = headingElements.map((heading) => {
        const level = parseInt(heading.tagName.substring(1))
        return {
          id: heading.id,
          text: heading.textContent || '',
          level
        }
      })

      setHeadings(headings)
    }

    getHeadings()

    window.setTimeout(getHeadings, 500)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (headings.length === 0) return

      const headingElements = headings.map(heading =>
        document.getElementById(heading.id)
      ).filter(Boolean) as HTMLElement[]

      if (headingElements.length === 0) return

      const scrollY = window.scrollY
      const headerHeight = 80

      const currentIndex = headingElements.findIndex(heading => {
        return heading.offsetTop > scrollY + headerHeight + 20
      })

      if (currentIndex === 0) {
        setActiveId(headingElements[0].id)
      } else if (currentIndex > 0) {
        setActiveId(headingElements[currentIndex - 1].id)
      } else {
        setActiveId(headingElements[headingElements.length - 1].id)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <div className="sticky top-10 pl-8 h-full">
      <div className="border-l border-gray-200 dark:border-gray-800 pl-4">
        <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100 mb-5 text-sm">
          <List className="h-4 w-4" />
          <span>On this page</span>
        </div>
        <nav>
          <ul className="space-y-3">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={`
                  ${heading.level === 2 ? '' : 'ml-3'}
                  ${heading.level === 4 ? 'ml-6' : ''}
                  relative
                `}
              >
                {activeId === heading.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 -ml-4 bg-blue-500 dark:bg-blue-400 rounded-full" />
                )}
                <a
                  href={`#${heading.id}`}
                  className={`
                    block py-1 transition-colors text-sm
                    ${activeId === heading.id
                      ? 'text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                    }
                  `}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: 'smooth'
                    })
                    setActiveId(heading.id)
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
