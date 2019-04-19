import Vue from 'vue'
import axios from 'axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueSwal from 'vue-swal'
import './stylus/main.styl'

// export const bus = new Vue()


Vue.use(VueSwal)
Vue.config.productionTip = false

Vue.prototype.axios = axios.create({
  baseURL: `http://localhost:3000/`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
