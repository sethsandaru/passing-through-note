/**
 * Passing Through Note - Ajax Plugin
 * With this plugin, I will inject the `AjaxService` into Vue's lifecycle
 * @author Phat Tran
 */
import {AjaxService} from "@/libraries/AjaxService";

const METHODS = ['get', 'post', 'put', 'delete']

const AjaxPlugin = {
    install(Vue, options) {
        Vue.prototype.$ajax = {};

        for (const method of METHODS) {
            if (!AjaxService[method]) {
                continue;
            }

            Vue.prototype.$ajax[method] = AjaxService[method];
        }
    }
}

export {
    AjaxPlugin
}