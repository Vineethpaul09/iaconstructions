import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SITE, siteUrl } from "@/config/site";
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
import { usePageSEO } from "@/hooks/usePageSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CountryCodeSelect, {
  formatPhoneNumber,
  validatePhoneNumber,
  getCountryByCode,
  stripNonDigits,
} from "@/components/ui/CountryCodeSelect";
import { useSubmitContact, useSiteSettings } from "@/hooks/useSupabase";

/* ── Animation helpers ─────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ── Contact defaults ──────────────────────────────────────────────── */

const DEFAULTS = {
  phone: SITE.phone,
  email: SITE.email,
  whatsapp: SITE.whatsapp,
  address: SITE.address.full,
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d590.7148008252918!2d78.40137041221254!3d17.490251879710808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91548e5ff957%3A0x268fb3341bc87451!2sSR%20prime%20mens%20pg!5e0!3m2!1sen!2sca!4v1772489835178!5m2!1sen!2sca",
};

/* ── Subject options ───────────────────────────────────────────────── */

const subjects = [
  "General Enquiry",
  "Property Enquiry",
  "Schedule a Visit",
  "Loan Assistance",
  "Legal Consultation",
  "Other",
];

/* ── Country codes ─────────────────────────────────────────────────── */

/* ── Component ─────────────────────────────────────────────────────── */

export default function ContactPage() {
  const { settings } = useSiteSettings();

  const company = settings.company as
    | {
        phone?: string;
        phone2?: string;
        headerPhone?: string;
        email?: string;
        whatsapp?: string;
        address?: string;
        mapEmbedUrl?: string;
      }
    | undefined;

  const phone = company?.phone || DEFAULTS.phone;
  const phone2 = company?.phone2 || "";
  const emailAddr = company?.email || DEFAULTS.email;

  const contactJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: `Contact ${SITE.name}`,
      url: siteUrl("/contact"),
      mainEntity: {
        "@type": "Organization",
        name: SITE.name,
        telephone: phone.replace(/[^+\d]/g, ""),
        email: emailAddr,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.city,
          addressRegion: SITE.address.region,
          postalCode: SITE.address.postalCode,
          addressCountry: SITE.address.country,
        },
      },
    }),
    [phone, emailAddr],
  );

  usePageSEO({
    title: "Contact Us — Get In Touch",
    description: `Contact ${SITE.name} for budget-friendly apartments, villas & commercial spaces in ${SITE.address.city}. Call ${phone} or visit our office.`,
    canonical: siteUrl("/contact"),
    ogImageAlt: `Contact ${SITE.name} — ${SITE.address.city} builders and developers`,
    jsonLd: contactJsonLd,
    keywords:
      "contact builders Hyderabad, construction company phone number, builders office Kukatpally KPHB, real estate enquiry Hyderabad, book site visit Hyderabad, property consultation Hyderabad",
  });
  const whatsapp = company?.whatsapp || DEFAULTS.whatsapp;
  const address = company?.address || DEFAULTS.address;
  const mapEmbedUrl = company?.mapEmbedUrl || DEFAULTS.mapEmbedUrl;
  const phoneTel = `tel:${phone.replace(/[^+\d]/g, "")}`;

  // Split address into display lines (chunks of ~2 comma segments)
  const addressParts = address.split(",").map((s) => s.trim());
  const addressLines = [
    "iA Constructions Head Office",
    ...(addressParts.length <= 2
      ? [addressParts.join(", ")]
      : [
          addressParts.slice(0, Math.ceil(addressParts.length / 2)).join(", ") +
            ",",
          addressParts.slice(Math.ceil(addressParts.length / 2)).join(", "),
        ]),
  ];

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      lines: addressLines.map((l) => ({ text: l })),
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      lines: phone2
        ? [
            { text: phone, href: phoneTel },
            { text: phone2, href: `tel:${phone2.replace(/[^+\d]/g, "")}` },
          ]
        : [{ text: phone, href: phoneTel }],
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      lines: [{ text: emailAddr, href: `mailto:${emailAddr}` }],
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Working Hours",
      lines: [{ text: "Mon \u2013 Sun: 8:00 AM \u2013 7:00 PM" }],
    },
  ];

  const offices = [
    {
      city: addressParts.slice(-3, -1).join(", ") || "Hyderabad",
      state: addressParts.slice(-2, -1).join("") || "Telangana",
      address,
      phone,
      phone2,
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const { submitContact } = useSubmitContact();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Format as user types
      const formatted = formatPhoneNumber(value, formData.countryCode);
      setFormData({ ...formData, phone: formatted });
      setPhoneError(null);
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleCountryCodeChange = (code: string) => {
    // Re-format existing phone digits for new country
    const digits = stripNonDigits(formData.phone);
    const formatted = formatPhoneNumber(digits, code);
    setFormData({ ...formData, countryCode: code, phone: formatted });
    setPhoneError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate phone
    const error = validatePhoneNumber(formData.phone, formData.countryCode);
    if (error) {
      setPhoneError(error);
      return;
    }
    await submitContact({
      name: formData.name,
      email: formData.email,
      countryCode: formData.countryCode,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({
      name: "",
      email: "",
      countryCode: "+91",
      phone: "",
      subject: "",
      message: "",
    });
    setPhoneError(null);
  };

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
      <section className="py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                      <label
                        htmlFor="contact-name"
                        className="block text-[#e4e4e7] text-sm mb-2"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="bg-[#122d4d] border-[#1a3a5c] text-white placeholder:text-[#7a8fa6] focus:border-[#C9A227]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[#e4e4e7] text-sm mb-2"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
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
                      <label
                        htmlFor="contact-phone"
                        className="block text-[#e4e4e7] text-sm mb-2"
                      >
                        Phone Number *
                      </label>
                      <div className="flex gap-2">
                        <CountryCodeSelect
                          value={formData.countryCode}
                          onChange={handleCountryCodeChange}
                        />
                        <Input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={
                            getCountryByCode(formData.countryCode).placeholder
                          }
                          required
                          className="flex-1 bg-[#122d4d] border-[#1a3a5c] text-white placeholder:text-[#7a8fa6] focus:border-[#C9A227]"
                        />
                      </div>
                      {phoneError && (
                        <p className="text-xs text-red-400 mt-1">
                          {phoneError}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-[#e4e4e7] text-sm mb-2"
                      >
                        Subject *
                      </label>
                      <select
                        id="contact-subject"
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
                    <label
                      htmlFor="contact-message"
                      className="block text-[#e4e4e7] text-sm mb-2"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="contact-message"
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
                      {info.lines.map((line) =>
                        "href" in line ? (
                          <a
                            key={line.text}
                            href={line.href}
                            className="block text-[#e4e4e7] text-sm hover:text-[#C9A227] transition-colors"
                          >
                            {line.text}
                          </a>
                        ) : (
                          <p key={line.text} className="text-[#e4e4e7] text-sm">
                            {line.text}
                          </p>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.div variants={fadeUp}>
              <a
                href={`https://wa.me/${whatsapp}`}
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

        {/* Google Map */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full aspect-[16/7] rounded-xl border border-[#1a3a5c] overflow-hidden mb-12"
        >
          <iframe
            src={mapEmbedUrl}
            title="iA Constructions office location on Google Maps"
            width="100%"
            height="100%"
            style={{ border: 10 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
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
                  {office.phone2 && (
                    <p className="text-[#C9A227] text-sm font-medium">
                      {office.phone2}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
