import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

const SITE_NAME = "iA Constructions";
const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

export function usePageSEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
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

    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage || DEFAULT_OG_IMAGE);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);

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

    return () => {
      document.title = `${SITE_NAME} — Builders & Developers | Hyderabad`;
    };
  }, [title, description, canonical, ogImage, ogType]);
}
