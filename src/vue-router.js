import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './components/views/routes'

const router = new VueRouter({
  linkActiveClass : 'active',
  routes
});

export default router
