export interface UIState {
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

export function getInitialState(): UIState {
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
