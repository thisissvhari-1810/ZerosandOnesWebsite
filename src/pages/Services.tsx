import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { LinkButton } from "@/components/ui/Button";
import { MagneticButton } from "@/animations/MagneticButton";
import { TiltCard } from "@/animations/TiltCard";
import { SERVICES } from "@/data/services";
import { TechnologiesSection } from "@/components/sections/TechnologiesSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useSeo } from "@/hooks/useSeo";

export default function Services() {
  useSeo({
    title: "Services",
    description:
      "AI & Automation, Cloud, DevOps, Cyber Security, Data Engineering, Application Development, Migration, Managed Services, Digital Transformation and Consulting.",
  });

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Ten deep practices.{" "}
            <span className="text-gradient">One senior team.</span>
          </>
        }
        description="From cloud landing zones to production LLM apps — an end-to-end capability set delivered as measurable outcomes, not decks."
        actions={
          <MagneticButton>
            <LinkButton
              to="/contact"
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
            >
              Talk to an engineer
            </LinkButton>
          </MagneticButton>
        }
      />

      <section className="py-8 md:py-12">
        <div className="container-wide space-y-16 md:space-y-24">
          {SERVICES.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <motion.article
                key={s.slug}
                id={s.slug}
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className={cn(
                  "grid gap-10 lg:grid-cols-2 items-center scroll-mt-28",
                  flip && "lg:[&>div:first-child]:order-2"
                )}
              >
                <motion.div variants={fadeUp}>
                  <span className="text-xs uppercase tracking-widest text-neon-200">
                    {`0${i + 1}`.slice(-2)} · {s.title}
                  </span>
                  <h2 className="mt-3 headline text-white text-3xl md:text-5xl">
                    {s.tagline}
                  </h2>
                  <p className="mt-4 text-white/70 leading-relaxed">
                    {s.description}
                  </p>

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-white/75"
                      >
                        <Check className="mt-0.5 h-4 w-4 text-neon-300" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <MagneticButton strength={0.25}>
                      <LinkButton
                        to="/contact"
                        variant="outline"
                        rightIcon={<ArrowUpRight className="h-4 w-4" />}
                      >
                        Scope an engagement
                      </LinkButton>
                    </MagneticButton>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <TiltCard intensity={6}>
                    <div className="relative overflow-hidden rounded-3xl glass-strong border-gradient p-8 md:p-10">
                      <div className="pointer-events-none absolute inset-0 opacity-70">
                        <div
                          className={cn(
                            "absolute -top-24 -right-24 h-60 w-60 rounded-full blur-3xl bg-gradient-to-br opacity-40",
                            s.accent
                          )}
                        />
                      </div>
                      <div className="relative">
                        <div
                          className={cn(
                            "inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-neon",
                            s.accent
                          )}
                        >
                          <s.icon className="h-6 w-6" />
                        </div>
                        <p className="mt-6 text-xs uppercase tracking-widest text-neon-200">
                          Outcomes we deliver
                        </p>
                        <ul className="mt-4 space-y-3">
                          {s.outcomes.map((o) => (
                            <li
                              key={o}
                              className="flex items-center gap-3 rounded-xl glass px-4 py-3 text-sm text-white"
                            >
                              <span
                                className={cn(
                                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white text-[10px] font-semibold bg-gradient-to-br",
                                  s.accent
                                )}
                              >
                                <Check className="h-3.5 w-3.5" />
                              </span>
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <TechnologiesSection />
      <ProcessSection />
      <CtaSection />
    </>
  );
}
