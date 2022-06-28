<template>
  <div
    id="app"
    class="app"
  >
    <div class="container">
      <div class="flex-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;700;800&display=swap');
  font-family: 'Barlow', sans-serif;
}
.app {
  width: 100vw;
  height: 100vh;
  font-size: 30px;
  background: #84C7AE;
}
.container {
  width: 1440px;
  margin: 0 auto;
  height: 100%;
}
.flex-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
