export default {
  state: () => ({
    tasks: [],
    taskTemporary: ''
  }),
  getters: {
    getTodos (state) {
      return state.tasks
    },
    getTaskTemporary (state) {
      return state.taskTemporary
    }
  },
  mutations: {
    addTask (state, task) {
      state.tasks.push(task)
    },
    deleteTask (state, index) {
      state.tasks.splice(index, 1)
    },
    changeTask (state, payload) {
      state.task[payload.index].todo = payload.task
    }
  },
  actions: {
  }
}
