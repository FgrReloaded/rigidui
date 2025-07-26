"use client"

import ComponentDocTemplate from "@/app/docs/_components/ComponentDocTemplate"
import { MultiStepFormDemo } from "@/registry/new-york/multi-step-form-wrapper/multi-step-form-wrapper-demo"
import { advancedUsageExamples } from "./_components/AdvancedUsage"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "../../_components/CodeBlock"

export default function MultiStepFormWrapperPage() {
  const propsData = [
    {
      name: 'children',
      type: 'React.ReactNode',
      defaultValue: '-',
      description: 'Step components to render within the form',
      required: true,
    },
    {
      name: 'onComplete',
      type: '(data: FormData) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when the form is completed',
    },
    {
      name: 'initialData',
      type: 'Record<string, unknown>',
      defaultValue: '{}',
      description: 'Initial data for the form',
    },
    {
      name: 'schema',
      type: 'ZodSchema',
      defaultValue: 'undefined',
      description: 'Zod schema for overall form validation',
    },

    {
      name: 'className',
      type: 'string',
      defaultValue: "''",
      description: 'Additional class names for styling',
    },
    {
      name: 'showStepIndicator',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether to show the step indicator',
    },
    {
      name: 'showStepTitle',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether to show the step title and description',
    },
    {
      name: 'showProgressBar',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to show progress bar with percentage',
    },

    {
      name: 'allowSkipSteps',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to allow skipping to other steps',
    },
    {
      name: 'navigationPosition',
      type: "'bottom' | 'top'",
      defaultValue: "'bottom'",
      description: 'Position of the navigation buttons',
    },
    {
      name: 'nextButtonText',
      type: 'string',
      defaultValue: '"Next"',
      description: 'Text for the next button',
    },
    {
      name: 'prevButtonText',
      type: 'string',
      defaultValue: '"Back"',
      description: 'Text for the previous button',
    },
    {
      name: 'completeButtonText',
      type: 'string',
      defaultValue: '"Complete"',
      description: 'Text for the complete button',
    },
    {
      name: 'allowStepReset',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to show a reset button to go back to first step',
    },

    {
      name: 'onStepChange',
      type: '(prevStep: number, nextStep: number) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when the step changes',
    },
    {
      name: 'onStepValidationError',
      type: '(step: number, errors: FieldErrors) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when step validation fails',
    },

    // Persistence & Auto-save
    {
      name: 'persistKey',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Key for localStorage persistence of form data',
    },
    {
      name: 'autoSave',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to automatically save form data to localStorage',
    },
    {
      name: 'autoSaveDelay',
      type: 'number',
      defaultValue: '1000',
      description: 'Delay in milliseconds for auto-save debouncing',
    },

    {
      name: 'animateStepChange',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether to animate step transitions',
    },
    {
      name: 'transitionDuration',
      type: 'number',
      defaultValue: '300',
      description: 'Duration of step transition animations in milliseconds',
    },
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Step-by-Step Form Flow",
      description: "Guide users through complex forms with a clear step-by-step interface and visual progress tracking."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Advanced Validation",
      description: "Comprehensive step-by-step validation with Zod schemas, custom error messages, and validation error callbacks."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Auto-Save & Persistence",
      description: "Automatically save form progress to localStorage with configurable debouncing and persistent form state."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Smooth Animations",
      description: "Beautiful step transitions with configurable animation duration and seamless user experience."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: "Flexible Configuration",
      description: "Highly customizable with step lifecycle hooks, optional steps, progress bars, and accessibility features."
    }
  ]

  const bestPractices = [
    {
      type: 'do' as const,
      items: [
        'Break complex forms into logical step groups',
        'Provide clear titles and descriptions for each step',
        'Use progress indicators to help users understand their location',
        'Implement proper validation with meaningful error messages',
        'Enable auto-save for forms with sensitive or time-consuming data',
        'Use step lifecycle hooks (onEnter/onExit) for complex logic',
        'Mark optional steps clearly when using canSkip functionality',
        'Provide accessible navigation and step indicators',
      ]
    },
    {
      type: 'dont' as const,
      items: [
        'Create too many steps that might overwhelm users',
        'Put unrelated fields in the same step',
        'Hide important validation errors or progress information',
        'Force users to complete optional steps unnecessarily',
        'Use auto-save without informing users about data persistence',
        'Skip accessibility considerations for keyboard navigation',
        'Ignore step validation errors without proper user feedback',
        'Use overly fast animations that might cause motion sickness',
      ]
    }
  ]

  const usageCode = `"use client"

import React, { useState } from "react"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  MultiStepFormWrapper,
  Step,
  useMultiStepForm
} from "@/components/multi-step-form-wrapper"

const basicInfoSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
})

const messageSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(5, { message: "Message is too short" }),
})

const formSchema = z.object({
  ...basicInfoSchema.shape,
  ...messageSchema.shape,
})

type FormValues = z.infer<typeof formSchema>

export function MultiStepFormDemo() {
  const [result, setResult] = useState<FormValues | null>(null)

  const initialValues: Partial<FormValues> = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const handleComplete = (data: FormValues) => {
    setResult(data)
    toast.success("Form submitted!")
  }

  return (
    <div className="max-w-sm mx-auto">
      <MultiStepFormWrapper
        onComplete={handleComplete}
        completeButtonText="Submit"
        className="border rounded p-4"
        schema={formSchema}
        initialData={initialValues}
      >
        <Step
          title="Basic Info"
          schema={basicInfoSchema}
        >
          <BasicInfoStep />
        </Step>
        <Step
          title="Message"
          schema={messageSchema}
        >
          <MessageStep />
        </Step>
      </MultiStepFormWrapper>
    </div>
  );
}

function BasicInfoStep() {
  const { form } = useMultiStepForm<FormValues>()

  return (
    <Form {...form}>
      <div className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}

function MessageStep() {
  const { form } = useMultiStepForm<FormValues>()

  return (
    <Form {...form}>
      <div className="space-y-3">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Message subject"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder="Type your message here"
                  className="w-full p-2 text-sm border rounded min-h-[80px] dark:bg-gray-800"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}
  `


  return (
    <ComponentDocTemplate
      title="Multi-Step Form Wrapper"
      description="A comprehensive multi-step form wrapper component that breaks complex forms into manageable steps with advanced features like auto-save, validation, and animations."
      previewComponent={<MultiStepFormDemo />}
      githubPath="registry/new-york/multi-step-form-wrapper/multi-step-form-wrapper.tsx"
      usageCode={usageCode}
      usageDescription="The Multi-Step Form Wrapper component simplifies the creation of step-by-step forms with validation and progress tracking."
      propsData={propsData}
      features={features}
      bestPractices={bestPractices}
      componentName="https://rigidui.com/registry/multi-step-form-wrapper"
      additionalSections={
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <svg className="h-7 w-7 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
            </svg>
            <h2 id="advanced-usage" className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white">Advanced Usage</h2>
          </div>
          <p className="md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
            Explore different configurations and use cases for the Multi-Step Form Wrapper component.
          </p>

          <div className="space-y-12">
            {advancedUsageExamples.map((example, index) => (
              <div key={index} className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {example.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {example.description}
                  </p>
                </div>

                <div className="bg-white dark:bg-background rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <Tabs defaultValue="preview" className="w-full">
                    <TabsList className="flex justify-start border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/70">
                      <TabsTrigger
                        value="preview"
                        className="px-6 py-1 text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 transition-all duration-200"
                      >
                        Preview
                      </TabsTrigger>
                      <TabsTrigger
                        value="code"
                        className="px-6 py-1 text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 transition-all duration-200"
                      >
                        Code
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="px-8  flex flex-col justify-start">
                      <div className="mb-4 mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">Live Preview</div>
                      {example.component}
                    </TabsContent>
                    <TabsContent value="code" className="max-h-[500px] overflow-auto">
                      <CodeBlock
                        code={example.code}
                        language='typescript'
                        filename={`${example.title.replace(/\s+/g, '')}.tsx`}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            ))}
          </div>
        </section>
      }
    />
  )
}
