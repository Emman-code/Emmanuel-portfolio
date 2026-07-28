import type { ElementType, ReactNode } from "react";
import { useInView } from "../../lib/hooks";
import { cn } from "../../utils/cn";

type Dir = "up" | "left" | "right" | "scale";

const dirClass: Record<Dir, string> = {
  up: "",
  left: "reveal-l",
  right: "reveal-r",
  scale: "reveal-s",
};

export function Reveal({
  children,
  className,
  delay = 0,
  dir = "up",
  as: Tag = "div",
  threshold = 0.15,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  dir?: Dir;
  as?: ElementType;
  threshold?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });
  return (
    <Tag
      ref={ref}
      className={cn("reveal", dirClass[dir], inView && "is-in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Splits a string into per-word spans that rise in sequence. */
export function RevealWords({
  text,
  className,
  wordClass,
  delay = 0,
  step = 55,
}: {
  text: string;
  className?: string;
  wordClass?: string;
  delay?: number;
  step?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.2 });
  return (
    <span ref={ref} className={cn("inline", className)}>
      {text.split(" ").map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
          <span
            className={cn(
              "inline-block will-change-transform",
              wordClass,
              inView ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"
            )}
            style={{
              transition: "transform 1s cubic-bezier(.16,1,.3,1), opacity .8s ease",
              transitionDelay: `${delay + i * step}ms`,
            }}
          >
            {w}
          </span>
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  );
}
