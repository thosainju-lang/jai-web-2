"use client";

import React, { useEffect, useRef, useState } from "react";
import { LanguageProvider, useLang } from "@/components/LanguageProvider";
import { LogoPlate } from "@/components/LogoPlate";
import { Preloader } from "@/components/Preloader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe, Phone, Mail, MapPin, MessageCircle, ArrowRight, ArrowUpRight,
  Plane, Compass, Users, Shield, Sparkles, Star, ChevronDown,
  GraduationCap, Briefcase, Ticket, Landmark, Building2,
  Hotel, FileText, Heart, Globe2, Calendar, CheckCircle2,
  Menu, X, ExternalLink,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/*  Ambient layers                                                            */
/* -------------------------------------------------------------------------- */

function StarField({ count = 34 }: { count?: number }) {
  const stars = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        top: (i * 53) % 100,
        left: (i * 89 + 7) % 100,
        size: (i % 3) + 1,
        delay: (i % 7) * 0.6,
        dur: 3 + (i % 5),
      })),
    [count],
  );
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="twinkle absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

function RouteMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 500" className={className} fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g stroke="rgba(200,162,76,0.22)" strokeWidth="1">
        <path d="M80 380 C 300 180, 520 180, 720 300" />
        <path d="M720 300 C 880 380, 1020 300, 1120 140" />
        <path d="M160 120 C 380 260, 620 120, 880 220" />
        <path d="M260 440 C 460 320, 700 420, 980 360" />
      </g>
      <path className="route-dash" d="M80 380 C 300 180, 520 180, 720 300 C 880 380, 1020 300, 1120 140" stroke="#E8C677" strokeWidth="1.5" />
      <g fill="#E8C677">
        {[[80, 380], [720, 300], [1120, 140], [160, 120], [880, 220], [260, 440], [980, 360]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.2" />
        ))}
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                    */
/* -------------------------------------------------------------------------- */

