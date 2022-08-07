import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import { getToken } from './StorageFactory'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000';

new Vue({
  router,
  store,
  vuetify,
  created() {
    const token = getToken()
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.$store.dispatch('GET_CURRENT_USER')
    }
  },
  render: function (h) { return h(App) }
}).$mount('#app')
