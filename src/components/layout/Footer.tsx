import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  ArrowRight,
  MapPin,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { BRAND } from "@/data/navigation";
import { SERVICES } from "@/data/services";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter / X" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

const quickLinks = [
  { label: "About us", to: "/about" },
  { label: "Solutions", to: "/solutions" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Industries", to: "/industries" },
  { label: "Careers", to: "/careers" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const resources = [
  { label: "Case studies", to: "/portfolio" },
  { label: "Process", to: "/services#process" },
  { label: "Tech stack", to: "/services#technologies" },
  { label: "AI playbooks", to: "/blog" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "#" },
  { label: "Terms of Service", to: "#" },
  { label: "Cookies", to: "#" },
  { label: "Security", to: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] mt-24 md:mt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[540px] w-[900px] -translate-x-1/2 rounded-full bg-neon-500/[0.08] blur-3xl animate-blob" />
        <div className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-electric-500/[0.08] blur-3xl animate-blob" style={{ animationDelay: "-8s" }} />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="container-wide pt-16 md:pt-24 pb-10">
        {/* Newsletter CTA */}
        <div className="relative overflow-hidden rounded-3xl glass-strong border-gradient border-gradient-strong p-8 md:p-12 mb-16">
          <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-neon-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-electric-500/15 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs uppercase tracking-[0.22em] text-neon-200 mb-4">
                <Mail className="h-3.5 w-3.5" />
                Newsletter
              </span>
              <h3 className="headline text-white text-2xl md:text-4xl">
                Signal — a monthly brief for engineering leaders
              </h3>
              <p className="mt-3 text-white/60 text-sm md:text-base">
                Deep dives on cloud, AI and platform engineering. No fluff, no
                spam. Unsubscribe anytime.
              </p>
            </div>
            <form onSubmit={onSubscribe} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-full glass px-5 py-3 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-cyan-glow"
                  aria-invalid={!!error}
                  aria-describedby={error ? "footer-email-error" : undefined}
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-500 via-cyan-glow to-electric-500 px-6 py-3 text-sm font-medium text-white shadow-neon transition-all hover:-translate-y-0.5 hover:shadow-neon-strong"
                >
                  Subscribe
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {error && (
                <p
                  id="footer-email-error"
                  className="text-sm text-accent-pink"
                  role="alert"
                >
                  {error}
                </p>
              )}
              {subscribed && (
                <p className="inline-flex items-center gap-2 text-sm text-neon-200">
                  <CheckCircle2 className="h-4 w-4" />
                  You're on the list. Welcome to Signal.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-white/60 leading-relaxed">
              Premium IT solutions for ambitious enterprises. AI, cloud, DevOps,
              data and security — engineered by senior teams and delivered as
              outcomes.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
              <MapPin className="h-4 w-4 text-neon-300" />
              {BRAND.hq}
            </div>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full glass text-white/80 transition-all hover:text-white hover:shadow-neon hover:-translate-y-0.5"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Quick links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l.label}
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services#${s.slug}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resources.map((r) => (
                <li key={r.label}>
                  <Link
                    to={r.to}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-white hover:shadow-neon transition-all"
                >
                  Book consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Signature wordmark */}
        <div className="relative mt-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p
            aria-hidden
            className="select-none text-center headline font-black text-transparent leading-[0.9] tracking-[-0.05em] text-[18vw] md:text-[16vw]"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.08)",
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            ZerosAndOnes
          </p>
        </div>

        <div className="relative mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-white/40">
          <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-neon-500/60 to-transparent" />
          <p>
            © {new Date().getFullYear()} {BRAND.name} Technologies. All rights
            reserved. Crafted with obsession.
          </p>
          <ul className="flex flex-wrap items-center gap-4">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <a href={l.to} className="hover:text-white/80 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
