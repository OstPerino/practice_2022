import Vue from 'vue'
import App from './App.vue'
import { Vuelidate } from 'vuelidate'
import VueRouter from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTrash,
  faPen,
  faCheck,
  faXmark,
  faArrowLeftLong,
  faArrowRightLong
} from '@fortawesome/free-solid-svg-icons'
import { faVk, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dateFilter from '@/filters/dateFilter'
import router from './router'
import store from './store'

library.add(
  faTrash,
  faPen,
  faCheck,
  faXmark,
  faArrowLeftLong,
  faArrowRightLong,
  faVk,
  faTelegram
)
library.add(faTrash, faPen, faCheck, faXmark, faVk, faTelegram)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuelidate, VueRouter)
Vue.config.productionTip = false
Vue.filter('date', dateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
