import Vue from 'vue'
import VueRouter from 'vue-router'
import WebLayout from '../views/WebLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'WebLayout',
    component: WebLayout,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
