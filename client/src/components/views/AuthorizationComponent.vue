<template>
  <div class='flex-container'>
    <form class='AuthorizationComponent'>
      <div class='AuthorizationComponent__container logoContainer'>
        <span class='logo'>TEMP<span class='changeColor'>US</span></span>
      </div>
      <h2 class='AuthorizationComponent__header'>Authorization</h2>
      <div class='AuthorizationComponent__container'>
        <DefaultInputComponent
          class='AuthorizationComponent__item'
          :placeholder='inputData.userLoginInput.placeholderContent'
          :label-value='inputData.userLoginInput.labelContent'
          v-model.trim='$v.inputData.userLoginInput.value.$model'
        />
        <span
          class='AuthorizationComponent__error'
          v-show='!$v.inputData.userLoginInput.value.required && $v.inputData.userLoginInput.value.$dirty'
        >
        Field is required.
      </span>
        <span
          class='AuthorizationComponent__error'
          v-show='!$v.inputData.userLoginInput.value.minLength'
        >
       Check if login is correct.
      </span>
      </div>
      <div class='AuthorizationComponent__container'>
        <DefaultInputComponent
          class='AuthorizationComponent__item'
          :placeholder='this.inputData.userPasswordInput.placeholderContent'
          :label-value='this.inputData.userPasswordInput.labelContent'
          v-model.trim='$v.inputData.userPasswordInput.value.$model'
          :isPassword='isPassword'
        />
        <span
          class='AuthorizationComponent__error'
          v-show='!$v.inputData.userPasswordInput.value.required && $v.inputData.userPasswordInput.value.$dirty'
        >
            Field is required.
        </span>
      </div>
      <div class='AuthorizationComponent__container wrong' v-if='showError'>
          <span
            class='AuthorizationComponent__error missedUser'
          >
            Email or password is wrong
          </span>
      </div>
      <DefaultButtonComponent
        class='AuthorizationComponent__button '
        :button-content='this.buttonData.buttonContent'
        @click.prevent='checkUser'
      />
      <div class='AuthorizationComponent__registrationHref registrationHref'>
      <span
        class='registrationHref__link'
      >
        Doesn't have an account?
      </span>
        <br>
        <router-link
          to='/registration'
          class='registrationHref__link link'
        >
          Registration
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import DefaultInputComponent from '@/components/UI/DefaultInputComponent'
import DefaultButtonComponent from '@/components/UI/DefaultButtonComponent'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'authorization-component.vue',
  updated () {
    this.disableButton = this.$v.$anyError
  },
  async beforeCreate () {
    // TODO: mixin
    const response = await fetch('http://localhost:4000/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'GET'
    })
    if (response.ok) {
      await this.$router.push('/')
    }
  },
  components: {
    DefaultButtonComponent,
    DefaultInputComponent
  },
  validations: {
    inputData: {
      userEmailInput: {
        value: { required, email }
      },
      userPasswordInput: {
        value: { required }
      },
      userLoginInput: {
        value: { required, minLength: minLength(8) }
      }
    }
  },
  data: () => {
    return {
      inputData: {
        userEmailInput: {
          labelContent: 'Email',
          placeholderContent: 'Type your email',
          value: ''
        },
        userPasswordInput: {
          labelContent: 'Password',
          placeholderContent: 'Type your password',
          value: ''
        },
        userLoginInput: {
          labelContent: 'User login',
          placeholderContent: 'Type your login',
          value: ''
        }
      },
      buttonData: {
        buttonContent: 'Log In'
      },
      showError: false,
      isPassword: 'password',
      disableButton: true
    }
  },
  methods: {
    async checkUser () {
      const userData = {
        login: this.inputData.userLoginInput.value,
        password: this.inputData.userPasswordInput.value
      }
      const checkUser = await fetch('http://localhost:4000/login',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(userData)
        })

      if (checkUser.status === 200) {
        // if (!this.showError) {
        //   this.showError = !this.showError
        // }
        await this.$router.push('/')
      } else {
        this.showError = true
        await this.$router.push('/Authorization')
      }
    }
  }
}
</script>

<style scoped lang='scss'>

.flex-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.AuthorizationComponent {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #F9F9F9;
  border-radius: 10px;
  padding: 30px 60px;

  &__container {
    padding: 0 15px 15px 0;
    position: relative;
  }

  .logoContainer {
    text-align: center;

    .logo {
      font-size: 37px;
      color: #000;
      line-height: 71px;

      .changeColor {
        color: #FABB18;
      }
    }
  }

  &__header {
    font-size: 30px;
    color: #212B27;
    text-align: center;
    margin-bottom: 15px;
  }

  &__mark {
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
    color: #32403B;
  }

  &__button {
    text-align: center;
    margin-top: 20px;
  }

  &__error {
    font-size: 12px;
    color: #F47174;
    position: absolute;
    bottom: -3px;
    left: 5px;
  }

  .wrong {
    margin-top: 25px;
  }

  .missedUser {
    font-size: 16px;
    text-align: center;
  }

  .registrationHref {
    text-align: center;
    line-height: 20px;

    &__link {
      font-size: 14px;
      line-height: 16px;
    }

    .link {
      color: #FABB18;
      text-decoration: none;
    }
  }
}
</style>
