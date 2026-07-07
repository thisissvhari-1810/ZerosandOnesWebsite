import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:ring-2 focus-visible:ring-neon-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap select-none";

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 h-9",
  md: "text-sm md:text-[15px] px-5 md:px-6 h-11",
  lg: "text-base md:text-lg px-7 md:px-8 h-14",
};

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-gradient-to-r from-neon-500 via-neon-400 to-accent-cyan hover:from-neon-400 hover:via-neon-300 hover:to-accent-cyan shadow-neon hover:shadow-neon-strong hover:-translate-y-0.5",
  secondary:
    "text-white glass-strong hover:bg-white/10 hover:-translate-y-0.5",
  ghost:
    "text-white/80 hover:text-white hover:bg-white/5",
  outline:
    "text-white border border-white/15 hover:border-neon-400/60 hover:bg-white/[0.03] hover:-translate-y-0.5",
};

function buildClasses({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: Pick<BaseProps, "variant" | "size" | "fullWidth" | "className">) {
  return cn(
    base,
    sizes[size],
    variants[variant],
    fullWidth && "w-full",
    className
  );
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      leftIcon,
      rightIcon,
      variant,
      size,
      fullWidth,
      className,
      ...rest
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={buildClasses({ variant, size, fullWidth, className })}
        {...rest}
      >
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

interface LinkButtonProps extends BaseProps {
  to: string;
  external?: boolean;
}

export function LinkButton({
  to,
  external,
  children,
  leftIcon,
  rightIcon,
  variant,
  size,
  fullWidth,
  className,
}: LinkButtonProps) {
  const classes = buildClasses({
    variant,
    size,
    fullWidth,
    className,
  });
  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={classes}>
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </a>
    );
  }
  return (
    <Link to={to} className={classes}>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </Link>
  );
}
