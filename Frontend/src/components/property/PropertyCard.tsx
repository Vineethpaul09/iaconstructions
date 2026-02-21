import { useState } from "react";
import { motion } from "framer-motion";
// Removed navigation to individual property pages per request
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Building2,
  Home,
  Landmark,
  LandPlot,
  Store,
  Building,
  Eye,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice, formatArea } from "@/lib/utils";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const statusConfig: Record<
  Property["status"],
  { label: string; className: string }
> = {
  available: {
    label: "Available",
    className: "bg-emerald-500/90 text-white border-emerald-400",
  },
  reserved: {
    label: "Reserved",
    className: "bg-amber-500/90 text-white border-amber-400",
  },
  sold: {
    label: "Sold",
    className: "bg-red-500/90 text-white border-red-400",
  },
  upcoming: {
    label: "Upcoming",
    className: "bg-blue-500/90 text-white border-blue-400",
  },
};

const typeIcons: Record<Property["type"], React.ElementType> = {
  apartment: Building2,
  villa: Home,
  bungalow: Landmark,
  plot: LandPlot,
  commercial: Store,
  penthouse: Building,
};

const typeLabels: Record<Property["type"], string> = {
  apartment: "Apartment",
  villa: "Villa",
  bungalow: "Bungalow",
  plot: "Plot",
  commercial: "Commercial",
  penthouse: "Penthouse",
};

export default function PropertyCard({
  property,
  className,
}: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const TypeIcon = typeIcons[property.type];
  const status = statusConfig[property.status];
  const heroImage = property.images?.[0];

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in "${property.title}" (${formatPrice(property.price)}). Please share more details.`,
  );
  const whatsappLink = `https://wa.me/919154450123?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className={cn("w-full", className)}
    >
      <Card className="group overflow-hidden border-white/10 bg-[#0f2847]/80 backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-[#C9A227]/5">
        {/* Image Section */}
        <div
          className="relative aspect-video overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image or Gradient Placeholder */}
          {heroImage ? (
            <img
              src={heroImage}
              alt={property.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#122d4d] via-[#163561] to-[#0f2847] transition-transform duration-500 group-hover:scale-110" />
          )}

          {/* Hover Overlay */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center bg-[#071428]/50 backdrop-blur-[2px]"
          >
            <Button
              variant="outline"
              className="border-[#C9A227] bg-transparent text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0B1F3A]"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </motion.div>

          {/* Status Badge – top left */}
          <Badge
            className={cn(
              "absolute left-3 top-3 border text-xs font-semibold shadow-lg",
              status.className,
            )}
          >
            {status.label}
          </Badge>

          {/* Featured Badge + Save Button – top right */}
          <div className="absolute right-3 top-3 flex items-center gap-2">
            {property.featured && (
              <Badge className="border-[#C9A227]/50 bg-[#C9A227]/90 text-[#0B1F3A] text-xs font-semibold shadow-lg">
                Featured
              </Badge>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsSaved(!isSaved);
              }}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full bg-[#071428]/50 backdrop-blur-sm transition-all hover:bg-[#071428]/70",
                isSaved && "bg-red-500/20",
              )}
              aria-label={isSaved ? "Unsave property" : "Save property"}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  isSaved
                    ? "fill-red-500 text-red-500"
                    : "text-white/80 hover:text-white",
                )}
              />
            </button>
          </div>
        </div>

        {/* Card Content */}
        <CardContent className="space-y-3 p-5">
          {/* Type Badge */}
          <div className="flex items-center gap-2">
            <TypeIcon className="h-4 w-4 text-[#C9A227]" />
            <Badge
              variant="outline"
              className="border-white/10 bg-white/5 text-xs text-[#e4e4e7]"
            >
              {typeLabels[property.type]}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="line-clamp-1 text-lg font-semibold text-white">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-[#e4e4e7]">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C9A227]/70" />
            <span className="line-clamp-1">
              {property.location.address}, {property.location.city}
            </span>
          </div>

          {/* Key Metrics */}
          {property.type !== "plot" && (
            <div className="flex items-center gap-4 border-y border-white/5 py-3 text-sm text-[#b0c4d8]">
              <div className="flex items-center gap-1.5" title="Bedrooms">
                <BedDouble className="h-4 w-4 text-[#7a8fa6]" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1.5" title="Bathrooms">
                <Bath className="h-4 w-4 text-[#7a8fa6]" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1.5" title="Area">
                <Maximize className="h-4 w-4 text-[#7a8fa6]" />
                <span>{formatArea(property.area)}</span>
              </div>
            </div>
          )}

          {property.type === "plot" && (
            <div className="flex items-center gap-4 border-y border-white/5 py-3 text-sm text-[#b0c4d8]">
              <div className="flex items-center gap-1.5" title="Area">
                <Maximize className="h-4 w-4 text-[#7a8fa6]" />
                <span>{formatArea(property.area)}</span>
              </div>
            </div>
          )}

          {/* Price */}
          <div>
            <p className="text-xl font-bold text-[#C9A227]">
              {formatPrice(property.price)}
            </p>
            <p className="text-xs text-[#7a8fa6]">
              {formatPrice(property.pricePerSqFt)}/sq.ft
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1">
              <Button
                variant="outline"
                className="w-full border-white/10 bg-white/5 text-sm text-white"
                onClick={(e) => e.preventDefault()}
              >
                View Details
              </Button>
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="bg-emerald-600 text-sm text-white hover:bg-emerald-700">
                <MessageCircle className="mr-1.5 h-4 w-4" />
                WhatsApp
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
