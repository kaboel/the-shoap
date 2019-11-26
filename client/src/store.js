import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    products: {},
    cart: [],
    contentOn: false,
    pageActive: null
  },
  mutations: {
    contentOff(state) {
      state.contentOn = false
    },
    toggleContent(state) {
      (state.contentOn === true) ?
        state.contentOn = false : state.contentOn = true
    },
    routeTo(state, page) {
      state.contentOn = true
      state.pageActive = page
    }
  },
  actions: {
    contentOff({commit}) {
      commit('contentOff')
    },
    toggleContent({commit}) {
      commit('toggleContent')
    },
    routeTo({commit}, page) {
      commit('routeTo', page)
    }
  }
})

export default store
