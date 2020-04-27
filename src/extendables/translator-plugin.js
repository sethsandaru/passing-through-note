/**
 * Passing Through Note - Translator Plugins
 * Simple translator to get the language translation text (static text)
 * @author Phat Tran
 */

import FACADE from './translator'

const TranslatorPlugin = {
    /**
     * Install function to help us inject the plugin into Vue's lifecycle
     * @param Vue
     * @param {Object} options
     */
    install(Vue, options) {
        Vue.prototype.__ = FACADE.text.text;
        Vue.prototype.$setLanguage = FACADE.language.setLanguage;
        Vue.prototype.$getLanguage = FACADE.language.getLanguage;
    },
};

export {
    TranslatorPlugin
}