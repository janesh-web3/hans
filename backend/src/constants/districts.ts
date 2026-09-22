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
