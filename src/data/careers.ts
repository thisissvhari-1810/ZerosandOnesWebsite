export interface Job {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: "Full-time" | "Contract";
  description: string;
}

export const JOBS: Job[] = [
  {
    slug: "senior-platform-engineer",
    title: "Senior Platform Engineer",
    team: "Platform",
    location: "Remote · EMEA",
    type: "Full-time",
    description:
      "Design and operate Kubernetes-based internal developer platforms for Fortune 500 clients.",
  },
  {
    slug: "principal-ai-engineer",
    title: "Principal AI Engineer",
    team: "AI & Data",
    location: "Bangalore or Remote",
    type: "Full-time",
    description:
      "Lead the design of RAG, agentic and multi-modal LLM products for enterprise customers.",
  },
  {
    slug: "cloud-security-architect",
    title: "Cloud Security Architect",
    team: "Cyber Security",
    location: "Austin, TX",
    type: "Full-time",
    description:
      "Own zero-trust architecture, CSPM tooling and compliance programs across our client base.",
  },
  {
    slug: "senior-data-engineer",
    title: "Senior Data Engineer",
    team: "AI & Data",
    location: "Remote · Global",
    type: "Full-time",
    description:
      "Build streaming and batch data platforms on Databricks, Snowflake and open lakehouse stacks.",
  },
  {
    slug: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    team: "Product Engineering",
    location: "Remote · Global",
    type: "Full-time",
    description:
      "Ship premium web products with React, TypeScript and modern design systems.",
  },
  {
    slug: "devrel-lead",
    title: "Developer Relations Lead",
    team: "Marketing",
    location: "London",
    type: "Full-time",
    description:
      "Grow our engineering brand through content, talks and open-source contributions.",
  },
];

export interface Perk {
  title: string;
  description: string;
}

export const PERKS: Perk[] = [
  {
    title: "Remote-first",
    description:
      "Work from anywhere across our global hubs — with generous home office and coworking budgets.",
  },
  {
    title: "Learning stipend",
    description:
      "Annual budget for certifications, conferences, books and courses. Growth is a job requirement.",
  },
  {
    title: "Equity for everyone",
    description:
      "Every full-time engineer participates in the long-term success of the company.",
  },
  {
    title: "Serious engineering",
    description:
      "Senior peers, modern stack, real ownership. No ticket factories, no ceremony theatre.",
  },
  {
    title: "Wellness & family",
    description:
      "Comprehensive health cover, mental-wellness support and generous parental leave.",
  },
  {
    title: "20% innovation time",
    description:
      "Dedicated time each sprint for OSS, R&D and internal tools that make us better.",
  },
];
