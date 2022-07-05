<template>
  <div class='EditTaskButtonContainer'>
    <button class='EditTaskButtonContainer__button' @click='onClickHandler'>
      Edit
    </button>
  </div>
</template>

<script>
export default {
  name: 'EditTaskButton',
  methods: {
    onClickHandler (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped>

</style>
