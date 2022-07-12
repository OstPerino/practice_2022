<template>
  <div>
    <TasksComponent/>
  </div>
</template>

<script>
import TasksComponent from '@/components/views/TasksComponent'

export default {
  name: 'main-component.vue',
  components: {
    TasksComponent
  },
  async beforeCreate () {
    const response = await fetch('http://localhost:4000/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'GET'
    })
    if (!response.ok) {
      await this.$router.push('/authorization')
    }
  },
  methods: {
    async userExit () {
      const response = await fetch('http://localhost:4000/logout',
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'GET'
        })

      if (response.status === 200) {
        await this.$router.push('/authorization')
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.MainComponent {
  &__button {
    background-color: #4978b3;
    padding: 15px 45px;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    border-radius: 30px;
  }
}
</style>
