import { PROJECTS, type Project } from "../lib/data";
import { useTilt } from "../lib/hooks";
import { Reveal } from "./ui/Reveal";
import { GhostButton, SectionHead } from "./ui/atoms";
import { cn } from "../utils/cn";

function ProjectRow({ p, i }: { p: Project; i: number }) {
  const tilt = useTilt<HTMLDivElement>(7, 1.015);
  const flip = i % 2 === 1;

  return (
    <div className="group relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
      {/* ---- visual ---- */}
      <Reveal
        dir={flip ? "right" : "left"}
        className={cn("lg:col-span-7", flip && "lg:order-2")}
      >
        <div style={{ perspective: "1200px" }}>
          <div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className="relative overflow-hidden rounded-[1.75rem] glass transition-transform duration-500 ease-out"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <span className="flex gap-1.5">
                {["#3a3f49", "#3a3f49", "#3a3f49"].map((c, k) => (
                  <span key={k} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
                ))}
              </span>
              <span className="ml-2 flex-1 truncate rounded-md bg-ink-900/70 px-2.5 py-1 font-mono text-[9.5px] text-ink-500">
{p.id}.emmanueljoshua.dev
              </span>
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink-500 sm:block">
                {p.year}
              </span>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={p.image}
                alt={`${p.name} interface`}
                loading="lazy"
                className="h-full w-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
                style={{ filter: "saturate(.82) contrast(1.05)" }}
              />
              <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-tr opacity-70 mix-blend-soft-light", p.accent)} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />

              {/* hover metric overlay */}
              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap gap-2 opacity-0 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] translate-y-3 group-hover:translate-y-0 group-hover:opacity-100">
                {p.impact.map((m, k) => (
                  <span
                    key={m.k}
                    className="rounded-xl border border-white/10 bg-ink-950/70 px-3 py-2 backdrop-blur-xl"
                    style={{ transitionDelay: `${k * 80}ms` }}
                  >
                    <span className="block font-mono text-[8.5px] uppercase tracking-[0.16em] text-ash-400">{m.k}</span>
                    <span className="tabnum mt-0.5 block text-[13px] font-semibold text-bronze-200">{m.v}</span>
                  </span>
                ))}
              </div>

              {/* sheen */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,.09)_50%,transparent_65%)] transition-transform duration-[1400ms] ease-out group-hover:translate-x-full" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---- copy ---- */}
      <Reveal dir={flip ? "left" : "right"} delay={110} className={cn("lg:col-span-5", flip && "lg:order-1")}>
        <div className="relative">
          <span className="pointer-events-none absolute -top-14 left-0 select-none text-[6.5rem] font-semibold leading-none text-etch opacity-30 sm:-top-16 sm:text-[8rem]">
            0{i + 1}
          </span>

          <div className="relative">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-bronze-400/22 bg-bronze-400/8 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-bronze-300">
                {p.category}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">{p.year}</span>
            </div>

            <h3 className="mt-4 text-[clamp(1.65rem,3.4vw,2.35rem)] font-semibold leading-tight text-white">
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 group-hover:bg-[length:100%_1px]">
                {p.name}
              </span>
            </h3>

            <p className="mt-4 text-[14.5px] leading-[1.75] text-ash-400">{p.summary}</p>

            {/* impact grid */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              {p.impact.map((m, k) => (
                <div
                  key={m.k}
                  className="rounded-2xl neu-inset px-3 py-3 transition-transform duration-500 hover:-translate-y-1"
                  style={{ transitionDelay: `${k * 45}ms` }}
                >
                  <p className="tabnum text-[15px] font-semibold leading-none text-bronze-200">{m.v}</p>
                  <p className="mt-1.5 text-[9.5px] uppercase leading-tight tracking-[0.12em] text-ink-500">{m.k}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[10.5px] text-ash-400 transition-colors duration-300 hover:border-white/20 hover:text-ash-100"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-7">
              <GhostButton href="#contact" className="px-5 py-3 text-[12.5px]">
                Read the case study
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </GhostButton>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative z-10 scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-[min(92%,78rem)]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            index="03"
            eyebrow="Selected work"
            title="Three products,"
            accent="measurable outcomes."
            copy="I've picked the work where the impact is easiest to verify — real users, real numbers, real trade-offs I can walk you through line by line."
          />
          <Reveal delay={180}>
            <GhostButton href="#contact">
              Full portfolio &amp; case studies
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h13m0 0-5-5m5 5-5 5" />
              </svg>
            </GhostButton>
          </Reveal>
        </div>

        <div className="mt-20 space-y-28 sm:space-y-32">
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
