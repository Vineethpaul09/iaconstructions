import { motion } from "framer-motion";
import {
  Lightbulb,
  ShieldCheck,
  Leaf,
  Award,
  Target,
  Eye,
  ChevronRight,
  Trophy,
  Medal,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
      "iA Constructions was founded by Dinesh Reddy Basani in Hyderabad, Telangana with a vision to build quality homes accessible to every family.",
  },
  {
    year: "2019",
    title: "First Major Project",
    description:
      "Delivered our first residential township — IAC Heritage Homes — setting new quality benchmarks in Hyderabad.",
  },
  {
    year: "2021",
    title: "Expanding Across Hyderabad",
    description:
      "Expanded operations across Hyderabad, launching IAC Skyline Residences and establishing a strong presence in the luxury market.",
  },
  {
    year: "2023",
    title: "Growing Portfolio",
    description:
      "Established presence in Secunderabad with premium apartment projects and continued expansion across Hyderabad.",
  },
  {
    year: "2025",
    title: "Growing Strong",
    description:
      "Celebrated delivery of 23+ projects across Hyderabad. Expanding NRI services for overseas buyers in USA, Canada, Australia & UK.",
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
    role: "Founder & Managing Director",
    bio: "With 9+ years of experience in real estate development, Dinesh leads iA Constructions with a passion for quality and customer-first values.",
  },
  {
    name: "Priya Sharma",
    role: "Chief Architect",
    bio: "An award-winning architect specialising in sustainable luxury design, Priya brings global aesthetics with local sensibility to every project.",
  },
  {
    name: "Arjun Menon",
    role: "VP – Sales & Marketing",
    bio: "Arjun's decade of experience in premium property sales ensures that every buyer receives a personalised, seamless experience from enquiry to handover.",
  },
];

/* ── Awards ─────────────────────────────────────────────────────────── */

const awards = [
  "Best Residential Developer – Telangana 2023",
  "Green Building Award – IGBC 2022",
  "Most Trusted Builder – Hyderabad 2024",
  "Excellence in Construction Quality – Telangana 2023",
];

/* ── Component ─────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white">
      {/* ── Hero Banner ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0f2847] to-[#0B1F3A]">
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
              About{" "}
              <span className="text-[#C9A227]">iA Constructions</span>
            </h1>
            <p className="text-[#94a3b8] max-w-2xl text-lg">
              Building dreams into reality since 2017. Trusted Builders &amp;
              Developers in and around Hyderabad — serving NRIs across
              USA, Canada, Australia &amp; UK.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Company Story + Timeline ─────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
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
                  : "sm:flex-row-reverse sm:text-left"
              )}
            >
              {/* Dot */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#C9A227] border-4 border-[#0B1F3A] z-10 mt-1" />

              {/* Content */}
              <div
                className={cn(
                  "ml-10 sm:ml-0 sm:w-1/2",
                  idx % 2 === 0 ? "sm:pr-12" : "sm:pl-12"
                )}
              >
                <span className="text-[#C9A227] font-bold text-lg">
                  {ms.year}
                </span>
                <h3 className="text-white font-semibold text-lg mt-1">
                  {ms.title}
                </h3>
                <p className="text-[#94a3b8] text-sm mt-2 leading-relaxed">
                  {ms.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator className="bg-[#122d4d] max-w-6xl mx-auto" />

      {/* ── Mission & Vision ─────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                <p className="text-[#94a3b8] leading-relaxed">
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
                <p className="text-[#94a3b8] leading-relaxed">
                  To become Hyderabad's most trusted real estate
                  developer — known for quality construction, transparent
                  processes, and seamless NRI property services.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      <Separator className="bg-[#122d4d] max-w-6xl mx-auto" />

      {/* ── Core Values ──────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                  <p className="text-[#94a3b8] text-sm leading-relaxed">
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
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
                  <p className="text-[#94a3b8] text-sm mt-3 leading-relaxed">
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
              <p className="text-[#94a3b8] mt-2 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Separator className="bg-[#122d4d] max-w-6xl mx-auto" />

      {/* ── Awards & Certifications ──────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <span className="text-[#C9A227] font-medium uppercase tracking-widest text-sm">
            Recognition
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            Awards & Certifications
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {awards.map((award, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              <Card className="bg-[#0f2847]/60 border-[#1a3a5c] h-full text-center">
                <CardContent className="p-6 flex flex-col items-center gap-4">
                  <div className="p-3 rounded-full bg-[#C9A227]/10 text-[#C9A227]">
                    {idx % 2 === 0 ? (
                      <Trophy className="h-7 w-7" />
                    ) : (
                      <Medal className="h-7 w-7" />
                    )}
                  </div>
                  <p className="text-white font-medium text-sm leading-relaxed">
                    {award}
                  </p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-[#C9A227] text-[#C9A227]"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
