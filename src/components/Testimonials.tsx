import { useEffect, useState } from "react";
import { TESTIMONIALS } from "../lib/data";
import { Reveal } from "./ui/Reveal";
import { SectionHead } from "./ui/atoms";
import { cn } from "../utils/cn";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  const t = TESTIMONIALS[i];

  return (
    <section className="relative z-10 py-24 sm:py-28">
      <div className="mx-auto w-[min(92%,78rem)]">
        <SectionHead
          index="06"
          eyebrow="Reflections"
          title="In my own"
          accent="words."
          align="center"
        />

        <Reveal delay={140} dir="scale" className="mt-14">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] glass aurora-ring px-7 py-11 sm:px-14 sm:py-14"
          >
            <div className="pointer-events-none absolute -left-14 -top-14 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(176,141,87,.14),transparent_65%)] blur-2xl" />
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(91,113,133,.16),transparent_65%)] blur-2xl" />

            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="mx-auto h-9 w-9 text-bronze-400/35"
              fill="currentColor"
            >
              <path d="M9.5 5C6.5 6.6 4.7 9.6 4.7 13.2c0 3.3 1.9 5.8 4.7 5.8 2.2 0 3.9-1.6 3.9-3.8 0-2.1-1.5-3.7-3.5-3.7-.4 0-.8.1-1 .2.4-1.9 2-3.6 4-4.6zm9.3 0c-3 1.6-4.8 4.6-4.8 8.2 0 3.3 1.9 5.8 4.7 5.8 2.2 0 3.9-1.6 3.9-3.8 0-2.1-1.5-3.7-3.5-3.7-.4 0-.8.1-1 .2.4-1.9 2-3.6 4-4.6z" />
            </svg>

            <div key={i} className="animate-[riseIn_.8s_cubic-bezier(.16,1,.3,1)_both]">
              <blockquote className="mt-7 text-center text-[clamp(1.05rem,2.3vw,1.5rem)] font-light leading-[1.6] text-ash-100">
                “{t.quote}”
              </blockquote>

              <figcaption className="mt-9 flex items-center justify-center gap-3.5">
                <span className="grid h-11 w-11 place-items-center rounded-full neu text-[12.5px] font-semibold tracking-wide text-bronze-300">
                  {t.initials}
                </span>
                <span className="text-left">
                  <span className="block text-[13.5px] font-semibold text-white">{t.name}</span>
                  <span className="block text-[11.5px] text-ash-400">{t.role}</span>
                </span>
              </figcaption>
            </div>

            {/* controls */}
            <div className="mt-9 flex items-center justify-center gap-2.5">
              {TESTIMONIALS.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Show reference ${k + 1}`}
                  aria-current={k === i}
                  className="group relative h-8 px-1"
                >
                  <span
                    className={cn(
                      "block h-1 rounded-full transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
                      k === i ? "w-10 bg-bronze-400 shadow-[0_0_10px_rgba(200,168,121,.7)]" : "w-4 bg-ink-500 group-hover:bg-ash-400"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
