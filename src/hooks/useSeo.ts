import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description?: string;
}

const DEFAULT_TITLE =
  "Zeros & Ones — Premium IT Solutions & Cloud Engineering";
const DEFAULT_DESCRIPTION =
  "Zeros & Ones is a global IT solutions company delivering cloud, DevOps, AI, data engineering and cyber security to ambitious enterprises.";

export function useSeo({ title, description }: SeoOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} — Zeros & Ones` : DEFAULT_TITLE;

    const meta =
      document.querySelector<HTMLMetaElement>('meta[name="description"]') ??
      (() => {
        const el = document.createElement("meta");
        el.name = "description";
        document.head.appendChild(el);
        return el;
      })();
    const previousDescription = meta.content;
    meta.content = description ?? DEFAULT_DESCRIPTION;

    return () => {
      document.title = previousTitle;
      meta.content = previousDescription;
    };
  }, [title, description]);
}
