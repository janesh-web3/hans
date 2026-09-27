export const SUDURPASHCHIM_DISTRICTS = [
  "Kailali",
  "Kanchanpur",
  "Doti",
  "Bajhang",
  "Bajura",
  "Achham",
  "Dadeldhura",
  "Baitadi",
  "Darchula",
] as const;

export type District = (typeof SUDURPASHCHIM_DISTRICTS)[number];
