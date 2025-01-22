export interface RegistrationState {
  form: {
    username: string;
    email: string;
    password: string;
    termsAccepted: Boolean;
    isLoading: boolean;
    error: string;
  };
}

export function getInitialState(): RegistrationState {
  return {
    form: {
      username: '',
      email: '',
      password: '',
      termsAccepted: false,
      isLoading: false,
      error: '',
    },
  };
}
