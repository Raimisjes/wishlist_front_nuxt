import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useUIStore } from './ui';

interface AuthState {
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
          useUserStore().state.username = response.data.username;
          useUserStore().state.email = response.data.email;
          useUserStore().state.accessToken = response.data.accessToken;
          useUserStore().state.role = response.data.role;
          useUserStore().state.authenticated = true;
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

    async function logout() {
      try {
        const response = await $fetch<any>(
          `${config.public.API_URL}/user/logout`,
          {
            method: 'get',
            timeout: 10000,
          },
        );

        if (response.status) {
          useUserStore().clearStore();
          useUIStore().showSnackbar('components.snackbar.logout', 4000);
          router.push('/');
        }
      } catch (error) {
        let errorMessage;
        !error.data
          ? (errorMessage = 'errors.internal001')
          : (errorMessage = `errors.${error.data.data}`);
      }
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
      logout,
      clearStore,
      clearForm,
    };
  },
  {
    persist: false,
  },
);
