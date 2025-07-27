import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (

    <footer className="py-16 px-6 border-t border-primary/10 bg-linear-to-br from-muted/20 via-background to-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="flex flex-col gap-6 lg:w-1/3">
            <Link href="/" className="group flex items-center gap-4">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="rigidui"
                  width={60}
                  height={60}
                  className="group-hover:scale-110 transition-all duration-300 drop-shadow-lg"
                />
                <div className="absolute -inset-2 bg-linear-to-r from-primary/30 to-purple-500/30 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  RigidUI
                </span>
                <span className="text-sm text-muted-foreground font-medium">
                  v0.1.0 • Enterprise UI Components
                </span>
              </div>
            </Link>

            <p className="text-muted-foreground leading-relaxed max-w-md">
              Advanced React components for building sophisticated user interfaces.
              Built with modern technologies and best practices.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>13 Components</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>TypeScript Ready</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:w-2/3">
            <div>
              <h3 className="font-bold text-foreground mb-4 text-lg">Documentation</h3>
              <div className="space-y-3">
                <Link href="/docs" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform">
                  Documentation
                </Link>
                <Link href="/docs/getting-started" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform">
                  Getting Started
                </Link>
                <Link href="/docs/components" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform">
                  Components
                </Link>
                <Link href="/docs/hooks" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform">
                  Hooks
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-4 text-lg">Components</h3>
              <div className="space-y-3">
                <Link href="/docs/components/currency-manager" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform">
                  Currency Manager
                </Link>
                <Link href="/docs/components/file-explorer" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform">
                  File Explorer
                </Link>
                <Link href="/docs/components/location-picker" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform">
                  Location Picker
                </Link>
                <Link href="/docs/components/file-uploader" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform">
                  File Uploader
                </Link>
                <Link href="/docs/components/strength-meter" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform">
                  Password Strength
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-4 text-lg">More</h3>
              <div className="space-y-3">
                <Link href="/docs/components/infinite-scroll" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform">
                  Infinite Scroll
                </Link>
                <Link href="/docs/components/multi-step-form-wrapper" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform">
                  Multi-Step Form
                </Link>
                <Link href="/docs/hooks/use-location" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform">
                  useLocation Hook
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-muted-foreground">
            © 2025 RigidUI. Built with shadcn/ui • Designed for developers
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">
              Documentation
            </Link>
            <Link href="/docs/components" className="text-muted-foreground hover:text-primary transition-colors">
              Components
            </Link>
            <Link href="/docs/hooks" className="text-muted-foreground hover:text-primary transition-colors">
              Hooks
            </Link>
          </div>
        </div>
      </div>
    </footer>)
}

export default Footer