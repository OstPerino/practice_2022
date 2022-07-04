<template>
  <div class='item'>
    <OnePlayButton/>
    <div class='item__right'>
      <span class='item__taskName'>{{task.name}}</span>
      <div class='item__timer'>
        <span class='timer'>
          00:00:00
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import OnePlayButton from '@/components/UI/OnePlayButton'

export default {
  components: {
    OnePlayButton
  },
  name: 'TaskComponent',
  props: {
    task: {
      type: String,
      required: true
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
