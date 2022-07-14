<template>
  <v-app
    id='app'
    class='app'
  >
    <HeaderComponent v-show='$route.name !== "Authorization" && $route.name !== "Registration"'/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import HeaderComponent from '@/components/layouts/HeaderComponent'

export default {
  components: {
    HeaderComponent
  },
  data: () => {
    return {}
  },
  methods: {
  }
}
</script>

<style lang='scss'>
@font-face {
  font-family: Poppins-logo;
  src: url('ttf/Poppins/Poppins-Bold.ttf');
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Poppins-logo;
}

.app {
  width: 100vw;
  height: 100vh;
  font-size: 30px;
  //background: #84C7AE;
}
</style>
