"use client";

import { useEffect, useRef } from "react";
import { LogoPlate } from "@/components/LogoPlate";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic brand preloader.
 *
 * Defence-in-depth strategy to guarantee the overlay is ALWAYS removed:
 *
 *  Layer 1 – React useEffect (primary):
 *    After 1 s premium display, fade out & unmount via direct DOM ops.
 *    A 2.2 s hard-cap fires if the readyState check somehow stalls.
 *
 *  Layer 2 – Vanilla <script> (backstop):
 *    Runs outside React's lifecycle. If the overlay element still exists
 *    after 3 s, it force-hides and removes it from the DOM.
 *
 *  Both layers are idempotent and safe to run concurrently.
 *  Works identically on localhost and LAN IP.
 */
export function Preloader() {
  const hasRun = useRef(false);

  useEffect(() => {
    // Guard against React Strict Mode double-mount
    if (hasRun.current) return;
    hasRun.current = true;

    const overlay = document.getElementById("preloader-overlay");
    if (!overlay) return;

    // Lock scroll
    document.body.style.overflow = "hidden";

    const dismiss = () => {
      // Fade out
      overlay.style.transition =
        "opacity 500ms cubic-bezier(0.4,0,0.2,1), transform 500ms cubic-bezier(0.4,0,0.2,1)";
      overlay.style.opacity = "0";
      overlay.style.transform = "scale(0.96)";
      overlay.style.pointerEvents = "none";
      overlay.style.visibility = "hidden";

      // Restore scroll
      document.body.style.overflow = "";
      document.body.style.overflowY = "";
      document.body.classList.remove("loading-active");
      document.documentElement.classList.remove("loading-active");

      // Remove from DOM after animation completes
      setTimeout(() => {
        overlay.remove();
        ScrollTrigger.refresh();
      }, 600);
    };

    // Primary path: show for 1 s, then dismiss
    const primary = setTimeout(() => {
      if (document.readyState === "interactive" || document.readyState === "complete") {
        dismiss();
      } else {
        const onReady = () => {
          dismiss();
          window.removeEventListener("DOMContentLoaded", onReady);
          window.removeEventListener("load", onReady);
        };
        window.addEventListener("DOMContentLoaded", onReady);
        window.addEventListener("load", onReady);
      }
    }, 1000);

    // Hard cap: force dismiss at 2.2 s no matter what
    const hardCap = setTimeout(dismiss, 2200);

    return () => {
      clearTimeout(primary);
      clearTimeout(hardCap);
    };
  }, []);

  return (
    <>
      {/* The overlay element – all hiding is done via direct DOM manipulation */}
      <div
        id="preloader-overlay"
        className="preloader"
        aria-hidden="false"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "grid",
          placeItems: "center",
          background:
            "radial-gradient(1200px 600px at 50% 40%, rgba(15,43,82,0.98), rgba(5,20,41,1) 70%), #051429",
          opacity: 1,
          pointerEvents: "auto",
          visibility: "visible",
        }}
      >
        <div className="flex flex-col items-center select-none">
          <LogoPlate variant="loading" float={false} halo={true} />
          <div className="preloader__bar" />
          <div className="preloader__word">
            Boarding&nbsp;·&nbsp;Your&nbsp;Global&nbsp;Journey
          </div>
        </div>
      </div>

      {/*
        Layer 2 – Vanilla JS backstop.
        Runs independently of React. If the element still exists at 3 s,
        it is force-hidden and removed. This covers every edge case:
        hydration failure, JS exception, cross-origin HMR block, etc.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function(){
  setTimeout(function(){
    var el=document.getElementById('preloader-overlay');
    if(!el)return;
    el.style.transition='opacity .5s,transform .5s';
    el.style.opacity='0';
    el.style.transform='scale(.96)';
    el.style.pointerEvents='none';
    el.style.visibility='hidden';
    document.body.style.overflow='';
    document.body.style.overflowY='';
    document.body.classList.remove('loading-active');
    document.documentElement.classList.remove('loading-active');
    setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);},600);
  },3000);
})();
`,
        }}
      />
    </>
  );
}

export default Preloader;
