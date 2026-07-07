import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { LinkButton } from "@/components/ui/Button";
import { MagneticButton } from "@/animations/MagneticButton";
import { TiltCard } from "@/animations/TiltCard";
import { INDUSTRIES } from "@/data/solutions";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { CtaSection } from "@/components/sections/CtaSection";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useSeo } from "@/hooks/useSeo";

export default function Industries() {
  useSeo({
    title: "Industries",
    description:
      "Domain playbooks for financial services, healthcare, retail, manufacturing, SaaS, education, travel and energy.",
  });

  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title={
          <>
            Playbooks built around the{" "}
            <span className="text-gradient">industries we know deeply</span>
          </>
        }
        description="Every industry has its own regulations, patterns and pitfalls. We bring the playbook so you don't rediscover them the hard way."
        actions={
          <MagneticButton>
            <LinkButton
              to="/contact"
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
            >
              Discuss your industry
            </LinkButton>
          </MagneticButton>
        }
      />

      <section className="py-8 md:py-12">
        <div className="container-wide">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {INDUSTRIES.map((s) => (
              <motion.article
                key={s.slug}
                variants={fadeUp}
                className="group"
              >
                <TiltCard intensity={5}>
                  <div className="light-sweep relative overflow-hidden rounded-3xl glass border-gradient p-7 h-full transition-shadow duration-500 hover:shadow-neon">
                    <div
                      className={cn(
                        "pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl bg-gradient-to-br opacity-30",
                        s.accent
                      )}
                    />
                    <div
                      className={cn(
                        "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-neon",
                        s.accent
                      )}
                    >
                      <s.icon className="h-5 w-5" />
                    </div>
                    <p className="mt-5 text-xs uppercase tracking-widest text-neon-200">
                      {s.name}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-white">
                      {s.headline}
                    </h3>
                    <p className="mt-3 text-sm text-white/60 leading-relaxed">
                      {s.description}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-white/75">
                      {s.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 text-neon-300" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <TestimonialsCarousel />
      <CtaSection />
    </>
  );
}
