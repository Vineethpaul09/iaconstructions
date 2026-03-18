import { supabase } from "@/lib/supabase";

/* ── Types ──────────────────────────────────────────────────── */

interface NotificationSettings {
  enabled: boolean;
  emailEnabled: boolean;
  telegramEnabled: boolean;
}

interface LeadNotification {
  type: "lead";
  name: string;
  email: string;
  phone: string;
  intent: string;
  propertyType: string;
  location: string;
  budgetMin: number;
  budgetMax: number;
}

interface ContactNotification {
  type: "contact";
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type NotificationPayload = LeadNotification | ContactNotification;

/* ── Fetch notification settings from Supabase ──────────────── */

let cachedSettings: NotificationSettings | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60_000; // 1 minute

async function getNotificationSettings(): Promise<NotificationSettings> {
  const now = Date.now();
  if (cachedSettings && now - cacheTimestamp < CACHE_TTL) {
    return cachedSettings;
  }

  const defaults: NotificationSettings = {
    enabled: false,
    emailEnabled: false,
    telegramEnabled: false,
  };

  if (!supabase) return defaults;

  try {
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "notifications")
      .single();

    if (data?.value) {
      cachedSettings = { ...defaults, ...(data.value as Partial<NotificationSettings>) };
    } else {
      cachedSettings = defaults;
    }
    cacheTimestamp = now;
    return cachedSettings!;
  } catch {
    return defaults;
  }
}

/* ── Send notification via Supabase Edge Function ───────────── */

export async function sendAdminNotification(
  payload: NotificationPayload,
): Promise<void> {
  try {
    const settings = await getNotificationSettings();

    if (!settings.enabled) return;
    if (!settings.emailEnabled && !settings.telegramEnabled) return;

    if (!supabase) return;

    // Call the Supabase Edge Function (fire-and-forget)
    supabase.functions
      .invoke("notify-admin", {
        body: {
          ...payload,
          channels: {
            email: settings.emailEnabled,
            telegram: settings.telegramEnabled,
          },
        },
      })
      .catch(() => {
        // Silently fail — notification is best-effort
      });
  } catch {
    // Never block the main flow for notification failures
  }
}

/* ── Invalidate cache (called when admin updates settings) ──── */

export function clearNotificationCache(): void {
  cachedSettings = null;
  cacheTimestamp = 0;
}
