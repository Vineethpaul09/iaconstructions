import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/* ── Animation helpers ─────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ── Contact info data ─────────────────────────────────────────────── */

const contactInfo = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Visit Us",
    lines: [
      "iA Constructions Head Office",
      "VASAVI NILAYAM, MIG 59, Road No 1,",
      "KPHB Colony, Kukatpally,",
      "Hyderabad, 500072",
    ],
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Call Us",
    lines: ["+1 (778)764-5123"],
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Us",
    lines: ["dinesh@iaconstructions.com"],
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Working Hours",
    lines: ["Mon – Sat: 9:00 AM – 7:00 PM", "Sunday: By Appointment"],
  },
];

/* ── Office locations ──────────────────────────────────────────────── */

const offices = [
  {
    city: "Hyderabad",
    state: "Telangana",
    address:
      "VASAVI NILAYAM, MIG 59, Road No 1, KPHB Colony, Kukatpally, Hyderabad, 500072",
    phone: "+1 (778)764-5123",
  },
];

/* ── Subject options ───────────────────────────────────────────────── */

const subjects = [
  "General Enquiry",
  "Property Enquiry",
  "Schedule a Visit",
  "Loan Assistance",
  "Legal Consultation",
  "Career Opportunities",
  "Other",
];

/* ── Component ─────────────────────────────────────────────────────── */

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, submit to API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

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
            <span className="text-[#C9A227]">Contact</span>
          </motion.nav>

          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Get In <span className="text-[#C9A227]">Touch</span>
            </h1>
            <p className="text-[#e4e4e7] max-w-2xl text-lg">
              Have a question or ready to find your dream property? We'd love to
              hear from you. Reach out and our team will get back to you within
              24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Form + Info ───────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                <h2 className="text-2xl font-bold text-white mb-6">
                  Send Us a Message
                </h2>

                {submitted && (
                  <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
                    Thank you! Your message has been sent successfully. We'll
                    get back to you within 24 hours.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#e4e4e7] text-sm mb-2">
                        Full Name *
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
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="bg-[#122d4d] border-[#1a3a5c] text-white placeholder:text-[#7a8fa6] focus:border-[#C9A227]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#e4e4e7] text-sm mb-2">
                        Phone Number *
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className="bg-[#122d4d] border-[#1a3a5c] text-white placeholder:text-[#7a8fa6] focus:border-[#C9A227]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#e4e4e7] text-sm mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full h-10 px-3 rounded-md border border-[#1a3a5c] bg-[#122d4d] text-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
                      >
                        <option value="" className="text-[#7a8fa6]">
                          Select a subject
                        </option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#e4e4e7] text-sm mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      rows={5}
                      required
                      className="bg-[#122d4d] border-[#1a3a5c] text-white placeholder:text-[#7a8fa6] focus:border-[#C9A227]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-[#C9A227] hover:bg-[#a8861e] text-[#0B1F3A] font-semibold px-8 py-3"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact info – 2/5 */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-5"
          >
            {contactInfo.map((info) => (
              <motion.div key={info.title} variants={fadeUp}>
                <Card className="bg-[#0f2847]/60 border-[#1a3a5c]">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#C9A227]/10 text-[#C9A227] flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        {info.title}
                      </h3>
                      {info.lines.map((line) => (
                        <p key={line} className="text-[#e4e4e7] text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.div variants={fadeUp}>
              <a
                href="https://wa.me/919154450123"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 hover:bg-emerald-500/20 transition-colors"
              >
                <MessageCircle className="h-8 w-8 text-emerald-400" />
                <div>
                  <p className="text-white font-semibold">Chat on WhatsApp</p>
                  <p className="text-emerald-400 text-sm">
                    Instant replies • Available 24/7
                  </p>
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Separator className="bg-[#122d4d] max-w-6xl mx-auto" />

      {/* ── Map Placeholder ──────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10"
        >
          <span className="text-[#C9A227] font-medium uppercase tracking-widest text-sm">
            Find Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            Our Location
          </h2>
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full aspect-[16/7] bg-[#0f2847] rounded-xl border border-[#1a3a5c] flex items-center justify-center mb-12"
        >
          <div className="text-center text-[#7a8fa6]">
            <MapPin className="h-12 w-12 mx-auto mb-3 text-[#C9A227]/40" />
            <p className="font-medium">Google Maps Integration</p>
            <p className="text-sm mt-1">Map will be displayed here</p>
          </div>
        </motion.div>

        {/* Office cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {offices.map((office) => (
            <motion.div key={office.city} variants={fadeUp}>
              <Card className="bg-[#0f2847]/60 border-[#1a3a5c] h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#C9A227]/10 text-[#C9A227]">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">
                        {office.city}
                      </h3>
                      <p className="text-[#7a8fa6] text-xs">{office.state}</p>
                    </div>
                  </div>
                  <p className="text-[#e4e4e7] text-sm mb-2">
                    {office.address}
                  </p>
                  <p className="text-[#C9A227] text-sm font-medium">
                    {office.phone}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
