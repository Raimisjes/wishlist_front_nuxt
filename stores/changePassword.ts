import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useRouter, useRoute } from 'vue-router';
import { useUIStore } from '@/stores/ui';
import { getInitialState } from '@/stores/state/changePasswordState';
import type { ChangePasswordState } from '@/stores/state/changePasswordState';
import { useApiService } from '@/composables/useApiService';

export const useChangePasswordStore = defineStore(
  'changePassword',
  () => {
    const route = useRoute();
    const router = useRouter();
    const config = useRuntimeConfig();
    const { apiFetch, formatApiError } = useApiService();

    const state = reactive<ChangePasswordState>(getInitialState());

    async function checkToken(token: string) {
      let isTokenValid = false;

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/user/resetpassword/tokencheck`,
          {
            method: 'post',
            body: {
              token,
            },
            timeout: 10000,
            retry: 0,
          },
          false,
        );

        isTokenValid = response.status;
      } catch (error) {
        useUIStore().showSnackbar(formatApiError(error), 4000);
      } finally {
        return isTokenValid;
      }
    }

    async function changePassword() {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/user/resetpassword/createnew`,
          {
            method: 'post',
            body: {
              newPassword: state.form.newPassword,
              repeatedNewPass: state.form.repeatedNewPass,
              token: route.params.token,
            },
            timeout: 10000,
            retry: 0,
          },
          false,
        );

        if (response.status) {
          router.push('/resetpassword/changesuccess');
        }
      } catch (error) {
        state.form.error = formatApiError(error);
      } finally {
        state.form.isLoading = false;
      }
    }

    function clearStore() {
      Object.assign(state, getInitialState());
    }

    return {
      state,
      checkToken,
      changePassword,
      clearStore,
    };
  },
  {
    persist: false,
  },
);
