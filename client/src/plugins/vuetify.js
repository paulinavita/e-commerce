import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme : {
    primary : '#C3A7A3',
    success : '#795E6C',
    info : '#597478',
    error : '#87262E',
  }
})
