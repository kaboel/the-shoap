import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/client/Index'
import About from './views/client/About'

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
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        title: 'The Shoap - About'
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
