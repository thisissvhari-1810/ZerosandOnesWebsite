import { type HTMLAttributes, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-5",
  md: "p-6 md:p-8",
  lg: "p-8 md:p-10",
};

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  padding = "md",
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl glass border-gradient",
        paddings[padding],
        hover &&
          "transition-all duration-500 hover:-translate-y-1 hover:shadow-neon",
        glow && "shadow-neon",
        className
      )}
      {...rest}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-neon-500/10 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

interface MotionGlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  padding?: "sm" | "md" | "lg";
}

export function MotionGlassCard({
  children,
  className,
  hover = true,
  glow = false,
  padding = "md",
  ...rest
}: MotionGlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl glass border-gradient",
        paddings[padding],
        hover &&
          "transition-shadow duration-500 hover:shadow-neon",
        glow && "shadow-neon",
        className
      )}
      {...rest}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-neon-500/10 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </motion.div>
  );
}