function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home", label: t.nav.home },
    { href: "#services", label: t.nav.services },
    { href: "#hajj", label: t.nav.hajj },
    { href: "#about", label: t.nav.about },
    { href: "#journey", label: t.journey.badge },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-[1400px] px-4 md:px-6 transition-all duration-500 ${scrolled ? "backdrop-blur-2xl bg-[#06142b]/80 border border-white/10 rounded-full shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]" : ""}`}>
        <div className="flex items-center justify-between py-2.5">
          <a href="#home" aria-label="Jahangirnagar Air International — home">
            <LogoPlate variant="nav" halo={false} />
          </a>

          <div className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-[13px] font-medium tracking-wide text-white/65 hover:text-white transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-[#c8a24c] transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-3.5 py-2 rounded-full text-[11px] font-semibold tracking-widest text-[#E8C677] border border-[#c8a24c]/30 hover:border-[#c8a24c]/70 hover:text-white transition-colors"
            >
              {lang === "en" ? "বাং" : "EN"}
            </button>
            <a href="#contact" className="hidden md:inline-flex btn-primary !py-2.5 !px-5 !text-[13px]">
              <Phone className="w-3.5 h-3.5" /> {t.contact.call}
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-2" aria-label="Menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden backdrop-blur-2xl bg-[#06142b]/95 border border-white/10 rounded-2xl p-4 mb-3 space-y-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block py-2.5 px-2 text-white/80 hover:text-[#E8C677] border-b border-white/5 last:border-0">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero — editorial, asymmetric (NOT a centred trio)                         */
/* -------------------------------------------------------------------------- */

function Hero() {
  const { t, lang } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 14, scale: 1.08,
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });
      gsap.to(leftRef.current, {
        y: -90, opacity: 0.2,
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "70% top", scrub: 1 },
      });
      gsap.to(plateRef.current, {
        y: -40,
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });

      gsap.from(".h-eyebrow", { y: 20, opacity: 0, duration: 0.9, delay: 0.25 });
      gsap.from(".h-line", { y: 40, opacity: 0, duration: 1.1, delay: 0.45, stagger: 0.08 });
      gsap.from(".h-body", { y: 24, opacity: 0, duration: 1, delay: 0.95 });
      gsap.from(".h-cta > *", { y: 20, opacity: 0, duration: 0.9, delay: 1.1, stagger: 0.12 });
      gsap.from(".h-meta > *", { y: 16, opacity: 0, duration: 0.8, delay: 1.4, stagger: 0.1 });
      gsap.from(".h-plate", { y: 40, opacity: 0, scale: 0.96, duration: 1.3, delay: 0.7, ease: "power3.out" });
      gsap.from(".h-chip", { y: 20, opacity: 0, duration: 0.9, delay: 1.3, stagger: 0.15 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const italic = lang === "en";

  return (
    <section ref={heroRef} id="home" className="relative min-h-[100svh] overflow-hidden bg-[#051429]">
      {/* cabin image, right-bleed, masked into the navy */}
      <div ref={bgRef} className="absolute top-0 right-0 h-[120%] -top-[10%] w-full md:w-[64%] will-change-transform">
        <img
          src="/images/jai-hero-global-sky.jpg"
          alt="Cinematic high-altitude sky and Earth horizon"
          className="w-full h-full object-cover object-center opacity-80"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 22%, black 55%)",
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 22%, black 55%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051429] via-transparent to-[#051429]/70" />
      </div>

      {/* left navy wash so editorial text always reads */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#051429] via-[#051429]/85 md:via-[#051429]/55 to-transparent" />
      <StarField count={26} />
      <RouteMap className="absolute inset-0 w-full h-full opacity-[0.18] hidden md:block" />

      {/* content grid */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 min-h-[100svh] flex items-center pt-28 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          {/* LEFT — editorial column */}
          <div ref={leftRef} className="lg:col-span-7 max-w-2xl">
            <div className="h-eyebrow flex items-center gap-3 mb-8 text-[11px] md:text-xs tracking-[0.32em] uppercase">
              <span className="meta-tick" />
              <span className="text-[#E8C677]">Jahangirnagar Air International</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="text-white/55">Est. Dhaka · Bangladesh</span>
            </div>

            <h1 className="font-display text-white text-[clamp(2.75rem,7vw,6.25rem)] leading-[0.92] tracking-[-0.02em]">
              <span className="h-line block font-light text-white/95">{t.hero.title}</span>
              <span className={`h-line block text-[#c8a24c] font-normal ${italic ? "italic" : ""}`}>{t.hero.accent}</span>
              <span className="h-line block font-light text-white/95">{t.hero.subtitle}</span>
            </h1>

            <div className="h-body mt-8 flex items-start gap-4 max-w-xl">
              <span className="mt-2 w-px self-stretch bg-gradient-to-b from-[#c8a24c] to-transparent" />
              <p className="text-white/70 text-[15px] md:text-base leading-relaxed font-light">{t.hero.tagline}</p>
            </div>

            <div className="h-cta mt-10 flex flex-wrap items-center gap-6">
              <a href="#services" className="btn-primary">
                {t.hero.cta1} <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="group inline-flex items-center gap-2 text-sm font-medium text-white/85 hover:text-[#E8C677] transition-colors">
                <span className="border-b border-white/20 group-hover:border-[#c8a24c] pb-0.5">{t.hero.cta2}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="h-meta mt-14 flex items-center gap-6 md:gap-8 text-white">
              {[
                { v: "15+", l: lang === "en" ? "Years" : "বছর" },
                { v: "50+", l: lang === "en" ? "Countries" : "দেশ" },
                { v: "25k+", l: lang === "en" ? "Journeys" : "যাত্রা" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-6 md:gap-8">
                  {i > 0 && <span className="w-px h-9 bg-white/15" />}
                  <div>
                    <div className="font-display text-2xl md:text-3xl text-white">{s.v}</div>
                    <div className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/45 mt-1">{s.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — brand plate composition */}
          <div ref={plateRef} className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md aspect-square flex items-center justify-center">
              {/* faint orbit arc behind plate */}
              <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-50" aria-hidden="true">
                <circle cx="200" cy="200" r="170" stroke="rgba(200,162,76,0.25)" strokeDasharray="2 7" fill="none" />
                <circle cx="200" cy="200" r="130" stroke="rgba(127,184,216,0.18)" strokeDasharray="2 9" fill="none" />
              </svg>

              <div className="h-plate">
                <LogoPlate variant="hero" float halo />
              </div>

              {/* floating flight chip */}
              <div className="h-chip absolute -top-2 -right-2 md:-right-6 glass-strong rounded-2xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#c8a24c]/15 flex items-center justify-center">
                    <Plane className="w-4 h-4 text-[#E8C677] -rotate-12" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">Now boarding</div>
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      DAC <span className="text-[#c8a24c]">→</span> JED
                    </div>
                  </div>
                </div>
              </div>

              {/* floating rating chip */}
              <div className="h-chip absolute -bottom-2 -left-2 md:-left-8 glass-strong rounded-2xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#c8a24c] text-[#c8a24c]" />)}
                </div>
                <div className="text-[11px] text-white/70"><span className="text-white font-semibold">4.9</span> · 2,400+ travellers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue, bottom-left (not centred) */}
      <div className="hidden md:flex absolute bottom-8 left-8 z-10 items-center gap-3 text-white/45">
        <span className="text-[10px] tracking-[0.4em] uppercase [writing-mode:vertical-rl] rotate-180">{t.hero.scroll}</span>
        <span className="relative w-px h-14 bg-white/15 overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-1/2 bg-[#c8a24c] animate-[preloadSweep_2.2s_ease-in-out_infinite]" style={{ animationName: "scrollDot" }} />
        </span>
      </div>
      <style>{`@keyframes scrollDot{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Welcome                                                                   */
/* -------------------------------------------------------------------------- */

function Welcome() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".welcome-reveal").forEach((el, i) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 1, delay: i * 0.08,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-28 md:py-36 overflow-hidden bg-[#06142b]">
      <StarField count={18} />
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full bg-[#c8a24c]" style={{ top: `${(i * 41) % 100}%`, left: `${(i * 67) % 100}%`, opacity: 0.25, animation: `float-slow ${8 + (i % 6)}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }} />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="welcome-reveal flex items-center justify-center gap-3 mb-8 text-[11px] tracking-[0.32em] uppercase text-[#E8C677]">
          <span className="meta-tick" /> {t.welcome.badge} <span className="meta-tick rotate-180" />
        </div>

        <h2 className="welcome-reveal section-heading text-center text-[clamp(2.25rem,5.5vw,4.5rem)]">
          <span className="text-white/90">{t.welcome.title} </span>
          <strong className="text-gradient-gold">{t.welcome.accent}</strong>
          <span className="text-white/90"> {t.welcome.subtitle}</span>
        </h2>

        <p className="welcome-reveal max-w-3xl mx-auto mt-8 text-center text-white/65 text-[15px] md:text-lg leading-relaxed font-light">
          {t.welcome.desc}
        </p>

        <div className="welcome-reveal mt-12 flex flex-wrap items-center justify-center gap-6">
          <a href="#services" className="btn-primary">{t.welcome.explore} <ArrowRight className="w-4 h-4" /></a>
          <a href="#contact" className="group inline-flex items-center gap-2 text-sm font-medium text-white/85 hover:text-[#E8C677] transition-colors">
            <span className="border-b border-white/20 group-hover:border-[#c8a24c] pb-0.5">{t.welcome.contact}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Services — varied rhythm (6-col, Hajj featured wide)                      */
