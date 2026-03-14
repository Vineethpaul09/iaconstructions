/* ── Project types (simplified V2 schema) ─────────────────────── */

export type ProjectType =
  | "villa"
  | "home"
  | "apartment"
  | "commercial"
  | "bungalow"
  | "penthouse"
  | "plot";

export type ProjectStatus = "ongoing" | "completed" | "upcoming";

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  price: number;
  areaSqft: number;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  featured: boolean;
  reraNumber: string;
  possessionDate: string;
  createdAt: string;
  updatedAt: string;
}

/** @deprecated – Use Project instead */
export type Property = Project;

export interface SiteSettings {
  hero: { title: string; subtitle: string };
  company: { phone: string; email: string; whatsapp: string; address: string };
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  avatar: string;
  rating: number;
  comment: string;
  project: string;
  date: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  features: string[];
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  intent: "buy" | "sell" | "invest" | "rent";
  propertyType: string;
  budgetMin: number;
  budgetMax: number;
  location: string;
  message: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface StatCounter {
  label: string;
  value: number;
  suffix: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FilterState {
  location: string;
  propertyType: string;
  budgetRange: [number, number];
  bedrooms: string;
  status: string;
  sortBy: string;
}
