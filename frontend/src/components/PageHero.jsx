import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function PageHero({ image, badge, title, subtitle, children }) {
  const wrapRef  = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([badgeRef.current, titleRef.current, subRef.current], { opacity: 0, y: 18 });
      gsap.timeline({ delay: 0.05, defaults: { ease: "power3.out" } })
        .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.3")
        .to(subRef.current,   { opacity: 1, y: 0, duration: 0.5  }, "-=0.3");
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative bg-dark-950 text-white overflow-hidden" style={{ minHeight: "38vh", display: "flex", flexDirection: "column" }}>

      {/* Photo — darkened */}
      <div className="absolute inset-0 z-0">
        <img src={image} alt={title} className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.22)" }} />
      </div>

      {/* Simple left→right dark vignette — no colour tint */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.4) 60%, rgba(2,6,23,0.1) 100%)" }} />

      {/* Content */}
      <div className="relative z-[2] flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 flex flex-col justify-center">

        {/* Logo + badge */}
        <div ref={badgeRef} className="flex flex-wrap items-center gap-3 mb-5">
          <img src="/logo.png" alt="HAN" className="h-10 w-auto object-contain" />
          <span className="inline-flex items-center gap-1.5 bg-dark-800 border border-dark-700 text-primary-400 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            {badge}
          </span>
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="font-bold text-white tracking-tight leading-tight mb-3"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.8rem)" }}>
          {title}
        </h1>

        {/* Subtitle */}
        <p ref={subRef} className="text-dark-400 text-sm leading-relaxed max-w-lg">
          {subtitle}
        </p>

        {children}
      </div>

      {/* Clean wavy bottom divider — single path, no fill bleed */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0,48 L0,30 C240,48 480,14 720,30 C960,46 1200,16 1440,28 L1440,48 Z" fill="#020617" />
        </svg>
      </div>
    </section>
  );
}
