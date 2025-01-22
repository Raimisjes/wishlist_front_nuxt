import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { useRouter } from 'vue-router';
import { getInitialState } from '@/stores/state/resetPasswordState';
import type { ResetPasswordState } from '@/stores/state/resetPasswordState';
import { useApiService } from '@/composables/useApiService';

export const useResetPasswordStore = defineStore(
  'resetPassword',
  () => {
    const router = useRouter();
    const config = useRuntimeConfig();
    const { apiFetch, formatApiError } = useApiService();

    const state = reactive<ResetPasswordState>(getInitialState());

    async function resetPasswordInit() {
      if (state.form.isLoading) return;

      state.form.isLoading = true;
      state.form.error = '';

      try {
        const response = await apiFetch<Promise<any>>(
          `${config.public.API_URL}/user/resetpassword/init`,
          {
            method: 'post',
            body: {
              email: state.form.email,
            },
            timeout: 10000,
            retry: 0,
          },
          false,
        );

        if (response.status) {
          router.push('/resetpassword/success');
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
      resetPasswordInit,
      clearStore,
    };
  },
  {
    persist: false,
  },
);
