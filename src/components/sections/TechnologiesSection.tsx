import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TECHNOLOGIES } from "@/data/technologies";
import { fadeUp, stagger } from "@/lib/motion";

export function TechnologiesSection() {
  return (
    <section id="technologies" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-24 h-96 bg-gradient-radial from-neon-500/[0.08] via-transparent to-transparent" />
      </div>
      <div className="container-wide">
        <SectionTitle
          eyebrow="Our stack"
          title={
            <>
              Battle-tested tools,{" "}
              <span className="text-gradient">wielded by experts</span>
            </>
          }
          description="Deeply certified across the platforms that matter, pragmatic about picking the right tool for the job."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
        >
          {TECHNOLOGIES.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -6, rotateY: 8 }}
              style={{ transformStyle: "preserve-3d", perspective: 800 }}
              className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl glass border-gradient p-5 transition-shadow duration-500 hover:shadow-neon"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundColor: `${t.color}22`,
                  color: t.color,
                  border: `1px solid ${t.color}55`,
                  boxShadow: `0 0 20px ${t.color}22`,
                }}
              >
                {t.initials}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40">
                  {t.category}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
