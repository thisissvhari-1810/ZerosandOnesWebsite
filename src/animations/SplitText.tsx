import { motion, useReducedMotion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  scrollY?: MotionValue<number>;
}

/**
 * Character-level cinematic reveal — each glyph rises + un-blurs.
 * Words are wrapped in `.word` spans to prevent bad line-breaking.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.025,
  once = true,
  as = "h2",
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[as] as typeof motion.h2;

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : delay,
      },
    },
  };

  const child = {
    hidden: { y: "110%", opacity: 0, filter: "blur(8px)" },
    visible: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.35 }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          aria-hidden
          className="inline-block whitespace-nowrap"
          style={{ marginRight: wi < words.length - 1 ? "0.28em" : 0 }}
        >
          {word.split("").map((ch, ci) => (
            <span
              key={ci}
              className="inline-block overflow-hidden align-baseline pb-[0.12em]"
              style={{ lineHeight: 1 }}
            >
              <motion.span variants={child} className="inline-block">
                {ch}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}
