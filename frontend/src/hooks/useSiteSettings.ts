import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface SiteContent {
  seo?: { siteName?: string; title?: string; description?: string; keywords?: string };
  hero?: {
    images?: string[];
    en?: { eyebrow?: string; title?: string; subtitle?: string; primaryCta?: string; secondaryCta?: string };
    np?: { eyebrow?: string; title?: string; subtitle?: string; primaryCta?: string; secondaryCta?: string };
  };
  about?: {
    en?: { eyebrow?: string; title?: string; subtitle?: string; body1?: string; body2?: string };
    np?: { eyebrow?: string; title?: string; subtitle?: string; body1?: string; body2?: string };
  };
  contact?: { addressLines?: string[]; officePhone?: string; membershipPhone?: string; emergencyPhone?: string; generalEmail?: string; membershipEmail?: string; pressEmail?: string; officeHoursWeekday?: string; officeHoursWeekend?: string; mapUrl?: string; facebookUrl?: string; instagramUrl?: string; youtubeUrl?: string };
  membership?: {
    en?: { benefitsTitle?: string; benefitsEyebrow?: string; benefits?: Array<{ title: string; desc: string }> };
    np?: { benefitsTitle?: string; benefitsEyebrow?: string; benefits?: Array<{ title: string; desc: string }> };
  };
  musicVideos?: Array<{ id: string; title: string; artists: string }>;
}

interface SettingsResponse { success: boolean; data: SiteContent }

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => (await api.get<SettingsResponse>("/site-settings")).data.data,
    staleTime: 60_000,
  });
}
