import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdHotel, MdLocationOn, MdVerified, MdTrendingUp, MdHandshake, MdCampaign } from "react-icons/md";
import { FiArrowRight, FiMapPin, FiAward } from "react-icons/fi";
import { hotels } from "../data/hotels";
import { fadeUp, staggerContainer, staggerFast, scaleIn, slideInLeft, slideInRight } from "../lib/animations";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "15+",   label: "Member Hotels"    },
  { value: "8",     label: "Districts"         },
  { value: "500+",  label: "Rooms Available"   },
  { value: "25+",   label: "Years Active"      },
];

const services = [
  { icon: <MdVerified   size={22} />, title: "Quality Assurance",  desc: "Setting and enforcing hospitality standards across all member hotels for consistent guest experiences." },
  { icon: <MdTrendingUp size={22} />, title: "Tourism Promotion",  desc: "Promoting Sudurpashchim Province as a premier destination, from Shuklaphanta to Api Himal." },
  { icon: <MdHandshake  size={22} />, title: "Member Support",     desc: "Training, legal guidance, and business support to help member hotels grow." },
  { icon: <MdCampaign   size={22} />, title: "Advocacy & Policy",  desc: "Representing hospitality businesses before provincial and federal government." },
];

const highlights = [
  { name: "Shuklaphanta National Park", district: "Kanchanpur", desc: "One of the largest open grasslands with endangered wildlife." },
  { name: "Api Himal",                  district: "Darchula",   desc: "Majestic peaks offering world-class trekking and mountaineering." },
  { name: "Kailash Mansarovar Route",   district: "Darchula",   desc: "Sacred pilgrimage corridor attracting devotees from across South Asia." },
  { name: "Mahakali River",             district: "Kanchanpur", desc: "Pristine border river ideal for rafting and nature exploration." },
  { name: "Ramaroshan Lakes",           district: "Achham",     desc: "Sacred lake cluster in lush forests, perfect for spiritual tourism." },
  { name: "Ugratara Temple",            district: "Kailali",    desc: "Historic temple and key cultural heritage of the far-western region." },
];

const featured = hotels.filter(h => ["4 Star", "Resort", "3 Star"].includes(h.category)).slice(0, 3);

function Section({ children, className = "" }) {
  return (
    <motion.section className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
      {children}
    </motion.section>
  );
}

