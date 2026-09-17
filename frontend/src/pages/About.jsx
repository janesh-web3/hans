import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import PageHero from "../components/PageHero";

const timeline = [
  { year: "1998", event: "Association Founded",    desc: "Established in Dhangadhi with 5 founding member hotels." },
  { year: "2002", event: "Provincial Expansion",   desc: "Membership expanded to all seven districts of the Far-Western Development Region." },
  { year: "2008", event: "Tourism Promotion",      desc: "Launched first regional campaign highlighting Shuklaphanta and the Kailash route." },
  { year: "2015", event: "Standards Framework",    desc: "Introduced hotel classification and quality standards for member establishments." },
  { year: "2018", event: "Province Restructuring", desc: "Re-registered as HAN Sudurpashchim Province (Province No. 7) after federal restructuring." },
  { year: "2022", event: "Digital Initiative",     desc: "Launched digital platform to improve member visibility and booking capabilities." },
  { year: "2024", event: "Growing Strong",         desc: "Membership surpassed 15 registered hotels with ongoing expansion plans." },
];

const team = [
  { name: "Mr. Ram Bahadur Bista",    role: "President",         district: "Kailali",    initials: "RB" },
  { name: "Mrs. Sita Devi Chand",     role: "Vice President",    district: "Kanchanpur", initials: "SD" },
  { name: "Mr. Hari Prasad Joshi",    role: "General Secretary", district: "Doti",       initials: "HP" },
  { name: "Mr. Gopal Singh Dhami",    role: "Treasurer",         district: "Dadeldhura", initials: "GS" },
  { name: "Mrs. Kamla Buda",          role: "Joint Secretary",   district: "Achham",     initials: "KB" },
  { name: "Mr. Surya Bahadur Rokaya", role: "Exec. Member",      district: "Bajhang",    initials: "SR" },
  { name: "Mr. Dhan Bahadur Karki",   role: "Exec. Member",      district: "Baitadi",    initials: "DK" },
  { name: "Mrs. Mina Rawal",          role: "Exec. Member",      district: "Darchula",   initials: "MR" },
];

const districts = [
  { name: "Kailali",    hq: "Dhangadhi",       known: "Wildlife, Terai culture"    },
  { name: "Kanchanpur", hq: "Bhimdatta",        known: "Shuklaphanta National Park" },
  { name: "Doti",       hq: "Dipayal Silgadhi", known: "Dodhara Chandani Bridge"    },
  { name: "Achham",     hq: "Mangalsen",         known: "Ramaroshan lakes"           },
  { name: "Dadeldhura", hq: "Amargadhi",         known: "Tripurasundari Temple"      },
  { name: "Baitadi",    hq: "Dasharathchand",    known: "Pancheswar confluence"      },
  { name: "Darchula",   hq: "Khalanga",          known: "Kailash Mansarovar route"   },
  { name: "Bajhang",    hq: "Chainpur",          known: "Api Himal trekking"         },
];

