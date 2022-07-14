<template>
  <span>{{ time }}</span>
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
      // nHour: Math.trunc(this.value / 3600),
      // nMinute: Math.trunc(this.value % 3600 / 60),
      // nSecond: this.value % 3600 % 60
    }
  },
  computed: {
    time: function (nHour, nMinute, nSecond) {
      if (this.value !== undefined) {
        nHour = Math.trunc(this.value / 3600)
        nMinute = Math.trunc(this.value % 3600 / 60)
        nSecond = this.value % 3600 % 60
      } else {
        nHour = 0
        nMinute = 0
        nSecond = 0
      }
      return this.numToStr(nHour) + ':' + this.numToStr(nMinute) + ':' + this.numToStr(nSecond)
    }
  },
  methods: {
    numToStr (value) {
      return (value < 10) ? '0' + String(value) : String(value)
    }
  }
}
</script>

<style scoped>

</style>
