import { NAV, PROFILE, SOCIALS as SOCIAL_LINKS } from "../lib/data";
import { Reveal } from "./ui/Reveal";

const SOCIALS = SOCIAL_LINKS.map((s) => ({ l: s.label, h: s.href }));

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/[0.06] pt-20">
      {/* giant wordmark */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-2 select-none overflow-hidden">
        <p className="whitespace-nowrap text-center text-[clamp(4rem,17vw,15rem)] font-semibold leading-[0.78] tracking-[-0.05em] text-etch opacity-[0.14]">
          {PROFILE.name.toUpperCase()}
        </p>
      </div>

      <div className="relative mx-auto w-[min(92%,78rem)]">
        <div className="grid grid-cols-2 gap-10 pb-24 sm:grid-cols-4 lg:grid-cols-12">
          <Reveal className="col-span-2 lg:col-span-5">
            <a href="#home" className="group inline-flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl neu transition-transform duration-500 group-hover:rotate-[8deg]">
                <span className="font-display text-[15px] font-semibold leading-none tracking-tight text-bronze-200">
                  E<span className="text-ash-200">J</span>
                </span>
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-ash-100">
                {PROFILE.first}
                <span className="text-bronze-400"> </span>
                <span className="text-ash-400">{PROFILE.last}</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-ash-400">
              {PROFILE.tagline} Currently a B.Tech AI &amp; ML student, open to Data Science and Machine
              Learning internships from Coimbatore, India.
            </p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="group mt-6 inline-flex items-center gap-2 text-[13.5px] font-medium text-ash-100"
            >
              {PROFILE.email}
              <span className="relative block h-px w-6 overflow-hidden bg-white/15">
                <span className="absolute inset-0 -translate-x-full bg-bronze-300 transition-transform duration-600 group-hover:translate-x-0" />
              </span>
            </a>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-2 lg:col-start-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-500">Navigate</p>
            <ul className="mt-5 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="group inline-flex items-center gap-2 text-[13px] text-ash-400 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-bronze-400 transition-all duration-400 group-hover:w-3" />
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-500">Elsewhere</p>
            <ul className="mt-5 space-y-2.5">
              {SOCIALS.map((s) => (
                <li key={s.l}>
                  <a
                    href={s.h}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-[13px] text-ash-400 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-bronze-400 transition-all duration-400 group-hover:w-3" />
                    {s.l}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="col-span-2 lg:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-500">Status</p>
            <div className="mt-5 rounded-2xl glass p-5">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute h-full w-full rounded-full bg-emerald-400 opacity-70 animate-[pulseRing_2.8s_ease-out_infinite]" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[12px] font-medium text-emerald-300/90">Open to opportunities</span>
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-ash-400">
                Actively looking for Data Science &amp; ML internships. Available to start immediately.
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full neu-inset">
                <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-bronze-600 to-bronze-300" />
              </div>
              <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-500">
                Ready to contribute
              </p>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-7 sm:flex-row">
          <p className="text-[11.5px] text-ink-500">
            © {new Date().getFullYear()} {PROFILE.name}. Designed &amp; built from scratch — no templates.
          </p>
          <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
            <span>React 19</span>
            <span className="h-1 w-1 rotate-45 bg-ink-600" />
            <span>Tailwind v4</span>
            <span className="h-1 w-1 rotate-45 bg-ink-600" />
            <a href="#home" className="transition-colors hover:text-bronze-300">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
