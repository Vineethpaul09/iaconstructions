import type { Project } from "../types";

/**
 * Simplified static fallback data.
 * When Supabase is connected, data is loaded from the database instead.
 */
export const staticProjects: Project[] = [
  {
    id: "proj-001",
    name: "IAC Serenity Villa",
    slug: "iac-serenity-villa",
    description:
      "Luxury 4-BHK hilltop villa in Bandlaguda Jagir with high-quality Italian marble flooring, private infinity pool, and home automation.",
    type: "villa",
    status: "completed",
    price: 30000000,
    areaSqft: 3500,
    location: "Bandlaguda, Hyderabad",
    address: "Survey No. 142, Bandlaguda Jagir Main Road",
    bedrooms: 4,
    bathrooms: 5,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop",
    ],
    featured: true,
    reraNumber: "TS-RERA/PRJ/HYD/2024/001234",
    possessionDate: "2025-06-30",
    createdAt: "2024-08-15",
    updatedAt: "2024-08-15",
  },
  {
    id: "proj-002",
    name: "IAC Greenwoods Villa",
    slug: "iac-greenwoods-villa",
    description:
      "Stunning 3-BHK independent villa in Attapur with courtyard-style layout and landscaped gardens.",
    type: "villa",
    status: "ongoing",
    price: 15000000,
    areaSqft: 2400,
    location: "Attapur, Hyderabad",
    address: "Plot No. 78, Attapur Green Avenue",
    bedrooms: 3,
    bathrooms: 4,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=500&fit=crop",
    ],
    featured: true,
    reraNumber: "TS-RERA/PRJ/HYD/2025/000487",
    possessionDate: "2026-12-31",
    createdAt: "2025-01-10",
    updatedAt: "2025-01-10",
  },
  {
    id: "proj-003",
    name: "IAC Skyline Residences",
    slug: "iac-skyline-residences",
    description:
      "Affordable 3-BHK apartments in Mehdipatnam with panoramic city views and resort-style clubhouse.",
    type: "apartment",
    status: "ongoing",
    price: 12000000,
    areaSqft: 1600,
    location: "Mehdipatnam, Hyderabad",
    address: "Tower B, IAC Skyline, Mehdipatnam Main Road",
    bedrooms: 3,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop",
    ],
    featured: true,
    reraNumber: "TS-RERA/PRJ/HYD/2025/054321",
    possessionDate: "2027-03-31",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01",
  },
  {
    id: "proj-004",
    name: "IAC Urban Nest",
    slug: "iac-urban-nest",
    description:
      "Smart, modern 2-BHK apartments in Tolichowki with home automation, EV charging, and co-working space.",
    type: "apartment",
    status: "upcoming",
    price: 5000000,
    areaSqft: 900,
    location: "Tolichowki, Hyderabad",
    address: "Wing C, IAC Urban Nest, Tolichowki Main Road",
    bedrooms: 2,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=500&fit=crop",
    ],
    featured: false,
    reraNumber: "TS-RERA/PRJ/HYD/2025/067890",
    possessionDate: "2028-06-30",
    createdAt: "2025-06-01",
    updatedAt: "2025-06-01",
  },
  {
    id: "proj-005",
    name: "IAC Shamshabad Greens",
    slug: "iac-shamshabad-greens",
    description:
      "3-BHK bungalow in gated community near Hyderabad International Airport with wide roads and greenery.",
    type: "bungalow",
    status: "completed",
    price: 7500000,
    areaSqft: 2000,
    location: "Shamshabad, Hyderabad",
    address: "Plot 34, IAC Shamshabad Greens, Shamshabad Main Road",
    bedrooms: 3,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=500&fit=crop",
    ],
    featured: false,
    reraNumber: "TS-RERA/PRJ/HYD/2024/000312",
    possessionDate: "2025-03-31",
    createdAt: "2024-05-20",
    updatedAt: "2024-05-20",
  },
  {
    id: "proj-006",
    name: "IAC Heritage Homes",
    slug: "iac-heritage-homes",
    description:
      "Affordable 2-BHK bungalows in Rajendra Nagar with kitchen garden space and modern amenities.",
    type: "home",
    status: "ongoing",
    price: 3500000,
    areaSqft: 1200,
    location: "Rajendra Nagar, Hyderabad",
    address: "Plot 12A, IAC Heritage Homes, Rajendra Nagar Colony",
    bedrooms: 2,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=500&fit=crop",
    ],
    featured: false,
    reraNumber: "TS-RERA/PRJ/HYD/2025/000198",
    possessionDate: "2026-09-30",
    createdAt: "2025-04-15",
    updatedAt: "2025-04-15",
  },
  {
    id: "proj-007",
    name: "IAC Business Hub",
    slug: "iac-business-hub",
    description:
      "Grade A commercial office space in HITEC City with IGBC Green certification, centralized HVAC, and high-speed elevators.",
    type: "commercial",
    status: "ongoing",
    price: 20000000,
    areaSqft: 2000,
    location: "HITEC City, Hyderabad",
    address: "5th Floor, IAC Business Hub, HITEC City Main Road",
    bedrooms: 0,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
    ],
    featured: true,
    reraNumber: "TS-RERA/PRJ/HYD/2025/078456",
    possessionDate: "2027-06-30",
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01",
  },
  {
    id: "proj-008",
    name: "IAC Horizon Penthouse",
    slug: "iac-horizon-penthouse",
    description:
      "Ultra-luxury 5-BHK duplex penthouse in Jubilee Hills with private rooftop terrace, plunge pool, and personal elevator.",
    type: "penthouse",
    status: "ongoing",
    price: 40000000,
    areaSqft: 4000,
    location: "Jubilee Hills, Hyderabad",
    address: "Floor 29-30, IAC Horizon Tower, Road No. 36, Jubilee Hills",
    bedrooms: 5,
    bathrooms: 6,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=500&fit=crop",
    ],
    featured: true,
    reraNumber: "TS-RERA/PRJ/HYD/2025/001678",
    possessionDate: "2027-12-31",
    createdAt: "2025-05-01",
    updatedAt: "2025-05-01",
  },
];

/** Format price in Indian Lakhs / Crores */
export function formatIndianPrice(price: number): string {
  if (price >= 10000000) {
    const crores = price / 10000000;
    return `₹${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(2)} Cr`;
  }
  const lakhs = price / 100000;
  return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(2)} L`;
}

/** Get featured projects */
export function getFeaturedProjects(): Project[] {
  return staticProjects.filter((p) => p.featured);
}

/** Get project by slug */
export function getProjectBySlug(slug: string): Project | undefined {
  return staticProjects.find((p) => p.slug === slug);
}
