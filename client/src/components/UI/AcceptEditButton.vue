<template>
  <div class='AcceptTaskButton'>
    <button class='AcceptTaskButton__button' @click='onClickHandler'>
      Accept
    </button>
  </div>
</template>

<script>
export default {
  name: 'AcceptEditButton',
  methods: {
    onClickHandler (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped>

</style>
