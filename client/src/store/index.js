import Vue from 'vue'
import Vuex from 'vuex'
import taskModule from '@/store/taskModule'
import analyticsModule from '@/store/analyticsModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    taskModule,
    analyticsModule
  }
})
