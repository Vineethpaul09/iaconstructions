/**
 * Centralized site configuration.
 * Change the domain or company details here — all SEO tags,
 * JSON-LD schemas, canonical URLs, and OG meta will update automatically.
 */

export const SITE_URL = "https://iaconstructions.com";

export const SITE = {
  name: "iA Constructions",
  alternateName: "iA Constructions Builders & Developers",
  tagline: "Builders & Developers",
  url: SITE_URL,
  ogImage: `${SITE_URL}/images/og-default.jpg`,
  email: "dinesh@iaconstructions.com",
  phone: "+91 91544 50123",
  phoneTel: "+91-91544-50123",
  whatsapp: "919154450123",
  instagram: "https://www.instagram.com/iaconstructions.in",
  address: {
    street: "VASAVI NILAYAM, MIG 59, Road No 1, KPHB Colony, Kukatpally",
    city: "Hyderabad",
    region: "Telangana",
    postalCode: "500072",
    country: "IN",
    full: "VASAVI NILAYAM, MIG 59, Road No 1, KPHB Colony, Kukatpally, Hyderabad, 500072",
  },
  geo: { lat: "17.4933", lng: "78.3989" },
  foundingDate: "2017",
  languages: ["English", "Hindi", "Telugu"],
} as const;

/** Build a full canonical URL for a given path, e.g. "/about" → "https://iaconstructions.com/about" */
export function siteUrl(path: string = "/"): string {
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleaned}`;
}
