import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { FilterState } from "@/types";

/* ── Option definitions ──────────────────────────────────────────────── */

const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Bungalow",
  "Plot",
  "Commercial",
  "Penthouse",
] as const;

const LOCATIONS = [
  "Bandlaguda Jagir",
  "Attapur",
  "Mehdipatnam",
  "Shamshabad",
  "Secunderabad",
  "Jubilee Hills",
  "HITEC City",
] as const;

const BEDROOM_OPTIONS = ["Any", "1", "2", "3", "4", "5+"] as const;

const STATUS_OPTIONS = ["Available", "Reserved", "Upcoming"] as const;

const SORT_OPTIONS = [
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "newest", label: "Newest First" },
  { value: "area", label: "Largest Area" },
] as const;

const BUDGET_MIN = 1000000; // ₹10 Lac
const BUDGET_MAX = 100000000; // ₹10 Cr
const BUDGET_STEP = 500000; // ₹5 Lac

/* ── Internal filter state ───────────────────────────────────────────── */

interface InternalFilter {
  propertyTypes: string[];
  locations: string[];
  budgetRange: [number, number];
  bedrooms: string;
  statuses: string[];
  sortBy: string;
}

const defaultFilter: InternalFilter = {
  propertyTypes: [],
  locations: [],
  budgetRange: [BUDGET_MIN, BUDGET_MAX],
  bedrooms: "Any",
  statuses: [],
  sortBy: "newest",
};

/* ── Props ───────────────────────────────────────────────────────────── */

