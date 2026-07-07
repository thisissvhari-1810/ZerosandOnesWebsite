import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

function formatNumber(n: number, decimals: number) {
  if (decimals > 0) return n.toFixed(decimals);
  if (n >= 1000) return Math.round(n).toLocaleString();
  return Math.round(n).toString();
}

export function AnimatedCounter({
  value,
  duration = 1.8,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const to = value;

    const tick = (t: number) => {
      const elapsed = (t - start) / (duration * 1000);
      const eased = Math.min(1, elapsed);
      const easedOut = 1 - Math.pow(1 - eased, 3);
      setDisplay(from + (to - from) * easedOut);
      if (eased < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {prefix}
      {formatNumber(display, decimals)}
      {suffix}
    </motion.span>
  );
}
