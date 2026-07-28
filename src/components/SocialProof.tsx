import { LOGOS, STATS } from "../lib/data";
import { useCountUp, useInView } from "../lib/hooks";
import { Reveal } from "./ui/Reveal";

function Stat({ s, i }: { s: (typeof STATS)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const v = useCountUp(s.value, inView, 1700 + i * 130);
  const decimals = (s as { decimals?: number }).decimals ?? 0;

  return (
    <div
      ref={ref}
      className="group relative flex-1 px-6 py-8 transition-colors duration-500 sm:px-8 sm:py-10"
      style={{ transitionDelay: `${i * 70}ms` }}
    >
      <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-bronze-400/70 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(220px_circle_at_50%_100%,rgba(200,168,121,.08),transparent_70%)]" />
      <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink-500">0{i + 1}</p>
      <p className="tabnum mt-3 text-[clamp(2rem,4.4vw,2.9rem)] font-semibold leading-none text-gradient">
        {v.toFixed(decimals)}
        <span className="text-bronze-400">{s.suffix}</span>
      </p>
      <p className="mt-3 text-[13px] font-medium leading-snug text-ash-200">{s.label}</p>
      <p className="mt-1 text-[11.5px] text-ink-500">{s.sub}</p>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="relative z-10 py-16 sm:py-20">
      <div className="mx-auto w-[min(92%,78rem)]">
        <Reveal>
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.36em] text-ink-500">
            Experience &amp; contributions with
          </p>
        </Reveal>

        {/* dual-direction logo marquees */}
        <Reveal delay={100} className="mt-7 space-y-3">
          <div className="mask-fade-x flex overflow-hidden">
            <div className="flex shrink-0 animate-[marquee_36s_linear_infinite] items-center gap-14 pr-14">
              {[...LOGOS, ...LOGOS].map((l, i) => (
                <span
                  key={`a-${l}-${i}`}
                  className="shrink-0 text-[19px] font-semibold tracking-tight text-ink-500 transition-all duration-500 hover:text-ash-100 sm:text-[22px]"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="mask-fade-x flex overflow-hidden opacity-55">
            <div className="flex shrink-0 animate-[marqueeRev_46s_linear_infinite] items-center gap-14 pr-14">
              {[...LOGOS].reverse().concat([...LOGOS].reverse()).map((l, i) => (
                <span
                  key={`b-${l}-${i}`}
                  className="shrink-0 text-[15px] font-medium tracking-tight text-ink-600 transition-colors duration-500 hover:text-ash-300"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* stat slab */}
        <Reveal delay={160} dir="scale" className="mt-14">
          <div className="relative overflow-hidden rounded-[2rem] glass">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="grid grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
              {STATS.map((s, i) => (
                <div key={s.label} className={i > 0 ? "lg:border-l lg:border-white/[0.06]" : ""}>
                  <Stat s={s} i={i} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
