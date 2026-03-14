-- Testimonials / Client Stories table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL DEFAULT '',
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  project TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  source TEXT NOT NULL DEFAULT 'client' CHECK (source IN ('client', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for public listing (only approved)
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials (status);

-- RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved testimonials
CREATE POLICY "Public can read approved testimonials"
  ON testimonials FOR SELECT
  USING (status = 'approved');

-- Anyone can insert (client submissions come in as 'pending')
CREATE POLICY "Anyone can submit testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (status = 'pending' AND source = 'client');

-- Authenticated users (admin) can do everything
CREATE POLICY "Admin full access to testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
