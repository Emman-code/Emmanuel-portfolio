import { useEffect, useRef } from "react";
import { useTheme } from "../lib/theme";
import { cn } from "../utils/cn";

type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: 0 | 1 };

/**
 * Persistent ambient layer:
 *  - drifting aurora blobs (CSS)
 *  - fine grid + vignette
 *  - canvas constellation field that reacts to the pointer
 *  - film grain
 */
export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const light = theme === "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    const pointer = { x: -9999, y: -9999 };
    const isLight = () => document.documentElement.getAttribute("data-theme") === "light";

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.round((w * h) / 45000);
      const count = Math.max(18, Math.min(36, density));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.5 + 0.5,
        hue: (Math.random() > 0.72 ? 1 : 0) as 0 | 1,
      }));
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const draw = () => {
      if (document.hidden) {
        raf = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      const lt = isLight();
      const linkRGB = lt ? "71,85,105" : "160,172,190";
      const linkMax = lt ? 0.08 : 0.16;
      const dotSteel = lt ? "71,85,105" : "141,153,172";
      const dotBase = lt ? 0.25 : 0.42;
      const dotNear = lt ? 0.65 : 0.85;

      // links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 18000) {
            const alpha = (1 - d2 / 18000) * linkMax;
            ctx.strokeStyle = `rgba(${linkRGB},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes + pointer halo
      for (const n of nodes) {
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const dist2 = dx * dx + dy * dy;
        const near = dist2 < 36100; // 190^2

        if (near) {
          const dist = Math.sqrt(dist2);
          const a = (1 - dist / 190) * 0.34;
          ctx.strokeStyle = `rgba(176,141,87,${a})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }

        const base = n.hue === 1 ? "176,141,87" : dotSteel;
        ctx.fillStyle = `rgba(${base},${near ? dotNear : dotBase})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r * 1.7 : n.r, 0, Math.PI * 2);
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base wash (theme token) */}
      <div className="absolute inset-0 bg-ink-950 transition-colors duration-500" />

      {/* drifting aurora blobs — soft crystal gradients in light mode */}
      <div
        className="absolute -left-[18%] top-[-12%] h-[62vw] w-[62vw] rounded-full blur-3xl animate-[drift_26s_linear_infinite]"
        style={{
          background: light
            ? "radial-gradient(circle at center, rgba(176,141,87,0.12), transparent 62%)"
            : "radial-gradient(circle at center, rgba(176,141,87,0.18), transparent 62%)",
        }}
      />
      <div
        className="absolute -right-[16%] top-[22%] h-[55vw] w-[55vw] rounded-full blur-3xl animate-[drift_34s_linear_infinite_reverse]"
        style={{
          background: light
            ? "radial-gradient(circle at center, rgba(91,113,133,0.12), transparent 64%)"
            : "radial-gradient(circle at center, rgba(91,113,133,0.18), transparent 64%)",
        }}
      />
      <div
        className="absolute bottom-[-22%] left-[26%] h-[58vw] w-[58vw] rounded-full blur-3xl animate-[aurora_22s_ease-in-out_infinite]"
        style={{
          background: light
            ? "radial-gradient(circle at center, rgba(203,213,225,0.25), transparent 66%)"
            : "radial-gradient(circle at center, rgba(120,105,140,0.12), transparent 66%)",
        }}
      />
      <div
        className="absolute left-[8%] top-[46%] h-[34vw] w-[34vw] rounded-full blur-3xl animate-[drift_30s_linear_infinite]"
        style={{
          background: light
            ? "radial-gradient(circle at center, rgba(200,168,121,0.08), transparent 66%)"
            : "radial-gradient(circle at center, rgba(200,168,121,0.1), transparent 66%)",
        }}
      />

      {/* fine grid, faded */}
      <div className="absolute inset-0 bg-grid opacity-[0.4] [mask-image:radial-gradient(ellipse_88%_62%_at_50%_38%,#000_20%,transparent_82%)]" />

      {/* constellation */}
      <canvas ref={canvasRef} className={cn("absolute inset-0 h-full w-full", light ? "opacity-60" : "opacity-70")} />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: light
            ? "radial-gradient(ellipse 84% 72% at 50% 38%, transparent 40%, rgba(241,245,249,0.7) 100%)"
            : "radial-gradient(ellipse 78% 66% at 50% 44%, transparent 38%, rgba(6,7,9,0.82) 100%)",
        }}
      />
      {/* static subtle noise without full-screen repaints */}
      <div
        className="noise absolute inset-0"
        style={{ opacity: light ? 0.03 : 0.12, mixBlendMode: light ? "multiply" : "overlay" }}
      />
    </div>
  );
}
