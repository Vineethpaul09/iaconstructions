// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "info@iaconstructions.in";
const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadPayload {
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

interface ContactPayload {
  type: "contact";
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface RequestBody {
  channels?: { email?: boolean; telegram?: boolean };
}

type NotificationPayload = (LeadPayload | ContactPayload) & RequestBody;

/* ── Telegram message builder ────────────────────────────────── */

function buildTelegramMessage(payload: NotificationPayload): string {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  if (payload.type === "lead") {
    const budget =
      payload.budgetMin || payload.budgetMax
        ? `₹${(payload.budgetMin / 100000).toFixed(0)}L – ₹${(payload.budgetMax / 100000).toFixed(0)}L`
        : "Not specified";

    return [
      `🏠 *New Lead Received\\!*`,
      ``,
      `👤 *Name:* ${escapeMarkdown(payload.name)}`,
      `📧 *Email:* ${escapeMarkdown(payload.email)}`,
      `📱 *Phone:* ${escapeMarkdown(payload.phone)}`,
      `🎯 *Intent:* ${escapeMarkdown(payload.intent)}`,
      `🏗️ *Property:* ${escapeMarkdown(payload.propertyType || "Any")}`,
      `📍 *Location:* ${escapeMarkdown(payload.location || "Not specified")}`,
      `💰 *Budget:* ${escapeMarkdown(budget)}`,
      ``,
      `🕐 ${escapeMarkdown(timestamp)}`,
      `_via iA Constructions website_`,
    ].join("\n");
  }

  return [
    `📩 *New Contact Message\\!*`,
    ``,
    `👤 *Name:* ${escapeMarkdown(payload.name)}`,
    `📧 *Email:* ${escapeMarkdown(payload.email)}`,
    `📱 *Phone:* ${escapeMarkdown(payload.phone)}`,
    `📋 *Subject:* ${escapeMarkdown(payload.subject)}`,
    `💬 *Message:* ${escapeMarkdown(payload.message)}`,
    ``,
    `🕐 ${escapeMarkdown(timestamp)}`,
    `_via iA Constructions website_`,
  ].join("\n");
}

function escapeMarkdown(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

/* ── Email HTML builder ──────────────────────────────────────── */

function buildEmailHtml(payload: NotificationPayload): { subject: string; html: string } {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  if (payload.type === "lead") {
    const budget =
      payload.budgetMin || payload.budgetMax
        ? `₹${(payload.budgetMin / 100000).toFixed(0)}L – ₹${(payload.budgetMax / 100000).toFixed(0)}L`
        : "Not specified";

    return {
      subject: `🏠 New Lead: ${payload.name} – ${payload.intent}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f9f9f9;">
          <div style="background:#1a1a2e;color:#C9A227;padding:16px 24px;border-radius:8px 8px 0 0;">
            <h2 style="margin:0;">🏠 New Lead Received</h2>
          </div>
          <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e0e0e0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#666;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${payload.name}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${payload.email}">${payload.email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;"><a href="tel:${payload.phone}">${payload.phone}</a></td></tr>
              <tr><td style="padding:8px 0;color:#666;">Intent</td><td style="padding:8px 0;">${payload.intent}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Property Type</td><td style="padding:8px 0;">${payload.propertyType || "Any"}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Location</td><td style="padding:8px 0;">${payload.location || "Not specified"}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Budget</td><td style="padding:8px 0;font-weight:600;color:#C9A227;">${budget}</td></tr>
            </table>
            <hr style="margin:16px 0;border:none;border-top:1px solid #eee;">
            <p style="color:#999;font-size:12px;margin:0;">Received on ${timestamp} via iA Constructions website</p>
          </div>
        </div>
      `,
    };
  }

  return {
    subject: `📩 New Contact: ${payload.name} – ${payload.subject}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f9f9f9;">
        <div style="background:#1a1a2e;color:#C9A227;padding:16px 24px;border-radius:8px 8px 0 0;">
          <h2 style="margin:0;">📩 New Contact Message</h2>
        </div>
        <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e0e0e0;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#666;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${payload.name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${payload.email}">${payload.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;"><a href="tel:${payload.phone}">${payload.phone}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666;">Subject</td><td style="padding:8px 0;font-weight:600;">${payload.subject}</td></tr>
          </table>
          <div style="margin:16px 0;padding:16px;background:#f5f5f5;border-radius:6px;border-left:4px solid #C9A227;">
            <p style="margin:0;white-space:pre-wrap;">${payload.message}</p>
          </div>
          <hr style="margin:16px 0;border:none;border-top:1px solid #eee;">
          <p style="color:#999;font-size:12px;margin:0;">Received on ${timestamp} via iA Constructions website</p>
        </div>
      </div>
    `,
  };
}

/* ── Send via Telegram ───────────────────────────────────────── */

async function sendTelegram(payload: NotificationPayload): Promise<{ ok: boolean; error?: string }> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return { ok: false, error: "Telegram not configured" };
  }

  const text = buildTelegramMessage(payload);
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: "MarkdownV2",
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Telegram API error:", data);
    return { ok: false, error: data.description ?? "Telegram send failed" };
  }
  return { ok: true };
}

/* ── Send via Email (Resend) ─────────────────────────────────── */

async function sendEmail(payload: NotificationPayload): Promise<{ ok: boolean; error?: string; emailId?: string }> {
  if (!RESEND_API_KEY) {
    return { ok: false, error: "Resend API key not configured" };
  }

  const { subject, html } = buildEmailHtml(payload);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "iA Constructions <notifications@iaconstructions.in>",
      to: [ADMIN_EMAIL],
      subject,
      html,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Resend API error:", data);
    return { ok: false, error: data.message ?? "Email send failed" };
  }
  return { ok: true, emailId: data.id };
}

/* ── Main handler ────────────────────────────────────────────── */

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload: NotificationPayload = await req.json();

    if (!payload.type || !payload.name || !payload.email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: type, name, email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const channels = payload.channels ?? { email: true, telegram: true };
    const results: Record<string, { ok: boolean; error?: string }> = {};

    // Send to enabled channels in parallel
    const promises: Promise<void>[] = [];

    if (channels.email) {
      promises.push(
        sendEmail(payload).then((r) => { results.email = r; }),
      );
    }

    if (channels.telegram) {
      promises.push(
        sendTelegram(payload).then((r) => { results.telegram = r; }),
      );
    }

    await Promise.allSettled(promises);

    const anySuccess = Object.values(results).some((r) => r.ok);

    return new Response(
      JSON.stringify({ success: anySuccess, results }),
      {
        status: anySuccess ? 200 : 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

