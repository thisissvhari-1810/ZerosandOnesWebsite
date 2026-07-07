import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TECHNOLOGIES, type TechCategory } from "@/data/technologies";
import { cn } from "@/lib/utils";

interface Ring {
  radius: number;
  duration: number;
  reverse?: boolean;
}

const CATEGORIES: (TechCategory | "All")[] = [
  "All",
  "Cloud",
  "Container",
  "IaC",
  "CI/CD",
  "Language",
  "Framework",
  "AI",
  "Database",
  "Streaming",
  "SCM",
];

const RINGS: Ring[] = [
  { radius: 120, duration: 30 },
  { radius: 200, duration: 42, reverse: true },
  { radius: 280, duration: 55 },
];

/**
 * Interactive orbital visualization of the technology stack.
 * Filter by category — matching chips glow and non-matching chips dim.
 */
export function TechOrbit() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");

  const distributed = useMemo(() => {
    // Distribute techs across rings, roughly balanced
    const perRing = Math.ceil(TECHNOLOGIES.length / RINGS.length);
    return RINGS.map((ring, ri) => {
      const items = TECHNOLOGIES.slice(ri * perRing, (ri + 1) * perRing);
      return items.map((tech, i) => ({
        ...tech,
        ring,
        angle: (i / items.length) * 360,
      }));
    }).flat();
  }, []);

  return (
    <section
      id="tech-orbit"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-electric-500/[0.08] via-transparent to-transparent" />
      </div>

      <div className="container-wide">
        <SectionTitle
          eyebrow="Interactive stack"
          title={
            <>
              A living map of the{" "}
              <span className="text-gradient">technologies we ship</span>
            </>
          }
          description="Filter by category to see which tools we deploy where. Hover any chip for the full name."
        />

        {/* Filter chips */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-medium uppercase tracking-widest transition-all",
                filter === c
                  ? "bg-gradient-to-r from-neon-500 via-cyan-glow to-electric-500 text-white shadow-neon"
                  : "glass text-white/60 hover:text-white"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Orbit stage */}
        <div className="relative mx-auto mt-14 flex aspect-square w-full max-w-[640px] items-center justify-center">
          {/* Rings */}
          <svg
            aria-hidden
            viewBox="-320 -320 640 640"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="ring-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1a99ff" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {RINGS.map((r, i) => (
              <circle
                key={i}
                cx="0"
                cy="0"
                r={r.radius}
                fill="none"
                stroke="url(#ring-stroke)"
                strokeWidth={0.8}
                strokeDasharray="3 5"
                opacity={0.75}
              />
            ))}
          </svg>

          {/* Center core */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-neon-500 via-cyan-glow to-electric-500 shadow-neon-strong"
          >
            <div className="absolute inset-1 rounded-full bg-background/70 backdrop-blur-xl" />
            <div className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-br from-neon-500/30 via-cyan-glow/20 to-electric-500/30 blur-xl animate-pulseGlow" />
            <div className="relative flex flex-col items-center">
              <span className="font-display text-2xl font-semibold text-white">
                01
              </span>
              <span className="mt-0.5 text-[9px] uppercase tracking-widest text-white/60">
                Core
              </span>
            </div>
          </motion.div>

          {/* Rotating orbits with chips */}
          {RINGS.map((ring, ri) => (
            <motion.div
              key={ri}
              className="absolute inset-0"
              style={{ transformOrigin: "center" }}
              animate={{ rotate: ring.reverse ? -360 : 360 }}
              transition={{
                duration: ring.duration,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {distributed
                .filter((d) => d.ring === ring)
                .map((tech) => {
                  const active = filter === "All" || tech.category === filter;
                  return (
                    <div
                      key={tech.name}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `translate(-50%,-50%) rotate(${tech.angle}deg) translate(${ring.radius}px) rotate(-${tech.angle}deg)`,
                      }}
                    >
                      <motion.div
                        // Counter-rotate so the chip stays upright
                        animate={{ rotate: ring.reverse ? 360 : -360 }}
                        transition={{
                          duration: ring.duration,
                          ease: "linear",
                          repeat: Infinity,
                        }}
                        className="relative"
                      >
                        <TechDot tech={tech} active={active} />
                      </motion.div>
                    </div>
                  );
                })}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechDot({
  tech,
  active,
}: {
  tech: (typeof TECHNOLOGIES)[number];
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex h-12 w-12 items-center justify-center rounded-2xl font-bold text-xs transition-all duration-500",
        active ? "opacity-100 scale-100" : "opacity-25 scale-90 grayscale"
      )}
      style={{
        backgroundColor: `${tech.color}22`,
        color: tech.color,
        border: `1px solid ${tech.color}66`,
        boxShadow: active ? `0 0 16px ${tech.color}55` : "none",
      }}
    >
      <span>{tech.initials}</span>
      <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full glass px-2.5 py-1 text-[10px] uppercase tracking-widest text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {tech.name}
      </span>
    </div>
  );
}
