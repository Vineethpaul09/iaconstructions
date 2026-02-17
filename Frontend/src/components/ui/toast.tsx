import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ─── Toast Variant Styles ───

const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-lg border p-4 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default:
          "border-[#1a3a5c] bg-[#0f2847] text-[#fafafa]",
        success:
          "border-green-600/30 bg-green-950/80 text-green-200",
        error:
          "border-red-600/30 bg-red-950/80 text-red-200",
        info:
          "border-blue-600/30 bg-blue-950/80 text-blue-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ─── Toast Component ───

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string
  description?: string
  onClose?: () => void
  duration?: number
  open?: boolean
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant,
      title,
      description,
      onClose,
      duration = 5000,
      open = true,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(open)

    React.useEffect(() => {
      setVisible(open)
    }, [open])

    React.useEffect(() => {
      if (!visible || duration <= 0) return
      const timer = setTimeout(() => {
        setVisible(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(timer)
    }, [visible, duration, onClose])

    if (!visible) return null

    const icons: Record<string, React.ReactNode> = {
      success: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 shrink-0">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ),
      error: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 shrink-0">
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      ),
      info: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 shrink-0">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      ),
    }

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        <div className="flex items-start gap-3">
          {variant && variant !== "default" && icons[variant]}
          <div className="flex flex-col gap-1">
            {title && (
              <p className="text-sm font-semibold leading-none">{title}</p>
            )}
            {description && (
              <p className="text-sm opacity-80">{description}</p>
            )}
          </div>
        </div>
        {onClose && (
          <button
            onClick={() => {
              setVisible(false)
              onClose()
            }}
            className="shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 cursor-pointer"
            aria-label="Close notification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)
Toast.displayName = "Toast"

// ─── ToastContainer ───

export interface ToastContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center"
}

const positionClasses: Record<string, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
}

const ToastContainer = React.forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ className, position = "bottom-right", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed z-[100] flex max-h-screen w-full max-w-sm flex-col gap-2 pointer-events-none",
        positionClasses[position],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
ToastContainer.displayName = "ToastContainer"

export { Toast, ToastContainer, toastVariants }
