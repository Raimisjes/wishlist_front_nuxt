import { defineStore } from 'pinia';
import { reactive } from 'vue';
import _ from 'lodash';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@/stores/user';
import { useWishlistsStore } from '@/stores/wishlists';
import { useRouter } from 'vue-router';
import { useUIStore } from './ui';
import { useUserSettingsStore } from './userSettings';
import { getInitialState } from '@/stores/state/authState';
import type { AuthState } from '@/stores/state/authState';
import { useApiService } from '@/composables/useApiService';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const router = useRouter();
    const config = useRuntimeConfig();
    const { apiFetch, formatApiError } = useApiService();

    const state = reactive<AuthState>(getInitialState());

    async function login() {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/user/login`,
          {
            method: 'post',
            body: {
              username: state.form.username,
              password: state.form.password,
            },
            timeout: 10000,
            retry: 0,
            credentials: 'include',
          },
          false,
        );

        if (response.status) {
          useWishlistsStore().state.wishlists = response.data.wishlists;
          _.merge(useUserStore().state, response.data.user);
          useUserStore().state.authenticated = true;
          router.push('/');
        }
      } catch (error) {
        state.form.error = formatApiError(error);
      } finally {
        state.form.isLoading = false;
      }
    }

    async function logout() {
      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/user/logout`,
          {
            method: 'get',
            timeout: 10000,
            retry: 0,
            credentials: 'include',
          },
          false,
        );

        if (response.status) {
          useUserStore().clearStore();
          useUserSettingsStore().clearStore();
          useWishlistsStore().clearStore();
          useUIStore().showSnackbar('components.snackbar.logout', 4000);
          router.push('/');
        }
      } catch (error) {
        useUIStore().showSnackbar(formatApiError(error), 4000);
      }
    }

    async function refreshToken({ response }: { response: any }) {
      if (response.status === 401 && response._data.data == 'internal004') {
        try {
          const response = await apiFetch<Promise<any>>(
            `${config.public.API_URL}/user/refresh`,
            {
              method: 'post',
              timeout: 10000,
              retry: 0,
              credentials: 'include',
            },
            false,
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
