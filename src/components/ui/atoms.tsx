import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Reveal } from "./Reveal";

/** Magnetic pull + local spotlight coordinates for buttons. */
function useMagnetic<T extends HTMLElement>(strength = 0.22) {
  const ref = useRef<T | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      const clamp = (n: number) => Math.max(-9, Math.min(9, n));
      el.style.transform = `translate(${clamp((x - r.width / 2) * strength)}px, ${clamp(
        (y - r.height / 2) * strength
      )}px)`;
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  return { ref, onMouseMove, onMouseLeave } as const;
}

/* ---------------- Eyebrow / chip ---------------- */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.035] px-3.5 py-1.5",
        "text-[10.5px] font-medium uppercase tracking-[0.22em] text-ash-300 backdrop-blur-xl",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-bronze-400 opacity-70 animate-[pulseRing_3s_ease-out_infinite]" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bronze-400" />
      </span>
      {children}
    </span>
  );
}

/* ---------------- Section header ---------------- */
export function SectionHead({
  index,
  eyebrow,
  title,
  accent,
  copy,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="font-mono text-[11px] tracking-[0.3em] text-bronze-400/80">{index}</span>
          <span className="h-px w-8 bg-gradient-to-r from-bronze-400/60 to-transparent" />
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="mt-5 text-[clamp(2rem,5.2vw,3.5rem)] font-semibold leading-[1.04]">
          {title} {accent && <span className="text-gradient font-serif-accent italic font-light">{accent}</span>}
        </h2>
      </Reveal>
      {copy && (
        <Reveal delay={170}>
          <p className={cn("mt-5 text-[15px] leading-relaxed text-ash-400", align === "center" && "mx-auto")}>
            {copy}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- Buttons ---------------- */
export function PrimaryButton({
  children,
  href,
  className,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const inner = (
    <>
      <span className="absolute inset-0 bg-gradient-to-b from-bronze-300 to-bronze-500 transition-transform duration-[850ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]" />
      <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.6),transparent)] transition-transform duration-[1100ms] ease-out group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center gap-2 font-semibold text-[#1c130a]">{children}</span>
    </>
  );
  const mag = useMagnetic<HTMLElement>(0.2);
  const cls = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5",
    "text-[13.5px] font-semibold tracking-tight shadow-[0_16px_40px_-16px_rgba(176,141,87,.55)]",
    "transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] active:scale-[.97] will-change-transform",
    className
  );
  return href ? (
    <a
      href={href}
      className={cls}
      ref={mag.ref as React.Ref<HTMLAnchorElement>}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
    >
      {inner}
    </a>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={cls}
      ref={mag.ref as React.Ref<HTMLButtonElement>}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
    >
      {inner}
    </button>
  );
}

export function GhostButton({
  children,
  href,
  className,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  const mag = useMagnetic<HTMLElement>(0.14);
  const cls = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full",
    "border border-white/10 bg-white/[0.03] px-7 py-3.5 text-[13.5px] font-medium text-ash-100 backdrop-blur-xl",
    "transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] will-change-transform active:scale-[.97]",
    "hover:border-bronze-400/35 hover:bg-white/[0.06] hover:text-white",
    className
  );
  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(150px_80px_at_var(--mx,50%)_var(--my,50%),rgba(200,168,121,.2),transparent_70%)]" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );
  return href ? (
    <a
      href={href}
      className={cls}
      ref={mag.ref as React.Ref<HTMLAnchorElement>}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
    >
      {inner}
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={cls}
      ref={mag.ref as React.Ref<HTMLButtonElement>}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
    >
      {inner}
    </button>
  );
}

/* ---------------- Spotlight card shell ---------------- */
export function SpotlightCard({
  children,
  className,
  radius = "rounded-3xl",
}: {
  children: ReactNode;
  className?: string;
  radius?: string;
}) {
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={cn(
        "group relative overflow-hidden glass lift",
        radius,
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(340px_circle_at_var(--mx)_var(--my),rgba(200,168,121,.10),transparent_66%)]" />
      {children}
    </div>
  );
}
