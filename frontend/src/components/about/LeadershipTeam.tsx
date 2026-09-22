import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { District } from "@/constants/districts";

interface CommitteeMember {
  name: string;
  /** Matches a key under `about.committee.roles` in the locale files. */
  role: string;
  district: District;
  /** Member property this office bearer runs. */
  affiliation: string;
  initials: string;
  /**
   * Portrait of the office bearer. Left undefined until the association
   * supplies real photographs; the card falls back to a monogram plate so
   * no stranger's likeness is ever attached to a named official.
   */
  photo?: string;
}

const COMMITTEE: CommitteeMember[] = [
  {
    name: "Mr. Ram Bahadur Bista",
    role: "President",
    district: "Kailali",
    affiliation: "Hotel Karnali, Dhangadhi",
    initials: "RB",
  },
  {
    name: "Mrs. Sita Devi Chand",
    role: "Vice President",
    district: "Kanchanpur",
    affiliation: "Shuklaphanta Resort, Bhimdatta",
    initials: "SD",
  },
  {
    name: "Mr. Hari Prasad Joshi",
    role: "General Secretary",
    district: "Doti",
    affiliation: "Silgadhi Guest House, Dipayal",
    initials: "HP",
  },
  {
    name: "Mr. Gopal Singh Dhami",
    role: "Treasurer",
    district: "Dadeldhura",
    affiliation: "Hotel Tripurasundari, Amargadhi",
    initials: "GS",
  },
  {
    name: "Mrs. Kamla Buda",
    role: "Joint Secretary",
    district: "Achham",
    affiliation: "Ramaroshan Homestay, Mangalsen",
    initials: "KB",
  },
  {
    name: "Mr. Surya Bahadur Rokaya",
    role: "Exec. Member",
    district: "Bajhang",
    affiliation: "Khaptad View Lodge, Chainpur",
    initials: "SR",
  },
  {
    name: "Mr. Dhan Bahadur Karki",
    role: "Exec. Member",
    district: "Baitadi",
    affiliation: "Mahakali Inn, Dasharathchand",
    initials: "DK",
  },
  {
    name: "Mrs. Mina Rawal",
    role: "Exec. Member",
    district: "Bajura",
    affiliation: "Badimalika Homestay, Martadi",
    initials: "MR",
  },
];

/**
 * The elected executive committee, one plate per office bearer.
 *
 * Plates sit in grayscale and warm into colour on hover while the image
 * scales and the gradient deepens. Where no portrait has been supplied the
 * plate renders a forest-green monogram instead, which takes the same
 * grayscale treatment so the grid still reads as one set.
 */
export default function LeadershipTeam() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-24 lg:py-32 dark:bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 max-w-2xl"
        >
          <span className="mb-4 block text-xs uppercase tracking-widest text-river-600 dark:text-river-400">
            {t("about.leadership.eyebrow")}
          </span>
          <h2 className="font-serif text-4xl font-bold leading-tight text-forest-900 md:text-5xl dark:text-white">
            {t("about.leadership.title")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-stone-600 dark:text-dark-300">
            {t("about.leadership.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {COMMITTEE.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: (i % 4) * 0.12 }}
            >
              <article className="group relative aspect-[3/4] overflow-hidden rounded-sm">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-forest-700 to-forest-900 grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0">
                    <span
                      aria-hidden="true"
                      className="font-serif text-6xl font-bold text-white/30"
                    >
                      {member.initials}
                    </span>
                  </div>
                )}

                {/* Gradient plate carrying the caption, deepening on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl font-bold text-white">{member.name}</h3>
                  <p className="mt-1 text-sm uppercase tracking-wider text-white/80">
                    {t(`about.committee.roles.${member.role}`)}
                  </p>
                  <p className="mt-1 text-xs text-white/60">{member.affiliation}</p>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
