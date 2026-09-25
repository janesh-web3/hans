import { useEffect, useState, type ChangeEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Globe2, Image, Music2, Save, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/lib/api";

interface LocaleCopy { eyebrow: string; title: string; subtitle?: string; primaryCta?: string; secondaryCta?: string; body1?: string; body2?: string }
interface ContentSettings {
  seo: { siteName: string; title: string; description: string; keywords: string };
  hero: { images: string[]; en: LocaleCopy; np: LocaleCopy };
  about: { en: LocaleCopy; np: LocaleCopy };
  contact: { addressLines: string[]; officePhone: string; membershipPhone: string; emergencyPhone: string; generalEmail: string; membershipEmail: string; pressEmail: string; officeHoursWeekday: string; officeHoursWeekend: string; mapUrl: string; facebookUrl: string; instagramUrl: string; youtubeUrl: string };
  membership: { en: { benefitsEyebrow: string; benefitsTitle: string; benefits: { title: string; desc: string }[] }; np: { benefitsEyebrow: string; benefitsTitle: string; benefits: { title: string; desc: string }[] } };
  musicVideos: { id: string; title: string; artists: string }[];
}

const DEFAULTS: ContentSettings = {
  seo: {
    siteName: "HANS Sudurpashchim",
    title: "Hotel Association of Nepal, Sudurpashchim Province | HANS",
    description: "Official website of the Hotel Association of Nepal, Sudurpashchim Province (Province No. 7). Explore member hotels, tourism, events and hospitality across Sudurpashchim.",
    keywords: "Hotel Association of Nepal Sudurpashchim, HANS Sudurpashchim, Hotel Association Province No. 7, hotels Kailali, hotels Kanchanpur, hotels Doti, hotels Bajhang, hotels Bajura, hotels Achham, hotels Dadeldhura, hotels Baitadi, hotels Darchula, Sudurpashchim tourism",
  },
  hero: {
    images: ["/assets/hero8.jpg", "/assets/hero2.webp", "/assets/hero3.webp", "/assets/hero6.jpg"],
    en: { eyebrow: "Welcome to Sudurpashchim", title: "Where the Mountains Meet Unmatched Hospitality", subtitle: "Discover a curated collection of verified hotels, resorts, and homestays across Nepal's far-west.", primaryCta: "Explore Hotels", secondaryCta: "Become a Member" },
    np: { eyebrow: "", title: "", subtitle: "", primaryCta: "", secondaryCta: "" },
  },
  about: {
    en: { eyebrow: "Our Mission", title: "Preserving Heritage, Crafting Unforgettable Stays.", subtitle: "We are the premier collective of verified hotels, resorts, and homestays dedicated to showcasing the untouched beauty and warm hospitality of Nepal's far-western province.", body1: "The Hotel Association of Nepal, Sudurpashchim Province, was founded in 1998 by five hoteliers in Dhangadhi who believed the far-west deserved a seat at the table.", body2: "Today we represent member properties across Sudurpashchim and carry their case to provincial and federal government alike." },
    np: { eyebrow: "", title: "", subtitle: "", body1: "", body2: "" },
  },
  contact: {
    addressLines: ["HAN Bhawan, Dhangadhi-4", "Kailali, Sudurpashchim Province", "Nepal"],
    officePhone: "+977-91-521000", membershipPhone: "+977-91-521004", emergencyPhone: "+977-9858-521000",
    generalEmail: "info@hansudurpashchim.org.np", membershipEmail: "membership@hansudurpashchim.org.np", pressEmail: "press@hansudurpashchim.org.np",
    officeHoursWeekday: "Sunday–Friday · 10:00–17:00", officeHoursWeekend: "Saturday · Closed", mapUrl: "https://maps.google.com/?q=Dhangadhi,Kailali,Nepal", facebookUrl: "", instagramUrl: "", youtubeUrl: "",
  },
  membership: { en: { benefitsEyebrow: "Membership", benefitsTitle: "Why Join HAN Sudurpashchim?", benefits: [] }, np: { benefitsEyebrow: "", benefitsTitle: "", benefits: [] } },
  musicVideos: [
    { id: "oVr-Gh7o4WI", title: "Chamkeli Bauju", artists: "Prakash Thapa · Gauri Bhatta" },
    { id: "CpPoSszZCJM", title: "Raibar Laijha Udanya Kag", artists: "Bisal Bhatta · Gauri Bhatta" },
    { id: "fTETVZTTEP0", title: "Jantya Bhaat Khaaihelau", artists: "Rekha Joshi · Megh Jan Kadayat" },
    { id: "gFvfb6BlOJg", title: "Ka Dhadkinchhai Mutu", artists: "Gauri Bhatta · Chandra Saud" },
    { id: "vDJybiV_w10", title: "Mera Gau Rahadi Bhuwa", artists: "Gauri Bhatta · Jaganath Nepali Bairagi" },
  ],
};

function mergeSettings(remote?: Partial<ContentSettings>): ContentSettings {
  if (!remote) return structuredClone(DEFAULTS);
  return {
    ...DEFAULTS, ...remote,
    seo: { ...DEFAULTS.seo, ...remote.seo },
    hero: { ...DEFAULTS.hero, ...remote.hero, en: { ...DEFAULTS.hero.en, ...remote.hero?.en }, np: { ...DEFAULTS.hero.np, ...remote.hero?.np } },
    about: { ...DEFAULTS.about, ...remote.about, en: { ...DEFAULTS.about.en, ...remote.about?.en }, np: { ...DEFAULTS.about.np, ...remote.about?.np } },
    contact: { ...DEFAULTS.contact, ...remote.contact },
    membership: { ...DEFAULTS.membership, ...remote.membership, en: { ...DEFAULTS.membership.en, ...remote.membership?.en }, np: { ...DEFAULTS.membership.np, ...remote.membership?.np } },
    musicVideos: remote.musicVideos?.length ? remote.musicVideos : DEFAULTS.musicVideos,
  };
}

function InputField({ label, value, onChange, hint }: { label: string; value: string; onChange: (value: string) => void; hint?: string }) {
  return <div className="space-y-2"><Label>{label}</Label><Input value={value} onChange={(event) => onChange(event.target.value)} />{hint && <p className="text-xs text-surface-500 dark:text-dark-400">{hint}</p>}</div>;
}

function TextField({ label, value, onChange, rows = 3, hint }: { label: string; value: string; onChange: (value: string) => void; rows?: number; hint?: string }) {
  return <div className="space-y-2"><Label>{label}</Label><Textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />{hint && <p className="text-xs text-surface-500 dark:text-dark-400">{hint}</p>}</div>;
}

export default function SiteContent() {
  const client = useQueryClient();
  const { data: remote, isLoading, isError } = useQuery({ queryKey: ["site-settings"], queryFn: async () => (await api.get<{ success: boolean; data: Partial<ContentSettings> }>("/site-settings")).data.data });
  const [form, setForm] = useState<ContentSettings>(DEFAULTS);
  const [initialized, setInitialized] = useState(false);
  useEffect(() => { if (remote && !initialized) { setForm(mergeSettings(remote)); setInitialized(true); } }, [remote, initialized]);
  const save = useMutation({
    mutationFn: async () => (await api.put<{ success: boolean; data: ContentSettings }>("/site-settings", { settings: form })).data.data,
    onSuccess: (settings) => { setForm(mergeSettings(settings)); client.setQueryData(["site-settings"], settings); toast.success("Site content saved"); },
    onError: () => toast.error("Could not save site content"),
  });

  function update<K extends keyof ContentSettings>(section: K, patch: Partial<ContentSettings[K]>) {
    setForm((current) => ({ ...current, [section]: { ...current[section], ...patch } }));
  }
  function updateLocale(section: "hero" | "about", language: "en" | "np", key: keyof LocaleCopy, value: string) {
    setForm((current) => ({ ...current, [section]: { ...current[section], [language]: { ...current[section][language], [key]: value } } }));
  }
  function updateBenefits(language: "en" | "np", key: "benefitsEyebrow" | "benefitsTitle", value: string) {
    setForm((current) => ({ ...current, membership: { ...current.membership, [language]: { ...current.membership[language], [key]: value } } }));
  }
  function benefitsText(language: "en" | "np") {
    return form.membership[language].benefits.map((item) => `${item.title} | ${item.desc}`).join("\n");
  }
  function updateBenefitsText(language: "en" | "np", value: string) {
    const benefits = value.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
      const [title = "", ...desc] = line.split("|");
      return { title: title.trim(), desc: desc.join("|").trim() };
    });
    setForm((current) => ({ ...current, membership: { ...current.membership, [language]: { ...current.membership[language], benefits } } }));
  }
  function updateMusic(value: string) {
    const musicVideos = value.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
      const [title = "", artists = "", rawId = ""] = line.split("|").map((part) => part.trim());
      const id = rawId.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)?.[1] ?? rawId;
      return { id, title, artists };
    }).filter((video) => video.id && video.title);
    setForm((current) => ({ ...current, musicVideos }));
  }

  if (isLoading) return <p className="text-sm text-surface-500">Loading site content…</p>;
  if (isError) return <Card><CardContent className="py-12 text-center text-sm text-red-600">Could not load editable site content. Refresh and try again.</CardContent></Card>;

  return <div className="space-y-6">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-xl font-bold text-surface-900 dark:text-white">Site content</h2><p className="mt-1 text-sm text-surface-500 dark:text-dark-400">Update frequently changed homepage, contact, SEO and media content without code changes.</p></div><Button onClick={() => save.mutate()} disabled={save.isPending}><Save size={15} />{save.isPending ? "Saving…" : "Save changes"}</Button></div>

    <Tabs defaultValue="homepage" className="space-y-5">
      <TabsList className="h-auto flex-wrap justify-start"><TabsTrigger value="homepage"><Image size={14} className="mr-2" />Homepage</TabsTrigger><TabsTrigger value="about">About &amp; membership</TabsTrigger><TabsTrigger value="contact"><Settings2 size={14} className="mr-2" />Contact details</TabsTrigger><TabsTrigger value="seo"><Globe2 size={14} className="mr-2" />SEO</TabsTrigger><TabsTrigger value="music"><Music2 size={14} className="mr-2" />Deuda playlist</TabsTrigger></TabsList>
      <TabsContent value="homepage" className="space-y-5">
        <Card><CardHeader><CardTitle>Homepage hero</CardTitle><CardDescription>Edit both languages. Blank fields keep the current built-in translation.</CardDescription></CardHeader><CardContent className="grid gap-8 lg:grid-cols-2">{(["en", "np"] as const).map((language) => <div key={language} className="space-y-4"><h3 className="text-sm font-semibold text-surface-800 dark:text-white">{language === "en" ? "English" : "नेपाली"}</h3><InputField label="Eyebrow" value={form.hero[language].eyebrow ?? ""} onChange={(value) => updateLocale("hero", language, "eyebrow", value)} /><InputField label="Heading" value={form.hero[language].title ?? ""} onChange={(value) => updateLocale("hero", language, "title", value)} /><TextField label="Supporting text" value={form.hero[language].subtitle ?? ""} onChange={(value) => updateLocale("hero", language, "subtitle", value)} /><InputField label="Primary button" value={form.hero[language].primaryCta ?? ""} onChange={(value) => updateLocale("hero", language, "primaryCta", value)} /><InputField label="Secondary button" value={form.hero[language].secondaryCta ?? ""} onChange={(value) => updateLocale("hero", language, "secondaryCta", value)} /></div>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Hero image slides</CardTitle><CardDescription>Use one public image URL or site path per line, for example /assets/hero1.jpg.</CardDescription></CardHeader><CardContent><TextField label="Image paths" rows={5} value={form.hero.images.join("\n")} onChange={(value) => update("hero", { images: value.split("\n").map((line) => line.trim()).filter(Boolean) })} /></CardContent></Card>
      </TabsContent>
      <TabsContent value="about" className="space-y-5">
        <Card><CardHeader><CardTitle>About page story</CardTitle><CardDescription>These fields replace the hero and story copy when filled in.</CardDescription></CardHeader><CardContent className="grid gap-8 lg:grid-cols-2">{(["en", "np"] as const).map((language) => <div key={language} className="space-y-4"><h3 className="text-sm font-semibold text-surface-800 dark:text-white">{language === "en" ? "English" : "नेपाली"}</h3>{(["eyebrow", "title", "subtitle", "body1", "body2"] as const).map((key) => <TextField key={key} label={key === "body1" ? "Story paragraph one" : key === "body2" ? "Story paragraph two" : key} rows={key === "body1" || key === "body2" || key === "subtitle" ? 4 : 2} value={form.about[language][key] ?? ""} onChange={(value) => updateLocale("about", language, key, value)} />)}</div>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Membership benefits</CardTitle><CardDescription>One benefit per line: title | description. Edit separately by language.</CardDescription></CardHeader><CardContent className="grid gap-8 lg:grid-cols-2">{(["en", "np"] as const).map((language) => <div key={language} className="space-y-4"><h3 className="text-sm font-semibold text-surface-800 dark:text-white">{language === "en" ? "English" : "नेपाली"}</h3><InputField label="Section eyebrow" value={form.membership[language].benefitsEyebrow} onChange={(value) => updateBenefits(language, "benefitsEyebrow", value)} /><InputField label="Section heading" value={form.membership[language].benefitsTitle} onChange={(value) => updateBenefits(language, "benefitsTitle", value)} /><TextField label="Benefits" rows={7} value={benefitsText(language)} onChange={(value) => updateBenefitsText(language, value)} hint="Separate each benefit title and description with a vertical bar (|)." /></div>)}</CardContent></Card>
      </TabsContent>
      <TabsContent value="contact" className="space-y-5">
        <Card><CardHeader><CardTitle>Public contact information</CardTitle><CardDescription>These details appear in the site header, footer and Contact page.</CardDescription></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2"><TextField label="Office address" value={form.contact.addressLines.join("\n")} onChange={(value) => update("contact", { addressLines: value.split("\n").map((line) => line.trim()).filter(Boolean) })} /><InputField label="Office phone" value={form.contact.officePhone} onChange={(officePhone) => update("contact", { officePhone })} /><InputField label="Membership phone" value={form.contact.membershipPhone} onChange={(membershipPhone) => update("contact", { membershipPhone })} /><InputField label="Emergency phone" value={form.contact.emergencyPhone} onChange={(emergencyPhone) => update("contact", { emergencyPhone })} /><InputField label="General email" value={form.contact.generalEmail} onChange={(generalEmail) => update("contact", { generalEmail })} /><InputField label="Membership email" value={form.contact.membershipEmail} onChange={(membershipEmail) => update("contact", { membershipEmail })} /><InputField label="Press email" value={form.contact.pressEmail} onChange={(pressEmail) => update("contact", { pressEmail })} /><InputField label="Google Maps or map URL" value={form.contact.mapUrl} onChange={(mapUrl) => update("contact", { mapUrl })} /><InputField label="Office hours (weekdays)" value={form.contact.officeHoursWeekday} onChange={(officeHoursWeekday) => update("contact", { officeHoursWeekday })} /><InputField label="Office hours (weekend)" value={form.contact.officeHoursWeekend} onChange={(officeHoursWeekend) => update("contact", { officeHoursWeekend })} /><InputField label="Facebook page URL" value={form.contact.facebookUrl} onChange={(facebookUrl) => update("contact", { facebookUrl })} /><InputField label="Instagram profile URL" value={form.contact.instagramUrl} onChange={(instagramUrl) => update("contact", { instagramUrl })} /><InputField label="YouTube channel URL" value={form.contact.youtubeUrl} onChange={(youtubeUrl) => update("contact", { youtubeUrl })} /></CardContent></Card>
      </TabsContent>
      <TabsContent value="seo"><Card><CardHeader><CardTitle>Search and sharing metadata</CardTitle><CardDescription>Set the organization name and homepage metadata displayed in search and link previews.</CardDescription></CardHeader><CardContent className="space-y-5"><InputField label="Site / organization name" value={form.seo.siteName} onChange={(siteName) => update("seo", { siteName })} /><InputField label="Homepage title" value={form.seo.title} onChange={(title) => update("seo", { title })} /><TextField label="Homepage description" value={form.seo.description} onChange={(description) => update("seo", { description })} rows={3} /><TextField label="Related search terms" value={form.seo.keywords} onChange={(keywords) => update("seo", { keywords })} rows={3} hint="Include the association name, Sudurpashchim/Province 7, hotel terms and districts. Avoid repetitive keyword stuffing." /></CardContent></Card></TabsContent>
      <TabsContent value="music"><Card><CardHeader><CardTitle>Deuda music videos</CardTitle><CardDescription>One video per line: title | artist(s) | YouTube URL or video ID. Save to update the floating site player.</CardDescription></CardHeader><CardContent><Textarea rows={10} value={form.musicVideos.map((video) => `${video.title} | ${video.artists} | ${video.id}`).join("\n")} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => updateMusic(event.target.value)} /><p className="mt-2 text-xs text-surface-500 dark:text-dark-400">Use videos that allow embedding. YouTube availability and rights remain controlled by the video owners.</p></CardContent></Card></TabsContent>
    </Tabs>
  </div>;
}
