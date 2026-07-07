import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Calendar } from "lucide-react";
import { NAV_LINKS } from "@/data/navigation";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";
import { MagneticButton } from "@/animations/MagneticButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScrollPosition(24);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass-nav" : "bg-transparent"
        )}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="container-wide flex h-full items-center justify-between gap-4">
          <Logo />

          <nav className="hidden xl:flex items-center gap-1 rounded-full glass px-2 py-1.5">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  )
                }
              >
                {({ isActive }) => (
                  <span className="relative z-10 inline-flex items-center">
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-neon-500/25 via-cyan-glow/20 to-electric-500/20 ring-1 ring-white/10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    {item.label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-3">
            <MagneticButton strength={0.25}>
              <LinkButton
                to="/contact"
                size="sm"
                leftIcon={<Calendar className="h-4 w-4" />}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Book Consultation
              </LinkButton>
            </MagneticButton>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass text-white"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 xl:hidden bg-background/95 backdrop-blur-xl"
            style={{ paddingTop: "var(--nav-height)" }}
          >
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="container-wide flex flex-col gap-1 pt-6 pb-10 h-full overflow-y-auto"
            >
              {NAV_LINKS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.04 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-medium transition-colors",
                        isActive
                          ? "bg-gradient-to-r from-neon-500/20 via-cyan-glow/15 to-electric-500/20 text-white ring-1 ring-white/10"
                          : "text-white/80 hover:bg-white/5"
                      )
                    }
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="h-5 w-5 text-white/40" />
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <LinkButton
                  to="/contact"
                  fullWidth
                  size="lg"
                  leftIcon={<Calendar className="h-5 w-5" />}
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Book Consultation
                </LinkButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
