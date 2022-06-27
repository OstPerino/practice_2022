<template>
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
      <span
        class="RegistrationComponent__error"
        v-show="!$v.inputData.userNameInput.value.minLength"
      >
        Field must have at least {{ $v.inputData.userNameInput.value.$params.minLength.min }} characters.
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
    />
  </form>
</template>

<script>
import { email, required, minLength, sameAs } from 'vuelidate/lib/validators'
import DefaultInputComponent from '@/components/UI/DefaultInputComponent'
import DefaultButtonComponent from '@/components/UI/DefaultButtonComponent'

export default {
  name: 'registration-component.vue',
  mounted () {
    console.log(this.$v.inputData.userPasswordInput.value.$model)
  },
  components: {
    DefaultInputComponent,
    DefaultButtonComponent
  },
  computed: {
    isDirty (expression, dirty) {
      return !expression && dirty
    }
  },
  validations: {
    inputData: {
      userNameInput: {
        value: { required, minLength: minLength(8) }
      },
      userEmailInput: {
        value: { required, email }
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
      },
      password: 'password'
    }
  }
}
</script>

<style scoped lang="scss">

.RegistrationComponent {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #F6FBF9;
  border-radius: 10px;
  padding: 60px 80px;

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
}
</style>
