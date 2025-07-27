"use client"
import React from 'react'
import { ConditionalField, SmartForm, SmartFormField } from '@/registry/new-york/smart-form/smart-form'
import ComponentDocTemplate from '../../_components/ComponentDocTemplate'
import { z } from 'zod'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const demoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "user", "moderator"]),
  adminCode: z.string().optional(),
  isActive: z.boolean(),
  bio: z.string().optional(),
})

type DemoFormData = z.infer<typeof demoSchema>

const mockMutationFn = async (data: DemoFormData) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Form submitted:', data)
  return { success: true, data }
}

export default function SmartFormPage() {
  const propsData = [
    {
      name: 'schema',
      type: 'z.ZodSchema<T>',
      defaultValue: 'undefined',
      description: 'Zod schema for form validation and type safety',
      required: true,
    },
    {
      name: 'mutationFn',
      type: '(data: T) => Promise<any>',
      defaultValue: 'undefined',
      description: 'Async function to handle form submission (API call)',
      required: true,
    },
    {
      name: 'children',
      type: '(form: UseFormReturn<T>) => React.ReactNode',
      defaultValue: 'undefined',
      description: 'Render function that receives the form instance for building form fields',
      required: true,
    },
    {
      name: 'queryKey',
      type: 'string[]',
      defaultValue: '[]',
      description: 'TanStack Query key for cache invalidation after successful submission',
    },
    {
      name: 'mode',
      type: "'create' | 'edit'",
      defaultValue: "'create'",
      description: 'Form mode that affects submit button text and behavior',
    },
    {
      name: 'defaultValues',
      type: 'Partial<T>',
      defaultValue: 'undefined',
      description: 'Default values for form fields',
    },
    {
      name: 'onSuccess',
      type: '(data: any) => void',
      defaultValue: 'undefined',
      description: 'Callback function called on successful form submission',
    },
    {
      name: 'onError',
      type: '(error: Error) => void',
      defaultValue: 'undefined',
      description: 'Callback function called when form submission fails',
    },
    {
      name: 'submitText',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Custom text for submit button (overrides mode-based text)',
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: "''",
      description: 'Additional CSS classes for the form container',
    },
  ]

  const fieldPropsData = [
    {
      name: 'form',
      type: 'UseFormReturn<T>',
      defaultValue: 'undefined',
      description: 'React Hook Form instance passed from SmartForm',
      required: true,
    },
    {
      name: 'name',
      type: 'FieldPath<T>',
      defaultValue: 'undefined',
      description: 'Field name that matches the schema property',
      required: true,
    },
    {
      name: 'type',
      type: "'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'color'",
      defaultValue: 'undefined',
      description: 'Input type that determines the rendered field component',
      required: true,
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Label text displayed above the field',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Placeholder text for input fields',
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Help text displayed below the field',
    },
    {
      name: 'options',
      type: 'FormFieldOption[]',
      defaultValue: '[]',
      description: 'Options for select and radio field types',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the field is disabled',
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: "''",
      description: 'Additional CSS classes for the field container',
    },
  ]

  const formSectionPropsData = [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'undefined',
      description: 'The title text displayed for the form section',
      required: true,
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      defaultValue: 'undefined',
      description: 'Form fields and other content to display in the section',
      required: true,
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Optional description text displayed below the title',
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: "''",
      description: 'Additional CSS classes for styling the section',
    },
  ]

  const conditionalFieldPropsData = [
    {
      name: 'form',
      type: 'UseFormReturn<T>',
      defaultValue: 'undefined',
      description: 'React Hook Form instance passed from SmartForm',
      required: true,
    },
    {
      name: 'when',
      type: 'FieldPath<T>',
      defaultValue: 'undefined',
      description: 'The field name to watch for changes',
      required: true,
    },
    {
      name: 'equals',
      type: 'any',
      defaultValue: 'undefined',
      description: 'The value to compare against the watched field',
      required: true,
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      defaultValue: 'undefined',
      description: 'Content to render when the condition is met',
      required: true,
    },
  ]


  const subComponents = [
    {
      name: 'SmartForm',
      description: 'The main form component that provides form management with built-in validation, submission handling, and TanStack Query integration. It wraps the entire form and provides a render prop pattern for building form fields.',
      propsData: propsData
    },
    {
      name: 'SmartFormField',
      description: 'A versatile field component that renders different input types based on the type prop. Supports text, email, password, number, textarea, select, checkbox, radio, and color fields with automatic validation integration.',
      propsData: fieldPropsData
    },
    {
      name: 'FormSection',
      description: 'A layout component for organizing form fields into logical groups with optional titles and descriptions. Helps create well-structured forms by separating different sections of information.',
      propsData: formSectionPropsData
    },
    {
      name: 'ConditionalField',
      description: 'A utility component that conditionally renders child components based on the value of a watched form field. Useful for creating dynamic forms where certain fields appear based on user selections.',
      propsData: conditionalFieldPropsData
    }
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Zod Schema Validation",
      description: "Built-in integration with Zod for runtime type safety and comprehensive validation rules."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "TanStack Query Integration",
      description: "Seamless integration with TanStack Query for mutations, loading states, and cache invalidation."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      title: "Multiple Field Types",
      description: "Support for text, email, password, number, textarea, select, checkbox, radio, and color field types."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "TypeScript Support",
      description: "Full TypeScript support with type inference from Zod schemas for complete type safety."
    }
  ]

  const usageCode = `import { SmartForm, SmartFormField } from "@/components/smart-form"
import { z } from "zod"

const demoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "user", "moderator"]),
  adminCode: z.string().optional(),
  isActive: z.boolean(),
  bio: z.string().optional(),
})

type DemoFormData = z.infer<typeof demoSchema>


export default function MyForm() {

  const mockMutationFn = async (data: DemoFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Form submitted:', data)
    return { success: true, data }
  }

  return (
     <div className="max-w-md">

        <SmartForm
          schema={demoSchema}
          mutationFn={mockMutationFn}
          defaultValues={{
            isActive: false,
          }}
          onSuccess={(data) => {
            console.log('Success:', data)
          }}
          onError={(error) => {
            console.error('Error:', error)
          }}
        >
          {(form) => (
            <>
              <SmartFormField
                form={form}
                name="name"
                type="text"
                label="Name"
                placeholder="Enter your name"
                description="Your full name"
              />
              <SmartFormField
                form={form}
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
              />
              <SmartFormField
                form={form}
                name="role"
                type="select"
                label="Role"
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "user", label: "User" },
                  { value: "moderator", label: "Moderator" }
                ]}
              />
              <SmartFormField
                form={form}
                name="isActive"
                type="checkbox"
                label="Active user"
                description="Check if the user should be active"
              />
              <SmartFormField
                form={form}
                name="bio"
                type="textarea"
                label="Bio"
                placeholder="Tell us about yourself..."
                description="Optional biography"
              />
            </>
          )}
        </SmartForm>
      </div>
  )
}`

  const DemoComponent = () => (
    <QueryClientProvider client={new QueryClient()}>
      <div className="max-w-md">

        <SmartForm
          schema={demoSchema}
          mutationFn={mockMutationFn}
          defaultValues={{
            isActive: false,
          }}
          onSuccess={(data) => {
            console.log('Success:', data)
          }}
          onError={(error) => {
            console.error('Error:', error)
          }}
        >
          {(form) => (
            <>
              <SmartFormField
                form={form}
                name="name"
                type="text"
                label="Name"
                placeholder="Enter your name"
                description="Your full name"
              />
              <SmartFormField
                form={form}
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
              />
              <SmartFormField
                form={form}
                name="role"
                type="select"
                label="Role"
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "user", label: "User" },
                  { value: "moderator", label: "Moderator" }
                ]}
              />
              <ConditionalField form={form} when="role" equals="admin">
                <SmartFormField
                  form={form}
                  name="adminCode"
                  type="text"
                  label="Admin Code"
                  placeholder="Enter your admin code"
                  description="Required for admin users"
                />
              </ConditionalField>
              <SmartFormField
                form={form}
                name="isActive"
                type="checkbox"
                label="Active user"
                description="Check if the user should be active"
              />
              <SmartFormField
                form={form}
                name="bio"
                type="textarea"
                label="Bio"
                placeholder="Tell us about yourself..."
                description="Optional biography"
              />
            </>
          )}
        </SmartForm>
      </div>
    </QueryClientProvider>
  )

  return (
    <ComponentDocTemplate
      title="Smart Form"
      description="A powerful form component with built-in validation, mutation handling, and TypeScript support using Zod schemas and TanStack Query."
      previewComponent={<DemoComponent />}
      githubPath="registry/new-york/smart-form/smart-form.tsx"
      usageCode={usageCode}
      usageDescription="The Smart Form component combines React Hook Form, Zod validation, and TanStack Query mutations to create a complete form solution with minimal boilerplate."
      propsData={propsData}
      features={features}
      componentName="https://rigidui.com/registry/smart-form"
      subComponents={subComponents}
    />
  )
}