<template>
  <div class='FooterComponent'>
    <div class='FooterComponent__container'>
      <div class='columns'>
        <div class='reserved'>
          <span class='reserved__span'>© 2022 BAUART practice. All Rights Reserved.</span>
        </div>
        <div class='brands'>
          <div class='vk brands__item'>
            <a class='href' href='#'><font-awesome-icon icon="fa-brands fa-vk" class='icon' /></a>
          </div>
          <div class='tg brands__item'>
            <a class='href' href='#'><font-awesome-icon icon="fa-brands fa-telegram" class='icon' /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped lang='scss'>
.FooterComponent {
  background-color: #F9F9F9;
  color: #000;
  padding: 30px 0;
  &__container {
    width: 1300px;
    margin: 0 auto;
    .columns {
      display: flex;
      justify-content: space-between;
      .reserved {
        &__span {
          font-size: 20px;
        }
      }
      .brands {
        display: flex;
        justify-content: space-between;
        &__item {
          .href {
            text-decoration: none;
          }
        }
        .vk {
          .icon {
            width: 30px;
            height: 30px;
            color: #000;
          }
        }
        .tg {
          .icon {
            width: 30px;
            height: 30px;
            margin-left: 40px;
            color: #000;
          }
        }
      }
    }
  }
}
</style>
