export interface PortfolioItem {
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  overview: string;
  cover: string;
  tags: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
  span?: "sm" | "md" | "lg";
}

const cover = (hue: number) =>
  `radial-gradient(120% 120% at 20% 10%, hsla(${hue}, 95%, 65%, 0.95) 0%, transparent 55%), ` +
  `radial-gradient(120% 120% at 80% 90%, hsla(${
    (hue + 60) % 360
  }, 95%, 55%, 0.85) 0%, transparent 60%), ` +
  `linear-gradient(135deg, hsl(${hue}, 60%, 20%), hsl(${
    (hue + 40) % 360
  }, 60%, 12%))`;

export const PORTFOLIO: PortfolioItem[] = [
  {
    slug: "atlas-bank-cloud",
    title: "Atlas Bank — Multi-Region Cloud Modernization",
    client: "Atlas Bank",
    industry: "Financial Services",
    summary:
      "Migrated 180+ workloads to a multi-region AWS landing zone with zero-downtime cutovers and SOC2-aligned guardrails.",
    overview:
      "We designed and executed a two-year modernization program: multi-account AWS landing zone, Terraform module library, service-catalog-driven onboarding, and a cutover playbook that migrated 180+ workloads with zero customer-facing downtime. Post-migration, we established a joint FinOps + SRE practice that reduced infrastructure spend by 42% while raising availability to 99.99%.",
    cover: cover(210),
    tags: ["AWS", "Landing Zone", "Terraform", "Zero-downtime"],
    stack: [
      "AWS",
      "Terraform",
      "EKS",
      "Aurora",
      "Kinesis",
      "GitHub Actions",
      "Datadog",
    ],
    metrics: [
      { label: "Workloads migrated", value: "180+" },
      { label: "Cost reduction", value: "42%" },
      { label: "Uptime", value: "99.99%" },
    ],
    span: "lg",
  },
  {
    slug: "helix-ai-copilot",
    title: "Helix Health — Clinical AI Copilot",
    client: "Helix Health",
    industry: "Healthcare",
    summary:
      "HIPAA-compliant clinical copilot powered by RAG over 4M medical documents with sub-second responses.",
    overview:
      "A production-grade RAG system indexed 4 million clinical documents behind a HIPAA-compliant retrieval pipeline. The copilot suggests care plans, summarizes records and answers clinician questions with citations — deflecting 62% of routine tickets and saving each clinician nine hours per week.",
    cover: cover(280),
    tags: ["OpenAI", "RAG", "HIPAA", "Python"],
    stack: ["OpenAI", "LangChain", "PostgreSQL", "pgvector", "Python", "AWS"],
    metrics: [
      { label: "Ticket deflection", value: "62%" },
      { label: "Time saved / clinician", value: "9 h/wk" },
      { label: "Docs indexed", value: "4M+" },
    ],
    span: "md",
  },
  {
    slug: "nova-retail-devops",
    title: "Nova Retail — Internal Developer Platform",
    client: "Nova Retail",
    industry: "E-commerce",
    summary:
      "Kubernetes-based internal developer platform enabling 10× deployment frequency and self-service environments.",
    overview:
      "Backed by ArgoCD, Backstage and a curated Terraform module library, our IDP let 40+ product teams provision environments in minutes and deploy 120+ times a day. Golden pipelines, policy gates and progressive delivery removed the release-day pager.",
    cover: cover(190),
    tags: ["Kubernetes", "ArgoCD", "GitHub Actions"],
    stack: ["Kubernetes", "ArgoCD", "Backstage", "Terraform", "GitHub Actions"],
    metrics: [
      { label: "Deploys / day", value: "120+" },
      { label: "Lead time", value: "-80%" },
      { label: "MTTR", value: "<5 min" },
    ],
    span: "md",
  },
  {
    slug: "quantum-data-lakehouse",
    title: "Quantum Insurance — Real-time Data Lakehouse",
    client: "Quantum Insurance",
    industry: "Insurance",
    summary:
      "Unified 20+ data sources into a real-time lakehouse enabling actuarial models and fraud detection at scale.",
    overview:
      "Kafka + Delta Lake + dbt-driven models, wired into a semantic layer and served through both BI and inference APIs. Fraud detection alone recovered $12M annually.",
    cover: cover(170),
    tags: ["Databricks", "dbt", "Kafka"],
    stack: ["Databricks", "Delta Lake", "Kafka", "dbt", "Airflow"],
    metrics: [
      { label: "Sources unified", value: "20+" },
      { label: "Query speedup", value: "8×" },
      { label: "Fraud caught", value: "$12M/yr" },
    ],
    span: "sm",
  },
  {
    slug: "orbit-security-soc",
    title: "Orbit Media — 24/7 Modern SOC",
    client: "Orbit Media",
    industry: "Media",
    summary:
      "Modern SOC with SIEM, SOAR and continuous compliance reducing MTTD to under 60 seconds.",
    overview:
      "Splunk + SOAR playbooks + a shift-left security program embedded in every engineering team. Continuous compliance mapping to SOC2 and ISO 27001 with executive-ready reporting.",
    cover: cover(260),
    tags: ["SIEM", "SOAR", "Zero-Trust"],
    stack: ["Splunk", "SOAR", "AWS", "GuardDuty", "OPA"],
    metrics: [
      { label: "MTTD", value: "<60s" },
      { label: "Alerts / day", value: "5,000+" },
      { label: "Compliance", value: "SOC2+ISO 27001" },
    ],
    span: "md",
  },
  {
    slug: "pulse-mobile-app",
    title: "Pulse Fitness — Mobile Product Rebuild",
    client: "Pulse Fitness",
    industry: "Health & Wellness",
    summary:
      "Rebuilt the flagship mobile experience with React Native and a serverless backend, tripling weekly engagement.",
    overview:
      "React Native front-end + serverless backend + a scalable design system. Shipped in five months with a rating jump from 3.4★ to 4.9★.",
    cover: cover(220),
    tags: ["React Native", "Serverless", "Design System"],
    stack: ["React Native", "AWS Lambda", "DynamoDB", "AppSync"],
    metrics: [
      { label: "WAU growth", value: "3×" },
      { label: "App rating", value: "4.9★" },
      { label: "Time to market", value: "5 months" },
    ],
    span: "sm",
  },
];
