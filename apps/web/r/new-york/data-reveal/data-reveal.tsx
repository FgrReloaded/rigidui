"use client"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect, ReactNode, createContext, useContext } from "react"

const defaultAnimation = {
    duration: 0.7,
    staggerDelay: 0.08,
    ease: [0.16, 1, 0.3, 1],
    containerScale: 0.8,
    itemScale: 0.7,
    blur: 4
}

interface DataRevealContextType {
    isRevealed: boolean
    toggle: () => void
    disabled: boolean
}

const DataRevealContext = createContext<DataRevealContextType | null>(null)

const useDataReveal = () => {
    const context = useContext(DataRevealContext)
    if (!context) {
        throw new Error('DataReveal compound components must be used within DataReveal')
    }
    return context
}

interface DataRevealProps {
    children: ReactNode
    defaultRevealed?: boolean
    onToggle?: (isRevealed: boolean) => void
    disabled?: boolean
    autoHide?: boolean
    autoHideDelay?: number
}

function DataReveal({
    children,
    defaultRevealed = false,
    onToggle,
    disabled = false,
    autoHide = false,
    autoHideDelay = 3000
}: DataRevealProps) {
    const [isRevealed, setIsRevealed] = useState(defaultRevealed)

    useEffect(() => {
        if (autoHide && isRevealed) {
            const timer = setTimeout(() => {
                handleToggle()
            }, autoHideDelay)
            return () => clearTimeout(timer)
        }
    }, [autoHide, isRevealed, autoHideDelay])

    const handleToggle = () => {
        if (disabled) return
        
        const newRevealedState = !isRevealed
        setIsRevealed(newRevealedState)
        onToggle?.(newRevealedState)
    }

    const contextValue: DataRevealContextType = {
        isRevealed,
        toggle: handleToggle,
        disabled
    }

    return (
        <DataRevealContext.Provider value={contextValue}>
            <div className="flex items-center">
                {children}
            </div>
        </DataRevealContext.Provider>
    )
}

interface RevealButtonProps {
    children?: ReactNode
    text?: string
    className?: string
}

function RevealButton({ children, text, className }: RevealButtonProps) {
    const { toggle, disabled } = useDataReveal()

    return (
        <div 
            className={cn(
                "flex items-center justify-center py-2 px-4 rounded-full border border-gray-300 bg-black cursor-pointer hover:border-gray-400 transition-colors",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
            onClick={toggle}
        >
            <span className="text-white">
                {children || text || 'Reveal'}
            </span>
        </div>
    )
}

interface RevealContainerProps {
    children: ReactNode
    className?: string
}

function RevealContainer({ children, className }: RevealContainerProps) {
    const { isRevealed } = useDataReveal()

    return (
        <AnimatePresence>
            {isRevealed && (
                <motion.div 
                    className={cn("flex gap-2 ml-2", className)}
                    initial={{ 
                        opacity: 0, 
                        width: 0,
                        scale: defaultAnimation.containerScale
                    }}
                    animate={{ 
                        opacity: 1, 
                        width: "auto",
                        scale: 1
                    }}
                    exit={{ 
                        opacity: 0, 
                        width: 0,
                        scale: defaultAnimation.containerScale
                    }}
                    transition={{ 
                        duration: defaultAnimation.duration * 0.7,
                        ease: defaultAnimation.ease as any
                    }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

interface RevealItemProps {
    children?: ReactNode
    content?: string
    index?: number
    className?: string
}

function RevealItem({ children, content, index = 0, className }: RevealItemProps) {
    return (
        <motion.div
            className={cn(
                "flex items-center justify-center py-2 px-4 rounded-full border border-gray-300 whitespace-nowrap",
                className
            )}
            initial={{ 
                opacity: 0,
                x: -60,
                scale: defaultAnimation.itemScale,
                filter: `blur(${defaultAnimation.blur}px)`
            }}
            animate={{ 
                opacity: 1,
                x: 0,
                scale: 1,
                filter: "blur(0px)"
            }}
            exit={{ 
                opacity: 0,
                x: -40,
                scale: defaultAnimation.itemScale * 1.1,
                filter: `blur(${defaultAnimation.blur / 2}px)`
            }}
            transition={{ 
                duration: defaultAnimation.duration,
                delay: index * defaultAnimation.staggerDelay,
                ease: defaultAnimation.ease as any,
                filter: { duration: defaultAnimation.duration * 0.6 }
            }}
        >
            <span>
                {children || content}
            </span>
        </motion.div>
    )
}

DataReveal.Button = RevealButton
DataReveal.Container = RevealContainer
DataReveal.Item = RevealItem

export { DataReveal, RevealButton, RevealContainer, RevealItem }
export type { DataRevealProps, RevealButtonProps, RevealContainerProps, RevealItemProps }
