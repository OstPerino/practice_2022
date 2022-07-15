/* eslint-disable */
// import * as requestOptions from '../api/index'

export default {
  state: () => ({
    tasks: [],
    taskTemporary: ''
  }),
  getters: {
    getTasks(state) {
      return state.tasks
    }
  },
  mutations: {
    setTasks(state, response) {
      state.tasks = response
    },
    addTask(state, task) {
      state.tasks.push(task)
    },
    deleteTaskFromStore(state, index) {
      state.tasks.splice(index, 1)
    },
    changeTask(state, payload) {
      const toChange = state.tasks.find(item => item.id === payload.task.id)
      toChange.content = payload.content
    },
    changeStatus(state, task) {
      const toChange = state.tasks.find(item => item.id === task.id)
      toChange.status = !toChange.status
    },
    turnOff(state) {
      state.tasks.forEach(item => {
        if (item.status) {
          item.status = false
        }
      })
    },
    changePlayTask(state, task) {
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
    async createNewTask(context, task) {
      const response = await fetch('http://localhost:4000/main/create', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(task)
      })
      const newTask = await response.json()
      context.commit('addTask', newTask)
    },
    async deleteTask(context, payload) {
      const response = await fetch(
        `http://localhost:4000/main/delete/${payload.task.id}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          method: 'DELETE'
        }
      )
      context.commit('deleteTaskFromStore', payload.index)
    },
    async editTask(context, payload) {
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
      context.commit('changeTask', {
        task: payload.task,
        content: payload.content
      })
    },
    async startTaskTimer(context, task) {
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
      context.commit('turnOff')
      context.commit('changeStatus', task)
      context.commit('changePlayTask', task)
    },
    async stopTaskTimer(context, task) {
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
      context.commit('changeStatus', task)
      context.commit('changePlayTask', task)
    }
  }
}
