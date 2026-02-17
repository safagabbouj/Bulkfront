import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./../assets/i18n/en.json";
import translationFR from "./../assets/i18n/fr.json";

// Define translations
const resources = {
    en: {
        translation: translationEN,
    },
    fr: {
        translation: translationFR,
    },
};

// Initialize i18next
i18n
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: "fr",
        lng: "fr", // default language
        interpolation: {
            escapeValue: false, // React already protects against XSS
        },
        react: {
            useSuspense: false,
        },
        detection: {
            order: ["navigator", "localStorage"],
            caches: ["localStorage"],
        },
    });

export default i18n;
