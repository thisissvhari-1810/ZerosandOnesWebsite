import type { HTMLAttributes, ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * A wrapper that gently pulls its child toward the cursor.
 * Use around Buttons or LinkButtons.
 */
export function MagneticButton({
  children,
  strength = 0.35,
  className,
  ...rest
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLDivElement>(strength);
  return (
    <div
      ref={ref}
      className={cn("inline-block will-change-transform", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
