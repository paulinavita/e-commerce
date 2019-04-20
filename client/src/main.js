import Vue from 'vue'
import axios from 'axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import './stylus/main.styl'

const options = {
  confirmButtonColor: 'success',
  cancelButtonColor: 'info'
}
// export const bus = new Vue()


Vue.use(VueSweetalert2)
Vue.config.productionTip = false

Vue.prototype.axios = axios.create({
  baseURL: `http://localhost:3000/`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
