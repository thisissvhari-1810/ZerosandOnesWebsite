import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles, ArrowDown } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { MagneticButton } from "@/animations/MagneticButton";
import { SplitText } from "@/animations/SplitText";
import { Aurora } from "@/components/backgrounds/Aurora";
import { GridMesh } from "@/components/backgrounds/GridMesh";
import { Stars } from "@/components/backgrounds/Stars";
import { fadeUp, stagger } from "@/lib/motion";

const STATS = [
  { v: "10+", l: "Years" },
  { v: "250+", l: "Projects" },
  { v: "99.99%", l: "Uptime" },
];

/**
 * Immersive-3D hero: the HeroCanvas (globe + arcs + particles) fills the
 * entire section, with a perfectly-centered headline overlay, mouse
 * spotlight, ambient beams, vignette, cinemascope corner brackets and a
 * glass "console" stats pill.
 */
export function Hero() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 60]);

  // Mouse-tracked spotlight (desktop). We drive a translated layer instead of
  // rewriting a viewport-sized radial-gradient background every frame, so the
  // browser can GPU-composite it and scrolling stays smooth.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 22, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 55, damping: 22, mass: 0.6 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);
  const spotX = useTransform(smx, (v) => v - 340);
  const spotY = useTransform(smy, (v) => v - 340);

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden min-h-[calc(100vh-var(--nav-height))]"
    >
      {/* Deep atmosphere behind everything */}
      <Aurora intensity="strong" />
      <GridMesh />
      <Stars />

      {/* Ambient diagonal light beams */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[2] overflow-hidden"
      >
        <div className="absolute -inset-x-32 top-[36%] h-56 rotate-[-8deg] bg-gradient-to-r from-transparent via-cyan-glow/10 to-transparent blur-3xl" />
        <div className="absolute -inset-x-32 top-[64%] h-40 rotate-[6deg] bg-gradient-to-r from-transparent via-electric-500/10 to-transparent blur-3xl" />
      </div>

      {/* Mouse-tracked spotlight — a translated blurred blob, GPU-composited. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 -z-[2] hidden md:block h-[680px] w-[680px] rounded-full"
        style={{
          x: spotX,
          y: spotY,
          background:
            "radial-gradient(circle, rgba(34,211,238,0.18), rgba(139,92,246,0.10) 30%, transparent 62%)",
          willChange: "transform",
        }}
      />

      {/* Readable scrim behind the headline so text stays legible over the globe */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at center, rgba(4,6,13,0.62), rgba(4,6,13,0) 72%)",
        }}
      />

      {/* Cinematic vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(4,6,13,0.9) 100%)",
        }}
      />

      {/* Cinemascope corner brackets */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-6 md:inset-10 -z-[1]"
      >
        <div className="absolute top-0 left-0 h-7 w-7 border-l border-t border-white/15" />
        <div className="absolute top-0 right-0 h-7 w-7 border-r border-t border-white/15" />
        <div className="absolute bottom-0 left-0 h-7 w-7 border-l border-b border-white/15" />
        <div className="absolute bottom-0 right-0 h-7 w-7 border-r border-b border-white/15" />
      </div>

      {/* Content overlay */}
      <motion.div
        style={{ y: parallaxY, willChange: "transform" }}
        className="container-wide relative z-10 flex min-h-[calc(100vh-var(--nav-height))] items-center justify-center py-24"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-4xl text-center"
        >
          {/* Live badge */}
          <motion.div variants={fadeUp} className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-neon-200 backdrop-blur-xl shadow-[0_0_28px_rgba(26,153,255,0.10)_inset]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-cyan-glow opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-glow" />
              </span>
              <Sparkles className="h-3.5 w-3.5" />
              Premium IT · Awwwards-caliber engineering
            </span>
          </motion.div>

          {/* Massive headline — two crisp lines, no awkward wrapping */}
          <h1 className="headline text-white leading-[0.9] tracking-tight">
            <SplitText
              text="Engineering"
              as="span"
              className="block text-[3.5rem] sm:text-[4.75rem] md:text-[6rem] lg:text-[7.5rem]"
              stagger={0.02}
            />
            <SplitText
              text="the future."
              as="span"
              className="block text-[3.5rem] sm:text-[4.75rem] md:text-[6rem] lg:text-[7.5rem] text-white/85"
              delay={0.1}
              stagger={0.02}
            />

            {/* with Zeros and Ones — supporting line, aligned baseline */}
            <span className="mt-6 flex flex-nowrap items-baseline justify-center gap-x-3 sm:gap-x-4 text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] whitespace-nowrap">
              <span className="text-white/50 font-normal">with</span>
              <span className="relative inline-block">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 rounded-full bg-gradient-to-r from-neon-500/30 via-cyan-glow/25 to-electric-500/30 blur-3xl"
                />
                <span className="font-semibold text-gradient">
                  Zeros and Ones
                </span>
              </span>
            </span>
          </h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-10 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed"
          >
            We design, build and operate the platforms behind ambitious
            enterprises — engineered by senior teams who refuse to ship
            anything less than excellent.
          </motion.p>

          {/* CTAs */}
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

          {/* Stats console */}
          <motion.div variants={fadeUp} className="mt-14 flex justify-center">
            <div className="inline-flex items-stretch divide-x divide-white/10 rounded-2xl glass backdrop-blur-xl px-2 py-3 shadow-glass">
              {STATS.map((s) => (
                <div key={s.l} className="px-5 sm:px-7 text-center">
                  <p className="font-display text-xl md:text-2xl font-semibold text-gradient">
                    {s.v}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-white/50">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
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
        className="group pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors z-10"
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
