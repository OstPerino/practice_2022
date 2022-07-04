export default {
  state: () => ({
    tasks: []
  }),
  getters: {
    getTodos (state) {
      return state.tasks
    }
  },
  mutations: {
    addTodo (state, task) {
      state.tasks.push(task)
    },
    deleteTodo (state, index) {
      state.tasks.splice(index, 1)
    },
    changeStatus (state, index) {
      state.task[index].done = !state.todos[index].done
    },
    changeTodo (state, payload) {
      state.task[payload.index].todo = payload.newTodo
    }
  },
  actions: {
  }
}
