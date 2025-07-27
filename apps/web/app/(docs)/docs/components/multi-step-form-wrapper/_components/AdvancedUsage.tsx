import React from "react"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
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
} from "@/registry/new-york/multi-step-form-wrapper/multi-step-form-wrapper"

const basicInfoSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
})

const messageSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(5, { message: "Message is too short" }),
})

const basicFormSchema = z.object({
  ...basicInfoSchema.shape,
  ...messageSchema.shape,
})

type BasicFormValues = z.infer<typeof basicFormSchema>

function BasicInfoStep() {
  const { form } = useMultiStepForm<BasicFormValues>()

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
                <Input {...field} placeholder="Enter your name" />
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
                <Input {...field} type="email" placeholder="Enter your email" />
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
  const { form } = useMultiStepForm<BasicFormValues>()

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
                <Input {...field} placeholder="Message subject" />
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
                  className="min-h-[80px]"
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

// Advanced Examples
const advancedFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(1, "City is required"),
  preferences: z.array(z.string()).min(1, "Select at least one preference"),
  subscription: z.enum(["basic", "premium", "enterprise"]),
  marketing: z.boolean().optional(),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
})

type AdvancedFormValues = z.infer<typeof advancedFormSchema>

function PersonalInfoStep() {
  const { form } = useMultiStepForm<AdvancedFormValues>()

  return (
    <Form {...form}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="john@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="+1 (555) 123-4567" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}

function AddressStep() {
  const { form } = useMultiStepForm<AdvancedFormValues>()

  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="123 Main Street" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} placeholder="New York" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}

function PreferencesStep() {
  const { form } = useMultiStepForm<AdvancedFormValues>()

  const preferences = [
    { id: "newsletter", label: "Email Newsletter" },
    { id: "updates", label: "Product Updates" },
    { id: "offers", label: "Special Offers" },
    { id: "events", label: "Event Notifications" },
  ]

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="preferences"
          render={() => (
            <FormItem>
              <FormLabel>Communication Preferences</FormLabel>
              <div className="space-y-3">
                {preferences.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="preferences"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const value = field.value || []
                              if (checked) {
                                field.onChange([...value, item.id])
                              } else {
                                field.onChange(value.filter((v) => v !== item.id))
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subscription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subscription Plan</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic">Basic - Free</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium">Premium - $9.99/month</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="enterprise" id="enterprise" />
                    <Label htmlFor="enterprise">Enterprise - $29.99/month</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}

function FinalStep() {
  const { form } = useMultiStepForm<AdvancedFormValues>()

  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="marketing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to receive marketing communications
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I accept the terms and conditions *
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}

export const advancedUsageExamples = [
  {
    title: "Basic Multi-Step Form",
    description: "A simple two-step form with validation and progress tracking.",
    code: `import { MultiStepFormWrapper, Step } from "@/components/multi-step-form-wrapper"

export default function BasicExample() {
  return (
    <MultiStepFormWrapper
      onComplete={(data) => console.log('Form completed:', data)}
      schema={formSchema}
    >
      <Step title="Basic Info" schema={basicInfoSchema}>
        <BasicInfoStep />
      </Step>
      <Step title="Message" schema={messageSchema}>
        <MessageStep />
      </Step>
    </MultiStepFormWrapper>
  )
}`,
    component: (
      <div className="max-w-md">
        <MultiStepFormWrapper<BasicFormValues>
          onComplete={(data) => console.log('Basic form completed:', data)}
          schema={basicFormSchema}
          className="border rounded-lg p-4"
        >
          <Step title="Basic Info" schema={basicInfoSchema}>
            <BasicInfoStep />
          </Step>
          <Step title="Message" schema={messageSchema}>
            <MessageStep />
          </Step>
        </MultiStepFormWrapper>
      </div>
    ),
  },
  {
    title: "Form with Progress Bar",
    description: "Multi-step form with a progress bar and custom navigation positioning.",
    code: `<MultiStepFormWrapper
  showProgressBar={true}
  navigationPosition="top"
  onComplete={handleComplete}
>
  <Step title="Personal Info">
    <PersonalInfoStep />
  </Step>
  <Step title="Address">
    <AddressStep />
  </Step>
</MultiStepFormWrapper>`,
    component: (
      <div className="max-w-md">
        <MultiStepFormWrapper<AdvancedFormValues>
          showProgressBar={true}
          navigationPosition="top"
          onComplete={(data) => console.log('Progress form completed:', data)}
          schema={advancedFormSchema}
          className="border rounded-lg p-4"
        >
          <Step title="Personal Info" schema={advancedFormSchema.pick({ firstName: true, lastName: true, email: true, phone: true })}>
            <PersonalInfoStep />
          </Step>
          <Step title="Address" schema={advancedFormSchema.pick({ address: true, city: true })}>
            <AddressStep />
          </Step>
        </MultiStepFormWrapper>
      </div>
    ),
  },
  {
    title: "Form with Step Skipping",
    description: "Allow users to skip between steps and reset the form.",
    code: `<MultiStepFormWrapper
  allowSkipSteps={true}
  allowStepReset={true}
  showProgressBar={true}
  onComplete={handleComplete}
>
  <Step title="Personal" canSkip={true}>
    <PersonalInfoStep />
  </Step>
  <Step title="Preferences" canSkip={true}>
    <PreferencesStep />
  </Step>
</MultiStepFormWrapper>`,
    component: (
      <div className="max-w-md">
        <MultiStepFormWrapper<AdvancedFormValues>
          allowSkipSteps={true}
          allowStepReset={true}
          showProgressBar={true}
          onComplete={(data) => console.log('Skippable form completed:', data)}
          schema={advancedFormSchema}
          className="border rounded-lg p-4"
        >
          <Step title="Personal" canSkip={true} schema={advancedFormSchema.pick({ firstName: true, lastName: true, email: true, phone: true })}>
            <PersonalInfoStep />
          </Step>
          <Step title="Preferences" canSkip={true} schema={advancedFormSchema.pick({ preferences: true, subscription: true })}>
            <PreferencesStep />
          </Step>
        </MultiStepFormWrapper>
      </div>
    ),
  },
  {
    title: "Form with Auto-Save",
    description: "Automatically save form data to localStorage with custom validation messages.",
    code: `<MultiStepFormWrapper
  autoSave={true}
  persistKey="registration-form"
  autoSaveDelay={500}
  onStepValidationError={(step, errors) => {
    console.log('Validation error on step', step, errors)
  }}
>
  <Step
    title="Personal Info"
    validationMessage="Please fill in all required personal information"
  >
    <PersonalInfoStep />
  </Step>
  <Step
    title="Final Step"
    validationMessage="Please accept the terms to continue"
  >
    <FinalStep />
  </Step>
</MultiStepFormWrapper>`,
    component: (
      <div className="max-w-md">
        <MultiStepFormWrapper<AdvancedFormValues>
          autoSave={true}
          persistKey="demo-registration-form"
          autoSaveDelay={500}
          onStepValidationError={(step, errors) => {
            console.log('Validation error on step', step, errors)
          }}
          schema={advancedFormSchema}
          className="border rounded-lg p-4"
        >
          <Step
            title="Personal Info"
            validationMessage="Please fill in all required personal information"
            schema={advancedFormSchema.pick({ firstName: true, lastName: true, email: true, phone: true })}
          >
            <PersonalInfoStep />
          </Step>
          <Step
            title="Final Step"
            validationMessage="Please accept the terms to continue"
            schema={advancedFormSchema.pick({ marketing: true, terms: true })}
          >
            <FinalStep />
          </Step>
        </MultiStepFormWrapper>
      </div>
    ),
  },
  {
    title: "Complete Registration Form",
    description: "A comprehensive example with all features enabled.",
    code: `<MultiStepFormWrapper
  showProgressBar={true}
  allowStepReset={true}
  autoSave={true}
  persistKey="full-registration"
  animateStepChange={true}
  transitionDuration={400}
  nextButtonText="Continue"
  completeButtonText="Register"
  onComplete={handleRegistration}
  onStepChange={(prev, next) => {
    console.log(\`Moving from step \${prev} to \${next}\`)
  }}
>
  <Step title="Personal Information">
    <PersonalInfoStep />
  </Step>
  <Step title="Address Details">
    <AddressStep />
  </Step>
  <Step title="Preferences">
    <PreferencesStep />
  </Step>
  <Step title="Terms & Conditions">
    <FinalStep />
  </Step>
</MultiStepFormWrapper>`,
    component: (
      <div className="max-w-md">
        <MultiStepFormWrapper<AdvancedFormValues>
          showProgressBar={true}
          allowStepReset={true}
          autoSave={true}
          persistKey="demo-full-registration"
          animateStepChange={true}
          transitionDuration={400}
          nextButtonText="Continue"
          completeButtonText="Register"
          onComplete={(data) => console.log('Full registration completed:', data)}
          onStepChange={(prev, next) => {
            console.log(`Moving from step ${prev} to ${next}`)
          }}
          schema={advancedFormSchema}
          className="border rounded-lg p-4"
        >
          <Step title="Personal Information" schema={advancedFormSchema.pick({ firstName: true, lastName: true, email: true, phone: true })}>
            <PersonalInfoStep />
          </Step>
          <Step title="Address Details" schema={advancedFormSchema.pick({ address: true, city: true })}>
            <AddressStep />
          </Step>
          <Step title="Preferences" schema={advancedFormSchema.pick({ preferences: true, subscription: true })}>
            <PreferencesStep />
          </Step>
          <Step title="Terms & Conditions" schema={advancedFormSchema.pick({ marketing: true, terms: true })}>
            <FinalStep />
          </Step>
        </MultiStepFormWrapper>
      </div>
    ),
  },
];
