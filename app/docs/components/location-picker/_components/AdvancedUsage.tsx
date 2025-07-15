import { LocationPicker } from "@/registry/new-york/location-picker/location-picker";

export const advancedUsageExamples = [
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
      <div className="space-y-4 max-w-md">
        <LocationPicker
          variant="inline"
          onChange={(location) => console.log("Location changed:", location)}
        />
        <p className="text-sm text-muted-foreground">
          Check console for location changes
        </p>
      </div>
    ),
  },
];
