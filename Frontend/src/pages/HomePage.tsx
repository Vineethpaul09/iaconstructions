import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Building2,
  MapPinHouse,
  HardHat,
  Landmark,
  Star,
  ChevronRight,
  ArrowRight,
  Quote,
  ChevronLeft,
  FileCheck,
  Users,
  Droplets,
  Building,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// Accordion removed
import { Separator } from "@/components/ui/separator";
import Hero from "@/components/home/Hero";

import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { statCounters } from "@/data/navigation";

/* ── Icon map ──────────────────────────────────────────────────────── */

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-8 w-8" />,
  MapPinHouse: <MapPinHouse className="h-8 w-8" />,
  HardHat: <HardHat className="h-8 w-8" />,
  Landmark: <Landmark className="h-8 w-8" />,
  Droplets: <Droplets className="h-8 w-8" />,
  FileCheck: <FileCheck className="h-8 w-8" />,
  Building: <Building className="h-8 w-8" />,
  Users: <Users className="h-8 w-8" />,
};

const smallIconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-5 w-5" />,
  MapPinHouse: <MapPinHouse className="h-5 w-5" />,
  HardHat: <HardHat className="h-5 w-5" />,
  Landmark: <Landmark className="h-5 w-5" />,
  Droplets: <Droplets className="h-5 w-5" />,
  FileCheck: <FileCheck className="h-5 w-5" />,
  Building: <Building className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
};

/* ── Animation helpers ─────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ── Animated counter ──────────────────────────────────────────────── */

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = value / (2000 / 16);
    let raf: number;
    const step = () => {
      start += increment;
      if (start >= value) {
        setCount(value);
        return;
      }
      setCount(Math.floor(start));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, inView]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

import React from "react";

/* ── Component ─────────────────────────────────────────────────────── */

export default function HomePage() {
  const allServices = services.slice(0, 4);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTestimonials = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <Hero />

      {/* ── Services Overview ────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10"
        >
          <span className="text-[#C9A227] font-medium uppercase tracking-widest text-sm">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4 text-white">
            Our Services
          </h2>
          <p className="text-[#e4e4e7] max-w-2xl mx-auto">
            End-to-end real estate services for NRIs and local buyers — from
            acquisition and construction to loan consulting.
          </p>
        </motion.div>

        {/* Service Cards with Images */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {allServices.map((svc) => (
            <motion.div key={svc.id} variants={fadeUp}>
              <Link to="/services" className="block h-full">
                <Card className="bg-[#0f2847]/60 border-[#1a3a5c] hover:border-[#C9A227]/40 transition-all h-full group overflow-hidden">
                  {/* Image with overlay */}
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.pexels.com/photos/7672058/pexels-photo-7672058.jpeg?auto=compress&cs=tinysrgb&w=800";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent" />
                    <div className="absolute bottom-2 left-2 p-1.5 rounded-lg bg-[#C9A227] text-[#0B1F3A]">
                      {smallIconMap[svc.icon] ?? (
                        <Building2 className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                  <CardContent className="p-3 flex flex-col gap-1.5">
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#C9A227] transition-colors line-clamp-1">
                      {svc.title}
                    </h3>
                    <p className="text-[#e4e4e7] text-xs leading-relaxed line-clamp-2">
                      {svc.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Services Button */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/services">
            <Button
              size="lg"
              variant="outline"
              className="border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0B1F3A] px-8"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <Separator className="bg-[#122d4d] max-w-6xl mx-auto" />

      {/* ── Stats Counter ────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f2847] via-[#0B1F3A] to-[#0f2847]">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-6xl mx-auto grid grid-cols-3 gap-10 text-center"
        >
          {statCounters.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <p className="text-4xl sm:text-5xl font-bold text-[#C9A227]">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[#e4e4e7] mt-2 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Separator className="bg-[#122d4d] max-w-6xl mx-auto" />

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <span className="text-[#C9A227] font-medium uppercase tracking-widest text-sm">
            Client Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4 text-white">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scrollTestimonials("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[#122d4d] border border-[#1a3a5c] hover:border-[#C9A227] text-[#b0c4d8] hover:text-[#C9A227] transition-colors hidden md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollTestimonials("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[#122d4d] border border-[#1a3a5c] hover:border-[#C9A227] text-[#b0c4d8] hover:text-[#C9A227] transition-colors hidden md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="min-w-[340px] max-w-[400px] snap-start"
              >
                <Card className="bg-[#0f2847]/60 border-[#1a3a5c] h-full">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <Quote className="h-8 w-8 text-[#C9A227]/40" />
                    <p className="text-[#b0c4d8] text-sm leading-relaxed line-clamp-5">
                      {t.comment}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < t.rating
                              ? "fill-[#C9A227] text-[#C9A227]"
                              : "text-[#7a8fa6]",
                          )}
                        />
                      ))}
                    </div>
                    <Separator className="bg-[#122d4d]" />
                    <div>
                      <p className="text-white font-medium">{t.name}</p>
                      <p className="text-[#7a8fa6] text-xs">{t.designation}</p>
                      <p className="text-[#C9A227] text-xs mt-1">{t.project}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
