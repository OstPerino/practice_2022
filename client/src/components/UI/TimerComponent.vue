<template>
  <span>{{ this.newTimer }}</span>
</template>

<script>
export default {
  name: 'TimerComponent',
  interval: null,
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      nHour: Number(this.value.slice(0, 2)),
      nMinute: Number(this.value.slice(3, 5)),
      nSecond: Number(this.value.slice(6, 8)),
      newTimer: ''
    }
  },
  methods: {
    time () {
      this.interval = setInterval(() => {
        if (this.nSecond === 59 && this.nMinute !== 59) {
          this.nSecond = 0
          this.nMinute += 1
        } else if (this.nMinute === 59 && this.nSecond === 59) {
          this.nSecond = 0
          this.nMinute = 0
          this.nHour += 1
        } else {
          this.nSecond += 1
        }
        this.newTimer = this.numToStr(this.nHour) + ':' + this.numToStr(this.nMinute) + ':' + this.numToStr(this.nSecond)
      }, 1000)
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
