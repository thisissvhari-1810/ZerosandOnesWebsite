import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TESTIMONIALS } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6200;

/**
 * Cinematic testimonial spotlight — an enormous quote on the left, a huge
 * halo-lit avatar on the right, thin timeline scrubber below. Keyboard
 * navigable, pauses on hover.
 */
export function TestimonialsCarousel() {
  const items = useMemo(() => TESTIMONIALS, []);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (delta: number) => setI((prev) => (prev + delta + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setI((p) => (p + 1) % items.length), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [items.length, paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const active = items[i];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient stage lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          key={`glowA-${i}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className={cn(
            "absolute left-[15%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full blur-[120px] bg-gradient-to-br opacity-40",
            active.accent
          )}
        />
        <motion.div
          key={`glowB-${i}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.1 }}
          className="absolute right-[10%] top-1/3 h-[380px] w-[380px] rounded-full blur-[100px] bg-electric-500/25"
        />
      </div>

      <div className="container-wide">
        <SectionTitle
          eyebrow="What clients say"
          title={
            <>
              Real leaders,{" "}
              <span className="text-gradient">real results</span>
            </>
          }
          description="Held to the same bar we hold ourselves to. Every relationship is measured by outcomes, not slideware."
        />

        <div className="relative mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          {/* Quote panel */}
          <div className="relative min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={active.name}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <Quote className="h-14 w-14 text-neon-400/70" />
                <div className="mt-4 flex gap-1 text-neon-300">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-6 headline text-white text-2xl md:text-3xl lg:text-4xl leading-[1.2]">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-semibold text-white shadow-neon",
                        active.accent
                      )}
                    >
                      {active.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{active.name}</p>
                      <p className="text-sm text-white/50">
                        {active.role} · {active.company}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block h-8 w-px bg-white/10" />
                  <div className="text-xs uppercase tracking-widest text-white/40">
                    Testimonial{" "}
                    <span className="font-display text-white/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>{" "}
                    / {String(items.length).padStart(2, "0")}
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Spotlight avatar */}
          <div className="relative flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-md">
              {/* Concentric orbits */}
              {[0.5, 0.7, 0.9].map((r, ri) => (
                <motion.div
                  key={ri}
                  className="absolute inset-0 rounded-full border border-white/8"
                  style={{
                    transform: `scale(${r})`,
                    borderStyle: ri === 1 ? "dashed" : "solid",
                  }}
                  animate={{ rotate: ri % 2 === 0 ? 360 : -360 }}
                  transition={{
                    duration: 40 + ri * 15,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  <span
                    className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
                    style={{
                      background: "linear-gradient(90deg,#22d3ee,#a855f7)",
                      boxShadow: "0 0 12px rgba(34,211,238,0.9)",
                    }}
                  />
                </motion.div>
              ))}

              <AnimatePresence mode="wait">
                <motion.div
                  key={`avatar-${active.name}`}
                  initial={{ opacity: 0, scale: 0.86 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "absolute inset-[20%] flex items-center justify-center rounded-full bg-gradient-to-br text-6xl font-display font-semibold text-white shadow-neon-strong",
                    active.accent
                  )}
                >
                  {active.initials}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Timeline + controls */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-1 items-center gap-2">
            {items.map((it, idx) => (
              <button
                key={it.name}
                onClick={() => setI(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className="group relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/10 transition-all"
              >
                <span
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                  style={{
                    width: idx < i ? "100%" : idx === i ? "100%" : "0%",
                    background:
                      "linear-gradient(90deg,#1a99ff,#22d3ee,#a855f7)",
                    animation:
                      idx === i && !paused
                        ? `barFill ${AUTOPLAY_MS}ms linear forwards`
                        : "none",
                  }}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full glass text-white hover:shadow-neon transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full glass text-white hover:shadow-neon transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes barFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
