import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SUDURPASHCHIM_DISTRICTS } from "@/constants/districts";
import { useHotel } from "@/hooks/useHotels";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const DEFAULTS: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Hotel Association of Nepal, Sudurpashchim Province | HANS",
    description: "Official website of the Hotel Association of Nepal, Sudurpashchim Province (Province No. 7). Explore member hotels, tourism, events and hospitality across Sudurpashchim.",
  },
  "/about": {
    title: "About HANS Sudurpashchim | Hotel Association of Nepal Province 7",
    description: "Learn about the Hotel Association of Nepal, Sudurpashchim Province, its hospitality members, leadership and work across western Nepal.",
  },
  "/directory": {
    title: "Hotel Directory, Sudurpashchim Nepal | HANS Member Hotels",
    description: "Find and contact member hotels, resorts and homestays across Sudurpashchim Province, including Kailali, Kanchanpur, Doti, Bajhang, Bajura, Achham, Dadeldhura, Baitadi and Darchula.",
  },
  "/events": {
    title: "Hospitality Events in Sudurpashchim | HANS",
    description: "Discover hotel association events, hospitality programs and tourism activities in Sudurpashchim Province, Nepal.",
  },
  "/membership": {
    title: "Hotel Association Membership | HANS Sudurpashchim",
    description: "Learn how hotels and hospitality businesses in Sudurpashchim Province can join the Hotel Association of Nepal provincial chapter.",
  },
  "/contact": {
    title: "Contact HANS Sudurpashchim | Hotel Association of Nepal",
    description: "Contact the Hotel Association of Nepal, Sudurpashchim Province for membership, hotel directory, tourism and general inquiries.",
  },
};

function setMeta(name: string, content: string, attribute: "name" | "property" = "name"): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function SeoManager() {
  const { pathname } = useLocation();
  const hotelId = pathname.match(/^\/hotel\/([^/]+)/)?.[1];
  const { data: hotel } = useHotel(hotelId);
  const { data: siteSettings } = useSiteSettings();

  useEffect(() => {
    const defaultMetadata = DEFAULTS[pathname] ?? {
      title: "Hotel Association of Nepal, Sudurpashchim Province | HANS",
      description: "Hotel Association of Nepal Sudurpashchim Province connects hospitality businesses and promotes tourism across Province No. 7, Nepal.",
    };
    const siteName = siteSettings?.seo?.siteName || "Hotel Association of Nepal, Sudurpashchim Province | HANS";
    const title = hotel ? `${hotel.name} | HANS Sudurpashchim Hotel Directory` : pathname === "/" ? (siteSettings?.seo?.title || defaultMetadata.title) : `${defaultMetadata.title.split(" | ")[0]} | ${siteName}`;
    const description = hotel
      ? `${hotel.description.slice(0, 145)}${hotel.description.length > 145 ? "…" : ""} ${hotel.district}, Sudurpashchim, Nepal.`
      : pathname === "/" ? (siteSettings?.seo?.description || defaultMetadata.description) : defaultMetadata.description;
    const canonicalPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
    const canonicalUrl = `${window.location.origin}${canonicalPath}`;
    const keywords = [
      "Hotel Association of Nepal Sudurpashchim", "HANS Sudurpashchim", "Hotel Association Province No. 7",
      "Sudurpaschim hotel association", "Sudurpashchim hotels", "Province 7 hotels Nepal",
      "hotels Kailali", "hotels Kanchanpur", "hotels Doti", "hotels Bajhang", "hotels Bajura",
      "hotels Achham", "hotels Dadeldhura", "hotels Baitadi", "hotels Darchula", "Sudurpashchim tourism",
    ].join(", ");

    document.title = title;
    setMeta("description", description);
    setMeta("keywords", siteSettings?.seo?.keywords || keywords);
    setMeta("robots", "index,follow,max-image-preview:large");
    setMeta("og:type", hotel ? "hotel" : "website", "property");
    setMeta("og:site_name", "Hotel Association of Nepal, Sudurpashchim Province", "property");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:image", hotel?.images?.[0] || `${window.location.origin}/logo.png`, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", hotel?.images?.[0] || `${window.location.origin}/logo.png`);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${window.location.origin}/#organization`,
          name: "Hotel Association of Nepal, Sudurpashchim Province",
          alternateName: ["HANS Sudurpashchim", "Hotel Association of Nepal Province No. 7"],
          url: `${window.location.origin}/`,
          areaServed: SUDURPASHCHIM_DISTRICTS.map((name) => ({ "@type": "AdministrativeArea", name })),
          address: { "@type": "PostalAddress", addressRegion: "Sudurpashchim Province", addressCountry: "NP" },
        },
        { "@type": "WebSite", "@id": `${window.location.origin}/#website`, url: `${window.location.origin}/`, name: "HANS Sudurpashchim", publisher: { "@id": `${window.location.origin}/#organization` } },
        ...(hotel ? [{ "@type": "Hotel", name: hotel.name, description: hotel.description, address: { "@type": "PostalAddress", streetAddress: hotel.contactInfo.address, addressRegion: hotel.district, addressCountry: "NP" }, geo: { "@type": "GeoCoordinates", latitude: hotel.coordinates.lat, longitude: hotel.coordinates.lng }, url: canonicalUrl, image: hotel.images }] : []),
      ],
    };
    let jsonLd = document.getElementById("hans-structured-data") as HTMLScriptElement | null;
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.id = "hans-structured-data";
      jsonLd.type = "application/ld+json";
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);
    }, [pathname, hotel, siteSettings]);

  return null;
}
