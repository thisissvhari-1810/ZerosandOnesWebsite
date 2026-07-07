import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { fadeUp, stagger } from "@/lib/motion";
import { useSeo } from "@/hooks/useSeo";
import { BRAND } from "@/data/navigation";

const OFFICES = [
  {
    city: "Bangalore",
    address: "Prestige Trade Tower, 12th floor, Palace Rd",
    country: "India",
  },
  {
    city: "London",
    address: "10 Finsbury Square, Level 5",
    country: "United Kingdom",
  },
  {
    city: "Austin",
    address: "Riverside Plaza, Suite 220",
    country: "United States",
  },
];

const CONTACTS = [
  {
    icon: Mail,
    label: "Email",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: BRAND.phone,
    href: `tel:${BRAND.phone.replace(/[^\d+]/g, "")}`,
  },
  {
    icon: MapPin,
    label: "HQ",
    value: BRAND.hq,
    href: "#offices",
  },
];

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
];

export default function Contact() {
  useSeo({
    title: "Contact",
    description:
      "Talk to a senior engineer. Book a 30-minute consultation or send us a note about your project.",
  });

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let's build something{" "}
            <span className="text-gradient">worth shipping</span>
          </>
        }
        description="Tell us a bit about your project. A senior engineer will get back to you within one business day."
      />

      <section className="pb-8">
        <div className="container-wide grid gap-8 lg:grid-cols-[1.35fr_1fr] items-start">
          <ContactForm />

          <motion.aside
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-5"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-3xl glass border-gradient p-6 md:p-8"
            >
              <h3 className="font-display text-lg font-semibold text-white">
                Talk to us directly
              </h3>
              <ul className="mt-5 space-y-4">
                {CONTACTS.map((c) => (
                  <li key={c.label} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-neon-500 via-cyan-glow to-electric-500 text-white shadow-neon">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/50">
                        {c.label}
                      </p>
                      <a
                        href={c.href}
                        className="text-white hover:text-neon-200 transition-colors"
                      >
                        {c.value}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <p className="text-xs uppercase tracking-widest text-white/50 mb-3">
                  Follow along
                </p>
                <div className="flex gap-2">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full glass text-white/80 transition-all hover:text-white hover:shadow-neon hover:-translate-y-0.5"
                    >
                      <s.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              id="offices"
              className="rounded-3xl glass border-gradient p-6 md:p-8 scroll-mt-28"
            >
              <h3 className="font-display text-lg font-semibold text-white">
                Our offices
              </h3>
              <ul className="mt-5 space-y-4">
                {OFFICES.map((o) => (
                  <li
                    key={o.city}
                    className="flex items-start justify-between gap-3 border-b border-white/[0.06] pb-4 last:border-none last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-white">{o.city}</p>
                      <p className="text-sm text-white/60">{o.address}</p>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-neon-200 whitespace-nowrap">
                      {o.country}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.aside>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl glass border-gradient">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-500/20 via-electric-500/10 to-cyan-glow/20 mix-blend-overlay" />
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
            <iframe
              title="ZerosAndOnes offices — map"
              className="relative block w-full h-[380px] md:h-[460px] grayscale contrast-125 opacity-90"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63822.15716749473!2d77.5498!3d12.9769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1712345678901!5m2!1sen!2sin"
              style={{ border: 0 }}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/80 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="absolute top-6 left-6 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-widest text-white">
              Global HQ · Bangalore
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24 md:pb-32">
        <div className="container-wide max-w-3xl">
          <h2 className="headline text-white text-2xl md:text-3xl text-center">
            Frequently asked
          </h2>
          <div className="mt-10 space-y-3">
            {[
              {
                q: "How quickly can we start?",
                a: "Most engagements begin within 2–3 weeks of a signed statement of work. For urgent needs, we can spin up a small squad in under a week.",
              },
              {
                q: "Do you work fixed-price or time & materials?",
                a: "Both. We recommend a fixed-scope discovery phase followed by iterative delivery with clear scorecards.",
              },
              {
                q: "Which regions do you operate in?",
                a: "Globally. Hubs in India, the UK and the US with follow-the-sun delivery for 24/7 engagements.",
              },
              {
                q: "Can you augment our existing team?",
                a: "Absolutely — senior engineers embedded in your squads, aligned to your working model.",
              },
            ].map((item, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl glass border-gradient p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                  <span className="font-medium text-white">{item.q}</span>
                  <span className="text-neon-300 transition-transform group-open:rotate-45 text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">
                  {item.a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
