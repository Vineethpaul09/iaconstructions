import * as React from "react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
  expandedItems: Set<string>;
  toggle: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(
  undefined,
);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion components must be used within an <Accordion> provider",
    );
  }
  return context;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  collapsible?: boolean;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      defaultValue,
      collapsible = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
      () => {
        if (!defaultValue) return new Set();
        if (Array.isArray(defaultValue)) return new Set(defaultValue);
        return new Set([defaultValue]);
      },
    );

    const toggle = React.useCallback(
      (value: string) => {
        setExpandedItems((prev) => {
          const next = new Set(prev);
          if (next.has(value)) {
            if (collapsible || type === "multiple") {
              next.delete(value);
            }
          } else {
            if (type === "single") {
              next.clear();
            }
            next.add(value);
          }
          return next;
        });
      },
      [type, collapsible],
    );

    return (
      <AccordionContext.Provider value={{ expandedItems, toggle, type }}>
        <div
          ref={ref}
          className={cn("w-full divide-y divide-[#1a3a5c]", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

// ─── AccordionItem ───

const AccordionItemContext = React.createContext<string>("");

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => (
    <AccordionItemContext.Provider value={value}>
      <div
        ref={ref}
        data-state={
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useAccordionContext().expandedItems.has(value) ? "open" : "closed"
        }
        className={cn("py-0", className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  ),
);
AccordionItem.displayName = "AccordionItem";

// ─── AccordionTrigger ───

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { expandedItems, toggle } = useAccordionContext();
  const value = React.useContext(AccordionItemContext);
  const isOpen = expandedItems.has(value);

  return (
    <h3 className="flex">
      <button
        ref={ref}
        type="button"
        aria-expanded={isOpen}
        onClick={() => toggle(value)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium text-[#fafafa] transition-all hover:text-[#C9A227] cursor-pointer [&[data-state=open]>svg]:rotate-45",
          className,
        )}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "shrink-0 text-[#94a3b8] transition-transform duration-200",
            isOpen && "rotate-45",
          )}
        >
          <path d="M5 12h14" />
          <path
            d="M12 5v14"
            className={cn(
              "origin-center transition-all duration-200",
              isOpen && "scale-0",
            )}
          />
        </svg>
      </button>
    </h3>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

// ─── AccordionContent ───

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { expandedItems } = useAccordionContext();
  const value = React.useContext(AccordionItemContext);
  const isOpen = expandedItems.has(value);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number>(0);

  React.useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, children]);

  return (
    <div
      ref={ref}
      role="region"
      data-state={isOpen ? "open" : "closed"}
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ height: isOpen ? height : 0 }}
      {...props}
    >
      <div
        ref={contentRef}
        className={cn("pb-4 text-sm text-[#94a3b8]", className)}
      >
        {children}
      </div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
