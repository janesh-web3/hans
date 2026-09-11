import { Link } from "react-router-dom";
import {
  MdHotel,
  MdStar,
  MdGroups,
  MdLocationOn,
  MdVerified,
  MdTrendingUp,
  MdHandshake,
  MdCampaign,
} from "react-icons/md";
import {
  FiArrowRight,
  FiMapPin,
  FiPhone,
  FiAward,
} from "react-icons/fi";
import { hotels } from "../data/hotels";

const stats = [
  { value: "15+", label: "Member Hotels", icon: <MdHotel size={28} />, color: "bg-primary-50 text-primary-600" },
  { value: "8", label: "Districts Covered", icon: <MdLocationOn size={28} />, color: "bg-secondary-50 text-secondary-600" },
  { value: "500+", label: "Rooms Available", icon: <MdStar size={28} />, color: "bg-amber-50 text-amber-600" },
  { value: "2000+", label: "Jobs Created", icon: <MdGroups size={28} />, color: "bg-teal-50 text-teal-600" },
];

const services = [
  {
    icon: <MdVerified size={32} />,
    title: "Quality Assurance",
    description:
      "We set and enforce hospitality standards across all member hotels to ensure guests receive consistent, high-quality service throughout the province.",
    color: "bg-primary-50 text-primary-600",
  },
  {
    icon: <MdTrendingUp size={32} />,
    title: "Tourism Promotion",
    description:
      "Actively promoting Sudurpashchim Province as a premier tourism destination, showcasing natural wonders from Shuklaphanta to the Api Himal.",
    color: "bg-secondary-50 text-secondary-600",
  },
  {
    icon: <MdHandshake size={32} />,
    title: "Member Support",
    description:
      "Providing training, legal guidance, and business support to help our member hotels grow and thrive in an evolving hospitality landscape.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: <MdCampaign size={32} />,
    title: "Advocacy & Policy",
    description:
      "Representing the interests of hospitality businesses before provincial and federal government bodies for fair regulation and infrastructure development.",
    color: "bg-teal-50 text-teal-600",
  },
];

const highlights = [
  { name: "Shuklaphanta National Park", district: "Kanchanpur", desc: "Home to one of the world's largest open grasslands and endangered wildlife." },
  { name: "Api Himal", district: "Darchula", desc: "Majestic snow-capped peaks offering world-class trekking and mountaineering." },
  { name: "Kailash Mansarovar Route", district: "Darchula", desc: "Sacred pilgrimage corridor attracting devotees from across South Asia." },
  { name: "Mahakali River", district: "Kanchanpur", desc: "Pristine river bordering India, ideal for rafting and nature exploration." },
  { name: "Ramaroshan Lake", district: "Achham", desc: "A cluster of sacred lakes nestled in lush forests, perfect for spiritual tourism." },
  { name: "Ugratara Temple", district: "Kailali", desc: "Historic temple and important cultural heritage site of the far-western region." },
];

// Show only first 3 featured hotels
const featuredHotels = hotels.filter((h) => ["4 Star", "5 Star", "Resort"].includes(h.category)).slice(0, 3);

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-700 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full border-4 border-white" />
          <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full border-4 border-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <MdLocationOn size={16} />
              Sudurpashchim Province — Province No. 7, Nepal
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Hotel Association <br />
              <span className="text-primary-200">of Nepal</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-100 leading-relaxed mb-8 max-w-2xl">
              Uniting hospitality businesses across eight districts of
              Sudurpashchim Province to elevate tourism, uphold standards, and
              build a thriving economy for the far-western region of Nepal.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/membership"
                className="bg-white text-primary-700 hover:bg-primary-50 font-semibold px-7 py-3 rounded-xl transition-colors duration-200 flex items-center gap-2"
              >
                View Member Hotels <FiArrowRight />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-7 py-3 rounded-xl transition-colors duration-200"
              >
                Join the Association
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div key={s.label} className="card p-6 flex flex-col items-center text-center">
              <div className={`${s.color} p-3 rounded-xl mb-3`}>{s.icon}</div>
              <p className="text-3xl font-bold text-gray-800">{s.value}</p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About Banner ── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
                Who We Are
              </span>
              <h2 className="section-title mt-2 mb-4">
                Championing Hospitality in Far-Western Nepal
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Hotel Association of Nepal — Sudurpashchim Province is the
                official body representing hotels, resorts, lodges, guest houses,
                and homestays across all eight districts of Province No. 7.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                From the wildlife-rich plains of Kailali and Kanchanpur to the
                dramatic high Himalayan valleys of Darchula and Bajhang, we
                support businesses of all sizes in delivering authentic and
                memorable experiences to every visitor.
              </p>
              <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                Learn More About Us <FiArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Established", value: "1998", sub: "Over 25 years of service" },
                { label: "Districts", value: "8", sub: "Full province coverage" },
                { label: "Hotel Categories", value: "9", sub: "From homestay to 4-star" },
                { label: "Annual Events", value: "12+", sub: "Training & networking" },
              ].map((item) => (
                <div key={item.label} className="card p-5">
                  <p className="text-3xl font-bold text-primary-600">{item.value}</p>
                  <p className="font-semibold text-gray-800 mt-1">{item.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              What We Do
            </span>
            <h2 className="section-title mt-2">Our Core Services</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Supporting the hospitality sector at every level — from individual
              businesses to provincial policy.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="card p-6 flex flex-col gap-4">
                <div className={`${s.color} p-3 rounded-xl w-fit`}>{s.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Members ── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
                Featured Members
              </span>
              <h2 className="section-title mt-2">Prominent Member Hotels</h2>
            </div>
            <Link
              to="/membership"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 flex-shrink-0"
            >
              View All Members <FiArrowRight />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.map((hotel) => (
              <div key={hotel.id} className="card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white p-3 rounded-xl">
                    <MdHotel size={24} />
                  </div>
                  <span className="bg-primary-50 text-primary-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {hotel.category}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">{hotel.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                  <FiMapPin size={14} className="text-primary-500" />
                  {hotel.location}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {hotel.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {hotel.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                      {a}
                    </span>
                  ))}
                </div>
                <a
                  href={`tel:${hotel.phone}`}
                  className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  <FiPhone size={14} /> {hotel.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tourist Highlights ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              Explore the Region
            </span>
            <h2 className="section-title mt-2">
              Why Visit Sudurpashchim?
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              From rare wildlife to ancient pilgrimage routes, our province
              offers unmatched diversity for every kind of traveller.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <div
                key={h.name}
                className="card p-6 border-l-4 border-primary-500 hover:border-secondary-500 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FiAward className="text-primary-500" size={18} />
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                    {h.district}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{h.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MdHandshake className="mx-auto mb-4 text-white/80" size={48} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Association?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Be part of a growing network of hospitality professionals dedicated
            to excellence, sustainability, and the promotion of Sudurpashchim
            Province as a world-class travel destination.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-primary-700 hover:bg-primary-50 font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Apply for Membership
            </Link>
            <Link
              to="/about"
              className="border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
