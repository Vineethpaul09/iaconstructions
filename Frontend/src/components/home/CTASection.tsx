import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.6, 1, 1, 0.6],
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24">
      {/* Gold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A227]/15 via-[#0B1F3A] to-[#C9A227]/10" />

      {/* Glow effects */}
      <div className="absolute -left-20 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-[#C9A227]/10 blur-[100px]" />
      <div className="absolute -right-20 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-[#C9A227]/10 blur-[100px]" />

      {/* Gold border glow top & bottom */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent" />

      {/* Parallax content */}
      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-4xl px-4 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-[#fafafa] md:text-5xl"
        >
          Ready to Find Your{" "}
          <span className="bg-gradient-to-r from-[#C9A227] to-[#d4b94e] bg-clip-text text-transparent">
            Dream Home
          </span>
          ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 max-w-xl text-[#e4e4e7] md:text-lg"
        >
          Let our experts guide you through every step of your property journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          <Button size="lg" className="min-w-[180px]">
            Browse Properties
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="min-w-[180px] border-[#fafafa]/20 text-[#fafafa] hover:bg-[#fafafa]/10"
          >
            <Phone className="mr-2 h-4 w-4" />
            Talk to an Expert
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    </section>
  );
};

export default CTASection;
