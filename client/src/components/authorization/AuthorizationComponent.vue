<template>
  <form class="AuthorizationComponent">
    <h2 class="AuthorizationComponent__header">Login</h2>
    <div class="AuthorizationComponent__container">
      <DefaultInputComponent
        class="AuthorizationComponent__item"
        :placeholder="inputData.userNameInput.placeholderContent"
        :label-value="inputData.userNameInput.labelContent"
        v-model.trim="$v.inputData.userNameInput.value.$model"
      />
      <span
        class="AuthorizationComponent__error"
        v-show="!$v.inputData.userNameInput.value.required && $v.inputData.userNameInput.value.$dirty"
      >
        Field is required.
      </span>
      <span
        class="AuthorizationComponent__error"
        v-show="!$v.inputData.userNameInput.value.minLength"
      >
        Field must have at least {{ $v.inputData.userNameInput.value.$params.minLength.min }} characters.
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
    <DefaultButtonComponent
      class="AuthorizationComponent__button "
      :button-content="this.buttonData.buttonContent"
    />
  </form>
</template>

<script>
import DefaultInputComponent from '@/components/UI/DefaultInputComponent'
import DefaultButtonComponent from '@/components/UI/DefaultButtonComponent'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'authorization-component.vue',
  components: {
    DefaultButtonComponent,
    DefaultInputComponent
  },
  validations: {
    inputData: {
      userNameInput: {
        value: { required, minLength: minLength(8) }
      },
      userPasswordInput: {
        value: { required }
      }
    }
  },
  data: () => {
    return {
      inputData: {
        userNameInput: {
          labelContent: 'Email',
          placeholderContent: 'Type your email',
          value: ''
        },
        userPasswordInput: {
          labelContent: 'Password',
          placeholderContent: 'Type your password',
          value: ''
        }
      },
      buttonData: {
        buttonContent: 'Log In'
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
