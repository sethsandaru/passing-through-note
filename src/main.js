import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {TitlePlugin} from "@/extendables/title-plugin";

// Main styling...
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false
Vue.use(TitlePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
