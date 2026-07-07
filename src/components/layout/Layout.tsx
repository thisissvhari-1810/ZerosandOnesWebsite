import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 pt-[var(--nav-height)]">
        <PageTransition />
      </main>
      <Footer />
    </div>
  );
}
