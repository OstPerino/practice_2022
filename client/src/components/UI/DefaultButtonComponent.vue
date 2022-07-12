<template>
<!--  <div class="DefaultButtonComponent">-->
  <button
    class="DefaultButtonComponent__button"
    @click="onClickHandler"
    :disabled='isDisabled'
  >
    {{ this.buttonContent }}
  </button>
<!--  </div>-->
</template>

<script>
export default {
  name: 'default-input-component.vue',
  props: {
    buttonContent: {
      type: String,
      required: true
    },
    isDisabled: Boolean
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
    background-color: #FABB18;
    padding: 15px 45px;
    border: none;
    color: #000;
    font-size: 20px;
    cursor: pointer;
    border-radius: 30px;
  }

  &__button:hover {
    filter: brightness(105%);
  }
}
</style>
