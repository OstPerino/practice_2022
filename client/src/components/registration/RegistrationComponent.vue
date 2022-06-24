<template>
  <div class="RegistrationComponent">
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
      class="RegistrationComponent__item"
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

  &__item {
    margin-bottom: 10px;
  }

  &__item:last-child {
    margin-bottom: 0;
  }
}
</style>
