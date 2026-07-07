export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  accent: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Anaya Kapoor",
    role: "Founder & CEO",
    bio: "Ex-AWS Principal SA. 18 years scaling engineering orgs across three continents.",
    initials: "AK",
    accent: "from-neon-400 to-accent-cyan",
  },
  {
    name: "Julian Wexler",
    role: "Chief Technology Officer",
    bio: "Cloud & platform architect. Wrote the playbook for two Fortune 500 cloud migrations.",
    initials: "JW",
    accent: "from-accent-cyan to-accent-purple",
  },
  {
    name: "Mei-Lin Zhao",
    role: "VP, AI & Data",
    bio: "PhD in ML. Shipped LLM products used by millions before joining Zeros & Ones.",
    initials: "MZ",
    accent: "from-accent-purple to-accent-pink",
  },
  {
    name: "Diego Fernandes",
    role: "VP, Cyber Security",
    bio: "20-year security leader. Built SOCs for banking, healthcare and public sector.",
    initials: "DF",
    accent: "from-neon-500 to-neon-300",
  },
];

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export const MILESTONES: Milestone[] = [
  {
    year: "2015",
    title: "Founded in Bangalore",
    description:
      "Started as a boutique cloud consultancy focused on senior-first delivery.",
  },
  {
    year: "2018",
    title: "First 100 clients",
    description:
      "Crossed 100 enterprise clients across financial services, healthcare and retail.",
  },
  {
    year: "2020",
    title: "Global expansion",
    description:
      "Opened offices in London and Austin. Launched 24/7 follow-the-sun managed services.",
  },
  {
    year: "2022",
    title: "AI practice launched",
    description:
      "Formed a dedicated AI & Data practice; shipped 40+ production LLM applications.",
  },
  {
    year: "2025",
    title: "240+ clients worldwide",
    description:
      "Trusted by 240+ enterprises. 380+ engineers. 12,000+ cloud workloads under management.",
  },
];
