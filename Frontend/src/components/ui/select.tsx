import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  "aria-label"?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      value,
      onValueChange,
      options,
      placeholder = "Select...",
      disabled = false,
      className,
      id,
      name,
      "aria-label": ariaLabel,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const selectedOption = options.find((o) => o.value === value);

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (open && highlightedIndex >= 0) {
            const opt = options[highlightedIndex];
            if (!opt.disabled) {
              onValueChange?.(opt.value);
              setOpen(false);
            }
          } else {
            setOpen((prev) => !prev);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!open) {
            setOpen(true);
          } else {
            setHighlightedIndex((prev) =>
              prev < options.length - 1 ? prev + 1 : 0,
            );
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (open) {
            setHighlightedIndex((prev) =>
              prev > 0 ? prev - 1 : options.length - 1,
            );
          }
          break;
        case "Escape":
          setOpen(false);
          break;
      }
    };

    return (
      <div ref={containerRef} className={cn("relative", className)}>
        {name && <input type="hidden" name={name} value={value ?? ""} />}
        <button
          ref={ref}
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={ariaLabel}
          disabled={disabled}
          onClick={() => !disabled && setOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-[#1a3a5c] bg-[#0f2847] px-3 py-2 text-sm text-[#fafafa] shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            !selectedOption && "text-[#e4e4e7]",
          )}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
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
              "ml-2 shrink-0 text-[#e4e4e7] transition-transform duration-200",
              open && "rotate-180",
            )}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-[#1a3a5c] bg-[#0f2847] py-1 text-sm shadow-xl"
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                aria-disabled={option.disabled}
                className={cn(
                  "relative flex cursor-pointer select-none items-center px-3 py-2 text-[#fafafa] transition-colors",
                  value === option.value && "bg-[#C9A227]/10 text-[#C9A227]",
                  highlightedIndex === index && "bg-[#1a3a5c]",
                  option.disabled && "cursor-not-allowed opacity-50",
                )}
                onClick={() => {
                  if (!option.disabled) {
                    onValueChange?.(option.value);
                    setOpen(false);
                  }
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option.label}
                {value === option.value && (
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
                    className="absolute right-3 text-[#C9A227]"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";

export { Select };
