import { motion } from "framer-motion";
import {
  Building2,
  MapPinHouse,
  HardHat,
  Landmark,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Droplets,
  FileCheck,
  Building,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";

/* ── Animation helpers ─────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ── Icon map ──────────────────────────────────────────────────────── */

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-6 w-6" />,
  MapPinHouse: <MapPinHouse className="h-6 w-6" />,
  HardHat: <HardHat className="h-6 w-6" />,
  Landmark: <Landmark className="h-6 w-6" />,
  Droplets: <Droplets className="h-6 w-6" />,
  FileCheck: <FileCheck className="h-6 w-6" />,
  Building: <Building className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
};

/* ── Service Row Component ─────────────────────────────────────────── */

function ServiceRow({
  service,
  index,
  reverse,
}: {
  service: (typeof services)[0];
  index: number;
  reverse: boolean;
}) {
  return (
    <motion.div
      id={service.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "flex flex-col gap-8 lg:gap-12 items-center scroll-mt-32",
        reverse ? "lg:flex-row-reverse" : "lg:flex-row",
      )}
    >
      {/* Image */}
      <motion.div
        variants={reverse ? fadeRight : fadeLeft}
        className="w-full lg:w-1/2"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-64 sm:h-80 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.pexels.com/photos/7672058/pexels-photo-7672058.jpeg?auto=compress&cs=tinysrgb&w=800";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-[#C9A227] text-[#0B1F3A]">
              {iconMap[service.icon] ?? <Building2 className="h-6 w-6" />}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={reverse ? fadeLeft : fadeRight}
        className="w-full lg:w-1/2 space-y-5"
      >
        <span className="inline-block text-[#C9A227] text-sm font-semibold uppercase tracking-widest">
          {String(index + 1).padStart(2, "0")} — Service
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-white">
          {service.title}
        </h3>
        <p className="text-[#e4e4e7] leading-relaxed">{service.description}</p>
        <ul className="space-y-3 pt-2">
          {service.features.map((feat) => (
            <li key={feat} className="flex items-center gap-3 text-[#b0c4d8]">
              <CheckCircle2 className="h-5 w-5 text-[#C9A227] flex-shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

/* ── Quick Service Icons ───────────────────────────────────────────── */

function QuickServiceIcons() {
  const quickServices = [
    { icon: <Building2 />, label: "Building", targetId: "svc-001" },
    { icon: <HardHat />, label: "Construction", targetId: "svc-002" },
    { icon: <MapPinHouse />, label: "Land", targetId: "svc-003" },
    { icon: <Landmark />, label: "Loans", targetId: "svc-004" },
    { icon: <FileCheck />, label: "Permits", targetId: "svc-006" },
    { icon: <Users />, label: "Liaison", targetId: "svc-008" },
  ];

  const scrollToService = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-4 sm:gap-6"
    >
      {quickServices.map((svc) => (
        <motion.button
          key={svc.label}
          variants={fadeUp}
          onClick={() => scrollToService(svc.targetId)}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#0f2847]/50 border border-[#1a3a5c] hover:border-[#C9A227]/40 hover:bg-[#0f2847] transition-all cursor-pointer min-w-[90px]"
        >
          <div className="text-[#C9A227] h-6 w-6">{svc.icon}</div>
          <span className="text-white text-sm font-medium">{svc.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}

/* ── Component ─────────────────────────────────────────────────────── */

export default function ServicesPage() {
  // Split services into categories
  const coreServices = services.slice(0, 4);
  const governmentServices = services.slice(4);

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white">
      {/* ── Hero Banner ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0f2847] to-[#0B1F3A]">
        <div className="max-w-6xl mx-auto text-center">
          <motion.nav
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-2 text-sm text-[#7a8fa6] mb-8"
          >
            <Link to="/" className="hover:text-[#C9A227] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#C9A227]">Services</span>
          </motion.nav>

          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Building Dreams in{" "}
              <span className="text-[#C9A227]">Hyderabad</span>
            </h1>
            <p className="text-[#e4e4e7] max-w-2xl mx-auto text-lg mb-10">
              From G+3 apartments to land acquisition and GHMC approvals — your
              complete real estate partner in Hyderabad.
            </p>
          </motion.div>

          <QuickServiceIcons />
        </div>
      </section>

      {/* ── Core Services (Zigzag) ───────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C9A227] font-medium uppercase tracking-widest text-sm">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              Real Estate Services
            </h2>
          </motion.div>

          <div className="space-y-20 lg:space-y-28">
            {coreServices.map((svc, idx) => (
              <ServiceRow
                key={svc.id}
                service={svc}
                index={idx}
                reverse={idx % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Government Services (Zigzag) ─────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#071428]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C9A227] font-medium uppercase tracking-widest text-sm">
              GHMC & HMDA
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              Government Approvals
            </h2>
            <p className="text-[#e4e4e7] max-w-xl mx-auto mt-4">
              Hassle-free permits and clearances for your construction projects
              in Hyderabad.
            </p>
          </motion.div>

          <div className="space-y-20 lg:space-y-28">
            {governmentServices.map((svc, idx) => (
              <ServiceRow
                key={svc.id}
                service={svc}
                index={idx + 4}
                reverse={idx % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-6"
          >
            {[
              { value: "9+", label: "Years Experience" },
              { value: "23+", label: "Projects Delivered" },
              { value: "100%", label: "Approval Rate" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center p-6 rounded-2xl border border-[#1a3a5c] bg-[#0f2847]/30"
              >
                <div className="text-4xl font-bold text-[#C9A227] mb-2">
                  {stat.value}
                </div>
                <p className="text-[#e4e4e7] text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#071428]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Start Your Project Today
          </h2>
          <p className="text-[#e4e4e7] mb-8 max-w-lg mx-auto">
            Ready to build your dream home or need help with approvals? Get a
            free consultation from our Hyderabad experts.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-[#C9A227] hover:bg-[#a8861e] text-[#0B1F3A] font-semibold px-10"
            >
              Get Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
