import { Link } from "react-router-dom";
import {
  MdVerified,
  MdGroups,
  MdHandshake,
  MdEmojiEvents,
  MdLocationOn,
  MdHistory,
  MdVisibility,
  MdFlag,
} from "react-icons/md";
import { FiArrowRight, FiTarget, FiEye, FiStar } from "react-icons/fi";

const timeline = [
  { year: "1998", event: "Association Founded", desc: "Hotel Association of Nepal — Far-Western Region established in Dhangadhi with 5 founding member hotels." },
  { year: "2002", event: "Provincial Expansion", desc: "Membership expanded to cover all seven districts of the then Far-Western Development Region." },
  { year: "2008", event: "Tourism Promotion Drive", desc: "Launched first regional tourism campaign highlighting Shuklaphanta and Kailash route." },
  { year: "2015", event: "Standards Framework", desc: "Introduced hotel classification and quality standards for member establishments." },
  { year: "2018", event: "Province Restructuring", desc: "Officially re-registered as Hotel Association of Nepal — Sudurpashchim Province (Province No. 7) following federal restructuring." },
  { year: "2022", event: "Digital Initiative", desc: "Launched digital platform to improve member visibility and online booking capabilities." },
  { year: "2024", event: "Growing Strong", desc: "Membership surpassed 15 registered hotels and lodges with plans for ongoing expansion." },
];

const values = [
  { icon: <MdVerified size={28} />, title: "Integrity", desc: "We uphold honest, transparent, and ethical practices across all our operations and member relationships.", color: "bg-primary-50 text-primary-600" },
  { icon: <MdGroups size={28} />, title: "Community", desc: "We believe in the power of collective action and building a strong, supportive hospitality community.", color: "bg-secondary-50 text-secondary-600" },
  { icon: <MdHandshake size={28} />, title: "Collaboration", desc: "We foster partnerships with government, tourism boards, and private stakeholders for mutual growth.", color: "bg-amber-50 text-amber-600" },
  { icon: <MdEmojiEvents size={28} />, title: "Excellence", desc: "We champion high service standards to ensure every guest visiting our province has an outstanding stay.", color: "bg-teal-50 text-teal-600" },
];

const team = [
  { name: "Mr. Ram Bahadur Bista", role: "President", district: "Kailali", initials: "RB" },
  { name: "Mrs. Sita Devi Chand", role: "Vice President", district: "Kanchanpur", initials: "SD" },
  { name: "Mr. Hari Prasad Joshi", role: "General Secretary", district: "Doti", initials: "HP" },
  { name: "Mr. Gopal Singh Dhami", role: "Treasurer", district: "Dadeldhura", initials: "GS" },
  { name: "Mrs. Kamla Buda", role: "Joint Secretary", district: "Achham", initials: "KB" },
  { name: "Mr. Surya Bahadur Rokaya", role: "Executive Member", district: "Bajhang", initials: "SR" },
  { name: "Mr. Dhan Bahadur Karki", role: "Executive Member", district: "Baitadi", initials: "DK" },
  { name: "Mrs. Mina Rawal", role: "Executive Member", district: "Darchula", initials: "MR" },
];

const districts = [
  { name: "Kailali", hq: "Dhangadhi", area: "3235 km²", pop: "775,709", known: "Wildlife, Terai culture" },
  { name: "Kanchanpur", hq: "Bhimdatta", area: "1610 km²", pop: "451,248", known: "Shuklaphanta National Park" },
  { name: "Doti", hq: "Dipayal Silgadhi", area: "2025 km²", pop: "211,746", known: "Dodhara Chandani Bridge" },
  { name: "Achham", hq: "Mangalsen", area: "1680 km²", pop: "257,477", known: "Ramaroshan lakes" },
  { name: "Dadeldhura", hq: "Amargadhi", area: "1538 km²", pop: "142,094", known: "Tripurasundari Temple" },
  { name: "Baitadi", hq: "Dasharathchand", area: "1519 km²", pop: "275,400", known: "Pancheswar confluence" },
  { name: "Darchula", hq: "Khalanga", area: "2322 km²", pop: "133,801", known: "Kailash Mansarovar route" },
  { name: "Bajhang", hq: "Chainpur", area: "3422 km²", pop: "195,159", known: "Api Himal trekking" },
];

