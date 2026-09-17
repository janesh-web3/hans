import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { FiArrowRight, FiMapPin, FiUsers, FiAward, FiGlobe } from "react-icons/fi";
import { hotels } from "../data/hotels";
import { useTheme } from "../context/ThemeContext";

const services = [
  {
    icon: <FiAward size={22} />,
    title: "Quality Assurance",
    desc: "Setting and enforcing hospitality standards across all member hotels in Province No. 7.",
  },
  {
    icon: <FiGlobe size={22} />,
    title: "Tourism Promotion",
    desc: "Promoting Sudurpashchim as a premier destination for domestic and international travellers.",
  },
  {
    icon: <FiUsers size={22} />,
    title: "Member Support",
    desc: "Training, legal guidance, and business support for every registered member establishment.",
  },
  {
    icon: <FiAward size={22} />,
    title: "Advocacy & Policy",
    desc: "Representing hospitality businesses before provincial and federal government bodies.",
  },
];

const highlights = [
  { name: "Shuklaphanta National Park", district: "Kanchanpur", desc: "One of Nepal's largest open grasslands, home to endangered wildlife." },
  { name: "Api Himal",                  district: "Darchula",   desc: "Majestic peaks offering world-class trekking and mountaineering." },
  { name: "Kailash Mansarovar Route",   district: "Darchula",   desc: "Sacred pilgrimage corridor attracting devotees from across South Asia." },
  { name: "Mahakali River",             district: "Kanchanpur", desc: "Pristine border river ideal for rafting and nature exploration." },
  { name: "Ramaroshan Lakes",           district: "Achham",     desc: "Sacred lake cluster in lush forests, perfect for spiritual tourism." },
  { name: "Ugratara Temple",            district: "Kailali",    desc: "Historic temple and key cultural heritage of the far-western region." },
];

const stats = [
  { value: "15+",  label: "Member Hotels"  },
  { value: "8",    label: "Districts"      },
  { value: "500+", label: "Rooms"          },
  { value: "1998", label: "Est."           },
];

const featured = hotels.filter(h => ["4 Star", "Resort", "3 Star"].includes(h.category)).slice(0, 3);

