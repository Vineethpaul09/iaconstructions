export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  type:
    | "apartment"
    | "villa"
    | "bungalow"
    | "plot"
    | "commercial"
    | "penthouse";
  status: "available" | "sold" | "reserved" | "upcoming";
  projectStatus: "ongoing" | "completed" | "upcoming";
  price: number;
  pricePerSqFt: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  floor: number;
  totalFloors: number;
  facing: string;
  location: PropertyLocation;
  amenities: string[];
  specifications: PropertySpecification[];
  images: string[];
  floorPlanImage: string;
  has3DTour: boolean;
  hasVideo: boolean;
  reraNumber: string;
  possessionDate: string;
  builder: string;
  featured: boolean;
  createdAt: string;
}

export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  landmark: string;
}

export interface PropertySpecification {
  category: string;
  items: { label: string; value: string }[];
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "ongoing" | "completed" | "upcoming";
  location: PropertyLocation;
  totalUnits: number;
  availableUnits: number;
  priceRange: { min: number; max: number };
  areaRange: { min: number; max: number };
  types: string[];
  amenities: string[];
  images: string[];
  heroImage: string;
  completionDate: string;
  reraNumber: string;
  properties: Property[];
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
