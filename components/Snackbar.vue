<script lang="ts" setup>
import { useUIStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';

const uiStore = useUIStore();
const { state: uiState } = storeToRefs(uiStore);

function onSnackbarClose() {
  !uiStore.state.snackbar.show ? uiStore.clearSnackbar() : '';
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
