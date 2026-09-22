import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { SUDURPASHCHIM_DISTRICTS, DISTRICT_INFO } from "@/constants/districts";
import { DISTRICT_IMAGES } from "@/constants/districtImages";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export default function DistrictsGrid() {
  return (
    <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {SUDURPASHCHIM_DISTRICTS.map((district) => {
        const info = DISTRICT_INFO[district];
        return (
          <RevealItem key={district}>
            <Link
              to={`/membership?district=${encodeURIComponent(district)}`}
              className="group relative block overflow-hidden rounded-xl bg-surface-200 dark:bg-dark-800"
              style={{ aspectRatio: "3 / 4" }}
            >
              <img
                src={DISTRICT_IMAGES[district]}
                alt={district}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div
                className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.05) 75%)",
                }}
              />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-luxury text-white/70">
                  {info.hq}
                </span>
                <FiArrowUpRight
                  className="text-white/0 group-hover:text-white transition-all duration-300 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
                  size={16}
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif font-bold text-white text-xl sm:text-2xl leading-tight mb-1">
                  {district}
                </h3>
                <p className="text-white/60 text-xs leading-snug line-clamp-1">
                  {info.knownFor}
                </p>
              </div>
            </Link>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
