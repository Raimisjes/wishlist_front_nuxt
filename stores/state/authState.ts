export interface AuthState {
  form: {
    username: string;
    password: string;
    isLoading: boolean;
    error: string;
  };
}

export function getInitialState(): AuthState {
  return {
    form: {
      username: '',
      password: '',
      isLoading: false,
      error: '',
    },
  };
}
