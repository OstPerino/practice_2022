<template>
  <span>{{ this.newTimer }}</span>
</template>

<script>
export default {
  name: 'TimerComponent',
  interval: null,
  props: {
    value: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      nHour: Math.trunc(this.value / 3600),
      nMinute: Math.trunc(this.value % 3600 / 60),
      nSecond: this.value % 3600 % 60,
      newTimer: ''
    }
  },
  methods: {
    // TODO: Вынести в computed преобразованное значение таймера
    time () {
      if (this.value !== undefined) {
        this.interval = setInterval(() => {
          this.nHour = Math.trunc(this.value / 3600)
          this.nMinute = Math.trunc(this.value % 3600 / 60)
          this.nSecond = this.value % 3600 % 60
          this.newTimer = this.numToStr(this.nHour) + ':' + this.numToStr(this.nMinute) + ':' + this.numToStr(this.nSecond)
        }, 1000)
      } else {
        this.nHour = 0
        this.nMinute = 0
        this.nSecond = 0
        this.newTimer = this.numToStr(this.nHour) + ':' + this.numToStr(this.nMinute) + ':' + this.numToStr(this.nSecond)
      }
    },
    numToStr (value) {
      return (value < 10) ? '0' + String(value) : String(value)
    }
  },
  mounted () {
    this.time()
  }
}
</script>

<style scoped>

</style>
