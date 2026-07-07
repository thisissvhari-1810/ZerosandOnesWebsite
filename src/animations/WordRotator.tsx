import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function WordRotator({
  words,
  interval = 2200,
  className,
}: WordRotatorProps) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setI((prev) => (prev + 1) % words.length),
      interval
    );
    return () => window.clearInterval(id);
  }, [interval, words.length]);

  return (
    <span
      className={cn(
        "relative inline-block align-baseline whitespace-nowrap",
        className
      )}
      aria-live="polite"
    >
      {/* Invisible longest word reserves width */}
      <span
        className="invisible inline-block text-gradient"
        aria-hidden
      >
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ y: "60%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-60%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center text-gradient"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
