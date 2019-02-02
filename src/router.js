import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main.vue'
import Connector from '@/components/Connector.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/connector/:client_id?',
      name: 'connector',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Connector
    }
  ]
})
