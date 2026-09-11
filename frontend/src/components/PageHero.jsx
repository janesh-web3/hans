import { motion } from "framer-motion";

/**
 * Aceternity-style page hero — About / Membership / Contact.
 * Props: image, badge, title, subtitle, children
 */
export default function PageHero({ image, badge, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden text-white" style={{ minHeight: "42vh", display: "flex", flexDirection: "column" }}>

      {/* ── Photo ── */}
      <div className="absolute inset-0 z-0">
        <img src={image} alt={title} className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.28) saturate(1.15)" }} />
      </div>

      {/* ── Beam lines ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {[
          { top: "28%", delay: "0s",   width: "52%", opacity: "0.15" },
          { top: "58%", delay: "1.8s", width: "36%", opacity: "0.10" },
        ].map((b, i) => (
          <div key={i} className="absolute h-px left-0 animate-beam"
            style={{
              top: b.top, width: b.width, animationDelay: b.delay,
              background: `linear-gradient(90deg, transparent 0%, rgba(74,222,128,${b.opacity}) 40%, rgba(74,222,128,${b.opacity}) 60%, transparent 100%)`,
            }} />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-[4] flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo + badge */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <img src="/logo.png" alt="HAN Sudurpashchim"
              className="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(74,222,128,0.45)]" />
            <div className="relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-primary-300 overflow-hidden"
              style={{ border: "1px solid rgba(74,222,128,0.25)", background: "rgba(22,163,74,0.08)", backdropFilter: "blur(8px)" }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(120deg, transparent 25%, rgba(74,222,128,0.1) 50%, transparent 75%)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }} />
              <span className="relative w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse flex-shrink-0" />
              <span className="relative">{badge}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-black tracking-tight leading-[1.06] mb-3"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)" }}>
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-white/55 text-sm leading-relaxed max-w-xl">
            {subtitle}
          </p>

          {children}
        </motion.div>
      </div>

      {/* ── Wavy bottom divider ── */}
      <div className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg"
          className="w-full block" preserveAspectRatio="none" style={{ display: "block" }}>
          <path d="M0,48 L0,28 C220,48 440,4 660,26 C880,48 1100,8 1280,24 C1360,32 1400,18 1440,22 L1440,48 Z"
            fill="#f0fdf4" />
        </svg>
      </div>
    </section>
  );
}
