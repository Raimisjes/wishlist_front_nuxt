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
  rules: {
    type: Array as () => ValidationRule[],
    default: () => [],
  },
  appendIcon: {
    type: String,
  },
  fieldType: {
    type: String,
    default: 'text',
  },
  onClickAppend: {
    type: Function,
  },
});

const modelValue = computed({
  get: () => props.state[props.modelPath],
  set: (value) => (props.state[props.modelPath] = value),
});

function handleAppendClick() {
  if (props.onClickAppend) {
    props.onClickAppend();
  }
}
</script>

<template>
  <v-text-field
    v-model="modelValue"
    :label="props.label"
    :rules="props.rules"
    :append-icon="props.appendIcon"
    :type="props.fieldType"
    @click:append="handleAppendClick()"
    hide-details="auto"
    validate-on="blur"
    variant="underlined"
    color="primary"
    theme="default"
  ></v-text-field>
</template>

<style lang="scss" scoped></style>
