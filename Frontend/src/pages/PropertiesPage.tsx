import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  List,
  ChevronRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PropertyGrid from "@/components/property/PropertyGrid";
import PropertyCard from "@/components/property/PropertyCard";
import PropertyFilter from "@/components/property/PropertyFilter";
import { properties } from "@/data/properties";
import type { FilterState, Property } from "@/types";
import { Link } from "react-router-dom";

/* ── Animation helpers ─────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

/* ── Sort helper ───────────────────────────────────────────────────── */

function sortProperties(list: Property[], sortBy: string): Property[] {
  const sorted = [...list];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "area":
      return sorted.sort((a, b) => b.area - a.area);
    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
}

/* ── Component ─────────────────────────────────────────────────────── */

export default function PropertiesPage() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filter, setFilter] = useState<FilterState>({
    location: searchParams.get("location") ?? "",
    propertyType: searchParams.get("type") ?? "",
    budgetRange: [1000000, 100000000],
    bedrooms: searchParams.get("bedrooms") ?? "Any",
    status: searchParams.get("status") ?? "",
    sortBy: "newest",
  });

  const handleFilterChange = useCallback((f: FilterState) => {
    setFilter(f);
  }, []);

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Location
    if (filter.location) {
      const locs = filter.location.toLowerCase().split(",").filter(Boolean);
      if (locs.length > 0) {
        result = result.filter((p) =>
          locs.some(
            (l) =>
              p.location.city.toLowerCase().includes(l) ||
              p.location.address.toLowerCase().includes(l),
          ),
        );
      }
    }

    // Property type
    if (filter.propertyType) {
      const types = filter.propertyType
        .toLowerCase()
        .split(",")
        .filter(Boolean);
      if (types.length > 0) {
        result = result.filter((p) => types.includes(p.type.toLowerCase()));
      }
    }

    // Budget
    if (filter.budgetRange) {
      result = result.filter(
        (p) =>
          p.price >= filter.budgetRange[0] && p.price <= filter.budgetRange[1],
      );
    }

    // Bedrooms
    if (filter.bedrooms && filter.bedrooms !== "Any") {
      const bed = filter.bedrooms === "5+" ? 5 : parseInt(filter.bedrooms, 10);
      result = result.filter((p) =>
        filter.bedrooms === "5+" ? p.bedrooms >= 5 : p.bedrooms === bed,
      );
    }

    // Status
    if (filter.status) {
      const statuses = filter.status.toLowerCase().split(",").filter(Boolean);
      if (statuses.length > 0) {
        result = result.filter((p) => statuses.includes(p.status));
      }
    }

    // Sort
    return sortProperties(result, filter.sortBy);
  }, [filter]);

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white">
      {/* ── Hero banner ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0f2847] to-[#0B1F3A]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 text-sm text-[#7a8fa6] mb-6"
          >
            <Link to="/" className="hover:text-[#C9A227] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#C9A227]">Properties</span>
          </motion.nav>

          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Our Properties
            </h1>
            <p className="text-[#e4e4e7] max-w-2xl">
              We build premium residences and investment opportunities in and
              around Hyderabad, Telangana.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Toolbar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center justify-between py-6 border-b border-[#1a3a5c]"
        >
          <p className="text-[#e4e4e7] text-sm">
            Showing{" "}
            <span className="text-white font-medium">
              {filteredProperties.length}
            </span>{" "}
            {filteredProperties.length === 1 ? "property" : "properties"}
          </p>

          <div className="flex items-center gap-3">
            {/* Mobile filter trigger */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden border-[#1a3a5c] text-[#b0c4d8] hover:text-[#C9A227] hover:border-[#C9A227]/40"
              onClick={() => setMobileFilterOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>

            {/* View toggle */}
            <div className="hidden sm:flex items-center gap-1 border border-[#1a3a5c] rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === "grid"
                    ? "bg-[#C9A227]/20 text-[#C9A227]"
                    : "text-[#7a8fa6] hover:text-[#b0c4d8]",
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === "list"
                    ? "bg-[#C9A227]/20 text-[#C9A227]"
                    : "text-[#7a8fa6] hover:text-[#b0c4d8]",
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex gap-8 mt-8">
          {/* Sidebar filter – desktop */}
          <aside className="hidden lg:block w-1/4 flex-shrink-0">
            <PropertyFilter onChange={handleFilterChange} />
          </aside>

          {/* Properties grid / list */}
          <div className="flex-1 min-w-0">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-[#7a8fa6] text-lg">
                  No properties match your filters.
                </p>
                <p className="text-[#7a8fa6] text-sm mt-2">
                  Try adjusting your search criteria.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <PropertyGrid properties={filteredProperties} columns={3} />
            ) : (
              <div className="flex flex-col gap-4">
                {filteredProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Mobile filter drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[#071428]/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-80 bg-[#0B1F3A] border-r border-[#1a3a5c] p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-[#e4e4e7] hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <PropertyFilter
                inline
                onChange={(f) => {
                  handleFilterChange(f);
                  setMobileFilterOpen(false);
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
