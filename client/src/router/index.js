import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    component: () => import("@/components/LandingPage.vue"),
  },
  {
    path:"/chat",
    component: () => import("@/components/chat.vue"),
  },
  {
    path:"/profile",
    component: () => import("@/components/profile.vue"),
  },
  {
    path:"/room/:id",
    name:"room",
    component: () => import("@/components/room.vue"),
  },
  
]

const router = new VueRouter({
  routes
})

export default router
