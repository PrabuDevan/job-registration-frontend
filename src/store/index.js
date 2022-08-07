import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    isAdmin (state) {
      return state.user?.isAdmin
    },
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
  },
  actions: {
    GET_CURRENT_USER ({ commit }) {
      axios.get(`/user/user-details`).then(res => {
        commit('SET_USER', res.data)
      })
    }
  },
  modules: {
  }
})
