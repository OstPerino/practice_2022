/* eslint-disable */

export default {
  state: () => ({
    currentTasks: [],
    weekTasks: [],
    monthTasks: []
  }),
  getters: {
    getCurrentTasks(state) {
      return state.currentTasks
    },
    getWeekTasks(state) {
      return state.weekTasks
    },
    getMonthTasks(state) {
      return state.monthTasks
    }
  },
  mutations: {
    setLocalTasks(state, response) {
      state.currentTasks = response
    },
    setWeekTasks(state, response) {
      state.weekTasks = response
    },
    setMonthTasks(state, response) {
      state.monthTasks = response
    },
    clearArray(state) {
      state.currentTasks = []
    }
  },
  actions: {
    async setAnalyticTasks(state) {
      const response = await fetch('http://localhost:4000/main/stat/-420', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'GET'
      })
      return response.json()
    }
  }
}
