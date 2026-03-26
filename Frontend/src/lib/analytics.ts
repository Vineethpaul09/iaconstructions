import { GA_MEASUREMENT_ID } from "@/config/site";

/* ── Types ───────────────────────────────────────────── */

type GtagCommand = "config" | "event" | "js" | "set" | "consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: [GtagCommand, ...unknown[]]) => void;
  }
}

/* ── Helpers ─────────────────────────────────────────── */

const isProduction = import.meta.env.PROD;

function gtag(...args: [GtagCommand, ...unknown[]]) {
  if (!isProduction || typeof window === "undefined") return;
  window.dataLayer?.push(arguments);
}

/* ── Page view (called on every SPA route change) ──── */

export function trackPageView(path: string, title?: string) {
  if (!isProduction) return;
  gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
    send_to: GA_MEASUREMENT_ID,
  });
}

/* ── Custom events ───────────────────────────────────── */

interface EventParams {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

export function trackEvent({ action, category, label, value, ...rest }: EventParams) {
  if (!isProduction) return;
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    ...rest,
  });
}

/* ── Initializer (loads the script tag dynamically) ── */

let initialized = false;

export function initGA() {
  if (!isProduction || initialized) return;
  if (typeof window === "undefined") return;

  initialized = true;

  // gtag.js loader
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // dataLayer bootstrap
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date() as unknown as GtagCommand);
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,       // We send page views manually on route change
    anonymize_ip: true,          // GDPR: hash visitor IPs
    cookie_flags: "SameSite=None;Secure",
  });
}
