// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.min.css'
import 'bulma-badge/dist/css/bulma-badge.min.css'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'

import {
  faCopyright, faTimes, faLink, faHome,
  faInfo, faInfoCircle, faBoxes, faList,
  faPlusCircle, faTrash, faExclamationCircle,
  faMinus, faPlus, faCheck, faSyncAlt,
  faArrowRight, faMailBulk, faShoppingCart,
  faCartPlus, faChevronRight, faChevronLeft,
  faAsterisk
} from '@fortawesome/free-solid-svg-icons'

import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

library.add(
  faCopyright, faTimes, faHome, faLink,
  faInfo, faInfoCircle, faBoxes, faList,
  faPlusCircle, faTrash, faExclamationCircle,
  faPlus, faMinus, faCheck, faSyncAlt,
  faArrowRight, faMailBulk, faShoppingCart,
  faWhatsapp, faCartPlus, faChevronRight,
  faChevronLeft, faAsterisk
)

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fas'
})

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
  from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  if (!nearestWithMeta) return next()

  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')
    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })
    tag.setAttribute('data-vue-router-controlled', '')
    return tag
  }).forEach(tag => document.head.appendChild(tag))

  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
