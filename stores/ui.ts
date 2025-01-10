import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';

interface UIState {
  snackbar: {
    show: boolean;
    message: string;
    timeout: number;
  };
  confirmationDialog: {
    show: boolean;
    message: string;
    isLoading: boolean;
    error: string;
  };
}

function getInitialState(): UIState {
  return {
    snackbar: {
      show: false,
      message: '',
      timeout: 0,
    },
    confirmationDialog: {
      show: false,
      message: '',
      isLoading: false,
      error: '',
    },
  };
}

export const useUIStore = defineStore(
  'ui',
  () => {
    const state = reactive<UIState>(getInitialState());

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
          let errorMessage = '';
          !error.data
            ? (errorMessage = 'errors.internal001')
            : (errorMessage = `errors.${error.data.data}`);

          state.confirmationDialog.error = errorMessage;
        }

        state.confirmationDialog.isLoading = false;
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
