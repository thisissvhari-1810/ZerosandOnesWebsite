import {
  Cloud,
  GitBranch,
  Brain,
  Database,
  ShieldCheck,
  Code2,
  MoveRight,
  Wrench,
  Sparkles,
  Compass,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  features: string[];
  outcomes: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "ai-automation",
    title: "AI & Automation",
    tagline: "Intelligence woven into every workflow.",
    description:
      "Custom LLM applications, RAG, agentic workflows and intelligent automation. Turn data and processes into 24/7 digital co-workers.",
    icon: Brain,
    accent: "from-electric-500 to-accent-magenta",
    features: [
      "Generative AI & LLM apps",
      "RAG & knowledge assistants",
      "Agentic workflows",
      "Process & document automation",
    ],
    outcomes: [
      "60% support ticket deflection",
      "5× analyst productivity",
      "24/7 intelligent operations",
    ],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    tagline: "Elastic infrastructure engineered for scale.",
    description:
      "Architect, deploy and operate cloud-native platforms on AWS, Azure and GCP. From landing zones to multi-region resilience — we make cloud a competitive advantage.",
    icon: Cloud,
    accent: "from-neon-400 to-cyan-glow",
    features: [
      "Cloud strategy & architecture",
      "Landing zones & governance",
      "Serverless & container platforms",
      "FinOps & cost optimization",
    ],
    outcomes: [
      "40% lower infrastructure cost",
      "99.99% platform availability",
      "3× faster environment provisioning",
    ],
  },
  {
    slug: "devops",
    title: "DevOps",
    tagline: "Ship faster, safer, every single day.",
    description:
      "End-to-end CI/CD, GitOps, IaC and platform engineering. We embed automation into every layer so your teams deliver value continuously.",
    icon: GitBranch,
    accent: "from-cyan-glow to-neon-400",
    features: [
      "CI/CD & GitOps pipelines",
      "Infrastructure as Code (Terraform)",
      "Kubernetes & service mesh",
      "SRE & observability",
    ],
    outcomes: [
      "10× deployment frequency",
      "80% faster lead time",
      "<5 min MTTR",
    ],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    tagline: "Zero-trust security, everywhere.",
    description:
      "Defend, detect and respond with modern zero-trust architectures, cloud security posture management and 24/7 monitoring.",
    icon: ShieldCheck,
    accent: "from-neon-500 to-cyan-glow",
    features: [
      "Zero-trust architecture",
      "Cloud security posture (CSPM)",
      "SIEM, SOAR & 24/7 SOC",
      "Compliance (SOC2, ISO, HIPAA)",
    ],
    outcomes: [
      "Continuous compliance",
      "Sub-minute threat detection",
      "Reduced attack surface",
    ],
  },
  {
    slug: "data-engineering",
    title: "Data Engineering",
    tagline: "From raw events to real-time decisions.",
    description:
      "Design lakehouses, streaming pipelines and analytics platforms that turn operational data into a strategic asset.",
    icon: Database,
    accent: "from-neon-400 to-electric-500",
    features: [
      "Lakehouse & warehouse design",
      "Streaming & real-time analytics",
      "dbt & data modelling",
      "MLOps & feature stores",
    ],
    outcomes: [
      "Real-time analytics at scale",
      "70% faster reporting cycles",
      "Single source of truth",
    ],
  },
  {
    slug: "application-development",
    title: "Application Development",
    tagline: "Products people love, engineered to last.",
    description:
      "Design and build web, mobile and API-first products with a premium engineering culture and modern stacks.",
    icon: Code2,
    accent: "from-cyan-glow to-electric-500",
    features: [
      "Web & mobile product design",
      "API-first architecture",
      "React, Node.js, Python",
      "Design systems & accessibility",
    ],
    outcomes: [
      "Best-in-class user experience",
      "Faster time-to-market",
      "Scalable, testable codebase",
    ],
  },
  {
    slug: "cloud-migration",
    title: "Cloud Migration",
    tagline: "Modernize with confidence, not chaos.",
    description:
      "Assessment, replatforming, refactoring and cutover — we migrate workloads with zero-drama methodology and clear business outcomes.",
    icon: MoveRight,
    accent: "from-neon-400 to-neon-600",
    features: [
      "Portfolio assessment & 7Rs",
      "Replatform & refactor",
      "Data migration & cutover",
      "Post-migration optimization",
    ],
    outcomes: [
      "50% infra cost reduction",
      "Zero-downtime cutovers",
      "Legacy debt retired",
    ],
  },
  {
    slug: "managed-services",
    title: "Managed IT Services",
    tagline: "24/7 engineering, so you can focus on growth.",
    description:
      "Fully managed cloud, DevOps, data and security operations backed by SLAs, senior engineers and modern observability.",
    icon: Wrench,
    accent: "from-electric-500 to-neon-500",
    features: [
      "24/7 NOC & SRE",
      "Proactive monitoring",
      "Patch, backup & DR",
      "Monthly executive reviews",
    ],
    outcomes: [
      "99.99% SLA-backed uptime",
      "Predictable OPEX",
      "Senior expertise on tap",
    ],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    tagline: "Rewire the business — outcomes, not slideware.",
    description:
      "Executive-grade transformation programs that turn strategy into shipped software. Operating models, target architecture and change all wired together.",
    icon: Sparkles,
    accent: "from-accent-magenta to-electric-500",
    features: [
      "Digital operating model",
      "Target architecture blueprint",
      "Product & platform teams",
      "Change & capability uplift",
    ],
    outcomes: [
      "New revenue streams unlocked",
      "3× faster time-to-market",
      "Culture of continuous delivery",
    ],
  },
  {
    slug: "consulting",
    title: "Consulting",
    tagline: "Senior operators on tap for your hardest bets.",
    description:
      "Advisory from principals who have run engineering, cloud and AI at scale. Short, sharp engagements that unblock big decisions.",
    icon: Compass,
    accent: "from-cyan-glow to-accent-magenta",
    features: [
      "Tech strategy & due diligence",
      "Cloud & AI readiness",
      "Org & platform reviews",
      "M&A technical integration",
    ],
    outcomes: [
      "Board-ready recommendations",
      "De-risked investments",
      "Actionable 90-day plans",
    ],
  },
];
