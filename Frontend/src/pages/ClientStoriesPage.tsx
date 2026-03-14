import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Star, Send, Quote, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useTestimonials, useSubmitTestimonial } from "@/hooks/useSupabase";
import { useProjects } from "@/hooks/useSupabase";
import type { TestimonialRow } from "@/types/supabase";

/* ── Animation helpers ─────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ── Star Rating Input ─────────────────────────────────────── */

const StarRatingInput: React.FC<{
  value: number;
  onChange: (v: number) => void;
}> = ({ value, onChange }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onChange(i + 1)}
        className="transition-transform hover:scale-110"
      >
        <Star
          className={`h-6 w-6 cursor-pointer ${
            i < value
              ? "fill-[#C9A227] text-[#C9A227]"
              : "fill-none text-[#1a3a5c] hover:text-[#C9A227]/50"
          }`}
        />
      </button>
    ))}
  </div>
);

/* ── Star Rating Display ───────────────────────────────────── */

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

/* ── Testimonial Card ──────────────────────────────────────── */

const TestimonialCard: React.FC<{
  testimonial: TestimonialRow;
  index: number;
}> = ({ testimonial, index }) => (
  <motion.div variants={fadeUp} custom={index}>
    <Card className="bg-[#0f2847]/60 border-[#1a3a5c] h-full">
      <CardContent className="p-6">
        <Quote className="mb-3 h-7 w-7 text-[#C9A227]/30" />
        <p className="text-sm leading-relaxed text-[#b0c4d8] mb-4">
          "{testimonial.comment}"
        </p>
        <StarRating rating={testimonial.rating} />
        <div className="mt-4 flex items-center gap-3 border-t border-[#1a3a5c] pt-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A227] to-[#a8861e] text-sm font-bold text-[#0B1F3A]">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#fafafa]">
              {testimonial.name}
            </p>
            {testimonial.designation && (
              <p className="text-xs text-[#e4e4e7]">
                {testimonial.designation}
              </p>
            )}
          </div>
        </div>
        {testimonial.project && (
          <div className="mt-3">
            <span className="inline-block rounded-full bg-[#C9A227]/10 px-3 py-1 text-xs font-medium text-[#C9A227]">
              {testimonial.project}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

/* ── Page Component ────────────────────────────────────────── */

export default function ClientStoriesPage() {
  const { testimonials, loading } = useTestimonials();
  const { submitTestimonial, loading: submitting } = useSubmitTestimonial();
  const { projects } = useProjects();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    rating: 5,
    comment: "",
    project: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitTestimonial(formData);
    if (success) {
      setSubmitted(true);
      setFormData({
        name: "",
        designation: "",
        rating: 5,
        comment: "",
        project: "",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white">
      {/* ── Hero Banner ── */}
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
            <span className="text-[#C9A227]">Client Stories</span>
          </motion.nav>

          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Client <span className="text-[#C9A227]">Stories</span>
            </h1>
            <p className="text-[#e4e4e7] max-w-2xl text-lg">
              Real experiences from families who found their dream home with iA
              Constructions. Share your story and inspire others.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Submission Form ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form – 3/5 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="bg-[#0f2847]/60 border-[#1a3a5c]">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Share Your Story
                </h2>
                <p className="text-[#7a8fa6] text-sm mb-6">
                  Your testimonial will be reviewed and published on our
                  website.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Thank You!
                    </h3>
                    <p className="text-[#e4e4e7] mb-6">
                      Your story has been submitted successfully. It will appear
                      on our website after review.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227]/10"
                    >
                      Submit Another Story
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#e4e4e7] text-sm mb-2">
                          Your Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="bg-[#122d4d] border-[#1a3a5c] text-white placeholder:text-[#7a8fa6] focus:border-[#C9A227]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#e4e4e7] text-sm mb-2">
                          Designation / Title
                        </label>
                        <Input
                          name="designation"
                          value={formData.designation}
                          onChange={handleChange}
                          placeholder="e.g. Software Engineer, Dubai"
                          className="bg-[#122d4d] border-[#1a3a5c] text-white placeholder:text-[#7a8fa6] focus:border-[#C9A227]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#e4e4e7] text-sm mb-2">
                        Project
                      </label>
                      <select
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-md border border-[#1a3a5c] bg-[#122d4d] text-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
                      >
                        <option value="">Select a project (optional)</option>
                        {projects.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#e4e4e7] text-sm mb-2">
                        Rating *
                      </label>
                      <StarRatingInput
                        value={formData.rating}
                        onChange={(v) =>
                          setFormData({ ...formData, rating: v })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-[#e4e4e7] text-sm mb-2">
                        Your Story *
                      </label>
                      <Textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="Tell us about your experience with iA Constructions..."
                        rows={5}
                        required
                        className="bg-[#122d4d] border-[#1a3a5c] text-white placeholder:text-[#7a8fa6] focus:border-[#C9A227]"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto bg-[#C9A227] hover:bg-[#a8861e] text-[#0B1F3A] font-semibold px-8 py-3"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {submitting ? "Submitting…" : "Submit Your Story"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Info sidebar – 2/5 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-5"
          >
            <Card className="bg-[#0f2847]/60 border-[#1a3a5c]">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-3 text-lg">
                  Why Share Your Story?
                </h3>
                <ul className="space-y-3 text-sm text-[#b0c4d8]">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C9A227] mt-0.5 shrink-0" />
                    Help other home buyers make informed decisions
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C9A227] mt-0.5 shrink-0" />
                    Share your experience with our community
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C9A227] mt-0.5 shrink-0" />
                    Your feedback helps us improve our services
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C9A227] mt-0.5 shrink-0" />
                    Featured stories get highlighted on our homepage
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#0f2847]/60 border-[#1a3a5c]">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-2">
                  Review Process
                </h3>
                <p className="text-sm text-[#b0c4d8]">
                  All submissions are reviewed by our team before being
                  published. This typically takes 1–2 business days. We may
                  reach out to you for verification.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── Published Stories ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-[#C9A227] font-medium uppercase tracking-widest text-sm">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            What Our Clients Say
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 border-2 border-[#C9A227] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-[#7a8fa6] py-12">
            No stories published yet. Be the first to share your experience!
          </p>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}
