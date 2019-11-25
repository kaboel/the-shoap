import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/client/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: 'The Shoap'
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
