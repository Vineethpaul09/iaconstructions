import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Data ──────────────────────────────────────────── */

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: 9, suffix: "+", label: "Years of Excellence" },
  { value: 23, suffix: "+", label: "Projects Delivered" },
  { value: 100, suffix: "%", label: "Approval Rate" },
];

/* ─── Animated counter hook ─────────────────────────── */

function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return count;
}

/* ─── Stat Card ─────────────────────────────────────── */

const StatCard: React.FC<{
  stat: StatItem;
  index: number;
  inView: boolean;
}> = ({ stat, index, inView }) => {
  const count = useCountUp(stat.value, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative flex flex-col items-center justify-center rounded-2xl border border-[#1a3a5c]/60 bg-[#0f2847]/50 backdrop-blur-sm p-8 text-center transition-all duration-300 hover:border-[#C9A227]/40 hover:shadow-lg hover:shadow-[#C9A227]/5"
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#C9A227]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="relative text-4xl font-extrabold tracking-tight text-[#C9A227] md:text-5xl">
        {count.toLocaleString()}
        {stat.suffix}
      </span>
      <span className="relative mt-2 text-sm font-medium text-[#e4e4e7] md:text-base">
        {stat.label}
      </span>
    </motion.div>
  );
};

/* ─── Section ───────────────────────────────────────── */

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0B1F3A] py-20"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201, 162, 39,0.06)_0%,_transparent_70%)]" />
      <div className="absolute left-1/4 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-[#C9A227]/20 to-transparent" />
      <div className="absolute bottom-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-[#C9A227]/20 to-transparent" />

      {/* Floating gold particles (decorative) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#C9A227]/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              inView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
