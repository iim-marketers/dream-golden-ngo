"use client";

import { useRef, useState, type ReactNode } from "react";
import { animate, motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + rise as the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? undefined : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Parent that staggers its <Reveal>-style children. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/**
 * Counts up to `value` once the number scrolls into view.
 *
 * Uses Framer's own viewport tracking (`onViewportEnter`) rather than
 * `useInView` so it fires off exactly the same observer as the bars below.
 */
export function CountUp({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [animated, setAnimated] = useState(0);
  const started = useRef(false);

  function start() {
    if (started.current || reduce) return;
    started.current = true;
    animate(0, value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setAnimated(Math.round(v)),
    });
  }

  // Reduced motion jumps straight to the final figure — no ticking.
  const shown = reduce ? value : animated;

  return (
    <motion.span
      className={className}
      viewport={{ once: true, margin: "-60px" }}
      onViewportEnter={start}
    >
      {shown.toLocaleString("en-IN")}
      {suffix}
    </motion.span>
  );
}

/** Horizontal bar that fills to `percent` on scroll — used by the transparency split. */
export function ProgressBar({
  percent,
  delay = 0,
  className,
}: {
  percent: number;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-green-900/10",
        className,
      )}
    >
      <motion.div
        className="h-full rounded-full bg-linear-to-r from-coral-500 to-coral-300"
        initial={reduce ? { width: `${percent}%` } : { width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      />
    </div>
  );
}
