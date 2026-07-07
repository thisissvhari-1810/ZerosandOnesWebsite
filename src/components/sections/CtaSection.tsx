import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { MagneticButton } from "@/animations/MagneticButton";
import { fadeUp } from "@/lib/motion";

export function CtaSection() {
  return (
    <section className="relative py-24 md:py-28">
      <div className="container-wide">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-[36px] glass-strong border-gradient border-gradient-strong p-10 md:p-16 text-center"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 -left-16 h-72 w-72 rounded-full bg-neon-500/25 blur-3xl animate-blob" />
            <div className="absolute -bottom-32 -right-16 h-72 w-72 rounded-full bg-electric-500/25 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
            <div className="absolute inset-0 grid-bg opacity-25" />
          </div>
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs uppercase tracking-[0.22em] text-neon-200">
              Ready when you are
            </span>
            <h2 className="mt-6 headline text-white text-4xl md:text-6xl">
              Let's build something{" "}
              <span className="text-gradient">worth shipping</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/70 md:text-lg">
              A 30-minute consultation is usually all it takes to know if we're
              a fit. No forms, no pitches — just a real conversation with a
              senior engineer.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
              <MagneticButton>
                <LinkButton
                  to="/contact"
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Start your project
                </LinkButton>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <LinkButton
                  to="/contact"
                  variant="secondary"
                  size="lg"
                  leftIcon={<Calendar className="h-5 w-5" />}
                >
                  Book consultation
                </LinkButton>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
