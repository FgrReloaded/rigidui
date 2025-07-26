/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useContext, createContext, useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronLeft, ChevronRight, LoaderCircle, Circle } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useForm, UseFormReturn, DefaultValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

type FormData = Record<string, unknown>

interface MultiStepFormContextType<T extends FormData = FormData> {
  currentStep: number
  totalSteps: number
  formData: T
  updateFormData: (stepData: Partial<T>) => void
  goToNextStep: () => Promise<void>
  goToPrevStep: () => void
  goToStep: (step: number) => void
  resetForm: () => void
  isFirstStep: boolean
  isLastStep: boolean
  isComplete: boolean
  isLoading: boolean
  form: UseFormReturn<T>
  getProgressPercentage: () => number
  stepErrors: Record<number, string>
}

const MultiStepFormContext = createContext<MultiStepFormContextType<any> | undefined>(undefined)

export function useMultiStepForm<T extends FormData = FormData>() {
  const context = useContext(MultiStepFormContext) as MultiStepFormContextType<T>
  if (!context) {
    throw new Error("useMultiStepForm must be used within a MultiStepFormWrapper")
  }
  return context
}

export interface StepProps<T extends FormData = FormData> {
  children: React.ReactNode
  title?: string
  description?: string
  validate?: (data: T) => Promise<boolean> | boolean
  schema?: z.ZodObject<any>
  canSkip?: boolean
  isOptional?: boolean
  validationMessage?: string
  onEnter?: (data: T) => void
  onExit?: (data: T) => void
}

export interface MultiStepFormWrapperProps<T extends FormData = FormData> {
  children: React.ReactNode
  className?: string
  onComplete?: (data: T) => void
  initialData?: Partial<T>
  showStepIndicator?: boolean
  showStepTitle?: boolean
  allowSkipSteps?: boolean
  navigationPosition?: 'bottom' | 'top'
  nextButtonText?: string
  prevButtonText?: string
  completeButtonText?: string
  onStepChange?: (prevStep: number, nextStep: number) => void
  schema?: z.ZodType<T>
  persistKey?: string
  onStepValidationError?: (step: number, errors: any) => void
  showProgressBar?: boolean
  allowStepReset?: boolean
  autoSave?: boolean
  autoSaveDelay?: number
  transitionDuration?: number
  animateStepChange?: boolean
}

export function Step<T extends FormData = FormData>({ children }: StepProps<T>): React.ReactNode {
  return <>{children}</>
}

