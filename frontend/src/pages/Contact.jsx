import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdPhone, MdEmail, MdLocationOn, MdAccessTime, MdSend, MdCheckCircle,
} from "react-icons/md";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { fadeUp, staggerContainer, scaleIn, slideInLeft, slideInRight } from "../lib/animations";
import PageHero from "../components/PageHero";

const INFO = [
  {
    key: "loc", title: "Office Address",
    lines: ["Dhangadhi-4, Kailali", "Sudurpashchim Province, Nepal"],
    col: "text-primary-400",
  },
  {
    key: "phone", title: "Phone",
    lines: ["+977-091-521000", "+977-091-521001"],
    col: "text-secondary-400", link: "tel:+977091521000",
  },
  {
    key: "email", title: "Email",
    lines: ["info@hansudurpashchim.org.np", "membership@hansudurpashchim.org.np"],
    col: "text-primary-400", link: "mailto:info@hansudurpashchim.org.np",
  },
  {
    key: "time", title: "Office Hours",
    lines: ["Sun–Fri: 9:00 AM – 5:00 PM", "Saturday & Holidays: Closed"],
    col: "text-secondary-400",
  },
];

const REASONS = [
  "New hotel membership registration", "Membership renewal", "General inquiry",
  "Complaint or feedback", "Media / press inquiry", "Partnership proposal",
  "Training & events", "Other",
];

const DISTRICTS = [
  "Kailali", "Kanchanpur", "Doti", "Achham",
  "Dadeldhura", "Baitadi", "Darchula", "Bajhang",
];

function InfoIcon({ k, cls }) {
  const p = { size: 20, className: cls };
  if (k === "loc")   return <MdLocationOn  {...p} />;
  if (k === "phone") return <MdPhone        {...p} />;
  if (k === "email") return <MdEmail        {...p} />;
  return <MdAccessTime {...p} />;
}

export default function Contact() {
  const blank = { name: "", email: "", phone: "", district: "", hotelName: "", reason: "", message: "" };
  const [form,      setForm]      = useState(blank);
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required.";
    if (!form.email.trim())   e.email   = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.reason)         e.reason  = "Please select a reason.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  }

  function onChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: undefined }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const er = validate();
    if (Object.keys(er).length) { setErrors(er); return; }
    setSubmitted(true);
  }

  const ic = f => `input${errors[f] ? " input-error" : ""}`;

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1400&auto=format&fit=crop&q=75"
        badge="Get in Touch"
        title="Contact Us"
        subtitle="Have a question, want to join our association, or need support? Our team is ready to help."
      />

      {/* Info cards */}
      <motion.section
        className="py-10 border-b border-dark-800"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INFO.map(c => (
              <motion.div key={c.title} variants={scaleIn} className="card p-5">
                <InfoIcon k={c.key} cls={`mb-3 ${c.col}`} />
                <h3 className="text-white font-semibold text-sm mb-2">{c.title}</h3>
                <div className="space-y-1">
                  {c.lines.map((line, i) =>
                    c.link && i === 0
                      ? <a key={line} href={c.link} className={`block text-xs font-medium hover:underline ${c.col}`}>{line}</a>
                      : <p key={line} className="text-xs text-dark-500">{line}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Form + Side panel */}
      <motion.section
        className="py-12"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Form */}
            <motion.div variants={slideInLeft}>
              <p className="section-label mb-2">Send a Message</p>
              <h2 className="section-title mb-6">We Would Love to Hear From You</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-10 text-center"
                >
                  <MdCheckCircle className="text-primary-500 mx-auto mb-4" size={44} />
                  <h3 className="text-white font-bold text-lg mb-2">Message Sent!</h3>
                  <p className="text-dark-400 text-sm mb-6">
                    Our team will respond within 1–2 business days.
                  </p>
                  <button onClick={() => { setForm(blank); setErrors({}); setSubmitted(false); }} className="btn-primary">
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-dark-400 mb-1">Full Name *</label>
                      <input name="name" value={form.name} onChange={onChange} placeholder="Your full name" className={ic("name")} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-dark-400 mb-1">Email *</label>
                      <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" className={ic("email")} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-dark-400 mb-1">Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+977-" className="input" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-dark-400 mb-1">District</label>
                      <select name="district" value={form.district} onChange={onChange} className="input">
                        <option value="">Select district</option>
                        {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-dark-400 mb-1">Hotel / Business Name</label>
                    <input name="hotelName" value={form.hotelName} onChange={onChange} placeholder="Name of your hotel" className="input" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-dark-400 mb-1">Reason *</label>
                    <select name="reason" value={form.reason} onChange={onChange} className={ic("reason")}>
                      <option value="">Select a reason</option>
                      {REASONS.map(r => <option key={r}>{r}</option>)}
                    </select>
                    {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-dark-400 mb-1">Message *</label>
                    <textarea name="message" value={form.message} onChange={onChange} rows={5}
                      placeholder="Write your message here" className={ic("message")} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    <MdSend size={15} /> Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Side panel */}
            <motion.div variants={slideInRight} className="space-y-4">
              {/* Benefits */}
              <div className="card p-5">
                <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-dark-800">
                  <img src="/logo.png" alt="HAN" className="h-8 w-auto object-contain" />
                  <h3 className="text-white font-semibold text-sm">Membership Benefits</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Official listing on our member directory",
                    "Access to training and capacity building",
                    "Representation before provincial government",
                    "Annual tourism promotion campaigns",
                    "Networking with industry professionals",
                    "Legal and regulatory guidance",
                  ].map(b => (
                    <li key={b} className="flex items-start gap-2 text-xs text-dark-500">
                      <span className="w-1 h-1 rounded-full bg-primary-600 mt-1.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map placeholder */}
              <div className="card p-5">
                <div className="rounded-lg bg-dark-800 border border-dark-700 h-40 flex flex-col items-center justify-center text-center">
                  <MdLocationOn className="text-primary-600 mb-2" size={32} />
                  <p className="text-white font-semibold text-sm">Dhangadhi, Kailali</p>
                  <p className="text-dark-500 text-xs mt-1">Sudurpashchim Province, Nepal</p>
                  <a
                    href="https://maps.google.com/?q=Dhangadhi,Kailali,Nepal"
                    target="_blank" rel="noopener noreferrer"
                    className="mt-3 text-primary-400 hover:text-primary-300 text-xs font-medium transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Social */}
              <div className="card p-5">
                <h3 className="text-white font-semibold text-sm mb-3">Follow Us</h3>
                <div className="flex gap-2">
                  {[
                    { icon: <FiFacebook size={15} />,  label: "Facebook"  },
                    { icon: <FiTwitter  size={15} />,  label: "Twitter"   },
                    { icon: <FiInstagram size={15} />, label: "Instagram" },
                  ].map(s => (
                    <a key={s.label} href="#" aria-label={s.label}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-800 border border-dark-700 text-dark-400 hover:text-primary-400 hover:border-primary-800 transition-colors">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>
    </div>
  );
}
