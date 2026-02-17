import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Option Data                                                        */
/* ------------------------------------------------------------------ */

const locationOptions = [
  { value: "", label: "All Locations" },
  { value: "Bandlaguda Jagir", label: "Bandlaguda Jagir" },
  { value: "Attapur", label: "Attapur" },
  { value: "Mehdipatnam", label: "Mehdipatnam" },
  { value: "Shamshabad", label: "Shamshabad" },
  { value: "Secunderabad", label: "Secunderabad" },
];

const propertyTypeOptions = [
  { value: "", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "bungalow", label: "Bungalow" },
  { value: "plot", label: "Plot" },
  { value: "commercial", label: "Commercial" },
  { value: "penthouse", label: "Penthouse" },
];

const bedroomOptions = [
  { value: "", label: "Any" },
  { value: "1", label: "1 BHK" },
  { value: "2", label: "2 BHK" },
  { value: "3", label: "3 BHK" },
  { value: "4", label: "4 BHK" },
  { value: "5", label: "5+ BHK" },
];

/* ------------------------------------------------------------------ */
/*  Budget helpers                                                     */
/* ------------------------------------------------------------------ */

const BUDGET_MIN = 20; // in lakhs
const BUDGET_MAX = 500; // in lakhs (₹5 Cr)
const BUDGET_STEP = 5;

function formatBudget(lakhs: number): string {
  if (lakhs >= 100) {
    const cr = lakhs / 100;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1)}Cr`;
  }
  return `₹${lakhs}L`;
}

/* ------------------------------------------------------------------ */
/*  SearchBar Component                                                */
/* ------------------------------------------------------------------ */

export function SearchBar() {
  const navigate = useNavigate();

  // Filter state
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState<number[]>([BUDGET_MIN, BUDGET_MAX]);
  const [bedrooms, setBedrooms] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (propertyType) params.set("type", propertyType);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (budget[0] !== BUDGET_MIN || budget[1] !== BUDGET_MAX) {
      params.set("budgetMin", String(budget[0] * 100000));
      params.set("budgetMax", String(budget[1] * 100000));
    }

    const qs = params.toString();
    // Properties page navigation disabled; redirecting to Projects instead
    navigate(qs ? `/projects?${qs}` : "/projects");
  }, [location, propertyType, bedrooms, budget, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mx-auto w-full max-w-6xl translate-y-1/2"
    >
      <div
        className={cn(
          "rounded-2xl border border-[#1a3a5c]/60 bg-[#0f2847]/80 p-5 shadow-2xl shadow-black/40",
          "backdrop-blur-xl backdrop-saturate-150",
          "transition-colors duration-300",
          "focus-within:border-[#C9A227]/40",
        )}
      >
        {/* ---- Filter Row ---- */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr_1fr_auto]">
          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-widest text-[#94a3b8]">
              Location
            </label>
            <Select
              value={location}
              onValueChange={setLocation}
              options={locationOptions}
              placeholder="All Locations"
              className="w-full"
              aria-label="Location"
            />
          </div>

          {/* Property Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-widest text-[#94a3b8]">
              Property Type
            </label>
            <Select
              value={propertyType}
              onValueChange={setPropertyType}
              options={propertyTypeOptions}
              placeholder="All Types"
              className="w-full"
              aria-label="Property type"
            />
          </div>

          {/* Budget Range */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-widest text-[#94a3b8]">
              Budget Range
            </label>
            <div className="flex flex-col gap-2 rounded-md border border-[#1a3a5c] bg-[#0f2847] px-3 py-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-[#fafafa]">
                  <IndianRupee className="h-3.5 w-3.5 text-[#C9A227]" />
                  {formatBudget(budget[0])}
                </span>
                <span className="text-[#94a3b8]">—</span>
                <span className="flex items-center gap-1 text-[#fafafa]">
                  <IndianRupee className="h-3.5 w-3.5 text-[#C9A227]" />
                  {formatBudget(budget[1])}
                </span>
              </div>
              <Slider
                min={BUDGET_MIN}
                max={BUDGET_MAX}
                step={BUDGET_STEP}
                value={budget}
                onValueChange={setBudget}
                aria-label="Budget range"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-widest text-[#94a3b8]">
              Bedrooms
            </label>
            <Select
              value={bedrooms}
              onValueChange={setBedrooms}
              options={bedroomOptions}
              placeholder="Any"
              className="w-full"
              aria-label="Bedrooms"
            />
          </div>

          {/* Search Button */}
          <div className="flex flex-col justify-end">
            <Button
              size="lg"
              onClick={handleSearch}
              className="h-10 w-full gap-2 text-sm font-semibold shadow-lg shadow-[#C9A227]/20 lg:w-auto lg:px-8"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>

        {/* ---- Advanced Filters Toggle ---- */}
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAdvanced((prev) => !prev)}
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-[#94a3b8] transition-colors hover:text-[#C9A227]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
            {showAdvanced ? "Hide" : "Advanced"} Filters
          </button>
        </div>

        {/* ---- Advanced Filters Panel (placeholder) ---- */}
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-4 overflow-hidden border-t border-[#1a3a5c]/60 pt-4"
          >
            <p className="text-center text-xs text-[#94a3b8]/60">
              Advanced filter options coming soon — amenities, possession date,
              facing, and more.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
