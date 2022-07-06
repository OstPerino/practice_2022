<template>
  <div class='EditTaskButtonContainer'>
    <button class='EditTaskButtonContainer__button' @click='onClickHandler'>
      <font-awesome-icon icon='fa-solid fa-pen' class='icon' />
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

<style scoped lang='scss'>
.EditTaskButtonContainer {
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
