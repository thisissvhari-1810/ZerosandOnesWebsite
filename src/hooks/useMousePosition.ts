import { useEffect, useState } from "react";

export interface MousePosition {
  x: number; // 0..1 normalized
  y: number; // 0..1 normalized
  rawX: number;
  rawY: number;
}

/**
 * Track the mouse across the viewport. Values are throttled via rAF and
 * exposed both as raw pixels and 0..1 normalized coordinates.
 */
export function useMousePosition() {
  const [pos, setPos] = useState<MousePosition>({
    x: 0.5,
    y: 0.5,
    rawX: 0,
    rawY: 0,
  });

  useEffect(() => {
    let raf = 0;
    let last: MousePosition | null = null;

    const onMove = (e: MouseEvent) => {
      const next: MousePosition = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        rawX: e.clientX,
        rawY: e.clientY,
      };
      last = next;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (last) setPos(last);
          raf = 0;
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return pos;
}
