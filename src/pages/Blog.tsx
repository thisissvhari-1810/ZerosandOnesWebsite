import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, Calendar, Clock } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { POSTS } from "@/data/blog";
import { CtaSection } from "@/components/sections/CtaSection";
import { formatDate } from "@/lib/utils";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useSeo } from "@/hooks/useSeo";

export default function Blog() {
  useSeo({
    title: "Blog",
    description:
      "Deep dives on cloud, DevOps, AI, data engineering and cyber security from the Zeros & Ones engineering team.",
  });

  const categories = useMemo(() => {
    const set = new Set(POSTS.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const [category, setCategory] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return POSTS.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (q.trim()) {
        const needle = q.toLowerCase();
        return (
          p.title.toLowerCase().includes(needle) ||
          p.excerpt.toLowerCase().includes(needle)
        );
      }
      return true;
    });
  }, [category, q]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <PageHeader
        eyebrow="Signal · The Blog"
        title={
          <>
            Ideas, patterns and{" "}
            <span className="text-gradient">field notes</span> from the front
            lines
          </>
        }
        description="Deep, opinionated writing from the engineers who ship the work. No content-mill posts, no vendor puffery."
      />

      <section className="pb-8">
        <div className="container-wide flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              placeholder="Search posts…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-full glass pl-11 pr-4 py-3 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-neon-400"
              aria-label="Search posts"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={
                  "rounded-full px-4 py-2 text-sm font-medium transition-all " +
                  (category === c
                    ? "bg-gradient-to-r from-neon-500 to-accent-cyan text-white shadow-neon"
                    : "glass text-white/70 hover:text-white")
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {featured && (
        <section className="py-6">
          <div className="container-wide">
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group grid gap-8 overflow-hidden rounded-3xl glass border-gradient p-6 md:p-8 lg:grid-cols-2 transition-shadow duration-500 hover:shadow-neon"
            >
              <div
                className={cn(
                  "relative min-h-[240px] rounded-2xl overflow-hidden bg-gradient-to-br",
                  featured.accent
                )}
              >
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-widest text-white">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs uppercase tracking-widest text-neon-200">
                  {featured.category}
                </p>
                <h2 className="mt-3 font-display text-2xl md:text-3xl font-semibold text-white group-hover:text-gradient transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-3 text-white/60 leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-white/50">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(featured.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {featured.readingTime}
                  </span>
                  <span>by {featured.author}</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-neon-200 group-hover:text-white transition-colors">
                  Read the post
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.a>
          </div>
        </section>
      )}

      <section className="py-16 md:py-20">
        <div className="container-wide">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((p) => (
              <motion.a
                key={p.slug}
                href="#"
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl glass border-gradient transition-shadow duration-500 hover:shadow-neon"
              >
                <div
                  className={cn(
                    "relative h-36 bg-gradient-to-br",
                    p.accent
                  )}
                >
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full glass px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-white">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-white group-hover:text-gradient transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-3 flex-1">
                    {p.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-xs text-white/50">
                    <span>{formatDate(p.date)}</span>
                    <span>{p.readingTime}</span>
                  </div>
                </div>
              </motion.a>
            ))}
            {rest.length === 0 && (
              <p className="col-span-full rounded-2xl glass p-6 text-center text-white/60">
                No posts match your filters yet.
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
