import { useEffect, useMemo, useState } from "react";
import { NAV, PROFILE } from "../lib/data";
import { useScrollProgress, useSectionSpy } from "../lib/hooks";
import { cn } from "../utils/cn";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { progress, y } = useScrollProgress();
  const ids = useMemo(() => NAV.map((n) => n.id), []);
  const active = useSectionSpy(ids);
  const [open, setOpen] = useState(false);
  const scrolled = y > 24;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* progress rail */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full origin-left bg-gradient-to-r from-bronze-500 via-bronze-300 to-steel-400 shadow-[0_0_14px_rgba(200,168,121,.75)]"
          style={{ transform: `scaleX(${progress})`, transition: "transform .12s linear" }}
        />
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
          scrolled ? "pt-2.5" : "pt-5"
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-3 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
            scrolled
              ? "w-[min(96%,72rem)] glass py-2 shadow-[0_20px_60px_-30px_rgba(0,0,0,1)]"
              : "w-[min(94%,72rem)] border border-transparent py-2.5"
          )}
        >
          {/* mark — EJ monogram */}
          <a href="#home" className="group flex shrink-0 items-center gap-2.5 pl-1.5" aria-label="Home">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl neu transition-transform duration-500 group-hover:rotate-[6deg] group-hover:scale-105">
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-bronze-400/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute -left-full top-0 h-full w-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-all duration-700 group-hover:left-full" />
              <span className="relative font-display text-[14px] font-semibold leading-none tracking-tight text-bronze-200">
                E<span className="text-ash-200">J</span>
              </span>
            </span>
            <span className="hidden text-[13.5px] font-semibold tracking-tight text-ash-100 sm:block">
              {PROFILE.first}
              <span className="text-bronze-400"> </span>
              <span className="text-ash-400">{PROFILE.last}</span>
            </span>
          </a>

          {/* desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={cn(
                    "group relative block rounded-full px-3.5 py-2 text-[12.5px] font-medium tracking-tight transition-colors duration-300",
                    active === n.id ? "text-white" : "text-ash-400 hover:text-ash-100"
                  )}
                >
                  {active === n.id && (
                    <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,.09)]" />
                  )}
                  <span className="relative z-10">{n.label}</span>
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-transparent via-bronze-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* actions */}
          <div className="flex items-center gap-2 pr-1">
            <ThemeToggle className="hidden sm:grid" />
            <a
              href="#contact"
              className="group relative hidden overflow-hidden rounded-full bg-gradient-to-b from-bronze-300 to-bronze-500 px-5 py-2.5 text-[12.5px] font-semibold text-[#1c130a] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-14px_rgba(200,168,121,.7)] sm:inline-flex"
            >
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(200,168,121,.8),transparent)] transition-transform duration-[1100ms] group-hover:translate-x-full" />
              <span className="relative">Hire me</span>
            </a>
            <ThemeToggle className="sm:hidden" />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full neu neu-press lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span className={cn("absolute left-0 block h-[1.5px] w-4 rounded bg-ash-100 transition-all duration-400", open ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 top-1.5 block h-[1.5px] rounded bg-ash-100 transition-all duration-300", open ? "w-0 opacity-0" : "w-4")} />
                <span className={cn("absolute left-0 block h-[1.5px] w-4 rounded bg-ash-100 transition-all duration-400", open ? "top-1.5 -rotate-45" : "top-3")} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* mobile sheet */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div
          className={cn(
            "absolute inset-x-4 top-24 rounded-3xl glass p-3 transition-all duration-600 ease-[cubic-bezier(.16,1,.3,1)]",
            open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-6 scale-95 opacity-0"
          )}
        >
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-all duration-400",
                active === n.id ? "bg-white/[0.07] text-white" : "text-ash-300 hover:bg-white/[0.04] hover:text-white"
              )}
              style={{ transitionDelay: open ? `${i * 45}ms` : "0ms" }}
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-bronze-400/70">0{i + 1}</span>
                {n.label}
              </span>
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-ash-400" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-2xl bg-gradient-to-b from-bronze-300 to-bronze-500 px-4 py-3.5 text-center text-[14px] font-semibold text-[#1c130a]"
          >
            Hire me
          </a>
        </div>
      </div>
    </>
  );
}
