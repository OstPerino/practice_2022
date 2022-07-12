<template>
  <div class='buttonContainer'>
    <button
      class='buttonContainer__play'
      @click='onClickHandler'
    >
      <img
        v-if='buttonType'
        class='play__content'
        src='../../assets/images/orangePlay.svg'
      >
      <img
        v-else
        class='play__content'
        src='../../assets/images/play.svg'
      >
    </button>
  </div>
</template>

<script>
export default {
  name: 'OnePlayButton',
  props: {
    buttonType: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onClickHandler (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped lang='scss'>
.buttonContainer {
  margin-right: 30px;
  &__play {
    cursor: pointer;
    padding: 30px;
    border: none;
    background-color: rgba(250, 187, 24, 0.1);
    border-radius: 50%;
    position: relative;

    img {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
