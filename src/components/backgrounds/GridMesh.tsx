import { cn } from "@/lib/utils";

interface GridMeshProps {
  className?: string;
  masked?: boolean;
}

/**
 * A subtle grid with an optional radial mask. Pairs beautifully with Aurora.
 */
export function GridMesh({ className, masked = true }: GridMeshProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 opacity-40",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px)," +
          "linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: masked
          ? "radial-gradient(ellipse at center, black 30%, transparent 78%)"
          : undefined,
        WebkitMaskImage: masked
          ? "radial-gradient(ellipse at center, black 30%, transparent 78%)"
          : undefined,
      }}
    />
  );
}
