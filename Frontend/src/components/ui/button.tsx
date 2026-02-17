import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#C9A227] text-[#0B1F3A] shadow hover:bg-[#a8861e] active:bg-[#a8861e]",
        secondary:
          "bg-[#1a3a5c] text-[#fafafa] shadow-sm hover:bg-[#163561] active:bg-[#1a3a5c]",
        outline:
          "border border-[#1a3a5c] bg-transparent text-[#fafafa] shadow-sm hover:bg-[#1a3a5c]/50 hover:text-[#fafafa]",
        ghost:
          "text-[#fafafa] hover:bg-[#1a3a5c]/50 hover:text-[#fafafa]",
        destructive:
          "bg-red-600 text-[#fafafa] shadow-sm hover:bg-red-700 active:bg-red-800",
        link:
          "text-[#C9A227] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        className: cn(
          buttonVariants({ variant, size }),
          className,
          (children as React.ReactElement<{ className?: string }>).props.className
        ),
        ref,
      });
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
