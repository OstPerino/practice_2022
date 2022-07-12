<template>
  <div class='modalContainer'>
    <DefaultInputComponent
      placeholder='Task name'
      label-value='Write the task name'
      v-model='taskName'
    />
    <span
      class='modalContainer__error'
      v-show='minLengthCheck'
      >
      The task must have at least 8 characters.
    </span>
    <div class='modalContainer__buttonContainer'>
      <DefaultButtonComponent
        button-content='Create task'
        @click='createTask'
        :isDisabled="minLengthCheck"
      />
    </div>
    <div class='modalContainer__buttonContainer'>
      <DefaultButtonComponent
        button-content='Exit'
        @click='exitDialog'
      />
    </div>
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
      // console.log(this.$v)
      // this.show = !this.show
    }
  }
}
</script>

<style scoped lang='scss'>
.modalContainer {
  padding: 60px 40px;
  // padding: 50px 60px;
  background-color: #F9F9F9;
  border-radius: 30px;
  box-shadow: 2px 2px 10px 1px;

  &__error {
    font-size: 12px;
    color: #F47174;
    // position: relative;
    bottom: 0;
    left: 5px;
  }

  &__buttonContainer {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
