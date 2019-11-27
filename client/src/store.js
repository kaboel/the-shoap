import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    products: {},
    cart: [],
    contentOn: false,
    pageActive: null,
    sectionActive: 'Products'
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
    }
  }
})

export default store
