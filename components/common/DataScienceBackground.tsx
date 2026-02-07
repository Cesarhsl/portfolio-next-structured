"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "normal" | "hub";
};

const parseHsl = (value: string) => {
  const cleaned = value.replace(/%/g, "").replace(/\s*\/\s*/g, " ").trim();
  const [h, s, l] = cleaned.split(/\s+/).map(Number);
  return { h, s, l };
};

const hslToRgba = (value: string, alpha = 1) => {
  const { h, s, l } = parseHsl(value);
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
  } else if (h >= 120 && h < 180) {
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  const to255 = (n: number) => Math.round((n + m) * 255);
  return `rgba(${to255(r)}, ${to255(g)}, ${to255(b)}, ${alpha})`;
};

const getCssVar = (name: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
};

export default function DataScienceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let nodes: Particle[] = [];
    let frame = 0;
    let tick = 0;

    let vw = 0;
    let vh = 0;

    const lowPower = (() => {
      if (typeof window === "undefined") return false;
      const dm = (navigator as any).deviceMemory as number | undefined;
      const cores = navigator.hardwareConcurrency || 0;
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      return !!reduced || (typeof dm === "number" && dm <= 4) || (cores > 0 && cores <= 4);
    })();

    const palette = () => {
      const bg = getCssVar("--background", "228 25% 6%");
      const primary = getCssVar("--primary", "252 91% 65%");
      const accent = getCssVar("--accent", "199 89% 55%");
      return {
        bg,
        primary,
        accent,
        bgSolid: hslToRgba(bg, 0.85),
        primarySoft: hslToRgba(primary, 0.08),
        accentSoft: hslToRgba(accent, 0.06),
        line: hslToRgba(primary, 0.42),
        dot: hslToRgba(accent, 0.85),
        hub: hslToRgba(primary, 0.98),
      };
    };

    const createNodes = (w: number, h: number) => {
      const isMobile = w < 768;
      const base = isMobile ? 75 : 140;
      const count = lowPower ? Math.round(base * 0.8) : base;
      const speed = isMobile ? 0.55 : 0.18;

      nodes = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        type: Math.random() > 0.85 ? "hub" : "normal",
      }));
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = w < 768 ? window.screen.height : window.innerHeight;

      if (nodes.length > 0 && Math.abs(w - vw) < 10) return;

      vw = w;
      vh = h;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (nodes.length === 0) {
        createNodes(w, h);
      } else {
        for (const n of nodes) {
          n.x = Math.min(Math.max(n.x, 0), w);
          n.y = Math.min(Math.max(n.y, 0), h);
        }
      }
    };

    const drawBackground = () => {
      ctx.clearRect(0, 0, vw, vh);
    };

    const animate = () => {
      if (lowPower) {
        tick = (tick + 1) % 2;
        if (tick === 1) {
          frame = requestAnimationFrame(animate);
          return;
        }
      }

      drawBackground();
      const colors = palette();

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0 || a.x > vw) a.vx *= -1;
        if (a.y < 0 || a.y > vh) a.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = a.type === "hub" || b.type === "hub" ? 200 : 150;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (a.type === "hub" || b.type === "hub" ? 0.68 : 0.5);
            ctx.strokeStyle = hslToRgba(getCssVar("--primary", "252 91% 65%"), alpha);
            ctx.lineWidth = a.type === "hub" || b.type === "hub" ? 1.8 : 1.35;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = n.type === "hub" ? colors.hub : colors.dot;
        ctx.arc(n.x, n.y, n.type === "hub" ? 2.3 : 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(animate);
    };

    let t: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (t) clearTimeout(t);
      t = setTimeout(resize, 250);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    resize();
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      if (t) clearTimeout(t);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10"
      style={{
        width: "100vw",
        height: "100lvh",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        filter: "blur(1.25px)",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    />
  );
}
