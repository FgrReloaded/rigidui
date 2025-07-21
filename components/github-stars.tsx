"use client"
import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

interface GitHubStarsProps {
  className?: string
  showIcon?: boolean
}

export function GitHubStars({ className = "", showIcon = true }: GitHubStarsProps) {
  const [starsCount, setStarsCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const repoResponse = await fetch('https://api.github.com/repos/FgrReloaded/rigidui')
        if (repoResponse.ok) {
          const repoData = await repoResponse.json()
          setStarsCount(repoData.stargazers_count || 0)
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stars:', error)
        setStarsCount(0)
      } finally {
        setLoading(false)
      }
    }

    fetchStars()
  }, [])

  if (loading) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {showIcon && <Star className="w-3 h-3 text-yellow-500" />}
        <span className="text-xs font-medium">...</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {showIcon && <Star className="w-3 h-3 text-yellow-500" />}
      <span className="text-xs font-medium">{starsCount?.toLocaleString() || '0'}</span>
    </div>
  )
}