"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { MultiStepFormWrapper, Step, useMultiStepForm } from "@/registry/new-york/multi-step-form-wrapper/multi-step-form-wrapper"

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

export default function MultiStepFormPreview() {
  const [, setResult] = useState<FormValues | null>(null)

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
                <Textarea
                  {...field}
                  placeholder="Type your message here"
                  className="w-full p-2 text-sm border rounded min-h-[80px]"
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
