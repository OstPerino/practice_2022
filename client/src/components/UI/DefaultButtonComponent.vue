<template>
  <div class="DefaultButtonComponent">
    <button
      class="DefaultButtonComponent__button"
      @click="onClickHandler"
    >
      {{ this.buttonContent }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'default-input-component.vue',
  props: {
    buttonContent: {
      type: String,
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

<style scoped lang="scss">

</style>
