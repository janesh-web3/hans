import { useTranslation } from "react-i18next";

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { i18n, t } = useTranslation();
  const isNepali = i18n.language === "np";

  function toggle() {
    const next = isNepali ? "en" : "np";
    i18n.changeLanguage(next);
    localStorage.setItem("language", next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={isNepali ? t("language.en") : t("language.np")}
      title={isNepali ? t("language.en") : t("language.np")}
      className={`h-9 px-2.5 flex items-center justify-center rounded-lg text-xs font-bold
        text-surface-600 hover:text-surface-900 hover:bg-surface-200
        dark:text-dark-400 dark:hover:text-white dark:hover:bg-dark-800
        transition-colors duration-150 ${className}`}
    >
      {isNepali ? "EN" : "नेपाली"}
    </button>
  );
}
