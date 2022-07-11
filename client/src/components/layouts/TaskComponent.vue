<template>
  <div class='item' @mouseover='showButtons = true' @mouseleave='showButtons = false'>
    <OnePlayButton />
    <div class='item__right'>
      <span class='item__taskName' v-if='!showEdit'>{{ task.content }}</span>
      <div class='edit' v-else>
        <DefaultInputComponent
          placeholder='Write new task name'
          v-model='taskValue'
        />
        <AcceptEditButton
          @click='acceptEdit'
        />
        <IconButton>
          <font-awesome-icon icon='fa-solid fa-check' class='icon'/>
        </IconButton>
      </div>
      <div class='item__timer'>
        <span class='timer'>
          00:00:00
        </span>
      </div>
  </div>
    <transition name="slide-fade">
      <div class='taskButtons' v-show='showButtons'>
        <EditTaskButton @click='editTask' class='taskButtons__item'/>
        <DeleteTaskButton @click='deleteTask' class='taskButton__item'/>
      </div>
    </transition>
  </div>
</template>

<script>
import OnePlayButton from '@/components/UI/OnePlayButton'
import DeleteTaskButton from '@/components/UI/DeleteTaskButton'
import EditTaskButton from '@/components/UI/EditTaskButton'
import DefaultInputComponent from '@/components/UI/DefaultInputComponent'
import AcceptEditButton from '@/components/UI/AcceptEditButton'
import IconButton from '@/components/UI/IconButton'
// import IconButton from '@/components/UI/IconButton'

export default {
  components: {
    IconButton,
    AcceptEditButton,
    DefaultInputComponent,
    OnePlayButton,
    DeleteTaskButton,
    EditTaskButton
  },
  name: 'TaskComponent',
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
      showEdit: false,
      showButtons: false
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
    }
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

    .edit {
      display: flex;
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
  .slide-fade-enter-active {
    transition: all .6s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
