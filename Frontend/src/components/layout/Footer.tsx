import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Phone, Mail, MapPin, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { footerNavigation } from "@/data/navigation";

// ───────────────────────────── types
interface SocialLink {
  Icon: React.FC<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  href: string;
  label: string;
}

// ───────────────────────────── constants
const socialLinks: SocialLink[] = [
  { Icon: Mail, href: "mailto:dinesh@iaconstructions.com", label: "Email" },
  {
    Icon: Instagram,
    href: "https://www.instagram.com/iaconstructions.in",
    label: "Instagram",
  },
];

const contactInfo = [
  {
    Icon: MapPin,
    text: "VASAVI NILAYAM, MIG 59, Road No 1, KPHB Colony, Kukatpally, Hyderabad, 500072",
    href: undefined,
  },
  {
    Icon: Phone,
    text: "+17787645123",
    href: "tel:+17787645123",
  },
  {
    Icon: Mail,
    text: "dinesh@iaconstructions.com",
    href: "mailto:dinesh@iaconstructions.com",
  },
] as const;

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: integrate newsletter API
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#071428] text-[#94a3b8]">
      {/* gold separator */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/60 to-transparent" />

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 – Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <div className="flex flex-col leading-none">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-[#C9A227] via-[#d4b94e] to-[#C9A227] bg-clip-text text-transparent italic">
                    iA
                  </span>
                  <span className="text-lg font-semibold text-[#fafafa] tracking-tight">
                    Constructions
                  </span>
                </div>
                <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#94a3b8] mt-0.5">
                  Builders &amp; Developers
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Crafting quality living spaces in and around Hyderabad. Trusted by
              NRIs across USA, Canada, Australia &amp; UK.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1a3a5c] text-[#94a3b8] transition-all duration-200 hover:border-[#C9A227] hover:text-[#C9A227] hover:bg-[#C9A227]/10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              {/* WhatsApp */}
              <a
                href="https://wa.me/919154450123"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1a3a5c] text-[#94a3b8] transition-all duration-200 hover:border-[#C9A227] hover:text-[#C9A227] hover:bg-[#C9A227]/10"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h4 className="text-[#fafafa] font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerNavigation.quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-sm transition-colors hover:text-[#C9A227]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Google Maps */}
          <div>
            <h4 className="text-[#fafafa] font-semibold text-sm uppercase tracking-wider mb-5">
              Our Location
            </h4>
            <div className="rounded-lg overflow-hidden border border-[#1a3a5c]">
              <iframe
                title="iA Constructions Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2!2d78.3830!3d17.3549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb95ed2b0b8b8f%3A0x0!2sKPHB%20Colony%2C%20Kukatpally%2C%20Hyderabad%2C%20Telangana%20500072!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Column 4 – Contact Info */}
          <div>
            <h4 className="text-[#fafafa] font-semibold text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map(({ Icon, text, href }) => {
                const content = (
                  <span className="flex items-start gap-3 text-sm group">
                    <Icon className="h-4 w-4 mt-0.5 shrink-0 text-[#C9A227]" />
                    <span className="transition-colors group-hover:text-[#C9A227]">
                      {text}
                    </span>
                  </span>
                );

                return (
                  <li key={text}>
                    {href ? (
                      <a href={href} className="block">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ── Newsletter ── */}
        <div className="mt-12 pt-8 border-t border-[#1a3a5c]/60">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="text-[#fafafa] font-semibold text-base mb-1">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-sm text-[#7a8fa6]">
                Get the latest property launches and exclusive offers delivered
                to your inbox.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full md:w-auto items-center gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={cn(
                  "h-10 w-full md:w-64 rounded-md border border-[#1a3a5c] bg-[#0f2847] px-3 text-sm text-[#fafafa] placeholder:text-[#7a8fa6]",
                  "focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227]/40 transition-all",
                )}
              />
              <Button type="submit" size="default" className="shrink-0 gap-2">
                <Send className="h-4 w-4" />
                Subscribe
              </Button>
            </form>
          </div>

          {subscribed && (
            <p className="mt-3 text-sm text-[#C9A227]">
              Thank you for subscribing! We'll keep you updated.
            </p>
          )}
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="border-t border-[#1a3a5c]/60 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#7a8fa6]">
          <span>
            &copy; {currentYear} iA Constructions. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            {footerNavigation.legal.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="transition-colors hover:text-[#C9A227]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
