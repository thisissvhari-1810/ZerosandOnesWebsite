import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, stagger } from "@/lib/motion";

interface SectionTitleProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.div variants={fadeUp} className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] text-neon-200">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-400 shadow-[0_0_10px_rgba(26,153,255,0.9)]" />
            {eyebrow}
          </span>
        </motion.div>
      )}
      <motion.h2
        variants={fadeUp}
        className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-white"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="mt-5 text-base md:text-lg text-white/60 leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
