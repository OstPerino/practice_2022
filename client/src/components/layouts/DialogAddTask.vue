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
      :isDisabled='false'
    />
  </div>
</template>

<script>
import DefaultInputComponent from '@/components/UI/DefaultInputComponent'
import DefaultButtonComponent from '@/components/UI/DefaultButtonComponent'
import { minLength } from 'vuelidate/lib/validators'

export default {
  name: 'DialogAddTask',
  components: {
    DefaultInputComponent,
    DefaultButtonComponent
  },
  computed: {
    minLengthCheck () {
      return this.taskName.length < 8
    }
  },
  validations: {
    taskName: {
      minLength: minLength(8)
    }
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
        content: this.taskName
      }
      this.$store.commit('addTask', item)
      this.taskName = ''
      this.$store.dispatch('createNewTask', item)
    },
    exitDialog () {
      console.log(this.$v)
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
