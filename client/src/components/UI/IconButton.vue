<template>
  <button class='iconButton' v-html='iconTag'>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'IconButton',
  methods: {
    onClickHandler (event) {
      this.$emit('click', event)
    }
  },
  props: {
    iconTag: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
