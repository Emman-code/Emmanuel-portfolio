import { useEffect, useRef, useState } from "react";
import { PROFILE, SOCIALS, TOOLS } from "../lib/data";
import { usePointer } from "../lib/hooks";
import { GhostButton, PrimaryButton } from "./ui/atoms";
import { cn } from "../utils/cn";

const ROLES = ["ML Engineer", "LLM & NLP Specialist", "MLOps Practitioner", "Applied Researcher"];

const ORBIT_CHIPS = [
  { label: "PyTorch", deg: 0 },
  { label: "LLMs", deg: 60 },
  { label: "Ray", deg: 120 },
  { label: "CUDA", deg: 180 },
  { label: "Spark", deg: 240 },
  { label: "MLflow", deg: 300 },
];

function useTypewriter(words: string[]) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = words[i % words.length];
    const speed = del ? 34 : 68;
    const t = setTimeout(() => {
      const next = del ? full.slice(0, txt.length - 1) : full.slice(0, txt.length + 1);
      setTxt(next);
      if (!del && next === full) setTimeout(() => setDel(true), 1700);
      if (del && next === "") {
        setDel(false);
        setI((v) => v + 1);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [txt, del, i, words]);

  return txt;
}

export default function Hero() {
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const typed = useTypewriter(ROLES);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!tiltRef.current) return;
        const px = (e.clientX / window.innerWidth - 0.5) * 2;
        const py = (e.clientY / window.innerHeight - 0.5) * 2;
        tiltRef.current.style.transform = `rotateY(${px * 6}deg) rotateX(${-py * 5}deg)`;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const rise = (d: number) =>
    ({
      opacity: mounted ? 1 : 0,
      transform: mounted ? "none" : "translateY(28px)",
      filter: mounted ? "blur(0)" : "blur(8px)",
      transition: "opacity 1s cubic-bezier(.16,1,.3,1), transform 1.1s cubic-bezier(.16,1,.3,1), filter 1s ease",
      transitionDelay: `${d}ms`,
    }) as const;

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-24">
      {/* ---------- side rail: socials ---------- */}
      <div
        className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 lg:block"
        style={rise(900)}
      >
        <div className="flex flex-col items-center gap-3.5">
          <span className="mb-1 h-12 w-px bg-gradient-to-b from-transparent to-bronze-400/50" />
          {SOCIALS.map((s, i) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              title={s.label}
              className="group pointer-events-auto relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-ash-200 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-bronze-400/45 hover:bg-bronze-400/10 hover:text-bronze-200"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d={s.icon} />
              </svg>
              {/* label tooltip */}
              <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg border border-white/10 bg-ink-900/90 px-2.5 py-1 text-[10.5px] font-medium text-ash-100 opacity-0 shadow-lg backdrop-blur-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-1">
                {s.label}
              </span>
            </a>
          ))}
          <span className="mt-1 h-12 w-px bg-gradient-to-t from-transparent to-bronze-400/50" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute right-7 top-1/2 hidden -translate-y-1/2 rotate-90 origin-right xl:block"
        style={rise(1000)}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-ink-500">
          {PROFILE.location}
        </span>
      </div>

      <div className="relative z-10 mx-auto grid w-[min(92%,78rem)] grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* ================= LEFT — kinetic type ================= */}
        <div className="order-2 lg:order-1 pt-4">
          <h1 className="text-[clamp(2.7rem,7.4vw,5.4rem)] font-semibold leading-[0.93] tracking-[-0.045em]">
            <span className="block">
              <span className="block pb-[0.06em] text-ash-100" style={rise(180)}>
                {PROFILE.first}
              </span>
            </span>
            <span className="block">
              <span className="block pb-[0.06em] text-gradient" style={rise(280)}>
                {PROFILE.last}
              </span>
            </span>
            <span className="mt-2 block">
              <span
                className="block font-serif-accent font-light italic text-[clamp(1.2rem,2.8vw,2.05rem)] leading-[1.3] tracking-[-0.01em] text-ash-400"
                style={rise(380)}
              >
                — building the{" "}
                <span className="relative inline-block text-bronze-300">
                  unreasonably good
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    height="7"
                    viewBox="0 0 200 7"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      d="M1 4.2C42 1.6 92 1 199 3.3"
                      fill="none"
                      stroke="url(#ug)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="ug" x1="0" x2="1">
                        <stop offset="0%" stopColor="#8a6a3d" stopOpacity="0" />
                        <stop offset="45%" stopColor="#dcc4a0" />
                        <stop offset="100%" stopColor="#7d94a8" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </span>
            </span>
          </h1>

          {/* typewriter role line */}
          <div style={rise(470)} className="mt-7 flex items-center gap-3 font-mono text-[12.5px] sm:text-[13px]">
            <span className="text-ink-500">const</span>
            <span className="text-steel-300">role</span>
            <span className="text-ink-500">=</span>
            <span className="rounded-md border border-white/6 bg-white/[0.03] px-2.5 py-1 text-bronze-300 backdrop-blur">
              "{typed}
              <span className="ml-px inline-block h-3.5 w-[2px] translate-y-[2px] bg-bronze-300 animate-[blink_1.15s_step-end_infinite]" />"
            </span>
          </div>

          <p style={rise(560)} className="mt-6 max-w-xl text-[15px] leading-[1.75] text-ash-400">
            A B.Tech AI &amp; ML student who loves turning messy data into models that actually ship — from EDA
            and feature engineering to training, evaluation, and deploying real, usable apps.
          </p>

          <div style={rise(650)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="/EMMANUEL_RESUME_N2.pdf"
              target="_blank"
              rel="noreferrer"
              download="EMMANUEL_JOSHUA_RESUME.pdf"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-bronze-300 via-bronze-400 to-bronze-500 px-6 py-3.5 text-[13px] font-semibold text-[#1c130a] shadow-[0_12px_28px_-10px_rgba(200,168,121,0.6)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-12px_rgba(200,168,121,0.8)]"
            >
              Download résumé
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v13m0 0 4.5-4.5M12 16l-4.5-4.5M4 20h16" />
              </svg>
            </a>
            <GhostButton href="#work">
              Explore selected work
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h13m0 0-5-5m5 5-5 5" />
              </svg>
            </GhostButton>
          </div>

          <div style={rise(740)} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] uppercase tracking-[0.16em] text-ink-500">
            <span className="font-mono">{PROFILE.resumeNote}</span>
            <span className="hidden h-3 w-px bg-white/8 sm:block" />
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-steel-400 animate-[ticker_2.4s_ease-in-out_infinite]" />
Usually replies same day
            </span>
          </div>
        </div>

        {/* ================= RIGHT — portrait reactor ================= */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div
            className="relative aspect-[3/3.6] w-[min(86vw,25rem)] sm:w-[min(70vw,26.5rem)] lg:w-[min(38vw,29rem)]"
            style={{
              ...rise(240),
              perspective: "1400px",
            }}
          >
            {/* ambient bloom */}
            <div className="absolute -inset-16 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(176,141,87,.20),transparent_62%)] blur-2xl" />
            <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_62%_70%,rgba(91,113,133,.20),transparent_60%)] blur-2xl" />

            <div
              ref={tiltRef}
              className="relative h-full w-full transition-transform duration-300 ease-out"
              style={{
                transform: "rotateY(0deg) rotateX(0deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* ---- rotating dashed rings ---- */}
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[124%] w-[124%] -translate-x-1/2 -translate-y-1/2">
                <svg viewBox="0 0 400 400" className="h-full w-full animate-[orbit_44s_linear_infinite]">
                  <circle cx="200" cy="200" r="188" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="1" strokeDasharray="2 9" />
                  <circle cx="200" cy="200" r="164" fill="none" stroke="rgba(200,168,121,.16)" strokeWidth="1" strokeDasharray="42 14 6 14" />
                </svg>
              </div>
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[108%] w-[108%] -translate-x-1/2 -translate-y-1/2">
                <svg viewBox="0 0 400 400" className="h-full w-full animate-[orbitRev_30s_linear_infinite]">
                  <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(125,148,168,.18)" strokeWidth="1" strokeDasharray="1 12" />
                </svg>
              </div>

              {/* ---- orbiting tech chips ---- */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2 sm:block"
              >
                <div className="relative h-full w-full animate-[orbit_34s_linear_infinite]">
                  {ORBIT_CHIPS.map((c) => (
                    <span
                      key={c.label}
                      className="absolute left-1/2 top-1/2 h-0 w-0"
                      style={{ transform: `rotate(${c.deg}deg) translateY(-8.6rem)` }}
                    >
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="block animate-[orbitRev_34s_linear_infinite]">
                          <span className="block whitespace-nowrap rounded-lg border border-white/10 bg-ink-850/75 px-2.5 py-1 font-mono text-[9.5px] tracking-wider text-ash-300 backdrop-blur-md shadow-[0_8px_24px_-10px_rgba(0,0,0,.9)]">
                            {c.label}
                          </span>
                        </span>
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* ---- the arch frame ---- */}
              <div
                data-ondark
                className="group relative z-10 h-full w-full overflow-hidden rounded-t-[999px] rounded-b-[2.2rem] hairline border border-white/10"
                style={{
                  transform: "translateZ(38px)",
                  background: "linear-gradient(165deg, var(--bg-850), var(--bg-900))",
                  boxShadow:
                    "0 40px 100px -30px rgba(15,23,42,var(--glass-shadow-a)), inset 0 1px 0 rgba(255,255,255,.2)",
                }}
              >
                {/* blueprint interior */}
                <div className="absolute inset-0 bg-dots opacity-[0.35]" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(176,141,87,.22),transparent_70%)]" />

                {/* concentric halo behind subject */}
                <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bronze-400/12"
                      style={{ width: `${11 + i * 5}rem`, height: `${11 + i * 5}rem` }}
                    />
                  ))}
                </div>

                {/* portrait — clean, bright, unmasked in light mode */}
                <img
                  src="/images/portrait.png"
                  alt={`${PROFILE.name}, ${PROFILE.role}`}
                  className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]"
                  style={{
                    filter: "contrast(1.04) brightness(1.02)",
                  }}
                />

                {/* duotone wash — dark theme only */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bronze-600/20 via-transparent to-steel-500/10 mix-blend-color dark:block hidden" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent dark:block hidden" />

                {/* scanline sweep */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[9%] bg-[linear-gradient(to_bottom,transparent,rgba(220,196,160,.13),transparent)] animate-[sweepY_7s_linear_infinite]" />

                {/* horizontal micro-lines */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(255,255,255,.5) 0 1px, transparent 1px 4px)",
                  }}
                />

                {/* HUD corner brackets */}
                {[
                  "left-4 bottom-4 border-l border-b rounded-bl-lg",
                  "right-4 bottom-4 border-r border-b rounded-br-lg",
                ].map((c) => (
                  <span key={c} className={cn("pointer-events-none absolute h-8 w-8 border-bronze-400/35", c)} />
                ))}

                {/* name plate */}
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <div className="rounded-2xl border border-slate-900/10 dark:border-white/12 bg-white/95 dark:bg-ink-950/90 px-3.5 py-2.5 backdrop-blur-xl shadow-xl">
                    <p className="text-[13px] font-bold leading-tight text-slate-900 dark:text-white">{PROFILE.name}</p>
                    <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-bronze-700 dark:text-bronze-400 font-semibold">
                      {PROFILE.role}
                    </p>
                  </div>
                  <div className="hidden rounded-2xl border border-slate-900/10 dark:border-white/12 bg-white/95 dark:bg-ink-950/90 px-3 py-2 text-right backdrop-blur-xl sm:block shadow-xl">
                    <p className="tabnum text-[15px] font-bold leading-none text-slate-900 dark:text-white">B.Tech</p>
                    <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.18em] text-slate-600 dark:text-ash-400 font-semibold">AI &amp; ML</p>
                  </div>
                </div>
              </div>

            </div>

            {/* ---- floating glass cards ---- */}
            <div className="absolute -right-3 top-[40%] z-40 hidden animate-[bob_8.5s_ease-in-out_0.9s_infinite] sm:block lg:-right-12">
              <div className="rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/95 dark:bg-ink-950/80 px-3.5 py-3 backdrop-blur-xl shadow-xl">
                <p className="text-[9.5px] uppercase tracking-[0.16em] text-slate-600 dark:text-ash-400 font-semibold">projects shipped</p>
                <p className="tabnum mt-1 text-[17px] font-bold leading-none text-slate-900 dark:text-white">
                  7<span className="text-bronze-600 dark:text-bronze-400">+</span>
                </p>
                <div className="mt-2 flex items-end gap-[3px]">
                  {[40, 62, 48, 80, 66, 94, 74].map((h, i) => (
                    <span
                      key={i}
                      className="w-[3px] rounded-full bg-gradient-to-t from-bronze-600/40 to-bronze-400"
                      style={{ height: `${h * 0.22}px`, animation: `ticker ${2 + i * 0.22}s ease-in-out infinite` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -left-4 bottom-[8%] z-40 hidden animate-[bob_9.5s_ease-in-out_0.4s_infinite] lg:block lg:-left-16">
              <div className="flex items-center gap-2.5 rounded-full border border-slate-900/10 dark:border-white/10 bg-white/95 dark:bg-ink-950/80 py-2 pl-2 pr-4 backdrop-blur-xl shadow-xl">
                <span className="flex -space-x-2">
                  {["X", "V", "I"].map((l) => (
                    <span
                      key={l}
                      className="grid h-6 w-6 place-items-center rounded-full border border-bronze-300/40 bg-gradient-to-br from-bronze-400 to-bronze-600 text-[9px] font-bold text-white shadow-sm"
                    >
                      {l}
                    </span>
                  ))}
                </span>
                <span className="text-[10.5px] leading-tight text-slate-700 dark:text-ash-300 font-medium">
                  <span className="font-bold text-slate-900 dark:text-ash-100">3 internships</span> done
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- tool marquee (silky smooth 120 FPS hardware accelerated) ---------- */}
      <div className="relative z-10 mt-16 lg:mt-14" style={rise(880)}>
        <div className="mask-fade-x flex overflow-hidden border-y border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-white/[0.015] py-3.5 transform-gpu will-change-transform">
          <div className="flex shrink-0 animate-[marquee_42s_linear_infinite] items-center gap-10 pr-10 transform-gpu">
            {[...TOOLS, ...TOOLS].map((t, i) => (
              <span key={`${t}-${i}`} className="flex shrink-0 items-center gap-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-700 dark:text-ash-300 font-semibold transition-colors duration-300 hover:text-bronze-600 dark:hover:text-bronze-300">
                  {t}
                </span>
                <span className="h-1 w-1 rotate-45 bg-slate-400 dark:bg-ink-600" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- scroll cue ---------- */}
      <div className="relative z-10 mt-12 flex justify-center" style={rise(980)}>
        <a href="#about" className="group flex flex-col items-center gap-2.5" aria-label="Scroll to about">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.34em] text-ink-500 transition-colors duration-300 group-hover:text-bronze-300">
            Scroll to explore
          </span>
          <span className="relative flex h-10 w-6 justify-center overflow-hidden rounded-full border border-white/12 bg-white/[0.02] pt-2 transition-colors duration-300 group-hover:border-bronze-400/40">
            <span className="h-2 w-1 rounded-full bg-bronze-400 animate-[scrollDot_1.9s_ease-in-out_infinite]" />
          </span>
        </a>
      </div>
    </section>
  );
}
