<script lang="ts" setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
  btnType: {
    type: String,
    default: 'submit',
  },
  title: {
    type: String,
    default: '',
  },
  btnSize: {
    type: String,
    default: 'default',
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  color: {
    type: String,
    default: 'primary',
  },
});

function handleOnClick() {
  if (props.onClick) {
    props.onClick();
  }
}
</script>

<template>
  <v-btn
    :loading="props.isLoading"
    :disabled="props.isDisabled"
    :block="props.isBlock"
    :type="props.btnType"
    :title="props.title"
    :aria-label="props.title"
    :size="props.btnSize"
    @click="handleOnClick()"
    :color="color"
    >{{ props.title }}</v-btn
  >
</template>

<style lang="scss" scoped></style>
