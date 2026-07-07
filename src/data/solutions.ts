import {
  Building2,
  CloudCog,
  Bot,
  BrainCircuit,
  BarChart3,
  GitMerge,
  Cog,
  Boxes,
  Lock,
  type LucideIcon,
} from "lucide-react";

export interface Solution {
  slug: string;
  name: string;
  headline: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  highlights: string[];
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "enterprise-solutions",
    name: "Enterprise Solutions",
    headline: "Platforms that carry the whole business",
    description:
      "End-to-end enterprise platforms — from core modernization to composable service ecosystems — engineered to scale with confidence.",
    icon: Building2,
    accent: "from-neon-400 to-cyan-glow",
    highlights: [
      "Core modernization",
      "API & event platforms",
      "Enterprise integration",
    ],
  },
  {
    slug: "cloud-native",
    name: "Cloud Native",
    headline: "Kubernetes-first, resilient by design",
    description:
      "Containerized microservices, service mesh and multi-region resilience. Cloud-native done properly, not just checkbox-deep.",
    icon: CloudCog,
    accent: "from-cyan-glow to-neon-500",
    highlights: [
      "Kubernetes at scale",
      "Service mesh (Istio, Linkerd)",
      "Multi-region resilience",
    ],
  },
  {
    slug: "ai-agents",
    name: "AI Agents",
    headline: "Autonomous, tool-using AI in production",
    description:
      "Agentic systems with the right tools, memory and guardrails — deployed against real customer workflows and measured against real outcomes.",
    icon: Bot,
    accent: "from-electric-500 to-accent-magenta",
    highlights: [
      "Multi-agent orchestration",
      "Tools, memory & guardrails",
      "Eval-driven iteration",
    ],
  },
  {
    slug: "mlops",
    name: "MLOps",
    headline: "Every model, from notebook to production",
    description:
      "Feature stores, training pipelines, model registries and evals — a full MLOps stack that turns experiments into reliable products.",
    icon: BrainCircuit,
    accent: "from-accent-magenta to-electric-500",
    highlights: [
      "Feature stores",
      "Model registry & CI",
      "Continuous evaluation",
    ],
  },
  {
    slug: "data-analytics",
    name: "Data & Analytics",
    headline: "Turn data into product surface area",
    description:
      "Lakehouse foundations, semantic models and analytics products your business teams actually use — not just dashboards nobody opens.",
    icon: BarChart3,
    accent: "from-neon-400 to-electric-500",
    highlights: [
      "Lakehouse foundations",
      "Semantic layer & dbt",
      "Reverse ETL & activation",
    ],
  },
  {
    slug: "ci-cd",
    name: "CI/CD",
    headline: "Zero-drama pipelines, every commit",
    description:
      "Golden pipelines, automated policy gates and deployment strategies (blue/green, canary, progressive) as first-class citizens.",
    icon: GitMerge,
    accent: "from-cyan-glow to-neon-400",
    highlights: [
      "Golden pipelines",
      "Policy-as-code (OPA)",
      "Progressive delivery",
    ],
  },
  {
    slug: "infrastructure-automation",
    name: "Infrastructure Automation",
    headline: "IaC first. Every environment, from a repo.",
    description:
      "Terraform modules, Crossplane, Ansible — reusable infrastructure as software, versioned and reviewed like application code.",
    icon: Cog,
    accent: "from-neon-500 to-cyan-glow",
    highlights: [
      "Terraform module libraries",
      "Crossplane & GitOps",
      "Golden environments",
    ],
  },
  {
    slug: "microservices",
    name: "Microservices",
    headline: "Composable services that never turn to mud",
    description:
      "Domain-driven microservices with contract-first APIs, event choreography and observable interfaces. Modular by design, not by accident.",
    icon: Boxes,
    accent: "from-neon-400 to-electric-500",
    highlights: [
      "Domain-driven design",
      "Contract-first APIs",
      "Event choreography",
    ],
  },
  {
    slug: "cloud-security",
    name: "Cloud Security",
    headline: "Zero-trust, cloud-native, always-on",
    description:
      "CSPM, workload protection, IAM & secrets, plus a modern SOC — layered defense that scales with your cloud footprint.",
    icon: Lock,
    accent: "from-neon-500 to-accent-magenta",
    highlights: [
      "CSPM & CWPP",
      "IAM & secrets",
      "SIEM + SOAR",
    ],
  },
];