export default function About() {
  return (
    <div>
      {/* ── Page Hero ── */}
      <section className="bg-gradient-to-br from-primary-700 to-secondary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              <MdLocationOn size={16} /> Province No. 7 — Nepal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Association</h1>
            <p className="text-primary-100 text-lg leading-relaxed max-w-2xl">
              Since 1998, the Hotel Association of Nepal — Sudurpashchim Province
              has been the unified voice of hospitality businesses across the
              far-western region, driving growth, standards, and tourism promotion.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="card p-8 border-t-4 border-primary-500">
              <div className="bg-primary-50 text-primary-600 p-3 rounded-xl w-fit mb-5">
                <FiTarget size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To unite, represent, and empower the hospitality industry of
                Sudurpashchim Province by providing advocacy, quality standards,
                capacity building, and tourism promotion.
              </p>
              <ul className="space-y-2">
                {[
                  "Promote responsible and sustainable tourism",
                  "Maintain quality standards across all member hotels",
                  "Advocate for favorable government policies",
                  "Support skill development and training programs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="card p-8 border-t-4 border-secondary-500">
              <div className="bg-secondary-50 text-secondary-600 p-3 rounded-xl w-fit mb-5">
                <FiEye size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To transform Sudurpashchim Province into a leading tourism
                destination in South Asia, recognised for world-class hospitality,
                natural wonders, and authentic cultural experiences.
              </p>
              <ul className="space-y-2">
                {[
                  "Sudurpashchim as a top eco-tourism destination",
                  "Internationally recognised hospitality standards",
                  "Sustainable growth for local communities",
                  "Preservation of cultural and natural heritage",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">What We Stand For</span>
            <h2 className="section-title mt-2">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card p-6 text-center">
                <div className={`${v.color} p-3 rounded-xl w-fit mx-auto mb-4`}>{v.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── History Timeline ── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
            <h2 className="section-title mt-2">History & Milestones</h2>
            <p className="section-subtitle">Over two decades of serving the hospitality industry of far-western Nepal.</p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-100 -translate-x-1/2" />

            <div className="space-y-8">
              {timeline.map((item, idx) => (
                <div
                  key={item.year}
                  className={`relative flex gap-6 md:gap-0 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"} pl-14 md:pl-0`}>
                    <div className="card p-5">
                      <span className="text-primary-600 font-bold text-sm">{item.year}</span>
                      <h3 className="font-bold text-gray-800 mt-1 mb-2">{item.event}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-5 w-4 h-4 rounded-full bg-primary-600 border-4 border-white shadow-md z-10" />

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Executive Team ── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Leadership</span>
            <h2 className="section-title mt-2">Executive Committee</h2>
            <p className="section-subtitle">Elected representatives from all districts of the province.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <div key={member.name} className="card p-5 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {member.initials}
                </div>
                <h3 className="font-bold text-gray-800 text-sm leading-snug">{member.name}</h3>
                <p className="text-primary-600 text-xs font-semibold mt-1">{member.role}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <MdLocationOn size={12} className="text-gray-400" />
                  <span className="text-gray-400 text-xs">{member.district}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Districts Coverage ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Coverage</span>
            <h2 className="section-title mt-2">Districts of Province No. 7</h2>
            <p className="section-subtitle">We represent hotels across all eight districts of Sudurpashchim Province.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {districts.map((d, i) => (
              <div key={d.name} className="card p-5 hover:border-l-4 hover:border-primary-500 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary-600 text-white text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center">
                    {i + 1}
                  </span>
                  <MdFlag className="text-gray-300" size={20} />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">{d.name}</h3>
                <p className="text-primary-600 text-xs font-medium mb-2">{d.hq}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>Area: {d.area}</p>
                  <p>Population: {d.pop}</p>
                  <p className="text-gray-600 font-medium mt-2">Known for: {d.known}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-700 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Become a Member Today</h2>
          <p className="text-primary-100 mb-8">
            Join our growing network of hospitality professionals and benefit from
            collective advocacy, training, and tourism promotion.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-primary-700 hover:bg-primary-50 font-semibold px-8 py-3 rounded-xl transition-colors inline-flex items-center gap-2">
              Apply Now <FiArrowRight />
            </Link>
            <Link to="/membership" className="border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl transition-colors">
              View Members
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
