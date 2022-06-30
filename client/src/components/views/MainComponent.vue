<template>
  <div>
    <h1> Привет</h1>
    <button
      class="MainComponent__button "
      @click.prevent="userExit"
    >
      Exit
    </button>

  </div>
</template>

<script>
export default {
  name: 'main-component.vue',
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

<style scoped lang="scss">
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
