"use client";

import { JaiLogo } from "@/components/Logo";

type Variant = "nav" | "hero" | "footer" | "contact" | "loading";

const plateSize: Record<Variant, string> = {
  nav: "px-3.5 py-2 rounded-xl",
  hero: "px-8 py-7 md:px-12 md:py-9 rounded-[26px]",
  footer: "px-5 py-4 rounded-2xl",
  contact: "px-7 py-5 rounded-2xl",
  loading: "px-10 py-8 rounded-[28px]",
};

const logoHeight: Record<Variant, string> = {
  nav: "h-7 md:h-8",
  hero: "h-24 md:h-32",
  footer: "h-11",
  contact: "h-14 md:h-16",
  loading: "h-20 md:h-24",
};

/**
 * Presents the official JAI lockup on a frosted-white plate with a soft gold
 * halo, rim light and shadow, plus a smooth reveal. The plate is the surface
 * that carries the "glass + gold lighting" treatment; the mark inside keeps
 * its true navy/blue colours unchanged.
 */
export function LogoPlate({
  variant = "nav",
  withWordmark = true,
  float = false,
  halo = true,
  className = "",
}: {
  variant?: Variant;
  withWordmark?: boolean;
  float?: boolean;
  halo?: boolean;
  className?: string;
}) {
  return (
    <div className={`plate-reveal relative inline-flex ${className}`}>
      {halo && <span className="logo-halo" aria-hidden="true" />}
      <div className={`logo-plate relative inline-flex items-center justify-center ${plateSize[variant]} ${float ? "plate-float" : ""}`}>
        <JaiLogo withWordmark={withWordmark} className={`${logoHeight[variant]} w-auto block`} />
      </div>
    </div>
  );
}

export default LogoPlate;
