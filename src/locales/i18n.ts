import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "./translations/en.json";
import uz from "./translations/uz.json";
import ru from "./translations/ru.json";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    uz: { translation: uz },
    ru: { translation: ru },
  },
  compatibilityJSON: "v3",
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: "en",
  lng: Localization.getLocales()[0].languageCode ?? "en",
});

export default i18next;
