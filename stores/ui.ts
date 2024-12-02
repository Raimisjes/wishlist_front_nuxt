import { defineStore } from 'pinia';
import { reactive } from 'vue';

interface UIState {
  snackbar: {
    show: boolean;
    message: string;
    timeout: number;
  };
}

function getInitialState(): UIState {
  return {
    snackbar: {
      show: false,
      message: '',
      timeout: 0,
    },
  };
}

export const useUIStore = defineStore(
  'ui',
  () => {
    const state = reactive<UIState>(getInitialState());

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

    return {
      state,
      clearStore,
      showSnackbar,
      clearSnackbar,
    };
  },
  {
    persist: true,
  },
);
