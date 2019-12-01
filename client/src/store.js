import Vue from 'vue'
import Vuex from 'vuex'
import api from './service/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    products: null,
    orders: null,
    types: null,
    cart: [],
    contentOn: false,
    pageActive: null,
    sectionActive: {
      parent: 'Orders'
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
    },
    orders (state, orders) {
      state.orders = orders
    },
    types (state, types) {
      state.types = types
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
    },
    fillOrders ({commit}, orders) {
      commit('orders', orders)
    },
    fillTypes ({commit}, types) {
      commit('types', types)
    }
  }
})

export default store
