import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const legalContent: Record<
  string,
  { title: string; sections: { heading: string; body: string }[] }
> = {
  "/privacy": {
    title: "Privacy Policy",
    sections: [
      {
        heading: "Information We Collect",
        body: "We collect personal information such as your name, email address, phone number, and property preferences when you fill out contact forms, subscribe to our newsletter, or interact with our website.",
      },
      {
        heading: "How We Use Your Information",
        body: "Your information is used to respond to your enquiries, provide property recommendations, send updates about our projects, and improve our services. We do not sell or share your personal data with third parties for marketing purposes.",
      },
      {
        heading: "Data Security",
        body: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or disclosure. All data is stored on secure servers with encryption.",
      },
      {
        heading: "Cookies",
        body: "Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some website functionality.",
      },
      {
        heading: "Contact Us",
        body: "If you have any questions about our privacy practices, please contact us at dinesh@iaconstructions.com or call +91 91544 50123.",
      },
    ],
  },
  "/terms": {
    title: "Terms & Conditions",
    sections: [
      {
        heading: "General",
        body: "By accessing and using the iA Constructions website, you agree to be bound by these Terms & Conditions. All content, images, and information on this website are the property of iA Constructions.",
      },
      {
        heading: "Property Information",
        body: "All property details, specifications, images, and pricing displayed on this website are for informational purposes only and are subject to change without notice. They do not constitute an offer or contract.",
      },
      {
        heading: "Bookings & Payments",
        body: "All property bookings and transactions are subject to separate agreements and terms. Please contact our sales team for detailed terms related to specific projects and payment schedules.",
      },
      {
        heading: "Limitation of Liability",
        body: "iA Constructions shall not be liable for any direct, indirect, or consequential damages arising from the use of this website or reliance on the information provided herein.",
      },
      {
        heading: "Governing Law",
        body: "These terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Hyderabad, Telangana.",
      },
    ],
  },
  "/rera": {
    title: "RERA Information",
    sections: [
      {
        heading: "About RERA",
        body: "The Real Estate (Regulation and Development) Act, 2016 (RERA) is an act of the Parliament of India that aims to protect buyers and boost investments in the real estate sector. iA Constructions is committed to full compliance with RERA regulations.",
      },
      {
        heading: "Our Compliance",
        body: "All our projects are registered with the Telangana State Real Estate Regulatory Authority (TS-RERA) as required by law. Registration details are available for each project on their respective pages.",
      },
      {
        heading: "Buyer Rights Under RERA",
        body: "Under RERA, buyers have the right to access project plans and layout, know the stage-wise completion schedule, receive timely possession as per agreement, get compensation for delays, and file complaints with the regulatory authority.",
      },
      {
        heading: "Telangana RERA Authority",
        body: "For more information, visit the official Telangana RERA website at https://rera.telangana.gov.in or contact the authority directly for any grievances related to real estate projects in Telangana.",
      },
    ],
  },
};

export default function LegalPage() {
  const { pathname } = useLocation();
  const content = legalContent[pathname];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!content) {
    return (
      <main className="min-h-screen bg-[#0B1F3A] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <Link to="/" className="text-[#C9A227] hover:underline">
            Go back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-white">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#0B1F3A] via-[#122d4f] to-[#0B1F3A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {content.title}
          </h1>
          <div className="w-20 h-1 bg-[#C9A227] mx-auto" />
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-10">
          {content.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl font-semibold text-[#C9A227] mb-3">
                {s.heading}
              </h2>
              <p className="text-[#e4e4e7]/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[#1a3a5c]">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#C9A227] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
