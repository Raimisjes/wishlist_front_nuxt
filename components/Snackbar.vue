<script lang="ts" setup>
import { useUIStore } from '@/stores/ui';

const uiState = useUIStore().state;

function onSnackbarClose() {
  !uiState.snackbar.show ? useUIStore().clearSnackbar() : '';
}
</script>

<template>
  <v-snackbar
    v-model="uiState.snackbar.show"
    close-on-content-click
    :location="'top'"
    :timeout="uiState.snackbar.timeout"
    @update:modelValue="onSnackbarClose"
    color="primary"
  >
    {{ $t(uiState.snackbar.message) }}
  </v-snackbar>
</template>

<style lang="scss" scoped></style>
