import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  BedDouble,
  Bath,
  Maximize,
  Building2,
  MapPin,
  Share2,
  Heart,
  CalendarDays,
  ShieldCheck,
  Compass,
  Layers,
  ArrowUpDown,
  Car,
  Dumbbell,
  Waves,
  Trees,
  Wifi,
  Zap,
  Camera,
  TreePalm,
  Baby,
  Gamepad2,
  Fence,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, formatArea } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import PropertyGrid from "@/components/property/PropertyGrid";
import { properties } from "@/data/properties";

/* ── Animation ─────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

/* ── Amenity icon map ──────────────────────────────────────────────── */

const amenityIcons: Record<string, React.ReactNode> = {
  "Swimming Pool": <Waves className="h-5 w-5" />,
  Gymnasium: <Dumbbell className="h-5 w-5" />,
  Clubhouse: <Building2 className="h-5 w-5" />,
  "CCTV Surveillance": <Camera className="h-5 w-5" />,
  "Power Backup": <Zap className="h-5 w-5" />,
  "Landscaped Gardens": <Trees className="h-5 w-5" />,
  "Children's Play Area": <Baby className="h-5 w-5" />,
  "Jogging Track": <Fence className="h-5 w-5" />,
  "Indoor Games Room": <Gamepad2 className="h-5 w-5" />,
  "Home Automation": <Wifi className="h-5 w-5" />,
  "Covered Car Parking": <Car className="h-5 w-5" />,
  "Private Infinity Pool": <Waves className="h-5 w-5" />,
  "Rainwater Harvesting": <TreePalm className="h-5 w-5" />,
};

/* ── EMI Calculator ────────────────────────────────────────────────── */

