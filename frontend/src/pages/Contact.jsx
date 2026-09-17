import { useState } from "react";
import { MdPhone, MdEmail, MdLocationOn, MdAccessTime, MdSend, MdCheckCircle } from "react-icons/md";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import PageHero from "../components/PageHero";

const INFO = [
  {
    key: "loc",   title: "Office Address",
    Icon: MdLocationOn,
    lines: ["Dhangadhi-4, Kailali", "Sudurpashchim Province, Nepal"],
  },
  {
    key: "phone", title: "Phone",
    Icon: MdPhone,
    lines: ["+977-091-521000", "+977-091-521001"],
    link: "tel:+977091521000",
  },
  {
    key: "email", title: "Email",
    Icon: MdEmail,
    lines: ["info@hansudurpashchim.org.np", "membership@hansudurpashchim.org.np"],
    link: "mailto:info@hansudurpashchim.org.np",
  },
  {
    key: "time",  title: "Office Hours",
    Icon: MdAccessTime,
    lines: ["Sun–Fri: 9:00 AM – 5:00 PM", "Saturday & Holidays: Closed"],
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
    <div className="bg-white dark:bg-dark-950">
      <PageHero
        image="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1400&auto=format&fit=crop&q=75"
        badge="Get in Touch"
        title="Contact Us"
        subtitle="Have a question, want to join our association, or need support? Our team is ready to help."
      />

      {/* ── Info cards ───────────────────────────────────────────────────── */}
      <section className="border-b border-surface-100 dark:border-dark-800 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-200 dark:bg-dark-700">
            {INFO.map(c => (
              <div key={c.title} className="bg-white dark:bg-dark-900 px-8 py-8 border-t-4 border-primary-600">
                <c.Icon className="text-primary-600 dark:text-primary-400 mb-4" size={24} />
                <h3 className="text-surface-900 dark:text-white font-bold text-sm mb-3">{c.title}</h3>
                <div className="space-y-1.5">
                  {c.lines.map((line, i) =>
                    c.link && i === 0 ? (
                      <a key={line} href={c.link}
                        className="block text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="text-sm text-surface-500 dark:text-dark-400">{line}</p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Side panel ────────────────────────────────────────────── */}
      <section className="section-pad bg-surface-50 dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">

            {/* ── Form ─────────────────────────────────────────────────── */}
            <div>
              <span className="section-label">Send a Message</span>
              <h2 className="section-heading">We Would Love to Hear From You</h2>

              {submitted ? (
                <div className="bg-white dark:bg-dark-900 border border-surface-200 dark:border-dark-700 p-12 text-center">
                  <MdCheckCircle className="text-primary-500 mx-auto mb-5" size={48} />
                  <h3 className="text-surface-900 dark:text-white font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-surface-500 dark:text-dark-400 text-sm mb-8">
                    Our team will respond within 1–2 business days.
                  </p>
                  <button
                    onClick={() => { setForm(blank); setErrors({}); setSubmitted(false); }}
                    className="btn-primary"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5 bg-white dark:bg-dark-900 border border-surface-200 dark:border-dark-700 p-8">

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-surface-700 dark:text-dark-300 uppercase tracking-wide mb-2">
                        Full Name *
                      </label>
                      <input name="name" value={form.name} onChange={onChange}
                        placeholder="Your full name" className={ic("name")} />
                      {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-surface-700 dark:text-dark-300 uppercase tracking-wide mb-2">
                        Email *
                      </label>
                      <input name="email" type="email" value={form.email} onChange={onChange}
                        placeholder="you@example.com" className={ic("email")} />
                      {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-surface-700 dark:text-dark-300 uppercase tracking-wide mb-2">
                        Phone
                      </label>
                      <input name="phone" type="tel" value={form.phone} onChange={onChange}
                        placeholder="+977-" className="input" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-surface-700 dark:text-dark-300 uppercase tracking-wide mb-2">
                        District
                      </label>
                      <select name="district" value={form.district} onChange={onChange} className="input">
                        <option value="">Select district</option>
                        {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-surface-700 dark:text-dark-300 uppercase tracking-wide mb-2">
                      Hotel / Business Name
                    </label>
                    <input name="hotelName" value={form.hotelName} onChange={onChange}
                      placeholder="Name of your hotel" className="input" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-surface-700 dark:text-dark-300 uppercase tracking-wide mb-2">
                      Reason *
                    </label>
                    <select name="reason" value={form.reason} onChange={onChange} className={ic("reason")}>
                      <option value="">Select a reason</option>
                      {REASONS.map(r => <option key={r}>{r}</option>)}
                    </select>
                    {errors.reason && <p className="text-red-500 text-xs mt-1.5">{errors.reason}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-surface-700 dark:text-dark-300 uppercase tracking-wide mb-2">
                      Message *
                    </label>
                    <textarea name="message" value={form.message} onChange={onChange}
                      rows={5} placeholder="Write your message here"
                      className={ic("message")} />
                    {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    <MdSend size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* ── Side panel ───────────────────────────────────────────── */}
            <div className="space-y-6">

              {/* Membership benefits */}
              <div className="bg-white dark:bg-dark-900 border border-surface-200 dark:border-dark-700 border-t-4 border-t-primary-600">
                <div className="flex items-center gap-3 px-6 py-5 border-b border-surface-100 dark:border-dark-800">
                  <img src="/logo.png" alt="HAN" className="h-9 w-auto object-contain" />
                  <h3 className="text-surface-900 dark:text-white font-bold text-sm">Membership Benefits</h3>
                </div>
                <ul className="p-6 space-y-3">
                  {[
                    "Official listing on our member directory",
                    "Access to training and capacity building",
                    "Representation before provincial government",
                    "Annual tourism promotion campaigns",
                    "Networking with industry professionals",
                    "Legal and regulatory guidance",
                  ].map(b => (
                    <li key={b} className="flex items-start gap-3 text-sm text-surface-600 dark:text-dark-400">
                      <span className="w-[3px] h-4 bg-primary-500 flex-shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map placeholder */}
              <div className="bg-white dark:bg-dark-900 border border-surface-200 dark:border-dark-700">
                <div className="bg-surface-100 dark:bg-dark-800 h-44 flex flex-col items-center justify-center text-center px-6">
                  <MdLocationOn className="text-primary-600 mb-2" size={32} />
                  <p className="text-surface-800 dark:text-white font-bold text-sm">Dhangadhi, Kailali</p>
                  <p className="text-surface-500 dark:text-dark-400 text-xs mt-1">Sudurpashchim Province, Nepal</p>
                  <a
                    href="https://maps.google.com/?q=Dhangadhi,Kailali,Nepal"
                    target="_blank" rel="noopener noreferrer"
                    className="mt-3 text-primary-600 dark:text-primary-400 hover:underline text-xs font-semibold"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              {/* Social */}
              <div className="bg-white dark:bg-dark-900 border border-surface-200 dark:border-dark-700 px-6 py-5">
                <h3 className="text-surface-900 dark:text-white font-bold text-sm mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: <FiFacebook size={16} />,  label: "Facebook"  },
                    { icon: <FiInstagram size={16} />, label: "Instagram" },
                  ].map(s => (
                    <a
                      key={s.label} href="#" aria-label={s.label}
                      className="flex items-center gap-2 px-4 py-2.5 border border-surface-200 dark:border-dark-700
                        text-surface-600 dark:text-dark-400 text-xs font-semibold
                        hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400
                        transition-colors"
                    >
                      {s.icon} {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
