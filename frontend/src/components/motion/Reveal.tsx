import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra delay before this element's own reveal starts (seconds). */
  delay?: number;
  /** Override the child animation variant (defaults to fadeUp). */
  variants?: Variants;
  as?: "div" | "section";
}

/** Fades + translates an element up into place once it scrolls into view. */
export function Reveal({ children, className, delay = 0, variants = fadeUp, as = "div" }: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Comp>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

/** Wrap a group of Reveal-style children so they cascade in sequentially. */
export function RevealGroup({ children, className }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

/** A single item inside a RevealGroup — inherits the fadeUp variant from its parent's stagger. */
export function RevealItem({ children, className }: StaggerProps) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
