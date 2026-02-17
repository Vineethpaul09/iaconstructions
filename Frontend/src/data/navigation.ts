import type { NavItem } from "../types";

export const navigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "Ongoing", href: "/projects?status=ongoing" },
      { label: "Completed", href: "/projects?status=completed" },
      { label: "Upcoming", href: "/projects?status=upcoming" },
    ],
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const footerNavigation = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],

  locations: [
    {
      label: "Bandlaguda Jagir, Hyderabad",
      href: "/projects?location=bandlaguda-jagir",
    },
    { label: "Attapur, Hyderabad", href: "/projects?location=attapur" },
    {
      label: "Mehdipatnam, Hyderabad",
      href: "/projects?location=mehdipatnam",
    },
    { label: "Shamshabad, Hyderabad", href: "/projects?location=shamshabad" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "RERA Information", href: "/rera" },
    { label: "Sitemap", href: "/sitemap" },
  ],
};

export const statCounters = [
  { label: "Projects Delivered", value: 23, suffix: "+" },
  { label: "Years of Experience", value: 9, suffix: "+" },
  { label: "Approval Rate", value: 100, suffix: "%" },
];
