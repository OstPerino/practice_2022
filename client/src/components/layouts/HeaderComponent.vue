<template>
  <div class='HeaderComponent'>
    <div class='HeaderComponent__logo'>
      <span class='logo'>TEMP<span class='changeColor'>US.</span></span>
    </div>
    <nav class='HeaderComponent__menu menu'>
      <ul class='menu__list list'>
        <li class='list__item timetracker'>
            <img src='../../assets/images/timetracker.svg'>
          <div class='href'>
            <router-link to='/' class='list__href'>Timetracker</router-link>
          </div>
        </li>
        <li class='list__item settings'>
           <img src='../../assets/images/settings.svg'>
          <div class='href'>
            <router-link to='/analytics' class='list__href'>Analytics</router-link>
          </div>
        </li>
      </ul>
    </nav>
    <div class='HeaderComponent__user user'>
      <div class='user__data data'>
        <span class='data__name'>Alexey</span><br>
        <span class='data__role'>alexey.cj@gmail.com</span>
      </div>
      <div class='user__image'>
        <img src='../../assets/images/profilePicture.png' alt='user picture'>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped lang='scss'>

.HeaderComponent {
  font-size: 10px;
  padding: 35px 0;
  width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  &__logo {
    .logo {
      font-size: 27px;
      color: #000;
      line-height: 71px;

      .changeColor {
        font-family: Poppins-logo;
        color: #FABB18;
      }
    }
  }

  &__menu {
    display: flex;
    align-items: center;
    .list {
      list-style-type: none;
      display: flex;
      font-size: 16px;

      &__item {
        display: flex;
        align-items: center;
        padding: 15px 20px;
        border-radius: 18px;
        margin-right: 30px;
        width: 220px;

        &:last-child {
          margin-right: 0;
        }

        .href {
          margin-left: 20px;
        }
        .list__href {
          text-decoration: none;
          color: #000;
        }
      }

      .timetracker {
        background-color: #000;
        .href a {
          color: #fff;
          font-weight: 600;
        }
      }

      .settings {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }

  &__user {
    display: flex;
    align-items: center;
    .data {
      font-size: 16px;
      margin-right: 36px;

      &__name {
        font-weight: 600;
        line-height: 24px;
      }

      &__role {
        color: #8F8F8F;
        font-weight: 400;
        line-height: 18px;
        font-size: 12px;
      }
    }
  }
}
</style>
