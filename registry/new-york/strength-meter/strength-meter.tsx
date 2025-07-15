"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, Check, X, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"

export type StrengthLevel = "empty" | "weak" | "fair" | "good" | "strong"

export interface PasswordStrengthRequirement {
  label: string
  validator: (password: string) => boolean
}

export interface StrengthMeterTheme {
  container?: string
  input?: string
  inputContainer?: string
  meterContainer?: string
  meterSegment?: string
  strengthText?: string
  requirementsContainer?: string
  requirementItem?: string
  requirementIcon?: string
  requirementText?: string
  strengthColors?: {
    empty?: string
    weak?: string
    fair?: string
    good?: string
    strong?: string
  }
}

export interface PasswordStrengthMeterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
  showText?: boolean
  showRequirements?: boolean
  segments?: number
  strengthThresholds?: Record<StrengthLevel, number>
  requirements?: PasswordStrengthRequirement[]
  customCalculateStrength?: (password: string) => number
  showPasswordToggle?: boolean
  strengthLabels?: Record<StrengthLevel, string>
  className?: string
  meterClassName?: string
  inputClassName?: string
  placeholder?: string
  enableAutoGenerate?: boolean
  autoGenerateLength?: number
  theme?: StrengthMeterTheme
}

const defaultRequirements: PasswordStrengthRequirement[] = [
  {
    label: "At least 8 characters",
    validator: (password) => password.length >= 8,
  },
  {
    label: "At least one lowercase letter",
    validator: (password) => /[a-z]/.test(password),
  },
  {
    label: "At least one uppercase letter",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    label: "At least one number",
    validator: (password) => /\d/.test(password),
  },
  {
    label: "At least one special character",
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
]

const defaultStrengthLabels = {
  empty: "Empty",
  weak: "Weak",
  fair: "Fair",
  good: "Good",
  strong: "Strong",
}

const defaultStrengthThresholds = {
  empty: 0,
  weak: 1,
  fair: 40,
  good: 70,
  strong: 90,
}

const defaultTheme: StrengthMeterTheme = {
  container: "space-y-3",
  inputContainer: "relative",
  input: "pr-20 border-border focus:border-primary focus:ring-primary/20 bg-background text-foreground",
  meterContainer: "w-full h-2 rounded-full bg-muted flex gap-1 overflow-hidden",
  meterSegment: "h-full rounded-sm transition-all duration-300 ease-in-out flex-1",
  strengthText: "text-sm font-medium",
  requirementsContainer: "space-y-2",
  requirementItem: "flex items-center gap-2 text-sm",
  requirementIcon: "h-4 w-4 flex-shrink-0",
  requirementText: "text-muted-foreground",
  strengthColors: {
    empty: "bg-transparent",
    weak: "bg-red-500 dark:bg-red-600",
    fair: "bg-amber-500 dark:bg-amber-600",
    good: "bg-blue-500 dark:bg-blue-600",
    strong: "bg-emerald-500 dark:bg-emerald-600"
  }
}

export function PasswordStrengthMeter({
  value = "",
  onValueChange,
  showText = true,
  showRequirements = true,
  segments = 4,
  strengthThresholds = defaultStrengthThresholds,
  requirements = defaultRequirements,
  customCalculateStrength,
  showPasswordToggle = true,
  strengthLabels = defaultStrengthLabels,
  className,
  meterClassName,
  inputClassName,
  placeholder = "Enter password",
  enableAutoGenerate = false,
  autoGenerateLength = 10,
  theme,
  ...props
}: PasswordStrengthMeterProps) {
  const [password, setPassword] = React.useState(value)
  const [showPassword, setShowPassword] = React.useState(false)

  const appliedTheme = { ...defaultTheme, ...theme }

  React.useEffect(() => {
    setPassword(value)
  }, [value])

  const generateStrongPassword = (length: number = autoGenerateLength): string => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const specialChars = '!@#$%^&*(),.?":{}|<>'

    const allChars = lowercase + uppercase + numbers + specialChars

    let password = ''

    password += lowercase[Math.floor(Math.random() * lowercase.length)]
    password += uppercase[Math.floor(Math.random() * uppercase.length)]
    password += numbers[Math.floor(Math.random() * numbers.length)]
    password += specialChars[Math.floor(Math.random() * specialChars.length)]

    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)]
    }

    return password.split('').sort(() => Math.random() - 0.5).join('')
  }

  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword(autoGenerateLength)
    setPassword(newPassword)
    onValueChange?.(newPassword)
  }

  const calculateBaseStrength = (password: string): number => {
    if (!password) return 0

    let score = 0
    let passedRequirements = 0

    requirements.forEach((requirement) => {
      if (requirement.validator(password)) {
        passedRequirements++
      }
    })

    score = (passedRequirements / requirements.length) * 100

    if (password.length > 12) score += 10
    if (password.length > 16) score += 10
    if (/[!@#$%^&*(),.?":{}|<>]{2,}/.test(password)) score += 10

    return Math.min(score, 100)
  }

  const calculateStrength = customCalculateStrength || calculateBaseStrength
  const strengthScore = calculateStrength(password)

  const getStrengthLevel = (): StrengthLevel => {
    if (strengthScore >= strengthThresholds.strong) return "strong"
    if (strengthScore >= strengthThresholds.good) return "good"
    if (strengthScore >= strengthThresholds.fair) return "fair"
    if (strengthScore >= strengthThresholds.weak) return "weak"
    return "empty"
  }

  const strengthLevel = getStrengthLevel()

  const getSegmentStrength = (index: number): StrengthLevel => {
    const segmentThreshold = (index + 1) * (100 / segments)

    if (strengthScore >= segmentThreshold) {
      if (strengthLevel === "strong") return "strong"
      if (strengthLevel === "good") return "good"
      if (strengthLevel === "fair") return "fair"
      if (strengthLevel === "weak") return "weak"
    }

    return "empty"
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setPassword(newValue)
    onValueChange?.(newValue)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const getPassedRequirements = (): PasswordStrengthRequirement[] => {
    return requirements.filter((requirement) => requirement.validator(password))
  }

  const getStrengthColor = (): string => {
    if (!appliedTheme.strengthColors) {
      switch (strengthLevel) {
        case "strong": return "text-emerald-500"
        case "good": return "text-blue-500"
        case "fair": return "text-amber-500"
        case "weak": return "text-red-500"
        default: return "text-muted-foreground"
      }
    }

    switch (strengthLevel) {
      case "strong": return "text-emerald-500 dark:text-emerald-400"
      case "good": return "text-blue-500 dark:text-blue-400"
      case "fair": return "text-amber-500 dark:text-amber-400"
      case "weak": return "text-red-500 dark:text-red-400"
      default: return "text-muted-foreground"
    }
  }

  const getSegmentColor = (segmentStrength: StrengthLevel): string => {
    return appliedTheme.strengthColors?.[segmentStrength] || appliedTheme.strengthColors?.empty || "bg-transparent"
  }

  return (
    <div className={cn(appliedTheme.container, className)} {...props}>
      <div className={cn(appliedTheme.inputContainer)}>
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleChange}
          className={cn(appliedTheme.input, inputClassName)}
          placeholder={placeholder}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {enableAutoGenerate && (
            <button
              type="button"
              onClick={handleGeneratePassword}
              aria-label="Generate strong password"
              title="Generate strong password"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          {showPasswordToggle && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>

      <div className={cn(appliedTheme.meterContainer, meterClassName)}>
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={cn(
              appliedTheme.meterSegment,
              getSegmentColor(getSegmentStrength(i))
            )}
            style={{
              transitionDelay: `${i * 75}ms`,
            }}
          />
        ))}
      </div>

      {showText && password && (
        <div className="flex items-center">
          <span className={cn(appliedTheme.strengthText, getStrengthColor())}>
            {strengthLabels[strengthLevel]}
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            {getPassedRequirements().length} of {requirements.length} requirements met
          </span>
        </div>
      )}

      {showRequirements && (
        <div className={cn(appliedTheme.requirementsContainer)}>
          {enableAutoGenerate && (
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 gap-4">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Auto-generate strong password
                </span>
              </div>
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900 dark:hover:bg-blue-800 rounded-md transition-colors"
              >
                Generate
              </button>
            </div>
          )}
          <ul className="space-y-2">
            {requirements.map((requirement, index) => {
              const passed = requirement.validator(password)
              return (
                <li
                  key={index}
                  className={cn(appliedTheme.requirementItem)}
                >
                  {passed ? (
                    <Check className={cn(appliedTheme.requirementIcon, "text-emerald-500 dark:text-emerald-400")} />
                  ) : (
                    <X className={cn(appliedTheme.requirementIcon, "text-muted-foreground")} />
                  )}
                  <span className={cn(
                    appliedTheme.requirementText,
                    passed ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {requirement.label}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}