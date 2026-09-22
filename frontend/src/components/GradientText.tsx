import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  /** Rendered element. Defaults to `span` so it can sit inside a heading. */
  as?: "span" | "strong" | "em";
}

/**
 * Accent gradient applied to text — the headline case for the palette's 10%.
 *
 * The gradient reads #3B82F6 -> #06B6D4 in light mode and #60A5FA -> #22D3EE
 * in dark mode, both driven by CSS variables, so it needs no `dark:` variant.
 *
 * Use it sparingly: at most one hero heading per page plus one or two section
 * titles, or a key statistic. It is not for body copy, navigation, buttons,
 * paragraphs or card content — spread across those it stops reading as a
 * highlight and the page loses its single, calm background.
 */
export function GradientText({ children, className, as = "span" }: GradientTextProps) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        "bg-gradient-to-r from-accent-gradient-start to-accent-gradient-end bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </Comp>
  );
}

export default GradientText;
