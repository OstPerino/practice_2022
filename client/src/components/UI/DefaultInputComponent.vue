<template>
    <div class="DefaultInputComponent">
      <label class="DefaultInputComponent__label">{{ this.labelValue }}</label>
      <input
        class="DefaultInputComponent__input"
        :value="this.value"
        @input="updateInput"
        :placeholder="this.placeholder"
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
      required: true
    },
    placeholder: {
      type: String,
      required: true
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
  width: 200px;

  &__label {
    font-size: 14px;
    padding-bottom: 2px;
  }

  &__input {
    padding: 10px 5px;
    font-size: 14px;
    border: 1px solid #000;
    outline: none;
    border-radius: 3px;
  }
}
</style>
