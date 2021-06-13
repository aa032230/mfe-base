import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import { name } from '../../package'
import { getBase } from "comm/src/utils";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/about')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: getBase(name),
  routes
})

export default router
