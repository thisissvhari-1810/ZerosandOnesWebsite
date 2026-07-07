import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";
import { BRAND } from "@/data/navigation";

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3 text-white/60">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neon-400" />
        </span>
        <span className="text-sm">Loading…</span>
      </div>
    </div>
  );
}

/**
 * Cinematic curtain: two glass panels sweep across the screen (top + bottom)
 * on route change, briefly framing the brand mark. Content fades under it.
 */
export function PageTransition() {
  const location = useLocation();
  const element = useOutlet();
  const [curtain, setCurtain] = useState(false);
  const [pending, setPending] = useState<string>(location.pathname);

  useEffect(() => {
    if (location.pathname === pending) return;
    setCurtain(true);
    const raf1 = requestAnimationFrame(() => {
      const t = window.setTimeout(() => setPending(location.pathname), 380);
      const t2 = window.setTimeout(() => setCurtain(false), 950);
      // Store timers so we can cancel if navigating rapidly
      (window as unknown as { __z_curtain_timers?: number[] }).__z_curtain_timers = [t, t2];
    });
    return () => {
      cancelAnimationFrame(raf1);
      const t = (window as unknown as { __z_curtain_timers?: number[] })
        .__z_curtain_timers;
      if (t) t.forEach(window.clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pending}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<PageFallback />}>{element}</Suspense>
        </motion.div>
      </AnimatePresence>

      <Curtain active={curtain} />
    </>
  );
}

function Curtain({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="curtain"
          className="pointer-events-none fixed inset-0 z-[90]"
          initial="in"
          animate="mid"
          exit="out"
        >
          {/* Top panel */}
          <motion.div
            variants={{
              in: { y: "-100%" },
              mid: { y: "0%" },
              out: { y: "-100%" },
            }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
            className="absolute inset-x-0 top-0 h-1/2 glass-strong border-b border-white/[0.08] overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -bottom-40 left-1/2 h-[540px] w-[900px] -translate-x-1/2 rounded-full bg-neon-500/20 blur-3xl" />
              <div className="absolute inset-0 grid-bg opacity-20" />
            </div>
          </motion.div>

          {/* Bottom panel */}
          <motion.div
            variants={{
              in: { y: "100%" },
              mid: { y: "0%" },
              out: { y: "100%" },
            }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
            className="absolute inset-x-0 bottom-0 h-1/2 glass-strong border-t border-white/[0.08] overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-40 left-1/2 h-[540px] w-[900px] -translate-x-1/2 rounded-full bg-electric-500/20 blur-3xl" />
              <div className="absolute inset-0 grid-bg opacity-20" />
            </div>
          </motion.div>

          {/* Center brand mark */}
          <motion.div
            variants={{
              in: { opacity: 0, scale: 0.85 },
              mid: { opacity: 1, scale: 1 },
              out: { opacity: 0, scale: 0.9 },
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-500 via-cyan-glow to-electric-500 shadow-neon-strong">
                <span className="font-display text-xl font-bold text-white/95">
                  {BRAND.short}
                </span>
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight text-white">
                {BRAND.name}
              </span>
            </div>
          </motion.div>

          {/* Sweep line */}
          <motion.div
            className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-glow to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
