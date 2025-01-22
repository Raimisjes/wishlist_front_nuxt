export interface UserSettingsState {
  changePassword: {
    form: {
      currentPassword: string;
      newPassword: string;
      newRepeated: string;
      isLoading: boolean;
      error: string;
    };
  };
  socialNetworks: {
    form: {
      url: string;
      active: boolean;
      isLoading: boolean;
      error: string;
    };
  };
}

export function getInitialState(): UserSettingsState {
  return {
    changePassword: {
      form: {
        currentPassword: '',
        newPassword: '',
        newRepeated: '',
        isLoading: false,
        error: '',
      },
    },
    socialNetworks: {
      form: {
        url: '',
        active: false,
        isLoading: false,
        error: '',
      },
    },
  };
}
