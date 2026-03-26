import { useEffect } from "react";
import { SITE } from "@/config/site";

interface SEOOptions {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  ogImageAlt?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  keywords?: string;
}

const SITE_NAME = SITE.name;
const DEFAULT_OG_IMAGE = SITE.ogImage;

export function usePageSEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  ogImageAlt,
  jsonLd,
  noindex = false,
  keywords,
}: SEOOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Core meta
    setMeta("name", "description", description);
    if (noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    }
    if (keywords) {
      setMeta("name", "keywords", keywords);
    }

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage || DEFAULT_OG_IMAGE);
    if (ogImageAlt) {
      setMeta("property", "og:image:alt", ogImageAlt);
    }
    if (canonical) {
      setMeta("property", "og:url", canonical);
    }

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage || DEFAULT_OG_IMAGE);

    // Canonical
    if (canonical) {
      let link = document.head.querySelector(
        'link[rel="canonical"]',
      ) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // JSON-LD structured data
    const jsonLdScripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      for (const schema of schemas) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-page-seo", "true");
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
        jsonLdScripts.push(script);
      }
    }

    return () => {
      document.title = `${SITE_NAME} — Builders & Developers | Hyderabad`;
      // Clean up page-specific JSON-LD
      for (const script of jsonLdScripts) {
        script.remove();
      }
    };
  }, [
    title,
    description,
    canonical,
    ogImage,
    ogType,
    ogImageAlt,
    jsonLd,
    noindex,
    keywords,
  ]);
}
