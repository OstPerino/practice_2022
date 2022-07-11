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
    // title: {
    //   type: String,
    //   required: true
    // },
    // timer: {
    //   type: String,
    //   required: true
    // }
  },
  // data () {
  //   return {
  //     taskTitle: this.task.titl
  //   }
  // }
  methods: {

  }
}
</script>

<style scoped lang='scss'>

</style>
