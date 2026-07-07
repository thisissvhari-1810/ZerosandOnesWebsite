import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

/**
 * Splits `text` into words and reveals them with a soft rise/blur animation.
 * Great for cinematic headlines.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  once = true,
  as = "h2",
}: TextRevealProps) {
  const words = text.split(" ");
  const MotionTag = motion[as] as typeof motion.h2;

  return (
    <MotionTag
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] align-baseline"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "115%", opacity: 0, filter: "blur(6px)" },
              visible: {
                y: "0%",
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
