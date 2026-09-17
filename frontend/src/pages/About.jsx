import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdVerified, MdGroups, MdHandshake, MdEmojiEvents, MdLocationOn, MdFlag } from "react-icons/md";
import { FiArrowRight, FiTarget, FiEye } from "react-icons/fi";
import { fadeUp, staggerContainer, slideInLeft, slideInRight, scaleIn } from "../lib/animations";
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

const values = [
  { icon: <MdVerified   size={20} />, title: "Integrity",     desc: "Honest, transparent, and ethical practices across all operations." },
  { icon: <MdGroups     size={20} />, title: "Community",     desc: "Collective action and a strong, supportive hospitality community." },
  { icon: <MdHandshake  size={20} />, title: "Collaboration", desc: "Partnerships with government, tourism boards, and private stakeholders." },
  { icon: <MdEmojiEvents size={20} />, title: "Excellence",  desc: "High service standards so every guest has an outstanding stay." },
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

function Section({ children, className = "" }) {
  return (
    <motion.section className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
      {children}
    </motion.section>
  );
}

export default function About() {
  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&auto=format&fit=crop&q=75"
        badge="Province No. 7 — Nepal"
        title="About Our Association"
        subtitle="Since 1998, HAN Sudurpashchim has been the unified voice of hospitality businesses across the far-western region, driving growth, standards, and tourism promotion."
      />

      {/* Mission & Vision */}
      <Section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-5">
            <motion.div variants={slideInLeft} className="card p-6 border-t-2 border-t-primary-600">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-800 text-primary-400 mb-4">
                <FiTarget size={18} />
              </div>
              <h2 className="text-white font-bold text-lg mb-3">Our Mission</h2>
              <p className="text-dark-400 text-sm leading-relaxed mb-4">
                To unite, represent, and empower the hospitality industry of Sudurpashchim Province
                through advocacy, quality standards, capacity building, and tourism promotion.
              </p>
              <ul className="space-y-2">
                {["Promote responsible and sustainable tourism","Maintain quality standards across all member hotels","Advocate for favorable government policies","Support skill development and training"].map(item => (
                  <li key={item} className="flex items-start gap-2 text-dark-500 text-xs">
                    <span className="w-1 h-1 rounded-full bg-primary-600 mt-1.5 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={slideInRight} className="card p-6 border-t-2 border-t-secondary-600">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-800 text-secondary-400 mb-4">
                <FiEye size={18} />
              </div>
              <h2 className="text-white font-bold text-lg mb-3">Our Vision</h2>
              <p className="text-dark-400 text-sm leading-relaxed mb-4">
                To transform Sudurpashchim Province into a leading tourism destination in South Asia,
                recognised for world-class hospitality and authentic cultural experiences.
              </p>
              <ul className="space-y-2">
                {["Sudurpashchim as a top eco-tourism destination","Internationally recognised hospitality standards","Sustainable growth for local communities","Preservation of cultural and natural heritage"].map(item => (
                  <li key={item} className="flex items-start gap-2 text-dark-500 text-xs">
                    <span className="w-1 h-1 rounded-full bg-secondary-600 mt-1.5 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Core Values */}
      <Section className="py-14 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="mb-10">
            <p className="section-label mb-2">What We Stand For</p>
            <h2 className="section-title">Our Core Values</h2>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map(v => (
              <motion.div key={v.title} variants={scaleIn} className="card p-5">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-800 text-primary-400 mb-4">{v.icon}</div>
                <h3 className="text-white font-semibold text-sm mb-2">{v.title}</h3>
                <p className="text-dark-500 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Timeline */}
      <Section className="py-14 border-t border-dark-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="mb-10">
            <p className="section-label mb-2">Our Journey</p>
            <h2 className="section-title">History & Milestones</h2>
            <p className="section-sub mt-2">Over two decades serving the hospitality industry of far-western Nepal.</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-dark-800 -translate-x-1/2" />
            <motion.div variants={staggerContainer} className="space-y-6">
              {timeline.map((item, idx) => (
                <motion.div key={item.year} variants={fadeUp}
                  className={`relative flex md:gap-0 gap-5 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`w-full md:w-5/12 pl-10 md:pl-0 ${idx % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <div className="card p-4">
                      <span className="text-primary-500 font-bold text-xs">{item.year}</span>
                      <h3 className="text-white font-semibold text-sm mt-1 mb-1">{item.event}</h3>
                      <p className="text-dark-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-3 h-3 rounded-full bg-primary-600 border-2 border-dark-950 z-10" />
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Executive Team */}
      <Section className="py-14 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="mb-10">
            <p className="section-label mb-2">Leadership</p>
            <h2 className="section-title">Executive Committee</h2>
            <p className="section-sub mt-2">Elected representatives from all districts of the province.</p>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {team.map(m => (
              <motion.div key={m.name} variants={scaleIn} className="card p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-dark-800 border border-dark-700 text-primary-400 flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {m.initials}
                </div>
                <h3 className="text-white font-semibold text-xs leading-snug">{m.name}</h3>
                <p className="text-primary-500 text-[11px] font-medium mt-1">{m.role}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <MdLocationOn size={11} className="text-dark-600" />
                  <span className="text-dark-600 text-[10px]">{m.district}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Districts */}
      <Section className="py-14 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="mb-10">
            <p className="section-label mb-2">Coverage</p>
            <h2 className="section-title">Districts of Province No. 7</h2>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {districts.map((d, i) => (
              <motion.div key={d.name} variants={fadeUp} className="card-hover p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-primary-500 font-bold text-xs border border-primary-800 px-2 py-0.5 rounded">{String(i + 1).padStart(2, "0")}</span>
                  <MdFlag className="text-dark-700" size={14} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-0.5">{d.name}</h3>
                <p className="text-primary-600 text-xs font-medium mb-2">{d.hq}</p>
                <p className="text-dark-500 text-xs">{d.known}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-14 border-t border-dark-800">
        <motion.div variants={fadeUp} className="max-w-lg mx-auto px-4 text-center">
          <img src="/logo.png" alt="HAN" className="h-10 w-auto object-contain mx-auto mb-5" />
          <h2 className="section-title mb-3">Become a Member Today</h2>
          <p className="section-sub mb-7 mx-auto">
            Join our growing network of hospitality professionals and benefit from collective
            advocacy, training, and tourism promotion.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">Apply Now <FiArrowRight size={13} /></Link>
            <Link to="/membership" className="btn-ghost">View Members</Link>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
