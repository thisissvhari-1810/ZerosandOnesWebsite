import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  duration?: number;
  fade?: boolean;
}

export function Marquee({
  children,
  className,
  reverse = false,
  duration = 40,
  fade = true,
}: MarqueeProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {fade && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        </>
      )}
      <div
        className={cn(
          "flex w-max animate-marquee gap-12",
          reverse && "[animation-direction:reverse]"
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
