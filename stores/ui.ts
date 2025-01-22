import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';
import { getInitialState } from '@/stores/state/uiState';
import type { UIState } from '@/stores/state/uiState';
import { useApiService } from '@/composables/useApiService';

export const useUIStore = defineStore(
  'ui',
  () => {
    const state = reactive<UIState>(getInitialState());

    const { formatApiError } = useApiService();

    let providedAction: Function | null;

    function clearStore() {
      Object.assign(state, getInitialState());
    }

    function showSnackbar(message: string, timeout: number) {
      state.snackbar.show = true;
      state.snackbar.message = message;
      state.snackbar.timeout = timeout;
    }

    function clearSnackbar() {
      state.snackbar.show = false;
      state.snackbar.message = '';
      state.snackbar.timeout = 0;
    }

    function openConfirmationDialog(message: string, confirmAction: Function) {
      state.confirmationDialog.show = true;
      state.confirmationDialog.message = message;
      providedAction = confirmAction;
    }

    function clearConfirmationDialog() {
      Object.assign(
        state.confirmationDialog,
        getInitialState().confirmationDialog,
      );
      providedAction = null;
    }

    async function runProvidedAction() {
      if (providedAction) {
        if (state.confirmationDialog.isLoading) return;

        state.confirmationDialog.isLoading = true;
        state.confirmationDialog.error = '';

        try {
          const result = await providedAction();
          if (result) {
            state.confirmationDialog.show = false;
          }
        } catch (error) {
          state.confirmationDialog.error = formatApiError(error);
        } finally {
          state.confirmationDialog.isLoading = false;
        }
      }
    }

    watch(
      () => state.confirmationDialog.show,
      (newValue, oldValue) => {
        if (!newValue) {
          setTimeout(() => {
            clearConfirmationDialog();
          }, 100);
        }
      },
    );

    return {
      state,
      clearStore,
      showSnackbar,
      clearSnackbar,
      openConfirmationDialog,
      clearConfirmationDialog,
      runProvidedAction,
    };
  },
  {
    persist: false,
  },
);
