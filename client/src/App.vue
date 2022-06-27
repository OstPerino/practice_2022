<template>
  <div
    id="app"
    class="app"
  >
    <div class="container">
      <div class="flex-container">
        <registration-component
          class="RegistrationComponent"
        />
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import registrationComponent from '@/components/registration/RegistrationComponent'

export default {
  components: {
    registrationComponent
  },
  data: () => {
    return {
    }
  },
  methods: {}
}

</script>

<style lang="scss">
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  @import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap');
  font-family: 'Karla', sans-serif;
}

.app {
  width: 100vw;
  height: 100vh;
  //font-size: 10px;
  background-color: #A7D7C5;
}

.container {
  height: 100%;
}

.flex-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
