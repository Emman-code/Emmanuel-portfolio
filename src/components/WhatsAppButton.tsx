import { useEffect, useState } from "react";
import { PROFILE } from "../lib/data";
import { cn } from "../utils/cn";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const message = encodeURIComponent(
    "Hi Emmanuel! I came across your portfolio and would love to connect."
  );
  const href = `${PROFILE.whatsapp}?text=${message}`;

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] sm:bottom-6 sm:right-6",
        mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      {/* hover / tap chat bubble */}
      <div
        className={cn(
          "origin-bottom-right transition-all duration-400 ease-[cubic-bezier(.16,1,.3,1)]",
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
        )}
      >
        <div data-ondark className="relative max-w-[15rem] rounded-2xl rounded-br-md glass p-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,.7)]">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-ash-400 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366]/15 text-[#25D366]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4z" /><path d="M20.5 3.5A11 11 0 0 0 3.2 17L2 22l5.1-1.3A11 11 0 1 0 20.5 3.5zM12 20.1c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A9 9 0 1 1 12 20.1z" fillRule="evenodd" clipRule="evenodd" /></svg>
            </span>
            <div>
              <p className="text-[12.5px] font-semibold text-white">Emmanuel Joshua</p>
              <p className="text-[10.5px] text-emerald-300">Typically replies fast</p>
            </div>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-ash-300">
            Hi there 👋 Want to chat about a role, project, or just say hello?
          </p>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-[12.5px] font-semibold text-[#04220f] transition-transform duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            Start chat
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13m0 0-5-5m5 5-5 5" /></svg>
          </a>
        </div>
      </div>

      {/* main FAB */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Contact on WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-[0_14px_36px_-8px_rgba(37,211,102,.6)] transition-all duration-500 hover:scale-105 active:scale-95"
      >
        {/* pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-[pulseRing_2.6s_ease-out_infinite]" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-[pulseRing_2.6s_ease-out_infinite_1.3s]" />
        <svg viewBox="0 0 24 24" className="relative h-7 w-7 text-white transition-transform duration-500 group-hover:rotate-[8deg]" fill="currentColor">
          <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4z" />
          <path d="M20.5 3.5A11 11 0 0 0 3.2 17L2 22l5.1-1.3A11 11 0 1 0 20.5 3.5zM12 20.1c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A9 9 0 1 1 12 20.1z" fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
