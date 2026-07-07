import { Aurora } from "./Aurora";
import { GridMesh } from "./GridMesh";
import { Stars } from "./Stars";

interface SceneBackdropProps {
  variant?: "hero" | "section";
}

/**
 * Composite: aurora + grid + stars, tuned for either a full-screen hero
 * or an interior section.
 */
export function SceneBackdrop({ variant = "section" }: SceneBackdropProps) {
  return (
    <>
      <Aurora intensity={variant === "hero" ? "strong" : "soft"} />
      <GridMesh />
      {variant === "hero" && <Stars />}
    </>
  );
}
