<template>
  <button
    class='ArrowButton'
    @click.prevent='onClickHandler'
  >
    <font-awesome-icon icon="fa-solid fa-arrow-left-long" class='icon' />
  </button>
</template>

<script>
export default {
  name: 'ArrowLeft',
  methods: {
    onClickHandler (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped lang='scss'>
.ArrowButton {
  border: 4px solid black;
  padding: 15px;
  cursor: pointer;
  border-radius: 50%;
  background-color: transparent;
  .icon {
    width: 25px;
    height: 25px;
  }
}
</style>
