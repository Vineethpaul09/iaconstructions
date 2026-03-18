-- ============================================================
-- WhatsApp Notification Setup via Supabase Database Webhooks
-- ============================================================
--
-- This SQL sets up database triggers that fire when new leads
-- or contact messages are inserted. Combined with a Supabase
-- Database Webhook (configured in the Dashboard), this enables
-- server-side WhatsApp notifications.
--
-- SETUP STEPS:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Go to Dashboard → Database → Webhooks → Create Webhook
-- 3. Table: leads → Event: INSERT → HTTP endpoint: your webhook URL
-- 4. Table: contact_messages → Event: INSERT → HTTP endpoint: your webhook URL
--
-- The webhook endpoint receives the full row data as JSON.
-- Connect it to WhatsApp Business API, Twilio, or any messaging service.
-- ============================================================

-- Enable pg_net extension for HTTP requests from PostgreSQL (if available)
-- CREATE EXTENSION IF NOT EXISTS pg_net;

-- ── Notification log table (optional, for tracking) ─────────
CREATE TABLE IF NOT EXISTS notification_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,        -- 'lead' | 'contact'
  record_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',  -- 'pending' | 'sent' | 'failed'
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE notification_log ENABLE ROW LEVEL SECURITY;

-- Only authenticated (admin) can view notification logs
CREATE POLICY "Admin can manage notification_log"
  ON notification_log FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ── Trigger function: log new leads ─────────────────────────
CREATE OR REPLACE FUNCTION log_new_lead()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notification_log (event_type, record_id)
  VALUES ('lead', NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── Trigger function: log new contacts ──────────────────────
CREATE OR REPLACE FUNCTION log_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notification_log (event_type, record_id)
  VALUES ('contact', NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── Attach triggers ─────────────────────────────────────────
DROP TRIGGER IF EXISTS trg_notify_new_lead ON leads;
CREATE TRIGGER trg_notify_new_lead
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION log_new_lead();

DROP TRIGGER IF EXISTS trg_notify_new_contact ON contact_messages;
CREATE TRIGGER trg_notify_new_contact
  AFTER INSERT ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION log_new_contact();
