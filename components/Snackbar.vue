<script lang="ts" setup>
import { useUIStore } from '@/stores/ui';

const uiStore = useUIStore();

function onSnackbarClose() {
  !uiStore.state.snackbar.show ? uiStore.clearSnackbar() : '';
}
</script>

<template>
  <v-snackbar
    v-model="uiStore.state.snackbar.show"
    close-on-content-click
    :location="'top'"
    :timeout="uiStore.state.snackbar.timeout"
    @update:modelValue="onSnackbarClose"
    color="primary"
  >
    {{ $t(uiStore.state.snackbar.message) }}
  </v-snackbar>
</template>

<style lang="scss" scoped></style>
