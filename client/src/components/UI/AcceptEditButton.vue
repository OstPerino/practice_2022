<template>
  <div class='AcceptTaskButtonContainer'>
    <button class='AcceptTaskButtonContainer__button' @click='onClickHandler'>
      <font-awesome-icon icon='fa-solid fa-check' class='icon' />
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

<style scoped lang='scss'>
.AcceptTaskButtonContainer {
  &__button {
    cursor: pointer;
    border: none;
    background-color: transparent;
  }

  .icon {
    color: #FABB18;
    height: 15px;
    width: 15px;
  }
}
</style>
