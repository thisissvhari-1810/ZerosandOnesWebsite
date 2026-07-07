import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface StarsProps {
  className?: string;
  count?: number;
}

interface StarSpec {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Stars({ className, count = 90 }: StarsProps) {
  const stars = useMemo<StarSpec[]>(() => {
    const rand = mulberry32(1337);
    return Array.from({ length: count }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 1.6 + 0.6,
      duration: 2 + rand() * 4,
      delay: rand() * 6,
      opacity: 0.4 + rand() * 0.6,
    }));
  }, [count]);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDuration: `${s.duration}s`,
            animationDelay: `-${s.delay}s`,
            boxShadow: `0 0 ${s.size * 4}px rgba(180,215,255,0.6)`,
          }}
        />
      ))}
    </div>
  );
}
