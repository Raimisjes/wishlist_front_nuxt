import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { getInitialState } from '@/stores/state/homepageState';
import type { HomepageState } from '@/stores/state/homepageState';
import { useApiService } from '@/composables/useApiService';
import { useUIStore } from '@/stores/ui';

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

    async function getNewListings() {
      state.page.error = '';

      let getListingsDataSuccess = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/listing/getnew`,
          {
            method: 'get',
            timeout: 10000,
            retry: 0,
          },
          false,
        );

        if (response.status) {
          getListingsDataSuccess = response.status;
          state.newListings = response.data;
        }
      } catch (error) {
        useUIStore().showSnackbar(formatApiError(error), 4000);
      } finally {
        state.page.isLoading = false;
        return getListingsDataSuccess;
      }
    }

    function clearStore() {
      Object.assign(state, getInitialState());
    }

    return {
      state,
      checkUsername,
      getNewListings,
      clearStore,
    };
  },
  {
    persist: false,
  },
);
