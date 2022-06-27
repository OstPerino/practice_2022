<template>
  <div class="RegistrationComponent">
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
        v-show="!$v.inputData.userNameInput.value.required"
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
    </div>
    <div class="RegistrationComponent__container">
      <DefaultInputComponent
        class="RegistrationComponent__item"
        :placeholder="inputData.userPasswordInput.placeholderContent"
        :label-value="inputData.userPasswordInput.labelContent"
        v-model.trim="$v.inputData.userPasswordInput.value.$model"
      />
    </div>
    <div class="RegistrationComponent__container">
      <DefaultInputComponent
        class="RegistrationComponent__item"
        :placeholder="inputData.confirmPasswordInput.placeholderContent"
        :label-value="inputData.confirmPasswordInput.labelContent"
        v-model.trim="$v.inputData.confirmPasswordInput.value.$model"
      />
<!--      <span class="RegistrationComponent__error"></span>-->
    </div>
    <DefaultButtonComponent
      class="RegistrationComponent__button"
      :button-content="buttonData.buttonContent"
    />
  </div>
</template>

<script>
import { email, required, minLength, sameAs } from 'vuelidate/lib/validators'
import DefaultInputComponent from '@/components/UI/DefaultInputComponent'
import DefaultButtonComponent from '@/components/UI/DefaultButtonComponent'

export default {
  name: 'registration-component.vue',
  mounted () {
    console.log(this.$v.inputData.userNameInput.value.$model)
  },
  components: {
    DefaultInputComponent,
    DefaultButtonComponent
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
      }
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

  &__header {
    font-size: 30px;
    color: #212B27;
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
    transition: 0.3s all;
  }
}
</style>
