export interface ChangePasswordState {
  form: {
    newPassword: string;
    repeatedNewPass: string;
    isLoading: boolean;
    error: string;
  };
}

export function getInitialState(): ChangePasswordState {
  return {
    form: {
      newPassword: '',
      repeatedNewPass: '',
      isLoading: false,
      error: '',
    },
  };
}
