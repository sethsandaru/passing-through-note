import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: "/note/:noteId",
      name: "note",
      component: () => import(/* webpackChunkName: "about" */ './views/Note.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

/**
 * IDEA:
 *  Main page => component:Home => Injected in the main bundle
 *  Sub page => component: () => import(...) => Separated into {routeName}.[hash].js (Which is lazy-loaded when the route is visited)
 */