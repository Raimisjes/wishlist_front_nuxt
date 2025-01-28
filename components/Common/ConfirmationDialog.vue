<script lang="ts" setup>
import { onUnmounted } from 'vue';
import { useUIStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';

const UIStore = useUIStore();
const { state: UIState } = storeToRefs(UIStore);

onUnmounted(() => {
  UIStore.clearConfirmationDialog();
});
</script>

<template>
  <v-dialog
    max-width="500"
    v-model="UIState.confirmationDialog.show"
    content-class="confirm-dialog"
  >
    <v-card>
      <v-form>
        <h3 v-html="UIState.confirmationDialog.message"></h3>
        <div class="button-holder">
          <UIElementsButton
            :is-disabled="UIState.confirmationDialog.isLoading"
            :is-loading="UIState.confirmationDialog.isLoading"
            :title="$t('words.submit')"
            :on-click="() => useUIStore().runProvidedAction()"
          />
          <v-btn
            :title="$t('words.close')"
            @click="UIState.confirmationDialog.show = false"
            >{{ $t('words.close') }}</v-btn
          >
        </div>
        <div class="form-error-holder" v-if="UIState.confirmationDialog.error">
          {{ $t(UIState.confirmationDialog.error) }}
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.confirm-dialog {
  .v-card {
    padding: 25px;
  }
  h3 {
    text-align: center;

    span {
      color: $primary;
    }
  }
  .button-holder {
    text-align: center;
    margin: 15px 0 0 0;

    .v-btn {
      margin: 0 10px 10px 10px;
    }
  }
}
</style>
