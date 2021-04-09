import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import {firebaseAuth} from "boot/firebase";

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  window.userId = localStorage.getItem('userId');
  Router.beforeResolve((to, from, next) => {
    console.log('in guard')
    let userId = firebaseAuth.currentUser == null ? null : firebaseAuth.currentUser.uid
    if (userId == null) {
      console.log('userid is null')
      userId = localStorage.getItem('userId')
      window.userId = userId;
    }
    if (userId && to.meta.authNotRequired || !userId && !to.meta.authNotRequired) {
      const path = !userId ? '/b/login' : '/'
      console.log(path)
      return next(path)
    }
    next()
  })

  return Router
}
