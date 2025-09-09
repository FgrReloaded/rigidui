"use client"
import React, { useState } from 'react'
import { motion, Easing } from 'motion/react'

interface TextShiftProps {
  primaryText: string
  secondaryText: string
  className?: string
  primaryTextColor?: string
  secondaryTextColor?: string
  duration?: number
  staggerDelay?: number
  easing?: Easing
}

const TextShift: React.FC<TextShiftProps> = ({
  primaryText,
  secondaryText,
  className = '',
  primaryTextColor = 'text-black',
  secondaryTextColor = 'text-gray-400',
  duration = 1,
  staggerDelay = 0.05,
  easing = [0.165, 0.84, 0.44, 1],
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const primaryLetters = primaryText.split('')
  const secondaryLetters = secondaryText.split('')

  return (
    <div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`uppercase font-bold flex ${primaryTextColor}`}>
        {primaryLetters.map((letter, index) => (
          <motion.span
            key={`primary-${index}`}
            animate={{
              y: isHovered ? "-100%" : "0%",
              opacity: isHovered ? 0.8 : 1,
            }}
            transition={{
              duration,
              delay: index * staggerDelay,
              ease: easing,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <div className={`uppercase font-bold absolute top-0 left-0 flex ${secondaryTextColor}`}>
        {secondaryLetters.map((letter, index) => (
          <motion.span
            key={`secondary-${index}`}
            initial={{ y: "100%", opacity: 0 }}
            animate={{
              y: isHovered ? "0%" : "100%",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration,
              delay: index * staggerDelay,
              ease: easing,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

export default TextShift