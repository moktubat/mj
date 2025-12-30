"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export const useLenis = () => {
  useEffect(() => {
    // Initialize Lenis with modern options
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => t,
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      infinite: false,
      lerp: 0.1,
    });

    // RAF loop for smooth scrolling
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);
};
