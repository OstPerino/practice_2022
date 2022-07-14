<template>

  <div class='AnalyticsComponent'>
    <form class='AnalyticsComponent__chooseInterval chooseInterval'>
      <ArrowLeft class='leftArrow'/>
      <select class='chooseInterval__select select'>
        <option value='day' class='select__item'>Day</option>
        <option value='week' class='select__item'>Week</option>
        <option value='month' class='select__item'>Month</option>
      </select>
      <DefaultButtonComponent
        @click.prevent=''
        button-content='Check analytics'
      />
      <ArrowRight class='rightArrow'/>
    <form class='AnalyticsComponent__chooseInterval'>
      <v-btn
        class="mx-2"
        fab
        dark
        large
        color="cyan"
      >
        asd
      </v-btn>
    </form>
    <div class='AnalyticsComponent__tasks tasks'>
      <div class='tasks__header'>
        Sun May 01 2022 18:00:00 - Sun May 08 2022 18:00:00
      </div>
      <div class='tasks__wrapper'>
        <TaskComponent
          v-for='(item, index) in $store.getters.getTasks'
          :key='index'
          :task='item'
          :index='index'
        />
      </div>
    </div>
  </div>
</template>

<script>
import DefaultButtonComponent from '@/components/UI/DefaultButtonComponent'
import ArrowLeft from '@/components/UI/ArrowLeft'
import ArrowRight from '@/components/UI/ArrowRight'
import TaskComponent from '@/components/layouts/TaskComponent'

export default {
  name: 'AnalyticsComponent',
  components: {
    TaskComponent,
    DefaultButtonComponent,
    ArrowRight,
    ArrowLeft
  }
}
</script>

<style scoped lang='scss'>
.AnalyticsComponent {
  width: 1300px;
  margin: 0 auto;
  &__chooseInterval {
    padding: 10px;
    border-radius: 16px;
    background-color: #F9F9F9;
  }

  .chooseInterval {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    &__select {
      font-size: 20px;
      line-height: 20px;
      border-radius: 8px;
      padding: 10px 70px 10px 5px;
      background-color: #000;
      color: #fff;
      margin-right: 40px;
    }
    .rightArrow {
      margin-left: 40px;
    }
    .leftArrow {
      margin-right: 45px;
    }
  }
  .tasks {
    padding: 30px;
    background-color: #F9F9F9;
    border-radius: 16px;
    &__header {
      background-color: #fff;
      margin-bottom: 10px;
      padding: 20px;
      border-radius: 16px;
      text-align: center;
    }
  &__chooseInterval {
  }
}
</style>