/* Industry-specific playbooks (used on /industries) */
import {
  Banknote,
  HeartPulse,
  ShoppingBag,
  Factory,
  Cpu,
  GraduationCap,
  Plane,
  Zap,
} from "lucide-react";

export interface Industry {
  slug: string;
  name: string;
  headline: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  highlights: string[];
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "financial-services",
    name: "Financial Services",
    headline: "Compliant cloud, AI-driven risk & fraud",
    description:
      "Modernize core banking, launch AI-powered fraud detection and meet the strictest regulatory bars — PCI DSS to SOC 2.",
    icon: Banknote,
    accent: "from-neon-400 to-cyan-glow",
    highlights: [
      "Core banking modernization",
      "Real-time fraud & AML",
      "Zero-trust security",
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    headline: "HIPAA-grade AI, data & patient experience",
    description:
      "Clinical copilots, unified patient data and HIPAA-compliant experiences that improve outcomes and reduce clinician burnout.",
    icon: HeartPulse,
    accent: "from-electric-500 to-accent-magenta",
    highlights: [
      "Clinical AI copilots",
      "Interoperability (FHIR/HL7)",
      "HIPAA & HITRUST",
    ],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    headline: "Composable commerce at planetary scale",
    description:
      "Headless storefronts, real-time personalization and internal developer platforms that stay calm on peak days.",
    icon: ShoppingBag,
    accent: "from-cyan-glow to-neon-500",
    highlights: [
      "Headless commerce",
      "Personalization & search",
      "Peak-ready platforms",
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Supply Chain",
    headline: "IIoT, digital twins & predictive operations",
    description:
      "Connect the shop floor to the cloud, run digital twins and predict failures before they cost you a shift.",
    icon: Factory,
    accent: "from-neon-500 to-electric-500",
    highlights: ["IIoT & edge", "Digital twins", "Predictive maintenance"],
  },
  {
    slug: "saas-technology",
    name: "SaaS & Technology",
    headline: "Scale-up engineering, on-demand",
    description:
      "Augment your team with senior platform, DevOps and AI engineers to ship the next phase of your roadmap.",
    icon: Cpu,
    accent: "from-cyan-glow to-electric-500",
    highlights: [
      "Platform engineering",
      "AI product features",
      "SRE & scale-up",
    ],
  },
  {
    slug: "education",
    name: "Education & Public Sector",
    headline: "Secure, accessible digital services",
    description:
      "Modernize legacy systems, deliver accessible services and adopt AI safely — with strong compliance and human-centered design.",
    icon: GraduationCap,
    accent: "from-neon-400 to-electric-500",
    highlights: [
      "Legacy modernization",
      "Accessible design",
      "Responsible AI",
    ],
  },
  {
    slug: "travel-hospitality",
    name: "Travel & Hospitality",
    headline: "Personalized, always-on guest experiences",
    description:
      "Modern reservations, loyalty and personalization powered by real-time data and AI — engineered for peak season.",
    icon: Plane,
    accent: "from-electric-500 to-cyan-glow",
    highlights: [
      "Realtime personalization",
      "Loyalty platforms",
      "AI concierge",
    ],
  },
  {
    slug: "energy-utilities",
    name: "Energy & Utilities",
    headline: "Smart grids, digital operations, ESG data",
    description:
      "Grid intelligence, asset optimization and ESG reporting on modern data & IoT platforms.",
    icon: Zap,
    accent: "from-neon-500 to-cyan-glow",
    highlights: ["Grid intelligence", "Asset optimization", "ESG reporting"],
  },
];
