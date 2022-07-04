<template>
  <div class='addTaskButtonContainer'>
    <button class='addTaskButtonContainer__addButton'>
      + Add Tasks
    </button>
  </div>
</template>

<script>
export default {
  name: 'AddTaskButon'
}
</script>

<style scoped lang='scss'>
.addTaskButtonContainer {
  &__addButton {
    font-weight: 600;
    font-size: 28px;
    line-height: 42px;
    background-color: transparent;
    border: none;
    color: #FABB18;
    cursor: pointer;
  }
}
</style>