interface PropertyFilterProps {
  onChange: (filter: FilterState) => void;
  className?: string;
  /** When true, renders filter content inline (no sidebar/drawer wrappers). */
  inline?: boolean;
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

function formatBudget(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(0)} Lac`;
  return `₹${value.toLocaleString("en-IN")}`;
}

function toFilterState(f: InternalFilter): FilterState {
  return {
    propertyType: f.propertyTypes.map((t) => t.toLowerCase()).join(","),
    location: f.locations.join(","),
    budgetRange: f.budgetRange,
    bedrooms: f.bedrooms,
    status: f.statuses.map((s) => s.toLowerCase()).join(","),
    sortBy: f.sortBy,
  };
}

/* ── Component ───────────────────────────────────────────────────────── */

export default function PropertyFilter({
  onChange,
  className,
  inline = false,
}: PropertyFilterProps) {
  const [filter, setFilter] = useState<InternalFilter>(defaultFilter);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Emit on apply
  const handleApply = useCallback(() => {
    onChange(toFilterState(filter));
    setDrawerOpen(false);
  }, [filter, onChange]);

  const handleReset = useCallback(() => {
    setFilter(defaultFilter);
    onChange(toFilterState(defaultFilter));
  }, [onChange]);

  // Count active filters
  const activeCount =
    filter.propertyTypes.length +
    filter.locations.length +
    filter.statuses.length +
    (filter.bedrooms !== "Any" ? 1 : 0) +
    (filter.budgetRange[0] !== BUDGET_MIN ||
    filter.budgetRange[1] !== BUDGET_MAX
      ? 1
      : 0) +
    (filter.sortBy !== "newest" ? 1 : 0);

  /* ── Toggle helpers ──────────────────────────────────────────────── */

  const toggleArray = (
    key: "propertyTypes" | "locations" | "statuses",
    value: string,
  ) => {
    setFilter((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  /* ── Filter Panel Content (shared between sidebar & drawer) ────── */

  const filterContent = (
    <div className="space-y-1">
      {/* Property Type */}
      <CollapsibleSection title="Property Type" defaultOpen>
        <div className="space-y-2">
          {PROPERTY_TYPES.map((type) => (
            <CheckboxItem
              key={type}
              label={type}
              checked={filter.propertyTypes.includes(type)}
              onChange={() => toggleArray("propertyTypes", type)}
            />
          ))}
        </div>
      </CollapsibleSection>

      {/* Location */}
      <CollapsibleSection title="Location" defaultOpen>
        <div className="space-y-2">
          {LOCATIONS.map((loc) => (
            <CheckboxItem
              key={loc}
              label={loc}
              checked={filter.locations.includes(loc)}
              onChange={() => toggleArray("locations", loc)}
            />
          ))}
        </div>
      </CollapsibleSection>

      {/* Budget Range */}
      <CollapsibleSection title="Budget Range" defaultOpen>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#C9A227]">
              {formatBudget(filter.budgetRange[0])}
            </span>
            <span className="text-[#7a8fa6]">—</span>
            <span className="text-[#C9A227]">
              {formatBudget(filter.budgetRange[1])}
            </span>
          </div>
          {/* Min slider */}
          <div className="space-y-1.5">
            <label className="text-xs text-[#7a8fa6]">Minimum</label>
            <input
              type="range"
              min={BUDGET_MIN}
              max={filter.budgetRange[1] - BUDGET_STEP}
              step={BUDGET_STEP}
              value={filter.budgetRange[0]}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  budgetRange: [Number(e.target.value), prev.budgetRange[1]],
                }))
              }
              className="range-gold w-full"
            />
          </div>
          {/* Max slider */}
          <div className="space-y-1.5">
            <label className="text-xs text-[#7a8fa6]">Maximum</label>
            <input
              type="range"
              min={filter.budgetRange[0] + BUDGET_STEP}
              max={BUDGET_MAX}
              step={BUDGET_STEP}
              value={filter.budgetRange[1]}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  budgetRange: [prev.budgetRange[0], Number(e.target.value)],
                }))
              }
              className="range-gold w-full"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Bedrooms */}
      <CollapsibleSection title="Bedrooms" defaultOpen>
        <div className="flex flex-wrap gap-2">
          {BEDROOM_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter((prev) => ({ ...prev, bedrooms: opt }))}
              className={cn(
                "rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-all",
                filter.bedrooms === opt
                  ? "border-[#C9A227] bg-[#C9A227]/15 text-[#C9A227]"
                  : "border-white/10 bg-white/5 text-[#e4e4e7] hover:border-white/20 hover:text-[#b0c4d8]",
              )}
            >
              {opt === "Any" ? "Any" : `${opt} BHK`}
            </button>
          ))}
        </div>
      </CollapsibleSection>

      {/* Status */}
      <CollapsibleSection title="Status">
        <div className="space-y-2">
          {STATUS_OPTIONS.map((s) => (
            <CheckboxItem
              key={s}
              label={s}
              checked={filter.statuses.includes(s)}
              onChange={() => toggleArray("statuses", s)}
            />
          ))}
        </div>
      </CollapsibleSection>

      {/* Sort By */}
      <CollapsibleSection title="Sort By">
        <div className="space-y-1.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                setFilter((prev) => ({ ...prev, sortBy: opt.value }))
              }
              className={cn(
                "w-full rounded-lg px-3 py-2 text-left text-sm transition-all",
                filter.sortBy === opt.value
                  ? "bg-[#C9A227]/15 text-[#C9A227]"
                  : "text-[#e4e4e7] hover:bg-white/5 hover:text-[#b0c4d8]",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </CollapsibleSection>

      {/* Actions */}
      <div className="sticky bottom-0 space-y-2 border-t border-white/5 bg-[#0f2847]/95 pt-4 backdrop-blur-sm">
        <Button
          onClick={handleApply}
          className="w-full bg-[#C9A227] text-[#0B1F3A] hover:bg-[#a8861e] font-semibold"
        >
          Apply Filters
        </Button>
        <button
          onClick={handleReset}
          className="flex w-full items-center justify-center gap-1.5 py-2 text-sm text-[#7a8fa6] transition-colors hover:text-[#b0c4d8]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset All
        </button>
      </div>
    </div>
  );

  /* ── Inline mode – render filter content directly ──────────────── */
  if (inline) {
    return <div className={className}>{filterContent}</div>;
  }

  return (
    <>
      {/* ── Desktop Sidebar ───────────────────────────────────────── */}
      <aside className={cn("hidden lg:block w-[300px] shrink-0", className)}>
        <div className="sticky top-24 rounded-2xl border border-white/10 bg-[#0f2847]/70 p-5 backdrop-blur-md">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
              <SlidersHorizontal className="h-5 w-5 text-[#C9A227]" />
              Filters
            </h3>
            {activeCount > 0 && (
              <Badge className="bg-[#C9A227]/15 text-[#C9A227] text-xs border-[#C9A227]/30">
                {activeCount}
              </Badge>
            )}
          </div>
          {filterContent}
        </div>
      </aside>

      {/* ── Mobile Trigger Button ─────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <Button
          onClick={() => setDrawerOpen(true)}
          className="h-14 w-14 rounded-full bg-[#C9A227] p-0 text-[#0B1F3A] shadow-xl shadow-[#C9A227]/20 hover:bg-[#a8861e]"
        >
          <SlidersHorizontal className="h-5 w-5" />
          {activeCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#0B1F3A]">
              {activeCount}
            </span>
          )}
        </Button>
      </div>

      {/* ── Mobile Drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-[#071428]/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto border-l border-white/10 bg-[#0f2847]/95 p-5 backdrop-blur-md lg:hidden"
            >
              {/* Drawer Header */}
              <div className="mb-5 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <SlidersHorizontal className="h-5 w-5 text-[#C9A227]" />
                  Filters
                  {activeCount > 0 && (
                    <Badge className="ml-2 bg-[#C9A227]/15 text-[#C9A227] text-xs border-[#C9A227]/30">
                      {activeCount}
                    </Badge>
                  )}
                </h3>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-[#e4e4e7] transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {filterContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Custom range slider styles ────────────────────────────── */}
      <style>{`
        .range-gold {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border-radius: 9999px;
          background: linear-gradient(to right, #C9A22733, #C9A22766);
          outline: none;
          cursor: pointer;
        }
        .range-gold::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #C9A227;
          border: 2px solid #0f2847;
          box-shadow: 0 0 8px #C9A22755;
          cursor: grab;
          transition: box-shadow 0.2s;
        }
        .range-gold::-webkit-slider-thumb:hover {
          box-shadow: 0 0 14px #C9A22788;
        }
        .range-gold::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #C9A227;
          border: 2px solid #0f2847;
          box-shadow: 0 0 8px #C9A22755;
          cursor: grab;
        }
      `}</style>
    </>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────── */

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/5 py-4 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-medium text-[#b0c4d8] transition-colors hover:text-white"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-[#7a8fa6] transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function CheckboxItem({ label, checked, onChange }: CheckboxItemProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1 text-sm transition-colors hover:bg-white/5">
      <div
        className={cn(
          "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-all",
          checked
            ? "border-[#C9A227] bg-[#C9A227]"
            : "border-[#1a3a5c] bg-transparent",
        )}
      >
        {checked && (
          <svg
            className="h-3 w-3 text-[#0B1F3A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className={cn("text-[#e4e4e7]", checked && "text-[#cbd5e1]")}>
        {label}
      </span>
    </label>
  );
}
