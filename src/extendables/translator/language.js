/**
 * Passing Through Note - Translator Plugin - Language
 * Handle the language getter/setter
 * @author Phat Tran
 */
import {DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES} from "@/configs";

const LANG_STORAGE_KEY = 'path-note-language';

// pick up language
let currentLanguage = localStorage.getItem(LANG_STORAGE_KEY) || DEFAULT_LANGUAGE;

const Language = {
    /**
     * Set language for the App
     */
    setLanguage(langCode) {
        if (!langCode || SUPPORTED_LANGUAGES.indexOf(langCode) < 0) {
            throw new TypeError("LangCode cant be null / This Lang Code is not supported");
        }

        currentLanguage = langCode;
    },

    /**
     * Get current language
     * @returns {string}
     */
    getLanguage: () => currentLanguage,
}


export {
    Language
}