import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PROCESS } from "@/data/process";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked cinematic process timeline.
 * A vertical progress rail draws as the section scrolls into view, with
 * alternating cards parallax-sliding in from either side. Falls back to a
 * clean stacked list on mobile.
 */
export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-16 h-96 bg-gradient-radial from-electric-500/[0.08] via-transparent to-transparent" />
      </div>

      <div className="container-wide">
        <SectionTitle
          eyebrow="How we work"
          title={
            <>
              A five-step engagement,{" "}
              <span className="text-gradient">designed for outcomes</span>
            </>
          }
          description="Short discovery, tight design, iterative delivery, zero-drama deploy and continuous optimization — the rail below draws as you scroll."
        />

        <div ref={ref} className="relative mt-20">
          {/* Center rail — background */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 md:block"
          >
            <div className="absolute inset-0 bg-white/[0.06]" />
            {/* Draw-in gradient rail */}
            <motion.div
              style={{ height: railHeight }}
              className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-neon-500 via-cyan-glow to-electric-500 shadow-[0_0_18px_rgba(34,211,238,0.35)]"
            />
          </div>

          {/* Left rail (mobile) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[22px] top-0 h-full w-[2px] md:hidden"
          >
            <div className="absolute inset-0 bg-white/[0.06]" />
            <motion.div
              style={{ height: railHeight }}
              className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-neon-500 via-cyan-glow to-electric-500"
            />
          </div>

          <ol className="relative space-y-14 md:space-y-24">
            {PROCESS.map((step, i) => {
              const align = i % 2 === 0 ? "left" : "right";
              return (
                <TimelineNode
                  key={step.step}
                  step={step}
                  align={align}
                  progress={scrollYProgress}
                  index={i}
                  total={PROCESS.length}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineNode({
  step,
  align,
  progress,
  index,
  total,
}: {
  step: (typeof PROCESS)[number];
  align: "left" | "right";
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
}) {
  const point = index / (total - 1);
  const activation = useTransform(
    progress,
    [Math.max(0, point - 0.08), point],
    [0, 1]
  );
  const cardX = useTransform(
    progress,
    [Math.max(0, point - 0.18), point],
    [align === "left" ? -60 : 60, 0]
  );
  const cardOpacity = useTransform(
    progress,
    [Math.max(0, point - 0.18), point - 0.02],
    [0, 1]
  );
  const dotScale = useTransform(activation, [0, 1], [0.5, 1]);
  const dotGlow = useTransform(activation, [0, 1], [0, 0.9]);

  return (
    <li className="relative md:grid md:grid-cols-2 md:gap-14 pl-16 md:pl-0">
      {/* Node dot */}
      <div className="pointer-events-none absolute left-[22px] top-1.5 md:left-1/2 md:-translate-x-1/2">
        <motion.div
          style={{ scale: dotScale }}
          className="relative flex h-6 w-6 items-center justify-center rounded-full"
        >
          <motion.div
            style={{ opacity: dotGlow }}
            className={cn(
              "absolute -inset-3 rounded-full bg-gradient-to-br blur-lg",
              step.accent
            )}
          />
          <div className="relative flex h-6 w-6 items-center justify-center rounded-full glass border-gradient-strong">
            <div
              className={cn(
                "h-2.5 w-2.5 rounded-full bg-gradient-to-br",
                step.accent
              )}
            />
          </div>
        </motion.div>
      </div>

      {/* Card (alternates sides on desktop, always left on mobile) */}
      <motion.div
        style={{ x: cardX, opacity: cardOpacity }}
        className={cn(
          "md:col-span-1",
          align === "right" ? "md:col-start-2" : "md:col-start-1",
          "md:pr-0",
          align === "left" ? "md:text-right md:pr-16" : "md:text-left md:pl-16"
        )}
      >
        <div
          className={cn(
            "group relative overflow-hidden rounded-3xl glass border-gradient p-6 md:p-8 hover:shadow-neon-strong transition-shadow duration-500",
            align === "left" ? "md:ml-auto" : ""
          )}
        >
          <div
            className={cn(
              "pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full blur-3xl opacity-40 bg-gradient-to-br",
              step.accent
            )}
          />
          <div
            className={cn(
              "flex items-center gap-3",
              align === "left" ? "md:flex-row-reverse md:justify-start" : ""
            )}
          >
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-neon",
                step.accent
              )}
            >
              <step.icon className="h-5 w-5" />
            </div>
            <p className="text-xs uppercase tracking-[0.28em] text-neon-200">
              Step {step.step}
            </p>
          </div>
          <h3 className="mt-4 font-display text-2xl font-semibold text-white">
            {step.title}
          </h3>
          <p className="mt-2 text-sm text-white/65 leading-relaxed">
            {step.description}
          </p>
          <ul
            className={cn(
              "mt-4 flex flex-wrap gap-2",
              align === "left" ? "md:justify-end" : ""
            )}
          >
            {step.bullets.map((b) => (
              <li
                key={b}
                className="rounded-full glass px-3 py-1 text-[11px] text-white/70"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </li>
  );
}
