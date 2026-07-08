import { motion, useScroll, useTransform } from "framer-motion";
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
 * headline with a rotating word, dual magnetic CTAs, live "system status"
 * chip and a subtle scroll indicator that parallaxes out.
 */
export function Hero() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 80]);
  const parallaxFade = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden min-h-[calc(100vh-var(--nav-height))]"
    >
      <Aurora intensity="strong" />
      <GridMesh />
      <Stars />

      <motion.div
        style={{ y: parallaxY, opacity: parallaxFade }}
        className="container-wide relative flex min-h-[calc(100vh-var(--nav-height))] items-center py-24"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl lg:max-w-2xl"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs uppercase tracking-[0.24em] text-neon-200 shadow-[0_0_28px_rgba(26,153,255,0.08)_inset]">
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
            <span className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="text-white/60 text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem]">
                with
              </span>
              <WordRotator
                words={ROTATING}
                className="text-6xl sm:text-7xl md:text-[5.4rem] lg:text-[6rem] headline"
              />
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
            className="mt-8 max-w-xl text-base md:text-lg text-white/70 leading-relaxed"
          >
            We design, build and operate the platforms behind ambitious
            enterprises — cloud, DevOps, AI, data and security engineered by
            senior teams who refuse to ship anything less than excellent.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3"
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
            className="mt-14 grid max-w-xl grid-cols-3 gap-4"
          >
            {[
              { v: "10+", l: "Years" },
              { v: "250+", l: "Projects" },
              { v: "99.99%", l: "Uptime SLA" },
            ].map((s) => (
              <div key={s.l} className="border-l border-white/10 pl-4">
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
