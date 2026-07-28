import { useCallback, useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------
   useInView — one-shot IntersectionObserver reveal
--------------------------------------------------------------- */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string; once?: boolean } = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView } as const;
}

/* ---------------------------------------------------------------
   useScrollProgress — 0..1 document scroll
--------------------------------------------------------------- */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setY(window.scrollY);
        setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { progress, y } as const;
}

/* ---------------------------------------------------------------
   useSectionSpy — active nav section (RAF-throttled)
--------------------------------------------------------------- */
export function useSectionSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const probe = window.innerHeight * 0.35;
        let current = ids[0];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top <= probe) current = id;
        }
        setActive((prev) => (prev !== current ? current : prev));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ids]);
  return active;
}

/* ---------------------------------------------------------------
   useTilt — 3D pointer tilt + spotlight coordinates
--------------------------------------------------------------- */
export function useTilt<T extends HTMLElement = HTMLDivElement>(max = 9, scale = 1.012) {
  const ref = useRef<T | null>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.transform = `perspective(1100px) rotateX(${(0.5 - py) * max}deg) rotateY(${
        (px - 0.5) * max
      }deg) scale(${scale})`;
    },
    [max, scale]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave } as const;
}

/* ---------------------------------------------------------------
   usePointer — global normalized pointer (parallax, RAF-throttled)
--------------------------------------------------------------- */
export function usePointer() {
  const [p, setP] = useState({ x: 0, y: 0 });
  const prevRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const nx = Math.round(((e.clientX / window.innerWidth - 0.5) * 2) * 100) / 100;
        const ny = Math.round(((e.clientY / window.innerHeight - 0.5) * 2) * 100) / 100;
        if (Math.abs(nx - prevRef.current.x) > 0.04 || Math.abs(ny - prevRef.current.y) > 0.04) {
          prevRef.current = { x: nx, y: ny };
          setP({ x: nx, y: ny });
        }
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

/* ---------------------------------------------------------------
   useCountUp — animated number when in view
--------------------------------------------------------------- */
export function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

/* ---------------------------------------------------------------
   useMediaQuery
--------------------------------------------------------------- */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}
