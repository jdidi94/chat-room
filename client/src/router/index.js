import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    component: () => import("@/components/LandingPage.vue"),
  },
  {
    path:"/profile",
    component: () => import("@/components/profile.vue"),
  },

]

const router = new VueRouter({
  routes
})

export default router
