import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdPhone, MdEmail, MdLocationOn, MdAccessTime,
  MdSend, MdCheckCircle, MdHotel,
} from "react-icons/md";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { fadeUp, staggerContainer, scaleIn, slideInLeft, slideInRight } from "../lib/animations";
import PageHero from "../components/PageHero";

const contactCards = [
  { icon: <MdLocationOn size={22} />, title: "Office Address", lines: ["Dhangadhi-4, Kailali", "Sudurpashchim Province, Nepal"], bg: "bg-primary-50", text: "text-primary-600" },
  { icon: <MdPhone size={22} />,      title: "Phone",          lines: ["+977-091-521000", "+977-091-521001"], bg: "bg-secondary-50", text: "text-secondary-600", link: "tel:+977091521000" },
  { icon: <MdEmail size={22} />,      title: "Email",          lines: ["info@hansudurpashchim.org.np", "membership@hansudurpashchim.org.np"], bg: "bg-amber-50", text: "text-amber-600", link: "mailto:info@hansudurpashchim.org.np" },
  { icon: <MdAccessTime size={22} />, title: "Office Hours",   lines: ["Sun–Fri: 9:00 AM – 5:00 PM", "Saturday & Holidays: Closed"], bg: "bg-teal-50", text: "text-teal-600" },
];

const reasons = [
  "New hotel membership registration", "Membership renewal", "General inquiry",
  "Complaint or feedback", "Media / press inquiry", "Partnership proposal",
  "Training & events", "Other",
];

const districts = ["Kailali","Kanchanpur","Doti","Achham","Dadeldhura","Baitadi","Darchula","Bajhang"];

const inputCls = (err) =>
  `w-full px-3.5 py-2.5 border rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-primary-200 ${
    err ? "border-red-300 bg-red-50" : "border-gray-200 bg-white focus:border-primary-400"
  }`;

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", district:"", hotelName:"", reason:"", message:"" });
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.reason) e.reason = "Please select a reason.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  }
  function onChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
  }
  function onSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  }
  function reset() {
    setForm({ name:"", email:"", phone:"", district:"", hotelName:"", reason:"", message:"" });
    setErrors({});
    setSubmitted(false);
  }

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1400&auto=format&fit=crop&q=75"
        badge="Get in Touch"
        title="Contact Us"
        subtitle="Have a question, want to join our association, or need support? Our team is ready to help you."
      />

      {/* Contact cards */}
      <motion.section
        className="py-10 bg-white border-b border-gray-100"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactCards.map((c) => (
              <motion.div key={c.title} variants={scaleIn}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className={`${c.bg} ${c.text} p-2.5 rounded-xl w-fit mb-3`}>{c.icon}</div>
                <h3 className="font-bold text-gray-800 text-sm mb-2">{c.title}</h3>
                <div className="space-y-0.5">
                  {c.lines.map((line, i) =>
                    c.link && i === 0
                      ? <a key={line} href={c.link} className="block text-xs text-primary-600 hover:underline font-medium">{line}</a>
                      : <p key={line} className="text-xs text-gray-500">{line}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Form + Info */}
      <motion.section
        className="py-14"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Form */}
            <motion.div variants={slideInLeft}>
              <span className="text-primary-600 font-semibold text-xs uppercase tracking-widest">Send a Message</span>
              <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-6">We'd Love to Hear From You</h2>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm">
                  <MdCheckCircle className="text-primary-500 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm mb-6">Our team will respond within 1–2 business days.</p>
                  <button onClick={reset} className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Full Name <span className="text-red-400">*</span></label>
                      <input name="name" value={form.name} onChange={onChange} placeholder="Your full name" className={inputCls(errors.name)} />
                      {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Email <span className="text-red-400">*</span></label>
                      <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" className={inputCls(errors.email)} />
                      {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+977-" className={inputCls(false)} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">District</label>
                      <select name="district" value={form.district} onChange={onChange} className={inputCls(false)}>
                        <option value="">Select district</option>
                        {districts.map((d) => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Hotel / Business Name</label>
                    <input name="hotelName" value={form.hotelName} onChange={onChange} placeholder="Name of your hotel" className={inputCls(false)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Reason <span className="text-red-400">*</span></label>
                    <select name="reason" value={form.reason} onChange={onChange} className={inputCls(errors.reason)}>
                      <option value="">Select a reason…</option>
                      {reasons.map((r) => <option key={r}>{r}</option>)}
                    </select>
                    {errors.reason && <p className="text-red-400 text-[11px] mt-1">{errors.reason}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Message <span className="text-red-400">*</span></label>
                    <textarea name="message" value={form.message} onChange={onChange} rows={5}
                      placeholder="Write your message here…" className={inputCls(errors.message)} />
                    {errors.message && <p className="text-red-400 text-[11px] mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors">
                    <MdSend size={16} /> Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info panel */}
            <motion.div variants={slideInRight} className="space-y-5">
              {/* Map placeholder */}
              <div className="rounded-2xl bg-gray-100 h-56 flex flex-col items-center justify-center border border-gray-200 text-center p-6">
                <MdLocationOn className="text-primary-400 mb-2" size={40} />
                <p className="font-bold text-gray-700">Dhangadhi, Kailali</p>
                <p className="text-gray-500 text-xs mt-1">Sudurpashchim Province, Nepal</p>
                <a href="https://maps.google.com/?q=Dhangadhi,Kailali,Nepal" target="_blank" rel="noopener noreferrer"
                  className="mt-3 text-primary-600 hover:text-primary-700 text-xs font-medium underline">
                  Open in Google Maps
                </a>
              </div>

              {/* Benefits */}
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2.5 mb-3">
                  <img
                    src="/logo.png"
                    alt="HAN Sudurpashchim"
                    className="h-8 w-auto object-contain flex-shrink-0"
                  />
                  <h3 className="font-bold text-gray-800 text-sm">Membership Benefits</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Official listing on our member directory",
                    "Access to training and capacity building",
                    "Representation before provincial government",
                    "Annual tourism promotion campaigns",
                    "Networking with industry professionals",
                    "Legal and regulatory guidance",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 text-sm mb-3">Follow Us</h3>
                <div className="flex gap-2">
                  {[
                    { icon: <FiFacebook size={17} />, label: "Facebook", href: "#", hover: "hover:bg-[#1877F2]" },
                    { icon: <FiTwitter  size={17} />, label: "Twitter",  href: "#", hover: "hover:bg-sky-500" },
                    { icon: <FiInstagram size={17} />, label: "Instagram", href: "#", hover: "hover:bg-pink-600" },
                  ].map((s) => (
                    <motion.a key={s.label} href={s.href} aria-label={s.label}
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                      className={`bg-gray-100 ${s.hover} hover:text-white text-gray-600 p-2.5 rounded-xl transition-colors`}>
                      {s.icon}
                    </motion.a>
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
