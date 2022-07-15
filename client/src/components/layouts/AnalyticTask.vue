<template>
  <div class='item'>
    <div class='item__right'>
      <span class='item__taskName'>{{ task.content }}</span>
      <div class='item__timer'>
        <TimerComponent
          class='timer'
          :value='taskTimer'
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex'

import OnePlayButton from '@/components/UI/OnePlayButton'
import DeleteTaskButton from '@/components/UI/DeleteTaskButton'
import EditTaskButton from '@/components/UI/EditTaskButton'
import DefaultInputComponent from '@/components/UI/DefaultInputComponent'
import AcceptEditButton from '@/components/UI/AcceptEditButton'
import IconButton from '@/components/UI/IconButton'
import TimerComponent from '@/components/UI/TimerComponent'

export default {
  components: {
    IconButton,
    AcceptEditButton,
    DefaultInputComponent,
    OnePlayButton,
    DeleteTaskButton,
    EditTaskButton,
    TimerComponent
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
      showEdit: false,
      showButtons: false,
    }
  },
  methods: {
    ...mapActions([
      'createNewTask',
      'deleteTask',
      'startTaskTimer',
      'stopTaskTimer'
    ]),
    editTask () {
      this.showEdit = !this.showEdit
    },
    acceptEdit () {
      this.$store.dispatch('editTask', { task: this.task, content: this.taskValue })
      this.showEdit = !this.showEdit
    }
  },
  beforeMount () {
    // TODO: запуск интервала по условию
    this.interval = setInterval(() => {
      if (this.task.status) {
        this.taskTimer += 1
      }
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
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
  background-color: #fff;

  .item__right {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .edit {
      display: flex;
      align-items: center;
    }

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
  .taskButtons {
    display: flex;
    &__item {
      margin-right: 10px;
      &:first-child {
        margin-left: 10px;
      }
    }
  }
}
</style>
