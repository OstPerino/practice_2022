import Vue from 'vue'
import Vuex from 'vuex'
import taskModule from '@/store/taskModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    taskModule
  }
})
