import { CodeBlock } from "../_components/CodeBlock";
import Link from "next/link";
import { ArrowRight, CheckCircle, Terminal, AlertTriangle, Sparkles, Zap, Package, Download, Eye, Layers, Workflow } from "lucide-react";

export default function GettingStartedPage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">
            Getting Started
          </h1>
          <p className="text-xl text-muted-foreground">
            Get up and running with RigidUI components in minutes
          </p>
        </div>
      </div>

      <div className="mt-8 border-t pt-8">
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              Enterprise-grade components for complex applications
            </h3>
          </div>
          <p className="text-blue-800 dark:text-blue-200">
            RigidUI extends shadcn/ui with production-ready components. Simply copy, paste, and customize.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-12">
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
              <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Prerequisites</h2>
              <p className="text-sm text-muted-foreground">Set up your project with the required dependencies</p>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
            <h3 className="font-semibold text-orange-900 dark:text-orange-200 mb-3">
              ⚠️ Important: Tailwind CSS Setup Required
            </h3>
            <p className="text-orange-800 dark:text-orange-300 mb-4">
              RigidUI components require a project with Tailwind CSS and shadcn/ui properly configured.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-orange-800 dark:text-orange-300">Tailwind CSS installed and configured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-orange-800 dark:text-orange-300">shadcn/ui initialized</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-orange-800 dark:text-orange-300">TypeScript support</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <Terminal className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Install Components</h2>
              <p className="text-sm text-muted-foreground">Add RigidUI components to your project with a single command</p>
            </div>
          </div>

          <div className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                <Zap className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                One command installation
              </h3>
            </div>
            <p className="text-green-800 dark:text-green-200 mb-4">
              Copy and paste any of these commands to add components to your project:
            </p>

            <div className="grid gap-4">
              <div className="bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-sm">Currency Manager</span>
                </div>
                <CodeBlock
                  language="bash"
                  code="npx shadcn@latest add https://rigidui.com/registry/currency-manager"
                />
              </div>

              <div className="bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-sm">File Explorer</span>
                </div>
                <CodeBlock
                  language="bash"
                  code="npx shadcn@latest add https://rigidui.com/registry/file-explorer"
                />
              </div>

              <div className="bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-sm">Location Picker</span>
                </div>
                <CodeBlock
                  language="bash"
                  code="npx shadcn@latest add https://rigidui.com/registry/location-picker"
                />
              </div>

              <div className="bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-sm">Password Strength Meter</span>
                </div>
                <CodeBlock
                  language="bash"
                  code="npx shadcn@latest add https://rigidui.com/registry/strength-meter"
                />
              </div>

              <div className="bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-sm">File Uploader</span>
                </div>
                <CodeBlock
                  language="bash"
                  code="npx shadcn@latest add https://rigidui.com/registry/file-uploader"
                />
              </div>

              <div className="bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-sm">Infinite Scroll</span>
                </div>
                <CodeBlock
                  language="bash"
                  code="npx shadcn@latest add https://rigidui.com/registry/infinite-scroll"
                />
              </div>

              <div className="bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Workflow className="h-4 w-4 text-cyan-600" />
                  <span className="font-medium text-sm">Multi-Step Form Wrapper</span>
                </div>
                <CodeBlock
                  language="bash"
                  code="npx shadcn@latest add https://rigidui.com/registry/multi-step-form-wrapper"
                />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <h4 className="font-medium text-amber-900 dark:text-amber-200 mb-2">💡 Pro Tip</h4>
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Components will be added to your <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">components/ui</code> directory and are fully customizable.
            </p>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <p className="text-muted-foreground">
            Now that you have RigidUI set up, explore what&apos;s possible:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/docs/components"
              className="group flex items-center justify-between p-6 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">Browse Components</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Explore all available components with live examples
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="https://github.com/FgrReloaded/rigidui"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 bg-linear-to-r from-gray-50 to-slate-50 dark:from-gray-950/30 dark:to-slate-950/30 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">View on GitHub</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Star the repo and contribute to the project
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
