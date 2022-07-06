import Vue from 'vue'
import App from './App.vue'
import { Vuelidate } from 'vuelidate'
import VueRouter from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faTrash,
  faPen,
  faCheck,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import router from './router'
import store from './store'

library.add(faTrash, faPen, faCheck, faXmark)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuelidate, VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
