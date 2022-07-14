<template>
  <v-app
    id='app'
    class='app'
  >
    <div class='up-container'>
      <HeaderComponent v-show='$route.name !== "Authorization" && $route.name !== "Registration"'/>
      <router-view class='views'></router-view>
    </div>
    <FooterComponent v-show='$route.name !== "Authorization" && $route.name !== "Registration"'/>
  </div>
    <HeaderComponent v-show='$route.name !== "Authorization" && $route.name !== "Registration"'/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import HeaderComponent from '@/components/layouts/HeaderComponent'
import FooterComponent from '@/components/layouts/FooterComponent'

export default {
  components: {
    HeaderComponent,
    FooterComponent
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //background: #84C7AE;
}
</style>
