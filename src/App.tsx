import { useEffect, useRef, useState } from "react";
import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import { useMediaQuery } from "./lib/hooks";
import { ThemeProvider } from "./lib/theme";

/* Soft cursor spotlight — desktop / fine-pointer only */
function CursorGlow() {
  const fine = useMediaQuery("(pointer: fine)");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!fine) return;
    let raf = 0;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };

    let running = false;

    const startLoop = () => {
      if (running) return;
      running = true;
      const loop = () => {
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        pos.x += dx * 0.15;
        pos.y += dy * 0.15;
        if (ref.current) ref.current.style.transform = `translate3d(${pos.x - 220}px, ${pos.y - 220}px, 0)`;
        
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          raf = requestAnimationFrame(loop);
        } else {
          running = false;
        }
      };
      raf = requestAnimationFrame(loop);
    };

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      startLoop();
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [fine]);

  if (!fine) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[440px] w-[440px] rounded-full opacity-60 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(176,141,87,.09) 0%, rgba(91,113,133,.05) 38%, transparent 66%)",
        filter: "blur(12px)",
      }}
    />
  );
}

/* Brief cinematic curtain on first paint */
function Curtain() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 620);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] bg-ink-950 transition-opacity duration-[900ms] ease-out"
      style={{ opacity: gone ? 0 : 1 }}
    >
      <div className="grid h-full place-items-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-ink-500 shimmer-text">
          Emmanuel Joshua
        </span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

function AppShell() {
  return (
    <div className="relative min-h-screen bg-ink-950 antialiased">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-[13px] focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>

      <Curtain />
      <AmbientBackground />
      <CursorGlow />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <SocialProof />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
