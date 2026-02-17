import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types";

/* ─── Star rating ───────────────────────────────────── */

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? "fill-[#C9A227] text-[#C9A227]"
            : "fill-none text-[#1a3a5c]"
        }`}
      />
    ))}
  </div>
);

/* ─── Testimonial card ──────────────────────────────── */

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({
  testimonial,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group min-w-[320px] max-w-[380px] shrink-0 snap-center rounded-2xl border border-[#1a3a5c] bg-[#0f2847]/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-[#C9A227]/40 hover:shadow-lg hover:shadow-[#C9A227]/5"
  >
    {/* Quote icon */}
    <Quote className="mb-3 h-8 w-8 text-[#C9A227]/30" />

    {/* Comment */}
    <p className="mb-5 text-sm leading-relaxed text-[#b0c4d8] line-clamp-5">
      "{testimonial.comment}"
    </p>

    {/* Rating */}
    <StarRating rating={testimonial.rating} />

    {/* Author */}
    <div className="mt-4 flex items-center gap-3 border-t border-[#1a3a5c] pt-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A227] to-[#a8861e] text-sm font-bold text-[#0B1F3A]">
        {testimonial.name.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-semibold text-[#fafafa]">
          {testimonial.name}
        </p>
        <p className="text-xs text-[#94a3b8]">{testimonial.designation}</p>
      </div>
    </div>

    {/* Project */}
    <div className="mt-3">
      <span className="inline-block rounded-full bg-[#C9A227]/10 px-3 py-1 text-xs font-medium text-[#C9A227]">
        {testimonial.project}
      </span>
    </div>
  </motion.div>
);

/* ─── Section ───────────────────────────────────────── */

const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const totalSlides = testimonials.length;

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const cardWidth = 340; // min-w + gap
      container.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setActiveIndex(index);
    },
    []
  );

  const handlePrev = () =>
    scrollToIndex(activeIndex > 0 ? activeIndex - 1 : totalSlides - 1);
  const handleNext = () =>
    scrollToIndex(activeIndex < totalSlides - 1 ? activeIndex + 1 : 0);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev < totalSlides - 1 ? prev + 1 : 0;
        scrollToIndex(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides, scrollToIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0B1F3A] py-20"
    >
      {/* Background accents */}
      <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-[#C9A227]/5 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[#C9A227]/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-[#fafafa] md:text-4xl">
            What Our Clients Say
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#C9A227] to-[#d4b94e]" />
          <p className="mt-4 text-[#94a3b8]">
            Real stories from families who found their dream home with IAC
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Nav arrows */}
          <button
            onClick={handlePrev}
            className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#1a3a5c] bg-[#0f2847]/90 text-[#94a3b8] backdrop-blur transition-colors hover:border-[#C9A227] hover:text-[#C9A227] cursor-pointer max-md:hidden"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#1a3a5c] bg-[#0f2847]/90 text-[#94a3b8] backdrop-blur transition-colors hover:border-[#C9A227] hover:text-[#C9A227] cursor-pointer max-md:hidden"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide px-1"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "w-6 bg-[#C9A227]"
                  : "w-2 bg-[#1a3a5c] hover:bg-[#163561]"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