function EMICalculator({ price }: { price: number }) {
  const [loanAmount, setLoanAmount] = useState(Math.round(price * 0.8));
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  const monthlyEmi = useMemo(() => {
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    if (r === 0) return loanAmount / n;
    return (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [loanAmount, tenure, interestRate]);

  return (
    <div className="space-y-5">
      <h4 className="text-white font-semibold">EMI Calculator</h4>

      {/* Loan amount */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[#94a3b8]">Loan Amount</span>
          <span className="text-white font-medium">
            {formatPrice(loanAmount)}
          </span>
        </div>
        <input
          type="range"
          min={500000}
          max={price}
          step={100000}
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          className="w-full accent-[#C9A227]"
        />
      </div>

      {/* Tenure */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[#94a3b8]">Tenure</span>
          <span className="text-white font-medium">{tenure} years</span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          step={1}
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
          className="w-full accent-[#C9A227]"
        />
      </div>

      {/* Interest rate */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[#94a3b8]">Interest Rate</span>
          <span className="text-white font-medium">{interestRate}%</span>
        </div>
        <input
          type="range"
          min={5}
          max={15}
          step={0.1}
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full accent-[#C9A227]"
        />
      </div>

      <Separator className="bg-[#122d4d]" />

      <div className="text-center py-2">
        <p className="text-[#94a3b8] text-sm">Estimated Monthly EMI</p>
        <p className="text-3xl font-bold text-[#C9A227] mt-1">
          {formatPrice(Math.round(monthlyEmi))}
          <span className="text-sm text-[#7a8fa6] font-normal">/month</span>
        </p>
      </div>
    </div>
  );
}

/* ── Lead Modal ────────────────────────────────────────────────────── */

function LeadModal({
  open,
  onClose,
  propertyTitle,
}: {
  open: boolean;
  onClose: () => void;
  propertyTitle: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[#071428]/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-[#0f2847] border border-[#1a3a5c] rounded-xl p-6 w-full max-w-md mx-4 z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7a8fa6] hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-bold text-white mb-1">Enquire Now</h3>
        <p className="text-[#7a8fa6] text-sm mb-6">{propertyTitle}</p>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <Input
            placeholder="Your Name"
            className="bg-[#122d4d] border-[#1a3a5c] text-white placeholder:text-[#7a8fa6]"
            required
          />
          <Input
            type="email"
            placeholder="Email Address"
            className="bg-[#122d4d] border-[#1a3a5c] text-white placeholder:text-[#7a8fa6]"
            required
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            className="bg-[#122d4d] border-[#1a3a5c] text-white placeholder:text-[#7a8fa6]"
            required
          />
          <Textarea
            placeholder="Your Message"
            rows={3}
            className="bg-[#122d4d] border-[#1a3a5c] text-white placeholder:text-[#7a8fa6]"
          />
          <Button
            type="submit"
            className="w-full bg-[#C9A227] hover:bg-[#a8861e] text-[#0B1F3A] font-semibold"
          >
            Submit Enquiry
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

/* ── Detail Page ───────────────────────────────────────────────────── */

export default function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [leadOpen, setLeadOpen] = useState(false);

  const property = properties.find((p) => p.slug === slug);

  const similarProperties = useMemo(() => {
    if (!property) return [];
    return properties
      .filter(
        (p) =>
          p.id !== property.id &&
          (p.type === property.type ||
            p.location.city === property.location.city),
      )
      .slice(0, 3);
  }, [property]);

  if (!property) {
    return (
      <main className="min-h-screen bg-[#0B1F3A] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Property Not Found</h1>
          <p className="text-[#94a3b8] mb-6">
            The property you're looking for doesn't exist.
          </p>
          <Link to="/projects">
            <Button className="bg-[#C9A227] hover:bg-[#a8861e] text-[#0B1F3A]">
              Browse Properties
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const statusColors: Record<string, string> = {
    available: "bg-emerald-500/90",
    reserved: "bg-amber-500/90",
    sold: "bg-red-500/90",
    upcoming: "bg-blue-500/90",
  };

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white">
      <LeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        propertyTitle={property.title}
      />

      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <section className="pt-28 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.nav
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 text-sm text-[#7a8fa6] flex-wrap"
        >
          <Link to="/" className="hover:text-[#C9A227] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            to="/projects"
            className="hover:text-[#C9A227] transition-colors"
          >
            Projects
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#C9A227] truncate max-w-[200px]">
            {property.title}
          </span>
        </motion.nav>
      </section>

      {/* ── Image Gallery ────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-4 gap-3"
        >
          {/* Main image */}
          <div className="lg:col-span-3 aspect-[16/9] bg-[#122d4d] rounded-xl overflow-hidden relative">
            <img
              src={property.images[selectedImage]}
              alt={property.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/1200x675/0B1F3A/C9A227?text=Property+Image";
              }}
            />
            <Badge
              className={cn(
                "absolute top-4 left-4",
                statusColors[property.status],
              )}
            >
              {property.status.charAt(0).toUpperCase() +
                property.status.slice(1)}
            </Badge>
            {property.has3DTour && (
              <Badge className="absolute top-4 right-4 bg-[#C9A227] text-[#0B1F3A]">
                3D Tour Available
              </Badge>
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "flex-shrink-0 w-24 h-16 lg:w-full lg:h-24 rounded-lg overflow-hidden border-2 transition-colors",
                  idx === selectedImage
                    ? "border-[#C9A227]"
                    : "border-transparent hover:border-[#1a3a5c]",
                )}
              >
                <img
                  src={img}
                  alt={`View ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/300x200/0B1F3A/C9A227?text=Thumbnail";
                  }}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Content + Sidebar ────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left content */}
          <div className="flex-1 min-w-0">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-[#94a3b8] text-sm mb-6">
                <MapPin className="h-4 w-4 text-[#C9A227]" />
                {property.location.address}, {property.location.city},{" "}
                {property.location.state} – {property.location.pincode}
              </div>

              {/* Quick metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  {
                    icon: <BedDouble className="h-5 w-5" />,
                    label: "Bedrooms",
                    value: property.bedrooms,
                  },
                  {
                    icon: <Bath className="h-5 w-5" />,
                    label: "Bathrooms",
                    value: property.bathrooms,
                  },
                  {
                    icon: <Maximize className="h-5 w-5" />,
                    label: "Area",
                    value: formatArea(property.area),
                  },
                  {
                    icon: <Layers className="h-5 w-5" />,
                    label: "Floor",
                    value: `${property.floor}/${property.totalFloors}`,
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[#0f2847]/60 border border-[#1a3a5c]"
                  >
                    <span className="text-[#C9A227]">{m.icon}</span>
                    <span className="text-white font-semibold">{m.value}</span>
                    <span className="text-[#7a8fa6] text-xs">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Info badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-[#94a3b8] bg-[#0f2847]/60 border border-[#1a3a5c] rounded-full px-4 py-2">
                  <Compass className="h-4 w-4 text-[#C9A227]" />
                  {property.facing} Facing
                </div>
                <div className="flex items-center gap-2 text-sm text-[#94a3b8] bg-[#0f2847]/60 border border-[#1a3a5c] rounded-full px-4 py-2">
                  <ShieldCheck className="h-4 w-4 text-[#C9A227]" />
                  RERA: {property.reraNumber}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#94a3b8] bg-[#0f2847]/60 border border-[#1a3a5c] rounded-full px-4 py-2">
                  <CalendarDays className="h-4 w-4 text-[#C9A227]" />
                  Possession: {property.possessionDate}
                </div>
              </div>
            </motion.div>

            {/* ── Tabs ─────────────────────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-[#0f2847] border border-[#1a3a5c] flex-wrap h-auto gap-1 p-1">
                  {[
                    "Overview",
                    "Floor Plan",
                    "Amenities",
                    "Specifications",
                    "Location",
                  ].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab.toLowerCase().replace(" ", "-")}
                      className="data-[state=active]:bg-[#C9A227]/20 data-[state=active]:text-[#C9A227] text-[#94a3b8]"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Overview */}
                <TabsContent value="overview" className="mt-6">
                  <Card className="bg-[#0f2847]/60 border-[#1a3a5c]">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        About This Property
                      </h3>
                      <p className="text-[#94a3b8] leading-relaxed whitespace-pre-line">
                        {property.description}
                      </p>

                      <Separator className="bg-[#122d4d] my-6" />

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[
                          { label: "Type", value: property.type },
                          { label: "Balconies", value: property.balconies },
                          {
                            label: "Price/sq.ft",
                            value: `₹${property.pricePerSqFt.toLocaleString("en-IN")}`,
                          },
                          { label: "Builder", value: property.builder },
                          {
                            label: "Project Status",
                            value: property.projectStatus,
                          },
                          { label: "Facing", value: property.facing },
                        ].map((item) => (
                          <div key={item.label}>
                            <p className="text-[#7a8fa6] text-xs uppercase tracking-wider">
                              {item.label}
                            </p>
                            <p className="text-white font-medium capitalize mt-0.5">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Floor Plan */}
                <TabsContent value="floor-plan" className="mt-6">
                  <Card className="bg-[#0f2847]/60 border-[#1a3a5c]">
                    <CardContent className="p-6 flex items-center justify-center">
                      <div className="w-full aspect-[4/3] bg-[#122d4d] rounded-lg overflow-hidden">
                        <img
                          src={property.floorPlanImage}
                          alt="Floor Plan"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/800x600/0B1F3A/C9A227?text=Floor+Plan";
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Amenities */}
                <TabsContent value="amenities" className="mt-6">
                  <Card className="bg-[#0f2847]/60 border-[#1a3a5c]">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {property.amenities.map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center gap-3 p-3 rounded-lg bg-[#122d4d]/50 border border-[#1a3a5c]/50"
                          >
                            <span className="text-[#C9A227]">
                              {amenityIcons[amenity] ?? (
                                <Building2 className="h-5 w-5" />
                              )}
                            </span>
                            <span className="text-[#b0c4d8] text-sm">
                              {amenity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Specifications */}
                <TabsContent value="specifications" className="mt-6">
                  <div className="space-y-6">
                    {property.specifications.map((spec) => (
                      <Card
                        key={spec.category}
                        className="bg-[#0f2847]/60 border-[#1a3a5c]"
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white text-base">
                            {spec.category}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <table className="w-full text-sm">
                            <tbody>
                              {spec.items.map((item) => (
                                <tr
                                  key={item.label}
                                  className="border-b border-[#1a3a5c] last:border-0"
                                >
                                  <td className="py-3 text-[#7a8fa6] w-1/3">
                                    {item.label}
                                  </td>
                                  <td className="py-3 text-[#cbd5e1]">
                                    {item.value}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Location */}
                <TabsContent value="location" className="mt-6">
                  <Card className="bg-[#0f2847]/60 border-[#1a3a5c]">
                    <CardContent className="p-6 space-y-6">
                      {/* Map placeholder */}
                      <div className="w-full aspect-[16/9] bg-[#122d4d] rounded-lg flex items-center justify-center">
                        <div className="text-center text-[#7a8fa6]">
                          <MapPin className="h-12 w-12 mx-auto mb-3 text-[#C9A227]/40" />
                          <p className="font-medium">Map View</p>
                          <p className="text-sm mt-1">
                            {property.location.latitude.toFixed(4)},{" "}
                            {property.location.longitude.toFixed(4)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-[#7a8fa6] text-xs uppercase tracking-wider mb-1">
                            Full Address
                          </p>
                          <p className="text-[#cbd5e1] text-sm">
                            {property.location.address},{" "}
                            {property.location.city}, {property.location.state}{" "}
                            – {property.location.pincode}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#7a8fa6] text-xs uppercase tracking-wider mb-1">
                            Nearby Landmark
                          </p>
                          <p className="text-[#cbd5e1] text-sm">
                            {property.location.landmark}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* ── Sidebar ──────────────────────────────────────────── */}
          <aside className="w-full lg:w-[360px] flex-shrink-0 space-y-6">
            {/* Pricing card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="bg-[#0f2847]/80 border-[#1a3a5c] sticky top-28">
                <CardContent className="p-6 space-y-5">
                  <div>
                    <p className="text-[#7a8fa6] text-sm">Price</p>
                    <p className="text-3xl font-bold text-[#C9A227]">
                      {formatPrice(property.price)}
                    </p>
                    <p className="text-[#7a8fa6] text-xs mt-1">
                      {formatPrice(property.pricePerSqFt)}/sq.ft •{" "}
                      {formatArea(property.area)}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setLeadOpen(true)}
                      className="flex-1 bg-[#C9A227] hover:bg-[#a8861e] text-[#0B1F3A] font-semibold"
                    >
                      Enquire Now
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-[#1a3a5c] text-[#94a3b8] hover:text-red-400"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-[#C9A227]/40 text-[#C9A227] hover:bg-[#C9A227]/10"
                  >
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Schedule Visit
                  </Button>

                  {/* Share */}
                  <div className="flex items-center gap-2">
                    <span className="text-[#7a8fa6] text-sm">Share:</span>
                    <button
                      className="p-2 rounded-lg bg-[#122d4d] text-[#94a3b8] hover:text-[#C9A227] transition-colors"
                      onClick={() =>
                        navigator.clipboard.writeText(window.location.href)
                      }
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>

                  <Separator className="bg-[#122d4d]" />

                  {/* EMI Calculator */}
                  <EMICalculator price={property.price} />
                </CardContent>
              </Card>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* ── Similar Properties ───────────────────────────────────── */}
      {similarProperties.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
          <Separator className="bg-[#122d4d] mb-14" />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <PropertyGrid
              properties={similarProperties}
              columns={3}
              title="Similar Properties"
              subtitle="Explore more options that match your preferences"
            />
          </motion.div>
        </section>
      )}
    </main>
  );
}
