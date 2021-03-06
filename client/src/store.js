import Vue from 'vue'
import Vuex from 'vuex'
import api from './service/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    products: null,
    orders: null,
    types: null,
    cart: {
      content: [],
      total: 0
    },
    checkout: {
      step: 0,
      profile: null,
      order: null,
      payment: null
    },
    contentOn: false,
    pageActive: null,
    sectionActive: {
      parent: 'Orders'
    }
  },
  getters: {
    checkout: state => state.checkout,
    cart: state => state.cart,
    products: state => state.products,
    types: state => state.types
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
    },
    cart: (state, cart) => {
      state.cart.content = cart
      let total = 0
      cart.forEach(el => {
        total += el.amount
      })
      state.cart.total = total
    },
    checkout: (state, checkout) => {
      if (checkout.hasOwnProperty('step')) {
        state.checkout.step = checkout.step
      }
      if (checkout.hasOwnProperty('profile')) {
        state.checkout.profile = checkout.profile
      }
      if (checkout.hasOwnProperty('order')) {
        state.checkout.order = checkout.order
      }
      if (checkout.hasOwnProperty('payment')) {
        state.checkout.payment = checkout.payment
      }
    },
    flushCart: (state) => {
      state.cart = {
        content: [],
        total: 0
      }
    },
    flushAll: (state) => {
      state.cart = {
        content: [],
          total: 0
      }
      state.checkout = {
        step: 0,
          profile: null,
          order: null,
          payment: null
      }
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
    },
    addToCart ({commit}, cart) {
      commit('cart', cart)
    },
    setCheckout ({commit}, checkout) {
      commit('checkout', checkout)
    },
    flushCart({commit}) {
      commit('flushCart')
    },
    flushAll({commit}) {
      commit('flushAll')
      commit('routeTo', {contentOff: false, pageActive: ''})
    }
  }
})

export default store
