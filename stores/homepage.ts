import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';

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

function getInitialState() : HomepageState {
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

export const useHomepageStore = defineStore('homepage', () => {
  const config = useRuntimeConfig();

  const state = reactive<HomepageState>(getInitialState());

  async function checkUsername() {
    state.usernameCheck.usernameExists = null;

    if (state.usernameCheck.form.isLoading) return;

    state.usernameCheck.form.isLoading = true;
    try {
      const response = await $fetch<UsernameCheckRes>(
        `${config.public.API_URL}/user/checkusername`,
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

  function clearStore() {
    Object.assign(state, getInitialState());
  }

  return {
    state,
    checkUsername,
    clearStore,
  };
});
