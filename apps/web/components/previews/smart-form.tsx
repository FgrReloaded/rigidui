"use client"
import React from 'react'
import { ConditionalField, SmartForm, SmartFormField } from '@/registry/new-york/smart-form/smart-form'
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
  return (
    <div className="w-full flex justify-center items-center">

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
    </div>
  )
}