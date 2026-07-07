import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { LinkButton } from "@/components/ui/Button";
import { MagneticButton } from "@/animations/MagneticButton";
import { SolutionsGrid } from "@/components/sections/SolutionsGrid";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { useSeo } from "@/hooks/useSeo";

export default function Solutions() {
  useSeo({
    title: "Solutions",
    description:
      "Enterprise Solutions, Cloud Native, AI Agents, MLOps, Data & Analytics, CI/CD, Infrastructure Automation, Microservices and Cloud Security.",
  });

  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title={
          <>
            Composable capabilities for{" "}
            <span className="text-gradient">every layer of the stack</span>
          </>
        }
        description="Nine solution areas packaged as reusable, opinionated playbooks — so you get a running start, not a blank slate."
        actions={
          <MagneticButton>
            <LinkButton
              to="/contact"
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
            >
              Discuss your project
            </LinkButton>
          </MagneticButton>
        }
      />

      <SolutionsGrid compact />
      <ProcessSection />
      <CtaSection />
    </>
  );
}
