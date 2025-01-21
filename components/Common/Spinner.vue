<script lang="ts" setup></script>

<template>
  <div class="spinner-holder">
    <v-progress-circular
      :size="35"
      :width="2"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<style lang="scss" scoped>
.spinner-holder {
  min-height: 400px;
}
</style>
