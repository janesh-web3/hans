/**
 * Secretariat contact details, in one place so the contact page, footer and
 * navbar cannot drift apart.
 *
 * Dhangadhi's landline area code is 091; the extensions and the mobile hotline
 * are representative rather than verified — confirm them with the association
 * before launch.
 */
export const CONTACT = {
  office: {
    name: "HAN Bhawan",
    street: "Dhangadhi-4",
    district: "Kailali",
    province: "Sudurpashchim Province",
    country: "Nepal",
    /** Dhangadhi, Kailali — used by the office map. */
    coordinates: { lat: 28.7041, lng: 80.5887 },
  },
  phone: {
    office: "+977-91-521000",
    membership: "+977-91-521004",
    emergency: "+977-9858-521000",
  },
  email: {
    general: "info@hansudurpashchim.org.np",
    membership: "membership@hansudurpashchim.org.np",
    press: "press@hansudurpashchim.org.np",
  },
} as const;

/** Address as display lines, in order. */
export const OFFICE_ADDRESS_LINES: string[] = [
  `${CONTACT.office.name}, ${CONTACT.office.street}`,
  `${CONTACT.office.district}, ${CONTACT.office.province}`,
  CONTACT.office.country,
];

/** `tel:` href — strips the spacing and dashes a dialler cannot use. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
