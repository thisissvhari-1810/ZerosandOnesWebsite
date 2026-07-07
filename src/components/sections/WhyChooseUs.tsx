import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { TiltCard } from "@/animations/TiltCard";
import { STATS, WHY_US } from "@/data/stats";
import { fadeUp, stagger } from "@/lib/motion";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 h-72 w-[600px] bg-gradient-radial from-electric-500/[0.1] via-transparent to-transparent" />
      </div>

      <div className="container-wide">
        <SectionTitle
          eyebrow="Why ZerosAndOnes"
          title={
            <>
              Senior teams.{" "}
              <span className="text-gradient">Real outcomes.</span> No theatre.
            </>
          }
          description="We're proud of the numbers behind the promise — because delivery is what actually matters."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-4 grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl glass border-gradient p-6 md:p-8 text-center"
            >
              <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-neon-500/10 blur-3xl" />
              <div className="relative">
                <AnimatedCounter
                  value={s.value}
                  decimals={s.decimals ?? 0}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  className="font-display text-4xl md:text-5xl font-semibold text-gradient"
                />
                <p className="mt-3 text-sm md:text-base text-white/60">
                  {s.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {WHY_US.map((v, i) => (
            <motion.div key={v.title} variants={fadeUp} className="group">
              <TiltCard intensity={4}>
                <div className="light-sweep relative overflow-hidden rounded-2xl glass border-gradient p-6 transition-all duration-500 hover:shadow-neon">
                  <span className="text-xs uppercase tracking-widest text-neon-200">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-white">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
