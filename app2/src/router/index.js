import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import { name } from '../../package'
import { getBase } from 'comm/src/utils'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '菜单一'
    }
  },
  {
    path: '/',
    redirect: '/home',
    meta: {
      title: '菜单一'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about'),
    meta: {
      title: '菜单二'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: getBase(name),
  routes
})

export default router
