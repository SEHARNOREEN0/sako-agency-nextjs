"use client";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: any;
    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    });
    return () => lenis?.destroy();
  }, []);
  return null;
}
