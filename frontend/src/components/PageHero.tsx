import { useTheme } from "@/context/ThemeContext";

interface PageHeroProps {
  image: string;
  badge?: string;
  title: string;
  subtitle?: string;
}

/**
 * PageHero – editorial inner-page banner.
 * Left-aligned headline, green top-bar accent, full-bleed image behind.
 */
export default function PageHero({ image, badge, title, subtitle }: PageHeroProps) {
  const { dark } = useTheme();

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "38vh", display: "flex", alignItems: "flex-end" }}>

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
          style={{ filter: dark ? "brightness(0.2)" : "brightness(0.38)" }}
        />
        {/* Strong gradient from bottom-left so text is always legible */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14">

        {/* Green overline bar */}
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-8 h-[3px] bg-primary-500" />
          <span className="text-primary-400 text-xs font-bold uppercase tracking-[0.2em]">
            {badge ?? "HAN Sudurpashchim"}
          </span>
        </div>

        <h1
          className="font-serif font-bold text-white leading-tight mb-4"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="text-white/75 text-base leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
