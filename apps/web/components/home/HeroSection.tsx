import { ArrowRight, Component, Layers, Code2, Zap, Box, Database, GitBranch } from "lucide-react"
import Link from "next/link"
import localFont from 'next/font/local'
const titleFont = localFont({ src: '../../app/Nippo-Variable.ttf' })

const HeroSection = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-primary/5 via-transparent to-primary/5 rounded-full blur-2xl animate-spin-slow" />
      </div>

      <section className="min-h-screen py-20 px-4 relative overflow-hidden mt-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-12 relative z-10">
          <h1 className="text-5xl md:text-9xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-gray-500 to-purple-500 dark:from-blue-400 dark:via-primary dark:to-violet-500 py-6 animate-gradient relative" style={titleFont.style}>
            Rigid
            <span className="relative inline-block">
              <span className="absolute inset-0 [-webkit-text-stroke:1.5px_rgba(0,0,0,0.5)] dark:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.5)]">UI</span>
              UI
            </span>
            <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-indigo-600/20 via-primary/20 to-purple-600/20 dark:from-blue-400/20 dark:via-primary/20 dark:to-violet-500/20 -z-10"></span>
          </h1>

          <div className="max-w-4xl space-y-4">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              <span className="font-mono text-primary">[PROTOCOL.ACTIVE]</span> Building{" "}
              <span className="text-foreground font-bold bg-gradient-to-r from-primary/10 to-purple-500/10 px-2 py-1 rounded">enterprise-grade</span>{" "}
              React components with uncompromising quality
            </p>
            <p className="text-lg text-muted-foreground/80 font-mono">
              &gt; shadcn/ui.foundation + typescript.safety + modern.design = rigidui.excellence
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <Link
              href="/docs/getting-started"
              className="group relative inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-8 py-4 font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative flex items-center gap-2">
                <Zap className="w-4 h-4" />
                START.BUILDING
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/docs/components"
              className="group inline-flex items-center justify-center rounded-lg border-2 border-primary/30 bg-background/50 backdrop-blur-sm px-8 py-4 font-semibold hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                EXPLORE.COMPONENTS
              </span>
            </Link>
          </div>

          <div className="relative mt-2 w-full max-w-6xl">
            <div className="absolute -top-8 -left-8 md:-left-20 md:-top-12 transform rotate-12 bg-gradient-to-br from-background to-primary/5 rounded-xl border border-primary/20 shadow-2xl w-20 h-20 md:w-28 md:h-28 flex items-center justify-center animate-float-slow z-10 backdrop-blur-sm">
              <Box className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-right-16 md:-bottom-8 transform -rotate-12 bg-gradient-to-br from-background to-purple-500/5 rounded-xl border border-purple-500/20 shadow-2xl w-24 h-24 md:w-32 md:h-32 flex items-center justify-center animate-float z-10 backdrop-blur-sm">
              <GitBranch className="h-6 w-6 text-blue-500 -rotate-45" />
            </div>
          </div>

          <div className=" grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
            {[
              { icon: Layers, label: "MODULAR", value: "∞" },
              { icon: Component, label: "RIGID", value: "100%" },
              { icon: Code2, label: "TYPED", value: "TS" },
              { icon: Zap, label: "FAST", value: "<1ms" }
            ].map((stat, index) => (
              <div key={index} className="group text-center p-4 rounded-lg border border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-xs font-mono text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-lg font-bold text-foreground">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection