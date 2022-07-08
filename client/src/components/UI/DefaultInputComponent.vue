<template>
    <div class="DefaultInputComponent">
      <label class="DefaultInputComponent__label">{{ this.labelValue }}</label>
      <input
        class="DefaultInputComponent__input"
        :value="this.value"
        @input="updateInput"
        :placeholder="this.placeholder"
        :type="isPassword"
      />
    </div>
</template>

<script>
export default {
  name: 'default-input-component.vue',
  props: {
    value: {
      type: String,
      required: true
    },
    labelValue: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: true
    },
    isPassword: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    updateInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped lang="scss">

.DefaultInputComponent {
  display: flex;
  flex-direction: column;

  &__label {
    font-size: 12px;
    padding-bottom: 5px;
    color: rgba(0, 0, 0, 0.5)
  }

  &__input {
    padding: 10px 5px;
    font-size: 14px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    outline: none;
    border-radius: 10px;
  }
}
</style>
