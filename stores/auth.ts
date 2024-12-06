import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

interface AuthState {
  user: {
    username: string;
    accessToken: string;
    authenticated: boolean;
  };
  form: {
    username: string;
    password: string;
    hidePassword: boolean;
    isLoading: boolean;
    error: string;
  };
}

interface LoginApiResponse {
  status: boolean;
  data: {
    username: string;
    accessToken: string;
    email: string;
    role: string;
  };
}

function getInitialState(): AuthState {
  return {
    user: {
      username: '',
      accessToken: '',
      authenticated: false,
    },
    form: {
      username: '',
      password: '',
      hidePassword: true,
      isLoading: false,
      error: '',
    },
  };
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const router = useRouter();
    const config = useRuntimeConfig();

    const state = reactive<AuthState>(getInitialState());

    async function login() {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      try {
        const response = await $fetch<LoginApiResponse>(
          `${config.public.API_URL}/user/login`,
          {
            method: 'post',
            body: {
              username: state.form.username,
              password: state.form.password,
            },
            timeout: 10000,
            credentials: 'include',
          },
        );

        if (response.status) {
          state.user.username = response.data.username;
          state.user.accessToken = response.data.accessToken;
          state.user.authenticated = true;
          router.push('/');
          return;
        }
      } catch (error) {
        let errorMessage = '';
        !error.data
          ? (errorMessage = 'errors.internal001')
          : (errorMessage = `errors.${error.data.data}`);

        state.form.error = errorMessage;
      }
      state.form.isLoading = false;
    }

    function clearStore() {
      Object.assign(state, getInitialState());
    }

    function clearForm() {
      Object.assign(state.form, {
        username: '',
        password: '',
        hidePassword: true,
        isLoading: false,
        error: '',
      });
    }

    return {
      state,
      login,
      clearStore,
      clearForm,
    };
  },
  {
    persist: false,
  },
);
