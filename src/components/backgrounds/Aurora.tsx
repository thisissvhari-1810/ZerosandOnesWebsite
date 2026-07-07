import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraProps {
  className?: string;
  intensity?: "soft" | "medium" | "strong";
}

const intensityMap = {
  soft: { blob: "opacity-40", conic: "opacity-30" },
  medium: { blob: "opacity-60", conic: "opacity-40" },
  strong: { blob: "opacity-80", conic: "opacity-55" },
};

/**
 * A layered aurora / blob background. Non-interactive; drop it behind hero
 * content or full-page transitions.
 */
export function Aurora({ className, intensity = "medium" }: AuroraProps) {
  const { blob, conic } = intensityMap[intensity];
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className={cn(
          "absolute -top-40 -left-32 h-[560px] w-[560px] rounded-full blur-[120px] bg-neon-500/40 animate-blob",
          blob
        )}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.2 }}
        className={cn(
          "absolute top-16 right-[-120px] h-[520px] w-[520px] rounded-full blur-[120px] bg-electric-500/40 animate-blob",
          blob
        )}
        style={{ animationDelay: "-4s" }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.4 }}
        className={cn(
          "absolute bottom-[-120px] left-1/3 h-[520px] w-[720px] rounded-full blur-[130px] bg-cyan-glow/30 animate-blob",
          blob
        )}
        style={{ animationDelay: "-8s" }}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora blur-[160px] animate-auroraSpin",
          conic
        )}
      />
    </div>
  );
}
