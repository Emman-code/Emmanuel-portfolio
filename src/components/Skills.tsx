import { useState } from "react";
import { SKILL_GROUPS, TOOLS } from "../lib/data";
import { useInView } from "../lib/hooks";
import { Reveal } from "./ui/Reveal";
import { SectionHead } from "./ui/atoms";
import { cn } from "../utils/cn";

function Meter({ name, level, note, i, active }: { name: string; level: number; note: string; i: number; active: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const show = inView && active;
  return (
    <div ref={ref} className="group/m">
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[13.5px] font-medium text-ash-100 transition-colors duration-300 group-hover/m:text-white">
            {name}
          </span>
          <span className="hidden font-mono text-[10px] text-ink-500 sm:inline">{note}</span>
        </div>
        <span className="tabnum font-mono text-[11px] text-bronze-400/90">{level}</span>
      </div>
      <div className="relative mt-2.5 h-2 overflow-hidden rounded-full neu-inset">
        <div
          className="relative h-full rounded-full bg-gradient-to-r from-bronze-600 via-bronze-400 to-bronze-300"
          style={{
            width: show ? `${level}%` : "0%",
            transition: `width 1.5s cubic-bezier(.16,1,.3,1) ${i * 110}ms`,
            boxShadow: "0 0 18px rgba(200,168,121,.42)",
          }}
        >
          <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.55),transparent)] bg-[length:200%_100%] animate-[shimmer_3.2s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [tab, setTab] = useState(0);
  const group = SKILL_GROUPS[tab];

  return (
    <section id="skills" className="relative z-10 scroll-mt-24 py-24 sm:py-32">
      {/* section edge glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto w-[min(92%,78rem)]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            index="02"
            eyebrow="Capabilities"
            title="A deep stack,"
            accent="honestly rated."
            copy="No 110% bars, no logo soup. These are the tools I've shipped and supported in production — with the parts I'd happily be interviewed on called out."
          />
          <Reveal delay={200} className="shrink-0">
            <div className="rounded-2xl glass px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">Self-assessment key</p>
              <div className="mt-3 space-y-1.5 text-[11.5px] text-ash-400">
                <p><span className="tabnum text-bronze-300">90–100</span> · I set the standard here</p>
                <p><span className="tabnum text-bronze-300">80–89</span> · Production-proven, independent</p>
                <p><span className="tabnum text-bronze-300">&lt;80</span> · Working knowledge, learning fast</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* ---- tab rail ---- */}
          <Reveal dir="left" className="lg:col-span-4">
            <div
              role="tablist"
              aria-label="Skill categories"
              className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {SKILL_GROUPS.map((g, i) => {
                const on = i === tab;
                return (
                  <button
                    key={g.key}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setTab(i)}
                    className={cn(
                      "group relative flex min-w-[220px] shrink-0 items-start gap-3.5 overflow-hidden rounded-2xl p-4 text-left transition-all duration-600 ease-[cubic-bezier(.16,1,.3,1)] lg:min-w-0 lg:w-full",
                      on ? "glass translate-x-0 lg:translate-x-2" : "neu hover:-translate-y-0.5 lg:hover:translate-x-1"
                    )}
                  >
                    {on && (
                      <span className="absolute left-0 top-1/2 h-8 w-[2px] -translate-y-1/2 rounded-r bg-gradient-to-b from-bronze-300 to-bronze-600 shadow-[0_0_12px_rgba(200,168,121,.8)]" />
                    )}
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-all duration-500",
                        on ? "bg-bronze-400/12 text-bronze-300" : "neu-inset text-ash-400 group-hover:text-ash-200"
                      )}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d={g.icon} />
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className={cn("block text-[13.5px] font-semibold transition-colors", on ? "text-white" : "text-ash-200")}>
                        {g.label}
                      </span>
                      <span className="mt-1 block text-[11.5px] leading-snug text-ink-500">
                        {g.items.length} disciplines
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* ---- panel ---- */}
          <Reveal dir="right" delay={90} className="lg:col-span-8">
            <div className="relative h-full overflow-hidden rounded-[1.75rem] glass aurora-ring p-7 sm:p-9">
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(176,141,87,.14),transparent_66%)] blur-2xl" />

              <div key={group.key} className="animate-[riseIn_.7s_cubic-bezier(.16,1,.3,1)_both]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-[22px] font-semibold text-white">{group.label}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-500">
                    0{tab + 1} / 0{SKILL_GROUPS.length}
                  </span>
                </div>
                <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-ash-400">{group.blurb}</p>

                <div className="mt-8 space-y-6">
                  {group.items.map((it, i) => (
                    <Meter key={it.name} {...it} i={i} active />
                  ))}
                </div>
              </div>

              {/* toolbelt */}
              <div className="mt-9 border-t border-white/[0.06] pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-500">Daily toolbelt</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {TOOLS.slice(0, 14).map((t, i) => (
                    <span
                      key={t}
                      className="cursor-default rounded-full border border-white/8 bg-white/[0.025] px-3 py-1.5 text-[11.5px] text-ash-300 transition-all duration-400 hover:-translate-y-1 hover:border-bronze-400/40 hover:bg-bronze-400/8 hover:text-bronze-200"
                      style={{ transitionDelay: `${i * 12}ms` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
