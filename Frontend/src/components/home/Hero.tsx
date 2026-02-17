import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building2,
  Home,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Hero Slides Data                                                   */
/* ------------------------------------------------------------------ */

interface HeroSlide {
  id: number;
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  location: string;
  cta: string;
  link: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80",
    tag: "Premium Apartments",
    title: "Luxury Living in Hyderabad",
    subtitle:
      "We build premium 2, 3 & 4 BHK apartments crafted for modern families",
    location: "Bandlaguda · Attapur · Kokapet",
    cta: "View Projects",
    link: "/projects",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80",
    tag: "Independent Villas",
    title: "Your Dream Villa Awaits",
    subtitle:
      "Spacious villas with world-class amenities and serene surroundings",
    location: "Bandlaguda Jagir · Gandipet",
    cta: "Explore Villas",
    link: "/projects",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
    tag: "NRI Investment",
    title: "Invest from Anywhere",
    subtitle:
      "End-to-end property solutions for NRIs across USA, Canada, Australia & UK",
    location: "Hyderabad · Telangana",
    cta: "NRI Services",
    link: "/services",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
    tag: "Construction Services",
    title: "We Build Your Vision",
    subtitle:
      "Custom construction on your plot with transparent pricing and quality assurance",
    location: "In & Around Hyderabad",
    cta: "Our Services",
    link: "/services",
  },
];

/* ------------------------------------------------------------------ */
/*  Slide Timer Progress Bar                                           */
/* ------------------------------------------------------------------ */

function SlideProgress({
  active,
  duration,
}: {
  active: boolean;
  duration: number;
}) {
  return (
    <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/20">
      <motion.div
        className="h-full bg-[#C9A227]"
        initial={{ width: "0%" }}
        animate={active ? { width: "100%" } : { width: "0%" }}
        transition={
          active
            ? { duration: duration / 1000, ease: "linear" }
            : { duration: 0 }
        }
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Component                                                     */
/* ------------------------------------------------------------------ */

const SLIDE_DURATION = 6000; // ms

export default function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.85]);

  /* Auto-play logic */
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(nextSlide, SLIDE_DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, currentSlide, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ---- Background Image Slider ---- */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ---- Dark Overlay ---- */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/70 to-[#0B1F3A]/40"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/80 via-transparent to-transparent" />

      {/* ---- Content Overlay ---- */}
      <div className="relative z-10 flex h-full flex-col justify-end pb-28 sm:justify-center sm:pb-0">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                  },
                  exit: {
                    transition: { staggerChildren: 0.04, staggerDirection: -1 },
                  },
                }}
              >
                {/* Tag */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5 },
                    },
                    exit: { opacity: 0, x: 30, transition: { duration: 0.3 } },
                  }}
                  className="mb-4"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#C9A227] backdrop-blur-sm">
                    <Building2 className="h-3.5 w-3.5" />
                    {slide.tag}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
                    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
                  }}
                  className="mb-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]"
                >
                  {slide.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                    exit: {
                      opacity: 0,
                      y: -15,
                      transition: { duration: 0.25 },
                    },
                  }}
                  className="mb-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
                >
                  {slide.subtitle}
                </motion.p>

                {/* Location */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                    exit: { opacity: 0, transition: { duration: 0.2 } },
                  }}
                  className="mb-6 flex items-center gap-2 text-sm text-[#C9A227]/80"
                >
                  <MapPin className="h-4 w-4" />
                  <span>{slide.location}</span>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                    exit: { opacity: 0, transition: { duration: 0.2 } },
                  }}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <Button
                    size="lg"
                    className="group gap-2 text-sm font-semibold shadow-lg shadow-[#C9A227]/20 sm:text-base"
                    onClick={() => {
                      if (slide.link) navigate(slide.link);
                    }}
                  >
                    {slide.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-sm font-semibold text-white backdrop-blur-sm hover:border-[#C9A227]/50 hover:bg-white/5 sm:text-base"
                    onClick={() => navigate("/contact")}
                  >
                    Schedule a Visit
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ---- Slide Navigation Arrows ---- */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/30 p-2.5 text-white/70 backdrop-blur-sm transition-all hover:border-[#C9A227]/40 hover:bg-black/50 hover:text-white sm:left-6 sm:p-3"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/30 p-2.5 text-white/70 backdrop-blur-sm transition-all hover:border-[#C9A227]/40 hover:bg-black/50 hover:text-white sm:right-6 sm:p-3"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* ---- Bottom Bar: Progress + Dots + NRI Badge ---- */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* NRI Trust Badge (right side) */}
        <div className="absolute -top-20 right-4 hidden sm:right-8 lg:block">
          <div className="rounded-xl border border-white/10 bg-black/40 px-5 py-3.5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Home className="h-5 w-5 text-[#C9A227]" />
              <div>
                <p className="text-xs font-semibold text-white">
                  Trusted by NRIs Worldwide
                </p>
                <p className="text-[11px] text-white/50">
                  USA · Canada · Australia · UK · Middle East
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom glass bar */}
        <div className="border-t border-white/5 bg-[#0B1F3A]/80 px-4 py-4 backdrop-blur-md sm:px-8">
          <div className="mx-auto flex max-w-7xl items-center gap-6">
            {/* Slide dots + progress */}
            <div className="flex flex-1 items-center gap-3">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(i)}
                  className="group flex flex-1 flex-col gap-1.5"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <SlideProgress
                    active={i === currentSlide}
                    duration={SLIDE_DURATION}
                  />
                  <span
                    className={`hidden text-[11px] font-medium transition-colors sm:block ${
                      i === currentSlide
                        ? "text-[#C9A227]"
                        : "text-white/30 group-hover:text-white/50"
                    }`}
                  >
                    {s.tag}
                  </span>
                </button>
              ))}
            </div>

            {/* Slide counter */}
            <div className="flex items-center gap-1 text-sm tabular-nums text-white/40">
              <span className="text-lg font-bold text-[#C9A227]">
                {String(currentSlide + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
