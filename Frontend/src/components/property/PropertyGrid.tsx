import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import PropertyCard from "./PropertyCard";
import type { Property } from "@/types";

interface PropertyGridProps {
  properties: Property[];
  columns?: 2 | 3 | 4;
  title?: string;
  subtitle?: string;
  className?: string;
}

const columnClasses: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
} as const;

export default function PropertyGrid({
  properties,
  columns = 3,
  title,
  subtitle,
  className,
}: PropertyGridProps) {
  return (
    <section className={cn("w-full", className)}>
      {/* Section Heading */}
      {(title || subtitle) && (
        <div className="mb-10 text-center">
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight text-white md:text-4xl"
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-3 max-w-2xl text-[#94a3b8]"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
          />
        </div>
      )}

      {/* Grid or Empty State */}
      {properties.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={cn("grid gap-6", columnClasses[columns])}
        >
          {properties.map((property) => (
            <motion.div key={property.id} variants={itemVariants}>
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#0f2847]/50 px-8 py-20 text-center backdrop-blur-sm"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#122d4d]/80 ring-1 ring-white/10">
        <SearchX className="h-10 w-10 text-[#7a8fa6]" />
      </div>
      <h3 className="text-xl font-semibold text-white">No properties found</h3>
      <p className="mt-2 max-w-sm text-sm text-[#7a8fa6]">
        We couldn't find any properties matching your criteria. Try adjusting
        your filters or check back later for new listings.
      </p>
    </motion.div>
  );
}
