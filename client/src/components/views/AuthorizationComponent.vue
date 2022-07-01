<template>
    <div class="flex-container">
      <form class="AuthorizationComponent">
        <h2 class="AuthorizationComponent__header">Authorization</h2>
        <div class="AuthorizationComponent__container">
          <DefaultInputComponent
            class="AuthorizationComponent__item"
            :placeholder="inputData.userLoginInput.placeholderContent"
            :label-value="inputData.userLoginInput.labelContent"
            v-model.trim="$v.inputData.userLoginInput.value.$model"
          />
          <span
            class="AuthorizationComponent__error"
            v-show="!$v.inputData.userLoginInput.value.required && $v.inputData.userLoginInput.value.$dirty"
          >
        Field is required.
      </span>
          <span
            class="AuthorizationComponent__error"
            v-show="!$v.inputData.userLoginInput.value.minLength"
          >
       Check if login is correct.
      </span>
        </div>
        <div class="AuthorizationComponent__container">
          <DefaultInputComponent
            class="AuthorizationComponent__item"
            :placeholder="this.inputData.userPasswordInput.placeholderContent"
            :label-value="this.inputData.userPasswordInput.labelContent"
            v-model.trim="$v.inputData.userPasswordInput.value.$model"
          />
          <span
            class="AuthorizationComponent__error"
            v-show="!$v.inputData.userPasswordInput.value.required && $v.inputData.userPasswordInput.value.$dirty"
          >
        Field is required.
      </span>
        </div>
        <div class="AuthorizationComponent__container">
      <span
        class="AuthorizationComponent__error missedUser"
      >
        Email or password is wrong
      </span>
        </div>
        <DefaultButtonComponent
          class="AuthorizationComponent__button "
          :button-content="this.buttonData.buttonContent"
          @click.prevent="checkUser"
        />
        <div class="AuthorizationComponent__registrationHref registrationHref">
      <span
        class="registrationHref__link"
      >
        Doesn't have an account?
      </span>
          <br>
          <router-link
            to="/registration"
            class="registrationHref__link link"
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
      }
    }
  },
  methods: {
    async checkUser () {
      const userData = {
        login: this.inputData.userLoginInput.value,
        password: this.inputData.userPasswordInput.value
      }
      const response = await fetch('http://localhost:4000/login',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(userData)
        })

      if (response.status === 200) {
        await this.$router.push('/main')
      }
    }
  }
}
</script>

<style scoped lang="scss">

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
  background-color: #F6FBF9;
  border-radius: 10px;
  padding: 60px 80px;

  &__container {
    padding: 0 15px 15px 0;
    position: relative;
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
    bottom: 0;
    left: 5px;
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
      color: #48927c;
      text-decoration: none;
    }
  }
}
</style>
