import Vue from 'vue'
import App from './App.vue'
import { Vuelidate } from 'vuelidate'
import store from './store'
import router from './router'
import VueRouter from 'vue-router'

Vue.use(Vuelidate, VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
