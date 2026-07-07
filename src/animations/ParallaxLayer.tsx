import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  /** Distance in px (positive: slower than scroll, negative: faster) */
  offset?: number;
  /** Scale multiplier for a slight zoom-in as the element enters view */
  scale?: boolean;
  /** Opacity fade — pairs well with scale for cinematic sections */
  fade?: boolean;
}

/**
 * Scroll-linked parallax wrapper. Uses `useScroll` bound to the element so
 * every layer moves independently based on its own viewport position.
 */
export function ParallaxLayer({
  children,
  className,
  offset = 60,
  scale = false,
  fade = false,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const y = useTransform(smooth, [0, 1], [offset, -offset]);
  const s = useTransform(smooth, [0, 0.5, 1], [0.94, 1, 0.98]);
  const o = useTransform(smooth, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        scale: scale ? s : undefined,
        opacity: fade ? o : undefined,
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
