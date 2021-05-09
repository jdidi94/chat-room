import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
function guardMyroute(to, from, next)
{

 var isAuthenticated= false;
//this is just an example. You will have to find a better or 
// centralised way to handle you localstorage data handling 
if(localStorage.getItem('token')){

  isAuthenticated = true;
}
 else{

   isAuthenticated= false;
 }
 if(isAuthenticated) 
 {
  next(); // allow to enter route
 } 
 else
 {
  next('/'); // go to '/login';
 }
}

const routes = [
  {
    path:"/",
    component: () => import("@/components/LandingPage.vue"),
  },
  {
    path:"/chat",
    beforeEnter : guardMyroute,
    component: () => import("@/components/chat.vue"),
  },
  {
    path:"/profile",
    beforeEnter : guardMyroute,
    component: () => import("@/components/profile.vue"),
  },
  {
    path:"/room/:id",
    name:"room",
    beforeEnter : guardMyroute,
    component: () => import("@/components/room.vue"),
  },
  
]

const router = new VueRouter({
  routes
})

export default router
