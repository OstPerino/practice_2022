<template>
  <div class='modalContainer'>
    <DefaultInputComponent
      placeholder='Task name'
      label-value='Write the task name'
      v-model='taskName'
    />
    <DefaultButtonComponent
      button-content='Create task'
      @click='createTask'
    />
    <DefaultButtonComponent
      button-content='Exit'
      @click='exitDialog'
    />
  </div>
</template>

<script>
import DefaultInputComponent from '@/components/UI/DefaultInputComponent'
import DefaultButtonComponent from '@/components/UI/DefaultButtonComponent'

export default {
  name: 'DialogAddTask',
  components: {
    DefaultInputComponent,
    DefaultButtonComponent
  },
  props: {
    showDialog: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      taskName: ''
    }
  },
  methods: {
    createTask () {
      const item = {
        name: this.taskName
      }
      this.$store.commit('addTask', item)
      this.taskName = ''
    },
    exitDialog () {
      console.log('Exit dialog')
    }
  }
}
</script>

<style scoped>
.modalContainer {
  padding: 50px 60px;
  background-color: #FABB18;
}
</style>
