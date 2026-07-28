import { useTheme } from "../lib/theme";
import { cn } from "../utils/cn";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light mode" : "Dark mode"}
      className={cn(
        "group relative grid h-9 w-[62px] shrink-0 place-items-center overflow-hidden rounded-full border transition-all duration-500",
        dark
          ? "border-white/10 bg-black/40 shadow-inner"
          : "border-slate-300 bg-slate-100 shadow-sm",
        className
      )}
    >
      {/* knob */}
      <span
        className={cn(
          "absolute top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full transition-all duration-[550ms] ease-[cubic-bezier(.34,1.56,.64,1)]",
          dark
            ? "left-1 bg-slate-800 text-amber-300 shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-slate-700"
            : "left-[30px] bg-white text-amber-600 shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-slate-200"
        )}
      >
        {/* moon */}
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "absolute h-3.5 w-3.5 transition-all duration-400",
            dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          )}
          fill="currentColor"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
        {/* sun */}
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "absolute h-4 w-4 transition-all duration-400",
            dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </span>
    </button>
  );
}
