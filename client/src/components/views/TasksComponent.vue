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
          <AddTaskButton/>
        </div>
        <div class='tasksList__list list'>
          <div class='list__item item'>
            <OnePlayButton/>
            <div class='item__right'>
              <span class='item__taskName'>Project Four</span>
              <div class='item__timer'>
                <span class='timer'>
                  00:30:00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddTaskButton from '@/components/UI/AddTaskButton'
import OnePlayButton from '@/components/UI/OnePlayButton'
import LastPlayButton from '@/components/UI/LastPlayButton'

export default {
  components: {
    AddTaskButton,
    OnePlayButton,
    LastPlayButton
  },
  name: 'TasksComponent'
}
</script>

<style scoped lang='scss'>
.TasksComponent {
  width: 1440px;
  margin: 0 auto;
  display: flex;

  &__timetracking {
    width: 590px;
    padding-right: 50px;
  }

  .timetracking {
    &__header {
      font-size: 54px;
      font-weight: 600;
      line-height: 81px;
    }

    &__date {
      font-size: 28px;
      font-weight: 500;
      line-height: 42px;
    }

    &__weekResult {
      margin-top: 50px;
      background-color: #F9F9F9;
      padding: 30px;
      width: 470px;
      border-radius: 16px;

      .timeContainer {
        margin-top: 45px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__time {
          font-weight: 600;
          font-size: 44px;
          line-height: 66px;
        }

        &__icon {
          background-color: rgba(250, 187, 24, 0.1);;
          padding: 40px;
          border-radius: 15px;
        }
      }
    }
  }

  &__tasks {
    background-color: #F9F9F9;
    padding: 50px;
    width: 100%;
    border-radius: 30px;

    .startTimeTracker {
      background-color: #fff;
      padding: 20px;
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
          font-size: 28px;
          line-height: 42px;
        }
        .startTimeTracker__taskName {
          font-weight: 500;
          font-size: 28px;
          line-height: 42px;
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
        margin-bottom: 30px;
      }

      .tasksHeader {
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

      .list {
        &__item {
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
      }
    }
  }
}
</style>
