import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    // 子项目history模式下，父项目的模糊匹配。不建议这样做
    // path: '/vue*',
    path: '/vue',
    name: 'vue',
    component: () => import(/* webpackChunkName: "about" */ '../components/Vue')
  },
  {
    // 子项目history模式下，父项目的模糊匹配。不建议这样做
    // path: '/vue*',
    path: '/two',
    name: 'two',
    component: () => import(/* webpackChunkName: "about" */ '../components/Two')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
