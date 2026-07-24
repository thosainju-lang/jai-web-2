"use client";

import { useEffect, useState } from "react";
import { LogoPlate } from "@/components/LogoPlate";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic brand preloader: the official lockup resolves on a frosted plate
 * over the navy stage, with a gold sweep bar, then the curtain lifts.
 */
export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    // Block scroll while preloading
    document.body.style.overflow = "hidden";
    
    const t1 = window.setTimeout(() => setHidden(true), 1700);
    const t2 = window.setTimeout(() => {
      setGone(true);
      // Re-enable scroll when preloader disappears
      document.body.style.overflow = prev;
      // Refresh ScrollTrigger to ensure all markers are correct after overflow is restored
      setTimeout(() => ScrollTrigger.refresh(), 50);
    }, 2550);
    
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      // Also restore on unmount (e.g. strict mode or HMR)
      document.body.style.overflow = prev;
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`preloader ${hidden ? "is-hidden" : ""}`} aria-hidden={hidden}>
      <div className="flex flex-col items-center">
        <LogoPlate variant="loading" float={false} halo={true} />
        <div className="preloader__bar" />
        <div className="preloader__word">Boarding&nbsp;·&nbsp;Your&nbsp;Global&nbsp;Journey</div>
      </div>
    </div>
  );
}

export default Preloader;
