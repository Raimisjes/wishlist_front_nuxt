export interface ResetPasswordState {
  form: {
    email: string;
    isLoading: boolean;
    error: string;
  };
}

export function getInitialState(): ResetPasswordState {
  return {
    form: {
      email: '',
      isLoading: false,
      error: '',
    },
  };
}
