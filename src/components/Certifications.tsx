import { CERTS } from "../lib/data";
import { Reveal } from "./ui/Reveal";
import { SectionHead, SpotlightCard } from "./ui/atoms";

export default function Certifications() {
  return (
    <section id="certs" className="relative z-10 scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto w-[min(92%,78rem)]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            index="05"
            eyebrow="Credentials"
            title="Always learning,"
            accent="certified along the way."
            copy="A snapshot of my continuous learning — 16 certifications and counting, from an Executive PG at IIT Roorkee to hands-on programs with IBM, AWS and Intellipaat."
          />
          <Reveal delay={160}>
            <div className="rounded-2xl glass px-5 py-4 text-center">
              <p className="tabnum text-[28px] font-semibold leading-none text-gradient">16</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                certifications
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 80} dir="up">
              <SpotlightCard className="flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl neu text-bronze-300 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                      <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
                    </svg>
                  </span>
                  <span className="shrink-0 rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[9.5px] tracking-[0.1em] text-ash-300 backdrop-blur">
                    {c.date}
                  </span>
                </div>

                <h3 className="mt-5 text-[15px] font-semibold leading-snug text-white">{c.title}</h3>
                <p className="mt-1.5 text-[12px] font-medium text-bronze-300">{c.issuer}</p>
                <p className="mt-3 text-[12.5px] leading-relaxed text-ash-400">{c.note}</p>

                <div className="mt-auto flex items-center gap-2 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  Verified · shareable
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
