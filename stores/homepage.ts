import { defineStore } from 'pinia';
import { reactive } from 'vue';

interface HomepageState {
  usernameCheck: {
    form: {
      username: String;
      isLoading: Boolean;
      error: String;
    };
    usernameExists: null | Boolean;
  };
}

interface UsernameCheckRes {
  status: Boolean;
  data: {
    usernameExists: Boolean;
  };
}

export const useHomepageStore = defineStore('homepage', () => {
  const state = reactive<HomepageState>({
    usernameCheck: {
      form: {
        username: '',
        isLoading: false,
        error: '',
      },
      usernameExists: null,
    },
  });

  async function checkUsername() {
    state.usernameCheck.usernameExists = null;

    if (state.usernameCheck.form.isLoading) return;

    state.usernameCheck.form.isLoading = true;
    try {
      const response = await $fetch<UsernameCheckRes>(
        'http://localhost:5000/user/checkusername',
        {
          method: 'post',
          body: {
            username: state.usernameCheck.form.username,
          },
          timeout: 10000,
        },
      );
      state.usernameCheck.usernameExists = response.data.usernameExists;
    } catch (error) {
      let errorMessage = '';
      !error.data
        ? (errorMessage = 'errors.internal001')
        : (errorMessage = `errors.${error.data.data}`);

      state.usernameCheck.form.error = errorMessage;
    }
    state.usernameCheck.form.isLoading = false;
  }

  return {
    state,
    checkUsername,
  };
});
