export interface NavItem {
  label: string;
  to: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Solutions", to: "/solutions" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Industries", to: "/industries" },
  { label: "Careers", to: "/careers" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const BRAND = {
  name: "ZerosAndOnes",
  short: "01",
  tagline: "Engineering the future with AI, Cloud & DevOps.",
  email: "hello@zerosandones.io",
  phone: "+1 (555) 010-1010",
  hq: "Bangalore · London · Austin",
} as const;
