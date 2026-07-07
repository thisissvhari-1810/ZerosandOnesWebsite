import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeuralNetProps {
  className?: string;
  nodes?: number;
  maxConnections?: number;
}

interface Node {
  x: number;
  y: number;
  r: number;
}

interface Edge {
  a: number;
  b: number;
  distance: number;
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

/**
 * Soft neural-network / constellation lines. Rendered as a single SVG behind
 * content — cheaper than a canvas and easy to blur.
 */
export function NeuralNet({
  className,
  nodes = 34,
  maxConnections = 60,
}: NeuralNetProps) {
  const { pts, edges } = useMemo(() => {
    const rand = mulberry32(7331);
    const pts: Node[] = Array.from({ length: nodes }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      r: 0.4 + rand() * 1.2,
    }));

    const edges: Edge[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 22) edges.push({ a: i, b: j, distance: d });
      }
    }
    edges.sort((a, b) => a.distance - b.distance);
    return { pts, edges: edges.slice(0, maxConnections) };
  }, [nodes, maxConnections]);

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 h-full w-full",
        className
      )}
    >
      <defs>
        <linearGradient id="nn-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a99ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="nn-dot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
      </defs>
      {edges.map((e, i) => {
        const a = pts[e.a];
        const b = pts[e.b];
        return (
          <motion.line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#nn-line)"
            strokeWidth={0.08}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{
              duration: 1.6,
              delay: 0.4 + i * 0.02,
              ease: "easeOut",
            }}
          />
        );
      })}
      {pts.map((p, i) => (
        <motion.circle
          key={`p-${i}`}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill="url(#nn-dot)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.02 }}
        />
      ))}
    </svg>
  );
}
