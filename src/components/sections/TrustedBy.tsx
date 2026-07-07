import { motion } from "framer-motion";
import { Marquee } from "@/animations/Marquee";
import { TECHNOLOGIES } from "@/data/technologies";

/**
 * A silent-luxury trusted-by band: two counter-scrolling marquees of tech
 * stack chips, framed by a thin gradient rule.
 */
export function TrustedBy() {
  const half = Math.ceil(TECHNOLOGIES.length / 2);
  const rowA = TECHNOLOGIES.slice(0, half);
  const rowB = TECHNOLOGIES.slice(half);

  return (
    <section className="relative py-20 md:py-24" aria-label="Technologies we work with">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-10 max-w-fit rounded-full glass px-3.5 py-1.5 text-[10px] uppercase tracking-[0.32em] text-white/60"
      >
        The stack we ship on
      </motion.p>

      <div className="space-y-5">
        <Marquee duration={55}>
          {rowA.map((t) => (
            <TechChip key={t.name} name={t.name} color={t.color} initials={t.initials} />
          ))}
        </Marquee>
        <Marquee duration={70} reverse>
          {rowB.map((t) => (
            <TechChip key={t.name} name={t.name} color={t.color} initials={t.initials} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function TechChip({
  name,
  color,
  initials,
}: {
  name: string;
  color: string;
  initials: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-full glass px-4 py-2.5">
      <span
        className="flex h-6 w-6 items-center justify-center rounded-md text-[9px] font-bold"
        style={{
          backgroundColor: `${color}22`,
          color: color,
          border: `1px solid ${color}55`,
        }}
      >
        {initials}
      </span>
      <span className="text-sm font-medium text-white/85 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}