export default function Home() {
  const heroRef    = useRef(null);
  const logoRef    = useRef(null);
  const badgeRef   = useRef(null);
  const titleRef   = useRef(null);
  const subRef     = useRef(null);
  const ctaRef     = useRef(null);
  const statsRef   = useRef(null);
  const cardRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // stagger the left-column elements top-to-bottom
      gsap.set([logoRef.current, badgeRef.current, titleRef.current, subRef.current, ctaRef.current, statsRef.current], {
        opacity: 0, y: 22,
      });
      gsap.set(cardRef.current, { opacity: 0, x: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(logoRef.current,  { opacity: 1, y: 0, duration: 0.45 })
        .to(badgeRef.current,  { opacity: 1, y: 0, duration: 0.4  }, "-=0.25")
        .to(titleRef.current,  { opacity: 1, y: 0, duration: 0.55 }, "-=0.28")
        .to(subRef.current,    { opacity: 1, y: 0, duration: 0.45 }, "-=0.3")
        .to(ctaRef.current,    { opacity: 1, y: 0, duration: 0.4  }, "-=0.28")
        .to(statsRef.current,  { opacity: 1, y: 0, duration: 0.4  }, "-=0.25")
        .to(cardRef.current,   { opacity: 1, x: 0, duration: 0.55 }, "-=0.5");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative bg-dark-950 text-white overflow-hidden" style={{ minHeight: "88vh", display: "flex", alignItems: "center" }}>

        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1800&auto=format&fit=crop&q=80"
            alt="Sudurpashchim Nepal"
            className="w-full h-full object-cover object-[55%_35%]"
            style={{ filter: "brightness(0.2)" }}
          />
        </div>

        {/* Left-side dark overlay for text legibility */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.55) 55%, rgba(2,6,23,0.05) 100%)" }} />

        {/* Content */}
        <div className="relative z-[2] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_300px] gap-10 xl:gap-14 items-center">

            {/* Left */}
            <div>
              {/* Logo */}
              <div ref={logoRef} className="mb-5">
                <img src="/logo.png" alt="HAN Sudurpashchim" className="h-12 w-auto object-contain" />
              </div>

              {/* Badge */}
              <div ref={badgeRef} className="mb-6">
                <span className="inline-flex items-center gap-1.5 bg-dark-800 border border-dark-700 text-primary-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                  Sudurpashchim Province · Province No. 7, Nepal
                </span>
              </div>

              {/* Headline */}
              <h1 ref={titleRef} className="font-bold text-white leading-tight tracking-tight mb-5"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
                Hotel Association<br />
                <span className="text-primary-400">of Nepal</span>
              </h1>

              {/* Subtext */}
              <p ref={subRef} className="text-dark-400 text-base leading-relaxed mb-8 max-w-lg">
                Uniting hospitality businesses across{" "}
                <span className="text-dark-200 font-medium">eight districts</span> of Sudurpashchim Province —
                elevating tourism, upholding standards, and building a thriving economy.
              </p>

              {/* CTAs */}
              <div ref={ctaRef} className="flex flex-wrap gap-3 mb-10">
                <Link to="/membership" className="btn-primary">
                  View Member Hotels <FiArrowRight size={14} />
                </Link>
                <Link to="/contact" className="btn-ghost">
                  Join the Association
                </Link>
              </div>

              {/* Stats */}
              <div ref={statsRef} className="flex flex-wrap gap-x-8 gap-y-4 pt-7 border-t border-dark-800">
                {stats.map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-2xl font-bold text-white leading-none">{value}</p>
                    <p className="text-dark-500 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — info card */}
            <div ref={cardRef} className="hidden lg:block">
              <div className="bg-dark-900 border border-dark-800 rounded-xl p-5 space-y-4">
                {/* Card header */}
                <div className="flex items-center gap-3 pb-4 border-b border-dark-800">
                  <img src="/logo.png" alt="HAN" className="h-9 w-auto object-contain" />
                  <div>
                    <p className="text-white font-bold text-sm">HAN Sudurpashchim</p>
                    <p className="text-dark-500 text-xs mt-0.5">Province No. 7 · Nepal</p>
                  </div>
                </div>
                {/* Rows */}
                {[
                  { label: "Member Hotels",    value: "15+",  primary: true  },
                  { label: "Districts",         value: "8",    primary: true  },
                  { label: "Hotel Categories",  value: "9",    primary: true  },
                  { label: "Established",       value: "1998", primary: false },
                  { label: "Annual Events",     value: "12+",  primary: false },
                ].map(({ label, value, primary }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-dark-500 text-xs">{label}</span>
                    <span className={`font-bold text-sm ${primary ? "text-primary-400" : "text-dark-300"}`}>{value}</span>
                  </div>
                ))}
                {/* Active badge */}
                <div className="flex items-center gap-2 bg-dark-800 border border-dark-700 rounded-lg px-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse flex-shrink-0" />
                  <span className="text-primary-400 text-xs font-medium">Accepting new members</span>
                </div>
                <Link to="/contact" className="btn-primary w-full justify-center text-xs">
                  Apply for Membership <FiArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Wavy bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
            <path d="M0,48 L0,30 C240,48 480,14 720,32 C960,48 1200,18 1440,28 L1440,48 Z" fill="#020617" />
          </svg>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <Section className="border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div variants={staggerFast} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "15+",   label: "Member Hotels",    sub: "Registered & verified"    },
              { value: "8",     label: "Districts",        sub: "Full province coverage"   },
              { value: "500+",  label: "Rooms Available",  sub: "Across all categories"    },
              { value: "2000+", label: "Jobs Created",     sub: "In hospitality sector"    },
            ].map(s => (
              <motion.div key={s.label} variants={scaleIn} className="card p-5 text-center">
                <p className="text-2xl font-bold text-primary-400">{s.value}</p>
                <p className="text-white text-sm font-semibold mt-1">{s.label}</p>
                <p className="text-dark-500 text-xs mt-0.5">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Who we are ── */}
      <Section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={slideInLeft}>
            <p className="section-label mb-2">Who We Are</p>
            <h2 className="section-title mb-4">Championing Hospitality in Far-Western Nepal</h2>
            <p className="section-sub mb-3">
              The Hotel Association of Nepal — Sudurpashchim Province is the official body representing
              hotels, resorts, lodges, guest houses, and homestays across all eight districts of Province No. 7.
            </p>
            <p className="section-sub mb-7">
              From the wildlife-rich plains of Kailali and Kanchanpur to the dramatic high Himalayan valleys
              of Darchula and Bajhang, we support businesses of all sizes.
            </p>
            <Link to="/about" className="btn-primary">Learn More <FiArrowRight size={13} /></Link>
          </motion.div>
          <motion.div variants={slideInRight} className="grid grid-cols-2 gap-3">
            {[
              { label: "Established", value: "1998", sub: "25+ years of service"   },
              { label: "Districts",   value: "8",    sub: "Full province coverage"  },
              { label: "Categories",  value: "9",    sub: "Homestay to 4-star"      },
              { label: "Events/Year", value: "12+",  sub: "Training & networking"   },
            ].map(item => (
              <div key={item.label} className="card p-4">
                <p className="text-2xl font-bold text-primary-400">{item.value}</p>
                <p className="text-white text-sm font-semibold mt-1">{item.label}</p>
                <p className="text-dark-500 text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Services ── */}
      <Section className="py-16 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="mb-10">
            <p className="section-label mb-2">What We Do</p>
            <h2 className="section-title">Our Core Services</h2>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map(s => (
              <motion.div key={s.title} variants={fadeUp} className="card p-5">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-800 text-primary-400 mb-4">
                  {s.icon}
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{s.title}</h3>
                <p className="text-dark-500 text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Featured hotels ── */}
      <Section className="py-16 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label mb-2">Featured</p>
              <h2 className="section-title">Prominent Member Hotels</h2>
            </div>
            <Link to="/membership" className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center gap-1 flex-shrink-0 transition-colors">
              View All <FiArrowRight size={13} />
            </Link>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map(hotel => (
              <motion.div key={hotel.id} variants={fadeUp} className="card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-800 text-primary-400">
                    <MdHotel size={18} />
                  </div>
                  <span className="text-xs text-dark-400 border border-dark-700 px-2 py-0.5 rounded-full">{hotel.category}</span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{hotel.name}</h3>
                <div className="flex items-center gap-1 text-dark-500 text-xs mb-3">
                  <FiMapPin size={11} className="text-primary-600" />{hotel.location}
                </div>
                <p className="text-dark-500 text-xs leading-relaxed mb-3 line-clamp-2">{hotel.description}</p>
                <div className="flex flex-wrap gap-1">
                  {hotel.amenities.slice(0, 3).map(a => (
                    <span key={a} className="text-[10px] text-dark-500 border border-dark-700 px-2 py-0.5 rounded-full">{a}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Highlights ── */}
      <Section className="py-16 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="mb-10">
            <p className="section-label mb-2">Explore the Region</p>
            <h2 className="section-title">Why Visit Sudurpashchim?</h2>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map(h => (
              <motion.div key={h.name} variants={fadeUp} className="card-hover p-5">
                <div className="flex items-center gap-2 mb-2">
                  <FiAward size={13} className="text-primary-500" />
                  <span className="text-xs font-bold text-primary-500 uppercase tracking-wide">{h.district}</span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1.5">{h.name}</h3>
                <p className="text-dark-500 text-xs leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section className="py-16 border-t border-dark-800">
        <motion.div variants={fadeUp} className="max-w-xl mx-auto px-4 text-center">
          <img src="/logo.png" alt="HAN" className="h-12 w-auto object-contain mx-auto mb-6" />
          <h2 className="section-title mb-3">Ready to Join Our Association?</h2>
          <p className="section-sub mb-8 mx-auto max-w-md">
            Be part of a growing network of hospitality professionals dedicated to excellence and
            the promotion of Sudurpashchim Province.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">Apply for Membership <FiArrowRight size={13} /></Link>
            <Link to="/about"   className="btn-ghost">Learn More</Link>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
