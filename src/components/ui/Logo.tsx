import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BRAND } from "@/data/navigation";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label={`${BRAND.name} — Home`}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-neon-500 via-cyan-glow to-electric-500 shadow-neon transition-all duration-500 group-hover:rotate-[9deg] group-hover:shadow-neon-strong">
        <span className="font-display text-sm font-bold text-white/95">
          {BRAND.short}
        </span>
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/20" />
        <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-neon-500/40 via-cyan-glow/30 to-electric-500/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </span>
      {showText && (
        <span className="font-display text-lg font-semibold tracking-tight text-white">
          {BRAND.name}
        </span>
      )}
    </Link>
  );
}
