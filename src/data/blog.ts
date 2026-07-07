export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  accent: string;
}

export const POSTS: BlogPost[] = [
  {
    slug: "landing-zone-2026",
    title: "The 2026 AWS Landing Zone: patterns that actually scale",
    excerpt:
      "Multi-account, multi-region, guardrails-as-code. A field guide to landing zones that survive contact with real product teams.",
    category: "Cloud",
    author: "Julian Wexler",
    date: "2026-06-24",
    readingTime: "8 min read",
    accent: "from-neon-400 to-accent-cyan",
  },
  {
    slug: "rag-in-production",
    title: "RAG in production: 12 lessons from shipping 40+ LLM apps",
    excerpt:
      "Chunking, retrievers, evals, guardrails and cost. The hard-won principles that separate demos from durable AI products.",
    category: "AI & Data",
    author: "Mei-Lin Zhao",
    date: "2026-06-11",
    readingTime: "11 min read",
    accent: "from-accent-purple to-accent-pink",
  },
  {
    slug: "platform-engineering-scorecard",
    title: "A platform-engineering scorecard your CFO will love",
    excerpt:
      "How to quantify the ROI of your internal developer platform in language the finance team can act on.",
    category: "DevOps",
    author: "Anaya Kapoor",
    date: "2026-05-30",
    readingTime: "6 min read",
    accent: "from-accent-cyan to-neon-500",
  },
  {
    slug: "zero-trust-blueprint",
    title: "A pragmatic zero-trust blueprint for mid-market",
    excerpt:
      "You don't need a $10M budget. A step-by-step blueprint for adopting zero-trust with the tools you already own.",
    category: "Security",
    author: "Diego Fernandes",
    date: "2026-05-18",
    readingTime: "9 min read",
    accent: "from-neon-500 to-accent-purple",
  },
  {
    slug: "lakehouse-vs-warehouse",
    title: "Lakehouse vs warehouse: choosing in 2026",
    excerpt:
      "The lines are blurred, but the choice still matters. A decision framework for your next data platform.",
    category: "AI & Data",
    author: "Mei-Lin Zhao",
    date: "2026-05-04",
    readingTime: "7 min read",
    accent: "from-neon-400 to-accent-purple",
  },
  {
    slug: "product-design-system",
    title: "Design systems that engineers actually use",
    excerpt:
      "Tokens, components, docs and governance — the moving parts of a design system your team will adopt willingly.",
    category: "Product",
    author: "Ethan Brooks",
    date: "2026-04-22",
    readingTime: "5 min read",
    accent: "from-accent-cyan to-accent-purple",
  },
];
