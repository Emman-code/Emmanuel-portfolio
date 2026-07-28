import { useEffect, useRef, useState } from "react";
import { EXPERIENCE, PROFILE } from "../lib/data";
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
              <span className="ml-[8px] block h-2.5 w-2.5 rounded-full border border-bronze-400 bg-bronze-500 sm:ml-[22px] lg:ml-[38px]" />
            </span>
            <div className="rounded-3xl glass border border-white/10 p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.24em] text-bronze-400 dark:text-bronze-300">
                    Education &amp; Academic Background
                  </p>
                  <h3 className="mt-2 text-[17px] font-bold text-slate-900 dark:text-white">
                    B.Tech in Artificial Intelligence &amp; Machine Learning — SNS College of Technology, Coimbatore
                  </h3>
                  <p className="mt-1.5 text-[13px] text-slate-600 dark:text-ash-300">
                    2022 – 2026 · Pursuing Bachelor's Degree · Focus on AI, Machine Learning, Statistical Modeling &amp; Deep Learning
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-lg border border-bronze-400/30 bg-bronze-400/10 px-3 py-1 text-[12px] font-semibold text-bronze-700 dark:text-bronze-300">
                      Executive PG in Data Science &amp; AI — IIT Roorkee &amp; Intellipaat (2024 – 2025)
                    </span>
                  </div>
                </div>
                <a
                  href={`mailto:${PROFILE.email}?subject=Emmanuel%20Joshua%20-%20R%C3%A9sum%C3%A9%20Request`}
                  className="group relative inline-flex items-center gap-2 rounded-full border border-slate-900/10 dark:border-white/10 bg-slate-900 dark:bg-white/[0.04] px-5 py-3 text-[12.5px] font-semibold text-white dark:text-ash-100 backdrop-blur-xl transition-all duration-300 hover:border-bronze-400/40 hover:bg-slate-800 dark:hover:bg-white/[0.08]"
                >
                  Request Full Résumé (PDF)
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v13m0 0 4.5-4.5M12 16l-4.5-4.5M4 20h16" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
