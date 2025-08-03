"use client"

import { LocationPicker } from "@/r/new-york/location-picker/location-picker"
import { useState } from "react"
import * as TabsComponents from 'fumadocs-ui/components/tabs'
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'

const { Tabs, Tab } = TabsComponents

const popoverCode = `import { LocationPicker } from "@/components/location-picker"

export default function PopoverExample() {
  return (
    <LocationPicker
      variant="popover"
      defaultLocation="New York"
      onChange={(location) => console.log('Selected:', location)}
    />
  )
}`

const inlineCode = `import { LocationPicker } from "@/components/location-picker"

export default function InlineExample() {
  return (
    <LocationPicker
      variant="inline"
      showLabel={true}
      placeholder="Search for your city..."
      onChange={(location) => console.log('Selected:', location)}
    />
  )
}`

const autoDetectCode = `import { LocationPicker } from "@/components/location-picker"

export default function AutoDetectExample() {
  return (
    <LocationPicker
      variant="inline"
      autoDetectOnLoad={true}
      showLabel={false}
      placeholder="Detecting your location..."
    />
  )
}`

const customStyledCode = `import { LocationPicker } from "@/components/location-picker"

export default function CustomExample() {
  return (
    <LocationPicker
      variant="popover"
      placeholder="Find stores near you..."
      defaultLocation="Los Angeles"
      className="border-2 border-blue-200 rounded-lg"
    />
  )
}`

const changeHandlerCode = `import { LocationPicker } from "@/components/location-picker"
import { useState } from "react"

export default function HandlerExample() {
  const [selectedLocation, setSelectedLocation] = useState("")

  return (
    <div className="space-y-4">
      <LocationPicker
        variant="inline"
        showLabel={true}
        onChange={setSelectedLocation}
      />
      {selectedLocation && (
        <p className="text-sm text-muted-foreground">
          Selected: {selectedLocation}
        </p>
      )}
    </div>
  )
}`

export const locationPickerAdvancedExamples = [
  {
    title: "Popover Variant (Default)",
    description:
      "Compact trigger that opens a popover with location search functionality. Perfect for navigation bars or space-constrained layouts.",
    code: `import { LocationPicker } from "@/components/location-picker"

export default function PopoverExample() {
  return (
    <LocationPicker
      variant="popover"
      defaultLocation="New York"
      onChange={(location) => console.log('Selected:', location)}
    />
  )
}`,
    component: <LocationPicker variant="popover" className="w-fit" />,
  },
  {
    title: "Inline Variant",
    description:
      "Full-featured inline interface with immediate access to search functionality. Ideal for forms or dedicated location selection pages.",
    code: `import { LocationPicker } from "@/components/location-picker"

export default function InlineExample() {
  return (
    <LocationPicker
      variant="inline"
      showLabel={true}
      placeholder="Search for your city..."
      onChange={(location) => console.log('Selected:', location)}
    />
  )
}`,
    component: <LocationPicker variant="inline" className="max-w-md" />,
  },
  {
    title: "Auto-detect Location",
    description:
      "Automatically detect user's current location when the component loads.",
    code: `import { LocationPicker } from "@/components/location-picker"

export default function AutoDetectExample() {
  return (
    <LocationPicker
      variant="inline"
      autoDetectOnLoad={true}
      showLabel={false}
      placeholder="Detecting your location..."
    />
  )
}`,
    component: (
      <LocationPicker
        variant="inline"
        autoDetectOnLoad={true}
        className="max-w-md"
      />
    ),
  },
  {
    title: "Custom Styling",
    description:
      "Customize the appearance with className and custom placeholder text.",
    code: `import { LocationPicker } from "@/components/location-picker"

export default function CustomExample() {
  return (
    <LocationPicker
      variant="popover"
      placeholder="Find stores near you..."
      defaultLocation="Los Angeles"
      className="border-2 border-blue-200 rounded-lg"
    />
  )
}`,
    component: (
      <LocationPicker
        variant="popover"
        placeholder="Find stores near you..."
        defaultLocation="Los Angeles"
        className="border-2 border-blue-200 rounded-lg w-fit"
      />
    ),
  },
  {
    title: "With Change Handler",
    description:
      "Handle location changes with a callback function for integration with forms or state management.",
    code: `import { LocationPicker } from "@/components/location-picker"
import { useState } from "react"

export default function HandlerExample() {
  const [selectedLocation, setSelectedLocation] = useState("")

  return (
    <div className="space-y-4">
      <LocationPicker
        variant="inline"
        showLabel={true}
        onChange={setSelectedLocation}
      />
      {selectedLocation && (
        <p className="text-sm text-muted-foreground">
          Selected: {selectedLocation}
        </p>
      )}
    </div>
  )
}`,
    component: (
      <LocationChangeExample />
    ),
  },
];

function LocationChangeExample() {
  const [selectedLocation, setSelectedLocation] = useState("");

  return (
    <div className="space-y-4 max-w-md">
      <LocationPicker
        variant="inline"
        onChange={(location) => {
          setSelectedLocation(location);
          console.log("Location changed:", location);
        }}
      />
      {selectedLocation && (
        <p className="text-sm text-muted-foreground">
          Selected: {selectedLocation}
        </p>
      )}
    </div>
  );
}

export function LocationPickerAdvancedExamples() {
  return (
    <div className="space-y-8">
      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Popover Variant (Default)
          </h3>
          <p className="text-muted-foreground">
            Compact trigger that opens a popover with location search functionality. Perfect for navigation bars or space-constrained layouts.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <LocationPicker variant="popover" className="w-fit" />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={popoverCode} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Inline Variant
          </h3>
          <p className="text-muted-foreground">
            Full-featured inline interface with immediate access to search functionality. Ideal for forms or dedicated location selection pages.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <LocationPicker variant="inline" className="max-w-md" />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={inlineCode} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Auto-detect Location
          </h3>
          <p className="text-muted-foreground">
            Automatically detect user&apos;s current location when the component loads.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <LocationPicker
                variant="inline"
                autoDetectOnLoad={true}
                className="max-w-md"
              />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={autoDetectCode} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Custom Styling
          </h3>
          <p className="text-muted-foreground">
            Customize the appearance with className and custom placeholder text.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <LocationPicker
                variant="popover"
                placeholder="Find stores near you..."
                defaultLocation="Los Angeles"
                className="border-2 border-blue-200 rounded-lg w-fit"
              />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={customStyledCode} />
          </Tab>
        </Tabs>
      </div>

      <div className="space-y-6 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            With Change Handler
          </h3>
          <p className="text-muted-foreground">
            Handle location changes with a callback function for integration with forms or state management.
          </p>
        </div>

        <Tabs items={['Preview', 'Code']}>
          <Tab value="Preview">
            <div className="w-full flex justify-center">
              <LocationChangeExample />
            </div>
          </Tab>
          <Tab value="Code">
            <DynamicCodeBlock lang="tsx" code={changeHandlerCode} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
