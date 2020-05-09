/**
 * Passing Through Note - Loading Plugin
 * With this plugin, I will have a chance to show the loading indicator.
 * @author Phat Tran
 */
import $ from 'jquery'

const LOADING_SELECTOR = ".loading";

let showLoading = function() {
    $(LOADING_SELECTOR).show();
}

let hideLoading = function () {
    $(LOADING_SELECTOR).hide();
}

const LoadingPlugin = {
    install(Vue, options) {
        Vue.prototype.$loading = {};
        Vue.prototype.$loading.show = showLoading;
        Vue.prototype.$loading.hide = hideLoading;
    }
}

export {
    LoadingPlugin,
    showLoading,
    hideLoading
}