"use client";
import React from "react";
import { PasswordStrengthMeter } from "@/registry/new-york/strength-meter/strength-meter";
import ComponentDocTemplate from "../../_components/ComponentDocTemplate";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "../../_components/CodeBlock";
import { advancedUsageExamples } from "./_components/AdvancedUsage";

export default function StrengthMeterPage() {
  const propsData = [
    {
      name: "value",
      type: "string",
      defaultValue: "''",
      description: "The current password value",
    },
    {
      name: "onValueChange",
      type: "function",
      defaultValue: "undefined",
      description: "Function called when the password value changes",
    },
    {
      name: "showText",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to show the strength text label",
    },
    {
      name: "showRequirements",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to show the password requirements list",
    },
    {
      name: "segments",
      type: "number",
      defaultValue: "4",
      description: "Number of segments in the strength meter",
    },
    {
      name: "strengthThresholds",
      type: "Record<StrengthLevel, number>",
      defaultValue: "{ empty: 0, weak: 1, fair: 40, good: 70, strong: 90 }",
      description: "Score thresholds for each strength level",
    },
    {
      name: "requirements",
      type: "PasswordStrengthRequirement[]",
      defaultValue: "defaultRequirements",
      description: "Array of password requirements with validators",
    },
    {
      name: "customCalculateStrength",
      type: "(password: string) => number",
      defaultValue: "undefined",
      description:
        "Custom function to calculate password strength score (0-100)",
    },
    {
      name: "showPasswordToggle",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to show the password visibility toggle",
    },
    {
      name: "strengthLabels",
      type: "Record<StrengthLevel, string>",
      defaultValue:
        '{ empty: "Empty", weak: "Weak", fair: "Fair", good: "Good", strong: "Strong" }',
      description: "Custom labels for each strength level",
    },
    {
      name: "meterClassName",
      type: "string",
      defaultValue: "''",
      description: "Additional class names for the meter element",
    },
    {
      name: "inputClassName",
      type: "string",
      defaultValue: "''",
      description: "Additional class names for the input element",
    },
    {
      name: "placeholder",
      type: "string",
      defaultValue: "'Enter password'",
      description: "Placeholder text for the password input",
    },
    {
      name: "animated",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to animate the strength meter segments",
    },
    {
      name: "enableAutoGenerate",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to enable auto password generation feature",
    },
    {
      name: "autoGenerateLength",
      type: "number",
      defaultValue: "10",
      description: "Length of the auto-generated password",
    },
  ];

  const features = [
    {
      icon: (
        <svg
          className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Visual Strength Indicator",
      description:
        "Provides visual feedback on password strength with colored segments.",
    },
    {
      icon: (
        <svg
          className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
      title: "Customizable Segments",
      description:
        "Adjust the number and appearance of the strength meter segments.",
    },
    {
      icon: (
        <svg
          className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      title: "Password Requirements",
      description:
        "Shows a checklist of requirements that help users create stronger passwords.",
    },
    {
      icon: (
        <svg
          className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      title: "Password Visibility Toggle",
      description:
        "Allows users to show or hide their password with a toggle button.",
    },
    {
      icon: (
        <svg
          className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      title: "Animated Feedback",
      description:
        "Provides animated visual feedback as the user types their password.",
    },
    {
      icon: (
        <svg
          className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      title: "Auto Password Generation",
      description:
        "Generate strong, secure passwords automatically with customizable length and complexity.",
    },
  ];

  const bestPractices = [
    {
      type: "do" as const,
      items: [
        "Use clear, consistent color indicators for different strength levels",
        "Provide specific feedback on what makes a password stronger",
        "Allow users to toggle password visibility for better user experience",
        "Use animations sparingly to enhance the experience without distraction",
        "Customize requirements based on your application's security needs",
        "Enable auto-generation for users who struggle to create strong passwords",
        "Set appropriate password length based on your security requirements",
      ],
    },
    {
      type: "dont" as const,
      items: [
        "Rely solely on colors to indicate password strength (consider accessibility)",
        "Show too many requirements that might overwhelm users",
        "Use confusing or technical terminology in strength indicators",
        'Prevent form submission for "weak" passwords (warn instead)',
        "Add excessive animations that might distract users",
        "Generate passwords that are too short for your security requirements",
        "Hide the auto-generate feature when users might benefit from it",
      ],
    },
  ];

  const usageCode = `import { PasswordStrengthMeter } from "@/components/password-strength-meter"

export default function MyComponent() {
  // Basic usage
  return (
        <PasswordStrengthMeter
          placeholder="Type your password"
          className="max-w-md"
        />
  )
}`;

  const DemoComponent = () => {
    return (
      <div className="grid gap-6">
        <Card>
          <CardContent className="pt-6">
            <PasswordStrengthMeter
              placeholder="Type your password"
              className="max-w-md"
            />
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <ComponentDocTemplate
      title="Password Strength Meter"
      description="A customizable password strength meter component that provides real-time visual feedback on password security."
      previewComponent={<DemoComponent />}
      githubPath="registry/new-york/strength-meter/strength-meter.tsx"
      usageCode={usageCode}
      usageDescription="The Password Strength Meter component provides intuitive visual feedback about password strength with customizable segments, requirements, and animations."
      propsData={propsData}
      features={features}
      bestPractices={bestPractices}
      componentName="https://rigidui.com/registry/strength-meter"
      additionalSections={
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <svg
              className="h-7 w-7 text-indigo-500 dark:text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
              />
            </svg>
            <h2
              id="advanced-usage"
              className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white"
            >
              Advanced Usage
            </h2>
          </div>
          <p className="md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
            Explore different configurations and use cases for the Password
            Strength Meter component.
          </p>

          <div className="space-y-12">
            {advancedUsageExamples.map((example, index) => (
              <div key={index} className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {example.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
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
                    <TabsContent
                      value="preview"
                      className="px-8  flex flex-col justify-start"
                    >
                      <div className="mb-4 mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Live Preview
                      </div>
                      {example.component}
                    </TabsContent>
                    <TabsContent
                      value="code"
                      className="max-h-[500px] overflow-auto"
                    >
                      <CodeBlock
                        code={example.code}
                        language="typescript"
                        filename={`${example.title.replace(/\s+/g, "")}.tsx`}
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
  );
}
