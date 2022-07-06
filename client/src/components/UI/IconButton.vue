<template>
  <button class='iconButton' v-html='iconTag'>
  </button>
</template>

<script>
export default {
  mounted () {
    console.log(this.iconTag)
  },
  name: 'IconButton',
  methods: {
    onClickHandler (event) {
      this.$emit('click', event)
    }
  },
  props: {
    iconTag: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
