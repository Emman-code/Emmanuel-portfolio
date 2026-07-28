import { useState } from "react";
import { FAQS } from "../lib/data";
import { Reveal } from "./ui/Reveal";
import { SectionHead } from "./ui/atoms";
import { cn } from "../utils/cn";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto grid w-[min(92%,78rem)] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHead
            index="07"
            eyebrow="FAQ"
            title="Questions you might"
            accent="be wondering."
            copy="Straight answers about who I am, what I've built, and how I like to work — so we can skip ahead to the interesting part."
          />

          <Reveal delay={220} className="mt-10">
            <div className="rounded-3xl neu p-6">
              <p className="text-[13.5px] font-medium text-ash-100">Still not answered?</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ash-400">
                Send the question directly — I reply to every genuine message, usually the same day.
              </p>
              <a
                href="#contact"
                className="group mt-5 inline-flex items-center gap-2 text-[12.5px] font-medium text-bronze-300"
              >
                Ask me anything
                <span className="relative h-px w-8 overflow-hidden bg-bronze-400/30">
                  <span className="absolute inset-0 -translate-x-full bg-bronze-300 transition-transform duration-600 group-hover:translate-x-0" />
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="space-y-2.5">
            {FAQS.map((f, i) => {
              const on = open === i;
              return (
                <Reveal key={f.q} delay={i * 60}>
                  <div
                    className={cn(
                      "group overflow-hidden rounded-2xl transition-all duration-600 ease-[cubic-bezier(.16,1,.3,1)]",
                      on ? "glass" : "neu hover:-translate-y-0.5"
                    )}
                  >
                    <h3>
                      <button
                        onClick={() => setOpen(on ? null : i)}
                        aria-expanded={on}
                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                      >
                        <span className="flex items-start gap-4">
                          <span
                            className={cn(
                              "mt-[3px] font-mono text-[10.5px] tabnum transition-colors duration-400",
                              on ? "text-bronze-300" : "text-ink-500"
                            )}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "text-[14.5px] font-medium leading-snug transition-colors duration-400",
                              on ? "text-white" : "text-ash-200 group-hover:text-white"
                            )}
                          >
                            {f.q}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "relative grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-500",
                            on ? "rotate-180 bg-bronze-400/14 text-bronze-200" : "neu-inset text-ash-400"
                          )}
                        >
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div
                      className="grid transition-all duration-600 ease-[cubic-bezier(.16,1,.3,1)]"
                      style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 pl-[3.6rem] text-[13.5px] leading-[1.8] text-ash-400">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
