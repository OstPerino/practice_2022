<template>
  <div class="RegistrationComponent">
    <h2
      class="RegistrationComponent__header RegistrationComponent__item"
    >
      Create an account
    </h2>
    <DefaultInputComponent
      class="RegistrationComponent__item"
      :placeholder="this.inputData.userNameInput.placeholderContent"
      :label-value="this.inputData.userNameInput.labelContent"
      v-model="inputData.userNameInput.value"
    />
    <DefaultInputComponent
      class="RegistrationComponent__item"
      :placeholder="this.inputData.userEmailInput.placeholderContent"
      :label-value="this.inputData.userEmailInput.labelContent"
      v-model="inputData.userEmailInput.value"
    />
    <DefaultInputComponent
      class="RegistrationComponent__item"
      :placeholder="this.inputData.userPasswordInput.placeholderContent"
      :label-value="this.inputData.userPasswordInput.labelContent"
      v-model="inputData.userPasswordInput.value"
    />
    <DefaultInputComponent
      class="RegistrationComponent__item"
      :placeholder="this.inputData.confirmPasswordInput.placeholderContent"
      :label-value="this.inputData.confirmPasswordInput.labelContent"
      v-model="inputData.confirmPasswordInput.value"
    />
    <DefaultButtonComponent
      class="RegistrationComponent__button"
      :button-content="this.buttonData.buttonContent"
    />
  </div>
</template>

<script>
import DefaultInputComponent from '@/components/UI/DefaultInputComponent'
import DefaultButtonComponent from '@/components/UI/DefaultButtonComponent'

export default {
  name: 'registration-component.vue',
  components: {
    DefaultInputComponent,
    DefaultButtonComponent
  },
  data: () => {
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
    margin-bottom: 30px;
  }

  &__button {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
