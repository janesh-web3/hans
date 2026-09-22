import { FiHome, FiMapPin, FiKey, FiAward } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useCountUp } from "@/hooks/useCountUp";

const YEARS_OF_SERVICE = new Date().getFullYear() - 1998;

function StatItem({
  Icon,
  value,
  suffix = "",
  label,
}: {
  Icon: typeof FiHome;
  value: number;
  suffix?: string;
  label: string;
}) {
  const [count, ref] = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col items-center text-center px-6 py-8">
      <Icon className="text-primary-300 mb-4" size={26} strokeWidth={1.5} />
      <p className="text-4xl sm:text-5xl font-bold text-white leading-none">
        {count}
        {suffix}
      </p>
      <p className="text-white/50 text-xs mt-3 font-semibold uppercase tracking-luxury">{label}</p>
    </div>
  );
}

export default function QuickStatsBand() {
  const { t } = useTranslation();

  const stats: { Icon: typeof FiHome; value: number; suffix?: string; label: string }[] = [
    { Icon: FiHome, value: 15, suffix: "+", label: t("home.stats.hotels") },
    { Icon: FiMapPin, value: 8, label: t("home.stats.districts") },
    { Icon: FiKey, value: 500, suffix: "+", label: t("home.stats.rooms") },
    { Icon: FiAward, value: YEARS_OF_SERVICE, suffix: "+", label: t("home.stats.years") },
  ];

  return (
    <section className="bg-primary-800 dark:bg-primary-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
