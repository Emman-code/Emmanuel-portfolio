import { useState } from "react";
import { PROFILE } from "../lib/data";
import { Reveal } from "./ui/Reveal";
import { GhostButton, PrimaryButton, SectionHead } from "./ui/atoms";
import { cn } from "../utils/cn";

const FIELDS = [
  { id: "name", label: "Your name", type: "text", placeholder: "Priya Raghavan", half: true },
  { id: "email", label: "Work email", type: "email", placeholder: "you@company.com", half: true },
  { id: "company", label: "Company", type: "text", placeholder: "Northwind Labs", half: true },
  { id: "role", label: "Role / subject", type: "text", placeholder: "Senior ML Engineer", half: true },
];

const CHANNELS = [
  { k: "Email", v: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: "M3 7l9 6 9-6M3 7v10h18V7H3z" },
  { k: "Phone", v: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, "")}`, icon: "M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" },
  { k: "LinkedIn", v: "/in/emmanuel-joshua-ej", href: "https://linkedin.com/in/emmanuel-joshua-ej", icon: "M4 9h3v11H4zM5.5 4a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6M10 20V9h3v1.6A3.7 3.7 0 0 1 16.3 9c2.4 0 3.7 1.6 3.7 4.4V20h-3v-6c0-1.6-.6-2.5-2-2.5S13 12.5 13 14v6z" },
  { k: "GitHub", v: "/Emman-code", href: "https://github.com/Emman-code", icon: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-1-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10 10 0 0 0 12 2z" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const company = (formData.get("company") as string) || "";
    const role = (formData.get("role") as string) || "";
    const message = (formData.get("message") as string) || "";

    const mailtoSubject = encodeURIComponent(`Portfolio Message from ${name}${company ? ` (${company})` : ""}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nRole/Subject: ${role}\n\nMessage:\n${message}`
    );

    setTimeout(() => {
      window.location.href = `mailto:${PROFILE.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
      setBusy(false);
      setSent(true);
    }, 400);
  };

  return (
    <section id="contact" className="relative z-10 scroll-mt-24 py-24 sm:py-32">
      {/* ================= big CTA ================= */}
      <div className="mx-auto w-[min(92%,78rem)]">
        <Reveal dir="scale">
          <div className="relative overflow-hidden rounded-[2.25rem] glass px-7 py-16 text-center sm:px-14 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent_78%)]" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(176,141,87,.20),transparent_66%)] blur-2xl animate-[aurora_16s_ease-in-out_infinite]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze-300/45 to-transparent" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.22em] text-ash-300 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-[ticker_2.2s_ease-in-out_infinite]" />
                Open to internships · Available now
              </span>

              <h2 className="mx-auto mt-7 max-w-3xl text-[clamp(2.1rem,5.6vw,3.9rem)] font-semibold leading-[1.03]">
                Let's build something <span className="text-gradient font-serif-accent italic font-light">meaningful.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-ash-400">
                Whether you're hiring for an internship, have a project in mind, or just want to talk data and AI
                — my inbox is open and I'd love to hear from you.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <PrimaryButton
                  href="#start-conversation"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    const formEl = document.getElementById("start-conversation");
                    formEl?.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => {
                      document.getElementById("name")?.focus();
                    }, 400);
                  }}
                >
                  Say hello
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h13m0 0-5-5m5 5-5 5" />
                  </svg>
                </PrimaryButton>
                <GhostButton href={`mailto:${PROFILE.email}?subject=Résumé Request`}>
                  Download résumé (PDF)
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v13m0 0 4.5-4.5M12 16l-4.5-4.5M4 20h16" />
                  </svg>
                </GhostButton>
              </div>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500">
                <span>Usually replies same day</span>
                <span className="hidden h-3 w-px bg-white/8 sm:block" />
                <span>Open to internships</span>
                <span className="hidden h-3 w-px bg-white/8 sm:block" />
                <span>Certificates on request</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ================= form + channels ================= */}
      <div id="start-conversation" className="mx-auto mt-20 w-[min(92%,78rem)]">
        <SectionHead
          index="08"
          eyebrow="Contact"
          title="Or just send"
          accent="a message."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* form */}
          <Reveal dir="left" className="lg:col-span-7">
            <form
              onSubmit={submit}
              className="relative h-full overflow-hidden rounded-[1.75rem] glass p-7 sm:p-9"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(91,113,133,.16),transparent_66%)] blur-2xl" />

              {sent ? (
                <div className="flex min-h-[26rem] flex-col items-center justify-center text-center animate-[riseIn_.7s_cubic-bezier(.16,1,.3,1)_both]">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-400/10 text-emerald-300">
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  </span>
                  <h3 className="mt-6 text-[22px] font-semibold text-white">Message received</h3>
                  <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-ash-400">
                    Thanks for reaching out — I read every genuine message and usually reply the same day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-7 text-[12.5px] font-medium text-bronze-300 underline-offset-4 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[17px] font-semibold text-white">Start a conversation</h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                      ~40 seconds
                    </span>
                  </div>

                  <div className="mt-7 grid grid-cols-1 gap-4.5 sm:grid-cols-2">
                    {FIELDS.map((f) => (
                      <div key={f.id} className={cn("group relative", !f.half && "sm:col-span-2")}>
                        <label
                          htmlFor={f.id}
                          className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.18em] text-ash-300 transition-colors duration-300 group-focus-within:text-bronze-300"
                        >
                          {f.label}
                        </label>
                        <input
                          id={f.id}
                          name={f.id}
                          type={f.type}
                          required={f.id === "name" || f.id === "email"}
                          placeholder={f.placeholder}
                          className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[14px] text-white placeholder:text-ash-400/40 outline-none backdrop-blur-md transition-all duration-300 focus:border-bronze-400/80 focus:bg-white/[0.07] focus:shadow-[0_0_20px_rgba(200,168,121,0.18)]"
                        />
                      </div>
                    ))}

                    <div className="group sm:col-span-2">
                      <label
                        htmlFor="message"
                        className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.18em] text-ash-300 transition-colors duration-300 group-focus-within:text-bronze-300"
                      >
                        What's on your mind?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder="The role or project, what you're building, and how you think I could help…"
                        className="w-full resize-none rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[14px] leading-relaxed text-white placeholder:text-ash-400/40 outline-none backdrop-blur-md transition-all duration-300 focus:border-bronze-400/80 focus:bg-white/[0.07] focus:shadow-[0_0_20px_rgba(200,168,121,0.18)]"
                      />
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                    <p className="max-w-[17rem] text-[11.5px] leading-relaxed text-ash-400">
                      Your details stay private. No lists, no forwarding, no follow-up spam.
                    </p>
                    <PrimaryButton type="submit" className={cn(busy && "pointer-events-none opacity-80")}>
                      {busy ? "Sending…" : "Send message"}
                      {busy ? (
                        <span className="h-3.5 w-3.5 animate-[orbit_0.8s_linear_infinite] rounded-full border-2 border-ink-950/30 border-t-ink-950" />
                      ) : (
                        <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m4 4 16 8-16 8 3-8z" />
                        </svg>
                      )}
                    </PrimaryButton>
                  </div>
                </>
              )}
            </form>
          </Reveal>

          {/* channels */}
          <Reveal dir="right" delay={90} className="lg:col-span-5">
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-[1.75rem] glass p-7">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-bronze-300/90">Direct channels</p>
                <div className="mt-5 space-y-2">
                  {CHANNELS.map((c, i) => (
                    <a
                      key={c.k}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-all duration-500 hover:translate-x-1.5 hover:border-bronze-400/30 hover:bg-white/[0.06]"
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-ash-300 transition-all duration-500 group-hover:border-bronze-400/40 group-hover:text-bronze-300 group-hover:shadow-[0_0_15px_rgba(200,168,121,.25)]">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                          <path d={c.icon} />
                        </svg>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[9.5px] uppercase tracking-[0.18em] text-ash-400">{c.k}</span>
                        <span className="block truncate text-[13.5px] font-medium text-ash-100 transition-colors group-hover:text-white">{c.v}</span>
                      </span>
                      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-ash-400 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bronze-300" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative flex-1 overflow-hidden rounded-[1.75rem] glass p-7">
                <div className="pointer-events-none absolute inset-0 bg-dots opacity-25" />
                <div className="relative">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-500">Local time</p>
                  <p className="tabnum mt-3 text-[30px] font-semibold leading-none text-white">
                    {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" })}
                    <span className="ml-2 text-[13px] font-normal text-ash-400">IST</span>
                  </p>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-ash-400">
                    Based in Coimbatore, I overlap well with most of Asia, EU mornings and US evenings. Happy to
                    work async or hop on a call.
                  </p>
                  <div className="mt-6 flex items-end gap-1">
                    {Array.from({ length: 24 }).map((_, h) => {
                      const overlap = h >= 9 && h <= 21;
                      return (
                        <span
                          key={h}
                          className={cn(
                            "flex-1 rounded-sm transition-all duration-500 hover:scale-y-125",
                            overlap ? "bg-gradient-to-t from-bronze-600/50 to-bronze-300/90" : "bg-ink-600"
                          )}
                          style={{ height: overlap ? "26px" : "10px" }}
                        />
                      );
                    })}
                  </div>
                  <p className="mt-2.5 flex justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-ink-500">
                    <span>00:00</span>
                    <span className="text-bronze-400/80">core hours</span>
                    <span>23:59</span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