export default function About() {
  return (
    <div className="bg-white dark:bg-dark-950">
      <PageHero
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&auto=format&fit=crop&q=75"
        badge="Province No. 7 — Nepal"
        title="About Our Association"
        subtitle="Since 1998, HAN Sudurpashchim has been the unified voice of hospitality businesses across the far-western region."
      />

      {/* ── Mission & Vision ─────────────────────────────────────────────── */}
      <section className="section-pad bg-white dark:bg-dark-900 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-xl mb-12">
            <span className="section-label">Who We Are</span>
            <h2 className="section-heading">Mission &amp; Vision</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-surface-200 dark:bg-dark-700">

            {/* Mission */}
            <div className="bg-white dark:bg-dark-900 p-10 border-t-4 border-primary-600">
              <h3 className="text-surface-900 dark:text-white font-bold text-xl mb-4">Our Mission</h3>
              <p className="text-surface-600 dark:text-dark-400 text-sm leading-relaxed mb-6">
                To unite, represent, and empower the hospitality industry of Sudurpashchim Province
                through advocacy, quality standards, capacity building, and tourism promotion.
              </p>
              <ul className="space-y-3">
                {[
                  "Promote responsible and sustainable tourism",
                  "Maintain quality standards across all member hotels",
                  "Advocate for favorable government policies",
                  "Support skill development and training",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-surface-600 dark:text-dark-400">
                    <span className="w-[3px] h-4 bg-primary-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-dark-900 p-10 border-t-4 border-secondary-600">
              <h3 className="text-surface-900 dark:text-white font-bold text-xl mb-4">Our Vision</h3>
              <p className="text-surface-600 dark:text-dark-400 text-sm leading-relaxed mb-6">
                To transform Sudurpashchim Province into a leading tourism destination in South Asia,
                recognised for world-class hospitality and authentic cultural experiences.
              </p>
              <ul className="space-y-3">
                {[
                  "Sudurpashchim as a top eco-tourism destination",
                  "Internationally recognised hospitality standards",
                  "Sustainable growth for local communities",
                  "Preservation of cultural and natural heritage",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-surface-600 dark:text-dark-400">
                    <span className="w-[3px] h-4 bg-secondary-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── History & Milestones ─────────────────────────────────────────── */}
      <section className="section-pad bg-surface-50 dark:bg-dark-950 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-[380px_1fr] gap-16">

            {/* Sticky heading column */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="section-label">Our Journey</span>
              <h2 className="section-heading">History &amp; Milestones</h2>
              <p className="section-body">
                Over two decades of serving the hospitality industry of far-western Nepal —
                growing from five founding hotels to a province-wide network.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical rule */}
              <div className="absolute left-[18px] top-0 bottom-0 w-px bg-surface-200 dark:bg-dark-700" />

              <div className="space-y-0">
                {timeline.map((item, i) => (
                  <div key={item.year} className="flex gap-8 pb-10 last:pb-0">
                    {/* Dot */}
                    <div className="relative flex-shrink-0 mt-1">
                      <div className="w-9 h-9 bg-white dark:bg-dark-950 border-2 border-primary-500 flex items-center justify-center z-10 relative">
                        <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400">
                          {item.year.slice(2)}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="pt-1">
                      <p className="text-xs font-bold text-primary-600 dark:text-primary-500 uppercase tracking-widest mb-1">
                        {item.year}
                      </p>
                      <h3 className="text-surface-900 dark:text-white font-bold text-base mb-1.5">
                        {item.event}
                      </h3>
                      <p className="text-surface-500 dark:text-dark-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Executive Committee ──────────────────────────────────────────── */}
      <section className="section-pad bg-white dark:bg-dark-900 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-xl mb-12">
            <span className="section-label">Leadership</span>
            <h2 className="section-heading">Executive Committee</h2>
            <p className="section-body">
              Elected representatives from all districts of the province.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-surface-200 dark:bg-dark-700">
            {team.map((m, i) => (
              <div key={m.name} className="bg-white dark:bg-dark-900 p-6 hover:bg-surface-50 dark:hover:bg-dark-800 transition-colors">
                {/* Initials avatar */}
                <div className="w-12 h-12 bg-primary-600 flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-sm">{m.initials}</span>
                </div>
                <p className="text-surface-900 dark:text-white font-bold text-sm leading-snug mb-1">{m.name}</p>
                <p className="text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-wide mb-1">
                  {m.role}
                </p>
                <p className="text-surface-400 dark:text-dark-500 text-xs">{m.district}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Districts ────────────────────────────────────────────────────── */}
      <section className="section-pad bg-surface-50 dark:bg-dark-950 border-b border-surface-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-xl mb-12">
            <span className="section-label">Coverage Area</span>
            <h2 className="section-heading">Districts of Province No. 7</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-200 dark:bg-dark-700">
            {districts.map((d, i) => (
              <div key={d.name} className="bg-white dark:bg-dark-900 p-6 hover:bg-surface-50 dark:hover:bg-dark-800 transition-colors">
                <p className="text-3xl font-bold text-surface-200 dark:text-dark-700 leading-none mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-surface-900 dark:text-white font-bold text-base mb-1">{d.name}</h3>
                <p className="text-surface-400 dark:text-dark-500 text-xs font-medium mb-2">{d.hq}</p>
                <p className="text-surface-500 dark:text-dark-400 text-sm leading-relaxed">{d.known}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
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
                Become a Member
              </h2>
              <p className="text-white/70 text-base leading-relaxed max-w-xl">
                Join our growing network and benefit from collective advocacy, training programmes,
                and tourism promotion across Province No. 7.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:flex-col">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold text-sm px-8 py-4 hover:bg-primary-50 transition-colors"
              >
                Apply Now <FiArrowRight size={14} />
              </Link>
              <Link to="/membership" className="btn-outline-white">
                View Members
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
