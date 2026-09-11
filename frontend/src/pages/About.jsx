import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdVerified, MdGroups, MdHandshake, MdEmojiEvents,
  MdLocationOn, MdFlag,
} from "react-icons/md";
import { FiArrowRight, FiTarget, FiEye } from "react-icons/fi";
import {
  fadeUp, staggerContainer, slideInLeft, slideInRight, scaleIn,
} from "../lib/animations";
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
  { icon: <MdVerified   size={24} />, title: "Integrity",     desc: "Honest, transparent, and ethical practices across all operations.", bg: "bg-primary-50",   text: "text-primary-600"   },
  { icon: <MdGroups     size={24} />, title: "Community",     desc: "Collective action and a strong, supportive hospitality community.",  bg: "bg-secondary-50", text: "text-secondary-600" },
  { icon: <MdHandshake  size={24} />, title: "Collaboration", desc: "Partnerships with government, tourism boards, and private stakeholders.", bg: "bg-amber-50", text: "text-amber-600" },
  { icon: <MdEmojiEvents size={24} />, title: "Excellence",  desc: "High service standards so every guest has an outstanding stay.",    bg: "bg-teal-50",     text: "text-teal-600"     },
];

const team = [
  { name: "Mr. Ram Bahadur Bista",    role: "President",        district: "Kailali",     initials: "RB" },
  { name: "Mrs. Sita Devi Chand",     role: "Vice President",   district: "Kanchanpur",  initials: "SD" },
  { name: "Mr. Hari Prasad Joshi",    role: "General Secretary",district: "Doti",        initials: "HP" },
  { name: "Mr. Gopal Singh Dhami",    role: "Treasurer",        district: "Dadeldhura",  initials: "GS" },
  { name: "Mrs. Kamla Buda",          role: "Joint Secretary",  district: "Achham",      initials: "KB" },
  { name: "Mr. Surya Bahadur Rokaya", role: "Exec. Member",     district: "Bajhang",     initials: "SR" },
  { name: "Mr. Dhan Bahadur Karki",   role: "Exec. Member",     district: "Baitadi",     initials: "DK" },
  { name: "Mrs. Mina Rawal",          role: "Exec. Member",     district: "Darchula",    initials: "MR" },
];

const districts = [
  { name: "Kailali",     hq: "Dhangadhi",         known: "Wildlife, Terai culture"       },
  { name: "Kanchanpur",  hq: "Bhimdatta",          known: "Shuklaphanta National Park"    },
  { name: "Doti",        hq: "Dipayal Silgadhi",   known: "Dodhara Chandani Bridge"       },
  { name: "Achham",      hq: "Mangalsen",           known: "Ramaroshan lakes"              },
  { name: "Dadeldhura",  hq: "Amargadhi",           known: "Tripurasundari Temple"         },
  { name: "Baitadi",     hq: "Dasharathchand",      known: "Pancheswar confluence"         },
  { name: "Darchula",    hq: "Khalanga",            known: "Kailash Mansarovar route"      },
  { name: "Bajhang",     hq: "Chainpur",            known: "Api Himal trekking"            },
];

