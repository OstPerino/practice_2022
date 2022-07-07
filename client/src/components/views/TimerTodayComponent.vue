<template>
  <div class='todayTasks__timeContainer timeContainer'>
    <div class='taskContainer'>
      <div class='timeTracking__header'>{{ this.title }}</div>
      <TimerComponent
        class='timeContainer__time'
        :value=timer
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
    title: {
      type: String,
      required: true
    },
    timer: {
      type: String,
      required: true
    }
  },
  methods: {

  }
}
</script>

<style scoped lang='scss'>
//.timeTracking {
//  &__header {
//    font-size: 28px;
//    font-weight: 500;
//    line-height: 42px;
//  }
//
//  &__date {
//    font-size: 28px;
//    font-weight: 500;
//    line-height: 42px;
//  }
//
//  &__todayTasks {
//    margin-top: 30px;
//    background-color: #F9F9F9;
//    padding: 30px;
//    width: 470px;
//    border-radius: 16px;
//    list-style-type: none;
//
//    .timeContainer {
//      margin-top: 0px;
//      display: flex;
//      align-items: center;
//      justify-content: space-between;
//
//      &__taskContainer {
//
//      }
//
//      &__time {
//        font-weight: 600;
//        font-size: 30px;
//        line-height: 45px;
//      }
//
//      &__icon {
//        background-color: rgba(250, 187, 24, 0.1);;
//        padding: 40px;
//        border-radius: 15px;
//      }
//    }
//  }
//}
</style>
