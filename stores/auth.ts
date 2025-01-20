import { defineStore } from 'pinia';
import { reactive } from 'vue';
import _ from 'lodash';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@/stores/user';
import { useWishlistsStore } from '@/stores/wishlists';
import { useRouter } from 'vue-router';
import { useUIStore } from './ui';
import { useUserSettingsStore } from './userSettings';

interface AuthState {
  form: {
    username: string;
    password: string;
    isLoading: boolean;
    error: string;
  };
}

function getInitialState(): AuthState {
  return {
    form: {
      username: '',
      password: '',
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
        const response = await $fetch<Promise<any>>(
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
          useWishlistsStore().state.wishlists = response.data.wishlists;
          _.merge(useUserStore().state, response.data.user);
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
            credentials: 'include',
          },
        );

        if (response.status) {
          useUserStore().clearStore();
          useUserSettingsStore().clearStore();
          useWishlistsStore().clearStore();
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

    async function refreshToken({ response }: { response: any }) {
      if (response.status === 401 && response._data.data == 'internal004') {
        try {
          const response = await $fetch<any>(
            `${config.public.API_URL}/user/refresh`,
            {
              method: 'post',
              timeout: 10000,
              credentials: 'include',
            },
          );
          useUserStore().state.accessToken = response.data.accessToken;
          return true;
        } catch (error) {
          await useAuthStore().logout();
        }
      }
      return false;
    }

    function clearStore() {
      Object.assign(state, getInitialState());
    }

    function clearForm() {
      Object.assign(state.form, {
        username: '',
        password: '',
        isLoading: false,
        error: '',
      });
    }

    return {
      state,
      login,
      logout,
      refreshToken,
      clearStore,
      clearForm,
    };
  },
  {
    persist: false,
  },
);
