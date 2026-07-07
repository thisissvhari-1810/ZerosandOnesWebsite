import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

/**
 * A 3D-tilt card. Uses framer-motion springs for buttery pointer tracking
 * and an optional radial-glare that follows the cursor.
 */
export function TiltCard({
  children,
  className,
  intensity = 8,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const sx = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 22, mass: 0.6 });

  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);

  const glareBg = useTransform(
    [sx, sy] as [typeof sx, typeof sy],
    ([x, y]) =>
      `radial-gradient(600px circle at ${(x as number) * 100}% ${
        (y as number) * 100
      }%, rgba(34,211,238,0.18), transparent 45%)`
  );

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={cn("relative will-change-transform", className)}
    >
      <div style={{ transform: "translateZ(0)" }}>{children}</div>
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
