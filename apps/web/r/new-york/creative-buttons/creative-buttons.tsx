import * as React from "react"
import { cn } from "@/lib/utils"

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export const GradientGlowButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center font-medium text-base px-6 py-3 text-white bg-gradient-to-t from-indigo-900 to-indigo-600 border-none shadow-[0_0.7em_1.5em_-0.5em_rgba(67,56,202,0.6)] tracking-wider rounded-full cursor-pointer select-none transition-all duration-200 hover:shadow-[0_0.5em_1.5em_-0.5em_rgba(67,56,202,0.8)] hover:bg-gradient-to-t hover:from-indigo-950 hover:to-indigo-700 active:shadow-[0_0.3em_1em_-0.5em_rgba(67,56,202,0.8)] active:scale-95",
          className
        )}
        role="button"
        {...props}
      >
        {children}
      </button>
    )
  }
)
GradientGlowButton.displayName = "GradientGlowButton"

export const AnimatedBorderButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative dark:bg-neutral-800 bg-neutral-200 rounded-full p-px overflow-hidden",
          className
        )}
        {...props}
      >
        <span className="absolute inset-0 rounded-full overflow-hidden">
          <span className="inset-0 absolute pointer-events-none select-none">
            <span
              className="block -translate-x-1/2 -translate-y-1/3 size-24 blur-xl"
              style={{ background: "linear-gradient(135deg, rgb(122, 105, 249), rgb(242, 99, 120), rgb(245, 131, 63))" }}
            />
          </span>
        </span>

        <span
          className="inset-0 absolute pointer-events-none select-none"
          style={{ animation: "10s ease-in-out 0s infinite alternate none running border-glow-translate" }}
        >
          <span
            className="block z-0 h-full w-12 blur-xl -translate-x-1/2 rounded-full"
            style={{ animation: "10s ease-in-out 0s infinite alternate none running border-glow-scale", background: "linear-gradient(135deg, rgb(122, 105, 249), rgb(242, 99, 120), rgb(245, 131, 63))" }}
          />
        </span>

        <span className="flex items-center justify-center gap-1 relative z-[1] dark:bg-neutral-950/90 bg-neutral-50/90 rounded-full py-3 px-6 pl-3 w-full">
          <span className="relative group-hover:scale-105 transition-transform group-hover:rotate-[360deg] duration-500">
            <span
              className="rounded-full size-11 absolute opacity-0 dark:opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-lg"
              style={{ animation: "14s ease-in-out 0s infinite alternate none running star-shine", background: "linear-gradient(135deg, rgb(59, 196, 242), rgb(122, 105, 249), rgb(242, 99, 120), rgb(245, 131, 63))" }}
            />
          </span>
          <span className="bg-gradient-to-b ml-1.5 dark:from-white dark:to-white/50 from-neutral-950 to-neutral-950/50 bg-clip-text text-sm text-transparent group-hover:scale-105 transition transform-gpu">
            {children}
          </span>
        </span>
      </button>
    )
  }
)
AnimatedBorderButton.displayName = "AnimatedBorderButton"

export const RetroButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-[#fbeee0] border-2 border-[#422800] rounded-[30px] shadow-[3px_3px_#422800] text-[#422800] cursor-pointer inline-block font-semibold text-lg px-[18px] leading-[50px] text-center no-underline select-none touch-manipulation hover:bg-white active:shadow-[1px_1px_#422800] active:translate-x-[2px] active:translate-y-[2px] transition-all",
          className
        )}
        role="button"
        {...props}
      >
        {children}
      </button>
    )
  }
)
RetroButton.displayName = "RetroButton"

export const PurpleGradientButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95",
          className
        )}
        {...props}
      >
        <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-white rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">
          {children}
        </span>
      </button>
    )
  }
)
PurpleGradientButton.displayName = "PurpleGradientButton"

export const NeumorphismButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("bg-gradient-to-b from-stone-300/40 to-transparent p-[4px] rounded-[16px]", className)}>
        <button
          ref={ref}
          className="group p-[4px] rounded-[12px] bg-gradient-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995] text-black w-full"
          {...props}
        >
          <div className="bg-gradient-to-b from-stone-200/40 to-white/80 rounded-[8px] px-2 py-2">
            <div className="flex gap-2 items-center justify-center">
              <span className="font-semibold">{children}</span>
            </div>
          </div>
        </button>
      </div>
    )
  }
)
NeumorphismButton.displayName = "NeumorphismButton"

interface RainbowButtonProps extends BaseButtonProps {
  showStars?: boolean
  starCount?: number
}

export const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  ({ className, children, showStars = false, starCount = 11, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "items-center justify-center whitespace-nowrap rounded-md text-sm font-medium duration-200 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative animate-rainbow cursor-pointer border-0 bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] bg-[length:200%] text-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] before:[filter:blur(calc(0.8*1rem))] dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] hover:scale-105 active:scale-95 h-10 px-4 py-2 inline-flex",
          className
        )}
        {...props}
      >
        <div className="flex items-center">
          {children}
          {showStars && (
            <div className="ml-2 flex items-center gap-1 text-sm md:flex">
              <svg
                className="size-4 text-gray-500 transition-all duration-200 group-hover:text-yellow-300"
                data-slot="icon"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  fillRule="evenodd"
                />
              </svg>
              <span className="inline-block tabular-nums tracking-wider font-display font-medium text-black dark:text-white">
                {starCount}
              </span>
            </div>
          )}
        </div>
      </button>
    )
  }
)
RainbowButton.displayName = "RainbowButton"

interface GitHubStarButtonProps extends BaseButtonProps {
  starCount?: number
  showIcon?: boolean
}

export const GitHubStarButton = React.forwardRef<HTMLButtonElement, GitHubStarButtonProps>(
  ({ className, children, starCount = 11, showIcon = true, ...props }, ref) => {
    return (
      <RainbowButton
        ref={ref}
        className={className}
        showStars={true}
        starCount={starCount}
        {...props}
      >
        {showIcon && (
          <svg className="size-4" viewBox="0 0 438.549 438.549">
            <path
              d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
              fill="#fff"
            />
          </svg>
        )}
        <span className="ml-1 text-white lg:inline p-1">{children}</span>
      </RainbowButton>
    )
  }
)
GitHubStarButton.displayName = "GitHubStarButton"