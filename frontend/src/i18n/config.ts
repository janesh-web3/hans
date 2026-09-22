import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import np from "./locales/np.json";

const savedLanguage = localStorage.getItem("language");

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    np: { translation: np },
  },
  lng: savedLanguage ?? "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
