import {
  Compass,
  PenTool,
  Code,
  Rocket,
  LineChart,
  type LucideIcon,
} from "lucide-react";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  bullets: string[];
}

export const PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "Short, sharp discovery — align on outcomes, constraints and non-negotiables in weeks, not months.",
    icon: Compass,
    accent: "from-neon-400 to-cyan-glow",
    bullets: ["Outcome workshops", "Tech deep-dives", "Written strategy"],
  },
  {
    step: "02",
    title: "Design",
    description:
      "Architecture, UX and delivery plan — designed for change, secured by default, ready for scale.",
    icon: PenTool,
    accent: "from-cyan-glow to-electric-500",
    bullets: ["Target architecture", "UX & design system", "Sequencing plan"],
  },
  {
    step: "03",
    title: "Develop",
    description:
      "Small senior squads shipping in weekly increments — with transparent scorecards, not story-point theatre.",
    icon: Code,
    accent: "from-electric-500 to-accent-magenta",
    bullets: [
      "Weekly demos",
      "Contract-first APIs",
      "Automated testing & policy",
    ],
  },
  {
    step: "04",
    title: "Deploy",
    description:
      "Zero-drama releases with progressive delivery, feature flags and observability wired in from day one.",
    icon: Rocket,
    accent: "from-accent-magenta to-neon-500",
    bullets: ["Blue/green & canary", "Feature flags", "Full observability"],
  },
  {
    step: "05",
    title: "Optimize",
    description:
      "Measure, tune, harden — from FinOps to SRE. Continuous improvement as a first-class deliverable.",
    icon: LineChart,
    accent: "from-neon-500 to-cyan-glow",
    bullets: ["FinOps & SRE", "AI-assisted operations", "Quarterly reviews"],
  },
];
