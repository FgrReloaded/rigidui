"use client"
import * as React from "react"
import Link from "next/link"
import { ArrowRight, Code, Sparkles, Zap, Layers, Palette } from "lucide-react"
import localFont from 'next/font/local'
import { ComponentPreview } from "@/components/component-preview"
import { components } from "@/lib/constants"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/home/footer"

const titleFont = localFont({ src: './Nippo-Variable.ttf' })

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 transform -skew-y-6 origin-top-left scale-110" />
          <div className="absolute top-1/3 left-0 right-0 h-64 bg-gradient-to-r from-transparent via-primary/3 to-transparent transform skew-y-3" />

          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path d="M0,100 Q400,50 800,200 T1600,100" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="text-primary" />
            <path d="M0,300 Q600,250 1200,400 T2400,300" stroke="url(#lineGradient)" strokeWidth="1" fill="none" className="text-primary opacity-50" />
          </svg>
        </div>
      </div>

      <Sidebar />

      <main className="relative z-10 mt-12">
        <div className="min-h-screen flex items-center">
          <div className="container mx-auto md:px-6 px-2">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-2 flex lg:flex-col items-center justify-center">
                <div className="transform lg:rotate-90 lg:origin-center whitespace-nowrap">
                  <span className="text-sm font-mono text-muted-foreground tracking-widest">
                    PRODUCTION — READY — COMPONENTS
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-12">
                <div className="flex max-lg:justify-center">
                  <div className="relative group">
                    <div className="relative inline-flex items-center gap-3 px-6 py-3 bg-background border rounded-full text-sm font-medium">
                      <Zap className="w-4 h-4 text-primary animate-pulse" />
                      <span>Complex-Components UI Library</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter max-lg:flex justify-center" style={titleFont.style}>
                      <span className="block text-foreground max-lg:text-center">RIGID</span>
                      <span className="block text-transparent transform lg:-translate-x-16 [-webkit-text-stroke:1.5px_rgba(0,0,0,0.5)] dark:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.5)]">UI</span>
                    </h1>
                  </div>

                  <div className="relative pl-8 border-l-4 border-primary/50">
                    <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
                      Professional <span className="italic text-foreground font-medium">Powerful components</span> that scale with your
                      <span className="font-bold text-primary"> needs</span>
                    </p>
                    <p className="sm:text-lg text-muted-foreground mt-2">
                      Built for developers who demand quality, performance, and
                      <span className="underline decoration-primary/50"> exceptional user experiences</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-center max-lg:justify-center">
                  <Link
                    href="/docs/getting-started"
                    className="group relative overflow-hidden px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Building
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </Link>

                  <div className="flex items-center gap-4">
                    <Link
                      href="/docs"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <div className="w-8 h-8 border border-current rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                        <Code className="w-4 h-4" />
                      </div>
                      <span className="font-medium">View Documentation</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 relative">
                <div className="relative w-full h-96">
                  <div className="absolute top-0 left-0 w-48 h-32 bg-card border rounded-xl transition-transform duration-500 transform rotate-12 hover:rotate-6">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Layers className="w-4 h-4 text-primary" />
                        <span className="text-xs font-mono">MODULAR</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-primary/30 rounded w-3/4"></div>
                        <div className="h-2 bg-muted rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-16 right-0 w-40 h-28 bg-card border rounded-xl transition-transform duration-500 transform -rotate-6 hover:rotate-0">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Palette className="w-4 h-4 text-primary" />
                        <span className="text-xs font-mono">THEMEABLE</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-4 h-4 bg-primary/40 rounded"></div>
                        <div className="w-4 h-4 bg-primary/60 rounded"></div>
                        <div className="w-4 h-4 bg-primary/80 rounded"></div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 w-44 h-36 bg-card border rounded-xl transition-transform duration-500 transform rotate-3 hover:-rotate-3">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-mono">ACCESSIBLE</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gradient-to-r from-primary/20 to-primary/60 rounded"></div>
                        <div className="h-3 bg-gradient-to-r from-primary/40 to-primary/20 rounded w-4/5"></div>
                        <div className="h-3 bg-gradient-to-r from-primary/60 to-primary/40 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>

                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path d="M50,50 Q150,100 250,80" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary/30 stroke-dasharray-4" />
                    <path d="M200,150 Q100,200 50,250" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary/20 stroke-dasharray-8" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative py-32 bg-gradient-to-br from-background via-primary/2 to-background transform -skew-y-1 origin-top-left">
          <div className="transform skew-y-1">
            <div className="container mx-auto px-6">
              <div className="text-center mb-20">
                <div className="inline-block">
                  <h2 className="text-4xl md:text-6xl font-black mb-4" style={titleFont.style}>
                    <span className="text-muted-foreground uppercase">Component</span>
                    <br />
                    <span className="text-foreground">SHOWCASE</span>
                  </h2>
                  <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                </div>
                <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
                  Battle-tested components used by teams at scale. Each component is crafted with attention to detail,
                  performance optimization, and real-world use cases.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {components.slice(0, 8).map((component, index) => (
                  <Link
                    key={component.name}
                    href={`/docs/components/${component.name}`}
                    className="group block h-full"
                  >
                    <div className="relative overflow-hidden rounded-2xl border bg-card/30 backdrop-blur-sm hover:bg-card/60 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                      <div className="flex items-center justify-between p-6 border-b border-border/50 min-h-[100px]">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                            <span className="text-lg font-bold text-primary font-mono">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors truncate">
                              {component.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                React
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                                TS
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0">
                          <span>View</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <p className="text-muted-foreground leading-relaxed mb-6 flex-shrink-0 line-clamp-3 min-h-[72px]">
                          {component.description}
                        </p>

                        <div className="relative bg-muted/20 rounded-xl min-h-[200px] flex items-center justify-center overflow-hidden flex-1">
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(255,255,255,.1)_50%,transparent_65%)] bg-[length:16px_16px]"></div>
                          </div>

                          <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                            <div className="w-full max-w-xs">
                              <ComponentPreview componentName={component.name} />
                            </div>
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-background/80 backdrop-blur-sm border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <Code className="w-4 h-4 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-16 pt-8 border-t border-border/50">
                <p className="text-muted-foreground mb-6">
                  Explore detailed documentation and live examples
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/docs/components"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors font-medium"
                  >
                    Browse All Components
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative py-32">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="relative inline-block mb-8">
                <h3 className="text-4xl md:text-6xl font-black" style={titleFont.style}>
                  <span className="text-muted-foreground">READY TO</span>
                  <br />
                  <span className="text-primary">ELEVATE?</span>
                </h3>
                <div className="absolute -top-8 -right-8 w-16 h-16 border-2 border-primary/30 rounded-full animate-ping"></div>
              </div>

              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Join thousands of developers building exceptional products with RigidUI.
                Start shipping faster with components that just work.
              </p>

              <Link
                href="/docs/getting-started"
                className="group relative inline-flex items-center gap-4 md:px-12 px-8 md:py-6 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:scale-105 transition-all duration-300"
              >
                <span>GET STARTED TODAY</span>
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .stroke-dasharray-4 {
          stroke-dasharray: 4 4;
        }
        .stroke-dasharray-8 {
          stroke-dasharray: 8 8;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

