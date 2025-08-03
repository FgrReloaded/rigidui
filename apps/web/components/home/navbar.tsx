import Link from 'next/link'
import localFont from 'next/font/local'
import dynamic from 'next/dynamic'
import { GitHubStars } from '../github-stars'
import RigidLogo from '../logo'
const navFont = localFont({ src: '../../fonts/font-nav.otf' })


const ThemeToggle = dynamic(() => import('../nav-theme-toggle').then(mod => ({ default: mod.NavThemeToggle })), {
  ssr: false,
  loading: () => <div className="lg:ml-4 ml-2 lg:pl-4 pl-2 border-l border-gray-200 dark:border-gray-700">
    <div className="flex items-center lg:gap-3 gap-1.5 px-4 py-2.5 rounded-lg">
      <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800/60">
        <div className="w-4 h-4" />
      </div>
      <span className="lg:text-sm text-xs max-sm:hidden font-medium text-gray-700 dark:text-gray-300">Theme</span>
    </div>
  </div>
})
const Sidebar = () => {

  return (
    <div style={navFont.style} className="fixed top-1.5 left-0 w-screen h-16 bg-transparent z-50 flex gap-2 items-center justify-center">
      <div className="h-full sm:w-[8vw] w-[20vw] dark:bg-transparent backdrop-blur-lg rounded-lg flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-black/50 dark:hover:shadow-black/70 relative overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-br from-gray-200/20 via-gray-200/20 to-gray-400/20 dark:from-gray-600/30 dark:via-gray-500/30 dark:to-gray-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="flex items-center gap-2 scale-[0.75]">
          <RigidLogo /> <span className="text-gray-700 dark:text-gray-300 text-xs max-lg:hidden">Rigid UI</span>
        </div>
      </div>

      <div className="h-full sm:w-[80vw] bg-transparent backdrop-blur-lg rounded-lg flex items-center justify-center px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-blue-500/10 via-transparent to-purple-500/10 dark:from-blue-400/20 dark:via-transparent dark:to-purple-400/20"></div>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 20">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-600" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <nav className="flex items-center lg:gap-6 relative z-10">
          <Link href="/" className="flex items-center lg:gap-3 gap-1.5 sm:px-4 px-3 py-2.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200 group border border-transparent hover:border-blue-100 dark:hover:border-blue-800 hover:shadow-xs dark:hover:shadow-blue-900/20">
            <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/50 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/60 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-600 dark:text-blue-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
            </div>
            <span className="lg:text-sm text-xs max-sm:hidden font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              Home
            </span>
          </Link>

          <Link href="/docs" className="flex items-center lg:gap-3 gap-1.5 sm:px-4 px-3 py-2.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-200 group border border-transparent hover:border-purple-100 dark:hover:border-purple-800 hover:shadow-xs dark:hover:shadow-purple-900/20">
            <div className="p-1.5 rounded-md bg-purple-100 dark:bg-purple-900/50 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/60 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-purple-600 dark:text-purple-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="lg:text-sm text-xs max-sm:hidden font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
              Docs
            </span>
          </Link>

          <Link href="https://examples.rigidui.com" target='_blank' className="flex items-center lg:gap-3 gap-1.5 sm:px-4 px-3 py-2.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-200 group border border-transparent hover:border-emerald-100 dark:hover:border-emerald-800 hover:shadow-xs dark:hover:shadow-emerald-900/20">
            <div className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-900/50 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/60 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-600 dark:text-emerald-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <span className="lg:text-sm text-xs max-sm:hidden font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
              Examples
            </span>
          </Link>

          <ThemeToggle />
        </nav>
      </div >

      <Link target='_blank' href="https://github.com/fgrreloaded/rigidui" className="h-full sm:w-[8vw] w-[20vw] dark:bg-transparent backdrop-blur-lg rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-black/50 dark:hover:shadow-black/70 relative overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-br from-gray-200/20 via-gray-200/20 to-gray-400/20 dark:from-gray-600/30 dark:via-gray-500/30 dark:to-gray-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="w-8 h-8 flex items-center justify-center group relative z-10">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-black dark:text-white transition-colors drop-shadow-lg" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </div>
        <GitHubStars className="relative z-10 mt-1 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors" />
      </Link>
    </div >
  )
}

export default Sidebar