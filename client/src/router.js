import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/client/Main'
import About from './views/client/About'
import Main from './views/admin/Main'

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
      path: '/admin-secured',
      name: 'Admin',
      component: Main,
      meta: {
        title: 'Admin Zone'
      }
    },
    {
      path: '*',
      redirect: '/admin-secured'
    }
  ]
})
