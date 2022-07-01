<template>
  <div class="container">
    <div class="flex-container">
      <form class="RegistrationComponent">
        <h2
          class="RegistrationComponent__header"
        >
          Create an account
        </h2>
        <span class="RegistrationComponent__mark">Create an account to<br>get access for all functions</span>
        <div class="RegistrationComponent__container">
          <DefaultInputComponent
            class="RegistrationComponent__item"
            :placeholder="inputData.userNameInput.placeholderContent"
            :label-value="inputData.userNameInput.labelContent"
            v-model.trim="$v.inputData.userNameInput.value.$model"
          />
          <span
            class="RegistrationComponent__error"
            v-show="!$v.inputData.userNameInput.value.required && $v.inputData.userNameInput.value.$dirty"
          >
        Field is required.
      </span>
        </div>
        <div class="RegistrationComponent__container">
          <DefaultInputComponent
            class="RegistrationComponent__item"
            :placeholder="inputData.userLoginInput.placeholderContent"
            :label-value="inputData.userLoginInput.labelContent"
            v-model.trim="$v.inputData.userLoginInput.value.$model"
          />
          <span
            class="RegistrationComponent__error"
            v-show="!$v.inputData.userLoginInput.value.required && $v.inputData.userLoginInput.value.$dirty"
          >
        Field is required.
      </span>
          <span
            class="RegistrationComponent__error"
            v-show="!$v.inputData.userLoginInput.value.minLength"
          >
        Field must have at least {{ $v.inputData.userLoginInput.value.$params.minLength.min }} characters.
      </span>
        </div>
        <div class="RegistrationComponent__container">
          <DefaultInputComponent
            class="RegistrationComponent__item"
            :placeholder="inputData.userEmailInput.placeholderContent"
            :label-value="inputData.userEmailInput.labelContent"
            v-model.trim="$v.inputData.userEmailInput.value.$model"
          />
          <span
            class="RegistrationComponent__error"
            v-show="!$v.inputData.userEmailInput.value.required && $v.inputData.userEmailInput.value.$dirty"
          >
        Field is required.
      </span>
          <span
            class="RegistrationComponent__error"
            v-show="!$v.inputData.userEmailInput.value.email"
          >
        Field must look like an email.
      </span>
        </div>
        <div class="RegistrationComponent__container">
          <DefaultInputComponent
            class="RegistrationComponent__item"
            :placeholder="inputData.userPasswordInput.placeholderContent"
            :label-value="inputData.userPasswordInput.labelContent"
            v-model.trim="$v.inputData.userPasswordInput.value.$model"
          />
          <span
            class="RegistrationComponent__error"
            v-show="!$v.inputData.userPasswordInput.value.required && $v.inputData.userPasswordInput.value.$dirty"
          >
        Field is required.
      </span>
          <span
            class="RegistrationComponent__error"
            v-show="!$v.inputData.userPasswordInput.value.minLength"
          >
        Field must have at least {{ $v.inputData.userPasswordInput.value.$params.minLength.min }} characters.
      </span>
        </div>
        <div class="RegistrationComponent__container">
          <DefaultInputComponent
            class="RegistrationComponent__item"
            :placeholder="inputData.confirmPasswordInput.placeholderContent"
            :label-value="inputData.confirmPasswordInput.labelContent"
            v-model.trim="$v.inputData.confirmPasswordInput.value.$model"
          />
          <span
            class="RegistrationComponent__error"
            v-show="!$v.inputData.confirmPasswordInput.value.required && $v.inputData.confirmPasswordInput.value.$dirty"
          >
        Field is required.
      </span>
          <span
            class="RegistrationComponent__error"
            v-show="!$v.inputData.confirmPasswordInput.value.sameAs"
          >
        Field must be the same as password field.
      </span>
        </div>
        <DefaultButtonComponent
          class="RegistrationComponent__button"
          :button-content="buttonData.buttonContent"
          @click.prevent="createUser"
        />
        <div class="RegistrationComponent__registrationHref registrationHref">
      <span
        class="registrationHref__link"
      >
        Already have an account?
      </span>
          <br>
          <router-link
            to="/authorization"
            class="registrationHref__link link"
          >
            Authorization
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { email, required, minLength, sameAs } from 'vuelidate/lib/validators'
import DefaultInputComponent from '@/components/UI/DefaultInputComponent'
import DefaultButtonComponent from '@/components/UI/DefaultButtonComponent'

export default {
  name: 'registration-component.vue',
  components: {
    DefaultInputComponent,
    DefaultButtonComponent
  },
  validations: {
    inputData: {
      userNameInput: {
        value: { required }
      },
      userEmailInput: {
        value: { required, email }
      },
      userLoginInput: {
        value: { required, minLength: minLength(8) }
      },
      userPasswordInput: {
        value: { required, minLength: minLength(8) }
      },
      confirmPasswordInput: {
        value: { required, sameAs }
      }
    }
  },
  data () {
    return {
      inputData: {
        userNameInput: {
          labelContent: 'User name',
          placeholderContent: 'Type your name',
          value: ''
        },
        userEmailInput: {
          labelContent: 'Email',
          placeholderContent: 'Type your email',
          value: ''
        },
        userLoginInput: {
          labelContent: 'Login',
          placeholderContent: 'Type your login',
          value: ''
        },
        userPasswordInput: {
          labelContent: 'Password',
          placeholderContent: 'Type your password',
          value: ''
        },
        confirmPasswordInput: {
          labelContent: 'Confirm password',
          placeholderContent: 'Confirm your password',
          value: ''
        }
      },
      buttonData: {
        buttonContent: 'Sign up'
      }
    }
  },
  methods: {
    async createUser () {
      const newUser = {
        email: this.inputData.userEmailInput.value,
        name: this.inputData.userNameInput.value,
        login: this.inputData.userLoginInput.value,
        password: this.inputData.userPasswordInput.value
      }
      const response = await fetch('http://localhost:4000/register',
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(newUser)
        })

      if (response.status === 200) {
        await this.$router.push('/authorization')
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

.RegistrationComponent {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #F6FBF9;
  border-radius: 10px;
  padding: 30px 60px;

  &__container {
    padding-bottom: 15px;
    position: relative;
  }

  &__header {
    font-size: 30px;
    color: #181A18;
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
