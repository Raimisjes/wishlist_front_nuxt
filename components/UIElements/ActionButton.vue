<script lang="ts" setup>
const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'small',
  },
  title: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  onClick: {
    type: Function,
    default: () => {},
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
    :class="props.class"
    :icon="props.icon"
    :size="props.size"
    :title="props.title"
    :aria-label="props.title"
    :color="props.color"
    @click.stop="handleOnClick()"
    density="comfortable"
  ></v-btn>
</template>

<style lang="scss" scoped></style>
