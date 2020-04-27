/**
 * Passing Through Note - Translator Plugin - Text
 * Handle the static text getter/setter
 * @author Phat Tran
 */
import {Language} from "@/extendables/translator/language";
import {SUPPORTED_LANGUAGES} from "@/configs";

const TEXT_OBJECT = {};

const Text = function() {
    const instance = {};

    /**
     * Get translation text
     * @param {string} textKey (Important)
     * @param {string} textGroup (Default: index)
     * @param {string} specificLanguage (Default: Current Language)
     */
    instance.text = function(textKey, textGroup = 'index', specificLanguage = Language.getLanguage()) {
        if (TEXT_OBJECT) {
            importAllText();
        }

        // let textObject = getStaticTextContent(specificLanguage, textGroup);
        // if (!textObject) {
        //     throw new TypeError(`Can't retrieve the static text data of ${textGroup} of language ${specificLanguage}`);
        // }
        //
        // if (!textObject[textKey]) {
        //     throw new TypeError(`Text key: ${textKey} is not exists in ${textGroup} group of language ${specificLanguage}`);
        // }

        return textObject[textKey];
    }

    /**
     * Get static file path
     * @param {string} langCode
     * @param {string} textGroup
     */
    const getStaticLanguageFile = function(langCode, textGroup) {
        return `/translations/${langCode}/${textGroup}`
    }

    /**
     * Get object data from static text content
     * @param {string} langCode
     * @param {string} textGroup
     */
    const getStaticTextContent = function(langCode, textGroup) {
        if (textGroup === 'index') {
            textGroup = "";
        }

        let filePath = getStaticLanguageFile(langCode, textGroup);
        return require(filePath);
    }

    const importAllText = function () {
        SUPPORTED_LANGUAGES.forEach(langCode => {
            TEXT_OBJECT[langCode] = {};

            importAll(
                requireContext(`../../translations/${langCode}/`, true, /\.js$/),
                langCode
            )
        })
    };

    const importAll = function (r, langCode) {
        r.keys().forEach(
            key => TEXT_OBJECT[langCode][key] = r(key)
        );
    }

    return instance
}()

export {
    Text
}