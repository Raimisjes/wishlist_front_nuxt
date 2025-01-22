import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { getInitialState } from '@/stores/state/homepageState';
import type { HomepageState } from '@/stores/state/homepageState';
import { useApiService } from '@/composables/useApiService';

export const useHomepageStore = defineStore(
  'homepage',
  () => {
    const config = useRuntimeConfig();
    const { apiFetch, formatApiError } = useApiService();

    const state = reactive<HomepageState>(getInitialState());

    async function checkUsername() {
      state.usernameCheck.usernameExists = null;

      if (state.usernameCheck.form.isLoading) return;

      state.usernameCheck.form.isLoading = true;
      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/user/checkusername`,
          {
            method: 'post',
            body: {
              username: state.usernameCheck.form.username,
            },
            timeout: 10000,
            retry: 0,
          },
          false,
        );

        if (response.status) {
          state.usernameCheck.usernameExists = response.data.usernameExists;
        }
      } catch (error) {
        state.usernameCheck.form.error = formatApiError(error);
      } finally {
        state.usernameCheck.form.isLoading = false;
      }
    }

    function clearStore() {
      Object.assign(state, getInitialState());
    }

    return {
      state,
      checkUsername,
      clearStore,
    };
  },
  {
    persist: false,
  },
);
