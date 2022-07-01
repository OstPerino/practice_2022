<template>
  <div>
    <HeaderComponent />

  </div>
</template>

<script>
import HeaderComponent from '@/components/views/HeaderComponent'

export default {
  name: 'main-component.vue',
  components: {
    HeaderComponent
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
