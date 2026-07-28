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
        "group relative grid h-9 w-[62px] shrink-0 place-items-center overflow-hidden rounded-full",
        "neu neu-press transition-all duration-500",
        className
      )}
    >
      {/* twilight track wash */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full opacity-70 transition-opacity duration-700"
        style={{
          background: dark
            ? "radial-gradient(120% 120% at 78% 50%, rgba(91,113,133,.28), transparent 60%)"
            : "radial-gradient(120% 120% at 22% 50%, rgba(200,168,121,.45), transparent 62%)",
        }}
      />

      {/* faint stars (dark) */}
      <span
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          dark ? "opacity-100" : "opacity-0"
        )}
      >
        {[
          [14, 11],
          [22, 20],
          [30, 9],
        ].map(([x, y], i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-ash-200"
            style={{ left: x, top: y, animation: `ticker ${1.8 + i * 0.4}s ease-in-out infinite` }}
          />
        ))}
      </span>

      {/* knob */}
      <span
        className={cn(
          "absolute top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full transition-all duration-[550ms] ease-[cubic-bezier(.34,1.56,.64,1)]",
          dark
            ? "left-1 bg-gradient-to-br from-ink-600 to-ink-800 text-ash-100 shadow-[0_4px_10px_rgba(0,0,0,.5)]"
            : "left-[30px] bg-gradient-to-br from-white to-bronze-300 text-bronze-600 shadow-[0_4px_12px_rgba(176,141,87,.55)]"
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
