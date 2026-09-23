import { useState, type ChangeEvent, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { MdSend, MdCheckCircle, MdLocationOn } from "react-icons/md";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfoSplit from "@/components/contact/ContactInfoSplit";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/Reveal";
import { SUDURPASHCHIM_DISTRICTS } from "@/constants/districts";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  district: string;
  hotelName: string;
  reason: string;
  message: string;
}

const blank: ContactForm = { name: "", email: "", phone: "", district: "", hotelName: "", reason: "", message: "" };

type FormErrors = Partial<Record<keyof ContactForm, string>>;

export default function ContactPage() {
  const { t } = useTranslation();

  const [form, setForm] = useState<ContactForm>(blank);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const reasons = t("contact.form.reasons", { returnObjects: true }) as string[];

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = t("contact.form.errors.nameRequired");
    if (!form.email.trim()) e.email = t("contact.form.errors.emailRequired");
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = t("contact.form.errors.emailInvalid");
    if (!form.reason) e.reason = t("contact.form.errors.reasonRequired");
    if (!form.message.trim()) e.message = t("contact.form.errors.messageRequired");
    return e;
  }

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const er = validate();
    if (Object.keys(er).length) {
      setErrors(er);
      return;
    }
    setSubmitted(true);
  }

  const ic = (f: keyof ContactForm) => `input${errors[f] ? " input-error" : ""}`;

  return (
    <div className="bg-background">
      <ContactHero />

      {/* ── Form + Side panel ────────────────────────────────────────────── */}
      <section className="section-pad bg-background">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">

            {/* ── Form ─────────────────────────────────────────────────── */}
            <Reveal>
              <span className="overline mb-3">{t("contact.form.label")}</span>
              <h2 className="section-heading">{t("contact.form.title")}</h2>

              {submitted ? (
                <Card className="rounded-xl p-12 text-center border-t-4 border-t-river-500">
                  <MdCheckCircle className="text-accent mx-auto mb-5" size={48} />
                  <h3 className="text-foreground font-bold text-xl mb-2">{t("contact.form.sentTitle")}</h3>
                  <p className="text-foreground-muted text-sm mb-8">{t("contact.form.sentBody")}</p>
                  <Button onClick={() => { setForm(blank); setErrors({}); setSubmitted(false); }}>
                    {t("contact.form.sendAnother")}
                  </Button>
                </Card>
              ) : (
                <Card className="rounded-xl p-8">
                  <form onSubmit={onSubmit} noValidate className="space-y-5">

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-foreground-secondary uppercase tracking-wide mb-2">
                          {t("contact.form.fullName")} *
                        </label>
                        <input name="name" value={form.name} onChange={onChange}
                          placeholder={t("contact.form.fullNamePlaceholder")} className={ic("name")} />
                        {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-foreground-secondary uppercase tracking-wide mb-2">
                          {t("contact.form.email")} *
                        </label>
                        <input name="email" type="email" value={form.email} onChange={onChange}
                          placeholder="you@example.com" className={ic("email")} />
                        {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-foreground-secondary uppercase tracking-wide mb-2">
                          {t("contact.form.phone")}
                        </label>
                        <input name="phone" type="tel" value={form.phone} onChange={onChange}
                          placeholder="+977-" className="input" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-foreground-secondary uppercase tracking-wide mb-2">
                          {t("contact.form.district")}
                        </label>
                        <select name="district" value={form.district} onChange={onChange} className="input">
                          <option value="">{t("contact.form.selectDistrict")}</option>
                          {SUDURPASHCHIM_DISTRICTS.map((d) => <option key={d}>{d}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground-secondary uppercase tracking-wide mb-2">
                        {t("contact.form.hotelName")}
                      </label>
                      <input name="hotelName" value={form.hotelName} onChange={onChange}
                        placeholder={t("contact.form.hotelNamePlaceholder")} className="input" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground-secondary uppercase tracking-wide mb-2">
                        {t("contact.form.reason")} *
                      </label>
                      <select name="reason" value={form.reason} onChange={onChange} className={ic("reason")}>
                        <option value="">{t("contact.form.selectReason")}</option>
                        {reasons.map((r) => <option key={r}>{r}</option>)}
                      </select>
                      {errors.reason && <p className="text-red-500 text-xs mt-1.5">{errors.reason}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground-secondary uppercase tracking-wide mb-2">
                        {t("contact.form.message")} *
                      </label>
                      <textarea name="message" value={form.message} onChange={onChange}
                        rows={5} placeholder={t("contact.form.messagePlaceholder")}
                        className={ic("message")} />
                      {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
                    </div>

                    <Button type="submit" className="w-full">
                      <MdSend size={16} /> {t("contact.form.submit")}
                    </Button>
                  </form>
                </Card>
              )}
            </Reveal>

            {/* ── Side panel ───────────────────────────────────────────── */}
            <Reveal delay={0.1} className="space-y-6">

              {/* Membership benefits */}
              <Card className="rounded-xl overflow-hidden border-t-4 border-t-river-500 py-0">
                <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
                  <img src="/logo.png" alt="HAN" className="h-9 w-auto object-contain" />
                  <h3 className="text-foreground font-bold text-sm">{t("contact.benefits.title")}</h3>
                </div>
                <ul className="p-6 space-y-3">
                  {(t("contact.benefits.items", { returnObjects: true }) as string[]).map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-foreground-secondary">
                      <span className="w-[3px] h-4 bg-accent flex-shrink-0 mt-0.5 rounded-full" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Map placeholder */}
              <Card className="rounded-xl overflow-hidden py-0">
                <div className="bg-muted h-44 flex flex-col items-center justify-center text-center px-6">
                  <MdLocationOn className="text-accent mb-2" size={32} />
                  <p className="text-foreground font-bold text-sm">{t("contact.map.title")}</p>
                  <p className="text-foreground-muted text-xs mt-1">{t("contact.map.subtitle")}</p>
                  <a
                    href="https://maps.google.com/?q=Dhangadhi,Kailali,Nepal"
                    target="_blank" rel="noopener noreferrer"
                    className="mt-3 text-accent hover:underline text-xs font-semibold"
                  >
                    {t("contact.map.link")} →
                  </a>
                </div>
              </Card>

              {/* Social */}
              <Card className="rounded-xl px-6 py-5">
                <h3 className="text-foreground font-bold text-sm mb-4">{t("contact.social.title")}</h3>
                <div className="flex gap-3">
                  {[
                    { icon: <FiFacebook size={16} />, label: "Facebook" },
                    { icon: <FiInstagram size={16} />, label: "Instagram" },
                  ].map((s) => (
                    <Button key={s.label} asChild variant="outline" size="sm">
                      <a href="#" aria-label={s.label}>
                        {s.icon} {s.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </Card>
            </Reveal>

          </div>
        </div>
      </section>

      <ContactInfoSplit />

    </div>
  );
}
