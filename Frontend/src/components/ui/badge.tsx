import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:ring-offset-2 focus:ring-offset-[#0B1F3A]",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#C9A227] text-[#0B1F3A] shadow hover:bg-[#a8861e]",
        secondary:
          "border-transparent bg-[#1a3a5c] text-[#fafafa] hover:bg-[#163561]",
        outline: "border-[#1a3a5c] text-[#fafafa]",
        destructive:
          "border-transparent bg-red-600/20 text-red-400 hover:bg-red-600/30",
        success:
          "border-transparent bg-green-600/20 text-green-400 hover:bg-green-600/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
