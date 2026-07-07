import { useEffect, useRef } from "react";

/**
 * Attach subtle magnetic-attraction behavior to an element on hover.
 * Returns a ref you place on the target.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;
    let current = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };

    const step = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      if (
        Math.abs(target.x - current.x) > 0.1 ||
        Math.abs(target.y - current.y) > 0.1
      ) {
        raf = requestAnimationFrame(step);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.x = (e.clientX - cx) * strength;
      target.y = (e.clientY - cy) * strength;
      if (!raf) raf = requestAnimationFrame(step);
    };

    const onLeave = () => {
      target = { x: 0, y: 0 };
      if (!raf) raf = requestAnimationFrame(step);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength]);

  return ref;
}
