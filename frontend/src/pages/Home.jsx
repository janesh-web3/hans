import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MdHotel, MdStar, MdGroups, MdLocationOn,
  MdVerified, MdTrendingUp, MdHandshake, MdCampaign,
} from "react-icons/md";
import { FiArrowRight, FiMapPin, FiAward } from "react-icons/fi";
import { hotels } from "../data/hotels";
import {
  fadeUp, staggerContainer, staggerFast, slideInLeft, slideInRight, scaleIn,
} from "../lib/animations";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "15+",   label: "Member Hotels",    icon: <MdHotel    size={24} />, bg: "bg-primary-50",   text: "text-primary-600"   },
  { value: "8",     label: "Districts Covered", icon: <MdLocationOn size={24} />, bg: "bg-secondary-50", text: "text-secondary-600" },
  { value: "500+",  label: "Rooms Available",   icon: <MdStar     size={24} />, bg: "bg-amber-50",    text: "text-amber-600"    },
  { value: "2000+", label: "Jobs Created",      icon: <MdGroups   size={24} />, bg: "bg-teal-50",     text: "text-teal-600"     },
];

const services = [
  { icon: <MdVerified  size={28} />, title: "Quality Assurance",  desc: "Setting and enforcing hospitality standards across all member hotels for consistent, high-quality guest experiences.", bg: "bg-primary-50",   text: "text-primary-600"   },
  { icon: <MdTrendingUp size={28} />, title: "Tourism Promotion",  desc: "Promoting Sudurpashchim Province as a premier destination, from Shuklaphanta's wildlife to Api Himal's peaks.",     bg: "bg-secondary-50", text: "text-secondary-600" },
  { icon: <MdHandshake size={28} />, title: "Member Support",     desc: "Training, legal guidance, and business support to help member hotels grow in an evolving hospitality landscape.",    bg: "bg-amber-50",    text: "text-amber-600"    },
  { icon: <MdCampaign  size={28} />, title: "Advocacy & Policy",  desc: "Representing hospitality businesses before provincial and federal government for fair regulation and development.",   bg: "bg-teal-50",     text: "text-teal-600"     },
];

const highlights = [
  { name: "Shuklaphanta National Park", district: "Kanchanpur", desc: "One of the world's largest open grasslands with endangered wildlife." },
  { name: "Api Himal",                  district: "Darchula",   desc: "Majestic peaks offering world-class trekking and mountaineering." },
  { name: "Kailash Mansarovar Route",   district: "Darchula",   desc: "Sacred pilgrimage corridor attracting devotees from across South Asia." },
  { name: "Mahakali River",             district: "Kanchanpur", desc: "Pristine border river ideal for rafting and nature exploration." },
  { name: "Ramaroshan Lakes",           district: "Achham",     desc: "Sacred lake cluster in lush forests, perfect for spiritual tourism." },
  { name: "Ugratara Temple",            district: "Kailali",    desc: "Historic temple and key cultural heritage of the far-western region." },
];

const featured = hotels.filter((h) => ["4 Star", "Resort", "3 Star"].includes(h.category)).slice(0, 3);

