import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Sparkles, Target } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { LinkButton } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { TiltCard } from "@/animations/TiltCard";
import { MagneticButton } from "@/animations/MagneticButton";
import { STATS, WHY_US } from "@/data/stats";
import { TEAM, MILESTONES } from "@/data/team";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useSeo } from "@/hooks/useSeo";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProcessSection } from "@/components/sections/ProcessSection";

const FloatingCubesCanvas = lazy(() =>
  import("@/three/FloatingCubes").then((m) => ({
    default: m.FloatingCubesCanvas,
  }))
);

const pillars = [
  {
    icon: Compass,
    title: "Our mission",
    body: "Give ambitious teams the engineering leverage of a top-tier product company — as a service.",
  },
  {
    icon: Target,
    title: "Our vision",
    body: "A world where every enterprise operates with the software craftsmanship of the most admired tech companies.",
  },
  {
    icon: Sparkles,
    title: "Our promise",
    body: "Senior teams. Measurable outcomes. No consulting theatre. Ever.",
  },
];

export default function About() {
  useSeo({
    title: "About us",
    description:
      "A senior-first IT solutions company on a mission to give every enterprise the engineering leverage of a top-tier product company.",
  });

  return (
    <>
      <PageHeader
        eyebrow="About ZerosAndOnes"
        title={
          <>
            Engineering craftsmanship,{" "}
            <span className="text-gradient">delivered as an outcome</span>
          </>
        }
        description="A 380-person engineering studio helping enterprises design, build and operate world-class digital platforms."
        actions={
          <MagneticButton>
            <LinkButton
              to="/careers"
              variant="secondary"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Join the team
            </LinkButton>
          </MagneticButton>
        }
      />

      {/* 3D floating cubes intro */}
      <section className="py-8">
        <div className="container-wide grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-neon-200">
              What we're really about
            </p>
            <h2 className="mt-3 headline text-white text-3xl md:text-5xl">
              A studio-first team, built for{" "}
              <span className="text-gradient">deep engineering</span>
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed">
              We are not a body shop. We're a small number of senior teams that
              take on hard, meaningful problems — cloud modernization, AI
              products, platform engineering — and see them through to
              production, at scale, with pride.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl glass border-gradient p-5"
                >
                  <AnimatedCounter
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                    className="font-display text-3xl md:text-4xl font-semibold text-gradient"
                  />
                  <p className="mt-2 text-xs uppercase tracking-widest text-white/50">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[420px] md:h-[520px]">
            <div className="absolute inset-0 rounded-3xl glass border-gradient overflow-hidden">
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center text-white/40">
                    Loading scene…
                  </div>
                }
              >
                <FloatingCubesCanvas />
              </Suspense>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/90 to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-widest text-white/80">
                Interactive · move your mouse
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 md:py-20">
        <div className="container-wide grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <TiltCard intensity={5}>
                <div className="relative overflow-hidden rounded-2xl glass border-gradient p-7">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-500 via-cyan-glow to-electric-500 text-white shadow-neon">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container-wide grid gap-14 lg:grid-cols-2 items-start">
          <SectionTitle
            align="left"
            eyebrow="Our story"
            title={
              <>
                From a boutique cloud team to a{" "}
                <span className="text-gradient">global engineering studio</span>
              </>
            }
            description="What started in Bangalore in 2015 as a small team of AWS specialists is now a 380-person operation with offices across three continents. Same principles, wider reach."
            className="mx-0"
          />
          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-neon-500 via-cyan-glow to-electric-500" />
            <motion.ol
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-8"
            >
              {MILESTONES.map((m) => (
                <motion.li
                  key={m.year}
                  variants={fadeUp}
                  className="relative pl-14"
                >
                  <span className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full glass border-gradient text-xs font-semibold text-neon-200">
                    {m.year.slice(-2)}
                  </span>
                  <p className="text-xs uppercase tracking-widest text-neon-200">
                    {m.year}
                  </p>
                  <h4 className="mt-1 font-display text-lg font-semibold text-white">
                    {m.title}
                  </h4>
                  <p className="mt-1 text-sm text-white/60 leading-relaxed">
                    {m.description}
                  </p>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <SectionTitle
            eyebrow="How we operate"
            title={
              <>
                Principles that shape{" "}
                <span className="text-gradient">every engagement</span>
              </>
            }
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {WHY_US.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="rounded-2xl glass border-gradient p-6"
              >
                <span className="text-xs uppercase tracking-widest text-neon-200">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ProcessSection />

      {/* Leadership */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <SectionTitle
            eyebrow="Leadership"
            title={
              <>
                Meet the{" "}
                <span className="text-gradient">people behind the work</span>
              </>
            }
            description="A leadership team with deep operator DNA — every one of us has shipped in the trenches."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {TEAM.map((p) => (
              <motion.div key={p.name} variants={fadeUp} className="group">
                <TiltCard intensity={5}>
                  <div className="relative overflow-hidden rounded-2xl glass border-gradient p-6 text-center transition-shadow duration-500 hover:shadow-neon">
                    <div
                      className={cn(
                        "mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-xl font-semibold text-white shadow-neon",
                        p.accent
                      )}
                    >
                      {p.initials}
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-white">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-neon-200">
                      {p.role}
                    </p>
                    <p className="mt-3 text-sm text-white/60 leading-relaxed">
                      {p.bio}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
