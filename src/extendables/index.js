/**
 * Passing Through Note - Index
 * @description This is where we gonna register all the needed plugin(s) for our Vue app
 * @author Phat Tran
 */

import Vue from 'vue'

/**
 * Import Vue's Plugins here
 */
import {TitlePlugin} from "@/extendables/title-plugin";
import {TranslatorPlugin} from "@/extendables/translator-plugin";
import {AjaxPlugin} from "@/extendables/ajax-plugin";
import {TopBarPlugin} from "@/extendables/topbar-plugin";
import Toaster from 'v-toaster'
import {LoadingPlugin} from "@/extendables/loading-plugin";
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import {REST_CONFIG} from "@/configs/rest";

/**
 * Register here
 */
Vue.use(TitlePlugin); // Added by Phat Tran
Vue.use(TranslatorPlugin); // Added by Phat Tran
Vue.use(AjaxPlugin); // Added by Phat Tran
Vue.use(TopBarPlugin); // Added by Phat Tran
Vue.use(Toaster); // Added by Phat Tran
Vue.use(LoadingPlugin); // Added by Phat Tran
Vue.use(new VueSocketIO({
    debug: REST_CONFIG.DEBUG,
    connection: socketio(REST_CONFIG.BASE_URL)
}))  // Added by Phat Tran


// Please make sure to keep a newline after injected a new plugin