import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {} from './extendables'

// Main styling...
import('./3rdparty-register')
import('./assets/css/base.css');

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
