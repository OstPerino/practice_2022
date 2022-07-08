<template>
  <div class='TasksComponent'>
    <div class='TasksComponent__timetracking timetracking'>
      <h1 class='timetracking__header'>Today</h1>
      <span class='timetracking__date'>Mon 22, 2021 | 10:00 AM</span>
      <div class='timetracking__weekResult weekResult'>
        <span class='weekResult__header'>Worked This Week</span>
        <div class='weekResult__timeContainer timeContainer'>
          <span class='timeContainer__time'>40:00:05</span>
          <div class='timeContainer__icon'>
            <img src='../../assets/images/timeLogo.svg'>
          </div>
        </div>
      </div>
    </div>
    <div class='TasksComponent__tasks tasks'>
      <div class='tasks__startTimeTracker startTimeTracker'>
        <LastPlayButton/>
        <div class='startTimeTracker__text'>
          <span class='startTimeTracker__header'>Start Time Tracker</span><br>
          <span class='startTimeTracker__taskName'>Task 1</span>
        </div>
      </div>
      <div class='tasks__tasksList tasksList'>
        <div class='tasksList__tasksHeader tasksHeader'>
          <span class='tasksHeader__left'>
            Tasks
          </span>
          <AddTaskButton
            @click='createTask'
          />
        </div>
        <div class='tasksList__list list'>
          <div class='task-wrapper' v-if='showTasks'>
            <TaskComponent
              v-for='(item, index) in $store.getters.getTasks'
              :key='index'
              :task='item'
              :index='index'
            />
          </div>
          <span class='list__error' v-else>Your task list is empty</span>
        </div>
      </div>
    </div>
    <DialogAddTask
      class='modalWindow'
      v-show='showModal'
      :show-dialog='showModal'
    />
  </div>
</template>

<script>
import AddTaskButton from '@/components/UI/AddTaskButton'
import LastPlayButton from '@/components/UI/LastPlayButton'
import DialogAddTask from '@/components/layouts/DialogAddTask'
import TaskComponent from '@/components/layouts/TaskComponent'

export default {
  async beforeMount () {
    const response = await this.$store.dispatch('getAllTasks')
    this.$store.commit('setTasks', response)
    this.checkTasks()
  },
  mounted () {
    this.checkTasks()
  },
  beforeUpdate () {
    this.checkTasks()
  },
  components: {
    AddTaskButton,
    LastPlayButton,
    DialogAddTask,
    TaskComponent
  },
  name: 'TasksComponent',
  data () {
    return {
      showModal: false,
      showTasks: false
    }
  },
  methods: {
    createTask () {
      this.showModal = !this.showModal
    },
    checkTasks () {
      this.showTasks = this.$store.getters.getTasks.length !== 0
    },
    deleteTask () {
    }
  }
}
</script>

<style scoped lang='scss'>
.TasksComponent {
  width: 1300px;
  margin: 0 auto;
  display: flex;
  position: relative;

  .modalWindow {
    position: absolute;
    top: calc(100vh * 0.5);
    left: calc(100vw * 0.5);
    transform: translate(-50%, -50%);
  }

  &__timetracking {
    width: 590px;
    padding-right: 30px;
  }

  .timetracking {
    &__header {
      font-size: 30px;
      font-weight: 600;
      line-height: 81px;
    }

    &__date {
      font-size: 21px;
      font-weight: 500;
      line-height: 42px;
    }

    &__weekResult {
      margin-top: 50px;
      background-color: #F9F9F9;
      padding: 30px;
      width: 370px;
      border-radius: 16px;

      .timeContainer {
        margin-top: 45px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__time {
          font-weight: 600;
          font-size: 30px;
          line-height: 66px;
        }

        &__icon {
          background-color: rgba(250, 187, 24, 0.1);;
          padding: 30px;
          border-radius: 15px;
        }
      }
    }
    .weekResult {
      &__header {
        font-size: 24px;
      }
    }
  }

  &__tasks {
    background-color: #F9F9F9;
    padding: 20px;
    width: 100%;
    border-radius: 30px;

    .startTimeTracker {
      background-color: #fff;
      padding: 5px 15px;
      display: flex;
      align-items: center;
      border-radius: 20px;

      &__buttonContainer {
        margin-right: 60px;

        .play {
          width: 60px;
          height: 60px;
          background-color: #FABB18;
          border: none;
          text-align: center;
          cursor: pointer;
          border-radius: 15px;
          position: relative;

          .image {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      &__text {
        .startTimeTracker__header {
          font-weight: 600;
          font-size: 22px;
          line-height: 26px;
        }
        .startTimeTracker__taskName {
          font-weight: 500;
          font-size: 22px;
          line-height: 26px;
        }
      }
    }

    .tasksList {
      padding: 30px;
      border-radius: 20px;
      margin-top: 40px;
      background-color: #fff;

      &__tasksHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }

      .tasksHeader {
        &__left {
          font-size: 22px;
        }
        &__addTaskButtonContainer {
          button {
            font-weight: 600;
            font-size: 28px;
            line-height: 42px;
            background-color: transparent;
            border: none;
            color: #FABB18;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
