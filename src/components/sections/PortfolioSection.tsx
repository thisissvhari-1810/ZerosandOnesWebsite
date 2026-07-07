import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { LinkButton } from "@/components/ui/Button";
import { TiltCard } from "@/animations/TiltCard";
import { PORTFOLIO, type PortfolioItem } from "@/data/portfolio";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Props {
  showAll?: boolean;
  limit?: number;
}

const spanClass = {
  sm: "md:col-span-1 md:row-span-1",
  md: "md:col-span-1 md:row-span-2",
  lg: "md:col-span-2 md:row-span-2",
} as const;

export function PortfolioSection({ showAll = false, limit = 6 }: Props) {
  const items = showAll ? PORTFOLIO : PORTFOLIO.slice(0, limit);
  const [active, setActive] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="portfolio" className="relative py-24 md:py-32">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <SectionTitle
            align="left"
            eyebrow="Selected work"
            title={
              <>
                Outcomes we've shipped for{" "}
                <span className="text-gradient">ambitious teams</span>
              </>
            }
            description="A snapshot of engagements across banking, healthcare, retail and beyond — each measured in real business impact."
            className="mx-0"
          />
          {!showAll && (
            <LinkButton
              to="/portfolio"
              variant="outline"
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
            >
              View all case studies
            </LinkButton>
          )}
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-14 grid gap-6 md:grid-cols-3 md:auto-rows-[220px]"
        >
          {items.map((p) => (
            <motion.article
              key={p.slug}
              variants={fadeUp}
              className={cn("group", spanClass[p.span ?? "sm"])}
            >
              <TiltCard intensity={6} className="h-full">
                <button
                  onClick={() => setActive(p)}
                  className="relative w-full h-full overflow-hidden rounded-3xl glass border-gradient text-left transition-shadow duration-500 hover:shadow-neon-strong"
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: p.cover }}
                  />
                  <div className="absolute inset-0 grid-bg opacity-25" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />

                  <div className="relative flex h-full flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full glass px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/80">
                        {p.industry}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur text-white transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="mt-auto">
                      <h3 className="font-display text-lg md:text-xl font-semibold text-white">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/70 line-clamp-2">
                        {p.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full glass px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-white/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </TiltCard>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <ProjectModal item={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ProjectModal({
  item,
  onClose,
}: {
  item: PortfolioItem | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center px-3 sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
        >
          <button
            aria-label="Close project"
            onClick={onClose}
            className="absolute inset-0 bg-background/70 backdrop-blur-lg"
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl glass-strong border-gradient shadow-neon-strong"
          >
            <div
              className="relative h-52 md:h-72"
              style={{ background: item.cover }}
            >
              <div className="absolute inset-0 grid-bg opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute top-4 left-6 right-6 flex items-center justify-between">
                <span className="rounded-full glass px-3 py-1 text-[11px] uppercase tracking-widest text-white/90">
                  {item.industry}
                </span>
                <button
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full glass text-white hover:shadow-neon"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs uppercase tracking-widest text-neon-200">
                  {item.client}
                </p>
                <h3
                  id="project-title"
                  className="mt-1 font-display text-2xl md:text-3xl font-semibold text-white"
                >
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <p className="text-white/70 leading-relaxed">{item.overview}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {item.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl glass border-gradient p-4 text-center"
                  >
                    <p className="font-display text-2xl font-semibold text-gradient">
                      {m.value}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-white/50">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-widest text-white/50 mb-3">
                  Technology stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full glass px-3 py-1 text-sm text-white/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-white/40">
                  Case study reference. Some details modified for
                  confidentiality.
                </p>
                <div className="flex gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-white hover:shadow-neon transition-all"
                  >
                    Discuss a similar project
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
