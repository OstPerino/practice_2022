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
.DefaultButtonComponent {
  &__button {
    background-color: #84C7AE;
    padding: 15px 45px;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    border-radius: 30px;
  }
}
</style>
