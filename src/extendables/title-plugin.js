/**
 * Passing Through Note - Title Plugins
 * Simple injection to change the `document.title` of the web
 * @author Phat Tran
 */
import {SITE_CONFIGS} from "@/configs";

const TitlePlugin = {
    install(Vue, options) {

        /**
         * Set Title For VuePage
         * @param {string} title
         * @param {string} brandTitleName
         */
        Vue.prototype.$setTitle = function (title, brandTitleName = SITE_CONFIGS.SITE_NAME) {
            document.title = `${title} - ${brandTitleName}`
        }

    }
}

export {
    TitlePlugin
}