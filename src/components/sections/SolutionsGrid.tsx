import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TiltCard } from "@/animations/TiltCard";
import { SOLUTIONS } from "@/data/solutions";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Props {
  compact?: boolean;
}

export function SolutionsGrid({ compact = false }: Props) {
  return (
    <section id="solutions" className="relative py-24 md:py-32">
      <div className="container-wide">
        {!compact && (
          <SectionTitle
            eyebrow="Solutions"
            title={
              <>
                Composable capabilities for{" "}
                <span className="text-gradient">every layer of the stack</span>
              </>
            }
            description="Nine solution areas — from enterprise platforms to AI agents — packaged as reusable playbooks that get you moving fast."
          />
        )}

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {SOLUTIONS.map((s) => (
            <motion.article
              key={s.slug}
              variants={fadeUp}
              className="group"
            >
              <TiltCard intensity={6}>
                <div className="light-sweep relative overflow-hidden rounded-3xl glass border-gradient p-7 transition-shadow duration-500 hover:shadow-neon">
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
  );
}
