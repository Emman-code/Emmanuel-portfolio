import { useEffect, useRef, useState } from "react";
import { EXPERIENCE } from "../lib/data";
import { Reveal } from "./ui/Reveal";
import { GhostButton, SectionHead, SpotlightCard } from "./ui/atoms";

function useSpineProgress() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const travelled = anchor - r.top;
      setP(Math.max(0, Math.min(1, travelled / r.height)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, p } as const;
}

export default function Experience() {
  const { ref, p } = useSpineProgress();

  return (
    <section id="experience" className="relative z-10 scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-[min(92%,78rem)]">
        <SectionHead
          index="04"
          eyebrow="Experience"
          title="Four years,"
          accent="building & shipping models."
          copy="A hands-on journey across AI & ML — from exploratory data analysis and statistical modeling to building and deploying real-time deep learning services."
        />

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-16 lg:pl-24">
          {/* spine */}
          <div className="absolute left-[13px] top-2 bottom-2 w-px bg-white/[0.07] sm:left-[27px] lg:left-[43px]">
            <div
              className="w-px origin-top bg-gradient-to-b from-bronze-300 via-bronze-500 to-steel-400 shadow-[0_0_14px_rgba(200,168,121,.7)]"
              style={{ height: "100%", transform: `scaleY(${p})`, transition: "transform .18s linear" }}
            />
          </div>

          <div className="space-y-6">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.company} delay={i * 70} className="relative">
                {/* node */}
                <span className="absolute -left-10 top-7 sm:-left-16 lg:-left-24">
                  <span className="relative ml-[6px] grid h-4 w-4 place-items-center sm:ml-[20px] lg:ml-[36px]">
                    <span className="absolute h-4 w-4 rounded-full border border-bronze-400/35 animate-[pulseRing_3.4s_ease-out_infinite]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-bronze-200 to-bronze-600 shadow-[0_0_12px_rgba(200,168,121,.85)]" />
                  </span>
                </span>

                <SpotlightCard className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-[19px] font-semibold text-white sm:text-[21px]">{e.role}</h3>
                        {i === 0 && (
                          <span className="rounded-full border border-emerald-400/25 bg-emerald-400/8 px-2.5 py-0.5 text-[9.5px] font-medium uppercase tracking-[0.16em] text-emerald-300">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-ash-300">
                        <span className="font-medium text-bronze-300">{e.company}</span>
                        <span className="h-1 w-1 rounded-full bg-ink-500" />
                        <span className="text-ink-500">{e.location}</span>
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.1em] text-ash-300 backdrop-blur">
                      {e.period}
                    </span>
                  </div>

                  <p className="mt-5 max-w-2xl text-[14px] leading-[1.75] text-ash-400">{e.blurb}</p>

                  <ul className="mt-5 space-y-2.5">
                    {e.wins.map((w, k) => (
                      <li key={w} className="group/w flex items-start gap-3 text-[13.2px] leading-relaxed text-ash-300">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-bronze-400/70 transition-all duration-500 group-hover/w:rotate-[135deg] group-hover/w:bg-bronze-300"
                          style={{ transitionDelay: `${k * 30}ms` }}
                        />
                        <span className="transition-colors duration-300 group-hover/w:text-ash-100">{w}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-5">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-ash-400 transition-all duration-400 hover:-translate-y-0.5 hover:border-bronze-400/35 hover:text-bronze-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>

          {/* education terminus */}
          <Reveal delay={120} className="relative mt-6">
            <span className="absolute -left-10 top-6 sm:-left-16 lg:-left-24">
              <span className="ml-[8px] block h-2.5 w-2.5 rounded-full border border-ink-500 bg-ink-900 sm:ml-[22px] lg:ml-[38px]" />
            </span>
            <div className="rounded-3xl neu p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-500">Education</p>
                  <h3 className="mt-2 text-[16px] font-semibold text-ash-100">
                    M.Sc. Machine Learning — Savitribai Phule Pune University
                  </h3>
                  <p className="mt-1 text-[12.5px] text-ash-400">
                    2014 – 2018 · First class with distinction · Thesis on sequence models for time-series forecasting
                  </p>
                </div>
                <GhostButton href="#contact" className="px-5 py-3 text-[12.5px]">
                  Get the full CV
                </GhostButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
