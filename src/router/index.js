import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import VueRouter from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-vue/dist/bootstrap-vue.css'
 
Vue.use(VueRouter)
Vue.use(BootstrapVue)

const routes = [
  {
      path: '/',
      name: 'SummaryUser',
      component: () => import(/* webpackChunkName: "about" */ '../views/SummaryUser.vue')
  },
  {
      path: '/unitconversion',
      name: 'UnitConversion',
      component: () => import(/* webpackChunkName: "about" */ '../views/UnitConversion.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
