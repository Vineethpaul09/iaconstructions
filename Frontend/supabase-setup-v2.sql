-- ============================================================
-- Supabase V2 Setup — Simplified Schema + Admin Support
-- Run in: Supabase Dashboard → SQL Editor → New Query
--
-- IMPORTANT: This DROPS and recreates all tables.
-- Run this on a fresh project or when migrating from V1.
--
-- After running, create your admin user:
--   Dashboard → Authentication → Users → Add User
--   (email + password)
-- ============================================================

-- Drop existing tables (CASCADE also drops triggers/constraints)
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- ── Simplified Projects ─────────────────────────────────
CREATE TABLE projects (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  slug        text NOT NULL UNIQUE,
  description text NOT NULL DEFAULT '',
  type        text NOT NULL DEFAULT 'apartment',   -- villa | home | apartment | commercial | bungalow | penthouse | plot
  status      text NOT NULL DEFAULT 'ongoing',     -- ongoing | completed | upcoming
  price       numeric NOT NULL DEFAULT 0,
  area_sqft   numeric NOT NULL DEFAULT 0,
  location    text NOT NULL DEFAULT '',            -- e.g. "Bandlaguda, Hyderabad"
  address     text NOT NULL DEFAULT '',
  bedrooms    int NOT NULL DEFAULT 0,
  bathrooms   int NOT NULL DEFAULT 0,
  images      jsonb NOT NULL DEFAULT '[]'::jsonb,  -- array of image URLs
  featured    boolean NOT NULL DEFAULT false,
  rera_number text NOT NULL DEFAULT '',
  possession_date text NOT NULL DEFAULT '',
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- ── Site Settings (admin-configurable) ──────────────────
CREATE TABLE site_settings (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key        text NOT NULL UNIQUE,
  value      jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

-- ── Leads ───────────────────────────────────────────────
CREATE TABLE leads (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name         text NOT NULL,
  email        text NOT NULL,
  country_code text NOT NULL DEFAULT '+91',
  phone        text NOT NULL,
  intent       text NOT NULL DEFAULT 'buy',
  property_type text NOT NULL DEFAULT '',
  location     text NOT NULL DEFAULT '',
  budget_min   numeric NOT NULL DEFAULT 0,
  budget_max   numeric NOT NULL DEFAULT 0,
  project_id   uuid REFERENCES projects(id) ON DELETE SET NULL,
  created_at   timestamptz DEFAULT now()
);

-- ── Contact Messages ────────────────────────────────────
CREATE TABLE contact_messages (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name         text NOT NULL,
  email        text NOT NULL,
  country_code text NOT NULL DEFAULT '+91',
  phone        text NOT NULL,
  subject      text NOT NULL DEFAULT '',
  message      text NOT NULL DEFAULT '',
  created_at   timestamptz DEFAULT now()
);

-- ── Newsletter Subscribers ──────────────────────────────
CREATE TABLE newsletter_subscribers (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email      text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- ═══════════════════════════════════════════════════════
-- Row Level Security
-- ═══════════════════════════════════════════════════════

ALTER TABLE projects              ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings         ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages      ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Projects: public read, authenticated write
CREATE POLICY "projects_public_read"  ON projects FOR SELECT USING (true);
CREATE POLICY "projects_auth_insert"  ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "projects_auth_update"  ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "projects_auth_delete"  ON projects FOR DELETE USING (auth.role() = 'authenticated');

-- Site settings: public read, authenticated write
CREATE POLICY "settings_public_read"  ON site_settings FOR SELECT USING (true);
CREATE POLICY "settings_auth_insert"  ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "settings_auth_update"  ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');

-- Leads: public insert, authenticated read + delete
CREATE POLICY "leads_public_insert"   ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "leads_auth_read"       ON leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "leads_auth_delete"     ON leads FOR DELETE USING (auth.role() = 'authenticated');

-- Contacts: public insert, authenticated read + delete
CREATE POLICY "contacts_public_insert" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "contacts_auth_read"     ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "contacts_auth_delete"   ON contact_messages FOR DELETE USING (auth.role() = 'authenticated');

-- Newsletter: public insert, authenticated read + delete
CREATE POLICY "newsletter_public_insert" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "newsletter_auth_read"     ON newsletter_subscribers FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "newsletter_auth_delete"   ON newsletter_subscribers FOR DELETE USING (auth.role() = 'authenticated');

-- ── Triggers ────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── Storage bucket for project images ───────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies (public read, authenticated write)
-- Drop existing policies first to avoid conflicts on re-run
DROP POLICY IF EXISTS "project_images_public_read" ON storage.objects;
DROP POLICY IF EXISTS "project_images_auth_insert" ON storage.objects;
DROP POLICY IF EXISTS "project_images_auth_update" ON storage.objects;
DROP POLICY IF EXISTS "project_images_auth_delete" ON storage.objects;

CREATE POLICY "project_images_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "project_images_auth_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "project_images_auth_update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "project_images_auth_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- ── Seed default site settings ──────────────────────────
INSERT INTO site_settings (key, value) VALUES
  ('hero', '{"title": "Building Dreams, Delivering Excellence", "subtitle": "Quality homes at smart prices across Hyderabad"}'::jsonb),
  ('company', '{"phone": "+91 91544 50123", "email": "info@iaconstructions.in", "whatsapp": "919154450123", "address": "VASAVI NILAYAM, MIG 59, Road No 1, KPHB Colony, Kukatpally, Hyderabad, 500072", "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d590.7148008252918!2d78.40137041221254!3d17.490251879710808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91548e5ff957%3A0x268fb3341bc87451!2sSR%20prime%20mens%20pg!5e0!3m2!1sen!2sca!4v1772489835178!5m2!1sen!2sca"}'::jsonb),
  ('social', '{"facebook": "", "instagram": "https://www.instagram.com/iaconstructions.in", "twitter": "", "youtube": ""}'::jsonb)
ON CONFLICT (key) DO NOTHING;
