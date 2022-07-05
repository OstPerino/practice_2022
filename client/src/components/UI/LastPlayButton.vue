<template>
  <div class='startTimeTrackerContainer'>
    <button
      class='startTimeTrackerContainer__play'
      @click='onClickHandler'
    >
      <img
        src='../../assets/images/play.svg'
        class='image'
      >
    </button>
  </div>
</template>

<script>
export default {
  name: 'LastPlayButton.vue',
  methods: {
    onClickHandler (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped lang='scss'>
.startTimeTrackerContainer {
  margin-right: 60px;

  &__play {
    width: 60px;
    height: 60px;
    background-color: #FABB18;
    border: none;
    text-align: center;
    cursor: pointer;
    border-radius: 15px;
    position: relative;

    .image {
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
