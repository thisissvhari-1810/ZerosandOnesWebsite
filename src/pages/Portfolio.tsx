import { PageHeader } from "@/components/sections/PageHeader";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { CtaSection } from "@/components/sections/CtaSection";
import { useSeo } from "@/hooks/useSeo";

export default function Portfolio() {
  useSeo({
    title: "Portfolio",
    description:
      "Selected case studies across financial services, healthcare, retail, insurance, media and more.",
  });

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={
          <>
            Real outcomes for{" "}
            <span className="text-gradient">real teams</span>
          </>
        }
        description="A curated selection of the engagements we're proudest of — each one delivered with a senior team and a clear scorecard."
      />
      <PortfolioSection showAll />
      <TestimonialsCarousel />
      <CtaSection />
    </>
  );
}
