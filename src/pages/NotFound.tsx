import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { useSeo } from "@/hooks/useSeo";

export default function NotFound() {
  useSeo({ title: "Page not found" });

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-radial from-neon-500/15 via-transparent to-transparent" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-wide text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-neon-200">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-6xl md:text-8xl font-semibold text-gradient">
          Lost in the network.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-white/60 md:text-lg">
          The page you were looking for doesn't exist — or has been re-routed.
          Let's get you back on the happy path.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <LinkButton to="/" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Back home
          </LinkButton>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full glass px-6 py-3 text-sm text-white hover:shadow-neon transition-all"
          >
            Contact support
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
