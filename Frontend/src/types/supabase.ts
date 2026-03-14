/* ── Supabase Database Types (V2 Simplified) ────────────────── */

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: ProjectRow;
        Insert: Omit<ProjectRow, "id" | "created_at" | "updated_at"> &
          Partial<Pick<ProjectRow, "id" | "created_at" | "updated_at">>;
        Update: Partial<ProjectRow>;
      };
      site_settings: {
        Row: SiteSettingRow;
        Insert: Omit<SiteSettingRow, "id" | "updated_at"> &
          Partial<Pick<SiteSettingRow, "id" | "updated_at">>;
        Update: Partial<SiteSettingRow>;
      };
      leads: {
        Row: LeadRow;
        Insert: Omit<LeadRow, "id" | "created_at"> &
          Partial<Pick<LeadRow, "id" | "created_at">>;
        Update: Partial<LeadRow>;
      };
      contact_messages: {
        Row: ContactMessageRow;
        Insert: Omit<ContactMessageRow, "id" | "created_at"> &
          Partial<Pick<ContactMessageRow, "id" | "created_at">>;
        Update: Partial<ContactMessageRow>;
      };
      newsletter_subscribers: {
        Row: NewsletterSubscriberRow;
        Insert: Omit<NewsletterSubscriberRow, "id" | "created_at"> &
          Partial<Pick<NewsletterSubscriberRow, "id" | "created_at">>;
        Update: Partial<NewsletterSubscriberRow>;
      };
    };
  };
}

/* ── Row types ──────────────────────────────────────────────── */

export interface ProjectRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: string;
  status: string;
  price: number;
  area_sqft: number;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  featured: boolean;
  rera_number: string;
  possession_date: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingRow {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export interface LeadRow {
  id: string;
  name: string;
  email: string;
  country_code: string;
  phone: string;
  intent: string;
  property_type: string;
  location: string;
  budget_min: number;
  budget_max: number;
  project_id: string | null;
  created_at: string;
}

export interface ContactMessageRow {
  id: string;
  name: string;
  email: string;
  country_code: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface NewsletterSubscriberRow {
  id: string;
  email: string;
  created_at: string;
}

export interface TestimonialRow {
  id: string;
  name: string;
  designation: string;
  rating: number;
  comment: string;
  project: string;
  status: "pending" | "approved" | "rejected";
  source: "client" | "admin";
  created_at: string;
  updated_at: string;
}
