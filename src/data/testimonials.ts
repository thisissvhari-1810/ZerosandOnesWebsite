export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  accent: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Zeros & Ones re-platformed our core banking on AWS with zero downtime. Their engineering culture is world-class — they set the bar for our own teams.",
    name: "Sasha Reinholt",
    role: "CTO",
    company: "Atlas Bank",
    initials: "SR",
    accent: "from-neon-400 to-accent-cyan",
  },
  {
    quote:
      "The clinical AI copilot they shipped is the single biggest productivity leap our clinicians have seen in a decade. Rock-solid on compliance too.",
    name: "Dr. Marcus Adeyemi",
    role: "Chief Medical Officer",
    company: "Helix Health",
    initials: "MA",
    accent: "from-accent-purple to-accent-pink",
  },
  {
    quote:
      "We went from monthly releases to 120 deploys a day. Their DevOps platform is genuinely a strategic advantage.",
    name: "Priya Venkatesh",
    role: "VP Engineering",
    company: "Nova Retail",
    initials: "PV",
    accent: "from-accent-cyan to-neon-500",
  },
  {
    quote:
      "Every engagement feels like they care about the outcome as much as we do. Zeros & Ones is a true partner, not a vendor.",
    name: "James O'Connell",
    role: "Head of Data",
    company: "Quantum Insurance",
    initials: "JO",
    accent: "from-neon-500 to-accent-purple",
  },
  {
    quote:
      "24/7 SOC coverage that actually works. Alerts are meaningful, response is fast, and reporting is executive-ready.",
    name: "Fatima Al-Rashid",
    role: "CISO",
    company: "Orbit Media",
    initials: "FA",
    accent: "from-neon-400 to-accent-purple",
  },
  {
    quote:
      "The mobile experience they designed feels like an Apple product. Our users noticed on day one.",
    name: "Ethan Brooks",
    role: "Chief Product Officer",
    company: "Pulse Fitness",
    initials: "EB",
    accent: "from-accent-cyan to-accent-pink",
  },
];