// Reusable scroll-reveal section wrapper
function Section({ children, className = "" }) {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const heroRef   = useRef(null);
  const titleRef  = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef    = useRef(null);

  // GSAP hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(titleRef.current,    { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 })
        .fromTo(subtitleRef.current, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(ctaRef.current,      { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.45");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* ═══════════════════════════════════════════════════
          HERO — Aceternity UI style
          ═══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative bg-[#030712] text-white overflow-hidden"
        style={{ minHeight: "88vh" }}
      >
        {/* ── Background photo with cinematic overlay ── */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1800&auto=format&fit=crop&q=80"
            alt="Sudurpashchim Nepal mountains"
            className="w-full h-full object-cover object-[55%_35%] scale-[1.04]"
            style={{ filter: "brightness(0.32) saturate(1.1)" }}
          />
        </div>

        {/* ── Radial spotlight — center-left glow ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(22,163,74,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Secondary blue glow — right */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 80% 60%, rgba(37,99,235,0.12) 0%, transparent 65%)",
          }}
        />

        {/* ── Animated beam lines ── */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          {[
            { top: "18%", delay: "0s",    opacity: "0.18", width: "45%" },
            { top: "42%", delay: "1.2s",  opacity: "0.12", width: "60%" },
            { top: "68%", delay: "2.4s",  opacity: "0.10", width: "35%" },
          ].map((b, i) => (
            <div
              key={i}
              className="absolute h-px left-0 animate-beam"
              style={{
                top: b.top,
                width: b.width,
                animationDelay: b.delay,
                background: `linear-gradient(90deg, transparent 0%, rgba(74,222,128,${b.opacity}) 40%, rgba(74,222,128,${b.opacity}) 60%, transparent 100%)`,
              }}
            />
          ))}
        </div>

        {/* ── Bottom vignette to blend into page ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[3] h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #f0fdf4 0%, transparent 100%)",
          }}
        />

        {/* ── Main content ── */}
        <div className="relative z-[4] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
          style={{ minHeight: "88vh" }}>
          <div className="grid lg:grid-cols-[1fr_340px] gap-10 xl:gap-16 items-center w-full py-16 lg:py-20">

            {/* ── LEFT — text content ── */}
            <div>
              {/* Logo + badge row */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <img
                  src="/logo.png"
                  alt="HAN Sudurpashchim"
                  className="h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(74,222,128,0.5)]"
                />
                {/* Aceternity bordered badge */}
                <div className="relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-primary-300 border border-primary-500/30 bg-primary-950/40 backdrop-blur-sm overflow-hidden">
                  {/* shimmer sweep */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(120deg, transparent 25%, rgba(74,222,128,0.12) 50%, transparent 75%)",
                      backgroundSize: "200% auto",
                      animation: "shimmer 2.8s linear infinite",
                    }}
                  />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                  <span className="relative">Sudurpashchim Province · Province No. 7, Nepal</span>
                </div>
              </div>

              {/* Headline */}
              <h1
                ref={titleRef}
                className="font-black tracking-tight leading-[1.03] mb-7"
              >
                <span className="block text-white/90 text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.5rem]">
                  Hotel
                </span>
                {/* Gradient shimmer text */}
                <span
                  className="block text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.5rem]"
                  style={{
                    background:
                      "linear-gradient(135deg, #4ade80 0%, #22c55e 35%, #86efac 65%, #4ade80 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer 3.5s linear infinite",
                  }}
                >
                  Association
                </span>
                <span className="block text-white/50 text-[1.8rem] sm:text-[2.4rem] lg:text-[2.8rem] xl:text-[3.1rem] font-bold">
                  of Nepal
                </span>
              </h1>

              {/* Description */}
              <p
                ref={subtitleRef}
                className="text-white/55 text-sm sm:text-base leading-[1.75] mb-9 max-w-[480px]"
              >
                Uniting hospitality businesses across{" "}
                <span className="text-white/80 font-semibold">eight districts</span>{" "}
                of Sudurpashchim Province — elevating tourism, upholding standards,
                and building a thriving economy for far-western Nepal.
              </p>

              {/* CTA buttons */}
              <div ref={ctaRef} className="flex flex-wrap gap-3 mb-10">
                {/* Primary — glow button */}
                <Link
                  to="/membership"
                  className="group relative inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white overflow-hidden transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                    boxShadow: "0 0 20px rgba(22,163,74,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  <span className="relative z-10">View Member Hotels</span>
                  <FiArrowRight size={14} className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-200" />
                  {/* hover glow layer */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" }} />
                </Link>

                {/* Secondary — ghost glass */}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white/80 hover:text-white border border-white/15 hover:border-white/30 backdrop-blur-sm transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  Join the Association
                </Link>
              </div>

              {/* Stats strip */}
              <div
                className="flex flex-wrap gap-x-8 gap-y-3 pt-7 border-t"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {[
                  { n: "15+",  l: "Member Hotels"   },
                  { n: "8",    l: "Districts"        },
                  { n: "500+", l: "Rooms"            },
                  { n: "25+",  l: "Years Active"     },
                ].map(({ n, l }) => (
                  <div key={l}>
                    <p
                      className="text-2xl font-black leading-none"
                      style={{
                        background: "linear-gradient(135deg,#fff 40%,rgba(255,255,255,0.6) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {n}
                    </p>
                    <p className="text-white/35 text-xs mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT — Aceternity glassmorphism card ── */}
            <div className="hidden lg:block">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Outer glow ring */}
                <div
                  className="absolute -inset-px rounded-2xl pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(74,222,128,0.35) 0%, rgba(37,99,235,0.2) 50%, transparent 100%)",
                    filter: "blur(1px)",
                  }}
                />
                {/* Card body */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow:
                      "0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Card top stripe */}
                  <div
                    className="h-1.5 w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #16a34a 0%, #4ade80 50%, #2563eb 100%)",
                    }}
                  />

                  <div className="p-6 space-y-5">
                    {/* Logo header */}
                    <div
                      className="flex items-center gap-3 pb-4"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <img
                        src="/logo.png"
                        alt="HAN Sudurpashchim"
                        className="h-10 w-auto object-contain brightness-0 invert opacity-90"
                      />
                      <div>
                        <p className="text-white font-bold text-sm leading-none">HAN Sudurpashchim</p>
                        <p className="text-white/40 text-xs mt-1">Province No. 7 · Nepal</p>
                      </div>
                    </div>

                    {/* Stats rows */}
                    {[
                      { label: "Member Hotels",   value: "15+",  accent: true  },
                      { label: "Districts",        value: "8",    accent: true  },
                      { label: "Hotel Categories", value: "9",    accent: true  },
                      { label: "Established",      value: "1998", accent: false },
                      { label: "Annual Events",    value: "12+",  accent: false },
                    ].map(({ label, value, accent }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-white/40 text-xs">{label}</span>
                        <span
                          className="font-bold text-sm"
                          style={accent ? {
                            background: "linear-gradient(135deg,#4ade80,#22c55e)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          } : { color: "rgba(255,255,255,0.75)" }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}

                    {/* Active badge */}
                    <div
                      className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
                      style={{ background: "rgba(22,163,74,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}
                    >
                      <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse flex-shrink-0" />
                      <span className="text-primary-300 text-xs font-medium">Accepting new members</span>
                    </div>

                    {/* CTA inside card */}
                    <Link
                      to="/contact"
                      className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white transition-all duration-200 hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg,#16a34a,#15803d)",
                        boxShadow: "0 4px 14px rgba(22,163,74,0.3)",
                      }}
                    >
                      Apply for Membership <FiArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* ── Wavy bottom divider ── */}
        <div className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg"
            className="w-full block" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,56 L0,32 C200,56 400,8 600,32 C800,56 1000,10 1200,30 C1320,42 1380,20 1440,28 L1440,56 Z"
              fill="#f0fdf4" />
          </svg>
        </div>
      </section>

      {/* ── Stats ── */}
      <Section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div variants={staggerFast} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <motion.div key={s.label} variants={scaleIn}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className={`${s.bg} ${s.text} p-2.5 rounded-xl mb-3`}>{s.icon}</div>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-gray-500 text-xs mt-1">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── About Banner ── */}
      <Section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={slideInLeft}>
            <span className="text-primary-600 font-semibold text-xs uppercase tracking-widest">Who We Are</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-4 leading-snug">
              Championing Hospitality in Far-Western Nepal
            </h2>
            <p className="text-gray-500 leading-relaxed mb-3 text-sm">
              The Hotel Association of Nepal — Sudurpashchim Province is the official body
              representing hotels, resorts, lodges, guest houses, and homestays across all
              eight districts of Province No. 7.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6 text-sm">
              From the wildlife-rich plains of Kailali and Kanchanpur to the dramatic
              high Himalayan valleys of Darchula and Bajhang, we support businesses
              of all sizes in delivering authentic, memorable experiences.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Learn More <FiArrowRight size={13} />
            </Link>
          </motion.div>

          <motion.div variants={slideInRight} className="grid grid-cols-2 gap-3">
            {[
              { label: "Established", value: "1998", sub: "25+ years of service" },
              { label: "Districts",   value: "8",    sub: "Full province coverage" },
              { label: "Categories",  value: "9",    sub: "Homestay to 4-star" },
              { label: "Events/Year", value: "12+",  sub: "Training & networking" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-2xl font-bold text-primary-600">{item.value}</p>
                <p className="font-semibold text-gray-700 text-sm mt-0.5">{item.label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Services ── */}
      <Section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="text-primary-600 font-semibold text-xs uppercase tracking-widest">What We Do</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Our Core Services</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              Supporting the hospitality sector at every level — from individual businesses to provincial policy.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <motion.div key={s.title} variants={fadeUp}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className={`${s.bg} ${s.text} p-2.5 rounded-xl w-fit mb-4`}>{s.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Featured Members ── */}
      <Section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-primary-600 font-semibold text-xs uppercase tracking-widest">Featured</span>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">Prominent Member Hotels</h2>
            </div>
            <Link to="/membership" className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1 flex-shrink-0">
              View All <FiArrowRight size={13} />
            </Link>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((hotel) => (
              <motion.div key={hotel.id} variants={fadeUp}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-primary-50 text-primary-600 p-2.5 rounded-xl">
                    <MdHotel size={22} />
                  </div>
                  <span className="bg-gray-100 text-gray-600 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    {hotel.category}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{hotel.name}</h3>
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                  <FiMapPin size={12} className="text-primary-400" /> {hotel.location}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{hotel.description}</p>
                <div className="flex flex-wrap gap-1">
                  {hotel.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">{a}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Highlights ── */}
      <Section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="text-primary-600 font-semibold text-xs uppercase tracking-widest">Explore the Region</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Why Visit Sudurpashchim?</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              From rare wildlife to ancient pilgrimage routes, our province offers unmatched diversity.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((h) => (
              <motion.div key={h.name} variants={fadeUp}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow hover:border-primary-200">
                <div className="flex items-center gap-2 mb-2">
                  <FiAward className="text-primary-500" size={15} />
                  <span className="text-[11px] font-bold text-primary-600 uppercase tracking-wide">{h.district}</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-1.5">{h.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section className="bg-primary-700 text-white py-16">
        <motion.div variants={fadeUp} className="max-w-2xl mx-auto px-4 text-center">
          <img
            src="/logo.png"
            alt="HAN Sudurpashchim"
            className="h-16 w-auto object-contain mx-auto mb-5 brightness-0 invert drop-shadow-lg"
          />
          <h2 className="text-3xl font-bold mb-3">Ready to Join Our Association?</h2>
          <p className="text-primary-200 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
            Be part of a growing network of hospitality professionals dedicated to excellence,
            sustainability, and the promotion of Sudurpashchim Province.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact"
              className="bg-white text-primary-700 hover:bg-primary-50 font-semibold px-7 py-2.5 rounded-xl transition-colors text-sm shadow-sm">
              Apply for Membership
            </Link>
            <Link to="/about"
              className="border border-white/30 text-white hover:bg-white/10 font-semibold px-7 py-2.5 rounded-xl transition-colors text-sm">
              Learn More
            </Link>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
