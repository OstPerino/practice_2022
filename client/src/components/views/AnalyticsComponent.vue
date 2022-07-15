<template>

  <div class='AnalyticsComponent'>
    <form class='AnalyticsComponent__chooseInterval chooseInterval'>
      <ArrowLeft class='leftArrow' />
      <select class='chooseInterval__select select' @change='onChange'>
        <option value='day' class='select__item'>Day</option>
        <option value='week' class='select__item'>Week</option>
        <option value='month' class='select__item'>Month</option>
      </select>
      <DefaultButtonComponent
        @click.prevent='checkAnalytics'
        button-content='Check analytics'
      />
      <ArrowRight class='rightArrow' />
    </form>
    <div class='AnalyticsComponent__tasks tasks'>
      <div class='tasks__header'>
        <span v-if='!resultQuery.timeInterval'>Today</span>
        <span v-else>{{ this.resultQuery.timeInterval }}</span>
      </div>
      <div class='tasks__wrapper'>
        <div class='day' v-if='optionValue === "day"'>
          <AnalyticTask
            v-for='(item, index) in $store.getters.getCurrentTasks'
            :key='index'
            :task='item'
            :index='index'
          />
        </div>
        <div class='week' v-else-if='optionValue === "week"'>
          <AnalyticTask
            v-for='(item, index) in $store.getters.getWeekTasks'
            :key='index'
            :task='item'
            :index='index'
          />
        </div>
        <div class='month' v-else-if='optionValue === "month"'>
          <AnalyticTask
            v-for='(item, index) in $store.getters.getMonthTasks'
            :key='index'
            :task='item'
            :index='index'
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultButtonComponent from '@/components/UI/DefaultButtonComponent'
import ArrowLeft from '@/components/UI/ArrowLeft'
import ArrowRight from '@/components/UI/ArrowRight'
import AnalyticTask from '@/components/layouts/AnalyticTask'

export default {
  name: 'AnalyticsComponent',
  async beforeMount () {
    const response = await this.$store.dispatch('setAnalyticTasks')
    this.$store.commit('setLocalTasks', response)
    const responseWeek = await fetch('http://localhost:4000/main/stat/0', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        timeClient: -420,
        interval: 'week'
      })
    })
    const resultWeek = await responseWeek.json()
    this.$store.commit('setWeekTasks', resultWeek.tasks)
    const responseMonth = await fetch('http://localhost:4000/main/stat/0', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        timeClient: -420,
        interval: 'month'
      })
    })
    const resultMonth = await responseMonth.json()
    this.$store.commit('setMonthTasks', resultMonth.tasks)
    this.checkTasks()
  },
  components: {
    AnalyticTask,
    DefaultButtonComponent,
    ArrowRight,
    ArrowLeft
  },
  data () {
    return {
      showTasks: false,
      optionValue: 'day',
      resultQuery: {}
    }
  },
  methods: {
    checkTasks () {
      this.showTasks = this.$store.getters.getTasks.length !== 0
    },
    onChange (event) {
      this.optionValue = event.target.value
    },
    async checkAnalytics () {
      // const response = await fetch('http://localhost:4000/main/stat/0', {
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   credentials: 'include',
      //   method: 'POST',
      //   body: JSON.stringify({
      //     timeClient: -420,
      //     interval: this.optionValue
      //   })
      // })
      // this.resultQuery = await response.json()
      // console.log(this.optionValue)
      // if (this.optionValue === 'week') {
      //   this.$store.commit('setWeekTasks', this.resultQuery.tasks)
      // } else if (this.optionValue === 'month') {
      //   this.$store.commit('setMonthTasks', this.resultQuery.tasks)
      // }
    }
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
  }
}
</style>
