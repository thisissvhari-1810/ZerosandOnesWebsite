import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Briefcase, Search } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { LinkButton } from "@/components/ui/Button";
import { MagneticButton } from "@/animations/MagneticButton";
import { TiltCard } from "@/animations/TiltCard";
import { JOBS, PERKS } from "@/data/careers";
import { CtaSection } from "@/components/sections/CtaSection";
import { fadeUp, stagger } from "@/lib/motion";
import { useSeo } from "@/hooks/useSeo";

export default function Careers() {
  useSeo({
    title: "Careers",
    description:
      "Join a 380-person senior-first engineering studio building the digital fabric of ambitious enterprises.",
  });

  const teams = useMemo(() => {
    const set = new Set(JOBS.map((j) => j.team));
    return ["All", ...Array.from(set)];
  }, []);

  const [team, setTeam] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return JOBS.filter((j) => {
      if (team !== "All" && j.team !== team) return false;
      if (q.trim()) {
        const needle = q.toLowerCase();
        return (
          j.title.toLowerCase().includes(needle) ||
          j.description.toLowerCase().includes(needle) ||
          j.location.toLowerCase().includes(needle)
        );
      }
      return true;
    });
  }, [team, q]);

  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title={
          <>
            Do the{" "}
            <span className="text-gradient">best work of your career</span>
          </>
        }
        description="Senior peers. Modern stack. Real ownership. If you love building things that ship — and last — you'll feel at home here."
        actions={
          <MagneticButton>
            <LinkButton
              to="#openings"
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
            >
              See open roles
            </LinkButton>
          </MagneticButton>
        }
      />

      {/* Perks */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <SectionTitle
            eyebrow="Life at Zeros & Ones"
            title={
              <>
                An environment engineered for{" "}
                <span className="text-gradient">growth &amp; craft</span>
              </>
            }
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {PERKS.map((p) => (
              <motion.div key={p.title} variants={fadeUp} className="group">
                <TiltCard intensity={4}>
                  <div className="light-sweep relative overflow-hidden rounded-2xl glass border-gradient p-6 transition-shadow duration-500 hover:shadow-neon">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Openings */}
      <section id="openings" className="py-16 md:py-24 scroll-mt-28">
        <div className="container-wide">
          <SectionTitle
            eyebrow="Open roles"
            title={
              <>
                Find a role where{" "}
                <span className="text-gradient">you can ship</span>
              </>
            }
            description="We're always hiring senior engineers across our practices. Don't see the exact fit? Send us a note anyway."
          />

          {/* Filters */}
          <div className="mt-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="search"
                placeholder="Search roles, locations, keywords…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full rounded-full glass pl-11 pr-4 py-3 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-neon-400"
                aria-label="Search openings"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {teams.map((t) => (
                <button
                  key={t}
                  onClick={() => setTeam(t)}
                  className={
                    "rounded-full px-4 py-2 text-sm font-medium transition-all " +
                    (team === t
                      ? "bg-gradient-to-r from-neon-500 to-accent-cyan text-white shadow-neon"
                      : "glass text-white/70 hover:text-white")
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="mt-8 space-y-3">
            {filtered.length === 0 && (
              <p className="rounded-2xl glass p-6 text-center text-white/60">
                No roles match your filters — try a different search.
              </p>
            )}
            {filtered.map((j) => (
              <motion.a
                key={j.slug}
                href="#"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -3 }}
                className="group grid gap-4 rounded-2xl glass border-gradient p-6 md:grid-cols-[1fr_auto] md:items-center transition-shadow duration-500 hover:shadow-neon"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-white/50">
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5 text-neon-300" />
                      {j.team}
                    </span>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-neon-300" />
                      {j.location}
                    </span>
                    <span aria-hidden>·</span>
                    <span>{j.type}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">
                    {j.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/60">{j.description}</p>
                </div>
                <div className="flex items-center gap-2 text-neon-200 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">Apply</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
