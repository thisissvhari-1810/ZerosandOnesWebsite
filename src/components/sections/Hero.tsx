import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles, ArrowDown } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { MagneticButton } from "@/animations/MagneticButton";
import { SplitText } from "@/animations/SplitText";
import { WordRotator } from "@/animations/WordRotator";
import { Aurora } from "@/components/backgrounds/Aurora";
import { GridMesh } from "@/components/backgrounds/GridMesh";
import { Stars } from "@/components/backgrounds/Stars";
import { fadeUp, stagger } from "@/lib/motion";

const ROTATING = [
  "AI",
  "Cloud",
  "DevOps",
  "Data",
  "Automation",
  "Security",
];

/**
 * A cinematic hero: aurora + stars + grid backdrop, a huge split-reveal
 * headline with a rotating word, mouse-tracked spotlight, cinemascope
 * corner brackets, vignette overlay and dual magnetic CTAs. Fully
 * centered on every breakpoint.
 */
export function Hero() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 80]);
  const parallaxFade = useTransform(scrollY, [0, 400], [1, 0]);

  // Mouse-tracked spotlight (desktop only)
  const mx = useMotionValue(50);
  const my = useMotionValue(35);
  const smx = useSpring(mx, { stiffness: 55, damping: 22, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 55, damping: 22, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const spotlightBg = useMotionTemplate`radial-gradient(620px circle at ${smx}% ${smy}%, rgba(34,211,238,0.22), rgba(139,92,246,0.12) 30%, transparent 62%)`;

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden min-h-[calc(100vh-var(--nav-height))]"
    >
      <Aurora intensity="strong" />
      <GridMesh />
      <Stars />

      {/* Mouse-tracked spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5] hidden md:block"
        style={{ backgroundImage: spotlightBg }}
      />

      {/* Ambient diagonal beam sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[6] overflow-hidden"
      >
        <div className="absolute -inset-x-32 top-[38%] h-56 rotate-[-8deg] bg-gradient-to-r from-transparent via-cyan-glow/10 to-transparent blur-3xl" />
        <div className="absolute -inset-x-32 top-[62%] h-40 rotate-[6deg] bg-gradient-to-r from-transparent via-electric-500/10 to-transparent blur-3xl" />
      </div>

      {/* Cinematic vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[4]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(4,6,13,0.9) 100%)",
        }}
      />

      {/* Cinemascope corner brackets */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-6 md:inset-10 -z-[3]"
      >
        <div className="absolute top-0 left-0 h-7 w-7 border-l border-t border-white/15" />
        <div className="absolute top-0 right-0 h-7 w-7 border-r border-t border-white/15" />
        <div className="absolute bottom-0 left-0 h-7 w-7 border-l border-b border-white/15" />
        <div className="absolute bottom-0 right-0 h-7 w-7 border-r border-b border-white/15" />
      </div>

      <motion.div
        style={{ y: parallaxY, opacity: parallaxFade }}
        className="container-wide relative flex min-h-[calc(100vh-var(--nav-height))] items-center justify-center py-24"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-5xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs uppercase tracking-[0.24em] text-neon-200 shadow-[0_0_28px_rgba(26,153,255,0.08)_inset]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-cyan-glow opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-glow" />
              </span>
              <Sparkles className="h-3.5 w-3.5" />
              Premium IT Solutions · Awwwards-caliber engineering
            </span>
          </motion.div>

          <h1 className="headline text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.6rem]">
            <SplitText
              text="Engineering the future"
              as="span"
              className="block"
              stagger={0.02}
            />
            <span className="mt-3 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2">
              <span className="text-white/60 text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem]">
                with
              </span>
              <span className="relative inline-block">
                {/* Glow aura behind the rotating word */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 rounded-full bg-gradient-to-r from-neon-500/25 via-cyan-glow/25 to-electric-500/25 blur-3xl"
                />
                <WordRotator
                  words={ROTATING}
                  className="text-6xl sm:text-7xl md:text-[5.4rem] lg:text-[6rem] headline"
                />
              </span>
            </span>
            <SplitText
              text="Cloud & DevOps."
              as="span"
              className="block text-white/85"
              delay={0.15}
              stagger={0.02}
            />
          </h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed"
          >
            We design, build and operate the platforms behind ambitious
            enterprises — cloud, DevOps, AI, data and security engineered by
            senior teams who refuse to ship anything less than excellent.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <MagneticButton>
              <LinkButton
                to="/contact"
                size="lg"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Start your project
              </LinkButton>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <LinkButton
                to="/services"
                variant="secondary"
                size="lg"
                leftIcon={<PlayCircle className="h-5 w-5" />}
              >
                Explore services
              </LinkButton>
            </MagneticButton>
          </motion.div>

          {/* Live-stat strip */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4"
          >
            {[
              { v: "10+", l: "Years" },
              { v: "250+", l: "Projects" },
              { v: "99.99%", l: "Uptime SLA" },
            ].map((s) => (
              <div
                key={s.l}
                className="text-center border-t border-white/10 pt-4"
              >
                <p className="font-display text-2xl md:text-3xl font-semibold text-gradient">
                  {s.v}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                  {s.l}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#services"
        aria-label="Scroll to next section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ opacity: parallaxFade }}
        className="group pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.32em]">Scroll</span>
        <div className="relative h-10 w-[2px] overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ y: -40 }}
            animate={{ y: 40 }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-6 w-full bg-gradient-to-b from-cyan-glow to-transparent"
          />
        </div>
        <ArrowDown className="h-3 w-3 opacity-0 -translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0" />
      </motion.a>
    </section>
  );
}