export default function Home() {
  const { dark } = useTheme();
  const heroRef  = useRef(null);
  const textRef  = useRef(null);
  const cardRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(textRef.current.children, { opacity: 0, y: 20 });
      gsap.set(cardRef.current,          { opacity: 0, x: 20 });
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(textRef.current.children, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 })
        .to(cardRef.current,          { opacity: 1, x: 0, duration: 0.5 }, "-=0.4");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white dark:bg-dark-950">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ minHeight: "90vh", display: "flex", alignItems: "center" }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1800&auto=format&fit=crop&q=80"
            alt="Sudurpashchim Nepal"
            className="w-full h-full object-cover object-[55%_35%]"
            style={{ filter: dark ? "brightness(0.18)" : "brightness(0.45)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: dark
                ? "linear-gradient(105deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)"
                : "linear-gradient(105deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 55%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-[1fr_320px] gap-16 items-center">

            {/* Left — editorial headline */}
            <div ref={textRef}>
              {/* Green overline */}
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-10 h-[3px] bg-primary-500" />
                <span className="text-primary-400 text-xs font-bold uppercase tracking-[0.22em]">
                  Sudurpashchim Province · Nepal
                </span>
              </div>

              <h1
                className="font-bold text-white leading-none mb-6"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", letterSpacing: "-0.03em" }}
              >
                Hotel Association<br />
                <span className="text-primary-400">of Nepal</span>
              </h1>

              <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
                Uniting hospitality businesses across eight districts of Sudurpashchim
                Province — elevating tourism, upholding standards, and advocating for our members.
              </p>

              <div className="flex flex-wrap gap-4 mb-14">
                <Link to="/membership" className="btn-primary">
                  View Member Hotels <FiArrowRight size={14} />
                </Link>
                <Link to="/contact" className="btn-outline-white">
                  Join the Association
                </Link>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-0 border-t border-white/20 pt-8 max-w-lg">
                {stats.map(({ value, label }) => (
                  <div key={label} className="pr-6">
                    <p className="text-3xl font-bold text-white leading-none">{value}</p>
                    <p className="text-white/50 text-xs mt-1.5 font-medium uppercase tracking-wide">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — membership quick info card */}
            <div ref={cardRef} className="hidden lg:block">
              <div className="bg-white dark:bg-dark-900 border-t-4 border-primary-600">
                {/* Card header */}
                <div className="bg-primary-700 px-6 py-5 flex items-center gap-3">
                  <img src="/logo.png" alt="HAN" className="h-10 w-auto object-contain brightness-0 invert" />
                  <div>
                    <p className="text-white font-bold text-sm leading-none">HAN Sudurpashchim</p>
                    <p className="text-white/60 text-xs mt-1">Province No. 7 · Nepal</p>
                  </div>
                </div>

                {/* Stats table */}
                <div className="divide-y divide-surface-100 dark:divide-dark-800">
                  {[
                    { label: "Member Hotels",   value: "15+" },
                    { label: "Districts",        value: "8"   },
                    { label: "Hotel Categories", value: "9"   },
                    { label: "Established",      value: "1998"},
                    { label: "Annual Events",    value: "12+" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between px-6 py-3.5">
                      <span className="text-sm text-surface-500 dark:text-dark-400">{label}</span>
                      <span className="text-sm font-bold text-surface-900 dark:text-white">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-5 border-t border-surface-100 dark:border-dark-800">
                  <Link to="/contact" className="btn-primary w-full justify-center text-sm">
                    Apply for Membership <FiArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ──────────────────────────────────────────────────── */}
      <section className="section-pad bg-white dark:bg-dark-900 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">

            <div>
              <span className="section-label">About HAN Sudurpashchim</span>
              <h2 className="section-heading">
                The Unified Voice of<br />Far-Western Hospitality
              </h2>
              <p className="section-body mb-4">
                The Hotel Association of Nepal — Sudurpashchim Province is the official body
                representing hotels, resorts, lodges, guest houses, and homestays across all
                eight districts of Province No. 7.
              </p>
              <p className="section-body mb-8">
                From the wildlife-rich plains of Kailali and Kanchanpur to the high Himalayan
                valleys of Darchula and Bajhang, we support businesses of every size and category.
              </p>
              <Link to="/about" className="btn-ghost">
                Read Our Story <FiArrowRight size={14} />
              </Link>
            </div>

            {/* Key numbers grid */}
            <div className="grid grid-cols-2 gap-px bg-surface-200 dark:bg-dark-700 border border-surface-200 dark:border-dark-700">
              {[
                { label: "Established",   value: "1998" },
                { label: "Districts",     value: "8"    },
                { label: "Hotel Types",   value: "9"    },
                { label: "Events / Year", value: "12+"  },
              ].map(item => (
                <div key={item.label} className="bg-white dark:bg-dark-900 px-8 py-8">
                  <p className="text-4xl font-bold text-primary-600 dark:text-primary-400 leading-none mb-2">
                    {item.value}
                  </p>
                  <p className="text-sm font-semibold text-surface-500 dark:text-dark-400 uppercase tracking-wide">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface-50 dark:bg-dark-950 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl mb-12">
            <span className="section-label">Our Services</span>
            <h2 className="section-heading">What We Do</h2>
            <p className="section-body">
              From setting quality standards to advocating for favourable policy — we work
              every day to strengthen hospitality across Province No. 7.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-200 dark:bg-dark-700">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="bg-white dark:bg-dark-900 px-8 py-8 group border-t-4 border-transparent hover:border-primary-500 transition-colors duration-200"
              >
                <div className="text-primary-600 dark:text-primary-400 mb-5">{s.icon}</div>
                <h3 className="text-surface-900 dark:text-white font-bold text-base mb-3">{s.title}</h3>
                <p className="text-surface-500 dark:text-dark-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED HOTELS ──────────────────────────────────────────────── */}
      <section className="section-pad bg-white dark:bg-dark-900 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="section-label">Member Spotlight</span>
              <h2 className="section-heading mb-0">Featured Member Hotels</h2>
            </div>
            <Link
              to="/membership"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
            >
              View all members <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-surface-200 dark:bg-dark-700">
            {featured.map(hotel => (
              <div key={hotel.id} className="bg-white dark:bg-dark-900 p-8 hover:bg-surface-50 dark:hover:bg-dark-800 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[11px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
                    {hotel.category}
                  </span>
                </div>
                <h3 className="text-surface-900 dark:text-white font-bold text-base mb-2 leading-snug">
                  {hotel.name}
                </h3>
                <p className="flex items-center gap-1.5 text-surface-400 dark:text-dark-500 text-xs mb-3 font-medium">
                  <FiMapPin size={11} /> {hotel.location}
                </p>
                <p className="text-surface-600 dark:text-dark-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {hotel.description}
                </p>
                <p className="text-surface-400 dark:text-dark-600 text-xs">
                  {hotel.amenities.slice(0, 4).join("  ·  ")}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link to="/membership" className="btn-ghost w-full justify-center">
              View All Members <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY VISIT ────────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface-50 dark:bg-dark-950 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl mb-12">
            <span className="section-label">Destinations</span>
            <h2 className="section-heading">Why Visit Sudurpashchim?</h2>
            <p className="section-body">
              The province offers some of Nepal's most diverse natural and cultural attractions —
              from high Himalayan routes to protected wildlife reserves.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map(h => (
              <div key={h.name} className="flex gap-5">
                <div className="w-[3px] flex-shrink-0 bg-primary-500 mt-1" />
                <div>
                  <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-1">
                    {h.district}
                  </p>
                  <h3 className="text-surface-900 dark:text-white font-bold text-base mb-2">{h.name}</h3>
                  <p className="text-surface-500 dark:text-dark-400 text-sm leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-primary-700 dark:bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <span className="block text-primary-300 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Membership
              </span>
              <h2
                className="text-white font-bold leading-tight mb-4"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
              >
                Join Our Association
              </h2>
              <p className="text-white/70 text-base leading-relaxed max-w-xl">
                Register your hotel with HAN Sudurpashchim and benefit from collective advocacy,
                training programmes, and provincial tourism promotion.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:flex-col lg:items-start">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold text-sm px-8 py-4 hover:bg-primary-50 transition-colors"
              >
                Apply for Membership <FiArrowRight size={14} />
              </Link>
              <Link to="/about" className="btn-outline-white">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
