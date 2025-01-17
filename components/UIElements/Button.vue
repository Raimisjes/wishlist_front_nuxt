<script lang="ts" setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
  },
  isDisabled: {
    type: Boolean,
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
  },
  btnSize: {
    type: String,
  },
});
</script>

<template>
  <v-btn
    :disabled="props.isDisabled"
    :loading="props.isLoading"
    :block="props.isBlock"
    :title="props.title"
    :type="props.btnType"
    :size="props.btnSize"
    color="primary"
    >{{ props.title }}</v-btn
  >
</template>

<style lang="scss" scoped></style>
