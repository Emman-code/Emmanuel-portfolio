import { PROFILE } from "../lib/data";
import { Reveal } from "./ui/Reveal";
import { SectionHead, SpotlightCard } from "./ui/atoms";

const PRINCIPLES = [
  {
    t: "Data first, then models",
    d: "I explore the data before reaching for an algorithm — good EDA and honest features beat a fancy model on messy inputs every time.",
    icon: "M4 7a8 3 0 1 0 16 0A8 3 0 1 0 4 7M4 7v10a8 3 0 0 0 16 0V7",
  },
  {
    t: "Ship it, don't just train it",
    d: "A model in a notebook helps no one. I wrap mine in APIs and demos — Flask, Gradio, Hugging Face — so people can actually use them.",
    icon: "m13 2-9 12h7l-1 8 9-12h-7z",
  },
  {
    t: "Faith, integrity, purpose",
    d: "I'm a God-fearing person who believes real value isn't just analyzing data, but using it to solve problems that genuinely matter.",
    icon: "M12 3v18M5 8h14M7 21h10",
  },
];

const TIMELINE_MICRO = [
  { y: "2024", t: "Data Science @ Intellipaat" },
  { y: "2025", t: "PG in DS & AI, IIT Roorkee" },
  { y: "2025", t: "AI Engineer @ VaCaPay" },
  { y: "2026", t: "AI Intern @ Xtrafin" },
];

export default function About() {
  return (
    <section id="about" className="relative z-10 scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-[min(92%,78rem)]">
        <SectionHead
          index="01"
          eyebrow="About"
          title="Student, builder,"
          accent="and a curious mind."
          copy="I'm passionate about using data and AI to drive meaningful impact — the kind of work that turns messy numbers into decisions people can actually act on."
        />

        {/* ---------------- bento ---------------- */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
          {/* narrative */}
          <Reveal dir="left" className="md:col-span-6 lg:col-span-7">
            <SpotlightCard className="flex h-full flex-col justify-between p-7 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bronze-400/80">
                  The short version
                </span>
                <span className="h-8 w-8 shrink-0 rounded-full neu-inset" />
              </div>

              <p className="mt-6 text-[16.5px] leading-[1.75] text-ash-200">
                I'm <span className="font-medium text-white">{PROFILE.first}</span> — a Data Scientist and ML
                enthusiast currently pursuing my <span className="text-bronze-300">B.Tech in Artificial
                Intelligence &amp; Machine Learning</span> at SNS College of Technology, Coimbatore. I specialize
                in statistical modeling, machine learning, and data-driven decision-making.
              </p>
              <p className="mt-4 text-[15px] leading-[1.8] text-ash-400">
                Along the way I've interned as a Data Scientist at{" "}
                <span className="text-bronze-300">Intellipaat</span>, built a deep-learning cattle-biometric
                system at <span className="text-bronze-300">VaCaPay</span>, and contributed to an AI-powered
                School ERP at <span className="text-bronze-300">Xtrafin</span> — plus an Executive PG in Data
                Science &amp; AI from <span className="text-bronze-300">IIT Roorkee</span>. I'm always exploring
                emerging tech to stay ahead of the curve.
              </p>
              <p className="mt-4 text-[15px] leading-[1.8] text-ash-400">
                Above all, I'm a God-fearing person who believes true wisdom comes from faith, integrity, and
                purpose-driven action. The goal isn't just to analyze data — it's to harness its potential to
                shape the future.
              </p>

              {/* micro timeline */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {TIMELINE_MICRO.map((m, i) => (
                  <div
                    key={`${m.y}-${m.t}`}
                    className="group/i relative rounded-2xl neu-inset px-3.5 py-3 transition-all duration-500 hover:-translate-y-1"
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    <span className="absolute inset-x-3.5 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-bronze-400/60 to-transparent transition-transform duration-500 group-hover/i:scale-x-100" />
                    <p className="tabnum font-mono text-[11px] text-bronze-400/90">{m.y}</p>
                    <p className="mt-1.5 text-[11.5px] leading-tight text-ash-300">{m.t}</p>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          {/* right column */}
          <div className="grid gap-4 md:col-span-6 lg:col-span-5">
            {/* availability card */}
            <Reveal dir="right" delay={80}>
              <SpotlightCard className="relative overflow-hidden p-7">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,.13),transparent_65%)] blur-xl" />
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full rounded-full bg-emerald-400 opacity-70 animate-[pulseRing_2.6s_ease-out_infinite]" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-300/90">
                    Open to work
                  </span>
                </div>
                <p className="mt-4 text-[20px] font-semibold leading-snug text-white">
                  Looking for <span className="text-gradient">Data Science &amp; ML internships</span>
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ash-400">
                  On-site, hybrid, or remote — I'm keen to join a team building practical, real-world AI and keep
                  learning by shipping.
                </p>
                <dl className="mt-6 space-y-2.5 border-t border-white/[0.06] pt-5">
                  {[
                    ["Base", "Coimbatore, TN · UTC+5:30"],
                    ["Setup", "On-site · Hybrid · Remote"],
                    ["Focus", "Data Science · ML · AI"],
                    ["Studying", "B.Tech AI & ML, SNSCT"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 text-[12.5px]">
                      <dt className="font-mono uppercase tracking-[0.14em] text-ink-500">{k}</dt>
                      <dd className="text-right text-ash-200">{v}</dd>
                    </div>
                  ))}
                </dl>
              </SpotlightCard>
            </Reveal>

            {/* principles */}
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.t} dir="right" delay={140 + i * 70}>
                <SpotlightCard className="flex items-start gap-4 p-5 sm:p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl neu text-bronze-300 transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d={p.icon} />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-[14.5px] font-semibold text-ash-100">{p.t}</h3>
                    <p className="mt-1.5 text-[12.8px] leading-relaxed text-ash-400">{p.d}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