export function MultiStepFormWrapper<T extends FormData = FormData>({
  children,
  className,
  onComplete,
  initialData = {} as Partial<T>,
  showStepIndicator = true,
  showStepTitle = true,
  allowSkipSteps = false,
  navigationPosition = 'bottom',
  nextButtonText = "Next",
  prevButtonText = "Back",
  completeButtonText = "Complete",
  onStepChange,
  schema,
  persistKey,
  onStepValidationError,
  showProgressBar = false,
  allowStepReset = false,
  autoSave = false,
  autoSaveDelay = 1000,
  transitionDuration = 300,
  animateStepChange = true,
}: MultiStepFormWrapperProps<T>): React.ReactNode {

  const steps = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Step
  ) as React.ReactElement<StepProps<T>>[]

  const prepareDefaultValues = useCallback((initialData: Partial<T>, schema?: z.ZodType<T>): DefaultValues<T> => {
    const defaultValues = { ...initialData } as Record<string, any>;

    if (schema && 'shape' in schema) {
      const shapes = (schema as any).shape;
      Object.keys(shapes).forEach(key => {
        if (defaultValues[key] === undefined) {
          defaultValues[key] = '';
        }
      });
    }

    return defaultValues as DefaultValues<T>;
  }, [])

  const [currentStep, setCurrentStep] = useState<number>(0)
  const [formData, setFormData] = useState<T>(initialData as T)
  const [isValidating, setIsValidating] = useState<boolean>(false)
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [stepErrors, setStepErrors] = useState<Record<number, string>>({})

  const form = useForm<T>({
    defaultValues: prepareDefaultValues(initialData, schema),
    // @ts-ignore // TODO: fix this
    resolver: schema ? zodResolver(schema) : undefined, 
    mode: "onChange"
  })

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1
  const CurrentStepComponent = steps[currentStep]
  const { title, description, schema: stepSchema, onEnter, onExit } = CurrentStepComponent?.props || {}

  React.useEffect(() => {
    if (!autoSave || !persistKey) return

    const handler = setTimeout(() => {
      try {
        localStorage.setItem(persistKey, JSON.stringify(formData))
      } catch (error) {
        console.warn('Failed to save form data to localStorage:', error)
      }
    }, autoSaveDelay)

    return () => clearTimeout(handler)
  }, [formData, autoSave, persistKey, autoSaveDelay])

  React.useEffect(() => {
    if (!persistKey) return

    try {
      const savedData = localStorage.getItem(persistKey)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        setFormData(prevData => ({ ...prevData, ...parsedData }))

        Object.entries(parsedData).forEach(([key, value]) => {
          form.setValue(key as any, value as any)
        })
      }
    } catch (error) {
      console.warn('Failed to load form data from localStorage:', error)
    }
  }, [persistKey, form])

  React.useEffect(() => {
    if (onEnter) {
      onEnter(formData)
    }

    return () => {
      if (onExit) {
        onExit(formData)
      }
    }
  }, [currentStep, formData, onEnter, onExit])

  React.useEffect(() => {
    if (stepSchema) {
      form.clearErrors();
    }
  }, [currentStep, form, stepSchema])

  const updateFormData = useCallback((stepData: Partial<T>): void => {
    setFormData((prev) => {
      const newData = { ...prev, ...stepData };
      return newData;
    });

    Object.entries(stepData).forEach(([key, value]) => {
      form.setValue(key as any, value as any);
    });
  }, [form])

  const resetForm = useCallback((): void => {
    setCurrentStep(0);
    setFormData(initialData as T);
    setIsComplete(false);
    setStepErrors({});
    form.reset(prepareDefaultValues(initialData, schema));

    if (persistKey) {
      try {
        localStorage.removeItem(persistKey);
      } catch (error) {
        console.warn('Failed to clear persisted form data:', error);
      }
    }
  }, [initialData, schema, form, persistKey, prepareDefaultValues]);

  const getProgressPercentage = useCallback((): number => {
    return Math.round(((currentStep + 1) / steps.length) * 100);
  }, [currentStep, steps.length]);

  const goToNextStep = useCallback(async (): Promise<void> => {
    const validate = CurrentStepComponent?.props.validate
    const stepSchema = CurrentStepComponent?.props.schema
    const canSkip = CurrentStepComponent?.props.canSkip || false

    setStepErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[currentStep]
      return newErrors
    })

    // Always sync form data before validation
    const currentFormValues = form.getValues()
    updateFormData(currentFormValues)

    if (stepSchema && !canSkip) {
      setIsValidating(true)
      try {
        const stepFields = Object.keys(stepSchema.shape)
        const result = await form.trigger(stepFields as any)
        if (!result) {
          const formErrors = form.formState.errors
          const errorMessage = CurrentStepComponent?.props.validationMessage || 'Please fix the validation errors'
          setStepErrors(prev => ({ ...prev, [currentStep]: errorMessage }))
          onStepValidationError?.(currentStep, formErrors)
          return
        }
      } catch (error) {
        console.error("Step schema validation error:", error)
        setStepErrors(prev => ({ ...prev, [currentStep]: 'Validation failed' }))
        return
      } finally {
        setIsValidating(false)
      }
    } else if (validate && !canSkip) {
      setIsValidating(true)
      try {
        const isValid = await validate({ ...formData, ...currentFormValues })
        if (!isValid) {
          const errorMessage = CurrentStepComponent?.props.validationMessage || 'Validation failed'
          setStepErrors(prev => ({ ...prev, [currentStep]: errorMessage }))
          return
        }
      } catch (error) {
        console.error("Validation error:", error)
        setStepErrors(prev => ({ ...prev, [currentStep]: 'Validation failed' }))
        return
      } finally {
        setIsValidating(false)
      }
    }

    if (isLastStep) {
      if (schema) {
        const isValid = await form.trigger()
        if (!isValid) return
      }

      setIsComplete(true)
      setIsLoading(true)
      try {
        const finalData = { ...formData, ...currentFormValues }
        await onComplete?.(finalData as T)
      } catch (error) {
        console.error("Error in onComplete callback:", error)
        setStepErrors(prev => ({ ...prev, [currentStep]: 'Failed to complete form submission' }))
        setIsComplete(false)
        return
      } finally {
        setIsLoading(false)
      }
      return
    }

    const prevStep = currentStep
    const nextStep = currentStep + 1
    setCurrentStep(nextStep)
    onStepChange?.(prevStep, nextStep)
  }, [currentStep, formData, isLastStep, CurrentStepComponent?.props, form, onComplete, onStepChange, schema, updateFormData, onStepValidationError])

  const goToPrevStep = useCallback((): void => {
    if (isFirstStep) return

    const prevStep = currentStep
    const nextStep = currentStep - 1
    setCurrentStep(nextStep)
    onStepChange?.(prevStep, nextStep)
  }, [currentStep, isFirstStep, onStepChange])

  const goToStep = useCallback((step: number): void => {
    if (step < 0 || step >= steps.length || (!allowSkipSteps && step > currentStep)) return

    const prevStep = currentStep
    setCurrentStep(step)
    onStepChange?.(prevStep, step)
  }, [allowSkipSteps, currentStep, steps.length, onStepChange])

  const renderNavigation = (): React.ReactNode => (
    <div className="flex justify-between items-center mt-6">
      <Button
        variant="ghost"
        onClick={goToPrevStep}
        disabled={isFirstStep || isValidating}
        className={cn("gap-1", isFirstStep && "invisible")}
      >
        <ChevronLeft size={16} />
        {prevButtonText}
      </Button>

      <Button
        onClick={() => void goToNextStep()}
        disabled={isValidating}
        className="gap-1"
      >
        {isValidating ? (
          <LoaderCircle size={16} className="animate-spin mr-2" />
        ) : isLastStep ? (
          completeButtonText
        ) : (
          <>
            {nextButtonText}
            <ChevronRight size={16} />
          </>
        )}
      </Button>
    </div>
  )

  const renderStepIndicators = (): React.ReactNode => (
    <div className="flex justify-center items-center mb-6">
      {steps.map((_, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div
              className={cn(
                "h-[2px] w-8 mx-1 transition-colors",
                index <= currentStep ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
              )}
            />
          )}
          <div
            className={cn(
              "flex items-center justify-center transition-all",
              allowSkipSteps && "cursor-pointer hover:scale-110"
            )}
            onClick={() => allowSkipSteps && goToStep(index)}
            role={allowSkipSteps ? "button" : undefined}
            tabIndex={allowSkipSteps ? 0 : undefined}
            aria-label={allowSkipSteps ? `Go to step ${index + 1}` : undefined}
          >
            {index < currentStep ? (
              <CheckCircle2 size={24} className="text-primary fill-primary/10" />
            ) : index === currentStep ? (
              <div className="rounded-full border-2 border-primary p-1 w-6 h-6 flex items-center justify-center">
                <span className="text-xs font-medium">{index + 1}</span>
              </div>
            ) : (
              <Circle size={24} className="text-gray-300 dark:text-gray-700" />
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  )

  const contextValue = React.useMemo(() => ({
    currentStep,
    totalSteps: steps.length,
    formData,
    updateFormData,
    goToNextStep,
    goToPrevStep,
    goToStep,
    resetForm,
    isFirstStep,
    isLastStep,
    isComplete,
    isLoading: isValidating || isLoading,
    form,
    getProgressPercentage,
    stepErrors,
  }), [
    currentStep,
    steps.length,
    formData,
    updateFormData,
    goToNextStep,
    goToPrevStep,
    goToStep,
    resetForm,
    isFirstStep,
    isLastStep,
    isComplete,
    isValidating,
    isLoading,
    form,
    getProgressPercentage,
    stepErrors,
  ])

  return (
    <div className={cn("max-w-2xl mx-auto", className)}>
      <MultiStepFormContext.Provider value={contextValue}>
        {showStepIndicator && renderStepIndicators()}

        {showProgressBar && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{getProgressPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        )}

        {stepErrors[currentStep] && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-700 dark:text-red-400 text-sm">{stepErrors[currentStep]}</p>
          </div>
        )}

        {showStepTitle && (title || description) && (
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                {title && <h2 className="text-2xl font-bold dark:text-white">{title}</h2>}
                {description && <p className="text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
              </div>
              {allowStepReset && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        )}

        {navigationPosition === 'top' && renderNavigation()}

        <div
          className={cn(
            "mt-4 mb-4",
            animateStepChange && "transition-all duration-300 ease-in-out"
          )}
          style={{
            transitionDuration: animateStepChange ? `${transitionDuration}ms` : undefined
          }}
        >
          {CurrentStepComponent}
        </div>

        {navigationPosition === 'bottom' && renderNavigation()}
      </MultiStepFormContext.Provider>
    </div>
  )
}
