import React from 'react'
import { ComponentHeader } from './ComponentHeader'
import { CodeBlock } from './CodeBlock'
import { PropsTable } from './PropsTable'
import { Code, Package, Zap } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TerminalCommand from './TerminalCommand'
import Features from './templates/Features'
import { navigationItems } from '@/lib/routes'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { OpenInV0Button } from '@/components/open-in-v0-button'

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface PropData {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

export interface BestPractice {
  type: 'do' | 'dont';
  items: string[];
}

export interface ComponentDocProps {
  title: string;
  description: string;
  previewComponent: React.ReactNode;
  githubPath: string;
  usageCode: string;
  usageDescription?: string;
  codeFilename?: string;
  propsData: PropData[];
  features?: Feature[];
  bestPractices?: BestPractice[];
  showInstallation?: boolean;
  componentName?: string;
  additionalSections?: React.ReactNode;
  subComponents?: {
    name: string;
    description: string;
    propsData: PropData[];
  }[];
}

export default function ComponentDocTemplate({
  title,
  description,
  previewComponent,
  githubPath,
  usageCode,
  usageDescription = `The ${title} component provides an interface for users.`,
  codeFilename = "BasicUsage.tsx",
  propsData,
  features,
  showInstallation = true,
  componentName,
  additionalSections,
  subComponents
}: ComponentDocProps) {
  const currentIndex = navigationItems.findIndex(item => item.title === title);
  const prevRoute = currentIndex > 0 ? navigationItems[currentIndex - 1] : null;
  const nextRoute = currentIndex < navigationItems.length - 1 ? navigationItems[currentIndex + 1] : null;

  return (
    <div className="max-w-5xl mx-auto space-y-10  md:space-y-20 md:px-6 md:py-10 py-4 px-4">
      <ComponentHeader
        title={title}
        description={description}
        githubPath={githubPath}
      />

      {showInstallation && (
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <Package className="h-7 w-7 text-indigo-500 dark:text-indigo-400" />
            <h2 id="installation" className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white">Installation</h2>
          </div>
          <p className="md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
            Install the {title} component using your preferred package manager.
          </p>

          <div className="bg-gray-50 dark:bg-background rounded-xl overflow-hidden border border-gray-200 dark:border-slate-800">
            <Tabs defaultValue="npm" className="w-full md:p-1">
              <TabsList className="flex justify-start border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/70">
                <TabsTrigger
                  value="npm"
                  className="px-6 py-1 text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 transition-all duration-200"
                >
                  npm
                </TabsTrigger>
                <TabsTrigger
                  value="pnpm"
                  className="px-6 py-1 text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 transition-all duration-200"
                >
                  pnpm
                </TabsTrigger>
                <TabsTrigger
                  value="bun"
                  className="px-6 py-1 text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 transition-all duration-200"
                >
                  bun
                </TabsTrigger>
              </TabsList>
              <div className="md:p-4">
                <TabsContent value="npm">
                  <TerminalCommand
                    packageManager='npx'
                    command="shadcn@latest add"
                    component={componentName || title.toLowerCase().replace(/\s+/g, '-')}
                    className="w-full"
                  />
                </TabsContent>
                <TabsContent value="pnpm">
                  <TerminalCommand
                    packageManager='pnpm dlx'
                    command="shadcn@latest add"
                    component={componentName || title.toLowerCase().replace(/\s+/g, '-')}
                    className='w-full'
                  />
                </TabsContent>
                <TabsContent value="bun">
                  <TerminalCommand
                    packageManager='bunx'
                    command="shadcn@latest add"
                    component={componentName || title.toLowerCase().replace(/\s+/g, '-')}
                    className='w-full'
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>
      )}

      <section className="md:space-y-8 space-y-6">
        <div className="flex items-center space-x-3">
          <Code className="h-7 w-7 text-indigo-500 dark:text-indigo-400" />
          <h2 id="usage" className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white">Usage</h2>
        </div>
        <p className="md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
          {usageDescription}
        </p>

        <div className="mt-8 bg-white dark:bg-background rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs overflow-hidden">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="flex justify-between border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/70">
              <div className="flex">
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
              </div>
              <div className="flex items-center pr-2">
                <OpenInV0Button
                  name={componentName ? componentName.split('/').pop() || title.toLowerCase().replace(/\s+/g, '-') : title.toLowerCase().replace(/\s+/g, '-')}
                />
              </div>
            </TabsList>
            <TabsContent value="preview" className="px-8 flex flex-col justify-start">
              <div className="mb-4 mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">Live Preview</div>
              <div className='py-4'>
                {previewComponent}
              </div>
            </TabsContent>
            <TabsContent value="code" className="max-h-[500px] overflow-auto">
              <CodeBlock
                code={usageCode}
                language='jsx'
                filename={codeFilename}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {features && features.length > 0 && (
        <Features title={title} features={features} />
      )}

      {subComponents && subComponents.length > 0 ? (
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <Zap className="h-7 w-7 text-indigo-500 dark:text-indigo-400" />
            <h2 id="components" className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white">Components</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
            The {title} consists of the following components:
          </p>

          <div className="space-y-6">
            {subComponents.map((component, index) => (
              <div key={index} className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-medium mb-3 dark:text-white">{component.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {component.description}
                </p>
                <h4 className="text-md font-medium mb-2 dark:text-white">Props</h4>
                <PropsTable props={component.propsData} />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <Zap className="h-7 w-7 text-indigo-500 dark:text-indigo-400" />
            <h2 id="api-reference" className="md:text-3xl text-2xl font-bold text-gray-900 dark:text-white">API Reference</h2>
          </div>
          <div className="bg-white dark:bg-transparent rounded-xl shadow-xs border border-gray-200 dark:border-gray-700 overflow-hidden">
            <PropsTable props={propsData} />
          </div>
        </section>
      )}

      {additionalSections}

      <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        {prevRoute ? (
          <Link href={prevRoute.href} className={cn(buttonVariants({ variant: "outline-solid" }), "flex items-center md:space-x-2 max-sm:text-xs max-sm:px-3")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className='sm:hidden'>{prevRoute.title.slice(0, 10).concat('...')}</span>
            <span className='max-sm:hidden'>{prevRoute.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextRoute ? (
          <Link href={nextRoute.href} className={cn(buttonVariants({ variant: "outline-solid" }), "flex items-center md:space-x-2 max-sm:text-xs max-sm:px-3")}>
            <span className='sm:hidden'>{nextRoute.title.slice(0, 10).concat('...')}</span>
            <span className='max-sm:hidden'>{nextRoute.title}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
