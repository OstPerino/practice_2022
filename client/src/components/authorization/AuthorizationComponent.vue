<template>
  <div class="AuthorizationComponent">
    <lable>Authorization</lable>
    <DefaultInputComponent
      class="AuthorizationComponent__item"
      :placeholder="this.inputData.userNameInput.placeholderContent"
      :label-value="this.inputData.userNameInput.labelContent"
      v-model="inputData.userNameInput.value"/>

    <DefaultInputComponent
      class="AuthorizationComponent__item"
      :placeholder="this.inputData.userPasswordInput.placeholderContent"
      :label-value="this.inputData.userPasswordInput.labelContent"
      v-model="inputData.userPasswordInput.value"/>

    <DefaultButtonComponent
      class="AuthorizationComponent__button "
      :button-content="this.buttonData.buttonContent"
    />
  </div>
</template>

<script>
import DefaultInputComponent from '@/components/UI/DefaultInputComponent'
import DefaultButtonComponent from '@/components/UI/DefaultButtonComponent'

export default {
  name: 'authorization-component.vue',
  components: {
    DefaultButtonComponent,
    DefaultInputComponent
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
}
</style>
