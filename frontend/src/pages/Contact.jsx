import { useState } from "react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdAccessTime,
  MdSend,
  MdCheckCircle,
  MdHotel,
} from "react-icons/md";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

const contactInfo = [
  {
    icon: <MdLocationOn size={24} />,
    title: "Office Address",
    lines: ["Dhangadhi-4, Kailali", "Sudurpashchim Province", "Province No. 7, Nepal"],
    color: "bg-primary-50 text-primary-600",
  },
  {
    icon: <MdPhone size={24} />,
    title: "Phone",
    lines: ["+977-091-521000", "+977-091-521001"],
    color: "bg-secondary-50 text-secondary-600",
    link: "tel:+977091521000",
  },
  {
    icon: <MdEmail size={24} />,
    title: "Email",
    lines: ["info@hansudurpashchim.org.np", "membership@hansudurpashchim.org.np"],
    color: "bg-amber-50 text-amber-600",
    link: "mailto:info@hansudurpashchim.org.np",
  },
  {
    icon: <MdAccessTime size={24} />,
    title: "Office Hours",
    lines: ["Sunday – Friday: 9:00 AM – 5:00 PM", "Saturday: Closed", "Public holidays: Closed"],
    color: "bg-teal-50 text-teal-600",
  },
];

const reasons = [
  "New hotel membership registration",
  "Membership renewal",
  "General inquiry",
  "Complaint or feedback",
  "Media / press inquiry",
  "Partnership proposal",
  "Training & events",
  "Other",
];

const districts = [
  "Kailali", "Kanchanpur", "Doti", "Achham",
  "Dadeldhura", "Baitadi", "Darchula", "Bajhang",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
    hotelName: "",
    reason: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!form.reason) e.reason = "Please select a reason.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  }

  function resetForm() {
    setForm({ name: "", email: "", phone: "", district: "", hotelName: "", reason: "", message: "" });
    setSubmitted(false);
    setErrors({});
  }

  const inputClass = (field) =>
    `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition ${
      errors[field]
        ? "border-red-400 bg-red-50"
        : "border-gray-200 bg-white focus:border-primary-400"
    }`;

  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-primary-700 to-secondary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              <MdEmail size={16} /> Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-primary-100 text-lg">
              Have a question, want to join our association, or need support?
              Reach out — our team is happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((info) => (
              <div key={info.title} className="card p-6">
                <div className={`${info.color} p-3 rounded-xl w-fit mb-4`}>{info.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{info.title}</h3>
                <div className="space-y-1">
                  {info.lines.map((line, i) =>
                    info.link && i === 0 ? (
                      <a
                        key={line}
                        href={info.link}
                        className="block text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="text-sm text-gray-500">{line}</p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
                Send a Message
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-6">
                We'd Love to Hear From You
              </h2>

              {submitted ? (
                <div className="card p-10 text-center">
                  <MdCheckCircle className="text-primary-500 mx-auto mb-4" size={56} />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">
                    Thank you for reaching out. Our team will get back to you
                    within 1–2 business days.
                  </p>
                  <button onClick={resetForm} className="btn-primary">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClass("name")}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={inputClass("email")}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+977-"
                        className={inputClass("phone")}
                      />
                    </div>

                    {/* District */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        District
                      </label>
                      <select
                        name="district"
                        value={form.district}
                        onChange={handleChange}
                        className={inputClass("district")}
                      >
                        <option value="">Select district</option>
                        {districts.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Hotel Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hotel / Business Name
                    </label>
                    <input
                      name="hotelName"
                      value={form.hotelName}
                      onChange={handleChange}
                      placeholder="Name of your hotel or business"
                      className={inputClass("hotelName")}
                    />
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Contact <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      className={inputClass("reason")}
                    >
                      <option value="">Select a reason…</option>
                      {reasons.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Write your message here…"
                      className={inputClass("message")}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <MdSend size={18} /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-br from-primary-50 to-secondary-50 h-64 flex flex-col items-center justify-center text-center p-6">
                <MdLocationOn className="text-primary-400 mb-3" size={48} />
                <p className="font-bold text-gray-700 text-lg">Dhangadhi, Kailali</p>
                <p className="text-gray-500 text-sm mt-1">Sudurpashchim Province, Nepal</p>
                <a
                  href="https://maps.google.com/?q=Dhangadhi,Kailali,Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium underline"
                >
                  Open in Google Maps
                </a>
              </div>

              {/* Membership benefits */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary-50 text-primary-600 p-2 rounded-lg">
                    <MdHotel size={22} />
                  </div>
                  <h3 className="font-bold text-gray-800">Membership Benefits</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Official listing on our member directory",
                    "Access to training and capacity building programs",
                    "Representation before provincial government",
                    "Annual tourism promotion campaigns",
                    "Networking with industry professionals",
                    "Discounted rates on industry events",
                    "Legal and regulatory guidance",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div className="card p-6">
                <h3 className="font-bold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: <FiFacebook size={20} />, label: "Facebook", href: "#", color: "hover:bg-blue-600" },
                    { icon: <FiTwitter size={20} />, label: "Twitter", href: "#", color: "hover:bg-sky-500" },
                    { icon: <FiInstagram size={20} />, label: "Instagram", href: "#", color: "hover:bg-pink-600" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className={`bg-gray-100 ${s.color} hover:text-white text-gray-600 p-3 rounded-xl transition-colors duration-200`}
                    >
                      {s.icon}
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
