/* eslint-disable */
export default {
  state: () => ({
    tasks: [],
    taskTemporary: ''
  }),
  getters: {
    getTasks(state) {
      return state.tasks
    },
    getTaskTemporary(state) {
      return state.taskTemporary
    }
  },
  mutations: {
    setTasks(state, response) {
      state.tasks = response
    },
    addTask(state, task) {
      state.tasks.push(task)
    },
    deleteTask(state, index) {
      state.tasks.splice(index, 1)
    },
    changeTask(state, payload) {
      const toChange = state.tasks.find(item => item.id === payload.task.id)
      toChange.content = payload.content
    },
    startTask(state, task) {
      const toChange = state.tasks.find(item => item.id === task.id)
      toChange.time = task.time
    },
    stopTask (state, task) {
      const toChange = state.tasks.find(item => item.id === task.id)
      toChange.time = task.time
    }
  },
  actions: {
    async getAllTasks(state) {
      const response = await fetch('http://localhost:4000/main', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'GET'
      })

      return response.json()
    },
    async createNewTask(state, task) {
      const response = await fetch('http://localhost:4000/main/create', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(task)
      })
    },
    async deleteTask({ dispatch }, task) {
      const response = await fetch(
        `http://localhost:4000/main/delete/${task.id}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          method: 'DELETE'
        }
      )
    },
    async editTask({ dispatch }, payload) {
      // console.log(payload.content)
      const response = await fetch(
        `http://localhost:4000/main/update/${payload.task.id}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          method: 'PUT',
          body: JSON.stringify({ content: payload.content })
        }
      )
    },
    async startTaskTimer({ dispatch }, task) {
      // console.log(payload.content)
      const response = await fetch(
        `http://localhost:4000/main/start_time/${task.id}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          method: 'PUT'
        }
      )
    },
    async stopTaskTimer({ dispatch }, task) {
      // console.log(payload.content)
      const response = await fetch(
        `http://localhost:4000/main/stop_time/${task.id}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          method: 'PUT'
        }
      )
    }
  }
}