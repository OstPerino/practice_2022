<template>
  <div
    id='app'
    class='app'
  >
    <HeaderComponent/>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComponent from '@/components/views/HeaderComponent'

export default {
  components: {
    HeaderComponent
  },
  data: () => {
    return {}
  },
  methods: {}
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
