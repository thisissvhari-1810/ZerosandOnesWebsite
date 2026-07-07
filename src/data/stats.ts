export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export const STATS: Stat[] = [
  { label: "Years engineering at scale", value: 10, suffix: "+" },
  { label: "Projects shipped", value: 250, suffix: "+" },
  { label: "Enterprise clients", value: 120, suffix: "+" },
  { label: "Delivery success rate", value: 98, suffix: "%" },
];

export interface Value {
  title: string;
  description: string;
}

export const WHY_US: Value[] = [
  {
    title: "24/7 support",
    description:
      "Follow-the-sun global operations with SLA-backed response times and executive reporting.",
  },
  {
    title: "Certified engineers",
    description:
      "AWS, Azure, GCP, Kubernetes and security-certified specialists — depth on every engagement.",
  },
  {
    title: "Agile delivery",
    description:
      "Small senior squads, weekly demos and honest scorecards. Ceremony where it earns its keep.",
  },
  {
    title: "Cloud experts",
    description:
      "12,000+ workloads under management across AWS, Azure and GCP with proven landing-zone playbooks.",
  },
  {
    title: "AI specialists",
    description:
      "40+ production LLM apps shipped. RAG, agents, evals and guardrails — done right.",
  },
  {
    title: "Global clients",
    description:
      "Trusted from Fortune 500s to fast-scaling startups across three continents.",
  },
];
