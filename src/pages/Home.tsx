import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechOrbit } from "@/components/sections/TechOrbit";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { AwardsStrip } from "@/components/sections/AwardsStrip";
import { CtaSection } from "@/components/sections/CtaSection";
import { useSeo } from "@/hooks/useSeo";

export default function Home() {
  useSeo({
    title: "Premium IT Solutions & 3D Engineering",
    description:
      "ZerosAndOnes — AI, cloud, DevOps, data engineering and cyber security engineered by senior teams for ambitious enterprises.",
  });

  return (
    <>
      <Hero />
      <TrustedBy />
      <ServicesSection />
      <TechOrbit />
      <ProcessSection />
      <PortfolioSection />
      <WhyChooseUs />
      <TestimonialsCarousel />
      <AwardsStrip />
      <CtaSection />
    </>
  );
}
