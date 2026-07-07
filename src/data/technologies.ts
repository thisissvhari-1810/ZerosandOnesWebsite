export type TechCategory =
  | "Cloud"
  | "Container"
  | "IaC"
  | "CI/CD"
  | "Language"
  | "Framework"
  | "AI"
  | "Database"
  | "Streaming"
  | "SCM";

export interface Technology {
  name: string;
  category: TechCategory;
  color: string;
  initials: string;
}

export const TECHNOLOGIES: Technology[] = [
  { name: "AWS", category: "Cloud", color: "#ff9900", initials: "AWS" },
  { name: "Azure", category: "Cloud", color: "#0089d6", initials: "AZ" },
  { name: "Google Cloud", category: "Cloud", color: "#4285f4", initials: "GC" },
  { name: "Docker", category: "Container", color: "#2496ed", initials: "DK" },
  {
    name: "Kubernetes",
    category: "Container",
    color: "#326ce5",
    initials: "K8",
  },
  { name: "Terraform", category: "IaC", color: "#7c3aed", initials: "TF" },
  { name: "Ansible", category: "IaC", color: "#ee0000", initials: "AN" },
  { name: "GitHub", category: "SCM", color: "#e6ecf5", initials: "GH" },
  {
    name: "GitHub Actions",
    category: "CI/CD",
    color: "#2088ff",
    initials: "GA",
  },
  {
    name: "Azure DevOps",
    category: "CI/CD",
    color: "#0078d4",
    initials: "AD",
  },
  { name: "Jenkins", category: "CI/CD", color: "#d33833", initials: "JN" },
  { name: "OpenAI", category: "AI", color: "#10a37f", initials: "AI" },
  { name: "LangChain", category: "AI", color: "#1c3d5a", initials: "LC" },
  { name: "Python", category: "Language", color: "#3776ab", initials: "PY" },
  { name: "Node.js", category: "Language", color: "#68a063", initials: "ND" },
  { name: "React", category: "Framework", color: "#61dafb", initials: "RC" },
  { name: "Angular", category: "Framework", color: "#dd0031", initials: "NG" },
  { name: "Next.js", category: "Framework", color: "#e6ecf5", initials: "NX" },
  {
    name: "PostgreSQL",
    category: "Database",
    color: "#4169e1",
    initials: "PG",
  },
  { name: "MongoDB", category: "Database", color: "#47a248", initials: "MG" },
  { name: "Redis", category: "Database", color: "#dc382d", initials: "RD" },
  { name: "Kafka", category: "Streaming", color: "#d3d3d3", initials: "KF" },
];