/* -------------------------------------------------------------------------- */

function Services() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  const services = [
    { icon: Landmark, badge: t.services.hajj.badge, title: t.services.hajj.title, desc: t.services.hajj.desc, image: "/images/jai-hajj-haram.jpg", cta: t.services.hajj.cta, anchor: "hajj", span: "md:col-span-2 lg:col-span-3" },
    { icon: GraduationCap, badge: t.services.student.badge, title: t.services.student.title, desc: t.services.student.desc, image: "/images/jai-student-campus.jpg", cta: t.services.student.cta, anchor: "visa", span: "md:col-span-2 lg:col-span-3" },
    { icon: Globe2, badge: t.services.immigration.badge, title: t.services.immigration.title, desc: t.services.immigration.desc, image: "/images/jai-immigration-passport.jpg", cta: t.services.immigration.cta, anchor: "immigration", span: "lg:col-span-2" },
    { icon: Briefcase, badge: t.services.work.badge, title: t.services.work.title, desc: t.services.work.desc, image: "/images/jai-about-office.jpg", cta: t.services.work.cta, anchor: "work", span: "lg:col-span-2" },
    { icon: Ticket, badge: t.services.ticket.badge, title: t.services.ticket.title, desc: t.services.ticket.desc, image: "/images/jai-airport-aviation.jpg", cta: t.services.ticket.cta, anchor: "ticket", span: "lg:col-span-2" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card) => {
        gsap.from(card, {
          y: 70, opacity: 0, duration: 1,
          scrollTrigger: { trigger: card, start: "top 82%", once: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="services" className="relative py-28 md:py-36 overflow-hidden bg-[#081C3A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 text-[11px] tracking-[0.32em] uppercase text-[#E8C677]">
              <span className="meta-tick" /> {t.services.badge}
            </div>
            <h2 className="section-heading text-left text-[clamp(2.25rem,5vw,4.25rem)]">
              <span className="text-white/90">{t.services.title} </span>
              <strong className="text-gradient-gold italic">{t.services.accent}</strong>
            </h2>
          </div>
          <p className="md:max-w-sm text-white/55 text-sm leading-relaxed">{t.services.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <a key={i} href={`#${s.anchor}`} className={`service-card group relative overflow-hidden rounded-[4px] border border-white/10 card-lift flex flex-col ${s.span}`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081C3A] via-[#081C3A]/40 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-md bg-[#c8a24c] flex items-center justify-center shadow-lg shadow-black/30">
                      <Icon className="w-4 h-4 text-[#081C3A]" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8C677] drop-shadow">{s.badge}</span>
                  </div>
                </div>
                <div className="relative p-6 md:p-7 flex-1 flex flex-col">
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-white mb-2">{s.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>
                  <div className="flex items-center gap-2 text-[#E8C677] text-[13px] font-semibold tracking-wide group-hover:gap-3.5 transition-all">
                    {s.cta} <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c8a24c]/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hajj & Umrah                                                              */
/* -------------------------------------------------------------------------- */

function HajjSection() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  const services = [
    "Premium Hajj Packages", "Economy Umrah Packages", "Standard Umrah Packages",
    "Visa Processing", "Flight Booking", "Hotel Reservation",
    "Transportation", "Ziyarat", "Group Management", "Religious Guidance",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hajj-image", { scale: 1.08, opacity: 0.4, duration: 1.4, scrollTrigger: { trigger: ".hajj-image", start: "top 80%", once: true } });
      gsap.utils.toArray<HTMLElement>(".hajj-reveal").forEach((el, i) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 0.9, delay: i * 0.08, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hajj" ref={ref} className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-[#081C3A] via-[#0a2046] to-[#081C3A]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] pointer-events-none">
        <div className="w-full h-full rounded-full gradient-radial-gold opacity-25 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
          <div className="hajj-reveal">
            <div className="flex items-center gap-3 mb-6 text-[11px] tracking-[0.32em] uppercase text-[#E8C677]">
              <span className="meta-tick" /> {t.services.hajj.badge}
            </div>
            <h2 className="section-heading text-left text-[clamp(2.5rem,5.5vw,4.75rem)]">
              <span className="text-white/90">Hajj </span>
              <strong className="text-gradient-gold italic">&amp; Umrah</strong>
            </h2>
            <p className="mt-6 text-white/65 leading-relaxed max-w-lg">{t.services.hajj.desc}</p>
            <div className="mt-8 flex items-center gap-3 text-sm text-white/70">
              <Landmark className="w-4 h-4 text-[#c8a24c]" />
              <span>Makkah · Madinah · Jeddah</span>
            </div>
          </div>

          <div className="hajj-image relative">
            <div className="relative rounded-[4px] overflow-hidden aspect-[4/5] shadow-2xl border border-[#c8a24c]/20">
              <img src="/images/jai-hajj-haram.jpg" alt="Peaceful golden-dawn atmosphere at Masjid al-Haram" className="w-full h-full object-cover parallax-image" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081C3A]/85 via-transparent to-[#081C3A]/25" />
              <div className="absolute inset-3 border border-[#c8a24c]/25 pointer-events-none" />
            </div>
            <div className="absolute -bottom-7 -left-4 md:-left-7 glass-strong rounded-xl p-5 max-w-[240px] shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-md bg-[#c8a24c] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#081C3A]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Premium</div>
                  <div className="text-[11px] text-white/55">Spiritual journey</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hajj-reveal mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-display text-xl md:text-2xl text-white">{t.services.hajj.packages}</h3>
            <span className="flex-1 hairline-gold" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {services.map((s, i) => (
              <div key={i} className="border border-white/10 rounded-[3px] p-4 text-center hover:border-[#c8a24c]/40 hover:bg-white/[0.03] transition-colors">
                <CheckCircle2 className="w-4 h-4 text-[#c8a24c] mx-auto mb-2" />
                <div className="text-[13px] text-white/75 leading-snug">{s}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Other service bands                                                       */
/* -------------------------------------------------------------------------- */

function OtherService({ icon: Icon, image, badge, title, desc, cta, reverse, id }: any) {
  return (
    <section id={id} className={`relative py-24 md:py-32 overflow-hidden ${reverse ? "bg-[#06142b]" : "bg-[#081C3A]"}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className={`${reverse ? "lg:order-2" : ""}`}>
            <div className="flex items-center gap-3 mb-6 text-[11px] tracking-[0.32em] uppercase text-[#E8C677]">
              <span className="meta-tick" /> {badge}
            </div>
            <h2 className="section-heading text-left text-[clamp(2.25rem,5vw,4.25rem)]">
              <span className="text-white/90">{title.split(" ")[0]} </span>
              <strong className="text-gradient-gold italic">{title.split(" ").slice(1).join(" ")}</strong>
            </h2>
            <p className="mt-6 text-white/65 leading-relaxed max-w-lg">{desc}</p>
            <a href="#contact" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#E8C677]">
              <span className="border-b border-[#c8a24c]/40 group-hover:border-[#c8a24c] pb-0.5">{cta}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
          <div className={`relative ${reverse ? "lg:order-1" : ""}`}>
            <div className="relative rounded-[4px] overflow-hidden aspect-[16/11] shadow-2xl border border-white/10 card-lift">
              <img src={image} alt={title} className="w-full h-full object-cover parallax-image" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081C3A]/80 via-transparent to-[#081C3A]/20" />
              <div className="absolute inset-3 border border-[#c8a24c]/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-10 h-10 rounded-md bg-[#c8a24c] flex items-center justify-center shadow-lg">
                <Icon className="w-5 h-5 text-[#081C3A]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Additional services — directory grid (hairline rules)                     */
/* -------------------------------------------------------------------------- */

function AdditionalServices() {
  const { t } = useLang();
  const items = [
    { icon: Compass, label: "Travel Consultancy" },
    { icon: Plane, label: "Airport Assistance" },
    { icon: Building2, label: "Corporate Travel" },
    { icon: Globe, label: "International Tour" },
    { icon: FileText, label: "Travel Documentation" },
    { icon: FileText, label: "Visa Documentation" },
    { icon: FileText, label: "Passport Guidance" },
    { icon: Shield, label: "Travel Insurance" },
    { icon: Hotel, label: "Hotel Booking" },
    { icon: Users, label: "Family Visit Visa" },
    { icon: Briefcase, label: "Business Travel" },
    { icon: FileText, label: "Corporate Visa" },
    { icon: Users, label: "Meet & Greet" },
    { icon: MapPin, label: "Airport Pickup" },
    { icon: Calendar, label: "Travel Planning" },
    { icon: Phone, label: "Emergency Assistance" },
    { icon: FileText, label: "Document Translation" },
    { icon: Compass, label: "Travel Advisory" },
    { icon: Users, label: "Overseas Manpower" },
    { icon: Briefcase, label: "Global Career" },
  ];

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-[#06142b]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5 text-[11px] tracking-[0.32em] uppercase text-[#E8C677]">
              <span className="meta-tick" /> {t.additional.badge}
            </div>
            <h2 className="section-heading text-left text-[clamp(2rem,4.5vw,3.75rem)]">
              <span className="text-white/90">{t.additional.title} </span>
              <strong className="text-gradient-gold italic">{t.additional.accent}</strong>
            </h2>
          </div>
          <p className="md:max-w-sm text-white/50 text-sm">{t.additional.desc}</p>
        </div>

        <div className="directory grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <div key={i} className="group p-5 md:p-6 flex items-center gap-3 hover:bg-white/[0.03] transition-colors cursor-default">
                <div className="w-9 h-9 rounded-md border border-white/10 group-hover:border-[#c8a24c]/50 group-hover:bg-[#c8a24c]/10 flex items-center justify-center transition-colors flex-shrink-0">
                  <Icon className="w-4 h-4 text-white/60 group-hover:text-[#E8C677] transition-colors" />
                </div>
                <div className="text-[13px] text-white/70 group-hover:text-white transition-colors leading-snug">{it.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  About                                                                     */
/* -------------------------------------------------------------------------- */

function About() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  const stats = [
    { value: t.about.years, label: t.about.yearsLabel, icon: Star },
    { value: t.about.countries, label: t.about.countriesLabel, icon: Globe },
    { value: t.about.clients, label: t.about.clientsLabel, icon: Users },
    { value: t.about.rating, label: t.about.ratingLabel, icon: Sparkles },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.from(el, { y: 50, opacity: 0, duration: 1, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-[#081C3A] to-[#051429]">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] pointer-events-none opacity-35 lg:opacity-60">
        <img src="/images/jai-about-office.jpg" alt="" className="w-full h-full object-cover parallax-image" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081C3A] via-[#081C3A]/65 to-[#051429]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051429] via-transparent to-[#081C3A]/50" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="about-reveal">
            <div className="flex items-center gap-3 mb-6 text-[11px] tracking-[0.32em] uppercase text-[#E8C677]">
              <span className="meta-tick" /> {t.about.badge}
            </div>
            <h2 className="section-heading text-left text-[clamp(2.25rem,5vw,4.5rem)]">
              <span className="text-white/90">{t.about.title} </span>
              <strong className="text-gradient-gold italic">{t.about.accent}</strong>
            </h2>
            <p className="mt-6 text-white/65 leading-relaxed max-w-xl">{t.about.desc}</p>
          </div>

          <div className="about-reveal grid grid-cols-2 gap-3">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className={`p-7 card-lift ${i % 3 === 0 ? "panel-sharp" : "glass-strong rounded-[3px]"}`}>
                  <Icon className="w-7 h-7 text-[#c8a24c] mb-5" />
                  <div className="font-display text-4xl md:text-5xl text-white mb-2">{s.value}</div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/50">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Why choose — bento                                                        */
/* -------------------------------------------------------------------------- */

function WhyChoose() {
  const { t } = useLang();
  const icons = [Shield, Heart, Globe, Users, CheckCircle2, Compass, Sparkles, Globe2];
  const spans = [
    "lg:col-span-2 lg:row-span-2 md:col-span-2",
    "lg:col-span-1 lg:row-span-1",
    "lg:col-span-1 lg:row-span-1",
    "lg:col-span-1 lg:row-span-1",
    "lg:col-span-1 lg:row-span-1",
    "lg:col-span-2 lg:row-span-1 md:col-span-2",
    "lg:col-span-1 lg:row-span-1",
    "lg:col-span-1 lg:row-span-1",
  ];

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-[#06142b]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5 text-[11px] tracking-[0.32em] uppercase text-[#E8C677]">
              <span className="meta-tick" /> {t.why.badge}
            </div>
            <h2 className="section-heading text-left text-[clamp(2.25rem,5vw,4.25rem)]">
              <span className="text-white/90">{t.why.title} </span>
              <strong className="text-gradient-gold italic">{t.why.accent}</strong>
            </h2>
          </div>
          <p className="md:max-w-sm text-white/50 text-sm">{t.why.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[200px] gap-4">
          {t.why.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            const feature = i === 0;
            return (
              <div
                key={i}
                className={`group relative overflow-hidden card-lift ${spans[i]} ${feature ? "panel-sharp p-8 md:p-10" : "glass-strong rounded-[3px] p-7"}`}
              >
                <div className={`w-12 h-12 rounded-md flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${feature ? "bg-[#c8a24c]" : "bg-[#c8a24c]/15 border border-[#c8a24c]/30"}`}>
                  <Icon className={`w-6 h-6 ${feature ? "text-[#081C3A]" : "text-[#E8C677]"}`} />
                </div>
                <h3 className={`font-display text-white mb-3 ${feature ? "text-3xl md:text-4xl font-medium leading-tight" : "text-xl font-medium"}`}>{item.title}</h3>
                <p className={`text-white/55 leading-relaxed ${feature ? "text-base max-w-md" : "text-sm"}`}>{item.desc}</p>
                {feature && (
                  <RouteMap className="absolute -right-10 -bottom-10 w-[120%] h-[120%] opacity-20 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Journey timeline                                                          */
/* -------------------------------------------------------------------------- */

function Journey() {
  const { t } = useLang();
  return (
    <section id="journey" className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-[#051429] to-[#081C3A]">
      <RouteMap className="absolute inset-0 w-full h-full opacity-[0.12]" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-5 text-[11px] tracking-[0.32em] uppercase text-[#E8C677]">
            <span className="meta-tick" /> {t.journey.badge} <span className="meta-tick rotate-180" />
          </div>
          <h2 className="section-heading text-[clamp(2.25rem,5vw,4.5rem)]">
            <span className="text-white/90">{t.journey.title} </span>
            <strong className="text-gradient-gold italic">{t.journey.accent}</strong>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8a24c]/40 to-transparent hidden lg:block" />
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-y-8 gap-x-2 relative">
            {t.journey.steps.map((step, i) => (
              <div key={i} className="group relative flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#081C3A] border border-[#c8a24c]/50 flex items-center justify-center mb-4 shadow-[0_0_30px_-8px_rgba(200,162,76,0.6)] group-hover:bg-[#c8a24c] transition-colors relative z-10">
                  <span className="font-display text-lg text-[#E8C677] group-hover:text-[#081C3A] transition-colors">{i + 1}</span>
                </div>
                <div className="text-xs md:text-sm text-white/75 font-medium">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Testimonials — featured centre                                            */
/* -------------------------------------------------------------------------- */

function Testimonials() {
  const { t } = useLang();
  const items = [
    { name: "Mohammed Rahman", country: "Saudi Arabia", journey: "Hajj 2025", rating: 5, text: "JAI made my Hajj journey absolutely seamless. From visa to accommodation, every detail was handled with premium care and devotion." },
    { name: "Fatima Begum", country: "United Kingdom", journey: "Student Visa", rating: 5, text: "Their guidance helped me secure admission to a top UK university. A genuinely professional and caring team from first call to landing." },
    { name: "Karim Ahmed", country: "Malaysia", journey: "Work Permit", rating: 5, text: "Complete end-to-end support for my work permit. Transparent process, honest timelines, and constant updates throughout." },
  ];

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-[#081C3A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5 text-[11px] tracking-[0.32em] uppercase text-[#E8C677]">
              <span className="meta-tick" /> {t.testimonials.badge}
            </div>
            <h2 className="section-heading text-left text-[clamp(2.25rem,5vw,4.25rem)]">
              <span className="text-white/90">{t.testimonials.title} </span>
              <strong className="text-gradient-gold italic">{t.testimonials.accent}</strong>
            </h2>
          </div>
          <p className="md:max-w-sm text-white/50 text-sm">{t.testimonials.desc}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {items.map((item, i) => {
            const featured = i === 1;
            return (
              <div key={i} className={`relative rounded-[4px] p-8 card-lift flex flex-col ${featured ? "panel-sharp md:-translate-y-4" : "glass-strong"}`}>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(item.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[#c8a24c] text-[#c8a24c]" />)}
                </div>
                <p className="text-white/80 leading-relaxed mb-8 flex-1 font-display text-lg italic">&ldquo;{item.text}&rdquo;</p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-11 h-11 rounded-md bg-[#c8a24c] flex items-center justify-center text-[#081C3A] font-bold font-display">{item.name.charAt(0)}</div>
                  <div>
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-[11px] text-white/50 tracking-wide">{item.country} · {item.journey}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

function FAQ() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "How long does Hajj visa processing take?", a: "Typically 7–14 working days depending on the package. We handle all documentation and coordinate directly with the relevant authorities." },
    { q: "Do you offer instalment payment plans?", a: "Yes — flexible payment plans are available across Hajj, Umrah and Student Visa packages. Speak with a consultant for a schedule that suits you." },
    { q: "Which countries do you provide student visa services for?", a: "We specialise in the UK, USA, Canada, Australia, Malaysia, Singapore, Germany and other leading study destinations." },
    { q: "Is JAI licensed and registered?", a: "Yes — Jahangirnagar Air International is fully licensed and registered with the relevant authorities in Bangladesh." },
    { q: "Do you provide post-arrival support?", a: "Absolutely. Our support continues after arrival, including airport pickup, accommodation assistance and settlement guidance." },
  ];

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-[#06142b]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5 text-[11px] tracking-[0.32em] uppercase text-[#E8C677]">
            <span className="meta-tick" /> {t.faq.badge} <span className="meta-tick rotate-180" />
          </div>
          <h2 className="section-heading text-[clamp(2.25rem,5vw,4.25rem)]">
            <span className="text-white/90">{t.faq.title} </span>
            <strong className="text-gradient-gold italic">{lang === "en" ? "Answered" : "উত্তর"}</strong>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className={`rounded-[3px] overflow-hidden transition-colors ${open === i ? "border border-[#c8a24c]/40 bg-white/[0.03]" : "border border-white/10 hover:border-white/20"}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left gap-4">
                <span className="font-display text-lg text-white">{faq.q}</span>
                <span className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center flex-shrink-0 transition-all ${open === i ? "bg-[#c8a24c] border-[#c8a24c] rotate-180" : ""}`}>
                  <ChevronDown className={`w-4 h-4 ${open === i ? "text-[#081C3A]" : "text-[#E8C677]"}`} />
                </span>
              </button>
              <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 text-white/65 leading-relaxed">{faq.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact                                                                   */
/* -------------------------------------------------------------------------- */

function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); };

  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-[#081C3A] to-[#051429]">
      <div className="absolute inset-0 pointer-events-none contact-network-bg" aria-hidden="true">
        <img src="/images/globe.jpg" alt="" className="w-full h-full object-cover opacity-30 scale-110" />
        <RouteMap className="absolute inset-0 w-full h-full opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#081C3A]/90 via-[#051429]/78 to-[#051429]/95" />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* brand showcase */}
        <div className="flex flex-col items-center mb-14">
          <LogoPlate variant="contact" halo />
          <div className="mt-8 flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-[#E8C677]">
            <span className="meta-tick" /> {t.contact.badge} <span className="meta-tick rotate-180" />
          </div>
          <h2 className="section-heading text-center mt-5 text-[clamp(2.25rem,5vw,4.5rem)]">
            <span className="text-white/90">{t.contact.title} </span>
            <strong className="text-gradient-gold italic">{t.contact.accent}</strong>
          </h2>
          <p className="max-w-2xl mx-auto mt-6 text-center text-white/55">{t.contact.desc}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <a href="tel:+8801711941428" className="glass-strong rounded-[3px] p-5 card-lift block">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-md bg-[#c8a24c] flex items-center justify-center"><Phone className="w-5 h-5 text-[#081C3A]" /></div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#E8C677] mb-1">{t.contact.phone}</div>
                  <div className="text-base font-semibold text-white">+880 1711 941428</div>
                </div>
              </div>
            </a>
            <a href="tel:+8801835922789" className="glass-strong rounded-[3px] p-5 card-lift block">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-md bg-[#c8a24c] flex items-center justify-center"><Phone className="w-5 h-5 text-[#081C3A]" /></div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#E8C677] mb-1">{t.contact.support}</div>
                  <div className="text-base font-semibold text-white">+880 1835 922789</div>
                </div>
              </div>
            </a>
            <a href="mailto:info.jai.bd@gmail.com" className="glass-strong rounded-[3px] p-5 card-lift block">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-md bg-[#c8a24c] flex items-center justify-center"><Mail className="w-5 h-5 text-[#081C3A]" /></div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#E8C677] mb-1">{t.contact.email}</div>
                  <div className="text-sm font-semibold text-white break-all">info.jai.bd@gmail.com</div>
                </div>
              </div>
            </a>
            {t.contact.offices.map((office, idx) => (
              <div key={idx} className="glass-strong rounded-[3px] p-5 card-lift">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-md bg-[#c8a24c] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#081C3A]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-[#E8C677]">{office.name}</div>
                      {office.mapUrl && (
                        <a 
                          href={office.mapUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[11px] text-[#E8C677] hover:text-white transition-colors flex items-center gap-1"
                        >
                          {t.contact.directions} <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    {office.addrLines.map((l, i) => <div key={i} className="text-[13px] text-white/75">{l}</div>)}
                  </div>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-2.5">
              <a href="tel:+8801711941428" className="btn-primary !py-3 !text-xs justify-center"><Phone className="w-3.5 h-3.5" /> {t.contact.call}</a>
              <a href="https://wa.me/8801711941428" target="_blank" rel="noopener" className="border border-white/15 rounded-full py-3 px-3 text-xs font-semibold text-white text-center hover:border-green-500/60 hover:text-green-300 transition-colors flex items-center justify-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" /> {t.contact.whatsapp}</a>
              <a href="mailto:info.jai.bd@gmail.com" className="border border-white/15 rounded-full py-3 px-3 text-xs font-semibold text-white text-center hover:border-[#c8a24c]/60 hover:text-[#E8C677] transition-colors flex items-center justify-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {t.contact.mail}</a>
            </div>
          </div>

          <div className="lg:col-span-2 glass-strong rounded-[4px] p-8 md:p-10">
            <h3 className="font-display text-2xl text-white mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input required type="text" placeholder={t.contact.name} className="bg-white/[0.04] border border-white/10 rounded-[3px] px-4 py-3 text-white placeholder:text-white/35 focus:border-[#c8a24c] focus:outline-none transition-colors" />
              <input required type="email" placeholder={t.contact.emailLabel} className="bg-white/[0.04] border border-white/10 rounded-[3px] px-4 py-3 text-white placeholder:text-white/35 focus:border-[#c8a24c] focus:outline-none transition-colors" />
              <input type="tel" placeholder={t.contact.phoneLabel} className="bg-white/[0.04] border border-white/10 rounded-[3px] px-4 py-3 text-white placeholder:text-white/35 focus:border-[#c8a24c] focus:outline-none transition-colors" />
              <select className="bg-white/[0.04] border border-white/10 rounded-[3px] px-4 py-3 text-white focus:border-[#c8a24c] focus:outline-none transition-colors">
                <option value="" className="bg-[#081C3A]">{t.contact.service}</option>
                <option className="bg-[#081C3A]">Hajj & Umrah</option>
                <option className="bg-[#081C3A]">Student Visa</option>
                <option className="bg-[#081C3A]">Immigration</option>
                <option className="bg-[#081C3A]">Work Permit</option>
                <option className="bg-[#081C3A]">Air Ticket</option>
                <option className="bg-[#081C3A]">Other</option>
              </select>
              <textarea required rows={5} placeholder={t.contact.message} className="md:col-span-2 bg-white/[0.04] border border-white/10 rounded-[3px] px-4 py-3 text-white placeholder:text-white/35 focus:border-[#c8a24c] focus:outline-none transition-colors resize-none" />
              <button type="submit" className="md:col-span-2 btn-primary justify-center">{sent ? "✓ Message Sent" : t.contact.send} <ArrowRight className="w-4 h-4" /></button>
            </form>
          </div>
        </div>

        <div className="mt-10 rounded-[4px] overflow-hidden border border-white/10 aspect-[21/9]">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.1!2d90.4167!3d23.7614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzQxLjAiTiA5MMKwMjUnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1" width="100%" height="100%" style={{ border: 0, filter: "hue-rotate(190deg) brightness(0.55) contrast(1.2)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="JAI Office Location"></iframe>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

function Footer() {
  const { t, lang, setLang } = useLang();
  return (
    <footer className="relative pt-20 pb-8 bg-[#030814] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none footer-global-bg" aria-hidden="true">
        <RouteMap className="absolute inset-0 w-full h-full opacity-[0.08]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#06142b]/50 via-[#030814]/90 to-black/40" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8a24c]/40 to-transparent" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-5 gap-10 pb-14 border-b border-white/5">
          <div className="lg:col-span-2">
            <LogoPlate variant="footer" halo={false} />
            <p className="text-white/55 mt-6 mb-6 max-w-sm text-sm leading-relaxed">{lang === "en" ? t.footer.tagline : t.footer.taglineBn}</p>
            <div className="flex items-center gap-2.5">
              {["Facebook", "Instagram", "YouTube", "LinkedIn"].map((s) => (
                <a key={s} href="#" aria-label={s} className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center text-white/55 hover:text-[#081C3A] hover:bg-[#c8a24c] hover:border-[#c8a24c] transition-colors">
                  <span className="text-[11px] font-bold">{s.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-base text-white mb-5">{t.footer.quickLinks}</h4>
            <ul className="space-y-2.5">
              {[t.nav.home, t.nav.about, t.nav.services, t.nav.contact].map((l, i) => (
                <li key={i}><a href={`#${["home", "about", "services", "contact"][i]}`} className="text-[13px] text-white/55 hover:text-[#E8C677] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base text-white mb-5">{t.footer.services}</h4>
            <ul className="space-y-2.5">
              {[t.nav.hajj, t.nav.visa, t.nav.immigration, t.nav.work, t.nav.ticket].map((l, i) => (
                <li key={i}><a href={`#${["hajj", "visa", "immigration", "work", "ticket"][i]}`} className="text-[13px] text-white/55 hover:text-[#E8C677] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base text-white mb-5">{t.footer.newsletter}</h4>
            <p className="text-[13px] text-white/50 mb-4">{t.footer.newsletterDesc}</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder={t.footer.emailPlaceholder} className="flex-1 min-w-0 bg-white/[0.04] border border-white/10 rounded-[3px] px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/35 focus:border-[#c8a24c] focus:outline-none" />
              <button className="bg-[#c8a24c] rounded-[3px] px-4 py-2.5 text-[13px] font-semibold text-[#081C3A] hover:bg-[#E8C677] transition-colors">{t.footer.subscribe}</button>
            </form>
            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#E8C677] mb-2.5">{t.footer.lang}</div>
              <button onClick={() => setLang(lang === "en" ? "bn" : "en")} className="border border-white/15 rounded-[3px] px-3.5 py-2 text-[12px] font-semibold text-white/80 hover:border-[#c8a24c]/60 hover:text-[#E8C677] transition-colors">
                {lang === "en" ? "বাংলা" : "English"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-7">
          <div className="text-[12px] text-white/40">© 2026 Jahangirnagar Air International (JAI). {t.footer.rights}</div>
          <div className="text-[11px] text-white/30 tracking-wide">Crafted with excellence for global journeys.</div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Root                                                                      */
/* -------------------------------------------------------------------------- */

function HomePageContent() {
  const { t } = useLang();
  return (
    <>
      <Preloader />
      <div className="vignette" aria-hidden="true" />
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <Welcome />
        <Services />
        <HajjSection />
        <OtherService id="visa" icon={GraduationCap} image="/images/jai-student-campus.jpg" badge={t.services.student.badge} title={t.services.student.title} desc={t.services.student.desc} cta={t.services.student.cta} reverse />
        <OtherService id="immigration" icon={Globe2} image="/images/jai-immigration-passport.jpg" badge={t.services.immigration.badge} title={t.services.immigration.title} desc={t.services.immigration.desc} cta={t.services.immigration.cta} />
        <OtherService id="work" icon={Briefcase} image="/images/jai-about-office.jpg" badge={t.services.work.badge} title={t.services.work.title} desc={t.services.work.desc} cta={t.services.work.cta} reverse />
        <OtherService id="ticket" icon={Ticket} image="/images/jai-airport-aviation.jpg" badge={t.services.ticket.badge} title={t.services.ticket.title} desc={t.services.ticket.desc} cta={t.services.ticket.cta} />
        <AdditionalServices />
        <About />
        <WhyChoose />
        <Journey />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import Lenis from "lenis";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    const syncScroll = () => ScrollTrigger.update();
    lenis.on("scroll", syncScroll);

    const parallaxAnimations = gsap.utils.toArray<HTMLElement>(".parallax-image").map((image) =>
      gsap.fromTo(
        image,
        { scale: 1.08, yPercent: -3 },
        {
          scale: 1.08,
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: image.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      ),
    );

    ScrollTrigger.refresh();

    return () => {
      parallaxAnimations.forEach((animation) => animation.kill());
      lenis.off("scroll", syncScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <HomePageContent />
    </LanguageProvider>
  );
}
