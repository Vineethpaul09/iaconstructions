import { motion } from "framer-motion";
import {
  Lightbulb,
  ShieldCheck,
  Leaf,
  Award,
  Target,
  Eye,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePageSEO } from "@/hooks/usePageSEO";
import { SITE, siteUrl } from "@/config/site";
import { statCounters } from "@/data/navigation";
import React, { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

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
  const [count, setCount] = useState(0);

  useEffect(() => {
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

/* ── Timeline data ─────────────────────────────────────────────────── */

const milestones = [
  {
    year: "2017",
    title: "The Beginning",
    description:
      "Founded with a clear mission — to build quality homes that every family can call their own, rooted in trust and transparency.",
  },
  {
    year: "2019",
    title: "Major Projects",
    description:
      "Successfully delivered our apartments and buildings, setting new benchmarks for quality and customer satisfaction in the region.",
  },
  {
    year: "2021",
    title: "Expanding Horizons",
    description:
      "Broadened operations with new luxury and mid-segment projects, establishing a strong market presence and growing client base.",
  },
  {
    year: "2023",
    title: "Growing Portfolio",
    highlight: false,
    description:
      "Diversified into premium apartments and rental income properties — delivering high-yield investment opportunities for buyers seeking steady returns, while strengthening our footprint across multiple sought-after locations.",
  },
  {
    year: "2024",
    title: "Commercial & PG Ventures",
    highlight: false,
    description:
      "Expanded into commercial construction and delivered purpose-built Paying Guest (PG) accommodation buildings — offering modern, fully-equipped living spaces for working professionals and students.",
  },
  {
    year: "2025",
    title: "Going Strong",
    description:
      "Crossed 23+ completed projects spanning residential, commercial, and PG segments. Extended dedicated property services for NRI buyers across the globe.",
  },
];

/* ── Core values ───────────────────────────────────────────────────── */

const coreValues = [
  {
    icon: <Lightbulb className="h-7 w-7" />,
    title: "Innovation",
    description:
      "We embrace cutting-edge technologies and design philosophies to create spaces that inspire modern living.",
  },
  {
    icon: <ShieldCheck className="h-7 w-7" />,
    title: "Integrity",
    description:
      "Transparency in pricing, timelines, and quality — every promise we make, we deliver without compromise.",
  },
  {
    icon: <Leaf className="h-7 w-7" />,
    title: "Sustainability",
    description:
      "From rainwater harvesting to solar integration, we build green homes that respect our planet and future generations.",
  },
  {
    icon: <Award className="h-7 w-7" />,
    title: "Excellence",
    description:
      "ISO-certified processes, premium materials, and meticulous craftsmanship define every iA Constructions project.",
  },
];

/* ── Team data ─────────────────────────────────────────────────────── */

const team = [
  {
    name: "Dinesh Reddy Basani",
    role: "Founder & Managing Director, Head of Marketing",
    bio: "Dinesh leads iA Constructions with a passion for quality and customer-first values, and he also heads marketing—overseeing brand strategy, communications, and customer engagement.",
  },
  {
    name: "Srujith Reddy Gayam",
    role: "Founder & Managing Director",
    bio: "Srujith has sales experience, leading client relations, partnerships, and NRI outreach to deliver personalised, end-to-end service from first enquiry to handover.",
  },
  {
    name: "Inna Reddy Gayam",
    role: "Founder & Managing Director",
    bio: "With 9+ years of experience in sustainable luxury design, Inna leads our design practice—combining global aesthetics, local sensibility, and technical rigor to deliver innovative, eco-friendly homes that prioritize form, function, and lasting value.",
  },
];

/* ── Component ─────────────────────────────────────────────────────── */

export default function AboutPage() {
  const aboutJsonLd = React.useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `About ${SITE.name}`,
    "description": `Learn about ${SITE.name} — a trusted ${SITE.address.city}-based builder delivering premium residential and commercial projects since ${SITE.foundingDate}.`,
    "url": siteUrl("/about"),
    "mainEntity": {
      "@type": "Organization",
      "name": SITE.name,
      "foundingDate": SITE.foundingDate,
      "foundingLocation": `${SITE.address.city}, ${SITE.address.region}, India`,
      "description": `Premium residential and commercial construction company in ${SITE.address.city} specializing in apartments, villas, and NRI investment properties.`,
      "areaServed": { "@type": "City", "name": SITE.address.city }
    }
  }), []);

  usePageSEO({
    title: "About Us — Our Story & Values",
    description:
      `Learn about ${SITE.name} — a trusted ${SITE.address.city}-based builder delivering premium residential and commercial projects since ${SITE.foundingDate}. Our mission, values, and commitment to quality construction.`,
    canonical: siteUrl("/about"),
    ogImageAlt: `About ${SITE.name} — ${SITE.tagline} since ${SITE.foundingDate}`,
    jsonLd: aboutJsonLd,
  });

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white">
      {/* ── Hero Banner ──────────────────────────────────────────── */}
      <section className="relative pt-10 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0f2847] to-[#0B1F3A]">
        <div className="max-w-7xl mx-auto">
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
            <span className="text-[#C9A227]">About Us</span>
          </motion.nav>

          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              About <span className="text-[#C9A227]">iA Constructions</span>
            </h1>
            <p className="text-[#e4e4e7] max-w-2xl text-lg">
              Building dreams into reality since 2017. Trusted Builders &amp;
              Developers in and around Hyderabad — serving NRIs across USA,
              Canada, Australia &amp; UK.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Company Story + Timeline ─────────────────────────────── */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-5"
        >
          <span className="text-[#C9A227] font-medium uppercase tracking-widest text-sm">
            Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            A Legacy of Excellence
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-[#122d4d] sm:-translate-x-px" />

          {milestones.map((ms, idx) => (
            <motion.div
              key={ms.year}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={cn(
                "relative flex items-start gap-6 mb-12",
                idx % 2 === 0
                  ? "sm:flex-row sm:text-right"
                  : "sm:flex-row-reverse sm:text-left",
              )}
            >
              {/* Dot */}
              <div
                className={cn(
                  "absolute left-4 sm:left-1/2 -translate-x-1/2 rounded-full border-4 border-[#0B1F3A] z-10 mt-1",
                  ms.highlight
                    ? "w-5 h-5 bg-[#C9A227] ring-2 ring-[#C9A227]/40"
                    : "w-4 h-4 bg-[#C9A227]",
                )}
              />

              {/* Content */}
              <div
                className={cn(
                  "ml-10 sm:ml-0 sm:w-1/2",
                  idx % 2 === 0 ? "sm:pr-12" : "sm:pl-12",
                  ms.highlight &&
                    "rounded-lg border border-[#C9A227]/30 bg-[#C9A227]/5 p-4",
                )}
              >
                <span
                  className={cn(
                    "font-bold text-lg",
                    ms.highlight ? "text-[#C9A227] text-xl" : "text-[#C9A227]",
                  )}
                >
                  {ms.year}
                </span>
                <h3
                  className={cn(
                    "font-semibold mt-1",
                    ms.highlight
                      ? "text-[#C9A227] text-xl"
                      : "text-white text-lg",
                  )}
                >
                  {ms.title}
                </h3>
                <p className="text-[#e4e4e7] text-sm mt-2 leading-relaxed">
                  {ms.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator className="bg-[#122d4d] max-w-6xl mx-auto" />

      {/* ── Mission & Vision ─────────────────────────────────────── */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={fadeUp}>
            <Card className="bg-[#0f2847]/60 border-[#1a3a5c] h-full">
              <CardContent className="p-8">
                <div className="p-3 rounded-lg bg-[#C9A227]/10 text-[#C9A227] w-fit mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Our Mission
                </h3>
                <p className="text-[#e4e4e7] leading-relaxed">
                  To transform the Indian real estate landscape by delivering
                  world-class living spaces that combine innovative design,
                  uncompromising quality, and exceptional value — making luxury
                  accessible to every aspiring homeowner.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="bg-[#0f2847]/60 border-[#1a3a5c] h-full">
              <CardContent className="p-8">
                <div className="p-3 rounded-lg bg-[#C9A227]/10 text-[#C9A227] w-fit mb-4">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Our Vision
                </h3>
                <p className="text-[#e4e4e7] leading-relaxed">
                  To become Hyderabad's most trusted real estate developer —
                  known for quality construction, transparent processes, and
                  seamless NRI property services.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      <Separator className="bg-[#122d4d] max-w-6xl mx-auto" />

      {/* ── Core Values ──────────────────────────────────────────── */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <span className="text-[#C9A227] font-medium uppercase tracking-widest text-sm">
            What Drives Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            Core Values
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {coreValues.map((cv) => (
            <motion.div key={cv.title} variants={fadeUp}>
              <Card className="bg-[#0f2847]/60 border-[#1a3a5c] hover:border-[#C9A227]/30 transition-colors h-full text-center group">
                <CardContent className="p-6 flex flex-col items-center gap-4">
                  <div className="p-4 rounded-full bg-[#C9A227]/10 text-[#C9A227] group-hover:bg-[#C9A227]/20 transition-colors">
                    {cv.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {cv.title}
                  </h3>
                  <p className="text-[#e4e4e7] text-sm leading-relaxed">
                    {cv.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Separator className="bg-[#122d4d] max-w-6xl mx-auto" />

      {/* ── Leadership Team ──────────────────────────────────────── */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-5"
        >
          <span className="text-[#C9A227] font-medium uppercase tracking-widest text-sm">
            Our People
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            Leadership Team
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {team.map((member) => (
            <motion.div key={member.name} variants={fadeUp}>
              <Card className="bg-[#0f2847]/60 border-[#1a3a5c] h-full overflow-hidden group">
                <div className="aspect-[4/3] bg-[#122d4d] flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-[#163561] flex items-center justify-center text-3xl font-bold text-[#C9A227]">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="text-[#C9A227] text-sm mt-1">{member.role}</p>
                  <p className="text-[#e4e4e7] text-sm mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Separator className="bg-[#122d4d] max-w-6xl mx-auto" />

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f2847] via-[#0B1F3A] to-[#0f2847]">
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

      {/* ── Internal Linking CTA ─────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Explore More</h2>
          <p className="text-[#e4e4e7] mb-8">Discover our projects, services, and hear from our happy clients.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/projects">View Our Projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="border-[#C9A227]/40 text-[#C9A227] hover:bg-[#C9A227]/10" asChild>
              <Link to="/services">Our Services</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-[#fafafa]/20 text-[#fafafa] hover:bg-[#fafafa]/10" asChild>
              <Link to="/client-stories">Client Stories</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
