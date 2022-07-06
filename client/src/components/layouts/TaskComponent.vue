<template>
  <div class='item'>
    <OnePlayButton />
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
        <span class='timer'>
          00:00:00
        </span>
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

export default {
  components: {
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
