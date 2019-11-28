import Vue from 'vue'
import Vuex from 'vuex'
import api from './service/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    products: null,
    cart: [],
    contentOn: false,
    pageActive: null,
    sectionActive: {
      parent: 'Products',
    }
  },
  mutations: {
    contentOff (state) {
      state.contentOn = false
    },
    toggleContent (state) {
      (state.contentOn === true) ? state.contentOn = false : state.contentOn = true
    },
    routeTo (state, page) {
      state.contentOn = true
      state.pageActive = page
    },
    sectionTo (state, section) {
      state.sectionActive = section
    },
    products (state, products) {
      state.products = products
    }
  },
  actions: {
    contentOff ({commit}) {
      commit('contentOff')
    },
    toggleContent ({commit}) {
      commit('toggleContent')
    },
    routeTo ({commit}, page) {
      commit('routeTo', page)
    },
    sectionTo ({commit}, section) {
      commit('sectionTo', section)
    },
    fillProducts ({commit}, products) {
      commit('products', products)
    }
  }
})

export default store
