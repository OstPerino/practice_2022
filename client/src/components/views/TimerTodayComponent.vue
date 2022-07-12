<template>
  <div class='todayTasks__timeContainer timeContainer'>
    <div class='taskContainer'>
      <div class='timeTracking__header'>{{ task.content }}</div>
      <TimerComponent
        class='timeContainer__time'
        :value='task.time'
        />
    </div>
    <div class='timeContainer__icon'>
      <img src='../../assets/images/timeLogo.svg'>
    </div>
  </div>
</template>

<script>
import TimerComponent from '@/components/UI/TimerComponent'
export default {
  name: 'TimerTodayComponent',
  components: {
    TimerComponent
  },
  props: {
    task: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
