<template>
  <div class='item'>
    <OnePlayButton
      v-if='!taskPlaying'
      @click.prevent='startTask'
    />
    <LastPlayButton
      v-else
      @click='stopTask'
    />
    <div class='item__right'>
      <span class='item__taskName' v-if='!showEdit'>{{ task.content }}</span>
      <div class='edit' v-else>
        <DefaultInputComponent
          label-value='Edit task name'
          placeholder='Write new task name'
          v-model='taskValue'
        />
        <AcceptEditButton
          @click='acceptEdit'
        />
      </div>
      <div class='item__timer'>
        <TimerComponent
          class='timer'
          :value='taskTimer'
        />
      </div>
    </div>
    <EditTaskButton @click='editTask' />
    <DeleteTaskButton @click='deleteTask' />
  </div>
</template>

<script>
import OnePlayButton from '@/components/UI/OnePlayButton'
import DeleteTaskButton from '@/components/UI/DeleteTaskButton'
import EditTaskButton from '@/components/UI/EditTaskButton'
import DefaultInputComponent from '@/components/UI/DefaultInputComponent'
import AcceptEditButton from '@/components/UI/AcceptEditButton'
import TimerComponent from '@/components/UI/TimerComponent'
import LastPlayButton from '@/components/UI/LastPlayButton'

export default {
  components: {
    LastPlayButton,
    TimerComponent,
    AcceptEditButton,
    DefaultInputComponent,
    OnePlayButton,
    DeleteTaskButton,
    EditTaskButton
  },
  name: 'TaskComponent',
  interval: null,
  props: {
    task: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      taskValue: this.task.content,
      taskTimer: this.task.time,
      taskPlaying: this.task.status,
      showEdit: false
    }
  },
  methods: {
    deleteTask () {
      this.$store.commit('deleteTask', this.index)
      this.$store.dispatch('deleteTask', this.task)
    },
    editTask () {
      this.showEdit = !this.showEdit
    },
    acceptEdit () {
      this.$store.commit('changeTask', { task: this.task, content: this.taskValue })
      this.$store.dispatch('editTask', { task: this.task, content: this.taskValue })
      this.showEdit = !this.showEdit
    },
    startTask () {
      console.log('start')
      this.taskPlaying = true
      this.$store.getters.getTasks.forEach((item) => {

      })
      this.$store.commit('startTask', this.task)
      this.$store.dispatch('startTaskTimer', this.task)
    },
    stopTask () {
      console.log('stop')
      this.taskPlaying = false
      this.$store.commit('stopTask', this.task)
      this.$store.dispatch('stopTaskTimer', this.task)
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      if (this.taskPlaying) {
        this.taskTimer += 1
      }
    }, 1000)
  }
}
</script>

<style scoped lang='scss'>
.item {
  display: flex;
  align-items: center;
  border: 1px solid #F1F1F1;
  border-radius: 20px;
  padding: 15px;

  .item__right {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .item__taskName {
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;
    }

    .item__timer {
      .timer {
        font-size: 14px;
        font-weight: 400;
        background-color: #FFF8E8;
        border-radius: 10px;
        padding: 10px 15px;
      }
    }
  }
}
</style>
