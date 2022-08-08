import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import { removeToken } from '@/StorageFactory'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user
    },
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
      return axios.get(`/user/user-details`).then(res => {
        commit('SET_USER', res.data)
        return res.data
      })
    },
    LOGOUT ({ commit }) {
      commit('SET_USER', null);
      removeToken()
      router.push('/login')
    }
  },
  modules: {
  }
})
