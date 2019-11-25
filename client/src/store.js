import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    products: {},
    cart: []
  },
  mutations: {
  }
})

export default {
  store
}
