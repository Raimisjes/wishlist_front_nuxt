export interface HomepageState {
  usernameCheck: {
    form: {
      username: string;
      isLoading: boolean;
      error: string;
    };
    usernameExists: null | boolean;
  };
}

export function getInitialState(): HomepageState {
  return {
    usernameCheck: {
      form: {
        username: '',
        isLoading: false,
        error: '',
      },
      usernameExists: null,
    },
  };
}
