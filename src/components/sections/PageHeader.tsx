import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-radial from-neon-500/15 via-transparent to-transparent" />
        <div className="absolute -bottom-32 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-accent-purple/10 blur-3xl" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="container-wide max-w-4xl text-center"
      >
        {eyebrow && (
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] text-neon-200">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-400 shadow-[0_0_10px_rgba(26,153,255,0.9)]" />
              {eyebrow}
            </span>
          </motion.div>
        )}
        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-white"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-white/60 leading-relaxed"
          >
            {description}
          </motion.p>
        )}
        {actions && (
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col sm:flex-row justify-center gap-3"
          >
            {actions}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
