import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-[#1a3a5c] bg-[#0f2847] px-3 py-2 text-sm text-[#fafafa] placeholder:text-[#e4e4e7] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/50 focus-visible:border-[#C9A227] disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
