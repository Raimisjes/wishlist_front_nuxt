<script lang="ts" setup>
import { computed } from 'vue';

type ValidationRule = (value: any) => boolean | string;

const props = defineProps({
  modelPath: {
    type: String,
    required: true,
  },
  state: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  rules: {
    type: Array as () => ValidationRule[],
    default: () => [],
  },
  appendInnerIcon: {
    type: String,
    default: '',
  },
  fieldType: {
    type: String,
    default: 'text',
  },
  onClickAppendInner: {
    type: Function,
    default: () => {},
  },
  prefix: {
    type: String,
    default: '',
  },
  errorMessages: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  onInput: {
    type: Function,
    default: () => {},
  },
});

const modelValue = computed({
  get: () => props.state[props.modelPath],
  set: (value) => (props.state[props.modelPath] = value),
});

function handleAppendInnerClick() {
  if (props.onClickAppendInner) {
    props.onClickAppendInner();
  }
}

function handleOnInput() {
  if (props.onInput) {
    props.onInput();
  }
}
</script>

<template>
  <v-text-field
    v-model="modelValue"
    :label="props.label"
    :rules="props.rules"
    :placeholder="props.placeholder"
    :append-inner-icon="props.appendInnerIcon"
    :type="props.fieldType"
    @click:append-inner="handleAppendInnerClick()"
    :prefix="props.prefix"
    :error-messages="props.errorMessages"
    :loading="props.isLoading"
    :disabled="props.isDisabled"
    @input="handleOnInput()"
    variant="underlined"
    color="primary"
    theme="default"
  ></v-text-field>
</template>

<style lang="scss" scoped></style>
