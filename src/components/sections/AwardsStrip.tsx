import { motion } from "framer-motion";
import { Award, Star, Trophy, ShieldCheck, Zap } from "lucide-react";

const AWARDS = [
  { icon: Trophy, label: "Awwwards", detail: "Site of the Day" },
  { icon: Star, label: "Clutch Global", detail: "Top 1000" },
  { icon: Award, label: "AWS Partner", detail: "Advanced Tier" },
  { icon: ShieldCheck, label: "SOC 2", detail: "Type II" },
  { icon: Zap, label: "ISO 27001", detail: "Certified" },
];

/**
 * Compact awards / accreditations strip — silent luxury detail that
 * reinforces credibility without a huge visual footprint.
 */
export function AwardsStrip() {
  return (
    <section className="relative py-14" aria-label="Awards and accreditations">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6 rounded-3xl glass border-gradient p-6 md:p-8"
        >
          <p className="w-full md:w-auto text-[10px] uppercase tracking-[0.32em] text-white/50">
            Recognised & accredited
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {AWARDS.map((a) => (
              <div
                key={a.label}
                className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl glass group-hover:shadow-neon transition-shadow">
                  <a.icon className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="font-display text-sm font-semibold">{a.label}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">
                    {a.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
