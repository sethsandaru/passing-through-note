/**
 * Passing Through Note - Index
 * @description This is where we gonna register all the needed plugin(s) for our Vue app
 * @author Phat Tran
 */

import Vue from 'vue'

/**
 * Import here
 */
import {TitlePlugin} from "@/extendables/title-plugin";
import {TranslatorPlugin} from "@/extendables/translator-plugin";

/**
 * Register here
 */
Vue.use(TitlePlugin); // Added by Phat Tran
Vue.use(TranslatorPlugin); // Added by Phat Tran


// Please make sure to keep a newline after injected a new plugin