import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TiltCard } from "@/animations/TiltCard";
import { SERVICES, type Service } from "@/data/services";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Props {
  showAll?: boolean;
  limit?: number;
}

/**
 * Asymmetric bento grid — first two services get big cinematic cards with
 * feature bullets; the rest fill compact tiles with light-sweep + tilt.
 */
export function ServicesSection({ showAll = false, limit = 10 }: Props) {
  const items = showAll ? SERVICES : SERVICES.slice(0, limit);
  const [heroA, heroB, ...rest] = items;

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-16 h-96 -z-10 bg-gradient-radial from-neon-500/[0.08] via-transparent to-transparent" />

      <div className="container-wide">
        <SectionTitle
          eyebrow="What we do"
          title={
            <>
              A full-spectrum{" "}
              <span className="text-gradient">engineering partner</span>
            </>
          }
          description="Ten deep practices, one senior team. Every card is a live studio you can actually engage with."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-16 grid gap-5 md:grid-cols-6 md:auto-rows-[200px]"
        >
          {heroA && (
            <motion.div
              variants={fadeUp}
              className="md:col-span-4 md:row-span-2"
            >
              <BentoHero service={heroA} align="left" />
            </motion.div>
          )}
          {heroB && (
            <motion.div
              variants={fadeUp}
              className="md:col-span-2 md:row-span-2"
            >
              <BentoHero service={heroB} align="stack" compact />
            </motion.div>
          )}
          {rest.map((s) => (
            <motion.div
              key={s.slug}
              variants={fadeUp}
              className="md:col-span-2 md:row-span-1"
            >
              <BentoTile service={s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BentoHero({
  service,
  align,
  compact = false,
}: {
  service: Service;
  align: "left" | "stack";
  compact?: boolean;
}) {
  return (
    <TiltCard intensity={4} className="h-full">
      <Link
        to={`/services#${service.slug}`}
        className="light-sweep group relative flex h-full flex-col overflow-hidden rounded-3xl glass border-gradient p-7 md:p-9 transition-shadow duration-500 hover:shadow-neon-strong"
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-700 bg-gradient-to-br",
            service.accent
          )}
          style={{ mixBlendMode: "overlay" }}
        />
        <div
          className={cn(
            "pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full blur-3xl bg-gradient-to-br opacity-40",
            service.accent
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full blur-3xl bg-gradient-to-br opacity-30",
            service.accent
          )}
        />

        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div
              className={cn(
                "inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-neon",
                service.accent
              )}
            >
              <service.icon className="h-6 w-6" />
            </div>
            <span className="rounded-full glass px-3 py-1 text-[10px] uppercase tracking-widest text-white/80">
              {service.title}
            </span>
          </div>

          <div className={cn("mt-auto pt-6", align === "left" && !compact && "max-w-lg")}>
            <h3 className="headline text-white text-2xl md:text-3xl">
              {service.tagline}
            </h3>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              {service.description}
            </p>
            {!compact && (
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {service.features.slice(0, 4).map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-white/75"
                  >
                    <Check className="mt-0.5 h-4 w-4 text-neon-300" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-neon-200 transition-colors group-hover:text-white">
              Explore capability
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

function BentoTile({ service }: { service: Service }) {
  return (
    <TiltCard intensity={5} className="h-full">
      <Link
        to={`/services#${service.slug}`}
        className="light-sweep group relative flex h-full flex-col overflow-hidden rounded-2xl glass border-gradient p-5 transition-all duration-500 hover:shadow-neon"
      >
        <div
          className={cn(
            "pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-30 bg-gradient-to-br",
            service.accent
          )}
        />
        <div
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-neon",
            service.accent
          )}
        >
          <service.icon className="h-4 w-4" />
        </div>
        <h3 className="mt-4 font-display text-base font-semibold text-white">
          {service.title}
        </h3>
        <p className="mt-1.5 text-xs text-white/60 leading-relaxed line-clamp-2 flex-1">
          {service.tagline}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-neon-200 group-hover:text-white transition-colors">
          Learn more
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </TiltCard>
  );
}
