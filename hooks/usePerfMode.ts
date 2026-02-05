'use client';

import { useEffect, useState } from "react";

const PERF_CLASS = "perf-mode";

const getPerfMode = () => {
  if (typeof window === "undefined") return false;

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const saveData = Boolean(connection?.saveData);
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 0;
  const hardwareConcurrency = navigator.hardwareConcurrency ?? 0;
  const lowMemory = deviceMemory > 0 && deviceMemory <= 4;
  const lowCpu = hardwareConcurrency > 0 && hardwareConcurrency <= 4;

  return prefersReducedMotion || saveData || lowMemory || lowCpu;
};

export const usePerfMode = () => {
  const [perfMode, setPerfMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setPerfMode(getPerfMode());

    update();

    mediaQuery?.addEventListener?.("change", update);
    mediaQuery?.addListener?.(update);

    const connection = (navigator as Navigator & { connection?: { addEventListener?: (event: string, cb: () => void) => void } }).connection;
    connection?.addEventListener?.("change", update);

    return () => {
      mediaQuery?.removeEventListener?.("change", update);
      mediaQuery?.removeListener?.(update);
      connection?.removeEventListener?.("change", update);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.toggle(PERF_CLASS, perfMode);
  }, [perfMode]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const updateScale = () => {
      const width = window.innerWidth;
      const widthScale = width < 640 ? 0.82 : width < 1024 ? 0.9 : 1;
      const perfScale = perfMode ? 0.78 : 1;
      const scale = Math.min(1, widthScale * perfScale);
      document.documentElement.style.setProperty("--vector-scale", scale.toString());
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, [perfMode]);

  return perfMode;
};
