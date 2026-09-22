export const SUDURPASHCHIM_DISTRICTS = [
  "Kailali",
  "Kanchanpur",
  "Doti",
  "Bajhang",
  "Bajura",
  "Achham",
  "Dadeldhura",
  "Baitadi",
] as const;

export type District = (typeof SUDURPASHCHIM_DISTRICTS)[number];

export const DISTRICT_INFO: Record<District, { hq: string; knownFor: string }> = {
  Kailali: { hq: "Dhangadhi", knownFor: "Wildlife & Terai culture" },
  Kanchanpur: { hq: "Bhimdatta", knownFor: "Shuklaphanta National Park" },
  Doti: { hq: "Dipayal Silgadhi", knownFor: "Dodhara Chandani Bridge" },
  Bajhang: { hq: "Chainpur", knownFor: "Api Himal & Khaptad gateway" },
  Bajura: { hq: "Martadi", knownFor: "Badimalika Temple" },
  Achham: { hq: "Mangalsen", knownFor: "Ramaroshan lakes" },
  Dadeldhura: { hq: "Amargadhi", knownFor: "Tripurasundari Temple" },
  Baitadi: { hq: "Dasharathchand", knownFor: "Pancheswar confluence" },
};
