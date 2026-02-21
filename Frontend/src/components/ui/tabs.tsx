import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(
  undefined,
);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a <Tabs> provider");
  }
  return context;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const value = controlledValue ?? internalValue;

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        setInternalValue(newValue);
        onValueChange?.(newValue);
      },
      [onValueChange],
    );

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="tablist"
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-lg bg-[#0f2847] border border-[#1a3a5c] p-1 text-[#e4e4e7]",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value: tabValue, ...props }, ref) => {
    const { value, onValueChange } = useTabsContext();
    const isActive = value === tabValue;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        onClick={() => onValueChange(tabValue)}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          isActive
            ? "bg-[#C9A227]/10 text-[#C9A227] shadow-sm"
            : "text-[#e4e4e7] hover:text-[#fafafa] hover:bg-[#1a3a5c]/50",
          className,
        )}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value: tabValue, ...props }, ref) => {
    const { value } = useTabsContext();

    if (value !== tabValue) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        data-state={value === tabValue ? "active" : "inactive"}
        className={cn(
          "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A]",
          className,
        )}
        {...props}
      />
    );
  },
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
