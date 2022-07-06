<template>
  <div class='DeleteTaskButton'>
    <button class='DeleteTaskButton__button' @click='onClickHandler'>
      Delete
    </button>
  </div>
</template>

<script>
export default {
  name: 'DeleteTaskButton',
  methods: {
    onClickHandler (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped>

</style>
