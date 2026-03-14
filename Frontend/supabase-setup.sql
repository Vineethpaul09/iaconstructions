-- ============================================================
-- Supabase SQL Setup for iA Constructions
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── Projects table ──────────────────────────────────────────
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text not null default '',
  type text not null default 'apartment',
  status text not null default 'available',
  project_status text not null default 'ongoing',
  price numeric not null default 0,
  price_per_sqft numeric not null default 0,
  area numeric not null default 0,
  bedrooms int not null default 0,
  bathrooms int not null default 0,
  balconies int not null default 0,
  floor int not null default 0,
  total_floors int not null default 0,
  facing text not null default '',
  address text not null default '',
  city text not null default 'Hyderabad',
  state text not null default 'Telangana',
  pincode text not null default '',
  latitude numeric not null default 0,
  longitude numeric not null default 0,
  landmark text not null default '',
  amenities jsonb not null default '[]'::jsonb,
  specifications jsonb not null default '[]'::jsonb,
  images jsonb not null default '[]'::jsonb,
  floor_plan_image text not null default '',
  has_3d_tour boolean not null default false,
  has_video boolean not null default false,
  rera_number text not null default '',
  possession_date text not null default '',
  builder text not null default 'IAC Constructions',
  featured boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Leads table ─────────────────────────────────────────────
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  country_code text not null default '+91',
  phone text not null,
  intent text not null default 'buy',
  property_type text not null default '',
  location text not null default '',
  budget_min numeric not null default 0,
  budget_max numeric not null default 0,
  property_id uuid references projects(id),
  created_at timestamptz default now()
);

-- ── Contact messages table ──────────────────────────────────
create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  country_code text not null default '+91',
  phone text not null,
  subject text not null default '',
  message text not null default '',
  created_at timestamptz default now()
);

-- ── Newsletter subscribers table ────────────────────────────
create table if not exists newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamptz default now()
);

-- ── Row Level Security (RLS) ────────────────────────────────
-- Enable RLS on all tables
alter table projects enable row level security;
alter table leads enable row level security;
alter table contact_messages enable row level security;
alter table newsletter_subscribers enable row level security;

-- Projects: anyone can read (public listing)
create policy "Projects are publicly readable"
  on projects for select
  using (true);

-- Leads: anyone can insert (form submission), only authenticated can read
create policy "Anyone can submit a lead"
  on leads for insert
  with check (true);

create policy "Only authenticated users can read leads"
  on leads for select
  using (auth.role() = 'authenticated');

-- Contact messages: anyone can insert, only authenticated can read
create policy "Anyone can submit a contact message"
  on contact_messages for insert
  with check (true);

create policy "Only authenticated users can read contact messages"
  on contact_messages for select
  using (auth.role() = 'authenticated');

-- Newsletter: anyone can insert, only authenticated can read
create policy "Anyone can subscribe to newsletter"
  on newsletter_subscribers for insert
  with check (true);

create policy "Only authenticated users can read subscribers"
  on newsletter_subscribers for select
  using (auth.role() = 'authenticated');

-- ── Auto-update updated_at on projects ──────────────────────
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_projects_updated_at
  before update on projects
  for each row
  execute function update_updated_at_column();