function Section({ children, className = "" }) {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
    >
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
          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-6">
            {/* Mission */}
            <motion.div variants={slideInLeft}
              className="bg-white border border-gray-100 rounded-xl p-7 shadow-sm border-t-4 border-t-primary-500">
              <div className="bg-primary-50 text-primary-600 p-2.5 rounded-xl w-fit mb-4">
                <FiTarget size={22} />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                To unite, represent, and empower the hospitality industry of Sudurpashchim
                Province through advocacy, quality standards, capacity building, and tourism promotion.
              </p>
              <ul className="space-y-2">
                {["Promote responsible and sustainable tourism", "Maintain quality standards across all member hotels",
                  "Advocate for favorable government policies", "Support skill development and training"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-500 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div variants={slideInRight}
              className="bg-white border border-gray-100 rounded-xl p-7 shadow-sm border-t-4 border-t-secondary-500">
              <div className="bg-secondary-50 text-secondary-600 p-2.5 rounded-xl w-fit mb-4">
                <FiEye size={22} />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                To transform Sudurpashchim Province into a leading tourism destination in South Asia,
                recognised for world-class hospitality and authentic cultural experiences.
              </p>
              <ul className="space-y-2">
                {["Sudurpashchim as a top eco-tourism destination", "Internationally recognised hospitality standards",
                  "Sustainable growth for local communities", "Preservation of cultural and natural heritage"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-500 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Core Values */}
      <Section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="text-primary-600 font-semibold text-xs uppercase tracking-widest">What We Stand For</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Our Core Values</h2>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <motion.div key={v.title} variants={scaleIn}
                className="bg-white border border-gray-100 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className={`${v.bg} ${v.text} p-2.5 rounded-xl w-fit mx-auto mb-3`}>{v.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Timeline */}
      <Section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="text-primary-600 font-semibold text-xs uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">History & Milestones</h2>
            <p className="text-gray-500 text-sm mt-2">Over two decades serving the hospitality industry of far-western Nepal.</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />
            <motion.div variants={staggerContainer} className="space-y-6">
              {timeline.map((item, idx) => (
                <motion.div key={item.year} variants={idx % 2 === 0 ? slideInLeft : slideInRight}
                  className={`relative flex md:gap-0 gap-5 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`w-full md:w-5/12 pl-10 md:pl-0 ${idx % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                      <span className="text-primary-600 font-bold text-xs">{item.year}</span>
                      <h3 className="font-bold text-gray-800 text-sm mt-1 mb-1">{item.event}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-3.5 h-3.5 rounded-full bg-primary-600 border-4 border-white shadow z-10" />
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Executive team */}
      <Section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="text-primary-600 font-semibold text-xs uppercase tracking-widest">Leadership</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Executive Committee</h2>
            <p className="text-gray-500 text-sm mt-2">Elected representatives from all districts of the province.</p>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {team.map((m) => (
              <motion.div key={m.name} variants={scaleIn}
                className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">
                  {m.initials}
                </div>
                <h3 className="font-bold text-gray-800 text-xs leading-snug">{m.name}</h3>
                <p className="text-primary-600 text-[11px] font-semibold mt-1">{m.role}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <MdLocationOn size={11} className="text-gray-400" />
                  <span className="text-gray-400 text-[10px]">{m.district}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Districts */}
      <Section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="text-primary-600 font-semibold text-xs uppercase tracking-widest">Coverage</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Districts of Province No. 7</h2>
            <p className="text-gray-500 text-sm mt-2">We represent hotels across all eight districts.</p>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {districts.map((d, i) => (
              <motion.div key={d.name} variants={fadeUp}
                className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:border-primary-200 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="bg-primary-600 text-white text-xs font-bold w-6 h-6 rounded-lg flex items-center justify-center">{i + 1}</span>
                  <MdFlag className="text-gray-300" size={16} />
                </div>
                <h3 className="font-bold text-gray-800 mb-0.5">{d.name}</h3>
                <p className="text-primary-600 text-xs font-medium mb-2">{d.hq}</p>
                <p className="text-gray-500 text-xs">{d.known}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-primary-700 text-white py-14">
        <motion.div variants={fadeUp} className="max-w-xl mx-auto px-4 text-center">
          <img
            src="/logo.png"
            alt="HAN Sudurpashchim"
            className="h-16 w-auto object-contain mx-auto mb-5 brightness-0 invert drop-shadow-lg"
          />
          <h2 className="text-3xl font-bold mb-3">Become a Member Today</h2>
          <p className="text-primary-200 text-sm mb-8 leading-relaxed">
            Join our growing network of hospitality professionals and benefit from collective
            advocacy, training, and tourism promotion.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="bg-white text-primary-700 hover:bg-primary-50 font-semibold px-7 py-2.5 rounded-xl transition-colors text-sm flex items-center gap-2 shadow-sm">
              Apply Now <FiArrowRight size={13} />
            </Link>
            <Link to="/membership" className="border border-white/30 text-white hover:bg-white/10 font-semibold px-7 py-2.5 rounded-xl transition-colors text-sm">
              View Members
            </Link>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
