"use client"
import React from 'react'
import ComponentDocTemplate from '../../_components/ComponentDocTemplate'
import GuidedTourDemo from './_components/GuidedTourDemo'

export default function GuidedTourPage() {
  const propsData = [
    {
      name: 'children',
      type: 'ReactNode',
      defaultValue: 'undefined',
      description: 'The content to be wrapped by the tour provider',
      required: true,
    },
    {
      name: 'autoStart',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to automatically start the tour when the component mounts',
    },
    {
      name: 'ranOnce',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether the tour should only run once per user/device',
    },
    {
      name: 'storageKey',
      type: 'string',
      defaultValue: "'rigidui-tour-completed'",
      description: 'Key used to store tour completion status in localStorage',
    },
    {
      name: 'shouldStart',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether the tour should start based on external conditions (e.g., user preferences)',
    },
    {
      name: 'onTourComplete',
      type: '() => void',
      defaultValue: 'undefined',
      description: 'Callback function called when the tour is completed',
    },
    {
      name: 'onTourSkip',
      type: '() => void',
      defaultValue: 'undefined',
      description: 'Callback function called when the tour is skipped',
    },
  ]

  const tourStepPropsData = [
    {
      name: 'id',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Unique identifier for the tour step',
      required: true,
    },
    {
      name: 'title',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Title displayed in the tour step popover',
      required: true,
    },
    {
      name: 'content',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Content/description text for the tour step',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 'undefined',
      description: 'The order in which this step should appear in the tour sequence',
      required: true,
    },
    {
      name: 'position',
      type: "'top' | 'bottom' | 'left' | 'right'",
      defaultValue: "'bottom'",
      description: 'Preferred position for the popover relative to the target element',
    },
    {
      name: 'children',
      type: 'ReactNode',
      defaultValue: 'undefined',
      description: 'The element(s) to be highlighted and explained in this tour step',
      required: true,
    },
  ]

  const tourTriggerPropsData = [
    {
      name: 'children',
      type: 'ReactNode',
      defaultValue: 'undefined',
      description: 'The content to be rendered as the tour trigger button',
      required: true,
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: "''",
      description: 'Additional CSS classes for styling the trigger',
    },
    {
      name: 'hideAfterComplete',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to hide the trigger button after the tour is completed',
    },
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Interactive Guidance",
      description: "Highlight specific elements on your interface and provide contextual explanations to guide users through complex workflows."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: "Smart Positioning",
      description: "Automatically calculates optimal popover positioning based on viewport space, ensuring tours work perfectly on any screen size."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Completion Tracking",
      description: "Tracks tour completion status to prevent showing the tour repeatedly to users who have already completed it."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011 1v8a1 1 0 01-1 1M7 4V1a1 1 0 011-1h8a1 1 0 011 1v8a1 1 0 01-1 1M7 4H5a1 1 0 00-1 1v4a1 1 0 001 1h2M7 4h10M5 9h14" />
        </svg>
      ),
      title: "Progress Tracking",
      description: "Built-in progress indicator shows users how many steps remain, with smooth transitions between tour steps."
    }
  ]

  const subComponents = [
    {
      name: 'TourProvider',
      description: 'The main provider component that manages tour state and provides context to child components.',
      propsData: propsData
    },
    {
      name: 'TourStep',
      description: 'Wraps any element to make it part of the guided tour sequence with highlighted content and explanatory popovers.',
      propsData: tourStepPropsData
    },
    {
      name: 'TourTrigger',
      description: 'A trigger component that starts the guided tour when clicked.',
      propsData: tourTriggerPropsData
    }
  ]

  const usageCode = `"use client"
import React from 'react'
import { TourProvider, TourStep, TourTrigger } from '@/registry/new-york/guided-tour/guided-tour'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Star, Play, Settings, User } from 'lucide-react'

const DemoComponent = () => {
  return (
    <TourProvider
      autoStart={false}
      onTourComplete={() => console.log('Tour completed!')}
      onTourSkip={() => console.log('Tour skipped!')}
    >
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Interactive Dashboard Demo
            </CardTitle>
            <CardDescription>
              Take a guided tour to learn about all the features
            </CardDescription>
            <TourTrigger className="w-fit mx-auto">
              <Button className="mt-4">
                <Play className="h-4 w-4 mr-2" />
                Start Guided Tour
              </Button>
            </TourTrigger>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <TourStep
            id="profile-card"
            title="Welcome to Your Profile"
            content="This is your profile card where you can view and edit your personal information. Click here to update your details anytime."
            order={1}
            position="bottom"
          >
            <CardOne />
          </TourStep>

          <TourStep
            id="stats-card"
            title="Your Statistics"
            content="Here you can monitor your performance metrics and track your progress over time. These numbers update in real-time!"
            order={2}
            position="bottom"
          >
          <CardTwo />
          </TourStep>

          <TourStep
            id="settings-card"
            title="Customize Your Experience"
            content="Access all your settings here. You can customize themes, notifications, privacy options, and much more to personalize your experience."
            order={3}
            position="left"
          >
            <CardThree />
          </TourStep>

          <TourStep
            id="activities-card"
            title="Recent Activities"
            content="Stay up to date with your recent activities and interactions. This timeline shows your most important events and updates."
            order={4}
            position="top"
          >
            <CardFour />
          </TourStep>
        </div>
      </div>
    </TourProvider>
  )
}

export default DemoComponent
`

  return (
    <ComponentDocTemplate
      title="Guided Tour"
      description="A comprehensive guided tour component that helps users understand your interface through interactive step-by-step walkthroughs."
      previewComponent={<GuidedTourDemo />}
      githubPath="registry/new-york/guided-tour/guided-tour.tsx"
      usageCode={usageCode}
      usageDescription="The Guided Tour component provides an interactive way to onboard users and showcase features. It highlights specific elements, provides contextual information, and guides users through complex workflows with smooth transitions and smart positioning."
      propsData={propsData}
      features={features}
      subComponents={subComponents}
      componentName="https://rigidui.com/registry/guided-tour"
    />
  )
}