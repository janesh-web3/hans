import type { CSSProperties } from "react";
import { motion } from "framer-motion";

interface HeroTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  /** Seconds before the first word starts revealing. */
  delay?: number;
  /** Seconds between each word's reveal. */
  wordStagger?: number;
  as?: "h1" | "span" | "div";
}

/**
 * Staggered word-by-word reveal for hero headlines — each word slides up out
 * of a clipped mask on mount.
 */
export function HeroText({
  text,
  className,
  style,
  delay = 0,
  wordStagger = 0.09,
  as = "span",
}: HeroTextProps) {
  const Tag = as;
  const words = text.split(" ");

  return (
    <Tag className={className} style={style}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-top pb-1 mr-[0.28em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.65, delay: delay + i * wordStagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
