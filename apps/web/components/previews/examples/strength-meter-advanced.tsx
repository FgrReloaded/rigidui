"use client"

import { PasswordStrengthMeter } from "@/r/new-york/strength-meter/strength-meter"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import * as TabsComponents from 'fumadocs-ui/components/tabs'
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'

const { Tabs, Tab } = TabsComponents

export const strengthMeterAdvancedExamples = [
  {
    title: "Basic Password Strength Meter",
    description:
      "Simple password strength meter with default settings. Perfect for most use cases with standard security requirements.",
    code: `import { PasswordStrengthMeter } from "@/components/password-strength-meter"

export default function BasicExample() {
  return (
    <PasswordStrengthMeter
      placeholder="Enter your password"
      className="max-w-md"
    />
  )
}`,
    component: (
      <PasswordStrengthMeter
        placeholder="Enter your password"
        className="max-w-md"
      />
    ),
  },
  {
    title: "With Auto Password Generation",
    description:
      "Enable automatic password generation to help users create strong passwords with a single click.",
    code: `import { PasswordStrengthMeter } from "@/components/password-strength-meter"

export default function AutoGenerateExample() {
  return (
    <PasswordStrengthMeter
      placeholder="Generate or type password"
      enableAutoGenerate={true}
      autoGenerateLength={16}
      className="max-w-md"
    />
  )
}`,
    component: (
      <PasswordStrengthMeter
        placeholder="Generate or type password"
        enableAutoGenerate={true}
        autoGenerateLength={16}
        className="max-w-md"
      />
    ),
  },
  {
    title: "Compact with Auto Generation",
    description:
      "A space-efficient version with auto-generation enabled, perfect for forms with limited space.",
    code: `import { PasswordStrengthMeter } from "@/components/password-strength-meter"

export default function CompactAutoGenerateExample() {
  return (
    <PasswordStrengthMeter
      placeholder="Password"
      enableAutoGenerate={true}
      autoGenerateLength={12}
      showRequirements={false}
      size="sm"
      segments={3}
      className="max-w-md"
    />
  )
}`,
    component: (
      <PasswordStrengthMeter
        placeholder="Password"
        enableAutoGenerate={true}
        autoGenerateLength={12}
        showRequirements={false}
        segments={3}
        className="max-w-md"
      />
    ),
  },
  {
    title: "Custom Segments and Size",
    description:
      "Customize the number of segments and size of the strength meter for different visual presentations.",
    code: `import { PasswordStrengthMeter } from "@/components/password-strength-meter"

export default function CustomSegmentsExample() {
  return (
    <PasswordStrengthMeter
      segments={5}
      size="lg"
      placeholder="Password with 5 segments"
      className="max-w-md"
    />
  )
}`,
    component: (
      <PasswordStrengthMeter
        segments={5}
        placeholder="Password with 5 segments"
        className="max-w-md"
      />
    ),
  },
  {
    title: "Custom Strength Labels",
    description:
      "Personalize the strength level labels to match your application's tone and brand voice.",
    code: `import { PasswordStrengthMeter } from "@/components/password-strength-meter"

export default function CustomLabelsExample() {
  return (
    <PasswordStrengthMeter
      placeholder="Type a secure password..."
      strengthLabels={{
        empty: "Start typing",
        weak: "Needs work",
        fair: "Getting better",
        good: "Almost there",
        strong: "Perfect!"
      }}
      className="max-w-md"
    />
  )
}`,
    component: (
      <PasswordStrengthMeter
        placeholder="Type a secure password..."
        strengthLabels={{
          empty: "Start typing",
          weak: "Needs work",
          fair: "Getting better",
          good: "Almost there",
          strong: "Perfect!"
        }}
        className="max-w-md"
      />
    ),
  },
  {
    title: "Custom Requirements",
    description:
      "Define your own password requirements with custom validators to meet specific security policies.",
    code: `import { PasswordStrengthMeter } from "@/components/password-strength-meter"

export default function CustomRequirementsExample() {
  return (
    <PasswordStrengthMeter
      placeholder="Enterprise-grade password"
      requirements={[
        {
          label: "At least 12 characters",
          validator: (password) => password.length >= 12,
        },
        {
          label: "Contains uppercase and lowercase",
          validator: (password) =>
            /[A-Z]/.test(password) && /[a-z]/.test(password),
        },
        {
          label: "Contains numbers",
          validator: (password) => /\d/.test(password),
        },
        {
          label: "Contains special characters (!@#$%^&*)",
          validator: (password) =>
            /[!@#$%^&*(),.?":{}|<>]/.test(password),
        },
        {
          label: "No common patterns (123, abc, etc.)",
          validator: (password) =>
            !/(123|abc|password|qwerty)/i.test(password),
        },
      ]}
      className="max-w-md"
    />
  )
}`,
    component: (
      <PasswordStrengthMeter
        placeholder="Enterprise-grade password"
        requirements={[
          {
            label: "At least 12 characters",
            validator: (password) => password.length >= 12,
          },
          {
            label: "Contains uppercase and lowercase",
            validator: (password) =>
              /[A-Z]/.test(password) && /[a-z]/.test(password),
          },
          {
            label: "Contains numbers",
            validator: (password) => /\d/.test(password),
          },
          {
            label: "Contains special characters (!@#$%^&*)",
            validator: (password) =>
              /[!@#$%^&*(),.?":{}|<>]/.test(password),
          },
          {
            label: "No common patterns (123, abc, etc.)",
            validator: (password) =>
              !/(123|abc|password|qwerty)/i.test(password),
          },
        ]}
        className="max-w-md"
      />
    ),
  },
  {
    title: "Custom Strength Thresholds",
    description:
      "Adjust the score thresholds for different strength levels to make the meter more or less strict.",
    code: `import { PasswordStrengthMeter } from "@/components/password-strength-meter"

export default function CustomThresholdsExample() {
  return (
    <PasswordStrengthMeter
      placeholder="Strict security requirements"
      strengthThresholds={{
        empty: 0,
        weak: 1,
        fair: 60,
        good: 85,
        strong: 95,
      }}
      strengthLabels={{
        empty: "Empty",
        weak: "Very Weak",
        fair: "Moderate",
        good: "Strong",
        strong: "Ultra Strong"
      }}
      className="max-w-md"
    />
  )
}`,
    component: (
      <PasswordStrengthMeter
        placeholder="Strict security requirements"
        strengthThresholds={{
          empty: 0,
          weak: 1,
          fair: 60,
          good: 85,
          strong: 95,
        }}
        strengthLabels={{
          empty: "Empty",
          weak: "Very Weak",
          fair: "Moderate",
          good: "Strong",
          strong: "Ultra Strong"
        }}
        className="max-w-md"
      />
    ),
  },
  {
    title: "Without Requirements List",
    description:
      "Hide the requirements checklist for a cleaner interface when space is limited.",
    code: `import { PasswordStrengthMeter } from "@/components/password-strength-meter"

export default function NoRequirementsExample() {
  return (
    <PasswordStrengthMeter
      placeholder="Clean interface"
      showRequirements={false}
      showText={true}
      className="max-w-md"
    />
  )
}`,
    component: (
      <PasswordStrengthMeter
        placeholder="Clean interface"
        showRequirements={false}
        showText={true}
        className="max-w-md"
      />
    ),
  },
  {
    title: "With Form Integration",
    description:
      "Integrate with form state management to handle password changes and validation, including auto-generation.",
    code: `import { PasswordStrengthMeter } from "@/components/password-strength-meter"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function FormIntegrationExample() {
  const [password, setPassword] = useState("")
  const [isValid, setIsValid] = useState(false)

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword)
    // Custom validation logic
    setIsValid(newPassword.length >= 8 && /[A-Z]/.test(newPassword))
  }

  const handleSubmit = () => {
    if (isValid) {
      console.log('Form submitted with password:', password)
    }
  }

  return (
    <div className="space-y-4">
      <PasswordStrengthMeter
        placeholder="Enter password for registration"
        value={password}
        onChange={handlePasswordChange}
        enableAutoGenerate={true}
        className="max-w-md"
      />

      <Button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full max-w-md"
      >
        Create Account
      </Button>

      {password && (
        <p className="text-sm text-muted-foreground max-w-md">
          Password {isValid ? 'meets' : 'does not meet'} requirements
        </p>
      )}
    </div>
  )
}`,
    component: (
      <FormIntegrationExample />
    ),
  },
];

function FormIntegrationExample() {
  const [password] = useState("");
  const [isValid] = useState(false);

  const handleSubmit = () => {
    if (isValid) {
      console.log('Form submitted with password:', password);
      alert('Account created successfully!');
    }
  };

  return (
    <div className="space-y-4">
      <PasswordStrengthMeter
        placeholder="Enter password for registration"
        value={password}
        enableAutoGenerate={true}
        className="max-w-md"
      />

      <Button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full max-w-md"
      >
        Create Account
      </Button>

      {password && (
        <p className="text-sm text-muted-foreground max-w-md">
          Password {isValid ? 'meets' : 'does not meet'} requirements
        </p>
      )}
    </div>
  );
}

export function StrengthMeterAdvancedExamples() {
  return (
    <div className="space-y-8">
      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Basic Password Strength Meter
          </h3>
          <p className="text-muted-foreground">
            Simple password strength meter with default settings. Perfect for most use cases with standard security requirements.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <PasswordStrengthMeter
                placeholder="Enter your password"
                className="max-w-md"
              />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={`import { PasswordStrengthMeter } from "@/components/password-strength-meter"

export default function BasicExample() {
  return (
    <PasswordStrengthMeter
      placeholder="Enter your password"
      className="max-w-md"
    />
  )
}`} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            With Auto Password Generation
          </h3>
          <p className="text-muted-foreground">
            Enable automatic password generation to help users create strong passwords with a single click.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <PasswordStrengthMeter
                placeholder="Generate or type password"
                enableAutoGenerate={true}
                autoGenerateLength={16}
                className="max-w-md"
              />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={`import { PasswordStrengthMeter } from "@/components/password-strength-meter"

export default function AutoGenerateExample() {
  return (
    <PasswordStrengthMeter
      placeholder="Generate or type password"
      enableAutoGenerate={true}
      autoGenerateLength={16}
      className="max-w-md"
    />
  )
}`} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            With Form Integration
          </h3>
          <p className="text-muted-foreground">
            Integrate with form state management to handle password changes and validation, including auto-generation.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <FormIntegrationExample />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={`import { PasswordStrengthMeter } from "@/components/password-strength-meter"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function FormIntegrationExample() {
  const [password, setPassword] = useState("")
  const [isValid, setIsValid] = useState(false)

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword)
    setIsValid(newPassword.length >= 8 && /[A-Z]/.test(newPassword))
  }

  const handleSubmit = () => {
    if (isValid) {
      console.log('Form submitted with password:', password)
    }
  }

  return (
    <div className="space-y-4">
      <PasswordStrengthMeter
        placeholder="Enter password for registration"
        value={password}
        onChange={handlePasswordChange}
        enableAutoGenerate={true}
        className="max-w-md"
      />

      <Button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full max-w-md"
      >
        Create Account
      </Button>

      {password && (
        <p className="text-sm text-muted-foreground max-w-md">
          Password {isValid ? 'meets' : 'does not meet'} requirements
        </p>
      )}
    </div>
  )
}`} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
